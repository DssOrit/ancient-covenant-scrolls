// Load — Shared image-providers chain (5.8 AI Studio Fix · Option B)
// Copyright (c) 2026 LBond. All Rights Reserved.
//
// Single source of truth for the 17-row free / open-source / local-
// first IMAGE_PROVIDERS chain. Both AI Image Editor (Quick Image
// Tool) and AI Chat Studio (Production AI Chat) import this module
// so the user gets the same fallback chain in either surface.
//
// No duplicate API key panel: each surface passes the live config
// reference (the existing Image-Prompt settings panel) into
// build(cfg). build() does not read or persist keys on its own.
//
// Free / open-source / local-first locked rule:
//   - no key required: pollflux / pollinations / pollturbo / horde /
//     hordesdxl / localsd
//   - free with user-saved token: huggingface / cloudflare / together /
//     imagen (Gemini Image) / deepai / cfsdxllight / hfsdxlturbo /
//     realesrgan / gfpgan / codeformer
//   - free-entry credit (off by default): siliconflow
//   - paid: NONE in this chain
//
// Public API:
//   window.LoadImageProviders.build(cfg)
//     -> {
//          providers,                      // 17 IMAGE_PROVIDERS
//          imageGenWithFallback,           // (prompt, imgData, opts) -> result
//          classifyImageTask,              // (prompt, hasImage) -> task
//          filterImageProvidersForTask,    // (providers, task) -> providers
//          isHealthy, recordSuccess, recordFailure
//        }
//
// cfg shape (caller-supplied; live references):
//   C            object — { localSdUrl, hfImgKey, hfModel, cfToken,
//                cfAccount, togetherKey, daiKey, siliconflowKey,
//                useProvider, keys }
//   CHAR         object — { mode, description, outfit, style, seed }
//   HF_MODELS    string[] — HF model cascade
//   hfImageCall  fn(model, prompt, imgData, mask) -> Promise<Blob>
//   readError    fn(res, label) -> Promise<string>
//   storage      optional { getHealth(), saveHealth(map) } — default
//                localStorage 'ps_health'
//   sharpen      optional fn(url, providerId) -> Promise<string>

(function () {
'use strict';

function build(cfg) {
  cfg = cfg || {};
  var C = cfg.C || {};
  var CHAR = cfg.CHAR || {};
  var HF_MODELS = cfg.HF_MODELS || [
    'stabilityai/stable-diffusion-xl-base-1.0',
    'black-forest-labs/FLUX.1-dev',
    'stabilityai/stable-diffusion-2-1'
  ];
  var hfImageCall = cfg.hfImageCall || (function (model) { throw new Error('hfImageCall not provided for ' + model); });
  var readError = cfg.readError || (function (r, label) { return Promise.resolve(label + ' HTTP ' + r.status); });
  var sharpen = cfg.sharpen || (function (url) { return Promise.resolve(url); });
  // useProvider flag: if not present, default to true (provider on).
  function up(id) {
    var u = C.useProvider; if (!u) return true;
    return u[id] !== false;
  }
  // useProvider flag: explicit-true required (off-by-default).
  function upExplicit(id) {
    var u = C.useProvider; if (!u) return false;
    return u[id] === true;
  }

  // ── Provider health-board (circuit-breaker pattern) ──────────────
  var STORAGE_KEY = 'ps_health';
  var storage = cfg.storage || {
    getHealth: function () {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
      catch (e) { return {}; }
    },
    saveHealth: function (map) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch (_) {}
    }
  };
  var HEALTH = storage.getHealth();
  function recordSuccess(id) {
    var h = HEALTH[id] || (HEALTH[id] = { ok: 0, fail: 0, lastFail: 0 });
    h.ok++; storage.saveHealth(HEALTH);
  }
  function recordFailure(id) {
    var h = HEALTH[id] || (HEALTH[id] = { ok: 0, fail: 0, lastFail: 0 });
    h.fail++; h.lastFail = Date.now(); storage.saveHealth(HEALTH);
  }
  function isHealthy(id) {
    var h = HEALTH[id]; if (!h) return true;
    var W = 5 * 60 * 1000;
    if (Date.now() - h.lastFail > W) {
      if (h.fail) { h.fail = 0; storage.saveHealth(HEALTH); }
      return true;
    }
    return h.fail < 3;
  }

  // ── 17 free / open-source / local-first IMAGE_PROVIDERS ─────────
  var IMAGE_PROVIDERS = [
    {
      id: 'localsd', name: 'Local SD', needsKey: false,
      enabled: function () { return !!C.localSdUrl && up('localsd'); },
      supportsImg2Img: true, supportsInpainting: true,
      supportsImageInput: true, supportsImageOutput: true,
      gen: function (prompt, imgData, opts) {
        opts = opts || {};
        var base = String(C.localSdUrl).replace(/\/$/, '');
        var endpoint = imgData ? '/sdapi/v1/img2img' : '/sdapi/v1/txt2img';
        var body = imgData
          ? { prompt: String(prompt).slice(0, 2000),
              init_images: ['data:' + (imgData.mime || 'image/png') + ';base64,' + imgData.base64],
              denoising_strength: opts.mask ? 0.85 : 0.55,
              steps: 25, width: 1024, height: 1024, sampler_name: 'DPM++ 2M Karras' }
          : { prompt: String(prompt).slice(0, 2000), steps: 25, width: 1024, height: 1024, sampler_name: 'DPM++ 2M Karras' };
        if (opts.mask && opts.mask.base64) {
          body.mask = 'data:image/png;base64,' + opts.mask.base64;
          body.inpainting_fill = 1; body.inpaint_full_res = true; body.mask_blur = 4;
        }
        if (CHAR.seed) body.seed = CHAR.seed;
        return fetch(base + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function (r) { if (!r.ok) throw new Error('Local SD ' + r.status); return r.json(); })
          .then(function (data) {
            var b64 = data.images && data.images[0];
            if (!b64) throw new Error('Local SD empty response');
            var bin = atob(b64); var bytes = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return URL.createObjectURL(new Blob([bytes], { type: 'image/png' }));
          });
      }
    },
    {
      id: 'pollflux', name: 'Pollinations Flux', needsKey: false,
      enabled: function () { return up('pollflux'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var seed = Math.floor(Math.random() * 999999);
        var params = new URLSearchParams({ model: 'flux', width: '1024', height: '1024', nologo: 'true', seed: String(seed) });
        var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(String(prompt).slice(0, 1500)) + '?' + params;
        return fetch(url).then(function (r) { if (!r.ok) throw new Error('Pollinations Flux ' + r.status); return r.blob(); })
          .then(function (b) { if (!b.type.startsWith('image/')) throw new Error('Pollinations Flux non-image'); return URL.createObjectURL(b); });
      }
    },
    {
      id: 'pollinations', name: 'Pollinations', needsKey: false,
      enabled: function () { return up('pollinations'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var seed = Math.floor(Math.random() * 999999);
        var params = new URLSearchParams({ width: '1024', height: '1024', nologo: 'true', seed: String(seed) });
        var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(String(prompt).slice(0, 1500)) + '?' + params;
        return fetch(url).then(function (r) { if (!r.ok) throw new Error('Pollinations ' + r.status); return r.blob(); })
          .then(function (b) { if (!b.type.startsWith('image/')) throw new Error('Pollinations non-image response'); return URL.createObjectURL(b); });
      }
    },
    {
      id: 'huggingface', name: 'Hugging Face', needsKey: true,
      enabled: function () { return !!C.hfImgKey && up('huggingface'); },
      supportsImg2Img: true, supportsInpainting: true,
      supportsImageInput: true, supportsImageOutput: true,
      gen: function (prompt, imgData, opts) {
        opts = opts || {};
        var inpaintModels = ['diffusers/stable-diffusion-xl-1.0-inpainting-0.1', 'runwayml/stable-diffusion-inpainting'];
        var preferred = C.hfModel;
        var models = opts.mask
          ? inpaintModels.concat(HF_MODELS.filter(function (x) { return inpaintModels.indexOf(x) === -1; }))
          : [preferred].concat(HF_MODELS.filter(function (x) { return x !== preferred; }));
        var i = 0, lastErr = null;
        return (function next() {
          if (i >= models.length) throw lastErr || new Error('HF all models failed');
          var model = models[i++];
          return Promise.resolve(hfImageCall(model, prompt, imgData, opts.mask || null))
            .then(function (blob) { if (blob) return URL.createObjectURL(blob); return next(); })
            .catch(function (e) {
              if (e && e.message && e.message.indexOf('cold start') !== -1) throw e;
              lastErr = e; return next();
            });
        })();
      }
    },
    {
      id: 'cloudflare', name: 'Cloudflare AI', needsKey: true,
      enabled: function () { return !!(C.cfToken && C.cfAccount) && up('cloudflare'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var url = 'https://api.cloudflare.com/client/v4/accounts/' + C.cfAccount + '/ai/run/@cf/black-forest-labs/flux-1-schnell';
        return fetch(url, { method: 'POST', headers: { 'Authorization': 'Bearer ' + C.cfToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: String(prompt).slice(0, 1500), num_steps: 4 }) })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'Cloudflare')).then(function (m) { throw new Error(m); }); return r.json(); })
          .then(function (data) {
            var b64 = data.result && data.result.image; if (!b64) throw new Error('Cloudflare empty result');
            var bin = atob(b64); var bytes = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return URL.createObjectURL(new Blob([bytes], { type: 'image/png' }));
          });
      }
    },
    {
      id: 'together', name: 'Together AI', needsKey: true,
      enabled: function () { return !!C.togetherKey && up('together'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        return fetch('https://api.together.xyz/v1/images/generations', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + C.togetherKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'black-forest-labs/FLUX.1-schnell-Free', prompt: String(prompt).slice(0, 1500), n: 1, width: 1024, height: 1024, steps: 4, response_format: 'url' })
        }).then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'Together')).then(function (m) { throw new Error(m); }); return r.json(); })
          .then(function (data) {
            var u = data.data && data.data[0] && data.data[0].url;
            if (!u) throw new Error('Together empty response');
            return fetch(u).then(function (r) { return r.blob(); }).then(function (b) { return URL.createObjectURL(b); });
          });
      }
    },
    {
      id: 'horde', name: 'AI Horde', needsKey: false,
      enabled: function () { return up('horde'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var body = { prompt: String(prompt).slice(0, 1500), params: { sampler_name: 'k_euler_a', cfg_scale: 7, steps: 20, width: 512, height: 512, n: 1 }, nsfw: false, censor_nsfw: true, models: ['stable_diffusion'] };
        return fetch('https://stablehorde.net/api/v2/generate/async', { method: 'POST', headers: { 'apikey': '0000000000', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function (sub) { if (!sub.ok) return Promise.resolve(readError(sub, 'AI Horde')).then(function (m) { throw new Error(m); }); return sub.json(); })
          .then(function (j) {
            var id = j && j.id; if (!id) throw new Error('AI Horde no id');
            var attempts = 0;
            return new Promise(function (resolve, reject) {
              (function poll() {
                if (attempts++ >= 36) { reject(new Error('AI Horde timeout (~3 min)')); return; }
                setTimeout(function () {
                  fetch('https://stablehorde.net/api/v2/generate/check/' + id).then(function (ck) {
                    if (!ck.ok) return poll();
                    return ck.json().then(function (st) {
                      if (st.done) {
                        return fetch('https://stablehorde.net/api/v2/generate/status/' + id).then(function (fin) { return fin.json(); }).then(function (data) {
                          var g = data.generations && data.generations[0] && data.generations[0].img;
                          if (!g) throw new Error('AI Horde empty result');
                          if (/^https?:\/\//i.test(g)) {
                            return fetch(g).then(function (r) { return r.blob(); }).then(function (b) { resolve(URL.createObjectURL(b)); });
                          }
                          var bin = atob(g); var bytes = new Uint8Array(bin.length);
                          for (var j2 = 0; j2 < bin.length; j2++) bytes[j2] = bin.charCodeAt(j2);
                          resolve(URL.createObjectURL(new Blob([bytes], { type: 'image/webp' })));
                        });
                      }
                      poll();
                    });
                  }).catch(function () { poll(); });
                }, 5000);
              })();
            });
          });
      }
    },
    {
      id: 'imagen', name: 'Gemini Image', needsKey: true,
      enabled: function () { return !!(C.keys && C.keys.gemini) && up('imagen'); },
      supportsImg2Img: true, supportsImageInput: true, supportsImageOutput: true,
      gen: function (prompt, imgData) {
        var model = 'gemini-2.5-flash-image-preview';
        var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(C.keys.gemini);
        var parts = [{ text: String(prompt).slice(0, 1500) }];
        if (imgData && imgData.base64) parts.push({ inlineData: { mimeType: imgData.mime || 'image/png', data: imgData.base64 } });
        return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: parts }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } }) })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'Gemini Image')).then(function (m) { throw new Error(m); }); return r.json(); })
          .then(function (data) {
            var respParts = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
            var imgPart = respParts.filter(function (p) { return p.inlineData; })[0];
            if (!imgPart) throw new Error('Gemini Image: no image in response (model may have refused)');
            var b64 = imgPart.inlineData.data; var bin = atob(b64);
            var bytes = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return URL.createObjectURL(new Blob([bytes], { type: imgPart.inlineData.mimeType || 'image/png' }));
          });
      }
    },
    {
      id: 'deepai', name: 'DeepAI', needsKey: true,
      enabled: function () { return !!C.daiKey && up('deepai'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var fd = new FormData(); fd.append('text', String(prompt).slice(0, 1500));
        return fetch('https://api.deepai.org/api/text2img', { method: 'POST', headers: { 'api-key': C.daiKey }, body: fd })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'DeepAI')).then(function (m) { throw new Error(m); }); return r.json(); })
          .then(function (data) { var u = data.output_url; if (!u) throw new Error('DeepAI empty'); return fetch(u).then(function (r) { return r.blob(); }).then(function (b) { return URL.createObjectURL(b); }); });
      }
    },
    {
      id: 'pollturbo', name: 'Pollinations Turbo', needsKey: false,
      enabled: function () { return up('pollturbo'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var seed = Math.floor(Math.random() * 999999);
        var params = new URLSearchParams({ model: 'turbo', width: '1024', height: '1024', nologo: 'true', seed: String(seed) });
        var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(String(prompt).slice(0, 1500)) + '?' + params;
        return fetch(url).then(function (r) { if (!r.ok) throw new Error('Pollinations Turbo ' + r.status); return r.blob(); })
          .then(function (b) { if (!b.type.startsWith('image/')) throw new Error('Pollinations Turbo non-image'); return URL.createObjectURL(b); });
      }
    },
    {
      id: 'hordesdxl', name: 'AI Horde SDXL', needsKey: false,
      enabled: function () { return up('hordesdxl'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var body = { prompt: String(prompt).slice(0, 1500), params: { sampler_name: 'k_euler_a', cfg_scale: 7, steps: 25, width: 1024, height: 1024, n: 1 }, nsfw: false, censor_nsfw: true, models: ['SDXL 1.0'] };
        return fetch('https://stablehorde.net/api/v2/generate/async', { method: 'POST', headers: { 'apikey': '0000000000', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function (sub) { if (!sub.ok) return Promise.resolve(readError(sub, 'AI Horde SDXL')).then(function (m) { throw new Error(m); }); return sub.json(); })
          .then(function (j) {
            var id = j && j.id; if (!id) throw new Error('AI Horde SDXL no id');
            var attempts = 0;
            return new Promise(function (resolve, reject) {
              (function poll() {
                if (attempts++ >= 36) { reject(new Error('AI Horde SDXL timeout (~3 min)')); return; }
                setTimeout(function () {
                  fetch('https://stablehorde.net/api/v2/generate/check/' + id).then(function (ck) {
                    if (!ck.ok) return poll();
                    return ck.json().then(function (st) {
                      if (st.done) {
                        return fetch('https://stablehorde.net/api/v2/generate/status/' + id).then(function (fin) { return fin.json(); }).then(function (data) {
                          var g = data.generations && data.generations[0] && data.generations[0].img;
                          if (!g) throw new Error('AI Horde SDXL empty result');
                          if (/^https?:\/\//i.test(g)) return fetch(g).then(function (r) { return r.blob(); }).then(function (b) { resolve(URL.createObjectURL(b)); });
                          var bin = atob(g); var bytes = new Uint8Array(bin.length);
                          for (var j2 = 0; j2 < bin.length; j2++) bytes[j2] = bin.charCodeAt(j2);
                          resolve(URL.createObjectURL(new Blob([bytes], { type: 'image/webp' })));
                        });
                      }
                      poll();
                    });
                  }).catch(function () { poll(); });
                }, 5000);
              })();
            });
          });
      }
    },
    {
      id: 'cfsdxllight', name: 'Cloudflare SDXL-Lightning', needsKey: true,
      enabled: function () { return !!(C.cfToken && C.cfAccount) && up('cfsdxllight'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        var url = 'https://api.cloudflare.com/client/v4/accounts/' + C.cfAccount + '/ai/run/@cf/bytedance/stable-diffusion-xl-lightning';
        return fetch(url, { method: 'POST', headers: { 'Authorization': 'Bearer ' + C.cfToken, 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: String(prompt).slice(0, 1500) }) })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'Cloudflare SDXL-Lightning')).then(function (m) { throw new Error(m); }); return r; })
          .then(function (r) {
            var ct = r.headers.get('content-type') || '';
            if (ct.indexOf('image/') !== -1) return r.blob().then(function (b) { return URL.createObjectURL(b); });
            return r.json().then(function (data) {
              var b64 = data.result && data.result.image;
              if (!b64) throw new Error('Cloudflare SDXL-Lightning empty result');
              var bin = atob(b64); var bytes = new Uint8Array(bin.length);
              for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
              return URL.createObjectURL(new Blob([bytes], { type: 'image/png' }));
            });
          });
      }
    },
    {
      id: 'hfsdxlturbo', name: 'HF SDXL-Turbo', needsKey: true,
      enabled: function () { return !!C.hfImgKey && up('hfsdxlturbo'); },
      supportsImageOutput: true,
      gen: function (prompt) {
        return fetch('https://api-inference.huggingface.co/models/stabilityai/sdxl-turbo', { method: 'POST', headers: { 'Authorization': 'Bearer ' + C.hfImgKey, 'Content-Type': 'application/json', 'Accept': 'image/png' }, body: JSON.stringify({ inputs: String(prompt).slice(0, 1500), parameters: { num_inference_steps: 4, guidance_scale: 0 } }) })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'HF SDXL-Turbo')).then(function (m) { throw new Error(m); }); return r; })
          .then(function (r) { var ct = r.headers.get('content-type') || ''; if (!ct.startsWith('image/')) throw new Error('HF SDXL-Turbo non-image response'); return r.blob().then(function (b) { return URL.createObjectURL(b); }); });
      }
    },
    {
      id: 'siliconflow', name: 'SiliconFlow', needsKey: true,
      // Free-entry credits — explicit-true required (off by default).
      enabled: function () { return !!C.siliconflowKey && upExplicit('siliconflow'); },
      supportsImg2Img: true, supportsImageInput: true, supportsImageOutput: true,
      gen: function (prompt, imgData, opts) {
        var url = 'https://api.siliconflow.cn/v1/images/generations';
        var body = { model: imgData ? 'black-forest-labs/FLUX.1-Kontext-dev' : 'black-forest-labs/FLUX.1-schnell', prompt: String(prompt).slice(0, 2000), image_size: '1024x1024', num_inference_steps: imgData ? 28 : 4, seed: (opts && opts.seed) || undefined };
        if (imgData) body.image = 'data:' + (imgData.mime || 'image/png') + ';base64,' + imgData.base64;
        return fetch(url, { method: 'POST', headers: { 'Authorization': 'Bearer ' + C.siliconflowKey, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function (r) { if (!r.ok) return Promise.resolve(readError(r, 'SiliconFlow')).then(function (m) { throw new Error(m); }); return r.json(); })
          .then(function (data) {
            var u = (data.images && data.images[0] && data.images[0].url) || (data.data && data.data[0] && data.data[0].url);
            if (!u) throw new Error('SiliconFlow empty response');
            return fetch(u).then(function (r) { return r.blob(); }).then(function (b) { if (!b.type.startsWith('image/')) throw new Error('SiliconFlow non-image'); return URL.createObjectURL(b); });
          });
      }
    },
    {
      id: 'realesrgan', name: 'Real-ESRGAN (HF)', needsKey: true,
      enabled: function () { return !!C.hfImgKey && up('realesrgan'); },
      supportsImageOutput: true, supportsUpscale: true, taskOnly: true,
      gen: function (prompt, imgData) {
        if (!imgData) throw new Error('Real-ESRGAN requires source image');
        return Promise.resolve(hfImageCall('ai-forever/Real-ESRGAN', '', imgData, null)).then(function (blob) { return URL.createObjectURL(blob); });
      }
    },
    {
      id: 'gfpgan', name: 'GFPGAN (face restore)', needsKey: true,
      enabled: function () { return !!C.hfImgKey && up('gfpgan'); },
      supportsImageOutput: true, supportsFaceRestore: true, taskOnly: true,
      gen: function (prompt, imgData) {
        if (!imgData) throw new Error('GFPGAN requires source image');
        return Promise.resolve(hfImageCall('TencentARC/GFPGAN', '', imgData, null)).then(function (blob) { return URL.createObjectURL(blob); });
      }
    },
    {
      id: 'codeformer', name: 'CodeFormer (face restore)', needsKey: true,
      enabled: function () { return !!C.hfImgKey && up('codeformer'); },
      supportsImageOutput: true, supportsFaceRestore: true, taskOnly: true,
      gen: function (prompt, imgData) {
        if (!imgData) throw new Error('CodeFormer requires source image');
        return Promise.resolve(hfImageCall('sczhou/CodeFormer', '', imgData, null)).then(function (blob) { return URL.createObjectURL(blob); });
      }
    }
  ];

  // ── Task classification + filter (mirrors image-prompt impl) ────
  function classifyImageTask(prompt, hasImage) {
    var p = String(prompt || '').toLowerCase();
    if (!hasImage) return 'generate';
    if (/\b(remove\s*background|cut\s*out|isolate|transparent\s*bg|alpha\s*channel)\b/.test(p)) return 'background_removal';
    if (/\b(change|replace|swap|new)\s+(the\s+)?background\b/.test(p) || /\bbackground\b/.test(p)) return 'change_background';
    if (/\b(remove|delete|erase|get\s*rid\s*of)\b/.test(p)) return 'remove_object';
    if (/\b(add|put|place|insert|include)\s+(a\s+|an\s+|another\s+|some\s+)?[a-z]+/.test(p)) return 'add_object';
    if (/\b(upscale|enhance|hd|higher\s+res|upres|hi[\s-]?res|2x|4x|sharper|crisp(er)?|improve|fix\s+quality|make\s+(it\s+)?better)\b/.test(p)) return /\b(improve|fix\s+quality|make\s+(it\s+)?better)\b/.test(p) ? 'improve' : 'upscale';
    if (/\b(smooth\s+(my\s+)?skin|fix\s+(my\s+)?face|retouch(\s+(my\s+)?(face|skin))?|restore\s+(my\s+)?face|repair\s+(my\s+)?face|de.?blur|sharpen\s+(my\s+)?face)\b/.test(p)) return 'face_restore';
    if (/\b(modify|change|alter)\s+(the\s+)?(character|person|face|hair|outfit|clothing|expression|pose)\b/.test(p)) return 'modify_character';
    if (/\b(mask|inpaint|fill\s*in|paint\s*over|select(ed)?\s*area|only\s*the|just\s*the)\b/.test(p)) return 'inpaint';
    return 'img2img';
  }
  function filterImageProvidersForTask(providers, task) {
    if (task === 'generate') return providers.filter(function (p) { return !p.taskOnly; });
    var editClass = ['img2img', 'inpaint', 'mask_edit', 'improve', 'add_object', 'modify_character', 'change_background', 'remove_object'];
    if (editClass.indexOf(task) !== -1) return providers.filter(function (p) { return p.supportsImg2Img === true && !p.taskOnly; });
    if (task === 'background_removal') return providers.filter(function (p) { return p.supportsBgRemoval === true; });
    if (task === 'upscale') return providers.filter(function (p) { return p.supportsUpscale === true; });
    if (task === 'face_restore') return providers.filter(function (p) { return p.supportsFaceRestore === true; });
    return providers.filter(function (p) { return !p.taskOnly; });
  }

  // ── Multi-provider auto-fallback orchestration ──────────────────
  function imageGenWithFallback(prompt, imgData, opts) {
    opts = opts || {};
    var task = opts.taskType;
    if (!task) {
      var tagMatch = String(prompt || '').match(/^\[TASK:([a-z_]+)\]\s*/);
      if (tagMatch) { task = tagMatch[1]; prompt = prompt.slice(tagMatch[0].length); }
      else task = classifyImageTask(prompt, !!imgData);
    } else {
      prompt = String(prompt || '').replace(/^\[TASK:[a-z_]+\]\s*/, '');
    }
    var providers = IMAGE_PROVIDERS.filter(function (p) { return p.enabled() && isHealthy(p.id); });
    if (!providers.find(function (p) { return p.id === 'pollinations'; })) {
      var pol = IMAGE_PROVIDERS.find(function (p) { return p.id === 'pollinations'; });
      if (pol) providers.push(pol);
    }
    var local = providers.find(function (p) { return p.id === 'localsd'; });
    var horde = providers.find(function (p) { return p.id === 'horde'; });
    var rest = providers.filter(function (p) { return p.id !== 'localsd' && p.id !== 'horde'; });
    if (imgData) {
      var img2img = rest.filter(function (p) { return p.supportsImg2Img; });
      var textOnly = rest.filter(function (p) { return !p.supportsImg2Img; });
      providers = (local ? [local] : []).concat(img2img, textOnly, horde ? [horde] : []);
    } else {
      providers = (local ? [local] : []).concat(rest, horde ? [horde] : []);
    }
    var filtered = filterImageProvidersForTask(providers, task);
    var editClass = task !== 'generate';
    if (filtered.length) providers = filtered;
    else if (opts.hardImg2Img) { var err = new Error('MANUAL_MASK_NEEDED'); err.task = task; throw err; }
    var i = 0, lastErr = null, skipped = [];
    return (function next() {
      if (i >= providers.length) {
        if (lastErr) { lastErr.skipped = skipped; throw lastErr; }
        var fe = new Error('All image providers failed'); fe.skipped = skipped; throw fe;
      }
      var p = providers[i++];
      var capImageOutput = p.supportsImageOutput !== false;
      if (!capImageOutput) { skipped.push('Skipped ' + p.name + ': text-only model'); return next(); }
      if (editClass) {
        var capImageInput = p.supportsImageInput === true || p.supportsImg2Img === true;
        var capInpaint = p.supportsInpainting === true;
        if (!capImageInput && !capInpaint && filtered.length) {
          skipped.push('Skipped ' + p.name + ': no image-input / inpainting support for ' + task);
          return next();
        }
      }
      return Promise.resolve()
        .then(function () { return p.gen(prompt, imgData, { mask: opts.mask, taskType: task }); })
        .then(function (url) {
          if (typeof url === 'string' && url.length > 0) {
            recordSuccess(p.id);
            return Promise.resolve(sharpen(url, p.id)).then(function (finalUrl) {
              return { url: finalUrl, providerId: p.id, providerName: p.name, task: task, skipped: skipped };
            });
          }
          throw new Error(p.name + ' returned no image');
        })
        .catch(function (e) { recordFailure(p.id); lastErr = e; return next(); });
    })();
  }

  return {
    providers: IMAGE_PROVIDERS,
    imageGenWithFallback: imageGenWithFallback,
    classifyImageTask: classifyImageTask,
    filterImageProvidersForTask: filterImageProvidersForTask,
    isHealthy: isHealthy,
    recordSuccess: recordSuccess,
    recordFailure: recordFailure
  };
}

if (typeof window !== 'undefined') window.LoadImageProviders = { build: build };
if (typeof module !== 'undefined' && module.exports) module.exports = { build: build };
})();

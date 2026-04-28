/* Voice FX engine — applies a named effect preset to an AudioBuffer
 * via OfflineAudioContext (offline / fast) or a regular AudioContext +
 * MediaStreamDestination (real-time, used when MediaRecorder needs a
 * stream). Pure Web Audio API — no codec libraries.
 *
 * Public surface:
 *   window.VoiceFX = {
 *     PRESETS,                  // array of { key, label, icon, note }
 *     applyToBuffer(buf, key),  // returns Promise<AudioBuffer>
 *     applyToStream(stream, key, ctx) // returns MediaStream (for live preview)
 *   }
 */
(function (global) {
  'use strict';
  if (global.VoiceFX) return;

  var PRESETS = [
    { key: 'none',       label: 'No effect',  icon: '🎙', note: 'Original recording' },
    { key: 'chipmunk',   label: 'Chipmunk',   icon: '🐿', note: 'High-pitch, fast' },
    { key: 'helium',     label: 'Helium',     icon: '🎈', note: 'Squeaky balloon voice' },
    { key: 'child',      label: 'Child',      icon: '🧒', note: 'Slightly higher + brighter' },
    { key: 'woman',      label: 'Woman',      icon: '👩', note: 'Softer + slightly higher' },
    { key: 'man',        label: 'Man',        icon: '👨', note: 'Lower, fuller' },
    { key: 'deep',       label: 'Deep voice', icon: '🦁', note: 'Big, deep, slow' },
    { key: 'elder',      label: 'Elder',      icon: '👴', note: 'Lower with slight tremor' },
    { key: 'robot',      label: 'Robot',      icon: '🤖', note: 'Ring-modulated' },
    { key: 'alien',      label: 'Alien',      icon: '👽', note: 'High pitch + ring mod' },
    { key: 'monster',    label: 'Monster',    icon: '👹', note: 'Very deep + distortion' },
    { key: 'ghost',      label: 'Ghost',      icon: '👻', note: 'Pitch down + reverb tail' },
    { key: 'echo',       label: 'Echo',       icon: '🔁', note: 'Repeating decay' },
    { key: 'cathedral',  label: 'Cathedral',  icon: '⛪', note: 'Long reverb' },
    { key: 'telephone',  label: 'Telephone',  icon: '☎️', note: 'Bandpassed 300-3400 Hz' },
    { key: 'walkietalkie',label:'Walkie-talkie',icon:'📻', note: 'Crunchy + static' },
    { key: 'underwater', label: 'Underwater', icon: '🌊', note: 'Lowpass + slow chorus' },
    { key: 'whisper',    label: 'Whisper',    icon: '🤫', note: 'Quiet, breathy highs' },
    { key: 'megaphone',  label: 'Megaphone',  icon: '📣', note: 'Boosted mids, slight clip' },
    { key: 'cave',       label: 'Cave',       icon: '🕳', note: 'Long delay + low cut' }
  ];

  // Build a synthesised impulse response for ConvolverNode (no external
  // .wav file needed). decay in seconds, dampening 0..1 (high = dark).
  function buildIR(ctx, durationSec, decay, dampening) {
    var sr = ctx.sampleRate;
    var len = Math.max(1, Math.floor(sr * durationSec));
    var ir = ctx.createBuffer(2, len, sr);
    for (var c = 0; c < 2; c++) {
      var ch = ir.getChannelData(c);
      for (var i = 0; i < len; i++) {
        var n = (Math.random() * 2 - 1);
        var env = Math.pow(1 - i / len, decay);
        ch[i] = n * env * (1 - dampening * (i / len));
      }
    }
    return ir;
  }

  // Build the effect graph for a given preset. `srcNode` is the source
  // (BufferSource / MediaStream input). Connects to `outNode`. Returns
  // an object with optional `playbackRate` to apply to a BufferSource.
  function buildGraph(ctx, srcNode, outNode, key) {
    var rate = 1;
    function chain() { var nodes = Array.prototype.slice.call(arguments); for (var i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); }

    if (key === 'none' || !key) {
      srcNode.connect(outNode);
      return { rate: 1 };
    }
    if (key === 'chipmunk')      rate = 1.6;
    else if (key === 'helium')   rate = 1.8;
    else if (key === 'child')    rate = 1.25;
    else if (key === 'woman')    rate = 1.12;
    else if (key === 'man')      rate = 0.88;
    else if (key === 'deep')     rate = 0.7;
    else if (key === 'elder')    rate = 0.85;
    else if (key === 'monster')  rate = 0.55;
    else if (key === 'ghost')    rate = 0.78;
    else if (key === 'alien')    rate = 1.3;

    if (key === 'robot' || key === 'alien') {
      var ringFreq = key === 'alien' ? 200 : 80;
      var osc = ctx.createOscillator(); osc.frequency.value = ringFreq; osc.type = 'sine';
      var ring = ctx.createGain(); ring.gain.value = 0;
      osc.connect(ring.gain);
      srcNode.connect(ring);
      var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 200;
      chain(ring, hp, outNode);
      try { osc.start(); } catch (_) {}
      return { rate: rate, _stopOsc: osc };
    }
    if (key === 'monster') {
      var ws = ctx.createWaveShaper();
      var curve = new Float32Array(1024);
      for (var i = 0; i < 1024; i++) {
        var x = i / 512 - 1;
        curve[i] = Math.tanh(x * 2.5);
      }
      ws.curve = curve; ws.oversample = '4x';
      var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
      chain(srcNode, ws, lp, outNode);
      return { rate: rate };
    }
    if (key === 'ghost' || key === 'cathedral' || key === 'cave') {
      var conv = ctx.createConvolver();
      conv.buffer = buildIR(ctx,
        key === 'cathedral' ? 4 : key === 'cave' ? 3 : 2.4,
        key === 'cave' ? 1.2 : 1.5,
        key === 'ghost' ? 0.7 : 0.4
      );
      var dry = ctx.createGain(); dry.gain.value = key === 'ghost' ? 0.4 : 0.6;
      var wet = ctx.createGain(); wet.gain.value = key === 'ghost' ? 0.9 : 0.7;
      srcNode.connect(dry); dry.connect(outNode);
      srcNode.connect(conv); conv.connect(wet); wet.connect(outNode);
      return { rate: rate };
    }
    if (key === 'echo') {
      var d = ctx.createDelay(); d.delayTime.value = 0.32;
      var fb = ctx.createGain(); fb.gain.value = 0.45;
      var dry2 = ctx.createGain(); dry2.gain.value = 0.7;
      var wet2 = ctx.createGain(); wet2.gain.value = 0.6;
      srcNode.connect(dry2); dry2.connect(outNode);
      srcNode.connect(d); d.connect(wet2); wet2.connect(outNode);
      d.connect(fb); fb.connect(d);
      return { rate: rate };
    }
    if (key === 'telephone') {
      var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1700; bp.Q.value = 1.2;
      var bp2 = ctx.createBiquadFilter(); bp2.type = 'bandpass'; bp2.frequency.value = 1700; bp2.Q.value = 1.2;
      chain(srcNode, bp, bp2, outNode);
      return { rate: rate };
    }
    if (key === 'walkietalkie') {
      var bpw = ctx.createBiquadFilter(); bpw.type = 'bandpass'; bpw.frequency.value = 1500; bpw.Q.value = 1.0;
      var wsw = ctx.createWaveShaper();
      var c2 = new Float32Array(1024);
      for (var ii = 0; ii < 1024; ii++) { var xx = ii / 512 - 1; c2[ii] = Math.tanh(xx * 4); }
      wsw.curve = c2; wsw.oversample = '4x';
      chain(srcNode, bpw, wsw, outNode);
      return { rate: rate };
    }
    if (key === 'underwater') {
      var lpu = ctx.createBiquadFilter(); lpu.type = 'lowpass'; lpu.frequency.value = 700;
      var dl = ctx.createDelay(); dl.delayTime.value = 0.04;
      var fbu = ctx.createGain(); fbu.gain.value = 0.3;
      chain(srcNode, lpu, dl, outNode);
      dl.connect(fbu); fbu.connect(dl);
      return { rate: rate };
    }
    if (key === 'whisper') {
      var hpw = ctx.createBiquadFilter(); hpw.type = 'highpass'; hpw.frequency.value = 1200;
      var gw = ctx.createGain(); gw.gain.value = 0.55;
      chain(srcNode, hpw, gw, outNode);
      return { rate: rate };
    }
    if (key === 'megaphone') {
      var bpm = ctx.createBiquadFilter(); bpm.type = 'peaking'; bpm.frequency.value = 1800; bpm.gain.value = 8; bpm.Q.value = 0.7;
      var wsm = ctx.createWaveShaper();
      var c3 = new Float32Array(1024);
      for (var jj = 0; jj < 1024; jj++) { var xj = jj / 512 - 1; c3[jj] = Math.tanh(xj * 3); }
      wsm.curve = c3;
      chain(srcNode, bpm, wsm, outNode);
      return { rate: rate };
    }
    // Pitch-only presets (chipmunk, helium, child, woman, man, deep,
    // elder) just connect direct — the rate is applied to the source.
    srcNode.connect(outNode);
    return { rate: rate };
  }

  async function applyToBuffer(buf, key) {
    if (!buf) return null;
    if (!key || key === 'none') return buf;
    var rateGuess = 1;
    // First-pass estimate of length (preset's playbackRate compresses
    // the rendered output, except for pure-FX presets where rate=1).
    var probe = { rate: 1 };
    var probeCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 1, buf.sampleRate);
    var probeSrc = probeCtx.createBufferSource(); probeSrc.buffer = buf;
    probe = buildGraph(probeCtx, probeSrc, probeCtx.destination, key) || { rate: 1 };
    rateGuess = probe.rate || 1;
    if (probe._stopOsc) try { probe._stopOsc.stop(); } catch (_) {}

    var renderDur = (buf.duration || 0) / rateGuess + 1; // +1s for FX tails
    var ch = Math.min(2, buf.numberOfChannels || 1);
    var outLen = Math.max(1, Math.floor(buf.sampleRate * renderDur));
    var ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(ch, outLen, buf.sampleRate);
    var src = ctx.createBufferSource(); src.buffer = buf;
    var info = buildGraph(ctx, src, ctx.destination, key);
    if (info.rate && info.rate !== 1) src.playbackRate.value = info.rate;
    src.start();
    var rendered = await ctx.startRendering();
    return rendered;
  }

  function applyToStream(stream, key, ctx) {
    // Live-preview path. Returns an output MediaStream. Caller hooks
    // into MediaRecorder or an <audio> element. Same graph logic.
    var src = ctx.createMediaStreamSource(stream);
    var dest = ctx.createMediaStreamDestination();
    buildGraph(ctx, src, dest, key);
    return dest.stream;
  }

  global.VoiceFX = {
    PRESETS: PRESETS,
    applyToBuffer: applyToBuffer,
    applyToStream: applyToStream
  };
})(typeof window !== 'undefined' ? window : globalThis);

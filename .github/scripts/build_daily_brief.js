#!/usr/bin/env node
'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ── KEYWORD GROUPS ─────────────────────────────────────────────────────────────
// Each group maps headlines to a covenant section and theme label.
const KEYWORD_GROUPS = [
  {theme:'Covenant Land',        section:1, keywords:['israel','jerusalem','canaan','judah','judea','zion','temple mount','west bank','gaza','palestine','golan','sinai','euphrates','jordan river']},
  {theme:'War and Conflict',     section:1, keywords:['war','warfare','missile','airstrike','air strike','bombardment','invasion','occupation','military','ceasefire','cease-fire','attack','strike','troops','battalion','offensive','siege','blockade','drone']},
  {theme:'Iran and Axis',        section:1, keywords:['iran','iranian','hezbollah','hamas','houthi','proxies','axis of resistance','islamic republic']},
  {theme:'Lebanon and Syria',    section:1, keywords:['lebanon','lebanese','syria','syrian','damascus','beirut','aleppo','idlib','euphrates']},
  {theme:'Diaspora',             section:2, keywords:['diaspora','exile','slavery','slave trade','ships','transatlantic','captive','captivity','deportation','trafficking','displaced','displacement','refugees','stateless']},
  {theme:'Diaspora — Africa',    section:2, keywords:['west africa','nigeria','benin','ghana','togo','senegal','cameroon','congo','ivory coast','cote d\'ivoire','niger','mali','burkina faso']},
  {theme:'Awakening',            section:3, keywords:['reparations','repatriation','heritage','ancestry','indigenous rights','identity','afro','african american','black history','hebrew','israelite','covenant','prophecy','biblical']},
  {theme:'New Heart',            section:4, keywords:['revival','spiritual','repentance','return to faith','covenant renewal','religious awakening','scripture','torah','sacred']},
  {theme:'Gathering',            section:5, keywords:['return','aliyah','migration','immigration','gathering','reunification','repatriation','ethiopia','eritrea','somalia','horn of africa','east africa','african union','pan-african']},
  {theme:'Abundance',            section:6, keywords:['famine','drought','food crisis','food insecurity','sanctions','embargo','economic crisis','poverty','starvation','inflation','currency collapse','wealth transfer']},
  {theme:'Second Exodus',        section:7, keywords:['exodus','migration crisis','mass migration','global migration','refugee crisis','stateless','borderless','second exodus','north country','four corners']},
  {theme:'Egypt and North Africa',section:5,keywords:['egypt','egyptian','cairo','suez','sinai','north africa','libya','tunisia','morocco','algeria']},
  {theme:'Cush and East Africa', section:5, keywords:['ethiopia','ethiopian','eritrea','kenya','sudan','south sudan','somalia','djibouti','cush','nubia','nile','blue nile']},
  {theme:'Judgment of Nations',  section:7, keywords:['sanctions','accountability','war crimes','icc','international court','tribunal','judgment','reckoning','empire','collapse','superpower','decline']},
];

// ── NEWS SOURCES ───────────────────────────────────────────────────────────────
const SOURCES = [
  {name:'BBC World',   url:'https://feeds.bbci.co.uk/news/world/rss.xml'},
  {name:'Al Jazeera', url:'https://www.aljazeera.com/xml/rss/all.xml'},
  {name:'VOA News',   url:'https://feeds.voanews.com/VOANews/world'},
  {name:'France 24',  url:'https://www.france24.com/en/rss'},
  {name:'DW World',   url:'https://rss.dw.com/xml/rss-en-world'},
];

// ── HELPERS ────────────────────────────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise(function(resolve, reject) {
    var mod = url.startsWith('https') ? https : http;
    var req = mod.get(url, {
      headers: {'User-Agent':'ACR-Prophetic-Watch/1.0','Accept':'application/rss+xml,application/xml,text/xml,*/*'}
    }, function(res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      var data = '';
      res.on('data', function(c) { data += c; });
      res.on('end', function() { resolve(data); });
    });
    req.on('error', reject);
    req.setTimeout(10000, function() { req.destroy(); reject(new Error('timeout')); });
  });
}

function parseRSS(xml) {
  var items = [];
  var itemRe = /<item[^>]*>([\s\S]*?)<\/item>/g;
  var m;
  while ((m = itemRe.exec(xml)) !== null) {
    var block = m[1];
    var titleM = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                 block.match(/<title>([\s\S]*?)<\/title>/);
    var linkM  = block.match(/<link>([\s\S]*?)<\/link>/) ||
                 block.match(/<link[^>]+href="([^"]+)"/);
    var pubM   = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (titleM) {
      var title = titleM[1].replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();
      items.push({
        title: title,
        link:  linkM ? linkM[1].replace(/<[^>]+>/g,'').trim() : '',
        pub:   pubM  ? pubM[1].trim() : ''
      });
    }
  }
  return items;
}

function scoreHeadline(title) {
  var low = title.toLowerCase();
  var themes = [];
  var sections = [];
  var totalScore = 0;
  KEYWORD_GROUPS.forEach(function(group) {
    var hits = group.keywords.filter(function(kw) { return low.indexOf(kw) !== -1; });
    if (hits.length > 0) {
      themes.push(group.theme);
      if (sections.indexOf(group.section) === -1) sections.push(group.section);
      totalScore += hits.length;
    }
  });
  return {themes: themes, sections: sections, score: totalScore};
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
async function main() {
  var allItems = [];

  for (var i = 0; i < SOURCES.length; i++) {
    var source = SOURCES[i];
    try {
      var xml = await fetchUrl(source.url);
      var items = parseRSS(xml);
      items.slice(0, 40).forEach(function(item) {
        var scored = scoreHeadline(item.title);
        if (scored.score > 0) {
          allItems.push({
            headline: item.title,
            source:   source.name,
            url:      item.link,
            themes:   scored.themes,
            sections: scored.sections.sort(function(a,b){return a-b;}),
            score:    scored.score,
            pub:      item.pub
          });
        }
      });
      console.log(source.name + ': fetched ' + items.length + ' items');
    } catch(e) {
      console.error(source.name + ': ' + e.message);
    }
  }

  // Deduplicate by headline prefix
  var seen = {};
  var deduped = allItems.filter(function(item) {
    var key = item.headline.substring(0, 40).toLowerCase().replace(/[^a-z0-9]/g,'');
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });

  deduped.sort(function(a, b) { return b.score - a.score; });
  var top = deduped.slice(0, 25);

  var brief = {
    date:    new Date().toISOString().split('T')[0],
    updated: new Date().toISOString(),
    count:   top.length,
    items:   top
  };

  var outPath = path.join(__dirname, '..', '..', 'Search', 'daily_brief.json');
  fs.writeFileSync(outPath, JSON.stringify(brief, null, 2));
  console.log('Brief written: ' + top.length + ' items for ' + brief.date);
}

main().catch(function(e) { console.error(e); process.exit(1); });

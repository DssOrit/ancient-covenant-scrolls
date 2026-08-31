// ACR Study — Spaced repetition companion for the Ancient Covenant Record
// Copyright (c) 2026 LBond. All Rights Reserved.
// Unauthorized reproduction, modification, distribution, or
// commercial use is strictly prohibited. See LICENSE at the
// repository root for the full terms.
//
// ACR Study — Phase 1.5 stub
// Shell + navigation + TOC + font controls.
// Voice reader and notes panels are wired up to empty handlers here;
// actual logic lands in follow-up commits one function at a time.

// ---- Premium SVG icon set (matches Load family) ----
function lbIcon(name, sizePx) {
  var size = sizePx || 18;
  var inner = {
    'book':       '<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M7 4v13"/><path d="M11 8h4M11 12h4"/>',
    'cards':      '<rect x="3" y="5" width="14" height="14" rx="1.5"/><path d="M7 5V3h10v2M7 19v2h10v-2M21 9v6"/>',
    'flame':      '<path d="M12 3c2 4 5 5 5 9a5 5 0 1 1-10 0c0-3 2-3 2-6 1 1 1.5 2 1 3 1-1 2-2 2-6z"/>',
    'lightbulb':  '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3 11c.6.6 1 1.4 1 2.3V18h4v-1.7c0-.9.4-1.7 1-2.3a6 6 0 0 0-3-11z"/>',
    'puzzle':     '<path d="M10 4a2 2 0 0 1 4 0v3h3a2 2 0 0 1 0 4h0a2 2 0 0 0 0 4h0v3H4v-3a2 2 0 1 0 0-4h0a2 2 0 0 1 0-4h3V4z"/>',
    'speaker':    '<path d="M5 9v6h3l5 4V5L8 9H5z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/>',
    'pencil':     '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'chat':       '<path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 4z"/>',
    'scale':      '<path d="M12 4v16"/><path d="M5 8h14"/><path d="M5 8l-3 6h6z"/><path d="M19 8l3 6h-6z"/>',
    'shuffle':    '<path d="M16 3l5 5-5 5"/><path d="M21 8H8a5 5 0 0 0 0 10h0"/><path d="M3 16l5 5 5-5"/>',
    'headphones': '<path d="M3 14a9 9 0 0 1 18 0"/><rect x="3" y="13" width="4" height="7" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/>',
    'arrows':     '<path d="M3 6h18"/><polyline points="17 2 21 6 17 10"/><path d="M21 18H3"/><polyline points="7 14 3 18 7 22"/>',
    'eye':        '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'music':      '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    'brain':      '<path d="M9 4a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3 3 3 0 0 0 1 2 3 3 0 0 0 0 4 3 3 0 0 0 3 3 3 3 0 0 0 5-1V4z"/><path d="M15 4a3 3 0 0 1 3 3v0a3 3 0 0 1 3 3 3 3 0 0 1-1 2 3 3 0 0 1 0 4 3 3 0 0 1-3 3 3 3 0 0 1-5-1V4z"/>',
    'web':        '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'calendar':   '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/>',
    'cards2':     '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    'sparkle':    '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>',
    'globe':      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'mountain':   '<path d="M3 19l6-10 4 6 3-4 5 8z"/>',
    'scroll':     '<path d="M5 4h11l3 3v13H5z"/><path d="M5 4v16h-2v-2"/><path d="M9 9h7M9 13h7M9 17h5"/>',
    'baby':       '<circle cx="12" cy="9" r="4"/><path d="M5 21c0-3 3-6 7-6s7 3 7 6"/>',
    'sword':      '<path d="M14 5l5-2-2 5-9 9-3 1 1-3z"/><path d="M11 14l3 3"/>',
    'compass':    '<circle cx="12" cy="12" r="9"/><polygon points="13 8 17 16 8 12"/>',
    'target':     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    'shield':     '<path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7z"/>',
    'trophy':     '<path d="M7 4h10v3a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a3 3 0 0 0 3 3M17 6h3a3 3 0 0 1-3 3"/><path d="M9 13h6v3H9z"/><path d="M8 20h8"/>',
    'medal':      '<circle cx="12" cy="14" r="6"/><path d="M9 8L7 4h10l-2 4"/>',
    'search':     '<circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/>'
  }[name] || '';
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px;flex-shrink:0">' + inner + '</svg>';
}
try { window.lbIcon = lbIcon; } catch (e) {}

// All 46 volumes / 111 sections matching the ACR reader, plus SR reference
var IDS=[];for(var _i=1;_i<=111;_i++){if(_i!==108)IDS.push('file_'+_i);}
IDS.push('file_200');

var LBL = [
'Bereshit (Genesis) \u2014 Part 1 \u2014 Ch 1\u201311',
'Bereshit (Genesis) \u2014 Part 2 \u2014 Ch 12\u201325',
'Bereshit (Genesis) \u2014 Part 3 \u2014 Ch 26\u201336',
'Bereshit (Genesis) \u2014 Part 4 \u2014 Ch 37\u201350',
'Shemot (Exodus) \u2014 Part 1 \u2014 Ch 1\u201318',
'Shemot (Exodus) \u2014 Part 2 \u2014 Ch 19\u201340',
'Vayikra (Leviticus) \u2014 Part 1 \u2014 Ch 1\u201316',
'Vayikra (Leviticus) \u2014 Part 2 \u2014 Ch 17\u201327',
'Bamidbar (Numbers) \u2014 Part 1 \u2014 Ch 1\u201319',
'Bamidbar (Numbers) \u2014 Part 2 \u2014 Ch 20\u201336',
'Devarim (Deuteronomy) \u2014 Part 1 \u2014 Ch 1\u201317',
'Devarim (Deuteronomy) \u2014 Part 2 \u2014 Ch 18\u201334',
'Chanokh (Book of Chanokh) \u2014 Part 1 \u2014 Ch 1\u201336 \u2014 Book of the Watchers',
'Chanokh (Book of Chanokh) \u2014 Part 2 \u2014 Ch 37\u201355 \u2014 Astronomical and Dream Visions',
'Chanokh (Book of Chanokh) \u2014 Part 3 \u2014 Ch 56\u201373 \u2014 Epistle',
'Yovelim (Jubilees) \u2014 Part 1 \u2014 Ch 1\u201325',
'Yovelim (Jubilees) \u2014 Part 2 \u2014 Ch 26\u201350',
'Book of Giants (Sefer HaNephilim) \u2014 Complete \u2014 Fragments 1\u20136',
'Visions of Amram (4QAmram) \u2014 Complete',
'Yehoshua (Joshua) \u2014 Part 1 \u2014 Ch 1\u20138',
'Yehoshua (Joshua) \u2014 Part 2 \u2014 Ch 9\u201315',
'Yehoshua (Joshua) \u2014 Part 3 \u2014 Ch 16\u201324',
'Shofetim (Judges) \u2014 Part 1 \u2014 Ch 1\u20137',
'Shofetim (Judges) \u2014 Part 2 \u2014 Ch 8\u201314',
'Shofetim (Judges) \u2014 Part 3 \u2014 Ch 15\u201321',
"Shemu\'el Aleph (1 Samuel) \u2014 Part 1 \u2014 Ch 1\u201310",
"Shemu\'el Aleph (1 Samuel) \u2014 Part 2 \u2014 Ch 11\u201317",
"Shemu\'el Aleph (1 Samuel) \u2014 Part 3 \u2014 Ch 18\u201324",
"Shemu\'el Aleph (1 Samuel) \u2014 Part 4 \u2014 Ch 25\u201331",
"Shemu\'el Bet (2 Samuel) \u2014 Part 1 \u2014 Ch 1\u20136",
"Shemu\'el Bet (2 Samuel) \u2014 Part 2 \u2014 Ch 7\u201312",
"Shemu\'el Bet (2 Samuel) \u2014 Part 3 \u2014 Ch 13\u201318",
"Shemu\'el Bet (2 Samuel) \u2014 Part 4 \u2014 Ch 19\u201324",
'Melakhim Aleph (1 Kings) \u2014 Part 1 \u2014 Ch 1\u20136',
'Melakhim Aleph (1 Kings) \u2014 Part 2 \u2014 Ch 7\u201312',
'Melakhim Aleph (1 Kings) \u2014 Part 3 \u2014 Ch 13\u201318',
'Melakhim Aleph (1 Kings) \u2014 Part 4 \u2014 Ch 19\u201322',
'Melakhim Bet (2 Kings) \u2014 Part 1 \u2014 Ch 1\u20137',
'Melakhim Bet (2 Kings) \u2014 Part 2 \u2014 Ch 8\u201313',
'Melakhim Bet (2 Kings) \u2014 Part 3 \u2014 Ch 14\u201319',
'Melakhim Bet (2 Kings) \u2014 Part 4 \u2014 Ch 20\u201325',
"Yesha\'yahu (Isaiah) \u2014 1QIsa-a \u2014 Part 1 \u2014 Ch 1\u201312",
"Yesha\'yahu (Isaiah) \u2014 1QIsa-a \u2014 Part 2 \u2014 Ch 13\u201327",
"Yesha\'yahu (Isaiah) \u2014 1QIsa-a \u2014 Part 3 \u2014 Ch 28\u201341",
"Yesha\'yahu (Isaiah) \u2014 1QIsa-a \u2014 Part 4 \u2014 Ch 42\u201354",
"Yesha\'yahu (Isaiah) \u2014 1QIsa-a \u2014 Part 5 \u2014 Ch 55\u201366",
'Yirmeyahu (Jeremiah) \u2014 Part 1 \u2014 Ch 1\u20137',
'Yirmeyahu (Jeremiah) \u2014 Part 2 \u2014 Ch 8\u201315',
'Yirmeyahu (Jeremiah) \u2014 Part 3 \u2014 Ch 16\u201323',
'Yirmeyahu (Jeremiah) \u2014 Part 4 \u2014 Ch 24\u201331',
'Yirmeyahu (Jeremiah) \u2014 Part 5 \u2014 Ch 32\u201339',
'Yirmeyahu (Jeremiah) \u2014 Part 6 \u2014 Ch 40\u201348',
'Yirmeyahu (Jeremiah) \u2014 Part 7 \u2014 Ch 49\u201352',
'Yehezkel (Ezekiel) \u2014 Part 1 \u2014 Ch 1\u201311',
'Yehezkel (Ezekiel) \u2014 Part 2 \u2014 Ch 12\u201319',
'Yehezkel (Ezekiel) \u2014 Part 3 \u2014 Ch 20\u201324',
'Yehezkel (Ezekiel) \u2014 Part 4 \u2014 Ch 25\u201332',
'Yehezkel (Ezekiel) \u2014 Part 5 \u2014 Ch 33\u201339',
'Yehezkel (Ezekiel) \u2014 Part 6 \u2014 Ch 40\u201348',
'The Twelve \u2014 Part 1 \u2014 Hoshea',
'The Twelve \u2014 Part 2 \u2014 Yoel and Amos',
'The Twelve \u2014 Part 3 \u2014 Ovadyah, Yonah, Mikhah, Nakhum',
'The Twelve \u2014 Part 4 \u2014 Havakuk, Tzefanyah, Khagai, Zekhariyahu 1\u20138',
'The Twelve \u2014 Part 5 \u2014 Zekhariyahu 9\u201314 and Malakhi',
'Tehillim (Psalms) \u2014 Part 1 \u2014 Psalms 1\u201320',
'Tehillim (Psalms) \u2014 Part 2 \u2014 Psalms 21\u201341',
'Tehillim (Psalms) \u2014 Part 3 \u2014 Psalms 42\u201372',
'Tehillim (Psalms) \u2014 Part 4 \u2014 Psalms 73\u201389',
'Tehillim (Psalms) \u2014 Part 5 \u2014 Psalms 90\u2013106',
'Tehillim (Psalms) \u2014 Part 6 \u2014 Psalms 107\u2013118',
'Tehillim (Psalms) \u2014 Part 7 \u2014 Psalm 119',
'Tehillim (Psalms) \u2014 Part 8 \u2014 Psalms 120\u2013150',
'Tehillim (Psalms) \u2014 Part 9 \u2014 Psalms 151, 154, 155 \u2014 DSS Only',
'Mishlei (Proverbs) \u2014 Part 1 \u2014 Ch 1\u201310',
'Mishlei (Proverbs) \u2014 Part 2 \u2014 Ch 11\u201320',
'Mishlei (Proverbs) \u2014 Part 3 \u2014 Ch 21\u201331',
'Iyov (Job) \u2014 Part 1 \u2014 Ch 1\u201314',
'Iyov (Job) \u2014 Part 2 \u2014 Ch 15\u201328',
'Iyov (Job) \u2014 Part 3 \u2014 Ch 29\u201342',
'Shir HaShirim (Song of Songs) \u2014 Complete',
'Ruth \u2014 Complete',
'Eikha (Lamentations) \u2014 Complete',
'Kohelet (Ecclesiastes) \u2014 Complete',
"Esther \u2014 Orit Ge\'ez Primary \u2014 Complete",
'Daniyel (Daniel) \u2014 Part 1 \u2014 Ch 1\u20136',
'Daniyel (Daniel) \u2014 Part 2 \u2014 Ch 7\u201312',
'Ezra-Nekhemyah \u2014 Part 1 \u2014 Ezra',
'Ezra-Nekhemyah \u2014 Part 2 \u2014 Nekhemyah',
'Divrei HaYamim Aleph (1 Chronicles) \u2014 Part 1 \u2014 Ch 1\u20139',
'Divrei HaYamim Aleph (1 Chronicles) \u2014 Part 2 \u2014 Ch 10\u201329',
'Divrei HaYamim Bet (2 Chronicles) \u2014 Part 1 \u2014 Ch 1\u201318',
'Divrei HaYamim Bet (2 Chronicles) \u2014 Part 2 \u2014 Ch 19\u201336',
'4Q246 (Aramaic Apocalypse) \u2014 Complete',
'War Scroll 1QM (Sons of Light vs Darkness) \u2014 All 19 Columns \u2014 Complete',
'4QMMT (Some Works of the Torah) of the Torah \u2014 Complete',
'Damascus Document (Brit Damesek) \u2014 Part 1 \u2014 Columns 1\u20138',
'Damascus Document (Brit Damesek) \u2014 Part 2 \u2014 Columns 9\u201316',
'Community Rule 1QS (Serekh HaYakhad) \u2014 Complete',
'Rule of the Congregation 1QSa (Serekh HaEdah) \u2014 Complete',
'Rule of Blessings 1QSb (Serekh HaBerakhot) \u2014 Complete',
"Words of the Luminaries (Divrei HaMe'orot) \u2014 Complete",
'Pesher Nahum (Commentary on Nahum) \u2014 Complete',
'Hodayot (Thanksgiving Hymns) \u2014 Part 1 \u2014 Col 1\u20134',
'Hodayot (Thanksgiving Hymns) \u2014 Part 2 \u2014 Col 5\u20138',
'Pesher Habakkuk (Commentary on Habakkuk) \u2014 Complete',
'Songs of Sabbath Sacrifice (Shirot Olat HaShabbat) \u2014 Complete',
'Genesis Apocryphon (Bereshit Apocryphon) \u2014 Complete',
'Temple Scroll 11Q19 (Megillat HaMikdash) \u2014 Part 1 \u2014 Col 1\u201322',
'Temple Scroll 11Q19 (Megillat HaMikdash) \u2014 Part 2 \u2014 Col 23\u201344',
'Temple Scroll 11Q19 (Megillat HaMikdash) \u2014 Part 3 \u2014 Col 45\u201366',
'ACR Search Reference \u2014 Hebrew Roots, History & Research'
];

var VOL_GROUPS = [
{title:'Vol 1 \u2014 Bereshit (Genesis)',eng:'',count:4,vol:'1'},
{title:'Vol 2 \u2014 Shemot (Exodus)',eng:'',count:2,vol:'2'},
{title:'Vol 3 \u2014 Vayikra (Leviticus)',eng:'',count:2,vol:'3'},
{title:'Vol 4 \u2014 Bamidbar (Numbers)',eng:'',count:2,vol:'4'},
{title:'Vol 5 \u2014 Devarim (Deuteronomy)',eng:'',count:2,vol:'5'},
{title:'Vol 6 \u2014 Chanokh (1 Enoch)',eng:'DSS Attested Ch 1\u201373',count:3,vol:'6'},
{title:'Vol 7 \u2014 Yovelim (Jubilees)',eng:'All 50 Chapters',count:2,vol:'7'},
{title:'Vol 8 \u2014 Book of Giants',eng:'DSS Attested',count:1,vol:'8'},
{title:'Vol 9 \u2014 Visions of Amram (4QAmram)',eng:'',count:1,vol:'9'},
{title:'Vol 10 \u2014 Yehoshua (Joshua)',eng:'',count:3,vol:'10'},
{title:'Vol 11 \u2014 Shofetim (Judges)',eng:'',count:3,vol:'11'},
{title:"Vol 12 \u2014 Shemu\'el Aleph (1 Samuel)",eng:'',count:4,vol:'12'},
{title:"Vol 13 \u2014 Shemu\'el Bet (2 Samuel)",eng:'',count:4,vol:'13'},
{title:'Vol 14 \u2014 Melakhim Aleph (1 Kings)',eng:'',count:4,vol:'14'},
{title:'Vol 15 \u2014 Melakhim Bet (2 Kings)',eng:'',count:4,vol:'15'},
{title:"Vol 16 \u2014 Yesha\'yahu (Isaiah)",eng:'1QIsa-a',count:5,vol:'16'},
{title:'Vol 17 \u2014 Yirmeyahu (Jeremiah)',eng:'DSS Primary',count:7,vol:'17'},
{title:'Vol 18 \u2014 Yehezkel (Ezekiel)',eng:'4QEzek',count:6,vol:'18'},
{title:'Vol 19 \u2014 The Twelve',eng:'Minor Prophets',count:5,vol:'19'},
{title:'Vol 20 \u2014 Tehillim (Psalms)',eng:'Incl. Ps 151, 154, 155',count:9,vol:'20'},
{title:'Vol 21 \u2014 Mishlei (Proverbs)',eng:'',count:3,vol:'21'},
{title:'Vol 22 \u2014 Iyov (Job)',eng:'',count:3,vol:'22'},
{title:'Vol 23 \u2014 Shir HaShirim (Song of Songs)',eng:'',count:1,vol:'23'},
{title:'Vol 24 \u2014 Ruth',eng:'',count:1,vol:'24'},
{title:'Vol 25 \u2014 Eikha (Lamentations)',eng:'',count:1,vol:'25'},
{title:'Vol 26 \u2014 Kohelet (Ecclesiastes)',eng:'',count:1,vol:'26'},
{title:'Vol 27 \u2014 Esther',eng:"Orit Ge\'ez Primary",count:1,vol:'27'},
{title:'Vol 28 \u2014 Daniyel (Daniel)',eng:'8 DSS Manuscripts',count:2,vol:'28'},
{title:'Vol 29 \u2014 Ezra-Nekhemyah',eng:'Ezra & Nekhemyah',count:2,vol:'29'},
{title:'Vol 30 \u2014 Divrei HaYamim Aleph (1 Chronicles)',eng:'',count:2,vol:'30'},
{title:'Vol 31 \u2014 Divrei HaYamim Bet (2 Chronicles)',eng:'',count:2,vol:'31'},
{title:'Vol 32 \u2014 4Q246',eng:'Aramaic Apocalypse',count:1,vol:'32'},
{title:'Vol 33 \u2014 War Scroll 1QM',eng:'Sons of Light vs Darkness',count:1,vol:'33'},
{title:'Vol 34 \u2014 4QMMT',eng:'Some Works of the Torah',count:1,vol:'34'},
{title:'Vol 35 \u2014 Damascus Document',eng:'',count:2,vol:'35'},
{title:'Vol 36 \u2014 Community Rule 1QS',eng:'',count:1,vol:'36'},
{title:'Vol 37 \u2014 Rule of the Congregation 1QSa',eng:'',count:1,vol:'37'},
{title:'Vol 38 \u2014 Rule of Blessings 1QSb',eng:'',count:1,vol:'38'},
{title:'Vol 39 \u2014 Words of the Luminaries 4QDibHam',eng:'',count:1,vol:'39'},
{title:'Vol 40 \u2014 Pesher Nahum 4QpNah',eng:'',count:1,vol:'40'},
{title:'Vol 41 \u2014 Hodayot',eng:'Thanksgiving Hymns 1QH',count:2,vol:'41'},
{title:'Vol 42 \u2014 Pesher Habakkuk 1QpHab',eng:'',count:1,vol:'42'},
{title:'Vol 43 \u2014 Songs of Sabbath Sacrifice',eng:'',count:1,vol:'43'},
{title:'Vol 44 \u2014 Genesis Apocryphon 1QapGen',eng:'',count:1,vol:'44'},
{title:'Vol 45 \u2014 Temple Scroll 11Q19',eng:'All 66 Columns',count:3,vol:'45'},
{title:'ACR Search Reference',eng:'Hebrew Roots & Research',count:1,vol:'SR'}
];
var fs = parseFloat(localStorage.getItem('acr_study_fs') || '10.5');
var lh = parseFloat(localStorage.getItem('acr_study_lh') || '1.65');
var sbo = true;
var cur = -1;
var vop = false;
var npop = false;
var nvop = false;

document.documentElement.style.setProperty('--lh', lh);

// ---- Reading Aids: BeeLine gradient + Line Focus ----
var beelineOn = localStorage.getItem('acr_study_beeline') === '1';
var lineFocusOn = localStorage.getItem('acr_study_linefocus') === '1';

function toggleBeeline() {
  beelineOn = !beelineOn;
  document.body.classList.toggle('beeline-on', beelineOn);
  try { localStorage.setItem('acr_study_beeline', beelineOn ? '1' : '0'); } catch (e) {}
}

function toggleLineFocus() {
  lineFocusOn = !lineFocusOn;
  document.body.classList.toggle('linefocus-on', lineFocusOn);
  try { localStorage.setItem('acr_study_linefocus', lineFocusOn ? '1' : '0'); } catch (e) {}
}

var childMode = localStorage.getItem('acr_study_child') === '1';

function toggleChildMode() {
  childMode = !childMode;
  document.body.classList.toggle('child-mode', childMode);
  if (childMode) {
    document.body.classList.add('font-dyslexic');
  }
  try { localStorage.setItem('acr_study_child', childMode ? '1' : '0'); } catch (e) {}
}

if (childMode) {
  document.body.classList.add('child-mode');
  document.body.classList.add('font-dyslexic');
}
if (beelineOn) document.body.classList.add('beeline-on');
if (lineFocusOn) document.body.classList.add('linefocus-on');

// ---- Volume banner graphics (inline SVG, no external dependency) ----
var VOL_ICONS = {
  '1': 'BR', '2': 'SH', '3': 'VY', '4': 'NM',
  '5': 'DV', '6': 'CH', '7': 'YV', '8': 'BG', '33': 'WR', 'SR': 'SR'
};
var VOL_COLORS = {
  '1': ['#2563eb','#1e40af'], '2': ['#dc2626','#991b1b'], '3': ['#059669','#065f46'],
  '4': ['#d97706','#92400e'], '5': ['#7c3aed','#5b21b6'], '6': ['#0891b2','#155e75'],
  '7': ['#ea580c','#9a3412'], '8': ['#57534e','#292524'], '33': ['#b8860b','#78350f'], 'SR': ['#166534','#14532d']
};
var VOL_NAMES = {
  '1': 'Bereshit \u00B7 Genesis', '2': 'Shemot \u00B7 Exodus',
  '3': 'Vayikra \u00B7 Leviticus', '4': 'Bamidbar \u00B7 Numbers',
  '5': 'Devarim \u00B7 Deuteronomy', '6': 'Chanokh \u00B7 Book of Chanokh',
  '7': 'Yovelim \u00B7 Book of Jubilees', '8': 'Book of Giants \u00B7 Sefer HaNephilim',
  '33': 'War Scroll 1QM',
  'SR': 'ACR Search Reference'
};

function getVolForFid(fid) {
  var idx = IDS.indexOf(fid);
  if (idx < 0) return '1';
  var count = 0;
  for (var g = 0; g < VOL_GROUPS.length; g++) {
    count += VOL_GROUPS[g].count;
    if (idx < count) return VOL_GROUPS[g].vol;
  }
  return '1';
}

function volBanner(volId) {
  var c = VOL_COLORS[volId] || ['#2563eb','#1e40af'];
  var name = VOL_NAMES[volId] || '';
  return '<div class="vol-banner" style="background:linear-gradient(135deg,#1a1a2e 0%,#2a2a4e 100%);border-left:4px solid ' + c[0] + '">' +
    '<div class="vol-banner-name" style="color:' + c[0] + '">' + name + '</div>' +
    '</div>';
}

// ---- Tap-to-hear: tap any word in content areas to hear it spoken ----
document.addEventListener('click', function (e) {
  var target = e.target;
  if (!target || target.tagName === 'BUTTON' || target.tagName === 'SELECT' ||
      target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'A') return;
  // Only in content areas
  var inContent = target.closest('.ll-card, .cloze-prompt, .mc-question, .sv-text, .sv-td, .sv-fa, .fc-front, .fc-back, .sv-fq');
  if (!inContent) return;
  var sel = window.getSelection();
  if (sel && sel.toString().trim().length > 0) return; // don't interfere with selection
  // Get the word under the tap
  var range = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null;
  if (!range) return;
  range.expand('word');
  var word = range.toString().trim();
  if (word && word.length > 1 && word.length < 40) {
    speakText(word);
  }
});

// ---- SM-2 Spaced Repetition Algorithm ----
// Each card: {id, fid, front, back, type, ease:2.5, interval:1, reps:0, nextReview:dateStr}
// Confidence 1-5 maps: 1=again(0), 2=hard(1), 3=okay(3), 4=good(4), 5=easy(5)

function getCards() {
  try { return JSON.parse(localStorage.getItem('acr_study_cards') || '{}'); } catch (e) { return {}; }
}
function saveCards(cards) {
  try { localStorage.setItem('acr_study_cards', JSON.stringify(cards)); } catch (e) {}
}

function sm2(card, quality) {
  // quality: 0-5 (mapped from confidence 1-5)
  var c = Object.assign({}, card);
  if (quality < 3) {
    c.reps = 0;
    c.interval = 1;
  } else {
    if (c.reps === 0) c.interval = 1;
    else if (c.reps === 1) c.interval = 6;
    else c.interval = Math.round(c.interval * c.ease);
    c.reps++;
  }
  c.ease = c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (c.ease < 1.3) c.ease = 1.3;
  var next = new Date();
  next.setDate(next.getDate() + c.interval);
  c.nextReview = next.toISOString().slice(0, 10);
  return c;
}

function getOrCreateCard(fid, front, back, type) {
  var cards = getCards();
  var id = fid + ':' + type + ':' + front.slice(0, 30);
  if (!cards[id]) {
    cards[id] = { id: id, fid: fid, front: front, back: back, type: type,
      ease: 2.5, interval: 1, reps: 0, nextReview: new Date().toISOString().slice(0, 10) };
    saveCards(cards);
  }
  return cards[id];
}

function getDueCards(fid) {
  var cards = getCards();
  var today = new Date().toISOString().slice(0, 10);
  var due = [];
  for (var id in cards) {
    if (cards[id].fid === fid && cards[id].nextReview <= today) {
      due.push(cards[id]);
    }
  }
  due.sort(function (a, b) { return a.ease - b.ease; });
  return due;
}

function getAllDueCount() {
  var cards = getCards();
  var today = new Date().toISOString().slice(0, 10);
  var count = 0;
  for (var id in cards) {
    if (cards[id].nextReview <= today) count++;
  }
  return count;
}

function updateCard(card) {
  var cards = getCards();
  cards[card.id] = card;
  saveCards(cards);
}

function isVolumeMastered(volId) {
  var cards = getCards();
  var volFids = [];
  var count = 0;
  for (var g = 0; g < VOL_GROUPS.length; g++) {
    for (var i = 0; i < VOL_GROUPS[g].count; i++) {
      if (VOL_GROUPS[g].vol === volId) volFids.push(IDS[count]);
      count++;
    }
  }
  if (!volFids.length) return false;
  var volCards = [];
  for (var id in cards) {
    if (volFids.indexOf(cards[id].fid) >= 0) volCards.push(cards[id]);
  }
  if (volCards.length < 5) return false; // need at least 5 cards studied
  var mastered = volCards.filter(function (c) { return c.ease >= 2.5 && c.reps >= 3; });
  return mastered.length >= volCards.length * 0.8; // 80% mastered
}

function getVolumeSessionCount(volId) {
  var s = getStats();
  if (!s.sessions) return 0;
  var volFids = [];
  var count = 0;
  for (var g = 0; g < VOL_GROUPS.length; g++) {
    for (var i = 0; i < VOL_GROUPS[g].count; i++) {
      if (VOL_GROUPS[g].vol === volId) volFids.push(IDS[count]);
      count++;
    }
  }
  return s.sessions.filter(function(ses) { return volFids.indexOf(ses.fid) >= 0; }).length;
}

// ---- Question Mastery Tracking ----
function getQuizMastery() {
  try { return JSON.parse(localStorage.getItem('acr_study_qmastery') || '{}'); } catch (e) { return {}; }
}
function saveQuizMastery(m) {
  try { localStorage.setItem('acr_study_qmastery', JSON.stringify(m)); } catch (e) {}
}
function recordQuestionResult(fid, mode, qIndex, correct) {
  var m = getQuizMastery();
  var key = fid + ':' + mode + ':' + qIndex;
  if (!m[key]) m[key] = { correct: 0, attempts: 0, mastered: false };
  m[key].attempts++;
  if (correct) m[key].correct++;
  if (m[key].correct >= 3) m[key].mastered = true;
  saveQuizMastery(m);
}

// ---- Remix Queue (BUILD_PLAN #4) ----
// Tracks every question a user misses. At round end, the Remix card
// resurfaces each item in the OPPOSITE game format so the user gets
// another chance without repeating the exact same experience. Cleared
// only when the remixed version is answered correctly.

function getRemixQueue() {
  try { return JSON.parse(localStorage.getItem('acr_study_remix_queue') || '[]'); }
  catch (e) { return []; }
}
function saveRemixQueue(q) {
  try { localStorage.setItem('acr_study_remix_queue', JSON.stringify(q || [])); }
  catch (e) {}
}
function remixKey(item) {
  // Unique identity so we never push the same miss twice.
  return item.fid + '|' + item.missedInMode + '|' + (item.ref || '') + '|' + ((item.prompt || item.question || '').slice(0, 60));
}
function pushToRemixQueue(item) {
  if (!item || !item.fid || !item.missedInMode) return;
  var q = getRemixQueue();
  var key = remixKey(item);
  for (var i = 0; i < q.length; i++) {
    if (remixKey(q[i]) === key) return; // already queued
  }
  item.missedAt = new Date().toISOString();
  q.push(item);
  // Cap the queue so it doesn't grow unbounded
  if (q.length > 100) q = q.slice(-100);
  saveRemixQueue(q);
}
function removeFromRemixQueue(item) {
  var q = getRemixQueue();
  var key = remixKey(item);
  var out = [];
  for (var i = 0; i < q.length; i++) {
    if (remixKey(q[i]) !== key) out.push(q[i]);
  }
  saveRemixQueue(out);
}
function getRemixCount(fid) {
  var q = getRemixQueue();
  if (!fid) return q.length;
  var n = 0;
  for (var i = 0; i < q.length; i++) if (q[i].fid === fid) n++;
  return n;
}
function getSectionMastery(fid) {
  var m = getQuizMastery();
  var total = 0, mastered = 0;
  for (var key in m) {
    if (key.indexOf(fid + ':') === 0) {
      total++;
      if (m[key].mastered) mastered++;
    }
  }
  if (total === 0) return { total: 0, mastered: 0, pct: 0, badge: '' };
  var pct = Math.round(mastered / total * 100);
  var badge = pct >= 100 ? 'Mastered' : pct >= 80 ? 'Advanced' : pct >= 50 ? 'In Progress' : '';
  return { total: total, mastered: mastered, pct: pct, badge: badge };
}
function getUnmasteredQuestions(fid, mode, questions) {
  var m = getQuizMastery();
  var unmastered = [];
  for (var i = 0; i < questions.length; i++) {
    var key = fid + ':' + mode + ':' + i;
    if (!m[key] || !m[key].mastered) unmastered.push({ q: questions[i], origIdx: i });
  }
  return unmastered;
}
function getNextSectionFid(fid) {
  var idx = IDS.indexOf(fid);
  if (idx < 0 || idx >= IDS.length - 1) return null;
  return IDS[idx + 1];
}
function getAllDueCards() {
  var cards = getCards();
  var today = new Date().toISOString().slice(0, 10);
  var due = [];
  for (var id in cards) {
    if (cards[id].nextReview <= today) due.push(cards[id]);
  }
  due.sort(function (a, b) { return a.ease - b.ease; });
  return due;
}

// ---- XP, Streak & Level system ----
var LEVELS = [
  { name: 'Seeker',               icon: 'target', xp: 0 },
  { name: 'Scholar',              icon: 'book',   xp: 600 },
  { name: 'Guardian',             icon: 'shield', xp: 3000 },
  { name: 'Keeper of the Scroll', icon: 'scroll', xp: 12000 }
];

function getStats() {
  try { return JSON.parse(localStorage.getItem('acr_study_stats') || '{}'); }
  catch (e) { return {}; }
}

// ---- Hint Ladder (BUILD_PLAN #5) ----
// Three progressive hints per question. XP multiplier reduces as hints
// are used: 0 hints = 1.0 (10 XP), 1 = 0.7 (7 XP), 2 = 0.4 (4 XP),
// 3 = 0.1 (1 XP). Full answer never auto-revealed; user must still
// submit a final guess.

function blankedReveal(answer) {
  if (!answer) return '';
  var a = String(answer);
  if (a.length <= 2) return a.toUpperCase();
  var out = a[0].toUpperCase();
  for (var i = 1; i < a.length - 1; i++) {
    out += (a[i] === ' ' ? '  ' : ' _');
  }
  out += ' ' + a[a.length - 1].toUpperCase();
  return out;
}

function buildHintLadder(answer, passage) {
  var a = String(answer || '').trim();
  var wordCount = a ? a.split(/\s+/).length : 0;
  var lenLabel = wordCount > 1
    ? (wordCount + ' words, starts with "' + a.charAt(0).toUpperCase() + '"')
    : ('Starts with "' + a.charAt(0).toUpperCase() + '", ' + a.length + ' letters');
  var stage1 = lenLabel;
  var stage2 = passage ? '"' + String(passage).trim() + '"' : 'No passage available for this question.';
  var stage3 = blankedReveal(a);
  return [stage1, stage2, stage3];
}

function hintMultiplier(hintsUsed) {
  if (hintsUsed <= 0) return 1.0;
  if (hintsUsed === 1) return 0.7;
  if (hintsUsed === 2) return 0.4;
  return 0.1;
}

function injectGameBack(fid) {
  var first = document.getElementById('content').firstElementChild;
  if (!first) return;
  var btn = document.createElement('button');
  btn.className = 'g-back';
  btn.setAttribute('aria-label', 'Back to activities');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;vertical-align:-2px"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 18 5 12 11 6"/></svg> Activities';
  btn.addEventListener('click', function () { go(fid); });
  first.insertBefore(btn, first.firstChild);
}

// Wires up a hint button + display element already present in the DOM.
// Caller provides element IDs, the answer, the passage, and a callback
// invoked each time a hint is consumed (to increment its hintsUsed
// counter for scoring).
function wireHintLadder(btnId, displayId, answer, passage, onUse) {
  var btn = document.getElementById(btnId);
  var disp = document.getElementById(displayId);
  if (!btn || !disp) return;
  var stages = buildHintLadder(answer, passage);
  var labels = ['Hint', 'Show passage', 'Reveal pattern'];
  var used = 0;
  btn.addEventListener('click', function () {
    if (used >= 3) return;
    disp.innerHTML = '<div class="hint-stage hint-stage-' + (used + 1) + '">' + stages[used] + '</div>';
    used++;
    if (used < 3) {
      btn.innerHTML = labels[used];
    } else {
      btn.innerHTML = '\u2714 Hints used';
      btn.disabled = true;
    }
    if (typeof onUse === 'function') onUse(used);
  });
}

// ---- Flashcard context enrichment ----
// Find the shortest sentence in the curated content that contains the
// term, so the flashcard back can teach the word in its real context.
function findTermContextInCuratedData(term, data) {
  if (!term || !data) return '';
  var re = new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  var sources = [];
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  var best = null;
  for (var i = 0; i < sources.length; i++) {
    var sentences = sources[i].match(/[^.!?]+[.!?]+/g) || [sources[i]];
    for (var s = 0; s < sentences.length; s++) {
      var sent = sentences[s].trim();
      if (sent.length < 20 || sent.length > 240) continue;
      if (!re.test(sent)) continue;
      if (!best || sent.length < best.length) best = sent;
    }
  }
  return best || '';
}

function termUsagePrompt(term, isProperNoun) {
  if (isProperNoun) {
    return 'Who or what is ' + term + ', and what role do they play here?';
  }
  return 'What does "' + term + '" mean in this passage, and why is it important?';
}

// ---- Speaker-quote extraction (for Who Said It mode) ----
var SPEAKER_VERBS = 'said|replied|answered|asked|spoke|declared|announced|' +
  'called|responded|commanded|charged|proclaimed|blessed|cursed|prayed|' +
  'swore|vowed|wept|cried|told';
var SPEAKER_NAME = '[A-Z][a-zA-Z\u2019\']+(?:\\s+[A-Z][a-zA-Z\u2019\']+)?';

function extractSpeakerQuotesFromCurated(data) {
  if (!data) return [];
  var sources = [];
  if (data.summary_plain) sources.push(data.summary_plain);
  if (data.summary_scholarly) sources.push(data.summary_scholarly);
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.faq) data.faq.forEach(function (q) { if (q.answer) sources.push(q.answer); });

  // Existing curly/straight-quote patterns
  var p1 = new RegExp('[\u201C"]([^\u201C\u201D"]{10,240})[.?!,]?[\u201D"]\\s*(' + SPEAKER_NAME + ')\\s+(?:' + SPEAKER_VERBS + ')\\b', 'g');
  var p2 = new RegExp('[\u201C"]([^\u201C\u201D"]{10,240})[.?!,]?[\u201D"]\\s*(?:' + SPEAKER_VERBS + ')\\s+(' + SPEAKER_NAME + ')\\b', 'g');
  var p3 = new RegExp('\\b(' + SPEAKER_NAME + ')\\s+(?:' + SPEAKER_VERBS + ')[,:]?\\s*[\u201C"]([^\u201C\u201D"]{10,240})[\u201D"]', 'g');
  var p4 = new RegExp('\\b(' + SPEAKER_NAME + ')\\s+(?:' + SPEAKER_VERBS + ')\\s+(?:to|unto)\\s+[^,"\u201C\u201D]{1,50}[,:]\\s*[\u201C"]([^\u201C\u201D"]{10,240})[\u201D"]', 'g');
  // NEW: colon-introduced unquoted speech — the ACR style.
  // "YHWH said to Qayin: Where is Hevel your brother?"
  // "Mosheh said: Remember this day."
  // Capture name group, then everything after the colon up to sentence end.
  var p5 = new RegExp('\\b(' + SPEAKER_NAME + ')\\s+(?:' + SPEAKER_VERBS + ')(?:\\s+(?:to|unto)\\s+[^:,\u201C\u201D"]{1,50})?[,:]\\s+([^.!?]{10,240}[.!?])', 'g');

  var results = [];
  var seen = {};
  // Strip leading conjunctions so "And YHWH" becomes "YHWH".
  function cleanSpeaker(s) {
    var leadWords = /^(?:And|Then|So|But|Now|Yet|For|Therefore|Behold|When|After|Before|Because|If|Though|While|Until|As|Since)\s+/;
    var cleaned = String(s || '').trim();
    while (leadWords.test(cleaned)) cleaned = cleaned.replace(leadWords, '');
    return cleaned;
  }
  function add(quote, speaker) {
    var q = String(quote || '').trim();
    var s = cleanSpeaker(speaker);
    if (q.length < 10 || s.length < 2) return;
    // Reject speaker-candidates that are still a single function word
    if (/^(The|This|That|These|Those|He|She|They|It|We|You)$/.test(s)) return;
    var key = q.toLowerCase().slice(0, 60);
    if (seen[key]) return;
    seen[key] = true;
    results.push({ quote: q, speaker: s });
  }
  for (var i = 0; i < sources.length; i++) {
    var text = sources[i];
    var m;
    p1.lastIndex = 0; while ((m = p1.exec(text)) !== null) add(m[1], m[2]);
    p2.lastIndex = 0; while ((m = p2.exec(text)) !== null) add(m[1], m[2]);
    p3.lastIndex = 0; while ((m = p3.exec(text)) !== null) add(m[2], m[1]);
    p4.lastIndex = 0; while ((m = p4.exec(text)) !== null) add(m[2], m[1]);
    p5.lastIndex = 0; while ((m = p5.exec(text)) !== null) add(m[2], m[1]);
  }
  return results;
}

function saveStats(s) {
  try { localStorage.setItem('acr_study_stats', JSON.stringify(s)); } catch (e) {}
}

function addXP(amount) {
  var s = getStats();
  s.xp = (s.xp || 0) + amount;
  s.totalAnswered = (s.totalAnswered || 0) + 1;
  updateStreak(s);
  saveStats(s);
  return s;
}

function recordSession(fid, mode, score, total) {
  var s = getStats();
  var oldLevelName = getLevel(s.xp || 0).current.name;
  if (!s.sessions) s.sessions = [];
  s.sessions.push({
    fid: fid, mode: mode, score: score, total: total,
    date: new Date().toISOString().slice(0, 10)
  });
  if (s.sessions.length > 100) s.sessions = s.sessions.slice(-100);
  var xpEarned = Math.round(score * 10);
  s.xp = (s.xp || 0) + xpEarned;
  s.totalAnswered = (s.totalAnswered || 0) + (total || 0);
  s.totalCorrect = (s.totalCorrect || 0) + (score || 0);
  updateStreak(s);
  var newLevelName = getLevel(s.xp).current.name;
  if (newLevelName !== oldLevelName) s.pendingLevelUp = newLevelName;
  saveStats(s);
  return xpEarned;
}

function updateStreak(s) {
  var today = new Date().toISOString().slice(0, 10);
  if (s.lastStudyDate === today) return;
  if (!s.lastStudyDate) {
    s.streak = 1;
  } else {
    var last = new Date(s.lastStudyDate);
    var now = new Date(today);
    var diff = Math.round((now - last) / 86400000);
    if (diff === 1) {
      s.streak = (s.streak || 0) + 1;
    } else if (diff === 2 && (s.freezeTokens || 0) > 0) {
      s.freezeTokens = s.freezeTokens - 1;
      s.streak = (s.streak || 0) + 1;
    } else {
      s.streak = 1;
    }
    if (s.streak > 0 && s.streak % 7 === 0) {
      s.freezeTokens = (s.freezeTokens || 0) + 1;
    }
  }
  s.lastStudyDate = today;
  if (!s.bestStreak || s.streak > s.bestStreak) s.bestStreak = s.streak;
}

function getLevel(xp) {
  var lvl = LEVELS[0];
  for (var i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) { lvl = LEVELS[i]; break; }
  }
  var nextIdx = LEVELS.indexOf(lvl) + 1;
  var next = nextIdx < LEVELS.length ? LEVELS[nextIdx] : null;
  return { current: lvl, next: next };
}

function buildTOC() {
  var sb = document.getElementById('sb');
  var intro = document.createElement('div');
  intro.className = 'sb-intro';
  intro.innerHTML = lbIcon('book', 22) + ' ACR STUDY — 8 VOLUMES';
  sb.appendChild(intro);

  var idx = 0;
  for (var g = 0; g < VOL_GROUPS.length; g++) {
    var group = VOL_GROUPS[g];
    var volColorVars = ['--vol1','--vol2','--vol3','--vol4','--vol5','--vol6','--vol7','--vol8'];
    var h = document.createElement('div');
    h.className = 'vol-hdr';
    h.setAttribute('data-vol', group.vol);
    h.style.color = 'var(' + volColorVars[g % 8] + ')';
    var mastered = isVolumeMastered(group.vol);
    h.innerHTML = group.title +
      (mastered ? ' <span class="vol-badge">' + lbIcon('trophy', 14) + '</span>' : '') +
      (group.eng ? '<span class="vol-eng">' + group.eng + '</span>' : '');
    sb.appendChild(h);
    for (var i = 0; i < group.count; i++) {
      var fid = IDS[idx];
      var s = document.createElement('div');
      s.className = 'sec';
      s.setAttribute('data-id', fid);
      s.setAttribute('role', 'button');
      s.setAttribute('tabindex', '0');
      s.setAttribute('aria-label', 'Study section: ' + LBL[idx]);
      s.textContent = LBL[idx];
      (function (capturedFid) {
        s.addEventListener('click', function () { go(capturedFid); });
      })(fid);
      sb.appendChild(s);
      idx++;
    }
  }
}

function applyFontSize() {
  var c = document.getElementById('content');
  if (c) c.style.fontSize = fs + 'pt';
}

function go(fid) {
  var i = IDS.indexOf(fid);
  if (i < 0) return;
  cur = i;

  // Silently fetch and cache the chapter data for quiz engines to use later,
  // but never display raw text — this is a study app, not a reader.
  fetch('../data/' + fid + '.json')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d) CHAPTER_CACHE[fid] = d; })
    .catch(function () {});

  // Also pre-load curated content
  loadContent(fid);

  // Render the activity card grid
  var dueCount = getDueCards(fid).length;
  var totalDue = getAllDueCount();
  var volId = getVolForFid(fid);
  var h = volBanner(volId);
  h += '<div class="activity-grid-header">' + LBL[i] + '</div>';
  if (dueCount > 0 || totalDue > 0) {
    h += '<div class="due-banner">';
    if (dueCount > 0) h += '<span class="due-badge" style="display:inline-flex;align-items:center;gap:6px">' + lbIcon('cards', 14) + ' ' + dueCount + ' cards due for review in this section</span>';
    if (totalDue > dueCount) h += '<span class="due-total">' + totalDue + ' total due across all sections</span>';
    h += '</div>';
  }
  var secMastery = getSectionMastery(fid);
  if (secMastery.total > 0) {
    h += '<div class="mastery-bar"><div class="mastery-label">' +
      (secMastery.badge ? secMastery.badge + ' ' : '') + secMastery.mastered + '/' + secMastery.total +
      ' questions mastered (' + secMastery.pct + '%)</div>' +
      '<div class="prog-bar-wrap"><div class="prog-bar" style="width:' + secMastery.pct + '%"></div></div></div>';
  }
  var volForTrial = getVolForFid(fid);
  var trialUnlocked = TRIAL_QUESTIONS[volForTrial] && (isVolumeMastered(volForTrial) || getVolumeSessionCount(volForTrial) >= 10);
  if (trialUnlocked) {
    var trialStats = getTrialStats();
    var trialDone = trialStats.completed && trialStats.completed[volForTrial];
    var trialBest = trialStats.best && trialStats.best[volForTrial];
    h += '<div class="act-card" data-mode="trial" style="background:linear-gradient(135deg,#92400e,#78350f);border:2px solid #b8860b" role="button" tabindex="0" aria-label="Covenant Trial">' +
      '<div class="act-icon" aria-hidden="true">' + lbIcon('trophy', 32) + '</div>' +
      '<div class="act-label">Covenant Trial' +
      (trialDone ? '<br><span style="font-size:11px;opacity:.85">Best: ' + (trialBest || 0) + '%</span>' : '<br><span style="font-size:11px;opacity:.85">Double XP — No hints</span>') +
      '</div></div>';
  }
  h += '<div class="act-card" data-mode="truthuncovered" style="background:linear-gradient(135deg,#7a2f8a,#b8860b);border:2px solid #d9a441" role="button" tabindex="0" aria-label="Truth Uncovered game show">' +
    '<div class="act-icon" aria-hidden="true">' + lbIcon('trophy', 32) + '</div>' +
    '<div class="act-label">Truth Uncovered<br><span style="font-size:11px;opacity:.85">Evidence Board · Sealed Scrolls · teams</span></div></div>';
  h += '<div style="font-size:11px;color:#4ade80;font-weight:700;letter-spacing:1px;padding:8px 0 4px">START HERE</div>';
  h += '<div class="activity-grid" style="margin-bottom:4px">';
  h += actCard(lbIcon('puzzle',        32), 'Fill in the Blank', '#059669', 'filblank', fid);
  h += actCard(lbIcon('pencil',        32), 'Multiple Choice', '#7c3aed', 'mc', fid);
  h += '</div>';
  h += '<div style="font-size:11px;color:#888;font-weight:700;letter-spacing:1px;padding:8px 0 4px">ALL ACTIVITIES</div>';
  h += '<div class="activity-grid">';
  h += actCard(lbIcon('book',          32), 'Chapter Summary', '#2563eb', 'summary', fid);
  h += actCard(lbIcon('puzzle',        32), 'Fill in the Blank', '#059669', 'filblank', fid);
  h += actCard(lbIcon('headphones',    32), 'Audio Fill the Gap', '#16a34a', 'audio-filblank', fid);
  h += actCard(lbIcon('pencil',        32), 'Multiple Choice', '#7c3aed', 'mc', fid);
  h += actCard(lbIcon('chat',          32), 'Who Said It', '#a855f7', 'whosaidit', fid);
  h += actCard(lbIcon('scale',         32), 'True or False', '#0ea5e9', 'truefalse', fid);
  h += actCard(lbIcon('shuffle',       32), 'Story Sequence', '#ea580c', 'sequence', fid);
  h += actCard(lbIcon('arrows',        32), 'Cause & Effect', '#be185d', 'causeeffect', fid);
  h += actCard(lbIcon('headphones',    32), 'Dictation', '#0891b2', 'dictation', fid);
  h += actCard(lbIcon('shuffle',       32), 'Word Morph', '#4338ca', 'morph', fid);
  h += actCard(lbIcon('eye',           32), 'Syllable Tap', '#f59e0b', 'syllable', fid);
  h += actCard(lbIcon('music',         32), 'Rhyme Chain', '#0891b2', 'rhyme', fid);
  h += actCard(lbIcon('brain',         32), 'Mind Map', '#7c3aed', 'mindmap', fid);
  h += actCard(lbIcon('web', 32), 'Concept Web', '#9333ea', 'conceptweb', fid);
  h += actCard(lbIcon('calendar',      32), 'Timeline', '#0284c7', 'timeline', fid);
  h += actCard(lbIcon('cards2',        32), 'Flashcards', '#d97706', 'flash', fid);
  h += actCard(lbIcon('cards',         32), 'Key Terms', '#0891b2', 'terms', fid);
  h += actCard(lbIcon('lightbulb',     32), 'FAQ', '#ea580c', 'faq', fid);
  h += actCard(lbIcon('puzzle',        32), 'Memory Match', '#dc2626', 'memory', fid);
  h += actCard(lbIcon('speaker',       32), 'Listen & Learn', '#4f46e5', 'listen', fid);
  h += actCard(lbIcon('trophy',        32), 'Progress', '#b8860b', 'progress', fid);
  h += actCard(lbIcon('puzzle',        32), 'Verse Builder', '#e91e90', 'versebuild', fid);
  h += actCard(lbIcon('puzzle',        32), 'Word Match', '#6d28d9', 'wordmatch', fid);
  h += actCard(lbIcon('shield',        32), 'Challenge', '#b91c1c', 'challenge', fid);
  var remixN = getRemixCount(fid);
  if (remixN > 0) {
    h += '<div class="act-card act-card-remix" data-mode="remix" role="button" tabindex="0" aria-label="Remix Round activity, ' + remixN + ' due">' +
      '<div class="act-icon" aria-hidden="true">' + lbIcon('shuffle', 32) + '</div>' +
      '<div class="act-label">Remix Round<br><span class="act-remix-badge">' + remixN + ' due</span></div>' +
      '</div>';
  }
  h += '</div>';

  document.getElementById('content').innerHTML = h;
  document.getElementById('tb').textContent = LBL[i];
  var todayStr = new Date().toISOString().slice(0, 10);
  var todayModes = {};
  (getStats().sessions || []).forEach(function (ses) {
    if (ses.fid === fid && ses.date === todayStr) todayModes[ses.mode] = true;
  });
  var actCards = document.querySelectorAll('.act-card[data-mode]');
  for (var ac = 0; ac < actCards.length; ac++) {
    if (todayModes[actCards[ac].dataset.mode]) actCards[ac].classList.add('act-card-done');
  }
  var secs = document.querySelectorAll('.sec');
  for (var j = 0; j < secs.length; j++) {
    secs[j].classList.toggle('on', secs[j].getAttribute('data-id') === fid);
  }
  try { localStorage.setItem('acr_study_last', fid); } catch (e) {}
  document.getElementById('np-lbl').textContent = 'Notes \u2014 ' + LBL[i];
  document.getElementById('np-ta').value = getNote(fid) || '';
  if (window.innerWidth <= 768) {
    document.getElementById('sb').classList.remove('m');
  }
  window.scrollTo(0, 0);

  // Wire up activity card clicks
  var cards = document.querySelectorAll('.act-card');
  for (var c = 0; c < cards.length; c++) {
    cards[c].addEventListener('click', (function (mode, f) {
      return function () { openActivity(mode, f); };
    })(cards[c].getAttribute('data-mode'), fid));
  }
}

var CHAPTER_CACHE = {};

// ---- Covenant Seals ----
var SEALS = [
  {id:'first_light',     title:'First Light',              desc:'Answer your first question correctly'},
  {id:'first_session',   title:'The First Day',            desc:'Complete a full study session'},
  {id:'ten_words',       title:'The Ten Words',            desc:'Answer 10 questions correctly'},
  {id:'seventy_souls',   title:'Seventy Souls',            desc:'Answer 70 questions in total'},
  {id:'hundred_years',   title:'A Hundred Years',          desc:'Answer 100 questions correctly'},
  {id:'five_hundred',    title:'Five Hundred',             desc:'Answer 500 questions in total'},
  {id:'bereshit_seal',   title:'Bereshit Sealed',          desc:'Reach 80% mastery in Bereshit', vol:'1'},
  {id:'shemot_seal',     title:'Shemot Sealed',            desc:'Reach 80% mastery in Shemot', vol:'2'},
  {id:'vayikra_seal',    title:'Vayikra Sealed',           desc:'Reach 80% mastery in Vayikra', vol:'3'},
  {id:'bamidbar_seal',   title:'Bamidbar Sealed',          desc:'Reach 80% mastery in Bamidbar', vol:'4'},
  {id:'devarim_seal',    title:'Devarim Sealed',           desc:'Reach 80% mastery in Devarim', vol:'5'},
  {id:'chanokh_seal',    title:'Chanokh Sealed',           desc:'Reach 80% mastery in Chanokh', vol:'6'},
  {id:'yovelim_seal',    title:'Yovelim Sealed',           desc:'Reach 80% mastery in Yovelim', vol:'7'},
  {id:'war_scroll_seal', title:'War Scroll Sealed',        desc:'Reach 80% mastery in the War Scroll', vol:'33'},
  {id:'covenant_keeper', title:'Covenant Keeper',          desc:'7-day study streak'},
  {id:'faithful_witness',title:'Faithful Witness',         desc:'14-day study streak'},
  {id:'walking_creator', title:'Walking with The Creator', desc:'30-day study streak'},
  {id:'scholars_path',   title:"Scholar's Path",           desc:'Reach Scholar level (100 XP)'},
  {id:'guardians_shield',title:"Guardian's Shield",        desc:'Reach Guardian level (500 XP)'},
  {id:'keeper_of_scroll',title:'Keeper of the Scroll',     desc:'Reach maximum level (1500 XP)'},
  {id:'daily_seeker',    title:'Daily Seeker',             desc:'Complete your first Daily Scroll'},
  {id:'daily_faithful',  title:'Daily Faithful',           desc:'Complete 7 Daily Scrolls'},
  {id:'first_trial',     title:'First Trial',              desc:'Complete your first Covenant Trial'},
  {id:'torah_complete',  title:'Torah Complete',           desc:'Complete Covenant Trials for all five Torah volumes'},
  {id:'ancient_seals',   title:'Ancient Seals',            desc:'Complete all eight Covenant Trials'}
];

function getSeals() {
  try { return JSON.parse(localStorage.getItem('acr_study_seals') || '{}'); } catch (e) { return {}; }
}
function saveSeals(s) {
  try { localStorage.setItem('acr_study_seals', JSON.stringify(s)); } catch (e) {}
}

function checkAndAwardSeals() {
  var earned = getSeals();
  var stats = getStats();
  var xp = stats.xp || 0;
  var streak = stats.streak || 0;
  var totalAnswered = stats.totalAnswered || 0;
  var totalCorrect = stats.totalCorrect || 0;
  var sessions = stats.sessions || [];
  var trialStats = getTrialStats();
  var dailyStats = getDailyStats();
  var newlyEarned = [];

  function award(id) {
    if (!earned[id]) { earned[id] = new Date().toISOString().slice(0,10); newlyEarned.push(id); }
  }

  if (totalCorrect >= 1) award('first_light');
  if (sessions.length >= 1) award('first_session');
  if (totalCorrect >= 10) award('ten_words');
  if (totalAnswered >= 70) award('seventy_souls');
  if (totalCorrect >= 100) award('hundred_years');
  if (totalAnswered >= 500) award('five_hundred');
  if (streak >= 7) award('covenant_keeper');
  if (streak >= 14) award('faithful_witness');
  if (streak >= 30) award('walking_creator');
  if (xp >= 100) award('scholars_path');
  if (xp >= 500) award('guardians_shield');
  if (xp >= 1500) award('keeper_of_scroll');
  if ((dailyStats.completed || 0) >= 1) award('daily_seeker');
  if ((dailyStats.completed || 0) >= 7) award('daily_faithful');

  var trialVols = Object.keys(trialStats.completed || {});
  if (trialVols.length >= 1) award('first_trial');
  var torahTrials = ['1','2','3','4','5'].filter(function(v){ return trialStats.completed && trialStats.completed[v]; });
  if (torahTrials.length >= 5) award('torah_complete');
  var allTrials = ['1','2','3','4','5','6','7','33'].filter(function(v){ return trialStats.completed && trialStats.completed[v]; });
  if (allTrials.length >= 8) award('ancient_seals');

  var volSealMap = {
    'bereshit_seal':'1','shemot_seal':'2','vayikra_seal':'3','bamidbar_seal':'4',
    'devarim_seal':'5','chanokh_seal':'6','yovelim_seal':'7','war_scroll_seal':'33'
  };
  for (var sid in volSealMap) {
    if (isVolumeMastered(volSealMap[sid])) award(sid);
  }

  if (newlyEarned.length > 0) saveSeals(earned);
  return newlyEarned;
}

// ---- Daily Scroll ----
function getDailyStats() {
  try { return JSON.parse(localStorage.getItem('acr_study_daily') || '{}'); } catch (e) { return {}; }
}
function saveDailyStats(d) {
  try { localStorage.setItem('acr_study_daily', JSON.stringify(d)); } catch (e) {}
}
function getDailyStatus() {
  var d = getDailyStats();
  var today = new Date().toISOString().slice(0,10);
  return { completedToday: d.lastDate === today, completed: d.completed || 0, streak: d.dailyStreak || 0 };
}
function getDailySeed() {
  var today = new Date().toISOString().slice(0,10);
  return today.replace(/-/g,'').split('').reduce(function(a,c){return a*31+c.charCodeAt(0);},0);
}
function getDailyQuestion() {
  var pool = [];
  var cc = CONTENT_CACHE || {};
  for (var fi = 0; fi < IDS.length; fi++) {
    var fdata = cc[IDS[fi]];
    if (fdata && fdata.fill_blank && fdata.fill_blank.length) {
      for (var qi = 0; qi < fdata.fill_blank.length; qi++) {
        pool.push({ fid: IDS[fi], q: fdata.fill_blank[qi] });
      }
    }
  }
  if (!pool.length) return null;
  var seed = getDailySeed();
  return pool[Math.abs(seed) % pool.length];
}
function completeDailyScroll(correct) {
  var d = getDailyStats();
  var today = new Date().toISOString().slice(0,10);
  if (d.lastDate === today) return;
  d.lastDate = today;
  d.completed = (d.completed || 0) + 1;
  var last = d.lastDailyDate;
  if (last) {
    var diff = Math.round((new Date(today) - new Date(last)) / 86400000);
    d.dailyStreak = diff === 1 ? (d.dailyStreak || 0) + 1 : 1;
  } else {
    d.dailyStreak = 1;
  }
  d.lastDailyDate = today;
  saveDailyStats(d);
  if (correct) {
    var s = getStats();
    s.xp = (s.xp || 0) + 25;
    s.totalAnswered = (s.totalAnswered || 0) + 1;
    s.totalCorrect = (s.totalCorrect || 0) + 1;
    updateStreak(s);
    saveStats(s);
  }
  checkAndAwardSeals();
}

// ---- Covenant Trial ----
var TRIAL_QUESTIONS = {
  '1': [
    {question:'Avraham is renamed from his original name Avram. What was the original name of his wife Sarah before YHWH changed it?',options:['Sarai','Hagar','Milcah','Keturah'],correct:0,source_quote:'As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name. — Bereshit 17:15'},
    {question:'At the Aqedah, YHWH told Avraham to offer his son on one of the mountains in the land of Moriah. What did Avraham name that place?',options:['El Shaddai','YHWH Yireh','El Elyon','YHWH Nissi'],correct:1,source_quote:'So Avraham called the name of that place, "YHWH will provide." — Bereshit 22:14'},
    {question:'Yosef told his brothers that their selling him was not driven by their decision alone. What greater purpose did he identify?',options:['To punish them for jealousy','To preserve life through famine','To fulfill a dream about the sun','To test the faithfulness of Yaakov'],correct:1,source_quote:'And now do not be distressed or angry with yourselves because you sold me here, for The Creator sent me before you to preserve life. — Bereshit 45:5'},
    {question:'Yaakov blessed Yosef\'s two sons and crossed his hands. Which son received the greater blessing that Yosef tried to correct?',options:['Manasseh, the firstborn','Ephraim, the younger','Reuben, the eldest','Binyamin, the youngest'],correct:1,source_quote:'He put Ephraim before Manasseh. — Bereshit 48:20'},
    {question:'When Yaakov died in Egypt, what did he command Yosef regarding his burial?',options:['Bury him beside Rachel in Bethlehem','Build him a tomb in Egypt','Carry him back to Canaan to the cave of Machpelah','Cast his ashes into the Nile'],correct:2,source_quote:'Bury me with my fathers in the cave that is in the field of Ephron the Hittite. — Bereshit 49:29'}
  ],
  '2': [
    {question:'At the burning bush, YHWH told Moshe His name. What exact phrase did YHWH use to describe His own name?',options:['I Am YHWH your Creator','Ehyeh Asher Ehyeh — I Will Be What I Will Be','El Shaddai — The Almighty','The Creator of Avraham'],correct:1,source_quote:'The Creator said to Moses, "I AM WHO I AM." And He said, "Say this to the people of Israel: I AM has sent me to you." — Shemot 3:14'},
    {question:'After crossing the sea, Miriam led the women in song and dance. What instrument did she use?',options:['Kinnor (lyre)','Nevel (harp)','Tof (timbrel)','Hazotzra (trumpet)'],correct:2,source_quote:'Then Miriam the prophetess, the sister of Aaron, took a timbrel in her hand, and all the women went out after her with timbrels and dancing. — Shemot 15:20'},
    {question:'At Sinai, YHWH told the people they would be to Him a kingdom of priests and a holy nation — but only on what condition?',options:['If they build the Mishkan correctly','If they keep all the commandments without fault','If they truly obey His voice and keep His covenant','If they defeat the nations of Canaan'],correct:2,source_quote:'If you will indeed obey my voice and keep my covenant, you shall be my treasured possession among all peoples. — Shemot 19:5'},
    {question:'After the golden calf, Moshe broke the first tablets. How were the second tablets different from the first?',options:['YHWH wrote them again exactly as before','Moshe carved them and YHWH wrote the words','YHWH carved them but Moshe wrote the words','The second tablets had fewer commandments'],correct:1,source_quote:'Carve two tablets of stone like the first, and I will write on the tablets the words that were on the first tablets. — Shemot 34:1'},
    {question:'The Ten Words (Aseret HaDibrot) open with a declaration before any commandment. What does YHWH state first?',options:['You shall have no other mighty ones before Me','I am YHWH your Creator who brought you out of Egypt, out of the house of slavery','Honor your father and your mother','Remember the Sabbath day to keep it holy'],correct:1,source_quote:'I am YHWH your Creator, who brought you out of the land of Egypt, out of the house of slavery. — Shemot 20:2'}
  ],
  '3': [
    {question:'Vayikra repeatedly uses a phrase to mark the ending of an instruction from YHWH to Moshe. What phrase appears most often?',options:['Thus says YHWH','I am YHWH','Hear O Yisrael','This is the law'],correct:1,source_quote:'I am YHWH. — Vayikra (recurring closing formula throughout the book)'},
    {question:'On Yom Kippur, the high priest enters the Holy of Holies. What specific garments does he wear for this entry?',options:['The golden vestments with the breastplate','Plain white linen garments only','The blue robe with pomegranates','The priestly crown and ephod'],correct:1,source_quote:'He shall put on the holy linen coat and shall have the linen undergarment on his body, and he shall tie the linen sash around his waist, and wear the linen turban; these are the holy garments. — Vayikra 16:4'},
    {question:'Shemitah (the seventh-year rest) benefits the land. What is Yovel (the fiftieth year) specifically about beyond the land?',options:['A second Shemitah with double rest','The release of enslaved Hebrews and return of ancestral lands','A time for the high priest to enter the Holy of Holies','The national counting of all the people'],correct:1,source_quote:'You shall consecrate the fiftieth year, and proclaim liberty throughout the land to all its inhabitants. — Vayikra 25:10'},
    {question:'YHWH commands the people to be holy. What reason does He give for this command in Vayikra?',options:['Because holiness brings long life','Because the nations are watching you','Because I YHWH your Creator am holy','Because the Mishkan must be kept pure'],correct:2,source_quote:'You shall be holy, for I YHWH your Creator am holy. — Vayikra 19:2'},
    {question:'YHWH promises that despite disobedience He will not utterly destroy the covenant. What specific reason does He give?',options:['Because of the faithfulness of the priests','Because He remembers the covenant with the ancestors','Because the people will eventually repent','Because the land itself cries out to Him'],correct:1,source_quote:'Yet for all that, when they are in the land of their enemies, I will not spurn them, neither will I abhor them so as to destroy them utterly and break my covenant with them, for I am YHWH their Creator. But I will for their sake remember the covenant with their forefathers. — Vayikra 26:44-45'}
  ],
  '4': [
    {question:'The spirit of prophecy fell on seventy elders in the camp, but two remained in the camp and also prophesied. What were their names?',options:['Datan and Aviram','Korah and On','Eldad and Medad','Caleb and Yehoshua'],correct:2,source_quote:'But two men remained in the camp, one named Eldad, and the other named Medad, and the spirit rested on them. — Bamidbar 11:26'},
    {question:'YHWH spoke to all prophets through visions and dreams. How did He speak specifically to Moshe?',options:['Through fire and thunder on the mountain','Through the Urim and Thummim','Mouth to mouth, clearly and not in riddles','Through the voice of the angel of YHWH'],correct:2,source_quote:'With him I speak mouth to mouth, clearly, and not in riddles, and he beholds the form of YHWH. — Bamidbar 12:8'},
    {question:'Calev was the only one among the twelve spies (besides Yehoshua) with a different spirit. What was the specific quality attributed to him?',options:['He trusted in the size of the armies','He had followed YHWH fully','He was the most experienced warrior','He had no fear of any human being'],correct:1,source_quote:'But my servant Caleb, because he has a different spirit and has followed me fully, I will bring into the land into which he went. — Bamidbar 14:24'},
    {question:'At Merivah, Moshe struck the rock twice instead of speaking to it. What consequence did YHWH give specifically to Moshe and Aharon?',options:['They would wander an extra forty years','They would not enter the land He was giving to Yisrael','They lost the privilege of the priesthood','They were required to make an offering of atonement'],correct:1,source_quote:'Because you did not believe in me, to uphold me as holy in the eyes of the people of Israel, therefore you shall not bring this assembly into the land that I have given them. — Bamidbar 20:12'},
    {question:'The Aaronic Blessing has three parts and ends with a specific word. What is the final word of the blessing?',options:['shalom','tzedek','hesed','emet'],correct:0,source_quote:'YHWH lift up his countenance upon you and give you shalom. — Bamidbar 6:26'}
  ],
  '5': [
    {question:'Moshe speaks all the words of Devarim in a specific place and time. Where was he standing when he began?',options:['On Mount Horeb before the burning bush','In the Mishkan at Shiloh','On the other side of the Yarden in the wilderness','On the peak of Mount Nebo'],correct:2,source_quote:'These are the words that Moses spoke to all Israel beyond the Jordan in the wilderness. — Devarim 1:1'},
    {question:'The Shema has two major parts. The first is "YHWH our Creator YHWH is one." What does the second part command?',options:['You shall not have other mighty ones before Me','You shall love YHWH your Creator with all your heart and all your soul and all your might','Remember the Sabbath day to keep it holy','You shall teach your children all these statutes'],correct:1,source_quote:'You shall love YHWH your Creator with all your heart and with all your soul and with all your might. — Devarim 6:5'},
    {question:'A prophet arises who performs signs and wonders but leads the people away from YHWH. What is the test for whether to follow him?',options:['Whether the signs he performs come true','Whether the elders of the city confirm his words','Whether he speaks in the name of YHWH alone','Whether his words call the people to serve other mighty ones'],correct:3,source_quote:'If a prophet or a dreamer of dreams arises among you and gives you a sign or a wonder, and the sign or wonder that he tells you comes to pass, and if he says, "Let us go after other gods"... you shall not listen. — Devarim 13:1-3'},
    {question:'What specific condition does YHWH give for the promised restoration after exile and return?',options:['Building the Temple before returning','Defeating all surrounding nations','Returning to YHWH with all your heart and soul','Offering a burnt offering for every tribe'],correct:2,source_quote:'And when you return to YHWH your Creator and obey his voice in all that I command you today, with all your heart and with all your soul, then YHWH your Creator will restore your fortunes. — Devarim 30:2-3'},
    {question:'Moshe\'s final song calls the heavens and earth to listen. What does he call the sky and ground at the opening of the song?',options:['Witnesses against Yisrael forever','The thrones of YHWH\'s judgment','His teachers and guides','The record of His covenant with the ancestors'],correct:0,source_quote:'Give ear, O heavens, and I will speak, and let the earth hear the words of my mouth. — Devarim 32:1'}
  ],
  '6': [
    {question:'Chanokh sees the final judgment. Who are the first targets named for destruction in that judgment scene?',options:['The fallen Watchers only','The kings, the mighty, and those who possess the earth','The sinners who denied YHWH\'s name','The Nephilim and their offspring'],correct:1,source_quote:'On the day of their anguish and affliction they shall not be able to save themselves. And I will give them into the hands of My elect. — Chanokh 48:9'},
    {question:'The Watchers numbered two hundred when they descended on Mount Hermon. How many named leaders does the text list?',options:['Seven','Twelve','Twenty','Seventy'],correct:2,source_quote:'And these are the names of their leaders: Semyaza... And all the others together with them took unto themselves wives, and each chose for himself one, and they began to go in unto them. — Chanokh 6:7'},
    {question:'In the Dream Visions, Chanokh sees a burning house. What does the house represent in the vision\'s symbolic system?',options:['The land of Egypt','The first Temple of Yisrael','The dwelling place of the fallen Watchers','The city of the Nephilim'],correct:1,source_quote:'And I saw till a throne was erected in the pleasant land, and the Lord of the sheep sat Himself thereon. — Chanokh 90:20'},
    {question:'YHWH commands Rafa\'el to bind a specific fallen Watcher. Who is it, and where is he cast?',options:['Semyaza, cast into the sea','Azazel, cast into darkness in the desert of Duda\'el','Penemue, cast beneath the foundations of the earth','Baraqijal, bound under the mountains'],correct:1,source_quote:'And the Lord said to Raphael: Bind Azazel hand and foot, and cast him into the darkness: and make an opening in the desert, which is in Duda\'el. — Chanokh 10:4'},
    {question:'After the flood, the spirits of the Nephilim continue to afflict humanity. What specifically are they called in Chanokh?',options:['The watchers of the second heaven','Evil spirits who proceed from their bodies','The children of the Satans','Messengers of Belial'],correct:1,source_quote:'And the spirits of the giants afflict, oppress, destroy, attack, do battle, and work destruction on the earth... For they have proceeded from them. — Chanokh 15:11-12'}
  ],
  '7': [
    {question:'In Yovelim, who dictated the text to Moshe on Mount Sinai?',options:['YHWH speaking directly','The Angel of Presence','Michael the great prince','The seventy angels of the nations'],correct:1,source_quote:'For the Angel of the Presence spoke to Moses according to the word of the Lord, saying... — Yovelim 1:27'},
    {question:'Yovelim uses a specific calendar structure. How many days are in its sacred year?',options:['354 days (lunar)','360 days (prophetic)','364 days (solar-sacred)','365 days (solar-civil)'],correct:2,source_quote:'...and the year is completed in three hundred and sixty-four days. — Yovelim 6:32'},
    {question:'After the flood, Noakh gives his sons specific laws. One key prohibition concerns blood. What does Noakh say about consuming blood?',options:['Blood must be poured on the altar before eating','Do not eat flesh with its life, that is its blood','Blood of animals is permitted but not blood of humans','Eat no blood at any season, for the soul is therein'],correct:3,source_quote:'Eat no blood at any season in all your generations. — Yovelim 6:14'},
    {question:'Yovelim records Avraham\'s age when he was circumcised, differing in presentation from Bereshit. At what age was Avraham circumcised according to Yovelim?',options:['85 years','90 years','99 years','100 years'],correct:2,source_quote:'And Abraham took Ishmael his son, and all that were born in his house, and all that were bought with his money, every male in his house, and circumcised the flesh of their foreskin on the very same day as God said unto him. And Abraham was ninety-nine years old when he was circumcised. — Yovelim 15:23'},
    {question:'Yovelim connects Shavuot to a specific covenant renewal. Which covenant does it say was renewed at that time?',options:['The covenant of circumcision with Avraham','The covenant of the rainbow with Noakh','The covenant of Sinai with Moshe','The covenant of salt with Aharon'],correct:1,source_quote:'For this reason it is ordained and written on the heavenly tablets, that they should celebrate the feast of weeks in this month once a year, to renew the covenant every year. — Yovelim 6:17'}
  ],
  '33': [
    {question:'The War Scroll opens by naming the enemies of the Sons of Light. Who are the chief adversaries listed first?',options:['The Egyptians and Philistines','The Kittim of Assyria and the violators of the covenant','The Edomites and Moabites','The fallen Watchers and their human allies'],correct:1,source_quote:'The first attack of the Sons of Light shall be undertaken against the forces of the Sons of Darkness, the army of Belial, the troops of Edom, Moab, the sons of Ammon... and of the Kittim of Assyria. — 1QM 1:1-2'},
    {question:'The trumpets in the War Scroll carry specific inscriptions. What is written on the trumpets of the ambush?',options:['The power of The Creator in battle','The mysteries of The Creator to destroy wickedness','People of The Creator — chosen for eternal covenant','The Creator has summoned His holy ones'],correct:1,source_quote:'On the trumpets of ambush they shall write: The mysteries of The Creator to destroy wickedness. — 1QM 3:9'},
    {question:'The high priest plays a specific role in the Covenant Trial battle. What does he do before the battle begins?',options:['He blows the first trumpet of advance','He places the tablets of the lots in the hand of the chief commander','He stands at the head of the battle line and calls out','He offers a burnt offering for the entire congregation'],correct:1,source_quote:'In the hand of the chief priest they shall place the tablets of the lots for the holy war. — 1QM 6:9'},
    {question:'The War Scroll describes a forty-year conflict. How are these forty years structured across sabbatical cycles?',options:['Eight wars of five years each','Seven sabbatical years with fighting interspersed between resting years','Ten battles of four years each, in pairs','Forty consecutive years with no rest periods'],correct:1,source_quote:'...after the sabbath they will return from battle to go into the camp. And during the remaining thirty-three years of the war... — 1QM 2:6'},
    {question:'The great banner of the whole congregation carries a specific inscription. What does it say?',options:['People of The Creator — soldiers of His justice','The Power of The Creator','Called of The Creator, Princes of His holy ones','The Creator is mighty in battle and triumphant'],correct:0,source_quote:'On the great standard at the head of all the people they shall write: People of The Creator. — 1QM 4:10'}
  ]
};

function getTrialStats() {
  try { return JSON.parse(localStorage.getItem('acr_study_trials') || '{}'); } catch (e) { return {}; }
}
function saveTrialStats(t) {
  try { localStorage.setItem('acr_study_trials', JSON.stringify(t)); } catch (e) {}
}

function showCovenantTrial(volId) {
  var qs = TRIAL_QUESTIONS[volId];
  if (!qs || !qs.length) {
    document.getElementById('content').innerHTML = '<div class="prog-view"><div class="prog-card"><h3>No trial available for this volume yet.</h3><button class="study-btn" id="b-trial-back">Back</button></div></div>';
    document.getElementById('b-trial-back').addEventListener('click', function () { goHome(); });
    return;
  }

  var idx = 0;
  var score = 0;
  var answers = [];

  function renderQ() {
    var q = qs[idx];
    var h = '<div class="prog-view">';
    h += '<div class="prog-card" style="border-left:4px solid #b8860b">';
    h += '<div style="font-size:12px;color:#b8860b;font-weight:700;letter-spacing:1px;margin-bottom:8px">COVENANT TRIAL — Vol ' + volId + ' — Question ' + (idx+1) + ' of ' + qs.length + '</div>';
    h += '<div style="font-size:15px;font-weight:700;margin-bottom:16px">' + q.question + '</div>';
    h += '<div id="trial-opts">';
    for (var oi = 0; oi < q.options.length; oi++) {
      h += '<button class="study-btn trial-opt" data-idx="' + oi + '" style="background:#1a1a1a;border:1.5px solid #444;margin-bottom:8px;text-align:left;width:100%">' + q.options[oi] + '</button>';
    }
    h += '</div>';
    h += '<div id="trial-fb" style="min-height:40px;margin-top:8px"></div>';
    h += '</div></div>';
    document.getElementById('content').innerHTML = h;

    var opts = document.querySelectorAll('.trial-opt');
    for (var bi = 0; bi < opts.length; bi++) {
      opts[bi].addEventListener('click', (function (btn, qItem, chosen) {
        return function () {
          var allOpts = document.querySelectorAll('.trial-opt');
          for (var k = 0; k < allOpts.length; k++) allOpts[k].disabled = true;
          var correct = chosen === qItem.correct;
          if (correct) score++;
          btn.style.background = correct ? '#059669' : '#dc2626';
          if (!correct) {
            var rightBtn = allOpts[qItem.correct];
            if (rightBtn) rightBtn.style.background = '#059669';
          }
          answers.push(correct);
          var fb = document.getElementById('trial-fb');
          if (fb) {
            fb.innerHTML = (correct ? '<span style="color:#4ade80;font-weight:700">Correct.</span>' : '<span style="color:#f87171;font-weight:700">Incorrect.</span>') +
              ' <span style="color:#aaa;font-size:13px">' + qItem.source_quote + '</span>';
          }
          setTimeout(function () {
            idx++;
            if (idx < qs.length) renderQ();
            else showTrialResult();
          }, 2200);
        };
      })(opts[bi], q, parseInt(opts[bi].getAttribute('data-idx'), 10)));
    }
  }

  function showTrialResult() {
    var pct = Math.round(score / qs.length * 100);
    var xpEarned = score * 20;
    var s = getStats();
    s.xp = (s.xp || 0) + xpEarned;
    s.totalAnswered = (s.totalAnswered || 0) + qs.length;
    s.totalCorrect = (s.totalCorrect || 0) + score;
    updateStreak(s);
    saveStats(s);
    var t = getTrialStats();
    if (!t.completed) t.completed = {};
    t.completed[volId] = new Date().toISOString().slice(0,10);
    if (!t.best) t.best = {};
    t.best[volId] = Math.max(t.best[volId] || 0, pct);
    saveTrialStats(t);
    checkAndAwardSeals();

    var h = '<div class="prog-view"><div class="prog-card" style="border-left:4px solid #b8860b;text-align:center">';
    h += '<div style="font-size:12px;color:#b8860b;font-weight:700;letter-spacing:1px;margin-bottom:8px">COVENANT TRIAL COMPLETE</div>';
    h += '<div style="font-size:36px;font-weight:900;margin:12px 0">' + score + '/' + qs.length + '</div>';
    h += '<div style="font-size:18px;margin-bottom:8px">' + pct + '% — ';
    h += pct >= 80 ? 'Mastery achieved' : pct >= 60 ? 'Solid knowledge' : 'Keep studying';
    h += '</div>';
    h += '<div style="color:#b8860b;font-weight:700;font-size:15px;margin-bottom:16px">+' + xpEarned + ' XP earned (double XP)</div>';
    h += '<button class="study-btn" id="b-trial-home" style="background:#b8860b">Back to Home</button>';
    h += '</div></div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-trial-home').addEventListener('click', function () { goHome(); });
  }

  renderQ();
}

function actCard(icon, label, color, mode, fid) {
  return '<div class="act-card" data-mode="' + mode + '" style="border:2px solid ' + color + '" role="button" tabindex="0" aria-label="' + label + ' activity">' +
    '<div class="act-icon" aria-hidden="true" style="color:' + color + '">' + icon + '</div>' +
    '<div class="act-label" style="color:' + color + '">' + label + '</div>' +
    '</div>';
}

function openActivity(mode, fid) {
  if (mode === 'summary') { showStudyMode(fid); return; }
  if (mode === 'terms') { showTermsMode(fid); return; }
  if (mode === 'faq') { showFaqMode(fid); return; }
  if (mode === 'filblank') { showFillBlank(fid); return; }
  if (mode === 'audio-filblank') { showFillBlank(fid, true); return; }
  if (mode === 'mc') { showMC(fid); return; }
  if (mode === 'flash') { showFlashcards(fid); return; }
  if (mode === 'memory') { showMemoryMatch(fid); return; }
  if (mode === 'listen') { showListenLearn(fid); return; }
  if (mode === 'progress') { showProgress(fid); return; }
  if (mode === 'versebuild') { showVerseBuild(fid); return; }
  if (mode === 'wordmatch') { showWordMatch(fid); return; }
  if (mode === 'challenge') { showChallenge(fid); return; }
  if (mode === 'truthuncovered') { showTruthUncovered(fid); return; }
  if (mode === 'trial') { showCovenantTrial(getVolForFid(fid)); return; }
  if (mode === 'whosaidit') { showWhoSaidIt(fid); return; }
  if (mode === 'truefalse') { showTrueFalse(fid); return; }
  if (mode === 'sequence') { showStorySequence(fid); return; }
  if (mode === 'causeeffect') { showCauseEffect(fid); return; }
  if (mode === 'dictation') { showDictation(fid); return; }
  if (mode === 'morph') { showWordMorph(fid); return; }
  if (mode === 'syllable') { showSyllableTap(fid); return; }
  if (mode === 'rhyme') { showRhymeChain(fid); return; }
  if (mode === 'mindmap') { showMindMap(fid); return; }
  if (mode === 'conceptweb') { showConceptWeb(fid); return; }
  if (mode === 'timeline') { showChapterTimeline(fid); return; }
  if (mode === 'remix') { showRemix(fid); return; }
  // Fallback: mode-specific "not enough content" message
  showStubForMode(fid, mode);
}

// Shared per-mode stub renderer. Every mode renderer that can't run
// (not enough dialogue, too few key terms, no cause-effect prose, etc.)
// calls showStubForMode(fid, 'modeName') instead of openActivity('stub',
// fid) so the user sees the real mode name + a specific reason.
function showStubForMode(fid, mode) {
  var modeLabels = {
    stub: 'This section',
    whosaidit: 'Who Said It',
    truefalse: 'True or False',
    sequence: 'Story Sequence',
    causeeffect: 'Cause & Effect',
    dictation: 'Dictation',
    morph: 'Word Morph',
    syllable: 'Syllable Tap',
    rhyme: 'Rhyme Chain',
    mindmap: 'Mind Map',
    conceptweb: 'Concept Web',
    timeline: 'Chapter Timeline',
    filblank: 'Fill in the Blank',
    mc: 'Multiple Choice',
    flash: 'Flashcards',
    memory: 'Memory Match',
    wordmatch: 'Word Match',
    versebuild: 'Verse Builder',
    challenge: 'Challenge',
    terms: 'Key Terms',
    faq: 'FAQ',
    'audio-filblank': 'Audio Fill the Gap'
  };
  var modeReasons = {
    whosaidit: 'needs at least 2 lines of attributed dialogue (X said: ...).',
    truefalse: 'needs sentences containing a key-term word.',
    sequence: 'needs at least 3 ordered source quotes.',
    causeeffect: 'needs at least 2 cause-effect sentences (because, so, led to, when).',
    dictation: 'needs source quotes between 30 and 160 characters.',
    morph: 'needs at least 3 key terms of 5+ letters.',
    syllable: 'needs at least 3 key terms of 5+ letters with 2+ syllables.',
    rhyme: 'needs at least 3 rhyme groups of 2+ words in the source quotes.',
    mindmap: 'needs at least 4 key terms with co-occurrence across source quotes.',
    conceptweb: 'needs at least 4 key terms with co-occurrence across source quotes.',
    timeline: 'needs at least 3 source quotes in this section.',
    filblank: 'needs more fill-in-blank items in this section.',
    mc: 'needs more multiple-choice questions in this section.',
    flash: 'needs key terms or source verses in this section.',
    memory: 'needs at least 4 key terms with definitions.',
    wordmatch: 'needs at least 4 terms with definitions.',
    versebuild: 'needs source verses to reconstruct.',
    challenge: 'needs fill-in-blank or multiple-choice items.',
    terms: 'does not list key terms for this section yet.',
    faq: 'does not have FAQ entries for this section yet.',
    'audio-filblank': 'needs fill-in-blank items in this section.'
  };
  var friendly = modeLabels[mode] || (mode.charAt(0).toUpperCase() + mode.slice(1));
  var reason = modeReasons[mode] || 'does not have enough content in this section yet.';
  document.getElementById('content').innerHTML =
    '<div class="study-view"><div class="sv-sec stub-view">' +
        '<h3>' + friendly + '</h3>' +
    '<p class="study-na">This activity ' + reason + '</p>' +
    '<p class="stub-hint">Try a different section, or pick another activity in this one.</p>' +
    '<button class="study-btn sb-pri" id="b-back-grid">Back to activities</button>' +
    '</div></div>';
  document.getElementById('b-back-grid').addEventListener('click', function () { go(fid); });
}

// Split-out views for terms and FAQ so they can be opened from the grid
function showTermsMode(fid) {
  loadContent(fid).then(function (data) {
    if (!data) {
      // Algorithmic fallback: extract unique capitalized names from verses
      var verses = getVerses(fid);
      if (!verses.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showTermsMode(fid);}else{showStubForMode(fid,'terms');}
        }).catch(function(){showStubForMode(fid,'stub');}); return;
      }
      var allText = verses.join(' ');
      var nameSet = {};
      var words = allText.split(/\s+/);
      for (var w = 0; w < words.length; w++) {
        var clean = words[w].replace(/[.,;:!?"'()]/g, '');
        if (clean.length > 3 && clean[0] === clean[0].toUpperCase() && clean[0] !== clean[0].toLowerCase() &&
            ['And','The','But','For','Now','Then','When','So','Let','Not','All','His','Her','Who','This','That','These','Those'].indexOf(clean) < 0) {
          nameSet[clean] = (nameSet[clean] || 0) + 1;
        }
      }
      var names = Object.keys(nameSet).sort(function(a,b){return nameSet[b]-nameSet[a];}).slice(0, 10);
      var secLabel = IDS.indexOf(fid) >= 0 ? LBL[IDS.indexOf(fid)] : fid;
      var h = '<div class="study-view">';
      h += '<h2 class="sv-title" style="border-left-color:var(--vol6)">Key Names \u2014 ' + secLabel.split(' \u2014 ')[0] + '</h2>';
      h += '<div class="sv-sec">';
      for (var n = 0; n < names.length; n++) {
        h += '<div class="sv-term"><strong class="sv-tw">' + names[n] + '</strong> <span class="sv-td">Appears ' + nameSet[names[n]] + ' times in this section</span></div>';
      }
      h += '</div><button class="study-btn" id="b-back-grid">Back to activities</button></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-back-grid').addEventListener('click', function () { go(fid); });
      window.scrollTo(0, 0); return;
    }
    var h = '<div class="study-view">';
    h += '<h2 class="sv-title" style="border-left-color:var(--vol6)">Key Terms \u2014 ' + data.label + '</h2>';
    h += '<div class="sv-sec">';
    for (var t = 0; t < data.key_terms.length; t++) {
      var k = data.key_terms[t];
      h += '<div class="sv-term"><strong class="sv-tw">' + k.term + '</strong> ';
      h += '<span class="sv-tp">(' + k.phonetic + ')</span> ';
      h += '<span class="sv-td">' + k.definition + '</span></div>';
    }
    h += '</div><button class="study-btn" id="b-back-grid">Back to activities</button></div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-back-grid').addEventListener('click', function () { go(fid); });
    window.scrollTo(0, 0);
  });
}

function showFaqMode(fid) {
  loadContent(fid).then(function (data) {
    if (!data) {
      var secIdx = IDS.indexOf(fid);
      var secLabel = secIdx >= 0 ? LBL[secIdx].split(' \u2014 ')[0] : fid;
      var h = '<div class="study-view">';
      h += '<h2 class="sv-title" style="border-left-color:var(--vol1)">FAQ \u2014 ' + secLabel + '</h2>';
      h += '<div class="sv-sec"><p class="study-na">Curated FAQ for this section will be added in a future session. Use Listen &amp; Learn to hear the full text, or try Fill in the Blank and Flashcards which work now.</p></div>';
      h += '<button class="study-btn" id="b-back-grid">Back to activities</button></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-back-grid').addEventListener('click', function () { go(fid); });
      window.scrollTo(0, 0); return;
    }
    var h = '<div class="study-view">';
    h += '<h2 class="sv-title" style="border-left-color:var(--vol1)">FAQ \u2014 ' + data.label + '</h2>';
    h += '<div class="sv-sec">';
    for (var f = 0; f < data.faq.length; f++) {
      h += '<div class="sv-faq"><div class="sv-fq">' + data.faq[f].question + '</div>';
      h += '<div class="sv-fa">' + data.faq[f].answer + '</div></div>';
    }
    h += '</div><button class="study-btn" id="b-back-grid">Back to activities</button></div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-back-grid').addEventListener('click', function () { go(fid); });
    window.scrollTo(0, 0);
  });
}

// ---- Minimal TTS helper (full voice reader logic comes later) ----
var ttsVoices = [];
function initTTS() {
  if (!window.speechSynthesis) return;
  ttsVoices = window.speechSynthesis.getVoices();
  loadVoiceSelector();
  window.speechSynthesis.onvoiceschanged = function () {
    ttsVoices = window.speechSynthesis.getVoices();
    loadVoiceSelector();
  };
}

function loadVoiceSelector() {
  var vc = document.getElementById('vc');
  if (!vc || !ttsVoices.length) return;
  var saved = localStorage.getItem('acr_study_voice');
  vc.innerHTML = '';
  var enh = [], siri = [], other = [];
  ttsVoices.forEach(function (v, i) {
    if (v.name.indexOf('Enhanced') >= 0) enh.push({ v: v, i: i });
    else if (v.name.indexOf('Siri') >= 0) siri.push({ v: v, i: i });
    else other.push({ v: v, i: i });
  });
  // Auto-default: Samantha (Enhanced) > Samantha > first Enhanced > first Siri
  var autoName = null;
  if (!saved) {
    var _samEnh = ttsVoices.filter(function (v) { return v.name.indexOf('Samantha') >= 0 && v.name.indexOf('Enhanced') >= 0; });
    var _samAny = ttsVoices.filter(function (v) { return v.name.indexOf('Samantha') >= 0; });
    var _anyEnh = ttsVoices.filter(function (v) { return v.name.indexOf('Enhanced') >= 0; });
    if (_samEnh.length) autoName = _samEnh[0].name;
    else if (_samAny.length) autoName = _samAny[0].name;
    else if (_anyEnh.length) autoName = _anyEnh[0].name;
  }
  enh.concat(siri).concat(other).forEach(function (item) {
    var o = document.createElement('option');
    o.value = item.i;
    o.textContent = item.v.name.replace('(Enhanced)', ' \u2605').replace('(Compact)', '').trim();
    if (saved && item.v.name === saved) o.selected = true;
    else if (!saved && autoName && item.v.name === autoName && !vc.querySelector('[selected]')) o.selected = true;
    vc.appendChild(o);
  });
  if (!vc.value && vc.options.length) vc.options[0].selected = true;
}
initTTS();
setTimeout(initTTS, 500);
setTimeout(initTTS, 2000);

function getBestVoice() {
  var saved = localStorage.getItem('acr_study_voice');
  if (saved) {
    for (var i = 0; i < ttsVoices.length; i++) {
      if (ttsVoices[i].name === saved) return ttsVoices[i];
    }
  }
  // Default priority: Samantha (Enhanced) > Samantha > any Enhanced > Siri > first
  var samEnh = ttsVoices.filter(function (v) { return v.name.indexOf('Samantha') >= 0 && v.name.indexOf('Enhanced') >= 0; });
  if (samEnh.length) return samEnh[0];
  var sam = ttsVoices.filter(function (v) { return v.name.indexOf('Samantha') >= 0; });
  if (sam.length) return sam[0];
  var enh = ttsVoices.filter(function (v) { return v.name.indexOf('Enhanced') >= 0; });
  if (enh.length) return enh[0];
  var siri = ttsVoices.filter(function (v) { return v.name.indexOf('Siri') >= 0; });
  if (siri.length) return siri[0];
  return ttsVoices[0] || null;
}

function prepTTS(txt) {
  txt = txt.replace(/\u{10909}\u{10904}\u{10905}\u{10904}/gu, 'Yahweh');
  txt = txt.replace(/YHWH/g, 'Yahweh');
  txt = txt.replace(/\bYH\b/g, 'Yah');
  txt = txt.replace(/\bMosheh\b/g, 'Mo-sheh');
  txt = txt.replace(/\bYehoshua\b/g, 'Yeh-ho-shua');
  txt = txt.replace(/\bYirmeyahu\b/g, 'Yir-meh-yah-hoo');
  txt = txt.replace(/\bYesha.yahu\b/g, 'Yeh-sha-yah-hoo');
  txt = txt.replace(/\bYehezkel\b/g, 'Yeh-hez-kel');
  txt = txt.replace(/\bYisrael\b/g, 'Yis-rah-el');
  txt = txt.replace(/\bBereshit\b/g, 'Beh-reh-sheet');
  txt = txt.replace(/\bShemot\b/g, 'Sheh-mot');
  txt = txt.replace(/\bVayikra\b/g, 'Vah-yik-rah');
  txt = txt.replace(/\bBamidbar\b/g, 'Bah-mid-bar');
  txt = txt.replace(/\bDevarim\b/g, 'Deh-vah-reem');
  txt = txt.replace(/\bChanokh\b/g, 'Hha-nokh');
  txt = txt.replace(/\bYovelim\b/g, 'Yo-veh-leem');
  txt = txt.replace(/\bTehillim\b/g, 'Teh-hil-leem');
  txt = txt.replace(/\bMelakhim\b/g, 'Meh-lah-kheem');
  txt = txt.replace(/\bShemu.el\b/g, 'Sheh-moo-el');
  txt = txt.replace(/\bShofetim\b/g, 'Sho-feh-teem');
  txt = txt.replace(/\bNevi.im\b/g, 'Neh-vee-eem');
  txt = txt.replace(/\bKetuvim\b/g, 'Keh-too-veem');
  txt = txt.replace(/\bQumran\b/g, 'Koom-rahn');
  txt = txt.replace(/\bOrit\b/g, 'Oh-reet');
  txt = txt.replace(/\bGe.ez\b/g, 'Geh-ez');
  txt = txt.replace(/\bQayin\b/g, 'Kah-yin');
  txt = txt.replace(/\bHevel\b/g, 'Heh-vel');
  txt = txt.replace(/\bNoakh\b/g, 'No-akh');
  txt = txt.replace(/\bChavah\b/g, 'Khah-vah');
  txt = txt.replace(/\bMetushelakh\b/g, 'Meh-too-sheh-lakh');
  txt = txt.replace(/\bBavel\b/g, 'Bah-vel');
  txt = txt.replace(/\bAvram\b/g, 'Ahv-rahm');
  txt = txt.replace(/\bAvraham\b/g, 'Ahv-rah-hahm');
  txt = txt.replace(/\bYitzkhak\b/g, 'Yeets-khahk');
  txt = txt.replace(/\bYaakov\b/g, 'Yah-ah-kov');
  txt = txt.replace(/\bYosef\b/g, 'Yo-sef');
  txt = txt.replace(/\bYehudah\b/g, 'Yeh-hoo-dah');
  txt = txt.replace(/\bMasoretic\b/g, 'Mah-so-reh-tic');
  txt = txt.replace(/\bElohim\b/g, 'Eh-lo-heem');
  txt = txt.replace(/\bNephilim\b/g, 'Neh-fi-leem');
  txt = txt.replace(/\bShet\b/g, 'Sheht');
  txt = txt.replace(/\bEnosh\b/g, 'Eh-nosh');
  txt = txt.replace(/\bQeynan\b/g, 'Kay-nahn');
  txt = txt.replace(/\bMahalalel\b/g, 'Mah-hah-lah-lel');
  txt = txt.replace(/\bYered\b/g, 'Yeh-red');
  txt = txt.replace(/\bLamekh\b/g, 'Lah-mekh');
  txt = txt.replace(/\b4Q/g, 'fragment 4Q');
  txt = txt.replace(/\b1Q/g, 'fragment 1Q');
  txt = txt.replace(/\bDSS\b/g, 'Dead Sea Scrolls');
  txt = txt.replace(/\[DSS\]/g, 'Dead Sea Scrolls note:');
  txt = txt.replace(/\[ORIT GE.EZ\]/g, 'Oh-reet Geh-ez note:');
  txt = txt.replace(/\[MASORETIC VARIANT\]/g, 'Mah-so-reh-tic variant note:');
  txt = txt.replace(/\[CRITICAL NOTE\]/g, 'Critical note:');
  txt = txt.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
  return txt;
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  var ss = window.speechSynthesis;
  // iPad Safari wake-up: after a long silence the engine drops
  // into a paused / stuck state where speak() returns without
  // sound. Resume + cancel flushes its queue. We do NOT race
  // cancel() with speak() in the same tick — schedule speak in
  // the next microtask so the cancel commits first.
  try { ss.resume(); } catch (_) {}
  try { if (ss.speaking || ss.pending) ss.cancel(); } catch (_) {}
  function fire() {
    var u = new SpeechSynthesisUtterance(prepTTS(text));
    u.rate = 1; u.lang = 'en-US'; u.volume = 1;
    var voice = getBestVoice();
    if (voice) u.voice = voice;
    try { ss.speak(u); } catch (_) {}
  }
  // If voices haven't loaded yet (iPad voiceschanged race), wait
  // up to ~1.5s before firing. Beyond that, speak with the
  // default voice — better than silent failure.
  if (!ttsVoices.length) {
    var waited = 0;
    var iv = setInterval(function () {
      waited += 100;
      if (ttsVoices.length || waited >= 1500) { clearInterval(iv); setTimeout(fire, 0); }
    }, 100);
  } else {
    setTimeout(fire, 0);
  }
}

// ---- Smart Algorithmic Question Generator ----
var IMPORTANT_WORDS = /\b(YHWH|Creator|covenant|Torah|Yisra.EL|holy|righteous|judgment|Sinai|Tziyon|Yerushalayim|temple|priest|prophet|angel|heaven|earth|glory|blessing|curse|commandment|Shabbat|Pesach|altar|offering|blood|fire|spirit|kingdom|throne|servant|nations|wilderness|promise|faithfulness|iniquity|transgression|sin|mercy|steadfast|everlasting|forever|inheritance|firstborn|circumcision|Pesach|jubilee|Sabbath|anointed|tabernacle|ark|sword|shield|trumpet|banner|pillar|cloud|lamp|bread|wine|oil|water|stone|mountain|river|garden|vineyard|sheep|shepherd|flock|seed|grain|harvest|tithe|vow|dream|vision|sign|wonder|plague|deliver|redeem|gather|scatter|exile|return|restore|remember|forget|forsake|seek|find|call|answer|hear|speak|write|teach|learn|obey|rebel|repent|forgive|heal|save|destroy|build|rest|rise|fall|live|die)\b/gi;

var NAMES_PATTERN = /\b(Adam|Chavah|Qayin|Hevel|Chanokh|Noakh|Avram|Avraham|Sarah|Sarai|Yitzhak|Rivkah|Yaakov|Esav|Yosef|Moshe|Aharon|Miryam|Yehoshua|Dawid|Shelomoh|Eliyahu|Elisha|Yesha.yahu|Yirmeyahu|Yehezkel|Daniyel|Shem|Ham|Yafet|Yefet|Levi|Yehudah|Binyamin|Reuven|Shim.on|Dan|Naftali|Gad|Asher|Yissakhar|Zevulun|Efrayim|Menasheh|Sha.ul|Bat.Sheva|Devorah|Gid.on|Shimshon|Ruth|Na.omi|Bo.az|Chanah|Shemu.el|Yonatan|Rachav|Kalev|Tzipporah|Yitro|Pharaoh|Nevukhadnetzar|Koresh|Shet|Enosh|Qeynan|Mahalalel|Yered|Metushelach|Lemekh|Irad|Mehuyael|Metushael|Naamah|Nimrod|Lot|Hagar|Malkhi.Tzedek|Bilhah|Zilpah|Potiphar|Dinah|Tamar|Pinchas|Yitro|Balaam|Balaq|Yiftach|Avigayil|Tzofar|Elifaz|Bildad|Iyov|Koresh|Haman|Mordekhai|Esther|Ezra|Nechemyah|Malakhi|Zekharyah|Chaggai|Tzefanyah|Nachum|Chavakuk|Ovadyah|Yonah|Amos|Hoshea|Yoel|Mikah|Belshatzar|Daryavesh|Artahshasta)\b/g;

var NUMBERS_PATTERN = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|hundred|thousand|first|second|third|fourth|fifth|sixth|seventh|tenth|twelfth|fortieth|fiftieth)\b/gi;

var PLACES_PATTERN = /\b(Egypt|Mitsrayim|Babylon|Bavel|Sinai|Horev|Yerushalayim|Tziyon|Shekhem|Hevron|Beit.El|Gilgal|Yericho|Shiloh|Midyan|Negev|Yarden|Kedar|Lebanon|Karmel|Seir|Edom|Mo.av|Ammon|Aram|Asshur|Kena.an|En.Gedi|Ophir|Beersheva|Ramah|Giv.on|Ai|Nevo|Pisgah|Ararat|Nod|Havilah|Eden|Gihon|Pishon|Tigris|Hiddekel|Euphrates|Shinar|Nineveh|Akkad|Erech|Resen|Goshen|Marah|Elim|Rephidim|Taberah|Kadesh|Meribah|Qumran|Babel|Ur|Paddan.Aram|Penuel|Peniel|Sukkot|Mahanaim|Dothan|Pithom|Rameses|Tzin|Paran|Tzova|Dammesek|Gerar|Tzor|Tzidon|Ashkelon|Gaza|Ekron|Ashdod|Azekah|Lakhish|Khevron|Timna|Adulam|Yavesh|Gilead|Bashan|Hermon|Tabor|Yizre.el|Karmiel|Akko|Tsarfat|Yaffa|Asher|Zevulun|Naftali)\b/g;

function smartBlank(verse) {
  var words = verse.split(/\s+/);
  if (words.length < 5) return null;
  var targets = [];
  for (var i = 1; i < words.length - 1; i++) {
    var w = words[i].replace(/[.,;:!?"'()]/g, '');
    if (w.length < 3) continue;
    var score = 0;
    if (NAMES_PATTERN.test(w)) { score += 10; NAMES_PATTERN.lastIndex = 0; }
    if (PLACES_PATTERN.test(w)) { score += 8; PLACES_PATTERN.lastIndex = 0; }
    if (NUMBERS_PATTERN.test(w)) { score += 7; NUMBERS_PATTERN.lastIndex = 0; }
    if (IMPORTANT_WORDS.test(w)) { score += 5; IMPORTANT_WORDS.lastIndex = 0; }
    if (w.length >= 5) score += 2;
    if (score >= 3) targets.push({ idx: i, word: w, score: score });
  }
  if (!targets.length) return null;
  targets.sort(function (a, b) { return b.score - a.score; });
  var pick = targets[Math.floor(Math.random() * Math.min(3, targets.length))];
  var prompt = verse.replace(new RegExp('\\b' + pick.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b'), '______');
  if (prompt === verse) return null;
  return { ref: '', prompt: prompt, answer: pick.word, source_quote: verse, difficulty: pick.score >= 8 ? 'hard' : pick.score >= 5 ? 'medium' : 'easy' };
}

// Learning Quality gate — drops MC candidates that fail the
// shared POS / case / length / number / tense / blind-solve
// audit. Same engine Attain uses (lib-attain-quality.js). When
// the lib isn't loaded the gate passes everything.
function passesQualityGate(q) {
  if (typeof window === 'undefined' || !window.LoadAttainQuality) return true;
  if (typeof window.LoadAttainQuality.auditQuestion !== 'function') return true;
  try {
    var a = window.LoadAttainQuality.auditQuestion(q);
    return !!(a && a.ok);
  } catch (_) { return true; }
}

function generateSmartQuestions(fid, count) {
  var verses = getVerses(fid);
  if (!verses.length) return [];
  var usable = verses.filter(function (v) { return v.length > 25 && v.length < 250; });
  usable = shuffle(usable);
  var questions = [];
  var seen = {};
  for (var i = 0; i < usable.length && questions.length < count; i++) {
    var q = smartBlank(usable[i]);
    if (q && !seen[q.answer.toLowerCase()]) {
      seen[q.answer.toLowerCase()] = true;
      questions.push(q);
    }
  }
  return questions;
}

function generateSmartMC(fid, count) {
  var verses = getVerses(fid);
  if (!verses.length) return [];
  var usable = verses.filter(function (v) { return v.length > 30 && v.length < 200; });
  usable = shuffle(usable);
  var questions = [];
  for (var i = 0; i < usable.length && questions.length < count; i++) {
    var words = usable[i].split(/\s+/);
    var nameMatches = usable[i].match(NAMES_PATTERN);
    var placeMatches = usable[i].match(PLACES_PATTERN);
    if (nameMatches && nameMatches.length > 0) {
      var name = nameMatches[0];
      var snippet = words.slice(0, Math.min(10, words.length)).join(' ');
      if (snippet.length > 60) snippet = snippet.slice(0, 57) + '...';
      var allNames = [];
      for (var v = 0; v < usable.length; v++) {
        var m = usable[v].match(NAMES_PATTERN);
        if (m) for (var n = 0; n < m.length; n++) if (allNames.indexOf(m[n]) < 0 && m[n] !== name) allNames.push(m[n]);
      }
      var opts = [name].concat(shuffle(allNames).slice(0, 3));
      opts = shuffle(opts);
      var nameQ = { ref: '', question: 'Who is mentioned in: "' + snippet + '"?', options: opts, correct: opts.indexOf(name), source_quote: usable[i], difficulty: 'medium' };
      if (passesQualityGate(nameQ)) questions.push(nameQ);
    } else if (placeMatches && placeMatches.length > 0) {
      var place = placeMatches[0];
      var snippet = words.slice(0, Math.min(10, words.length)).join(' ');
      if (snippet.length > 60) snippet = snippet.slice(0, 57) + '...';
      var allPlaces = [];
      for (var v = 0; v < usable.length; v++) {
        var m = usable[v].match(PLACES_PATTERN);
        if (m) for (var p = 0; p < m.length; p++) if (allPlaces.indexOf(m[p]) < 0 && m[p] !== place) allPlaces.push(m[p]);
      }
      var opts = [place].concat(shuffle(allPlaces).slice(0, 3));
      opts = shuffle(opts);
      var placeQ = { ref: '', question: 'Which place appears in: "' + snippet + '"?', options: opts, correct: opts.indexOf(place), source_quote: usable[i], difficulty: 'medium' };
      if (passesQualityGate(placeQ)) questions.push(placeQ);
    } else {
      // Number-based question for genealogy / measurement sections
      var numRe = /\b(\d+)\s+(years?|days?|cubits?|months?|men|people|years old)\b/i;
      var numMatch = usable[i].match(numRe);
      if (numMatch && questions.length < count) {
        var num = numMatch[1];
        var unit = numMatch[2].toLowerCase().replace(/\s+/g, ' ');
        var allNums = [];
        for (var nv = 0; nv < usable.length; nv++) {
          var nm = usable[nv].match(/\b(\d+)\s+(?:years?|days?|cubits?|months?|men|people)\b/gi);
          if (nm) nm.forEach(function (nx) {
            var nd = nx.match(/\d+/);
            if (nd && nd[0] !== num && allNums.indexOf(nd[0]) < 0) allNums.push(nd[0]);
          });
        }
        if (allNums.length < 3) {
          var nb = parseInt(num);
          [-30, +30, -7, +7, -60, +60].forEach(function (off) {
            var nx = String(nb + off);
            if (parseInt(nx) > 0 && nx !== num && allNums.indexOf(nx) < 0) allNums.push(nx);
          });
        }
        var ctxStart = usable[i].indexOf(numMatch[0]);
        var ctxSnip = usable[i].slice(Math.max(0, ctxStart - 40), ctxStart + numMatch[0].length + 30);
        if (ctxSnip.length > 90) ctxSnip = ctxSnip.slice(0, 87) + '...';
        var nopts = shuffle([num].concat(shuffle(allNums).slice(0, 3)));
        var numQ = { ref: '', question: 'How many ' + unit + '? “' + ctxSnip + '”', options: nopts, correct: nopts.indexOf(num), source_quote: usable[i], difficulty: 'easy' };
        questions.push(numQ);
      }
    }
  }
  return questions;
}

// ---- Difficulty Tiers ----
function getDifficultyTier(fid) {
  var m = getSectionMastery(fid);
  if (m.pct >= 80) return 'hard';
  if (m.pct >= 40) return 'medium';
  return 'easy';
}

function getCrossReferenceQuestions(fid, count) {
  var idx = IDS.indexOf(fid);
  if (idx < 0) return [];
  var nearby = [];
  for (var i = Math.max(0, idx - 3); i <= Math.min(IDS.length - 1, idx + 3); i++) {
    if (i !== idx) nearby.push(IDS[i]);
  }
  var questions = [];
  for (var n = 0; n < nearby.length && questions.length < count; n++) {
    var nq = generateSmartQuestions(nearby[n], 2);
    for (var q = 0; q < nq.length && questions.length < count; q++) {
      nq[q].difficulty = 'hard';
      nq[q].crossRef = nearby[n];
      questions.push(nq[q]);
    }
  }
  return questions;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function showFillBlank(fid, audioMode) {
  loadContent(fid).then(function (data) {
    var questions = [], allAns = [];
    var tier = getDifficultyTier(fid);

    // Easy tier: curated questions (prioritize unmastered)
    if (data && data.fill_blank && data.fill_blank.length) {
      var curated = data.fill_blank.filter(function (q) {
        // Skip prompts with more than one blank — second blank stays empty on screen
        return q.prompt && (q.prompt.match(/______/g) || []).length <= 1;
      });
      var unmastered = getUnmasteredQuestions(fid, 'filblank', curated);
      if (unmastered.length > 0 && tier === 'easy') {
        questions = shuffle(unmastered.map(function (u) { return u.q; }));
      } else {
        questions = shuffle(curated);
      }
      allAns = data.fill_blank.map(function (q) { return q.answer; });
    }

    // Medium tier: add smart algorithmic questions from same section
    if (tier !== 'easy' || questions.length < 5) {
      var verses = getVerses(fid);
      if (!verses.length) {
        fetch('../data/' + fid + '.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showFillBlank(fid, audioMode);}else if(!questions.length){showStubForMode(fid,'filblank');}
        }).catch(function(){if(!questions.length) showStubForMode(fid,'stub');});
        if (!questions.length) return;
      }
      var smartQ = generateSmartQuestions(fid, tier === 'hard' ? 30 : 20);
      for (var sq = 0; sq < smartQ.length; sq++) {
        questions.push(smartQ[sq]);
        if (allAns.indexOf(smartQ[sq].answer) < 0) allAns.push(smartQ[sq].answer);
      }
    }

    // Hard tier: add cross-reference questions from nearby sections
    if (tier === 'hard') {
      var crossQ = getCrossReferenceQuestions(fid, 5);
      for (var cq = 0; cq < crossQ.length; cq++) {
        questions.push(crossQ[cq]);
        if (allAns.indexOf(crossQ[cq].answer) < 0) allAns.push(crossQ[cq].answer);
      }
    }

    if (!questions.length) { showStubForMode(fid, audioMode ? 'audio-filblank' : 'filblank'); return; }
    questions = shuffle(questions).slice(0, tier === 'hard' ? 30 : 20);
    var qi = 0, score = 0, points = 0, firstAttempt = true, hintsUsed = 0;

    // Pre-compute type-matched distractor pools once before any question renders
    var _digitPool = [], _namePool = [], _placePool = [], _importantPool = [];
    allAns.forEach(function (a) {
      if (/^\d+$/.test(a)) { if (_digitPool.indexOf(a) < 0) _digitPool.push(a); }
      else if (new RegExp(NAMES_PATTERN.source, 'i').test(a)) { if (_namePool.indexOf(a) < 0) _namePool.push(a); NAMES_PATTERN.lastIndex = 0; }
      else if (new RegExp(PLACES_PATTERN.source, 'i').test(a)) { if (_placePool.indexOf(a) < 0) _placePool.push(a); PLACES_PATTERN.lastIndex = 0; }
      else if (!/^[A-Z]/.test(a)) {
        var _iw = new RegExp(IMPORTANT_WORDS.source, 'i').test(a); IMPORTANT_WORDS.lastIndex = 0;
        if (_iw && _importantPool.indexOf(a.toLowerCase()) < 0) _importantPool.push(a.toLowerCase());
      }
    });
    var _sv = getVerses(fid);
    _sv.forEach(function (v) {
      (v.match(/\b\d+\b/g) || []).forEach(function (n) { if (_digitPool.indexOf(n) < 0) _digitPool.push(n); });
      (v.match(new RegExp(NAMES_PATTERN.source, 'gi')) || []).forEach(function (n) { NAMES_PATTERN.lastIndex = 0; if (_namePool.indexOf(n) < 0) _namePool.push(n); });
      (v.match(new RegExp(PLACES_PATTERN.source, 'gi')) || []).forEach(function (p) { PLACES_PATTERN.lastIndex = 0; if (_placePool.indexOf(p) < 0) _placePool.push(p); });
      var _im = v.match(new RegExp(IMPORTANT_WORDS.source, 'gi')); IMPORTANT_WORDS.lastIndex = 0;
      if (_im) _im.forEach(function (iw) { var lw = iw.toLowerCase(); if (_importantPool.indexOf(lw) < 0) _importantPool.push(lw); });
    });

    function renderQ() {
      if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
      if (qi >= questions.length) { showResults(); return; }
      var q = questions[qi];
      var correct = q.answer;
      firstAttempt = true;
      hintsUsed = 0;

      // Type-aware distractor selection: distractors must match the answer's category
      var _isDigit = /^\d+$/.test(correct);
      var _isName = new RegExp(NAMES_PATTERN.source, 'i').test(correct); NAMES_PATTERN.lastIndex = 0;
      var _isPlace = !_isName && (new RegExp(PLACES_PATTERN.source, 'i').test(correct)); PLACES_PATTERN.lastIndex = 0;
      var _isProper = !_isDigit && !_isName && !_isPlace && /^[A-Z]/.test(correct);
      var _isImportant = !_isDigit && !_isName && !_isPlace && !_isProper && (function () {
        var t = new RegExp(IMPORTANT_WORDS.source, 'i').test(correct); IMPORTANT_WORDS.lastIndex = 0; return t;
      })();
      var candidates;
      if (_isDigit) {
        var _dp = _digitPool.filter(function (a) { return a !== correct; });
        if (q.source_quote) {
          (q.source_quote.match(/\b\d+\b/g) || []).forEach(function (n) {
            if (n !== correct && _dp.indexOf(n) < 0) _dp.push(n);
          });
        }
        if (_dp.length < 3) {
          var _base = parseInt(correct, 10);
          [-31, +31, -62, +62, -93, +93, -7, +7].forEach(function (off) {
            var n = String(_base + off);
            if (parseInt(n) > 0 && n !== correct && _dp.indexOf(n) < 0) _dp.push(n);
          });
        }
        candidates = shuffle(_dp);
      } else if (_isName) {
        candidates = shuffle(_namePool.filter(function (a) {
          return a.toLowerCase() !== correct.toLowerCase();
        }));
      } else if (_isPlace) {
        candidates = shuffle(_placePool.filter(function (a) {
          return a.toLowerCase() !== correct.toLowerCase();
        }));
      } else if (_isProper) {
        // Proper noun not in explicit patterns: all distractors must also be proper nouns
        var _pp = _namePool.concat(_placePool).filter(function (a) {
          return a.toLowerCase() !== correct.toLowerCase();
        });
        allAns.forEach(function (a) {
          if (/^[A-Z]/.test(a) && a.toLowerCase() !== correct.toLowerCase() && _pp.indexOf(a) < 0) _pp.push(a);
        });
        candidates = shuffle(_pp);
      } else if (_isImportant) {
        // Theological / thematic word: use other important words as distractors
        candidates = shuffle(_importantPool.filter(function (a) {
          return a.toLowerCase() !== correct.toLowerCase();
        }));
      } else {
        // Common word: exclude digits and proper nouns so distractors are plausible
        candidates = allAns.filter(function (a) {
          if (/^\d+$/.test(a)) return false;
          if (/^[A-Z]/.test(a)) return false;
          return a.toLowerCase() !== correct.toLowerCase();
        });
        candidates.sort(function (a, b) {
          var aDiff = Math.abs(a.length - correct.length);
          var bDiff = Math.abs(b.length - correct.length);
          if (aDiff !== bDiff) return aDiff - bDiff;
          return Math.abs(a.charCodeAt(0) - correct.charCodeAt(0)) -
                 Math.abs(b.charCodeAt(0) - correct.charCodeAt(0));
        });
      }
      var others = candidates.slice(0, 3);
      if (others.length < 3) {
        var _fbPool = allAns.filter(function (a) {
          if (a.toLowerCase() === correct.toLowerCase()) return false;
          if (others.indexOf(a) >= 0) return false;
          if (_isDigit) return /^\d+$/.test(a);
          if (_isName || _isPlace || _isProper) return /^[A-Z]/.test(a);
          return !/^\d+$/.test(a) && !/^[A-Z]/.test(a);
        });
        others = others.concat(shuffle(_fbPool)).slice(0, 3);
      }
      var opts = shuffle([correct].concat(others));
      var OPTLBLS = ['A', 'B', 'C', 'D'];

      var h = '<div class="cloze-view">';
      var tierNames = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
      var tierColors = { easy: '#6abf8a', medium: '#c9a84c', hard: '#d97070' };
      h += '<div class="cloze-progress">' + (qi + 1) + ' of ' + questions.length +
        ' <span style="color:' + (tierColors[tier] || '#6abf8a') + ';font-size:.85em">\u25CF ' + (tierNames[tier] || 'Easy') + '</span></div>';
      var clozeIdx = IDS.indexOf(fid);
      var clozeLabel = clozeIdx >= 0 ? LBL[clozeIdx].split(' \u2014 ')[0] : fid;
      h += '<div class="cloze-ref">' + clozeLabel + (q.ref ? ' ' + q.ref : '') + '</div>';
      if (audioMode) {
        h += '<div class="audio-gap-banner">Listen and tap the missing word</div>';
      }
      h += '<div class="cloze-prompt">' +
        q.prompt.replace('______', '<span class="cloze-blank">______</span>') + '</div>';
      h += '<button class="cloze-audio" id="b-cloze-hear">Listen</button>';
      h += '<button class="hint-btn" id="b-cloze-hint" aria-label="Get a hint">Hint</button>';
      h += '<div class="hint-display" id="cloze-hint-display" role="status" aria-live="polite"></div>';
      h += '<div class="cloze-opts">';
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="cloze-opt opt-' + OPTLBLS[o % 4].toLowerCase() + '" data-val="' + opts[o] +
          '" aria-label="Answer option ' + OPTLBLS[o % 4] + ': ' + opts[o] + '"><span class="opt-letter">' + OPTLBLS[o % 4] + '</span>' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="cloze-feedback" id="cloze-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-cloze-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-cloze-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-cloze-hear').addEventListener('click', function () {
        speakText(q.prompt.replace('______', 'blank'));
      });
      if (audioMode) {
        // Auto-play the passage with "blank" spoken at the missing word
        setTimeout(function () {
          speakText(q.prompt.replace('______', 'blank'));
        }, 400);
      }
      wireHintLadder('b-cloze-hint', 'cloze-hint-display', correct, q.source_quote, function (n) { hintsUsed = n; });
      var btns = document.querySelectorAll('.cloze-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var val = this.getAttribute('data-val');
          var fb = document.getElementById('cloze-fb');
          if (val.toLowerCase() === correct.toLowerCase()) {
            this.classList.add('cloze-correct');
            fb.innerHTML = '<span class="fb-correct">\u2714 Correct!</span>' +
              '<div class="cloze-source">' + (q.source_quote || '') + '</div>';
            if (firstAttempt) { score++; points += hintMultiplier(hintsUsed); }
            recordQuestionResult(fid, 'filblank', qi, firstAttempt);
            var all = document.querySelectorAll('.cloze-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2200);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'filblank', qIndex: qi,
                ref: q.ref || '', prompt: q.prompt, answer: correct,
                source_quote: q.source_quote || ''
              });
            }
            firstAttempt = false;
            this.classList.add('cloze-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Try another \u2192</span>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / questions.length * 100);
      var xpEarned = recordSession(fid, 'filblank', points, questions.length);
      var stats = getStats();
      var lvl = getLevel(stats.xp || 0);
      var mastery = getSectionMastery(fid);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Keep studying!';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + questions.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      if (mastery.badge) h += '<div class="cr-mastery">' + mastery.badge + ' ' + mastery.mastered + '/' + mastery.total + ' questions mastered</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-level">' + lbIcon(lvl.current.icon, 14) + ' ' + lvl.current.name +
        ' \u2014 ' + (stats.xp || 0) + ' XP total</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-cloze-retry">Try Again</button>';
      var nextFid = pct >= 80 ? getNextSectionFid(fid) : null;
      if (nextFid) {
        var nextIdx = IDS.indexOf(nextFid);
        var nextLabel = nextIdx >= 0 ? LBL[nextIdx].split(' \u2014 ')[0] : '';
        h += '<button class="study-btn sb-pri" id="b-cloze-next">Next: ' + nextLabel + '</button>';
      }
      h += '<button class="study-btn" id="b-cloze-back">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-cloze-retry').addEventListener('click', function () { showFillBlank(fid); });
      if (nextFid) document.getElementById('b-cloze-next').addEventListener('click', function () { go(nextFid); });
      document.getElementById('b-cloze-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Multiple Choice quiz ----
function showMC(fid) {
  loadContent(fid).then(function (data) {
    var questions = [];
    var tier = getDifficultyTier(fid);

    // Easy tier: curated questions (prioritize unmastered)
    if (data && data.multiple_choice && data.multiple_choice.length) {
      var curated = data.multiple_choice.slice();
      var unmastered = getUnmasteredQuestions(fid, 'mc', curated);
      if (unmastered.length > 0 && tier === 'easy') {
        questions = shuffle(unmastered.map(function (u) { return u.q; }));
      } else {
        questions = shuffle(curated);
      }
    }

    // Medium tier: add smart algorithmic MC from same section
    if (tier !== 'easy' || questions.length < 5) {
      var verses = getVerses(fid);
      if (!verses.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showMC(fid);}else if(!questions.length){showStubForMode(fid,'mc');}
        }).catch(function(){if(!questions.length) showStubForMode(fid,'stub');});
        if (!questions.length) return;
      }
      var smartMC = generateSmartMC(fid, tier === 'hard' ? 10 : 8);
      for (var sm = 0; sm < smartMC.length; sm++) questions.push(smartMC[sm]);
    }

    // Hard tier: cross-reference MC from nearby sections
    if (tier === 'hard') {
      var idx = IDS.indexOf(fid);
      var nearby = [];
      for (var ni = Math.max(0, idx - 3); ni <= Math.min(IDS.length - 1, idx + 3); ni++) {
        if (ni !== idx) nearby.push(IDS[ni]);
      }
      for (var nn = 0; nn < nearby.length && questions.length < 20; nn++) {
        var crossMC = generateSmartMC(nearby[nn], 2);
        for (var cm = 0; cm < crossMC.length; cm++) {
          crossMC[cm].difficulty = 'hard';
          questions.push(crossMC[cm]);
        }
      }
    }

    if (!questions.length) { showStubForMode(fid, 'mc'); return; }
    questions = shuffle(questions).slice(0, tier === 'hard' ? 30 : 20);
    var qi = 0, score = 0, points = 0, mcFirstAttempt = true, mcHintsUsed = 0;
    var OPTLBLS = ['A', 'B', 'C', 'D'];

    function renderQ() {
      if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
      if (qi >= questions.length) { showResults(); return; }
      var q = questions[qi];
      mcFirstAttempt = true;
      mcHintsUsed = 0;

      var h = '<div class="mc-view">';
      var tierNames = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
      var tierColors = { easy: '#6abf8a', medium: '#c9a84c', hard: '#d97070' };
      h += '<div class="mc-progress">' + (qi + 1) + ' of ' + questions.length +
        ' <span style="color:' + (tierColors[tier] || '#059669') + ';font-size:.85em">\u25CF ' + (tierNames[tier] || 'Easy') + '</span></div>';
      var mcIdx = IDS.indexOf(fid);
      var mcLabel = mcIdx >= 0 ? LBL[mcIdx].split(' \u2014 ')[0] : fid;
      h += '<div class="mc-ref">' + mcLabel + (q.ref ? ' ' + q.ref : '') + '</div>';
      h += '<div class="mc-question">' + q.question + '</div>';
      h += '<button class="cloze-audio" id="b-mc-hear">Listen</button>';
      h += '<button class="hint-btn" id="b-mc-hint" aria-label="Get a hint">Hint</button>';
      h += '<div class="hint-display" id="mc-hint-display" role="status" aria-live="polite"></div>';
      h += '<div class="mc-opts">';
      // Child mode: show only 3 options (correct + 2 distractors)
      var mcOpts = q.options.slice();
      if (childMode && mcOpts.length > 3) {
        var correctOpt = mcOpts[q.correct];
        var others = mcOpts.filter(function (_, i) { return i !== q.correct; });
        others = shuffle(others).slice(0, 2);
        mcOpts = shuffle([correctOpt].concat(others));
        // remap correct index
        q._childCorrect = mcOpts.indexOf(correctOpt);
      }
      for (var o = 0; o < mcOpts.length; o++) {
        h += '<button class="mc-opt opt-' + OPTLBLS[o % 4].toLowerCase() + '" data-idx="' + o +
          '" aria-label="Option ' + OPTLBLS[o % 4] + ': ' + mcOpts[o] + '"><span class="opt-letter">' + OPTLBLS[o % 4] + '</span>' +
          mcOpts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="mc-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-mc-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-mc-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-mc-hear').addEventListener('click', function () {
        speakText(q.question);
      });
      var mcCorrectIdx = (q._childCorrect !== undefined) ? q._childCorrect : q.correct;
      var mcCorrectText = mcOpts[mcCorrectIdx];
      wireHintLadder('b-mc-hint', 'mc-hint-display', mcCorrectText, q.source_quote, function (n) { mcHintsUsed = n; });
      var btns = document.querySelectorAll('.mc-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('mc-fb');
          var correctIdx = (q._childCorrect !== undefined) ? q._childCorrect : q.correct;
          if (idx === correctIdx) {
            this.classList.add('mc-correct');
            fb.innerHTML = '<span class="fb-correct">' + (childMode ? 'Great job!' : '\u2714 Correct!') + '</span>' +
              '<div class="cloze-source">' + (q.source_quote || '') + '</div>';
            if (mcFirstAttempt) { score++; points += hintMultiplier(mcHintsUsed); }
            recordQuestionResult(fid, 'mc', qi, mcFirstAttempt);
            var all = document.querySelectorAll('.mc-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2200);
          } else {
            if (mcFirstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'mc', qIndex: qi,
                ref: q.ref || '', question: q.question,
                options: mcOpts.slice(), correct: mcCorrectIdx,
                source_quote: q.source_quote || ''
              });
            }
            mcFirstAttempt = false;
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Not quite \u2014 try another \u2192</span>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / questions.length * 100);
      var xpEarned = recordSession(fid, 'mc', points, questions.length);
      var stats = getStats();
      var lvl = getLevel(stats.xp || 0);
      var mastery = getSectionMastery(fid);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Keep studying!';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + questions.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      if (mastery.badge) h += '<div class="cr-mastery">' + mastery.badge + ' ' + mastery.mastered + '/' + mastery.total + ' questions mastered</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-level">' + lbIcon(lvl.current.icon, 14) + ' ' + lvl.current.name +
        ' \u2014 ' + (stats.xp || 0) + ' XP total</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-mc-retry">Try Again</button>';
      var nextFid = pct >= 80 ? getNextSectionFid(fid) : null;
      if (nextFid) {
        var nextIdx = IDS.indexOf(nextFid);
        var nextLabel = nextIdx >= 0 ? LBL[nextIdx].split(' \u2014 ')[0] : '';
        h += '<button class="study-btn sb-pri" id="b-mc-next">Next: ' + nextLabel + '</button>';
      }
      h += '<button class="study-btn" id="b-mc-back">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-mc-retry').addEventListener('click', function () { showMC(fid); });
      if (nextFid) document.getElementById('b-mc-next').addEventListener('click', function () { go(nextFid); });
      document.getElementById('b-mc-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Flashcards with flip animation + confidence rating ----
function showFlashcards(fid) {
  loadContent(fid).then(function (data) {
    var cards = [];
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx] : fid;
    if (data && data.key_terms) {
      data.key_terms.forEach(function (t) {
        var context = findTermContextInCuratedData(t.term, data);
        var isProper = t.term && t.term[0] === t.term[0].toUpperCase() && t.term[0] !== t.term[0].toLowerCase();
        var backHtml = '';
        if (context) backHtml += '<div class="fc-context">"' + context + '"</div>';
        if (t.definition) backHtml += '<div class="fc-def">' + t.definition + '</div>';
        backHtml += '<div class="fc-prompt">' + termUsagePrompt(t.term, isProper) + '</div>';
        cards.push({
          front: t.term + (t.phonetic ? ' (' + t.phonetic + ')' : ''),
          back: backHtml,
          type: 'term'
        });
      });
    }
    if (data && data.fill_blank) {
      data.fill_blank.forEach(function (q) {
        cards.push({ front: secLabel + ' ' + q.ref, back: q.source_quote, type: 'verse' });
      });
    }
    // Algorithmic fallback: if no curated content, generate cards from chapter verses
    if (!cards.length) {
      var verses = getVerses(fid);
      if (!verses.length && CHAPTER_CACHE[fid]) { verses = getVerses(fid); }
      if (!verses.length) {
        // Try fetching chapter data first
        fetch('../data/' + fid + '.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showFlashcards(fid);}else{showStubForMode(fid,'flash');}
        }).catch(function(){showStubForMode(fid,'stub');});
        return;
      }
      var usable = verses.filter(function(v){return v.length > 20 && v.length < 300;});
      usable = shuffle(usable).slice(0, 15);
      for (var v = 0; v < usable.length; v++) {
        var words = usable[v].split(/\s+/);
        var front = words.slice(0, Math.min(6, Math.ceil(words.length / 2))).join(' ') + '...';
        cards.push({ front: front, back: usable[v], type: 'verse' });
      }
    }
    if (!cards.length) { showStubForMode(fid, 'flash'); return; }
    // Sort due cards first, then shuffle the rest
    var today = new Date().toISOString().slice(0, 10);
    var dueCards = [], otherCards = [];
    cards.forEach(function (c) {
      var stored = getOrCreateCard(fid, c.front, c.back, c.type);
      if (stored.nextReview <= today) dueCards.push(c);
      else otherCards.push(c);
    });
    cards = shuffle(dueCards).concat(shuffle(otherCards));
    var ci = 0, flipped = false;
    var ratings = [];
    var weakQueue = [];
    var sinceWeak = 0;

    function renderCard() {
      if (ci >= cards.length) { showSummary(); return; }
      var c = cards[ci];
      flipped = false;
      var typeColor = c.type === 'term' ? 'var(--vol6)' : 'var(--vol1)';
      var shortLabel = secLabel.split(' \u2014 ')[0];
      var typeLabel = c.type === 'term' ? 'KEY TERM' : shortLabel;

      var h = '<div class="fc-view">';
      h += '<div class="fc-progress">' + (ci + 1) + ' of ' + cards.length + '</div>';
      h += '<div class="fc-type" style="color:' + typeColor + '">' + typeLabel + '</div>';
      h += '<div class="fc-card" id="fc-card">';
      h += '<div class="fc-front" id="fc-front">' + c.front + '</div>';
      h += '<div class="fc-back" id="fc-back" style="display:none">' + c.back + '</div>';
      h += '</div>';
      h += '<button class="cloze-audio" id="b-fc-hear">Listen</button>';
      h += '<div class="fc-action" id="fc-action">';
      h += '<button class="study-btn sb-pri" id="b-fc-flip">Flip to reveal</button>';
      h += '</div>';
      h += '<div class="fc-rate" id="fc-rate" style="display:none">';
      h += '<div class="fc-rate-label">How well did you know this?</div>';
      h += '<div class="fc-rate-btns">';
      var rLabels = ['Blank', 'Hard', 'Okay', 'Good', 'Easy'];
      var rColors = ['#dc2626', '#d97706', '#0891b2', '#059669', '#2563eb'];
      for (var r = 1; r <= 5; r++) {
        h += '<button class="fc-rate-btn" data-r="' + r +
          '" style="background:' + rColors[r - 1] + '" aria-label="Rate ' + r + ' out of 5: ' + rLabels[r - 1] + '">' +
          r + '<br><span class="fc-rate-sub">' + rLabels[r - 1] + '</span></button>';
      }
      h += '</div></div>';
      h += '<button class="study-btn" id="b-fc-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      document.getElementById('b-fc-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-fc-hear').addEventListener('click', function () {
        speakText(flipped ? c.back : c.front);
      });

      document.getElementById('b-fc-flip').addEventListener('click', function () {
        flipped = true;
        document.getElementById('fc-front').style.display = 'none';
        document.getElementById('fc-back').style.display = '';
        document.getElementById('fc-card').classList.add('fc-flipped');
        document.getElementById('fc-action').style.display = 'none';
        document.getElementById('fc-rate').style.display = '';
      });

      var rBtns = document.querySelectorAll('.fc-rate-btn');
      for (var b = 0; b < rBtns.length; b++) {
        rBtns[b].addEventListener('click', function () {
          var r = parseInt(this.getAttribute('data-r'));
          ratings.push(r);
          // SM-2: update the card's schedule based on confidence rating
          var qualityMap = [0, 0, 1, 3, 4, 5]; // confidence 1-5 -> SM-2 quality 0-5
          var card = getOrCreateCard(fid, c.front, c.back, c.type);
          var updated = sm2(card, qualityMap[r]);
          updateCard(updated);
          // Weak card queue: cards rated 1-2 resurface after 3 more cards
          if (r <= 2) {
            weakQueue.push(cards[ci]);
          }
          sinceWeak++;
          ci++;
          // Re-insert a weak card after every 3 cards
          if (weakQueue.length > 0 && sinceWeak >= 3) {
            cards.splice(ci, 0, weakQueue.shift());
            sinceWeak = 0;
          }
          renderCard();
        });
      }
    }

    function showSummary() {
      var avg = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
      var xpEarned = recordSession(fid, 'flash', Math.ceil(avg), cards.length);
      var emoji = avg >= 4 ? 'Outstanding' : avg >= 3 ? 'Well done' : 'Keep going';
      var msg = avg >= 4 ? 'You know this well!' : avg >= 3 ? 'Getting there!' : 'Keep practicing!';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + cards.length + ' cards reviewed</div>';
      h += '<div class="cr-pct">Average confidence: ' + avg.toFixed(1) + ' / 5</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-fc-retry">Again</button>';
      h += '<button class="study-btn" id="b-fc-back">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-fc-retry').addEventListener('click', function () { showFlashcards(fid); });
      document.getElementById('b-fc-back').addEventListener('click', function () { go(fid); });
    }

    renderCard();
  });
}

// ---- Memory Match — flip cards, find matching pairs ----
function showMemoryMatch(fid) {
  loadContent(fid).then(function (data) {
    if (!data || !data.key_terms || data.key_terms.length < 2) {
      // Algorithmic fallback: match first half of verse to second half
      var verses = getVerses(fid);
      if (!verses.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showMemoryMatch(fid);}else{showStubForMode(fid,'memory');}
        }).catch(function(){showStubForMode(fid,'stub');}); return;
      }
      var usable = verses.filter(function(v){return v.length>30&&v.length<150;});
      usable = shuffle(usable).slice(0, 6);
      if (usable.length < 2) { showStubForMode(fid, 'memory'); return; }
      // Create fake key_terms from verse halves
      data = { key_terms: usable.map(function(v) {
        var words = v.split(/\s+/);
        var half = Math.ceil(words.length / 2);
        return { term: words.slice(0, half).join(' '), definition: words.slice(half).join(' ') + '.' };
      })};
    }
    // Use first 6 terms for a 4x3 grid (6 pairs = 12 cards)
    var terms = data.key_terms.slice(0, 6);
    var tiles = [];
    terms.forEach(function (t, i) {
      tiles.push({ id: i, side: 'term', text: t.term, pairId: i });
      tiles.push({ id: i, side: 'def', text: t.definition.length > 100 ? t.definition.slice(0, 97) + '…' : t.definition, pairId: i });
    });
    tiles = shuffle(tiles);

    var flippedA = null, flippedB = null;
    var matched = 0, attempts = 0, locked = false;
    var tileColors = ['#ef4444', '#f97316', '#e91e90', '#16a34a', '#2563eb', '#ca8a04'];

    function render() {
      var h = '<div class="mm-view">';
      h += '<div class="mm-header">Match the term to its meaning</div>';
      h += '<div class="mm-stats">Pairs: ' + matched + '/' + terms.length +
        ' &nbsp; Attempts: ' + attempts + '</div>';
      h += '<div class="mm-grid">';
      for (var i = 0; i < tiles.length; i++) {
        var t = tiles[i];
        h += '<div class="mm-tile" data-idx="' + i + '">';
        h += '<div class="mm-tile-inner">';
        h += '<div class="mm-tile-front">?</div>';
        h += '<div class="mm-tile-back" style="background:' +
          tileColors[t.pairId % 6] + '">' + t.text + '</div>';
        h += '</div></div>';
      }
      h += '</div>';
      h += '<button class="study-btn" id="b-mm-back" style="margin-top:20px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-mm-back').addEventListener('click', function () { go(fid); });

      var tileEls = document.querySelectorAll('.mm-tile');
      for (var i = 0; i < tileEls.length; i++) {
        tileEls[i].addEventListener('click', function () {
          if (locked) return;
          var idx = parseInt(this.getAttribute('data-idx'));
          var tile = tiles[idx];
          if (this.classList.contains('mm-matched') || this.classList.contains('mm-open')) return;

          this.classList.add('mm-open');
          // Strip verse references like (1:2) or (15:25) before speaking
          speakText(tile.text.replace(/\(\d+:\d+[^)]*\)/g, ''));

          if (flippedA === null) {
            flippedA = { idx: idx, tile: tile, el: this };
          } else {
            flippedB = { idx: idx, tile: tile, el: this };
            attempts++;
            locked = true;

            if (flippedA.tile.pairId === flippedB.tile.pairId &&
                flippedA.tile.side !== flippedB.tile.side) {
              // Match!
              flippedA.el.classList.add('mm-matched');
              flippedB.el.classList.add('mm-matched');
              matched++;
              updateStats();
              flippedA = null; flippedB = null;
              locked = false;
              if (matched === terms.length) {
                setTimeout(showWin, 600);
              }
            } else {
              // No match — flip back after delay
              var elA = flippedA.el, elB = flippedB.el;
              setTimeout(function () {
                elA.classList.remove('mm-open');
                elB.classList.remove('mm-open');
                flippedA = null; flippedB = null;
                locked = false;
                updateStats();
              }, 1000);
            }
          }
        });
      }
    }

    function updateStats() {
      var s = document.querySelector('.mm-stats');
      if (s) s.innerHTML = 'Pairs: ' + matched + '/' + terms.length +
        ' &nbsp; Attempts: ' + attempts;
    }

    function showWin() {
      var xpEarned = recordSession(fid, 'memory', terms.length, terms.length);
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">Outstanding</div>';
      h += '<div class="cr-score">All ' + terms.length + ' pairs matched!</div>';
      h += '<div class="cr-pct">in ' + attempts + ' attempts</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + (attempts <= terms.length + 2 ? 'Amazing memory!' :
        attempts <= terms.length * 2 ? 'Well done!' : 'Keep practicing!') + '</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-mm-retry">Play Again</button>';
      h += '<button class="study-btn" id="b-mm-done">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-mm-retry').addEventListener('click', function () { showMemoryMatch(fid); });
      document.getElementById('b-mm-done').addEventListener('click', function () { go(fid); });
    }

    render();
  });
}

// ---- Listen & Learn — read chapter aloud verse by verse ----
function getVerses(fid) {
  var data = CHAPTER_CACHE[fid];
  if (!data) return [];
  var div = document.createElement('div');
  div.innerHTML = data.html;
  var paras = div.querySelectorAll('p.dp');
  var verses = [], anyTyped = false;
  for (var i = 0; i < paras.length; i++) {
    var pt = paras[i].getAttribute('data-ptype');
    if (pt) anyTyped = true;
    if (pt === 'verse') {
      var t = paras[i].textContent.trim();
      if (t) verses.push(t);
    }
  }
  if (!verses.length && !anyTyped) {
    for (var i = 0; i < paras.length; i++) {
      var t = paras[i].textContent.trim();
      if (t && t.length > 20) verses.push(t);
    }
  }
  return verses;
}

function showListenLearn(fid) {
  var verses = getVerses(fid);
  if (!verses.length) {
    // Data might not be cached yet — try fetching
    fetch('../data/' + fid + '.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d) { CHAPTER_CACHE[fid] = d; showListenLearn(fid); }
        else { showStubForMode(fid, 'listen'); }
      }).catch(function () { showStubForMode(fid, 'listen'); });
    return;
  }

  var vi = 0, playing = false, utterance = null;
  var idx = IDS.indexOf(fid);
  var label = idx >= 0 ? LBL[idx] : fid;

  function renderVerse() {
    var h = '<div class="ll-view">';
    h += '<div class="ll-header">Listen &amp; Learn</div>';
    h += '<div class="ll-section">' + label + '</div>';
    // Wrap each word in a span for word-by-word highlight during TTS
    var words = verses[vi].split(/(\s+)/);
    var wordHtml = '';
    var wIdx = 0;
    for (var w = 0; w < words.length; w++) {
      if (words[w].trim()) {
        wordHtml += '<span class="ll-word" data-w="' + wIdx + '">' + words[w] + '</span>';
        wIdx++;
      } else {
        wordHtml += words[w];
      }
    }
    h += '<div class="ll-card" id="ll-card">' + wordHtml + '</div>';
    h += '<div class="ll-progress">' + (vi + 1) + ' of ' + verses.length + '</div>';
    h += '<div class="ll-controls">';
    h += '<button class="ll-btn ll-prev" id="b-ll-prev">\u25C0 Prev</button>';
    h += '<button class="ll-btn ll-play" id="b-ll-play">Play</button>';
    h += '<button class="ll-btn ll-stop" id="b-ll-stop">\u25A0 Stop</button>';
    h += '<button class="ll-btn ll-next" id="b-ll-next">Next </button>';
    h += '</div>';
    h += '<div class="ll-auto">';
    h += '<label><input type="checkbox" id="ll-autoplay"> Auto-advance to next verse</label>';
    h += '</div>';
    h += '<button class="study-btn" id="b-ll-back" style="margin-top:20px">Back to activities</button>';
    h += '</div>';

    document.getElementById('content').innerHTML = h;
    injectGameBack(fid);

    document.getElementById('b-ll-prev').addEventListener('click', function () {
      stopSpeech(); vi = Math.max(0, vi - 1); renderVerse();
    });
    document.getElementById('b-ll-next').addEventListener('click', function () {
      stopSpeech(); vi = Math.min(verses.length - 1, vi + 1); renderVerse();
    });
    document.getElementById('b-ll-play').addEventListener('click', function () {
      playVerse();
    });
    document.getElementById('b-ll-stop').addEventListener('click', function () {
      stopSpeech();
      this.textContent = '\u25A0 Stopped';
    });
    document.getElementById('b-ll-back').addEventListener('click', function () {
      stopSpeech();
      recordSession(fid, 'listen', 1, 1);
      go(fid);
    });
  }

  function playVerse() {
    if (!window.speechSynthesis) return;
    var ss = window.speechSynthesis;
    // iPad Safari wake-up — same pattern as speakText. Resume +
    // cancel + microtask-deferred speak prevents silent drops
    // after the engine sits idle.
    try { ss.resume(); } catch (_) {}
    try { if (ss.speaking || ss.pending) ss.cancel(); } catch (_) {}
    var card = document.getElementById('ll-card');
    if (card) card.classList.add('ll-speaking');
    var btn = document.getElementById('b-ll-play');
    if (btn) btn.textContent = 'Reading...';

    var ttsText = prepTTS(verses[vi]);
    utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.rate = 1; utterance.lang = 'en-US'; utterance.volume = 1;
    var voice = getBestVoice();
    if (voice) utterance.voice = voice;

    // Word-by-word sync highlighting
    var wordSpans = card ? card.querySelectorAll('.ll-word') : [];
    var lastHighlight = null;
    utterance.onboundary = function (ev) {
      if (ev.name !== 'word' || !wordSpans.length) return;
      // Map charIndex in TTS text to word index
      var before = ttsText.slice(0, ev.charIndex);
      var wCount = before.split(/\s+/).filter(function (s) { return s.length > 0; }).length;
      if (wCount < wordSpans.length) {
        if (lastHighlight !== null && lastHighlight < wordSpans.length) {
          wordSpans[lastHighlight].classList.remove('ll-word-active');
        }
        wordSpans[wCount].classList.add('ll-word-active');
        lastHighlight = wCount;
      }
    };

    utterance.onend = function () {
      if (lastHighlight !== null && lastHighlight < wordSpans.length) {
        wordSpans[lastHighlight].classList.remove('ll-word-active');
      }
      if (card) card.classList.remove('ll-speaking');
      if (btn) btn.textContent = 'Play';
      var auto = document.getElementById('ll-autoplay');
      if (auto && auto.checked && vi < verses.length - 1) {
        vi++;
        renderVerse();
        setTimeout(playVerse, 400);
      }
    };
    utterance.onerror = function (ev) {
      if (card) card.classList.remove('ll-speaking');
      if (btn) btn.textContent = 'Play';
    };
    setTimeout(function () { try { ss.speak(utterance); } catch (_) {} }, 0);
  }

  function stopSpeech() {
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  renderVerse();
}

// ---- Progress & Stats view ----
function showProgress(fid) {
  var s = getStats();
  var xp = s.xp || 0;
  var streak = s.streak || 0;
  var best = s.bestStreak || 0;
  var total = s.totalAnswered || 0;
  var lvl = getLevel(xp);
  var sessions = s.sessions || [];

  var h = '<div class="prog-view">';

  // Level card
  h += '<div class="prog-card prog-level" style="border-color:' +
    (lvl.current.name === 'Keeper of the Scroll' ? '#b8860b' :
     lvl.current.name === 'Guardian' ? '#7c3aed' :
     lvl.current.name === 'Scholar' ? '#2563eb' : '#6b7280') + '">';
  h += '<div class="prog-level-icon">' + lbIcon(lvl.current.icon, 56) + '</div>';
  h += '<div class="prog-level-name">' + lvl.current.name + '</div>';
  h += '<div class="prog-xp">' + xp + ' XP</div>';
  if (lvl.next) {
    var pct = Math.min(100, Math.round((xp - lvl.current.xp) / (lvl.next.xp - lvl.current.xp) * 100));
    h += '<div class="prog-bar-wrap"><div class="prog-bar" style="width:' + pct + '%"></div></div>';
    h += '<div class="prog-next">' + (lvl.next.xp - xp) + ' XP to ' + lbIcon(lvl.next.icon, 14) + ' ' + lvl.next.name + '</div>';
  } else {
    h += '<div class="prog-next">Maximum level reached!</div>';
  }
  h += '</div>';

  // Stats row
  h += '<div class="prog-stats">';
  h += '<div class="prog-stat" style="background:#ef4444"><div class="ps-val">' +
    streak + '</div><div class="ps-label">Day Streak</div></div>';
  h += '<div class="prog-stat" style="background:#2563eb"><div class="ps-val">' +
    best + '</div><div class="ps-label">Best Streak</div></div>';
  h += '<div class="prog-stat" style="background:#059669"><div class="ps-val">' +
    sessions.length + '</div><div class="ps-label">Sessions</div></div>';
  h += '<div class="prog-stat" style="background:#7c3aed"><div class="ps-val">' +
    total + '</div><div class="ps-label">Answered</div></div>';
  h += '</div>';

  // Level roadmap
  h += '<div class="prog-card"><h3 class="prog-h3">Level Roadmap</h3>';
  for (var i = 0; i < LEVELS.length; i++) {
    var l = LEVELS[i];
    var reached = xp >= l.xp;
    h += '<div class="prog-road ' + (reached ? 'prog-reached' : '') + '">';
    h += '<span class="prog-road-icon">' + lbIcon(l.icon, 18) + '</span> ';
    h += '<span class="prog-road-name">' + l.name + '</span>';
    h += '<span class="prog-road-xp">' + l.xp + ' XP</span>';
    if (reached) h += ' <span class="prog-road-check">\u2714</span>';
    h += '</div>';
  }
  h += '</div>';

  // Recent sessions
  if (sessions.length > 0) {
    h += '<div class="prog-card"><h3 class="prog-h3">Recent Sessions</h3>';
    var recent = sessions.slice(-8).reverse();
    for (var r = 0; r < recent.length; r++) {
      var rs = recent[r];
      var ridx = IDS.indexOf(rs.fid);
      var rlbl = ridx >= 0 ? LBL[ridx].split(' \u2014 ')[0] : rs.fid;
      h += '<div class="prog-session">';
      h += '<span class="prog-ses-mode">' + rs.mode + '</span> ';
      h += '<span class="prog-ses-label">' + rlbl + '</span> ';
      h += '<span class="prog-ses-score">' + rs.score + '/' + rs.total + '</span>';
      h += '</div>';
    }
    h += '</div>';
  }

  h += '<div class="prog-card"><h3 class="prog-h3">Backup &amp; Restore</h3>';
  h += '<div style="display:flex;gap:10px;flex-wrap:wrap">';
  h += '<button class="study-btn" id="b-prog-export" style="background:#059669" aria-label="Export progress to file">Export Progress</button>';
  h += '<button class="study-btn" id="b-prog-import" style="background:#2563eb" aria-label="Import progress from file">Import Progress</button>';
  h += '</div>';
  h += '<input type="file" id="prog-file" accept=".json" style="display:none">';
  h += '<div id="prog-io-msg" role="status" aria-live="polite" style="margin-top:8px;font-size:13px;color:var(--text-muted);font-weight:700"></div>';
  h += '</div>';

  h += '<div class="prog-card" style="border-left:4px solid #7c3aed;margin-top:16px">';
  h += '<h3 style="color:#7c3aed">Learning Quality Audit</h3>';
  h += '<p style="margin:6px 0;font-size:13px">Run the question-quality engine over this section. Reports POS / capitalisation / length / number / tense / blind-solve giveaways.</p>';
  h += '<button class="study-btn" id="b-prog-quality" style="background:#7c3aed">Run Learning Quality Audit</button>';
  h += '<div id="prog-quality-out" style="margin-top:10px;font-size:13px"></div>';
  h += '</div>';

  // Covenant Seals
  var earnedSeals = getSeals();
  h += '<div class="prog-card"><h3 class="prog-h3">Covenant Seals</h3>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-top:8px">';
  for (var si = 0; si < SEALS.length; si++) {
    var seal = SEALS[si];
    var hasIt = !!earnedSeals[seal.id];
    h += '<div style="background:' + (hasIt ? 'linear-gradient(135deg,#92400e,#78350f)' : '#1a1a1a') + ';border:1.5px solid ' + (hasIt ? '#b8860b' : '#333') + ';border-radius:8px;padding:10px;text-align:center">';
    h += '<div style="font-size:11px;font-weight:800;color:' + (hasIt ? '#fde68a' : '#666') + ';letter-spacing:.5px">' + seal.title + '</div>';
    h += '<div style="font-size:10px;color:' + (hasIt ? '#d4a96a' : '#444') + ';margin-top:4px">' + seal.desc + '</div>';
    if (hasIt) h += '<div style="font-size:9px;color:#b8860b;margin-top:4px">' + earnedSeals[seal.id] + '</div>';
    h += '</div>';
  }
  h += '</div></div>';

  h += '<button class="study-btn" id="b-prog-back" style="margin-top:16px">Back to activities</button>';
  h += '</div>';

  document.getElementById('content').innerHTML = h;
  document.getElementById('b-prog-back').addEventListener('click', function () { go(fid); });

  // Learning Quality Audit — runs the validator over MC questions
  // generated for this section. Reports total / pass / fail / avg
  // score / elimination resistance % / blind-solve count.
  var qBtn = document.getElementById('b-prog-quality');
  if (qBtn) qBtn.addEventListener('click', function () {
    var out = document.getElementById('prog-quality-out');
    if (!out) return;
    out.innerHTML = '<em>Running…</em>';
    if (!window.LoadAttainQuality || typeof window.LoadAttainQuality.auditQuestionSet !== 'function') {
      out.innerHTML = '<span style="color:#dc2626">Quality engine not loaded.</span>'; return;
    }
    setTimeout(function () {
      try {
        var pool = [];
        if (typeof generateSmartQuestions === 'function') {
          var smart = generateSmartQuestions(fid, 50) || [];
          for (var i = 0; i < smart.length; i++) pool.push(smart[i]);
        }
        var data = (typeof CHAPTER_CACHE !== 'undefined') ? CHAPTER_CACHE[fid] : null;
        if (data && data.multiple_choice) for (var j = 0; j < data.multiple_choice.length; j++) {
          var q = data.multiple_choice[j];
          pool.push({ question: q.question, options: q.options.slice(), correct: q.correct, source: q.source_quote || '' });
        }
        if (data && data.fill_blank && pool.length < 100) for (var k = 0; k < data.fill_blank.length && pool.length < 100; k++) {
          var fbq = data.fill_blank[k];
          var opts = [fbq.answer];
          for (var l = 0; l < data.fill_blank.length && opts.length < 4; l++) if (l !== k) opts.push(data.fill_blank[l].answer);
          pool.push({ question: fbq.prompt.replace('______', '___'), options: opts, correct: opts.indexOf(fbq.answer), source: fbq.source_quote || '' });
        }
        var report = window.LoadAttainQuality.auditQuestionSet(pool);
        var html = '';
        html += '<div style="font-weight:700;margin-bottom:6px">Total: ' + report.total + ' · Pass: ' + report.pass + ' · Fail: ' + report.fail + '</div>';
        html += '<div>Avg score: <strong>' + report.score + '</strong> / 100</div>';
        html += '<div>Elimination resistance: <strong>' + report.eliminationResistance + '%</strong></div>';
        html += '<div>Blind-solve flags: <strong>' + report.blindSolveCount + '</strong></div>';
        var rcKeys = Object.keys(report.reasonCounts || {});
        if (rcKeys.length) {
          html += '<div style="margin-top:8px;font-weight:700">Reason frequency</div><ul style="margin:4px 0 0 16px;padding:0">';
          rcKeys.sort(function (a, b) { return report.reasonCounts[b] - report.reasonCounts[a]; })
                .forEach(function (r) { html += '<li>' + report.reasonCounts[r] + ' &times; ' + r + '</li>'; });
          html += '</ul>';
        } else {
          html += '<div style="margin-top:8px;color:#059669">No quality issues detected.</div>';
        }
        var badge = (report.score >= 90 && report.eliminationResistance >= 90) ? 'PASS' : (report.score >= 70 ? 'PARTIAL' : 'FAIL');
        var badgeColor = badge === 'PASS' ? '#059669' : (badge === 'PARTIAL' ? '#d97706' : '#dc2626');
        html = '<div style="display:inline-block;background:' + badgeColor + ';color:#fff;padding:3px 10px;border-radius:5px;font-weight:800;margin-bottom:8px">' + badge + '</div>' + html;
        out.innerHTML = html;
      } catch (e) {
        out.innerHTML = '<span style="color:#dc2626">Audit error: ' + (e && e.message ? e.message : e) + '</span>';
      }
    }, 0);
  });

  document.getElementById('b-prog-export').addEventListener('click', function () {
    var exportData = {
      version: 1,
      exportDate: new Date().toISOString(),
      stats: getStats(),
      cards: getCards(),
      quizMastery: getQuizMastery(),
      notes: (function () { try { return JSON.parse(localStorage.getItem('acr_study_notes') || '{}'); } catch (e) { return {}; } })()
    };
    var blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'acr-study-progress-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    document.getElementById('prog-io-msg').textContent = 'Done: Progress exported successfully';
  });

  document.getElementById('b-prog-import').addEventListener('click', function () {
    document.getElementById('prog-file').click();
  });

  document.getElementById('prog-file').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (!imported.version || !imported.stats) {
          document.getElementById('prog-io-msg').textContent = '\u274C Invalid file — not an ACR Study export';
          return;
        }
        if (imported.stats) {
          var current = getStats();
          imported.stats.xp = Math.max(current.xp || 0, imported.stats.xp || 0);
          imported.stats.bestStreak = Math.max(current.bestStreak || 0, imported.stats.bestStreak || 0);
          var currentSessions = current.sessions || [];
          var importedSessions = imported.stats.sessions || [];
          imported.stats.sessions = currentSessions.concat(importedSessions).slice(-100);
          saveStats(imported.stats);
        }
        if (imported.cards) {
          var currentCards = getCards();
          for (var id in imported.cards) {
            if (!currentCards[id] || imported.cards[id].reps > (currentCards[id].reps || 0)) {
              currentCards[id] = imported.cards[id];
            }
          }
          saveCards(currentCards);
        }
        if (imported.quizMastery) {
          var currentM = getQuizMastery();
          for (var key in imported.quizMastery) {
            if (!currentM[key] || imported.quizMastery[key].correct > (currentM[key].correct || 0)) {
              currentM[key] = imported.quizMastery[key];
            }
          }
          saveQuizMastery(currentM);
        }
        if (imported.notes) {
          var currentNotes = (function () { try { return JSON.parse(localStorage.getItem('acr_study_notes') || '{}'); } catch (e) { return {}; } })();
          for (var nk in imported.notes) {
            if (!currentNotes[nk]) currentNotes[nk] = imported.notes[nk];
          }
          try { localStorage.setItem('acr_study_notes', JSON.stringify(currentNotes)); } catch (e) {}
        }
        document.getElementById('prog-io-msg').textContent = 'Done: Progress imported — merging with existing data';
        setTimeout(function () { showProgress(fid); }, 1500);
      } catch (err) {
        document.getElementById('prog-io-msg').textContent = '\u274C Error reading file: ' + err.message;
      }
    };
    reader.readAsText(file);
  });

  window.scrollTo(0, 0);
}

// ---- Verse Builder — tap scrambled words in order to rebuild a verse ----
function showVerseBuild(fid) {
  loadContent(fid).then(function (data) {
    var verses;
    if (data && data.fill_blank && data.fill_blank.length) {
      verses = data.fill_blank.map(function (q) { return { ref: q.ref, text: q.source_quote }; });
    } else {
      var rawVerses = getVerses(fid);
      if (!rawVerses.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showVerseBuild(fid);}else{showStubForMode(fid,'versebuild');}
        }).catch(function(){showStubForMode(fid,'stub');}); return;
      }
      var usable = rawVerses.filter(function(v){return v.split(/\s+/).length>=5&&v.split(/\s+/).length<=15;});
      usable = shuffle(usable).slice(0, 5);
      if (!usable.length) { showStubForMode(fid, 'versebuild'); return; }
      verses = usable.map(function(v){ return { ref: '', text: v }; });
    }
    verses = shuffle(verses);
    var qi = 0, score = 0;

    function renderPuzzle() {
      if (qi >= Math.min(verses.length, 5)) { showResults(); return; }
      var v = verses[qi];
      var origWords = v.text.split(/\s+/).filter(function (w) { return w.length > 0; });
      var scrambled = shuffle(origWords.slice());
      var placed = [];

      function draw() {
        var h = '<div class="vb-view">';
        h += '<div class="vb-progress">' + (qi + 1) + ' of ' + Math.min(verses.length, 5) + '</div>';
        var vbIdx = IDS.indexOf(fid);
        var vbLabel = vbIdx >= 0 ? LBL[vbIdx] : fid;
        h += '<div class="vb-ref">' + vbLabel + ' \u2014 ' + v.ref + '</div>';
        h += '<div class="vb-placed" id="vb-placed">';
        for (var p = 0; p < placed.length; p++) {
          h += '<span class="vb-word vb-done" data-pi="' + p + '">' + placed[p] + '</span>';
        }
        if (placed.length < origWords.length) h += '<span class="vb-cursor">_</span>';
        h += '</div>';
        h += '<div class="vb-bank" id="vb-bank">';
        for (var s = 0; s < scrambled.length; s++) {
          var used = placed.indexOf(scrambled[s]) >= 0 && countIn(placed, scrambled[s]) >= countIn(scrambled.slice(0, s + 1), scrambled[s]);
          if (!used) {
            h += '<button class="vb-word vb-pick" data-si="' + s + '">' + scrambled[s] + '</button>';
          }
        }
        h += '</div>';
        h += '<div class="vb-btns">';
        h += '<button class="study-btn" id="b-vb-undo" style="background:#6b7280">\u21A9 Undo</button>';
        h += '<button class="cloze-audio" id="b-vb-hear">Listen</button>';
        h += '</div>';
        h += '<div id="vb-fb" class="cloze-feedback"></div>';
        h += '<button class="study-btn" id="b-vb-quit" style="margin-top:18px">Back to activities</button>';
        h += '</div>';
        document.getElementById('content').innerHTML = h;
        injectGameBack(fid);

        document.getElementById('b-vb-quit').addEventListener('click', function () { go(fid); });
        document.getElementById('b-vb-hear').addEventListener('click', function () { speakText(v.text); });
        document.getElementById('b-vb-undo').addEventListener('click', function () {
          if (placed.length > 0) { placed.pop(); draw(); }
        });

        var picks = document.querySelectorAll('.vb-pick');
        for (var i = 0; i < picks.length; i++) {
          picks[i].addEventListener('click', function () {
            var si = parseInt(this.getAttribute('data-si'));
            var word = scrambled[si];
            placed.push(word);
            // Check if correct so far
            var correct = true;
            for (var c = 0; c < placed.length; c++) {
              if (placed[c] !== origWords[c]) { correct = false; break; }
            }
            if (!correct) {
              placed.pop();
              this.classList.add('cloze-wrong');
              document.getElementById('vb-fb').innerHTML = '<span class="fb-try">Not that word \u2014 try another</span>';
              var self = this;
              setTimeout(function () { self.classList.remove('cloze-wrong'); }, 500);
            } else if (placed.length === origWords.length) {
              score++;
              document.getElementById('vb-fb').innerHTML = '<span class="fb-correct">\u2714 Perfect!</span>';
              setTimeout(function () { qi++; renderPuzzle(); }, 1500);
              draw();
            } else {
              draw();
            }
          });
        }
      }
      draw();
    }

    function countIn(arr, val) {
      var c = 0; for (var i = 0; i < arr.length; i++) if (arr[i] === val) c++; return c;
    }

    function showResults() {
      var pct = Math.round(score / Math.min(verses.length, 5) * 100);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var xpEarned = recordSession(fid, 'versebuild', score, Math.min(verses.length, 5));
      var h = '<div class="cloze-results"><div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + Math.min(verses.length, 5) + '</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-vb-retry">Again</button>';
      h += '<button class="study-btn" id="b-vb-back">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-vb-retry').addEventListener('click', function () { showVerseBuild(fid); });
      document.getElementById('b-vb-back').addEventListener('click', function () { go(fid); });
    }

    renderPuzzle();
  });
}

// ---- Word Match — tap term then tap its definition ----
function showWordMatch(fid) {
  loadContent(fid).then(function (data) {
    var terms;
    if (data && data.key_terms && data.key_terms.length >= 4) {
      terms = shuffle(data.key_terms.slice(0, 6));
    } else {
      // Algorithmic fallback: match first words of verse to rest
      var rawV = getVerses(fid);
      if (!rawV.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showWordMatch(fid);}else{showStubForMode(fid,'wordmatch');}
        }).catch(function(){showStubForMode(fid,'stub');}); return;
      }
      var us = rawV.filter(function(v){return v.length>30&&v.length<150;});
      us = shuffle(us).slice(0, 6);
      if (us.length < 2) { showStubForMode(fid, 'wordmatch'); return; }
      terms = us.map(function(v) {
        var w = v.split(/\s+/);
        var h = Math.ceil(w.length / 2);
        return { term: w.slice(0, Math.min(4, h)).join(' ') + '...', definition: v };
      });
    }
    var defs = shuffle(terms.map(function (t) { return { term: t.term, def: t.definition.length > 100 ? t.definition.slice(0, 97) + '…' : t.definition }; }));
    var matched = 0, selectedTerm = null;

    function render() {
      var h = '<div class="wm-view">';
      h += '<div class="wm-header">Tap a term, then tap its meaning</div>';
      h += '<div class="wm-stats">Matched: ' + matched + ' / ' + terms.length + '</div>';
      h += '<div class="wm-cols">';
      h += '<div class="wm-col">';
      for (var i = 0; i < terms.length; i++) {
        var mClass = terms[i]._matched ? ' wm-done' : '';
        h += '<button class="wm-item wm-term' + mClass + '" data-t="' + i + '" style="border-left:4px solid ' +
          ['#2563eb','#dc2626','#059669','#7c3aed','#d97706','#0891b2'][i % 6] + '">' + terms[i].term + '</button>';
      }
      h += '</div><div class="wm-col">';
      for (var j = 0; j < defs.length; j++) {
        var dClass = defs[j]._matched ? ' wm-done' : '';
        h += '<button class="wm-item wm-def' + dClass + '" data-d="' + j + '">' + defs[j].def + '</button>';
      }
      h += '</div></div>';
      h += '<div id="wm-fb" class="cloze-feedback"></div>';
      h += '<button class="study-btn" id="b-wm-back" style="margin-top:16px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-wm-back').addEventListener('click', function () { go(fid); });

      var termBtns = document.querySelectorAll('.wm-term:not(.wm-done)');
      var defBtns = document.querySelectorAll('.wm-def:not(.wm-done)');

      for (var t = 0; t < termBtns.length; t++) {
        termBtns[t].addEventListener('click', function () {
          document.querySelectorAll('.wm-term').forEach(function (b) { b.classList.remove('wm-selected'); });
          this.classList.add('wm-selected');
          selectedTerm = parseInt(this.getAttribute('data-t'));
          speakText(terms[selectedTerm].term);
        });
      }
      for (var d = 0; d < defBtns.length; d++) {
        defBtns[d].addEventListener('click', function () {
          if (selectedTerm === null) {
            document.getElementById('wm-fb').innerHTML = '<span class="fb-try">Tap a term first</span>';
            return;
          }
          var di = parseInt(this.getAttribute('data-d'));
          if (defs[di].term === terms[selectedTerm].term) {
            terms[selectedTerm]._matched = true;
            defs[di]._matched = true;
            matched++;
            if (matched === terms.length) {
              var xp = recordSession(fid, 'wordmatch', matched, terms.length);
              document.getElementById('wm-fb').innerHTML = '<span class="fb-correct">All matched! +' + xp + ' XP</span>';
              setTimeout(function () { go(fid); }, 2000);
            } else {
              selectedTerm = null;
              render();
            }
          } else {
            this.classList.add('cloze-wrong');
            document.getElementById('wm-fb').innerHTML = '<span class="fb-try">Not a match \u2014 try again</span>';
            var self = this;
            setTimeout(function () { self.classList.remove('cloze-wrong'); }, 500);
          }
        });
      }
    }
    render();
  });
}

// ---- Challenge (Family Feud) mode — 4-6 player competitive quiz ----
function showChallenge(fid) {
  var secIdx = IDS.indexOf(fid);
  var secLabel = secIdx >= 0 ? LBL[secIdx].split(' \u2014 ')[0] : fid;
  var playerColors = ['#2563eb', '#dc2626', '#059669', '#7c3aed', '#d97706', '#0891b2'];
  var playerCount = 4;

  function setupScreen() {
    var h = '<div class="ch-setup">';
    h += '<div class="ch-title">CHALLENGE</div>';
    h += '<div class="ch-subtitle">' + secLabel + '</div>';
    h += '<div class="ch-player-count"><label>Players:</label>';
    for (var n = 2; n <= 6; n++) {
      h += '<button class="ch-count-btn' + (n === playerCount ? ' ch-count-on' : '') + '" data-n="' + n + '">' + n + '</button>';
    }
    h += '</div>';
    h += '<div class="ch-players" id="ch-player-list">';
    for (var p = 1; p <= playerCount; p++) {
      h += '<div class="ch-player-input"><label>Player ' + p + '</label><input id="ch-p' + p + '" type="text" value="Player ' + p + '" maxlength="12" class="ch-name"></div>';
    }
    h += '</div>';
    h += '<button class="study-btn sb-pri" id="b-ch-start">Start Challenge </button>';
    h += '<button class="study-btn" id="b-ch-back">Back to activities</button>';
    h += '</div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-ch-back').addEventListener('click', function () { go(fid); });
    var countBtns = document.querySelectorAll('.ch-count-btn');
    for (var cb = 0; cb < countBtns.length; cb++) {
      countBtns[cb].addEventListener('click', function () {
        playerCount = parseInt(this.getAttribute('data-n'));
        setupScreen();
      });
    }
    document.getElementById('b-ch-start').addEventListener('click', function () {
      var pNames = [];
      for (var i = 1; i <= playerCount; i++) {
        var el = document.getElementById('ch-p' + i);
        pNames.push(el ? (el.value.trim() || 'Player ' + i) : 'Player ' + i);
      }
      startGame(pNames);
    });
  }

  function startGame(playerNames) {
    var allQ = [];
    loadContent(fid).then(function (data) {
      if (data && data.fill_blank) {
        data.fill_blank.forEach(function (q) {
          var opts = [q.answer];
          var others = data.fill_blank.filter(function (o) { return o.answer !== q.answer; });
          others = shuffle(others).slice(0, 3);
          for (var i = 0; i < others.length; i++) opts.push(others[i].answer);
          opts = shuffle(opts);
          var fbQ = { question: q.prompt.replace('______', '___'), options: opts, correct: opts.indexOf(q.answer), source: q.source_quote || '' };
          if (passesQualityGate(fbQ)) allQ.push(fbQ);
        });
      }
      if (data && data.multiple_choice) {
        data.multiple_choice.forEach(function (q) {
          var mcQ = { question: q.question, options: q.options.slice(), correct: q.correct, source: q.source_quote || '' };
          if (passesQualityGate(mcQ)) allQ.push(mcQ);
        });
      }
      if (allQ.length < 5) {
        var verses = getVerses(fid);
        if (!verses.length) {
          fetch('../data/' + fid + '.json').then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
            if (d) { CHAPTER_CACHE[fid] = d; showChallenge(fid); } else { showStubForMode(fid, 'challenge'); }
          }).catch(function () { showStubForMode(fid, 'challenge'); }); return;
        }
        var usable = verses.filter(function (v) { return v.length > 30 && v.length < 200; });
        usable = shuffle(usable).slice(0, 10);
        for (var vi = 0; vi < usable.length; vi++) {
          var words = usable[vi].split(/\s+/).filter(function (w) { return w.length > 3; });
          if (words.length < 4) continue;
          var bIdx = Math.floor(Math.random() * (words.length - 2)) + 1;
          var ans = words[bIdx].replace(/[.,;:!?]/g, '');
          var prompt = usable[vi].replace(new RegExp('\\b' + ans.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b'), '___');
          if (prompt === usable[vi]) continue;
          var dOpts = [ans];
          var dWords = shuffle(words.filter(function (w) { return w.replace(/[.,;:!?]/g, '') !== ans && w.length > 3; })).slice(0, 3);
          for (var di = 0; di < dWords.length; di++) dOpts.push(dWords[di].replace(/[.,;:!?]/g, ''));
          dOpts = shuffle(dOpts);
          var rgQ = { question: prompt, options: dOpts, correct: dOpts.indexOf(ans), source: usable[vi] };
          if (passesQualityGate(rgQ)) allQ.push(rgQ);
        }
      }
      if (allQ.length < 2) { showStubForMode(fid, 'challenge'); return; }
      allQ = shuffle(allQ).slice(0, Math.max(50, playerNames.length * 10));
      runGame(playerNames, allQ);
    });
  }

  function runGame(names, questions) {
    var scores = [];
    for (var si = 0; si < names.length; si++) scores.push(0);
    var currentPlayer = 0;
    var qi = 0;
    var strikes = 0;
    var timer = null;
    var timeLeft = 0;

    function nextPlayer() {
      currentPlayer = (currentPlayer + 1) % names.length;
    }

    function renderQuestion() {
      if (qi >= questions.length) { showFinalResults(); return; }
      var q = questions[qi];
      timeLeft = 20;
      strikes = 0;

      var h = '<div class="ch-game">';
      h += '<div class="ch-scorebar">';
      for (var s = 0; s < names.length; s++) {
        h += '<div class="ch-p' + (s === currentPlayer ? ' ch-p-active' : '') + '" style="background:' + playerColors[s % 6] + '"><div class="ch-pname">' + names[s] + '</div><div class="ch-pscore">' + scores[s] + '</div></div>';
      }
      h += '</div>';
      h += '<div class="ch-timer" id="ch-timer">' + timeLeft + '</div>';
      h += '<div class="ch-turn" style="color:' + playerColors[currentPlayer % 6] + '">' + names[currentPlayer] + "&#39;s turn</div>";
      h += '<div class="ch-round">Round ' + (qi + 1) + ' of ' + questions.length + '</div>';
      h += '<div class="ch-question">' + q.question + '</div>';
      h += '<div class="ch-strikes" id="ch-strikes"></div>';
      h += '<div class="ch-opts">';
      for (var o = 0; o < q.options.length; o++) {
        h += '<button class="ch-opt" data-idx="' + o + '" style="background:' + ['#2563eb', '#059669', '#7c3aed', '#d97706'][o % 4] + '">' + q.options[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="ch-fb" id="ch-fb"></div>';
      h += '<button class="study-btn" id="b-ch-quit" style="margin-top:14px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-ch-quit').addEventListener('click', function () { clearInterval(timer); go(fid); });

      var timerEl = document.getElementById('ch-timer');
      timer = setInterval(function () {
        timeLeft--;
        if (timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 5 && timerEl) timerEl.style.color = '#dc2626';
        if (timeLeft <= 0) {
          clearInterval(timer);
          nextPlayer();
          scores[currentPlayer] += 50;
          document.getElementById('ch-fb').innerHTML = '<span class="fb-try">Time up! ' + names[currentPlayer] + ' gets 50 pts</span>';
          setTimeout(function () { qi++; currentPlayer = qi % names.length; renderQuestion(); }, 2000);
        }
      }, 1000);

      var optBtns = document.querySelectorAll('.ch-opt');
      for (var b = 0; b < optBtns.length; b++) {
        optBtns[b].addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('ch-fb');
          if (idx === q.correct) {
            clearInterval(timer);
            this.classList.add('cloze-correct');
            var pts = Math.max(10, timeLeft * 5);
            scores[currentPlayer] += pts;
            fb.innerHTML = '<span class="fb-correct">\u2714 ' + names[currentPlayer] + ' +' + pts + ' pts!</span>';
            var all = document.querySelectorAll('.ch-opt'); for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; currentPlayer = qi % names.length; renderQuestion(); }, 2000);
          } else {
            this.classList.add('cloze-wrong');
            this.disabled = true;
            strikes++;
            var strikesEl = document.getElementById('ch-strikes');
            strikesEl.innerHTML = '\u274C'.repeat(strikes);
            if (strikes >= 3) {
              clearInterval(timer);
              nextPlayer();
              fb.innerHTML = '<span class="fb-try">3 strikes! ' + names[currentPlayer] + ' can steal!</span>';
            } else {
              fb.innerHTML = '<span class="fb-try">Strike ' + strikes + '! Try again</span>';
            }
          }
        });
      }
    }

    function showFinalResults() {
      var maxScore = Math.max.apply(null, scores);
      var winners = [];
      for (var w = 0; w < names.length; w++) { if (scores[w] === maxScore) winners.push(names[w]); }
      var winnerText = winners.length > 1 ? 'Tie: ' + winners.join(' & ') : winners[0] + ' wins!';
      var xpEarned = recordSession(fid, 'challenge', maxScore, questions.length * 100);
      var h = '<div class="ch-results">';
      h += '<div class="cr-emoji">Outstanding</div>';
      h += '<div class="ch-winner">' + winnerText + '</div>';
      h += '<div class="ch-final-scores">';
      var sorted = [];
      for (var fi = 0; fi < names.length; fi++) sorted.push({ name: names[fi], score: scores[fi], color: playerColors[fi % 6] });
      sorted.sort(function (a, b) { return b.score - a.score; });
      for (var ri = 0; ri < sorted.length; ri++) {
        h += '<div class="ch-final-p" style="border-color:' + sorted[ri].color + '">';
        h += '<span class="ch-final-rank">' + (ri + 1) + '</span> ' + sorted[ri].name;
        h += '<br><span class="ch-final-pts">' + sorted[ri].score + '</span></div>';
      }
      h += '</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP</div>';
      h += '<div class="cr-btns">';
      h += '<button class="study-btn sb-pri" id="b-ch-again">Rematch</button>';
      h += '<button class="study-btn" id="b-ch-done">Back to activities</button>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-ch-again').addEventListener('click', function () { showChallenge(fid); });
      document.getElementById('b-ch-done').addEventListener('click', function () { go(fid); });
    }

    renderQuestion();
  }

  setupScreen();
}

// ---- Who Said It — match curated dialogue to speaker ----
function showWhoSaidIt(fid) {
  loadContent(fid).then(function (data) {
    var quotes = extractSpeakerQuotesFromCurated(data);
    if (!quotes.length) { showStubForMode(fid, 'whosaidit'); return; }
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var speakerPool = [];
    quotes.forEach(function (q) {
      if (speakerPool.indexOf(q.speaker) === -1) speakerPool.push(q.speaker);
    });
    // Supplement speaker pool with names from section text so we always
    // have at least 4 plausible wrong speakers rather than falling back to dashes
    if (speakerPool.length < 4) {
      var _sv2 = getVerses(fid);
      _sv2.forEach(function (v) {
        var m = v.match(new RegExp(NAMES_PATTERN.source, 'gi')); NAMES_PATTERN.lastIndex = 0;
        if (m) m.forEach(function (n) { if (speakerPool.indexOf(n) < 0) speakerPool.push(n); });
      });
    }

    var questions = shuffle(quotes.slice()).slice(0, 15);
    var qi = 0, score = 0, points = 0, firstAttempt = true, hintsUsed = 0;
    var OPTLBLS = ['A', 'B', 'C', 'D'];

    function renderQ() {
      if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
      if (qi >= questions.length) { showResults(); return; }
      var q = questions[qi];
      firstAttempt = true;
      hintsUsed = 0;
      var distractors = shuffle(speakerPool.filter(function (s) { return s !== q.speaker; })).slice(0, 3);
      var opts = shuffle([q.speaker].concat(distractors));
      var correctIdx = opts.indexOf(q.speaker);

      var h = '<div class="mc-view">';
      h += '<div class="whosaidit-banner">Who Said It</div>';
      h += '<div class="mc-ref">' + secLabel + '</div>';
      h += '<div class="mc-question">Who said: <em>"' + q.quote + '"</em></div>';
      h += '<button class="cloze-audio" id="b-ws-hear">Listen</button>';
      h += '<button class="hint-btn" id="b-ws-hint" aria-label="Get a hint">Hint</button>';
      h += '<div class="hint-display" id="ws-hint-display" role="status" aria-live="polite"></div>';
      h += '<div class="mc-opts">';
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="mc-opt opt-' + OPTLBLS[o % 4].toLowerCase() + '" data-idx="' + o + '" aria-label="Option ' + OPTLBLS[o % 4] + ': ' + opts[o] + '"><span class="opt-letter">' + OPTLBLS[o % 4] + '</span>' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="ws-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-ws-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-ws-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-ws-hear').addEventListener('click', function () { speakText(q.quote); });
      wireHintLadder('b-ws-hint', 'ws-hint-display', q.speaker, q.quote, function (n) { hintsUsed = n; });
      var btns = document.querySelectorAll('.mc-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var idx2 = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('ws-fb');
          if (idx2 === correctIdx) {
            this.classList.add('mc-correct');
            fb.innerHTML = '<span class="fb-correct">\u2714 Correct!</span>' +
              '<div class="cloze-source">\u201C' + q.quote + '\u201D \u2014 ' + q.speaker + '</div>';
            if (firstAttempt) { score++; points += hintMultiplier(hintsUsed); }
            recordQuestionResult(fid, 'whosaidit', qi, firstAttempt);
            var all = document.querySelectorAll('.mc-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2200);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'whosaidit', qIndex: qi,
                ref: '', question: 'Who said: "' + q.quote + '"?',
                options: opts.slice(), correct: correctIdx,
                answer: q.speaker, source_quote: q.quote
              });
            }
            firstAttempt = false;
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Not quite \u2014 try another \u2192</span>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / questions.length * 100);
      var xpEarned = recordSession(fid, 'whosaidit', points, questions.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Listen closer!';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + questions.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-ws-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-ws-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-ws-retry').addEventListener('click', function () { showWhoSaidIt(fid); });
      document.getElementById('b-ws-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- True or False with Why ----
function generateTrueFalseFromCurated(data, count) {
  count = count || 10;
  if (!data || !data.key_terms || data.key_terms.length < 1) return [];
  // Pool sources broadly — summary + faq + source_quotes. Previously we
  // only used source_quotes, so sections whose verses don't contain a
  // proper-noun key term (laws, genealogies) yielded 0 questions.
  var sources = [];
  if (data.summary_plain) sources.push(data.summary_plain);
  if (data.summary_scholarly) sources.push(data.summary_scholarly);
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.faq) data.faq.forEach(function (q) { if (q.answer) sources.push(q.answer); });
  if (!sources.length) return [];

  // Accept ANY key term, not just proper nouns. Previously the swap
  // pool was proper-noun-only, which failed on thematic content
  // (covenant, sanctuary, holiness, sacrifice).
  var termByLower = {};
  for (var t = 0; t < data.key_terms.length; t++) {
    if (data.key_terms[t].term && data.key_terms[t].term.length >= 3) {
      termByLower[data.key_terms[t].term.toLowerCase()] = data.key_terms[t].term;
    }
  }

  // Match key terms against the full sentence via word-boundary regex,
  // so compound terms like "Qayin and Hevel" and "Tohu va-Vohu" match
  // even though splitting by whitespace would miss them.
  var terms = data.key_terms.filter(function (t) { return t.term && t.term.length >= 3; });
  var candidates = [];
  for (var i = 0; i < sources.length; i++) {
    var sentences = sources[i].match(/[^.!?]+[.!?]+/g) || [sources[i]];
    for (var s = 0; s < sentences.length; s++) {
      var sent = sentences[s].trim();
      if (sent.length < 20 || sent.length > 260) continue;
      // Reject dependent clauses, pronoun-first sentences, connectives
      if (/^(Because|Since|Although|Though|While|When|Where|As |So |And |But |Or |For |Yet |Then |Thus |Therefore |However |Moreover |Furthermore |Additionally |Instead |Otherwise |He |She |They |It |His |Her |Their |This |That |These |Those )/i.test(sent)) continue;
      // Reject their/they/them with no group noun antecedent in the sentence
      if (/\b(their|they|them)\b/i.test(sent) && !/\b(people|community|group|nation|tribe|sons|children|priests?|members?|followers?|assembly|congregation|Levites?|Israelites?|Hebrews?|disciples?|servants?|prophets?|kings?|elders?|rulers?|leaders?|armies|warriors?|soldiers?|family|families|ancestors?|descendants?|generation)\b/i.test(sent)) continue;
      // Reject questions and incomplete sentences
      if (sent.trim().slice(-1) === '?') continue;
      if (/\.{2,}\s*$/.test(sent) || /—\s*$/.test(sent)) continue;
      // Reject verse/chapter citations (confusing out of context)
      if (/\b\d+:\d+\b/.test(sent) || /\bchapter \d+\b/i.test(sent)) continue;
      // Reject ACR editorial metadata
      if (/\bACR Volume\b/i.test(sent)) continue;
      // Reject sentences with long parentheticals (often sigla or editorial notes)
      if (/\([^)]{10,}\)/.test(sent)) continue;
      // Reject vague-predicate sentences — "X is brief/important/significant" etc.
      if (/\b(?:is|are|was|were)\s+(?:a |an |the )?(?:brief|important|significant|notable|unique|interesting|crucial|remarkable|complex|simple|small|large|lengthy|short|long|extensive|limited|major|minor|key|central|vital|essential|common|rare|different|similar|related|special|specific|general|various|many|few|much|little|more|less|great|good|bad|known|found|used|seen|given|made|said|called|named)\b/i.test(sent)) continue;
      // Reject sentences with vague referential subjects ("the account", "the text", "the passage" etc.)
      if (/^The (?:account|text|passage|narrative|story|section|record|description|reference|concept|idea|theme|notion|term|word|phrase|verse|chapter|book|document|scroll|source|material|content|information|detail|fact|claim|point|example|case|issue|matter|topic)\b/i.test(sent)) continue;
      for (var k = 0; k < terms.length; k++) {
        var tterm = terms[k].term;
        var re = new RegExp('\\b' + tterm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
        if (re.test(sent)) {
          candidates.push({ sentence: sent, term: tterm, source: sources[i] });
          break;
        }
      }
    }
  }
  if (!candidates.length) return [];
  candidates = shuffle(candidates.slice());

  var questions = [];
  var used = {};
  for (var c = 0; c < candidates.length && questions.length < count; c++) {
    var cand = candidates[c];
    var key = cand.sentence.slice(0, 50);
    if (used[key]) continue;
    used[key] = true;
    var makeTrue = (questions.length % 2 === 0);
    if (makeTrue) {
      questions.push({ statement: cand.sentence, answer: true, source: cand.source, originalTerm: cand.term });
    } else {
      // Prefer a swap term of similar capitalization so the sentence still
      // reads grammatically ("Qayin killed Hevel" -> "Noakh killed Hevel"
      // not "covenant killed Hevel")
      var origIsCap = cand.term[0] === cand.term[0].toUpperCase() && cand.term[0] !== cand.term[0].toLowerCase();
      var others = data.key_terms.filter(function (kt) {
        if (!kt.term || kt.term.toLowerCase() === cand.term.toLowerCase()) return false;
        if (kt.term.length > 30) return false;       // no long compound titles
        if (/\d|\(/.test(kt.term)) return false;     // no sigla like 1QM or 4QEn
        var kc = kt.term[0] === kt.term[0].toUpperCase() && kt.term[0] !== kt.term[0].toLowerCase();
        return kc === origIsCap;
      });
      if (!others.length) continue;
      var altTerm = shuffle(others.slice())[0].term;
      var re = new RegExp('\\b' + cand.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      var wrong = cand.sentence.replace(re, altTerm);
      if (wrong === cand.sentence) continue;
      questions.push({ statement: wrong, answer: false, source: cand.source, originalTerm: cand.term, wrongTerm: altTerm });
    }
  }
  return questions;
}

function showTrueFalse(fid) {
  loadContent(fid).then(function (data) {
    var questions = generateTrueFalseFromCurated(data, 12);
    if (!questions.length) { showStubForMode(fid, 'truefalse'); return; }
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var qi = 0, score = 0, points = 0, firstAttempt = true;

    function renderQ() {
      if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
      if (qi >= questions.length) { showResults(); return; }
      var q = questions[qi];
      firstAttempt = true;

      var h = '<div class="mc-view">';
      h += '<div class="tf-banner">True or False with Why \u2014 ' + (qi + 1) + ' of ' + questions.length + '</div>';
      h += '<div class="mc-ref">' + secLabel + '</div>';
      h += '<div class="tf-statement">' + q.statement + '</div>';
      h += '<button class="cloze-audio" id="b-tf-hear">Listen</button>';
      h += '<div class="tf-opts">';
      h += '<button class="tf-opt tf-true" data-val="true">\u2714 True</button>';
      h += '<button class="tf-opt tf-false" data-val="false">\u2718 False</button>';
      h += '</div>';
      h += '<div class="mc-feedback" id="tf-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-tf-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';

      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-tf-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-tf-hear').addEventListener('click', function () { speakText(q.statement); });

      var btns = document.querySelectorAll('.tf-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var val = this.getAttribute('data-val') === 'true';
          var fb = document.getElementById('tf-fb');
          if (val === q.answer) {
            this.classList.add('mc-correct');
            var whyHtml = '<div class="tf-why"><strong>Why:</strong> ' + q.source + '</div>';
            if (!q.answer) {
              whyHtml += '<div class="tf-why-note">The statement swapped <em>' + q.originalTerm + '</em> with <em>' + q.wrongTerm + '</em>.</div>';
            }
            fb.innerHTML = '<span class="fb-correct">\u2714 Correct!</span>' + whyHtml;
            if (firstAttempt) { score++; points += 1.0; }
            recordQuestionResult(fid, 'truefalse', qi, firstAttempt);
            var all = document.querySelectorAll('.tf-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 3600);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'truefalse', qIndex: qi,
                ref: '', question: 'True or False: ' + q.statement,
                options: ['True', 'False'], correct: q.answer ? 0 : 1,
                answer: q.answer ? 'True' : 'False', source_quote: q.source
              });
            }
            firstAttempt = false;
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Not quite \u2014 try the other one.</span>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / questions.length * 100);
      var xpEarned = recordSession(fid, 'truefalse', points, questions.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Read closer!';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + questions.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-tf-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-tf-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-tf-retry').addEventListener('click', function () { showTrueFalse(fid); });
      document.getElementById('b-tf-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Story Sequence — reorder scrambled curated events ----
function generateSequenceFromCurated(data, count) {
  count = count || 6;
  if (!data) return [];
  // Pool source_quotes from fill_blank AND multiple_choice so sparse
  // sections (short chapters, prophecy-heavy) still yield enough events.
  var items = [];
  if (data.fill_blank) {
    data.fill_blank.forEach(function (q) {
      if (q.source_quote && q.source_quote.length > 20) items.push({ ref: q.ref || '', source_quote: q.source_quote });
    });
  }
  if (data.multiple_choice) {
    data.multiple_choice.forEach(function (q) {
      if (q.source_quote && q.source_quote.length > 20) items.push({ ref: q.ref || '', source_quote: q.source_quote });
    });
  }
  // Dedup on first 60 chars of quote
  var seen = {};
  items = items.filter(function (it) {
    var k = it.source_quote.slice(0, 60);
    if (seen[k]) return false;
    seen[k] = true;
    return true;
  });
  if (items.length < 2) return [];
  items.sort(function (a, b) {
    var ar = parseRef(a.ref), br = parseRef(b.ref);
    if (ar === null || br === null) return 0;
    return ar - br;
  });
  var step = Math.max(1, Math.floor(items.length / count));
  var events = [];
  for (var i = 0; i < items.length && events.length < count; i += step) {
    var text = items[i].source_quote;
    if (text.length > 200) text = text.slice(0, 197) + '...';
    events.push({ order: events.length, text: text, ref: items[i].ref || '' });
  }
  return events;
}

function parseRef(ref) {
  if (!ref) return null;
  // Roman numeral column refs: "XVII:3" -> 17000 + 3
  var rom = ref.match(/^([IVXLCDivxlcd]+):(\d+)/);
  if (rom) {
    var romanMap = { I:1, V:5, X:10, L:50, C:100, D:500 };
    var r = rom[1].toUpperCase(), rv = 0;
    for (var ri = 0; ri < r.length; ri++) {
      var cur = romanMap[r[ri]] || 0, nxt = romanMap[r[ri + 1]] || 0;
      rv += cur < nxt ? -cur : cur;
    }
    return rv * 1000 + parseInt(rom[2]);
  }
  var m = ref.match(/(\d+)(?::(\d+))?/);
  if (!m) return null;
  return parseInt(m[1]) * 1000 + (m[2] ? parseInt(m[2]) : 0);
}

function showStorySequence(fid) {
  loadContent(fid).then(function (data) {
    var events = generateSequenceFromCurated(data, 6);
    if (events.length < 2) { showStubForMode(fid, 'sequence'); return; }
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var shuffled = shuffle(events.slice());
    var picked = [];
    var attempts = 0, finished = false;

    function render() {
      var h = '<div class="cloze-view">';
      h += '<div class="seq-banner">Story Sequence \u2014 tap events in the order they happen</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="seq-slots">';
      for (var i = 0; i < events.length; i++) {
        var slotNum = i + 1;
        if (i < picked.length) {
          var ev = events.find(function (e) { return e.order === picked[i]; });
          h += '<div class="seq-slot seq-slot-filled" data-slot="' + i + '"><span class="seq-num">' + slotNum + '</span><span class="seq-text">' + ev.text + '</span><button class="seq-remove" data-slot="' + i + '" aria-label="Remove">\u2715</button></div>';
        } else {
          h += '<div class="seq-slot seq-slot-empty"><span class="seq-num">' + slotNum + '</span><span class="seq-placeholder">Tap an event below</span></div>';
        }
      }
      h += '</div>';
      h += '<div class="seq-pool-label">Available events:</div>';
      h += '<div class="seq-pool">';
      for (var p = 0; p < shuffled.length; p++) {
        if (picked.indexOf(shuffled[p].order) !== -1) continue;
        h += '<button class="seq-pool-item" data-order="' + shuffled[p].order + '">' + shuffled[p].text + '</button>';
      }
      h += '</div>';
      h += '<div class="seq-actions">';
      if (picked.length === events.length && !finished) {
        h += '<button class="study-btn sb-pri" id="b-seq-check">\u2714 Check order</button>';
      }
      h += '<button class="study-btn" id="b-seq-quit">Back to activities</button>';
      h += '</div>';
      h += '<div class="mc-feedback" id="seq-fb" role="status" aria-live="polite"></div>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      document.getElementById('b-seq-quit').addEventListener('click', function () { go(fid); });
      var poolBtns = document.querySelectorAll('.seq-pool-item');
      for (var pb = 0; pb < poolBtns.length; pb++) {
        poolBtns[pb].addEventListener('click', function () {
          picked.push(parseInt(this.getAttribute('data-order')));
          render();
        });
      }
      var removeBtns = document.querySelectorAll('.seq-remove');
      for (var rb = 0; rb < removeBtns.length; rb++) {
        removeBtns[rb].addEventListener('click', function (e) {
          e.stopPropagation();
          picked.splice(parseInt(this.getAttribute('data-slot')), 1);
          render();
        });
      }
      var checkBtn = document.getElementById('b-seq-check');
      if (checkBtn) {
        checkBtn.addEventListener('click', function () {
          attempts++;
          var correct = 0;
          for (var i = 0; i < picked.length; i++) if (picked[i] === i) correct++;
          var fb = document.getElementById('seq-fb');
          if (correct === events.length) {
            finished = true;
            var pts = attempts === 1 ? 1.0 : attempts === 2 ? 0.7 : 0.4;
            var xpEarned = recordSession(fid, 'sequence', pts, 1);
            fb.innerHTML = '<div class="fb-correct">Perfect order! (+' + Math.round(pts * 10) + ' XP)</div>';
            setTimeout(function () { go(fid); }, 2800);
          } else {
            if (attempts === 1) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'sequence', qIndex: 0, ref: '',
                question: 'Put these ' + events.length + ' events in order',
                options: events.map(function (e) { return e.text; }), correct: 0,
                answer: events[0].text, source_quote: ''
              });
            }
            fb.innerHTML = '<div class="fb-try">' + correct + ' of ' + events.length + ' in the right spot. Move the wrong ones and check again.</div>';
          }
        });
      }
    }
    render();
  });
}

// ---- Cause and Effect Match ----
function extractCauseEffectFromCurated(data) {
  if (!data) return [];
  // Pool summary + faq + source_quotes. Sections whose verses are
  // simple declaratives (laws, genealogies, prophecy) still have
  // cause-effect prose in summaries and FAQ answers.
  var sources = [];
  if (data.summary_plain) sources.push(data.summary_plain);
  if (data.summary_scholarly) sources.push(data.summary_scholarly);
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.faq) data.faq.forEach(function (q) { if (q.answer && q.answer.length > 40) sources.push(q.answer); });
  if (!sources.length) return [];

  // Expanded connective patterns
  var p1 = /([A-Z][^.!?]{15,140})\s+because\s+([^.!?]{10,140})[.!?]/g;
  var p2 = /([A-Z][^.!?]{15,140}),?\s+(?:so|therefore|thus|hence|consequently|thereby)\s+([^.!?]{10,140})[.!?]/g;
  var p3 = /([A-Z][^.!?]{15,140})\s+(?:led to|caused|brought about|resulted in|produces?|produced|gives rise to|gave rise to)\s+([^.!?]{10,140})[.!?]/g;
  var p4 = /Because\s+([^,]{10,140}),\s+([^.!?]{10,140})[.!?]/g;
  // New: "When X, Y" / "Since X, Y" / "If X, then Y" — conditional causation
  var p5 = /(?:When|Since)\s+([^,]{10,140}),\s+([^.!?]{10,140})[.!?]/g;
  var p6 = /If\s+([^,]{10,140}),?\s+(?:then\s+)?([^.!?]{10,140})[.!?]/g;
  // New: "X, which [led|resulted|caused|meant|made] Y"
  var p7 = /([A-Z][^.!?,]{15,140}),\s+which\s+(?:led to|caused|resulted in|meant|made|brought about)\s+([^.!?]{10,140})[.!?]/g;
  // New: "As a result of X, Y" / "Due to X, Y"
  var p8 = /(?:As a result of|Due to|Owing to|Thanks to|Because of)\s+([^,]{10,140}),\s+([^.!?]{10,140})[.!?]/g;

  var pairs = [];
  var seen = {};
  function trim(s) { return s.replace(/\s+/g, ' ').trim(); }
  function add(cause, effect, source) {
    cause = trim(cause);
    effect = trim(effect);
    if (cause.length < 10 || effect.length < 10) return;
    if (cause.length > 120) cause = cause.slice(0, 117) + '...';
    if (effect.length > 120) effect = effect.slice(0, 117) + '...';
    var key = (cause + '|' + effect).toLowerCase().slice(0, 80);
    if (seen[key]) return;
    seen[key] = true;
    pairs.push({ cause: cause, effect: effect, source: source });
  }
  for (var s = 0; s < sources.length; s++) {
    var text = sources[s];
    var m;
    p1.lastIndex = 0; while ((m = p1.exec(text)) !== null) add(m[2], m[1], text);
    p2.lastIndex = 0; while ((m = p2.exec(text)) !== null) add(m[1], m[2], text);
    p3.lastIndex = 0; while ((m = p3.exec(text)) !== null) add(m[1], m[2], text);
    p4.lastIndex = 0; while ((m = p4.exec(text)) !== null) add(m[1], m[2], text);
    p5.lastIndex = 0; while ((m = p5.exec(text)) !== null) add(m[1], m[2], text);
    p6.lastIndex = 0; while ((m = p6.exec(text)) !== null) add(m[1], m[2], text);
    p7.lastIndex = 0; while ((m = p7.exec(text)) !== null) add(m[1], m[2], text);
    p8.lastIndex = 0; while ((m = p8.exec(text)) !== null) add(m[1], m[2], text);
  }
  return pairs;
}

function showCauseEffect(fid) {
  loadContent(fid).then(function (data) {
    var pairs = extractCauseEffectFromCurated(data);
    if (!pairs.length) { showStubForMode(fid, 'causeeffect'); return; }
    pairs = shuffle(pairs.slice()).slice(0, 5);
    var effectOrder = shuffle(pairs.map(function (_, i) { return i; }));
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var selectedCause = null;
    var matched = 0;
    var attempts = 0;

    function render() {
      var h = '<div class="cloze-view">';
      h += '<div class="ce-banner">Cause and Effect \u2014 tap a cause, then tap its effect</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="ce-grid">';
      h += '<div class="ce-col"><div class="ce-col-label">Causes</div>';
      for (var i = 0; i < pairs.length; i++) {
        var matchedClass = pairs[i].solved ? ' ce-solved' : '';
        var selectedClass = (selectedCause === i && !pairs[i].solved) ? ' ce-selected' : '';
        h += '<button class="ce-item ce-cause' + matchedClass + selectedClass + '" data-cause="' + i + '"' + (pairs[i].solved ? ' disabled' : '') + '>' + pairs[i].cause + '</button>';
      }
      h += '</div>';
      h += '<div class="ce-col"><div class="ce-col-label">Effects</div>';
      for (var j = 0; j < effectOrder.length; j++) {
        var pairIdx = effectOrder[j];
        var solvedClass = pairs[pairIdx].solved ? ' ce-solved' : '';
        h += '<button class="ce-item ce-effect' + solvedClass + '" data-effect="' + pairIdx + '"' + (pairs[pairIdx].solved ? ' disabled' : '') + '>' + pairs[pairIdx].effect + '</button>';
      }
      h += '</div></div>';
      h += '<div class="mc-feedback" id="ce-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-ce-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      document.getElementById('b-ce-quit').addEventListener('click', function () { go(fid); });
      var causeBtns = document.querySelectorAll('.ce-cause');
      for (var cb = 0; cb < causeBtns.length; cb++) {
        causeBtns[cb].addEventListener('click', function () {
          selectedCause = parseInt(this.getAttribute('data-cause'));
          render();
        });
      }
      var effectBtns = document.querySelectorAll('.ce-effect');
      for (var eb = 0; eb < effectBtns.length; eb++) {
        effectBtns[eb].addEventListener('click', function () {
          if (selectedCause === null) {
            document.getElementById('ce-fb').innerHTML = '<div class="fb-try">Tap a cause first.</div>';
            return;
          }
          attempts++;
          var pairIdx = parseInt(this.getAttribute('data-effect'));
          var fb = document.getElementById('ce-fb');
          if (pairIdx === selectedCause) {
            pairs[selectedCause].solved = true;
            matched++;
            selectedCause = null;
            fb.innerHTML = '<div class="fb-correct">\u2714 Matched!</div>';
            if (matched === pairs.length) setTimeout(showResults, 1200);
            else render();
          } else {
            if (attempts <= 1) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'causeeffect', qIndex: selectedCause,
                ref: '', question: 'Match cause to effect: ' + pairs[selectedCause].cause,
                options: pairs.map(function (p) { return p.effect; }),
                correct: selectedCause,
                answer: pairs[selectedCause].effect,
                source_quote: pairs[selectedCause].source
              });
            }
            selectedCause = null;
            fb.innerHTML = '<div class="fb-try">Not that one. Try again.</div>';
            render();
          }
        });
      }
    }

    function showResults() {
      var points = attempts <= pairs.length ? pairs.length : Math.max(1, pairs.length * 2 - attempts);
      var xpEarned = recordSession(fid, 'causeeffect', points, pairs.length);
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji"></div>';
      h += '<div class="cr-score">' + matched + ' / ' + pairs.length + ' matched</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + (attempts <= pairs.length ? 'Clean sweep!' : 'All matched \u2014 took ' + attempts + ' tries.') + '</div>';
      h += '<button class="study-btn sb-pri" id="b-ce-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-ce-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-ce-retry').addEventListener('click', function () { showCauseEffect(fid); });
      document.getElementById('b-ce-back').addEventListener('click', function () { go(fid); });
    }

    render();
  });
}

// ---- Dictation Challenge ----
function pickDictationFromCurated(data, count) {
  count = count || 8;
  if (!data) return [];
  var pool = [];
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) pool.push(q.source_quote); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote && pool.indexOf(q.source_quote) === -1) pool.push(q.source_quote); });
  var out = [];
  for (var i = 0; i < pool.length; i++) {
    var sents = pool[i].match(/[^.!?]+[.!?]+/g) || [pool[i]];
    for (var s = 0; s < sents.length; s++) {
      var t = sents[s].trim();
      if (t.length < 30 || t.length > 160) continue;
      if ((t.match(/["\u201C\u201D]/g) || []).length > 2) continue;
      if (out.indexOf(t) === -1) out.push(t);
    }
  }
  return shuffle(out.slice()).slice(0, count);
}

function dictationNormalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function dictationScore(typed, target) {
  var a = dictationNormalize(typed);
  var b = dictationNormalize(target);
  if (!a || !b) return 0;
  if (a === b) return 1.0;
  var wa = a.split(' ');
  var wb = b.split(' ');
  var setB = {};
  for (var i = 0; i < wb.length; i++) setB[wb[i]] = (setB[wb[i]] || 0) + 1;
  var matched = 0;
  for (var k = 0; k < wa.length; k++) {
    if (setB[wa[k]] > 0) { matched++; setB[wa[k]]--; }
  }
  var maxLen = Math.max(wa.length, wb.length);
  return maxLen === 0 ? 0 : matched / maxLen;
}
function dictationCompareHtml(typed, target) {
  var wa = dictationNormalize(typed).split(' ').filter(Boolean);
  var wbOriginal = target.split(/\s+/);
  var wbNorm = wbOriginal.map(dictationNormalize);
  var typedSet = {};
  for (var i = 0; i < wa.length; i++) typedSet[wa[i]] = (typedSet[wa[i]] || 0) + 1;
  var parts = [];
  for (var j = 0; j < wbOriginal.length; j++) {
    var nw = wbNorm[j];
    if (nw && typedSet[nw] > 0) {
      parts.push('<span class="dict-hit">' + wbOriginal[j] + '</span>');
      typedSet[nw]--;
    } else {
      parts.push('<span class="dict-miss">' + wbOriginal[j] + '</span>');
    }
  }
  return parts.join(' ');
}

function showDictation(fid) {
  loadContent(fid).then(function (data) {
    var sentences = pickDictationFromCurated(data, 8);
    if (sentences.length < 3) {
      // Fallback: extract dictation sentences from HTML verses
      var verses = getVerses(fid);
      verses.forEach(function (v) {
        var sents = v.match(/[^.!?]+[.!?]+/g) || [v];
        sents.forEach(function (s) {
          var t = s.trim();
          if (t.length >= 30 && t.length <= 160 &&
              (t.match(/["“”]/g) || []).length <= 2 &&
              sentences.indexOf(t) < 0) sentences.push(t);
        });
      });
    }
    if (!sentences.length) { showStubForMode(fid, 'dictation'); return; }
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var qi = 0, totalPoints = 0, plays = 0;

    function renderQ() {
      if (qi >= sentences.length) { showResults(); return; }
      var target = sentences[qi];
      plays = 0;

      var h = '<div class="cloze-view">';
      h += '<div class="dict-banner">Dictation \u2014 listen, then type what you heard</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="dict-progress">' + (qi + 1) + ' of ' + sentences.length + '</div>';
      h += '<button class="cloze-audio dict-play" id="b-dict-play">Play sentence</button>';
      h += '<textarea class="dict-input" id="dict-input" placeholder="Type what you heard..." aria-label="Dictation answer" autocomplete="off" autocapitalize="sentences"></textarea>';
      h += '<div class="dict-actions">';
      h += '<button class="study-btn sb-pri" id="b-dict-check">\u2714 Check</button>';
      h += '<button class="study-btn" id="b-dict-skip">Skip \u27A1</button>';
      h += '</div>';
      h += '<div class="dict-feedback" id="dict-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-dict-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      setTimeout(function () { speakText(target); plays++; }, 350);

      document.getElementById('b-dict-play').addEventListener('click', function () { speakText(target); plays++; });
      document.getElementById('b-dict-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-dict-skip').addEventListener('click', function () { qi++; renderQ(); });
      document.getElementById('b-dict-check').addEventListener('click', function () {
        var typed = document.getElementById('dict-input').value;
        var score = dictationScore(typed, target);
        var penalty = Math.max(0, plays - 1) * 0.05;
        var points = Math.max(0, score - penalty);
        totalPoints += points;
        var fb = document.getElementById('dict-fb');
        var emoji = score >= 0.95 ? 'Outstanding' : score >= 0.75 ? '\u2714' : score >= 0.4 ? '' : '';
        var label = score >= 0.95 ? 'Perfect!' : score >= 0.75 ? 'Very close' : score >= 0.4 ? 'Partial' : 'Keep listening';
        fb.innerHTML =
          '<div class="dict-score">' + emoji + ' ' + label + ' \u2014 ' + Math.round(score * 100) + '%</div>' +
          '<div class="dict-compare">' + dictationCompareHtml(typed, target) + '</div>' +
          '<button class="study-btn sb-pri" id="b-dict-next" style="margin-top:12px">Next \u27A1</button>';
        if (score < 0.7) {
          pushToRemixQueue({
            fid: fid, missedInMode: 'dictation', qIndex: qi,
            ref: '', question: 'Dictate: "' + target + '"',
            options: [], correct: 0, answer: target, source_quote: target
          });
        }
        document.getElementById('b-dict-check').disabled = true;
        document.getElementById('b-dict-skip').disabled = true;
        document.getElementById('b-dict-next').addEventListener('click', function () { qi++; renderQ(); });
      });
    }

    function showResults() {
      var pct = Math.round((totalPoints / sentences.length) * 100);
      var xpEarned = recordSession(fid, 'dictation', totalPoints, sentences.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Try more listens next time.';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + pct + '% accuracy</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-dict-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-dict-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-dict-retry').addEventListener('click', function () { showDictation(fid); });
      document.getElementById('b-dict-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Word Morph — which spelling is real? ----
function wordMorphVariants(word) {
  var w = String(word || '');
  if (w.length < 3) return [];
  var lower = w.toLowerCase();
  var isCap = w[0] !== w[0].toLowerCase();
  function cap(s) { return isCap ? s[0].toUpperCase() + s.slice(1) : s; }
  var seen = {};
  seen[lower] = true;
  var out = [];
  function tryAdd(v) {
    if (!v || v.length < 2) return;
    var vl = v.toLowerCase();
    if (seen[vl]) return;
    seen[vl] = true;
    out.push(cap(vl));
  }
  // 1. Vowel substitution — most common real misspelling
  var vmap = {a:['e','i'],e:['i','a'],i:['e','y'],o:['u','a'],u:['o','e']};
  for (var i = 0; i < lower.length && out.length < 1; i++) {
    if (vmap[lower[i]]) tryAdd(lower.slice(0, i) + vmap[lower[i]][0] + lower.slice(i + 1));
  }
  // 2. Double / unDouble a consonant ("Shabbat" vs "Shabat")
  for (var i = 1; i < lower.length - 1 && out.length < 2; i++) {
    var c = lower[i];
    if (/[bcdfghjklmnprst]/.test(c)) {
      if (lower[i + 1] === c) tryAdd(lower.slice(0, i) + lower.slice(i + 1));
      else tryAdd(lower.slice(0, i) + c + c + lower.slice(i + 1));
    }
  }
  // 3. Letter transposition — common keyboard typo (skip if result starts with consonant cluster)
  for (var i = 1; i < lower.length - 1 && out.length < 3; i++) {
    if (lower[i] !== lower[i + 1]) {
      var transposed = lower.slice(0, i) + lower[i + 1] + lower[i] + lower.slice(i + 2);
      if (!/^[^aeiou]{2}/i.test(transposed)) tryAdd(transposed);
      break;
    }
  }
  // 4. Suffix substitution — plausible alternate endings
  var sfx = [
    [/tion$/, 'sion'], [/sion$/, 'tion'],
    [/ent$/, 'ant'],   [/ant$/, 'ent'],
    [/er$/, 'ar'],     [/ar$/, 'er'],
    [/akh$/, 'ach'],   [/ach$/, 'akh'],
    [/ath$/, 'at'],    [/at$/, 'ath'],
    [/ite$/, 'ight'],  [/ight$/, 'ite'],
    [/im$/, 'em'],     [/em$/, 'im'],
    [/it$/, 'et'],     [/et$/, 'it'],
    [/al$/, 'el'],     [/el$/, 'al'],
    [/ment$/, 'mant'], [/ness$/, 'niss'],
  ];
  for (var s = 0; s < sfx.length && out.length < 3; s++) {
    if (sfx[s][0].test(lower)) tryAdd(lower.replace(sfx[s][0], sfx[s][1]));
  }
  // 5. Drop a medial vowel between two consonants ("covenant" vs "covnant")
  for (var i = 1; i < lower.length - 2 && out.length < 3; i++) {
    if (/[aeiou]/.test(lower[i]) && /[^aeiou]/.test(lower[i - 1]) && /[^aeiou]/.test(lower[i + 1])) {
      tryAdd(lower.slice(0, i) + lower.slice(i + 1));
      break;
    }
  }
  return out.slice(0, 3);
}

function showWordMorph(fid) {
  loadContent(fid).then(function (data) {
    if (!data || !data.key_terms) { showStubForMode(fid, 'morph'); return; }
    var usable = data.key_terms.filter(function (t) { return t.term && t.term.length >= 5; });
    if (usable.length < 2) { showStubForMode(fid, 'morph'); return; }
    var rounds = shuffle(usable.slice()).slice(0, 8);
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var qi = 0, score = 0, points = 0;

    function renderQ() {
      if (qi >= rounds.length) { showResults(); return; }
      var kt = rounds[qi];
      var variants = wordMorphVariants(kt.term);
      if (variants.length < 2) { qi++; renderQ(); return; }
      var opts = shuffle([kt.term].concat(variants.slice(0, 3)));
      var correctIdx = opts.indexOf(kt.term);
      var context = findTermContextInCuratedData(kt.term, data);
      var morphColors = ['#4338ca', '#0891b2', '#be185d', '#ea580c'];

      var h = '<div class="mc-view">';
      h += '<div class="morph-banner">Word Morph \u2014 which spelling is real?</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="dict-progress">' + (qi + 1) + ' of ' + rounds.length + '</div>';
      h += '<div class="morph-grid">';
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="morph-opt" data-idx="' + o + '" style="background:' + morphColors[o % 4] + '">' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="morph-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-morph-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-morph-quit').addEventListener('click', function () { go(fid); });
      var firstAttempt = true;
      var btns = document.querySelectorAll('.morph-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var i2 = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('morph-fb');
          if (i2 === correctIdx) {
            this.classList.add('mc-correct');
            var ctx = context ? '<div class="morph-context">"' + context + '"</div>' : '';
            fb.innerHTML = '<div class="fb-correct">\u2714 ' + kt.term + ' is the correct spelling.</div>' + ctx;
            if (firstAttempt) { score++; points += 1.0; }
            var all = document.querySelectorAll('.morph-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2400);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'morph', qIndex: qi, ref: '',
                question: 'Which is the real spelling?',
                options: opts.slice(), correct: correctIdx,
                answer: kt.term, source_quote: context || ''
              });
              firstAttempt = false;
            }
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<div class="fb-try">Not quite \u2014 look again at the letters.</div>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / rounds.length * 100);
      var xpEarned = recordSession(fid, 'morph', points, rounds.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Notice the letter shapes.';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + rounds.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-morph-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-morph-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-morph-retry').addEventListener('click', function () { showWordMorph(fid); });
      document.getElementById('b-morph-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Syllable Tap — how many syllables? ----
var SYLLABLE_DICT = {
  // Book / volume names
  bereshit:3,shemot:2,vayikra:3,bamidbar:3,devarim:3,
  chanokh:2,yovelim:3,
  // Patriarch and matriarch names
  avraham:3,avram:2,sarah:2,yitzhak:3,rivkah:2,
  yaakov:2,esav:2,yosef:2,moshe:2,aharon:3,miryam:3,
  noakh:1,metushelakh:4,yehoshua:4,lamekh:2,chanokh:2,
  shem:1,yafet:2,
  // Place names
  mitsrayim:4,yerushalayim:6,yarden:2,sinai:3,
  horev:2,bavel:2,kena:2,seir:2,
  // Scriptural concepts
  covenant:3,sanctuary:4,tabernacle:4,
  commandment:3,commandments:4,
  offering:3,offerings:4,
  righteous:2,righteousness:3,
  faithful:3,faithfulness:4,
  everlasting:4,inheritance:4,
  judgment:2,judgments:3,
  prophet:2,prophets:3,
  spirit:2,heaven:2,prayer:2,
  glory:2,people:2,nation:2,nations:3,
  servant:2,servants:3,
  // Words the vowel-group heuristic often miscounts
  being:2,given:2,taken:2,every:3,really:3,
  created:3,spoken:2,chosen:2,written:3,
};
function countSyllables(word) {
  var w = String(word || '');
  var lw = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!lw) return 0;
  if (SYLLABLE_DICT[lw] !== undefined) return SYLLABLE_DICT[lw];
  var prepped = lw.replace(/([aeiou])y([aeiou])/g, '$1 y$2');
  var groups = prepped.match(/[aeiouy]+/g) || [];
  var count = groups.length;
  var isLeEnding = /[^aeiouy]le$/.test(lw);
  if (lw.length > 3 && lw[lw.length - 1] === 'e' && !isLeEnding && count > 1) count--;
  return Math.max(1, count);
}

function splitSyllables(word) {
  var orig = String(word || '');
  var w = orig.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length < 3) return [orig];
  var groups = [];
  var re = /[aeiouy]+/g;
  var m;
  while ((m = re.exec(w)) !== null) groups.push({ start: m.index, end: m.index + m[0].length });
  if (groups.length <= 1) return [orig];
  var mapBack = [];
  for (var i = 0; i < orig.length; i++) if (/[a-zA-Z]/.test(orig[i])) mapBack.push(i);
  var splitPoints = [];
  for (var g = 0; g < groups.length - 1; g++) {
    var clusterStart = groups[g].end;
    var clusterEnd = groups[g + 1].start;
    var clusterLen = clusterEnd - clusterStart;
    var splitAt;
    if (clusterLen >= 2) splitAt = clusterStart + 1;
    else if (clusterLen === 1) splitAt = clusterStart;
    else splitAt = clusterEnd;
    splitPoints.push(mapBack[splitAt] !== undefined ? mapBack[splitAt] : orig.length);
  }
  var out = [];
  var cursor = 0;
  for (var sp = 0; sp < splitPoints.length; sp++) {
    out.push(orig.slice(cursor, splitPoints[sp]));
    cursor = splitPoints[sp];
  }
  out.push(orig.slice(cursor));
  return out.filter(function (s) { return s.length > 0; });
}

function showSyllableTap(fid) {
  loadContent(fid).then(function (data) {
    if (!data || !data.key_terms) { showStubForMode(fid, 'syllable'); return; }
    var usable = data.key_terms.filter(function (t) { return t.term && t.term.length >= 5 && countSyllables(t.term) >= 2; });
    if (usable.length < 2) { showStubForMode(fid, 'syllable'); return; }
    var rounds = shuffle(usable.slice()).slice(0, 8);
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var qi = 0, score = 0, points = 0;

    function renderQ() {
      if (qi >= rounds.length) { showResults(); return; }
      var kt = rounds[qi];
      var correctCount = countSyllables(kt.term);
      var near = [correctCount - 1, correctCount + 1].filter(function (n) { return n >= 1 && n <= 8; });
      var far = [correctCount <= 3 ? 6 : 1, correctCount <= 4 ? 7 : 2].filter(function (n) { return n >= 1 && n <= 8 && n !== correctCount; });
      var candidates = [correctCount].concat(near).concat(far).filter(function (n, i, a) { return a.indexOf(n) === i; });
      var opts = shuffle(candidates.slice()).slice(0, 4);
      if (opts.indexOf(correctCount) === -1) opts[0] = correctCount;
      opts = shuffle(opts);
      var correctIdx = opts.indexOf(correctCount);
      var firstAttempt = true;

      var h = '<div class="mc-view">';
      h += '<div class="syll-banner">Syllable Tap \u2014 how many syllables?</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="dict-progress">' + (qi + 1) + ' of ' + rounds.length + '</div>';
      h += '<div class="syll-word">' + kt.term + '</div>';
      h += '<button class="cloze-audio" id="b-syll-hear">Listen</button>';
      h += '<div class="syll-opts">';
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="syll-opt" data-idx="' + o + '">' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="syll-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-syll-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      document.getElementById('b-syll-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-syll-hear').addEventListener('click', function () { speakText(kt.term); });

      var btns = document.querySelectorAll('.syll-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var i2 = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('syll-fb');
          if (i2 === correctIdx) {
            this.classList.add('mc-correct');
            var parts = splitSyllables(kt.term);
            var colors = ['#2563eb', '#059669', '#7c3aed', '#d97706', '#dc2626'];
            var coloredHtml = parts.map(function (p, k) {
              return '<span style="color:' + colors[k % colors.length] + ';font-weight:800">' + p + '</span>';
            }).join('<span class="syll-sep">\u00B7</span>');
            fb.innerHTML = '<div class="fb-correct">\u2714 ' + correctCount + ' syllable' + (correctCount === 1 ? '' : 's') + '</div>' +
              '<div class="syll-reveal">' + coloredHtml + '</div>';
            if (firstAttempt) { score++; points += 1.0; }
            var all = document.querySelectorAll('.syll-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2400);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'syllable', qIndex: qi, ref: '',
                question: 'How many syllables in "' + kt.term + '"?',
                options: opts.map(String), correct: correctIdx,
                answer: String(correctCount), source_quote: ''
              });
              firstAttempt = false;
            }
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<div class="fb-try">Not quite \u2014 say the word aloud and count each beat.</div>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / rounds.length * 100);
      var xpEarned = recordSession(fid, 'syllable', points, rounds.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Say them aloud.';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + rounds.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-syll-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-syll-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-syll-retry').addEventListener('click', function () { showSyllableTap(fid); });
      document.getElementById('b-syll-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Rhyme Chain — which word rhymes? ----
function rhymeKeyStudy(word) {
  var w = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
  if (w.length < 3) return '';
  if (w[w.length - 1] === 'e' && w.length > 3 && !/[^aeiouy]le$/.test(w)) w = w.slice(0, -1);
  var lastVowelIdx = -1;
  for (var i = w.length - 1; i >= 0; i--) {
    if (/[aeiouy]/.test(w[i])) { lastVowelIdx = i; break; }
  }
  if (lastVowelIdx < 0) return w;
  while (lastVowelIdx > 0 && /[aeiouy]/.test(w[lastVowelIdx - 1])) lastVowelIdx--;
  return w.slice(lastVowelIdx);
}

function buildRhymeGroupsFromCurated(data) {
  if (!data) return {};
  var sources = [];
  if (data.summary_plain) sources.push(data.summary_plain);
  if (data.summary_scholarly) sources.push(data.summary_scholarly);
  if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); if (q.answer) sources.push(q.answer); });
  if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) sources.push(q.source_quote); });
  if (data.faq) data.faq.forEach(function (q) { if (q.answer) sources.push(q.answer); });
  if (data.key_terms) data.key_terms.forEach(function (kt) { if (kt.term) sources.push(kt.term); if (kt.definition) sources.push(kt.definition); });

  var groups = {};
  var seen = {};
  // Basic stop-word skim so "because" / "through" don't pollute groups
  var stops = {the:1,and:1,for:1,but:1,with:1,from:1,that:1,this:1,have:1,been:1,were:1,will:1,would:1,could:1,should:1,when:1,where:1,which:1,their:1,there:1,they:1,then:1,than:1,into:1,your:1,what:1,been:1,some:1,does:1,unto:1,upon:1};
  for (var s = 0; s < sources.length; s++) {
    var words = sources[s].split(/[\s,;:!?.()"\u201C\u201D\[\]{}]+/);
    for (var w = 0; w < words.length; w++) {
      var word = words[w].replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
      if (word.length < 4) continue;
      var lower = word.toLowerCase();
      if (seen[lower] || stops[lower]) continue;
      seen[lower] = true;
      var key = rhymeKeyStudy(word);
      if (!key || key.length < 2) continue;
      if (!groups[key]) groups[key] = [];
      groups[key].push(word);
    }
  }
  return groups;
}

function showRhymeChain(fid) {
  loadContent(fid).then(function (data) {
    var groups = buildRhymeGroupsFromCurated(data);
    var usable = [];
    var allWords = [];
    var keys = Object.keys(groups);
    for (var k = 0; k < keys.length; k++) {
      if (groups[keys[k]].length >= 2) usable.push(keys[k]);
      for (var wi = 0; wi < groups[keys[k]].length; wi++) allWords.push({ word: groups[keys[k]][wi], key: keys[k] });
    }
    if (usable.length < 2) { showStubForMode(fid, 'rhyme'); return; }
    usable = shuffle(usable.slice()).slice(0, 8);
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;
    var qi = 0, score = 0, points = 0;

    function renderQ() {
      if (qi >= usable.length) { showResults(); return; }
      var key = usable[qi];
      var members = groups[key].slice();
      var seed = shuffle(members)[0];
      var rhymer = shuffle(members.filter(function (x) { return x !== seed; }))[0];
      if (!rhymer) { qi++; renderQ(); return; }
      var nonRhymers = allWords.filter(function (x) { return x.key !== key; });
      var distractors = shuffle(nonRhymers).slice(0, 3).map(function (x) { return x.word; });
      var rhymeFallback = ['stood', 'came', 'gave', 'made', 'hand', 'keep', 'full', 'dark', 'find', 'long', 'strong', 'hard'];
      var rfi = 0;
      while (distractors.length < 3 && rfi < rhymeFallback.length) {
        var rfw = rhymeFallback[rfi++];
        if (rhymeKeyStudy(rfw) !== key && distractors.indexOf(rfw) < 0) distractors.push(rfw);
      }
      while (distractors.length < 3) distractors.push('\u2014');
      var opts = shuffle([rhymer].concat(distractors));
      var correctIdx = opts.indexOf(rhymer);
      var firstAttempt = true;
      var rhymeColors = ['#0891b2', '#059669', '#7c3aed', '#d97706'];

      var h = '<div class="mc-view">';
      h += '<div class="rhyme-banner">Rhyme Chain \u2014 which word rhymes?</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="dict-progress">' + (qi + 1) + ' of ' + usable.length + '</div>';
      h += '<div class="rhyme-seed">' + seed + '</div>';
      h += '<button class="cloze-audio" id="b-rhy-hear">Listen</button>';
      h += '<div class="mc-opts">';
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="mc-opt rhyme-opt" data-idx="' + o + '" style="background:' + rhymeColors[o % 4] + '">' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="rhy-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-rhy-quit" style="margin-top:18px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);

      document.getElementById('b-rhy-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-rhy-hear').addEventListener('click', function () { speakText(seed); });
      var btns = document.querySelectorAll('.rhyme-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var i2 = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('rhy-fb');
          if (i2 === correctIdx) {
            this.classList.add('mc-correct');
            fb.innerHTML = '<div class="fb-correct">\u2714 ' + seed + ' and ' + rhymer + ' rhyme. (\u2026' + key + ')</div>';
            if (firstAttempt) { score++; points += 1.0; }
            var all = document.querySelectorAll('.rhyme-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderQ(); }, 2200);
          } else {
            if (firstAttempt) {
              pushToRemixQueue({
                fid: fid, missedInMode: 'rhyme', qIndex: qi, ref: '',
                question: 'Which word rhymes with "' + seed + '"?',
                options: opts.slice(), correct: correctIdx,
                answer: rhymer, source_quote: ''
              });
              firstAttempt = false;
            }
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<div class="fb-try">Not that one \u2014 try another.</div>';
          }
        });
      }
    }

    function showResults() {
      var pct = Math.round(score / usable.length * 100);
      var xpEarned = recordSession(fid, 'rhyme', points, usable.length);
      var emoji = pct >= 80 ? 'Outstanding' : pct >= 60 ? 'Well done' : 'Keep going';
      var msg = pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good work!' : 'Say them aloud.';
      var h = '<div class="cloze-results">';
      h += '<div class="cr-emoji">' + emoji + '</div>';
      h += '<div class="cr-score">' + score + ' / ' + usable.length + '</div>';
      h += '<div class="cr-pct">' + pct + '%</div>';
      h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
      h += '<div class="cr-msg">' + msg + '</div>';
      h += '<button class="study-btn sb-pri" id="b-rhy-retry">Try Again</button>';
      h += '<button class="study-btn" id="b-rhy-back">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-rhy-retry').addEventListener('click', function () { showRhymeChain(fid); });
      document.getElementById('b-rhy-back').addEventListener('click', function () { go(fid); });
    }

    renderQ();
  });
}

// ---- Mind Map Builder — force-directed graph of key-term co-occurrence ----
function showMindMap(fid) {
  loadContent(fid).then(function (data) {
    if (!data || !data.key_terms || data.key_terms.length < 2) { showStubForMode(fid, 'mindmap'); return; }
    // Cap at 10 nodes — 14 was overcrowding the mobile SVG
    var keyTerms = data.key_terms.slice(0, 10);
    // Co-occurrence pool: all source_quote strings plus faq answers
    var pool = [];
    if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) pool.push(q.source_quote); });
    if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) pool.push(q.source_quote); });
    if (data.faq) data.faq.forEach(function (q) { if (q.answer) pool.push(q.answer); });

    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' \u2014 ')[0] : fid;

    var nodes = keyTerms.map(function (t, i) { return { id: i, label: t.term, freq: 0, selected: false }; });
    var edges = [];
    var edgeMap = {};
    function addEdge(a, b, weight) {
      var key = Math.min(a, b) + ',' + Math.max(a, b);
      if (!edgeMap[key]) { edgeMap[key] = { source: Math.min(a, b), target: Math.max(a, b), weight: 0 }; edges.push(edgeMap[key]); }
      edgeMap[key].weight += weight;
    }
    // Tier 1: same source_quote / faq answer
    for (var p = 0; p < pool.length; p++) {
      var lower = pool[p].toLowerCase();
      var present = [];
      for (var n = 0; n < nodes.length; n++) {
        var re = new RegExp('\\b' + nodes[n].label.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
        if (re.test(lower)) { present.push(n); nodes[n].freq++; }
      }
      for (var a = 0; a < present.length; a++) {
        for (var b = a + 1; b < present.length; b++) addEdge(present[a], present[b], 2);
      }
    }
    // Tier 2: whole curated-content enrichment. Runs ALWAYS (not just
    // as a rescue) so every key term that appears anywhere in the
    // section gets at least thin edges to the others — no term ends
    // up isolated while the strong co-occurrence edges still
    // dominate visually (weight 2 vs weight 1 drives opacity + width
    // in the SVG render).
    var allText = pool.join(' ').toLowerCase();
    if (data.summary_plain) allText += ' ' + data.summary_plain.toLowerCase();
    if (data.summary_scholarly) allText += ' ' + data.summary_scholarly.toLowerCase();
    var presentAll = [];
    for (var na = 0; na < nodes.length; na++) {
      var rea = new RegExp('\\b' + nodes[na].label.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (rea.test(allText)) presentAll.push(na);
    }
    for (var aa = 0; aa < presentAll.length; aa++) {
      for (var ba = aa + 1; ba < presentAll.length; ba++) addEdge(presentAll[aa], presentAll[ba], 1);
    }
    var connected = {};
    edges.forEach(function (e) { connected[e.source] = true; connected[e.target] = true; });
    nodes = nodes.filter(function (n) { return connected[n.id]; });
    if (nodes.length < 2) { showStubForMode(fid, 'mindmap'); return; }
    var idRemap = {};
    nodes.forEach(function (n, i) { idRemap[n.id] = i; n.id = i; });
    edges = edges.map(function (e) { return { source: idRemap[e.source], target: idRemap[e.target], weight: e.weight }; }).filter(function (e) { return e.source !== undefined && e.target !== undefined; });

    // Square viewBox works better on portrait-mode iPad than 640x460
    // (which compressed vertically and clumped nodes).
    var W = 560, H = 560;
    var startRadius = Math.min(W, H) * 0.36;
    nodes.forEach(function (n, i) {
      var angle = (i / nodes.length) * Math.PI * 2;
      n.x = W / 2 + Math.cos(angle) * startRadius;
      n.y = H / 2 + Math.sin(angle) * startRadius;
      n.vx = 0; n.vy = 0;
    });

    // Stronger repulsion + bigger collision radius so 8-10 labeled nodes
    // actually fit without visual overlap on mobile.
    for (var step = 0; step < 400; step++) {
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[j].x - nodes[i].x;
          var dy = nodes[j].y - nodes[i].y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          var force = 5000 / (dist * dist);
          var fx = (dx / dist) * force;
          var fy = (dy / dist) * force;
          nodes[i].vx -= fx; nodes[i].vy -= fy;
          nodes[j].vx += fx; nodes[j].vy += fy;
          // Hard collision: keep centers at least 130px apart so labels
          // don't overlap even when one sits above and another below
          if (dist < 130) {
            var push = (130 - dist) * 0.5;
            var pdx = (dx / dist) * push;
            var pdy = (dy / dist) * push;
            nodes[i].x -= pdx; nodes[i].y -= pdy;
            nodes[j].x += pdx; nodes[j].y += pdy;
          }
        }
      }
      for (var e = 0; e < edges.length; e++) {
        var s = nodes[edges[e].source], t = nodes[edges[e].target];
        var dx2 = t.x - s.x, dy2 = t.y - s.y;
        var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 0.01;
        var springK = 0.010 * Math.min(3, edges[e].weight);
        s.vx += dx2 * springK; s.vy += dy2 * springK;
        t.vx -= dx2 * springK; t.vy -= dy2 * springK;
      }
      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        // Stronger centering prevents the drift-to-one-side local
        // minimum seen on dense graphs
        n.vx += (W / 2 - n.x) * 0.006;
        n.vy += (H / 2 - n.y) * 0.006;
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
        var pad = 70;
        if (n.x < pad) n.x = pad; if (n.x > W - pad) n.x = W - pad;
        if (n.y < pad) n.y = pad; if (n.y > H - pad) n.y = H - pad;
      }
    }

    var selectedNodeId = -1;

    function render() {
      var h = '<div class="cloze-view">';
      h += '<div class="mind-banner">Mind Map \u2014 tap a term to see its context</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="mind-wrap">';
      h += '<svg viewBox="0 0 ' + W + ' ' + H + '" class="mind-svg" role="img" aria-label="Concept mind map">';
      for (var e = 0; e < edges.length; e++) {
        var s = nodes[edges[e].source], t = nodes[edges[e].target];
        var op = Math.min(0.6, 0.15 + edges[e].weight * 0.12);
        var sw = Math.min(4, 1 + edges[e].weight * 0.4);
        h += '<line x1="' + s.x.toFixed(1) + '" y1="' + s.y.toFixed(1) + '" x2="' + t.x.toFixed(1) + '" y2="' + t.y.toFixed(1) + '" stroke="#7c3aed" stroke-opacity="' + op.toFixed(2) + '" stroke-width="' + sw.toFixed(1) + '" />';
      }
      var colors = ['#2563eb', '#059669', '#7c3aed', '#dc2626', '#ea580c', '#0891b2', '#be185d', '#ca8a04'];
      for (var nn = 0; nn < nodes.length; nn++) {
        var node = nodes[nn];
        var r = 12 + Math.min(16, Math.sqrt(node.freq + 1) * 2.5);
        var color = colors[nn % colors.length];
        var sel = (selectedNodeId === nn) ? ' class="mind-node mind-node-selected"' : ' class="mind-node"';
        h += '<g data-node="' + nn + '"' + sel + ' role="button" tabindex="0" aria-label="' + node.label + '">';
        h += '<circle cx="' + node.x.toFixed(1) + '" cy="' + node.y.toFixed(1) + '" r="' + r + '" fill="' + color + '" stroke="#fff" stroke-width="2" />';
        // Alternate labels above/below by node index so any two adjacent
        // nodes in the layout ring always get opposite placement, even
        // when they end up in the same half of the viewBox.
        var labelAbove = (nn % 2 === 1);
        var labelY = labelAbove ? (node.y - r - 8) : (node.y + r + 18);
        h += '<text x="' + node.x.toFixed(1) + '" y="' + labelY.toFixed(1) + '" text-anchor="middle" class="mind-label">' + node.label + '</text>';
        h += '</g>';
      }
      h += '</svg>';
      h += '</div>';
      if (selectedNodeId >= 0) {
        var sel2 = nodes[selectedNodeId];
        var kt = keyTerms.find(function (k) { return k.term === sel2.label; });
        var context = findTermContextInCuratedData(sel2.label, data);
        h += '<div class="mind-detail">';
        h += '<div class="mind-detail-term">' + sel2.label + (kt && kt.phonetic ? ' <span style="font-weight:400;font-size:.85em">(' + kt.phonetic + ')</span>' : '') + '</div>';
        if (kt && kt.definition) h += '<div class="mind-detail-ctx">' + kt.definition + '</div>';
        if (context && (!kt || context !== kt.definition)) h += '<div class="mind-detail-ctx" style="font-style:italic">"' + context + '"</div>';
        var conn = [];
        edges.forEach(function (ed) {
          if (ed.source === selectedNodeId) conn.push(nodes[ed.target].label);
          else if (ed.target === selectedNodeId) conn.push(nodes[ed.source].label);
        });
        if (conn.length) h += '<div class="mind-detail-conn"><strong>Connected to:</strong> ' + conn.join(', ') + '</div>';
        h += '</div>';
      }
      h += '<button class="study-btn" id="b-mind-quit" style="margin-top:14px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-mind-quit').addEventListener('click', function () { go(fid); });
      var nodeEls = document.querySelectorAll('.mind-node');
      for (var ni = 0; ni < nodeEls.length; ni++) {
        nodeEls[ni].addEventListener('click', function () {
          selectedNodeId = parseInt(this.getAttribute('data-node'));
          render();
        });
      }
    }
    render();
    recordSession(fid, 'mindmap', 1, 1);
  });
}

// ---- Concept Web — radial hub-and-spoke; tap a ring term to re-center ----
function showConceptWeb(fid) {
  loadContent(fid).then(function (data) {
    if (!data || !data.key_terms || data.key_terms.length < 2) { showStubForMode(fid, 'conceptweb'); return; }
    var keyTerms = data.key_terms.slice(0, 10);
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' — ')[0] : fid;

    // Build weighted edges — a map of term -> neighbour -> weight.
    // Same two-tier approach as Mind Map: paragraph-level matches get
    // weight 2, whole-section co-occurrence gets weight 1 enrichment.
    var pool = [];
    if (data.fill_blank) data.fill_blank.forEach(function (q) { if (q.source_quote) pool.push(q.source_quote); });
    if (data.multiple_choice) data.multiple_choice.forEach(function (q) { if (q.source_quote) pool.push(q.source_quote); });
    if (data.faq) data.faq.forEach(function (q) { if (q.answer) pool.push(q.answer); });
    var weights = {};
    keyTerms.forEach(function (t) { weights[t.term] = {}; });
    function addWeight(a, b, w) {
      weights[a][b] = (weights[a][b] || 0) + w;
      weights[b][a] = (weights[b][a] || 0) + w;
    }
    for (var p = 0; p < pool.length; p++) {
      var lower = pool[p].toLowerCase();
      var present = [];
      for (var n = 0; n < keyTerms.length; n++) {
        var re = new RegExp('\\b' + keyTerms[n].term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
        if (re.test(lower)) present.push(keyTerms[n].term);
      }
      for (var a = 0; a < present.length; a++) {
        for (var b = a + 1; b < present.length; b++) addWeight(present[a], present[b], 2);
      }
    }
    // Tier 2 enrichment — whole curated content
    var allText = pool.join(' ').toLowerCase();
    if (data.summary_plain) allText += ' ' + data.summary_plain.toLowerCase();
    if (data.summary_scholarly) allText += ' ' + data.summary_scholarly.toLowerCase();
    var presentAll = [];
    for (var na = 0; na < keyTerms.length; na++) {
      var rea = new RegExp('\\b' + keyTerms[na].term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (rea.test(allText)) presentAll.push(keyTerms[na].term);
    }
    for (var aa = 0; aa < presentAll.length; aa++) {
      for (var ba = aa + 1; ba < presentAll.length; ba++) addWeight(presentAll[aa], presentAll[ba], 1);
    }

    // Drop terms that aren't connected to anything
    keyTerms = keyTerms.filter(function (t) { return Object.keys(weights[t.term]).length > 0; });
    if (keyTerms.length < 2) { showStubForMode(fid, 'conceptweb'); return; }

    // Start centered on the first term (usually the highest-frequency)
    var centerIdx = 0;

    function render() {
      var center = keyTerms[centerIdx];
      // Neighbours = every other term with a non-zero edge to center,
      // sorted by edge weight descending
      var neighbours = [];
      for (var i = 0; i < keyTerms.length; i++) {
        if (i === centerIdx) continue;
        var w = weights[center.term][keyTerms[i].term] || 0;
        if (w > 0) neighbours.push({ idx: i, term: keyTerms[i].term, weight: w });
      }
      neighbours.sort(function (a, b) { return b.weight - a.weight; });

      var W = 560, H = 560;
      var cx = W / 2, cy = H / 2;
      var ringR = 200;

      var h = '<div class="cloze-view">';
      h += '<div class="cweb-banner">Concept Web — tap a term to make it the centre</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="cweb-wrap">';
      h += '<svg viewBox="0 0 ' + W + ' ' + H + '" class="cweb-svg" role="img" aria-label="Concept Web">';

      // Edges from centre to each neighbour
      neighbours.forEach(function (nb, i) {
        var angle = (i / neighbours.length) * Math.PI * 2 - Math.PI / 2;
        var nx = cx + Math.cos(angle) * ringR;
        var ny = cy + Math.sin(angle) * ringR;
        var op = Math.min(0.7, 0.2 + nb.weight * 0.15);
        var sw = Math.min(5, 1 + nb.weight * 0.4);
        h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + nx.toFixed(1) + '" y2="' + ny.toFixed(1) + '" stroke="#7c3aed" stroke-opacity="' + op.toFixed(2) + '" stroke-width="' + sw.toFixed(1) + '" />';
      });

      // Centre node
      h += '<g class="cweb-center">';
      h += '<circle cx="' + cx + '" cy="' + cy + '" r="48" fill="#7c3aed" stroke="#fff" stroke-width="3" />';
      h += '<text x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle" class="cweb-center-label">' + center.term + '</text>';
      h += '</g>';

      // Ring nodes (tappable)
      var colors = ['#2563eb', '#059669', '#dc2626', '#ea580c', '#0891b2', '#be185d', '#ca8a04', '#16a34a'];
      neighbours.forEach(function (nb, i) {
        var angle = (i / neighbours.length) * Math.PI * 2 - Math.PI / 2;
        var nx = cx + Math.cos(angle) * ringR;
        var ny = cy + Math.sin(angle) * ringR;
        var color = colors[i % colors.length];
        h += '<g data-idx="' + nb.idx + '" class="cweb-node" role="button" tabindex="0" aria-label="Re-center on ' + nb.term + '">';
        h += '<circle cx="' + nx.toFixed(1) + '" cy="' + ny.toFixed(1) + '" r="30" fill="' + color + '" stroke="#fff" stroke-width="2" />';
        // Label radially outward from centre
        var labelDist = 48;
        var lx = cx + Math.cos(angle) * (ringR + labelDist);
        var ly = cy + Math.sin(angle) * (ringR + labelDist) + 4;
        h += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" class="cweb-label">' + nb.term + '</text>';
        h += '</g>';
      });

      h += '</svg>';
      h += '</div>';

      // Detail panel for the centre term
      h += '<div class="cweb-detail">';
      h += '<div class="cweb-detail-term">' + center.term + (center.phonetic ? ' <span style="font-weight:400;font-size:.85em">(' + center.phonetic + ')</span>' : '') + '</div>';
      if (center.definition) h += '<div class="cweb-detail-def">' + center.definition + '</div>';
      h += '<div class="cweb-detail-hint">Tap any of the ' + neighbours.length + ' ring term' + (neighbours.length === 1 ? '' : 's') + ' to make it the new centre.</div>';
      h += '</div>';

      h += '<button class="study-btn" id="b-cweb-quit" style="margin-top:14px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-cweb-quit').addEventListener('click', function () { go(fid); });
      var nodeEls = document.querySelectorAll('.cweb-node');
      for (var ne = 0; ne < nodeEls.length; ne++) {
        nodeEls[ne].addEventListener('click', function () {
          centerIdx = parseInt(this.getAttribute('data-idx'));
          render();
        });
      }
    }
    render();
    recordSession(fid, 'conceptweb', 1, 1);
  });
}

// ---- Chapter Timeline — horizontal sequence of source quotes ----
function showChapterTimeline(fid) {
  loadContent(fid).then(function (data) {
    if (!data) { showStubForMode(fid, 'timeline'); return; }
    // Pool + dedup
    var items = [];
    var seen = {};
    function addItem(ref, quote) {
      if (!quote || quote.length < 20) return;
      var key = quote.slice(0, 60);
      if (seen[key]) return;
      seen[key] = true;
      items.push({ ref: ref || '', quote: quote });
    }
    if (data.fill_blank) data.fill_blank.forEach(function (q) { addItem(q.ref, q.source_quote); });
    if (data.multiple_choice) data.multiple_choice.forEach(function (q) { addItem(q.ref, q.source_quote); });
    if (items.length < 2) { showStubForMode(fid, 'timeline'); return; }
    // Sort by parseable ref (chapter:verse), keeping undefined at end
    items.sort(function (a, b) {
      var ar = parseRef(a.ref), br = parseRef(b.ref);
      if (ar === null && br === null) return 0;
      if (ar === null) return 1;
      if (br === null) return -1;
      return ar - br;
    });
    // Downsample to 12
    var maxEvents = 12;
    var events = [];
    var step = Math.max(1, Math.floor(items.length / maxEvents));
    for (var i = 0; i < items.length && events.length < maxEvents; i += step) {
      events.push({
        ref: items[i].ref,
        text: items[i].quote,
        preview: items[i].quote.length > 200 ? items[i].quote.slice(0, 197) + '...' : items[i].quote
      });
    }
    var idx = IDS.indexOf(fid);
    var secLabel = idx >= 0 ? LBL[idx].split(' — ')[0] : fid;

    var W = 560, H = 280;
    var lineY = H / 2;
    var pad = 40;
    var lineStart = pad, lineEnd = W - pad;
    var spacing = (lineEnd - lineStart) / Math.max(1, events.length - 1);
    var selectedIdx = -1;

    function render() {
      var h = '<div class="cloze-view">';
      h += '<div class="tl-banner">Chapter Timeline — tap a dot to see the passage</div>';
      h += '<div class="cloze-ref">' + secLabel + '</div>';
      h += '<div class="tl-wrap">';
      h += '<svg viewBox="0 0 ' + W + ' ' + H + '" class="tl-svg" role="img" aria-label="Chapter timeline">';
      h += '<line x1="' + lineStart + '" y1="' + lineY + '" x2="' + lineEnd + '" y2="' + lineY + '" stroke="#7c3aed" stroke-width="3" stroke-linecap="round" />';
      h += '<text x="' + lineStart + '" y="' + (lineY + 40) + '" text-anchor="start" class="tl-endlabel">Start</text>';
      h += '<text x="' + lineEnd + '" y="' + (lineY + 40) + '" text-anchor="end" class="tl-endlabel">End</text>';
      var dotColors = ['#2563eb', '#059669', '#7c3aed', '#dc2626', '#ea580c', '#0891b2', '#be185d', '#ca8a04'];
      for (var i = 0; i < events.length; i++) {
        var cx = events.length === 1 ? (lineStart + lineEnd) / 2 : (lineStart + spacing * i);
        var cy = lineY;
        var r = 10 + Math.min(10, Math.sqrt(events[i].text.length / 40));
        var color = dotColors[i % dotColors.length];
        var sel = (selectedIdx === i) ? ' tl-dot-selected' : '';
        var labelAbove = (i % 2 === 0);
        var labelY = labelAbove ? (cy - r - 10) : (cy + r + 22);
        h += '<g data-evt="' + i + '" class="tl-dot' + sel + '" role="button" tabindex="0" aria-label="Event ' + (i + 1) + '">';
        h += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy + '" r="' + r + '" fill="' + color + '" stroke="#fff" stroke-width="2" />';
        var idxLabel = events[i].ref || String(i + 1);
        h += '<text x="' + cx.toFixed(1) + '" y="' + labelY + '" text-anchor="middle" class="tl-idx">' + idxLabel + '</text>';
        h += '</g>';
      }
      h += '</svg>';
      h += '</div>';
      if (selectedIdx >= 0) {
        var ev = events[selectedIdx];
        h += '<div class="tl-detail">';
        h += '<div class="tl-detail-head">' + (ev.ref ? ev.ref + '  —  ' : '') + 'Event ' + (selectedIdx + 1) + ' of ' + events.length + '</div>';
        h += '<div class="tl-detail-text">' + ev.preview + '</div>';
        h += '<div class="tl-detail-nav">';
        if (selectedIdx > 0) h += '<button class="study-btn" id="b-tl-prev">◀ Previous</button>';
        h += '<button class="cloze-audio" id="b-tl-hear">Listen</button>';
        if (selectedIdx < events.length - 1) h += '<button class="study-btn" id="b-tl-next">Next ▶</button>';
        h += '</div>';
        h += '</div>';
      }
      h += '<button class="study-btn" id="b-tl-quit" style="margin-top:14px">Back to activities</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-tl-quit').addEventListener('click', function () { go(fid); });
      var dots = document.querySelectorAll('.tl-dot');
      for (var d = 0; d < dots.length; d++) {
        dots[d].addEventListener('click', function () {
          selectedIdx = parseInt(this.getAttribute('data-evt'));
          render();
        });
      }
      var prev = document.getElementById('b-tl-prev');
      if (prev) prev.addEventListener('click', function () { selectedIdx--; render(); });
      var next = document.getElementById('b-tl-next');
      if (next) next.addEventListener('click', function () { selectedIdx++; render(); });
      var hear = document.getElementById('b-tl-hear');
      if (hear) hear.addEventListener('click', function () {
        if (selectedIdx >= 0) speakText(events[selectedIdx].text);
      });
    }
    render();
    recordSession(fid, 'timeline', 1, 1);
  });
}

// ---- Remix Round — resurface missed questions in a different format ----
function showRemix(fid) {
  var items = getRemixQueue().filter(function (it) { return it.fid === fid; });
  if (items.length === 0) { go(fid); return; }
  items = shuffle(items.slice());
  var qi = 0, score = 0, points = 0, firstAttempt = true, hintsUsed = 0;

  function pickRemixMode(item) {
    if (item.missedInMode === 'filblank') return 'mc';
    if (item.missedInMode === 'mc') {
      if (item.options && typeof item.correct === 'number') {
        var ans = item.options[item.correct];
        if (ans && item.source_quote && item.source_quote.toLowerCase().indexOf(ans.toLowerCase()) !== -1) {
          return 'cloze';
        }
      }
      return 'flash';
    }
    // Dictation — the correct answer is a full sentence; an MC with
    // one long option and three short distractors is trivial. Remix
    // as a flashcard: show the sentence, let the user rate whether
    // they remember it.
    if (item.missedInMode === 'dictation') return 'flash';
    // Story Sequence — an MC of N events is ugly. Show as flashcard
    // with the sequence as the "answer" reveal.
    if (item.missedInMode === 'sequence') return 'flash';
    // Cause & Effect — cause column is long prose; an MC of cause +
    // random distractor effects reads weird. Flashcard-reveal works.
    if (item.missedInMode === 'causeeffect') return 'flash';
    return 'mc';
  }

  function otherAnswerPool() {
    var q = getRemixQueue();
    var pool = [];
    for (var i = 0; i < q.length; i++) {
      var it = q[i];
      if (it.answer && pool.indexOf(it.answer) === -1) pool.push(it.answer);
      if (it.options && typeof it.correct === 'number' && it.options[it.correct]) {
        var o = it.options[it.correct];
        if (pool.indexOf(o) === -1) pool.push(o);
      }
    }
    return pool;
  }

  // Type-matched distractor pool for the Remix Round.
  // Detects whether the answer is a digit, proper noun (name/place),
  // or common word and filters rawPool accordingly so distractors are
  // always plausible alternatives rather than random mixed types.
  function typeMatchedDistractors(answer, rawPool) {
    var ans = String(answer);
    var _dig = /^\d+$/.test(ans);
    var _nm  = new RegExp(NAMES_PATTERN.source, 'i').test(ans);  NAMES_PATTERN.lastIndex = 0;
    var _pl  = !_nm && new RegExp(PLACES_PATTERN.source, 'i').test(ans); PLACES_PATTERN.lastIndex = 0;
    var _cap = !_dig && !_nm && !_pl && /^[A-Z]/.test(ans);
    var filtered;
    if (_dig) {
      filtered = rawPool.filter(function (a) { return /^\d+$/.test(a) && a !== ans; });
      if (filtered.length < 3) {
        var base = parseInt(ans, 10);
        [-31,+31,-62,+62,-7,+7,-93,+93].forEach(function (off) {
          var n = String(base + off);
          if (parseInt(n) > 0 && n !== ans && filtered.indexOf(n) < 0) filtered.push(n);
        });
      }
    } else if (_nm || _pl || _cap) {
      // All proper-noun answers: distractors must also be proper nouns
      filtered = rawPool.filter(function (a) {
        return /^[A-Z]/.test(a) && !/^\d+$/.test(a) && a.toLowerCase() !== ans.toLowerCase();
      });
      // Supplement from NAMES_PATTERN if thin
      if (filtered.length < 3) {
        var _extras = (NAMES_PATTERN.source.match(/\(([^)]+)\)/)||['',''])[1].split('|');
        NAMES_PATTERN.lastIndex = 0;
        _extras.forEach(function (n) {
          if (n && n.toLowerCase() !== ans.toLowerCase() && filtered.indexOf(n) < 0) filtered.push(n);
        });
      }
    } else {
      // Common word: exclude digits and proper nouns
      filtered = rawPool.filter(function (a) {
        if (/^\d+$/.test(a)) return false;
        if (/^[A-Z]/.test(a)) return false;
        return a.toLowerCase() !== ans.toLowerCase();
      });
    }
    return shuffle(filtered);
  }

  function renderNext() {
    if (qi >= items.length) { showRemixResults(); return; }
    var item = items[qi];
    firstAttempt = true;
    hintsUsed = 0;
    var mode = pickRemixMode(item);
    var secIdx = IDS.indexOf(item.fid);
    var label = secIdx >= 0 ? LBL[secIdx].split(' \u2014 ')[0] : item.fid;
    var h = '<div class="cloze-view remix-view">';
    h += '<div class="remix-banner">Remix Round \u2014 ' + (qi + 1) + ' of ' + items.length + '</div>';
    h += '<div class="cloze-ref">' + label + (item.ref ? ' ' + item.ref : '') + '</div>';

    if (mode === 'mc') {
      // Missed in filblank, present as MC with derived question
      var answer = item.answer || (item.options && item.options[item.correct]);
      var distractors = typeMatchedDistractors(answer, otherAnswerPool()).slice(0, 3);
      while (distractors.length < 3) distractors.push(distractors[0] || '—');
      var opts = shuffle([answer].concat(distractors));
      var correctIdx = opts.indexOf(answer);
      var question = item.prompt ? ('Which word fills the blank? ' + item.prompt) : (item.question || 'Choose the best answer.');
      h += '<div class="mc-question">' + question + '</div>';
      h += '<button class="cloze-audio" id="b-rx-hear">Listen</button>';
      h += '<button class="hint-btn" id="b-rx-hint" aria-label="Get a hint">Hint</button>';
      h += '<div class="hint-display" id="rx-hint-display" role="status" aria-live="polite"></div>';
      h += '<div class="mc-opts">';
      var OPTLBLS_RX = ['A', 'B', 'C', 'D'];
      for (var o = 0; o < opts.length; o++) {
        h += '<button class="mc-opt opt-' + OPTLBLS_RX[o % 4].toLowerCase() + '" data-idx="' + o + '" aria-label="Option ' + OPTLBLS_RX[o % 4] + ': ' + opts[o] + '"><span class="opt-letter">' + OPTLBLS_RX[o % 4] + '</span>' + opts[o] + '</button>';
      }
      h += '</div>';
      h += '<div class="mc-feedback" id="rx-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-rx-quit" style="margin-top:18px">Leave remix round</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-rx-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-rx-hear').addEventListener('click', function () { speakText(question); });
      wireHintLadder('b-rx-hint', 'rx-hint-display', answer, item.source_quote, function (n) { hintsUsed = n; });
      var btns = document.querySelectorAll('.mc-opt');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-idx'));
          var fb = document.getElementById('rx-fb');
          if (idx === correctIdx) {
            this.classList.add('mc-correct');
            fb.innerHTML = '<span class="fb-correct">\u2714 Remixed!</span>' +
              '<div class="cloze-source">' + (item.source_quote || '') + '</div>';
            if (firstAttempt) { score++; points += hintMultiplier(hintsUsed); }
            removeFromRemixQueue(item);
            var all = document.querySelectorAll('.mc-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderNext(); }, 2200);
          } else {
            firstAttempt = false;
            this.classList.add('mc-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Not quite \u2014 try another \u2192</span>';
          }
        });
      }
      return;
    }

    if (mode === 'cloze') {
      // Missed in MC, present as cloze by blanking the answer in the source_quote
      var answer2 = item.options[item.correct];
      var quote = item.source_quote;
      var re = new RegExp('\\b' + String(answer2).replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '\\b', 'i');
      var prompt = quote.replace(re, '______');
      if (prompt === quote) { prompt = quote + ' \u2014 what word is missing?'; }
      var distractors2 = typeMatchedDistractors(answer2, otherAnswerPool()).slice(0, 3);
      while (distractors2.length < 3) distractors2.push(distractors2[0] || '—');
      var opts2 = shuffle([answer2].concat(distractors2));
      var colors2 = ['#2563eb', '#059669', '#7c3aed', '#d97706'];
      h += '<div class="cloze-prompt">' + prompt.replace('______', '<span class="cloze-blank">______</span>') + '</div>';
      h += '<button class="cloze-audio" id="b-rx-hear">Listen</button>';
      h += '<button class="hint-btn" id="b-rx-hint" aria-label="Get a hint">Hint</button>';
      h += '<div class="hint-display" id="rx-hint-display" role="status" aria-live="polite"></div>';
      h += '<div class="cloze-opts">';
      for (var o2 = 0; o2 < opts2.length; o2++) {
        h += '<button class="cloze-opt" data-val="' + opts2[o2] + '" style="background:' + colors2[o2 % 4] + '" aria-label="Answer option: ' + opts2[o2] + '">' + opts2[o2] + '</button>';
      }
      h += '</div>';
      h += '<div class="cloze-feedback" id="rx-fb" role="status" aria-live="polite"></div>';
      h += '<button class="study-btn" id="b-rx-quit" style="margin-top:18px">Leave remix round</button>';
      h += '</div>';
      document.getElementById('content').innerHTML = h;
      injectGameBack(fid);
      document.getElementById('b-rx-quit').addEventListener('click', function () { go(fid); });
      document.getElementById('b-rx-hear').addEventListener('click', function () { speakText(quote); });
      wireHintLadder('b-rx-hint', 'rx-hint-display', answer2, quote, function (n) { hintsUsed = n; });
      var btns2 = document.querySelectorAll('.cloze-opt');
      for (var b2 = 0; b2 < btns2.length; b2++) {
        btns2[b2].addEventListener('click', function () {
          var val = this.getAttribute('data-val');
          var fb = document.getElementById('rx-fb');
          if (val.toLowerCase() === String(answer2).toLowerCase()) {
            this.classList.add('cloze-correct');
            fb.innerHTML = '<span class="fb-correct">\u2714 Remixed!</span><div class="cloze-source">' + quote + '</div>';
            if (firstAttempt) { score++; points += hintMultiplier(hintsUsed); }
            removeFromRemixQueue(item);
            var all = document.querySelectorAll('.cloze-opt');
            for (var x = 0; x < all.length; x++) all[x].disabled = true;
            setTimeout(function () { qi++; renderNext(); }, 2200);
          } else {
            firstAttempt = false;
            this.classList.add('cloze-wrong');
            this.disabled = true;
            fb.innerHTML = '<span class="fb-try">Try another \u2192</span>';
          }
        });
      }
      return;
    }

    // Flashcard fallback
    var answer3 = (item.options && item.options[item.correct]) || item.answer || '';
    var front = item.question || item.prompt || 'Remember this:';
    var revealed = false;
    h += '<div class="cloze-prompt">' + front + '</div>';
    h += '<button class="cloze-audio" id="b-rx-hear">Listen</button>';
    h += '<div class="remix-flash" id="rx-flash">Tap to reveal answer</div>';
    h += '<div class="mc-opts remix-confidence" id="rx-confidence" style="display:none">';
    h += '<button class="mc-opt" data-rx="yes" style="background:#059669">I knew it</button>';
    h += '<button class="mc-opt" data-rx="no" style="background:#dc2626">Still unsure</button>';
    h += '</div>';
    h += '<button class="study-btn" id="b-rx-quit" style="margin-top:18px">Leave remix round</button>';
    h += '</div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-rx-quit').addEventListener('click', function () { go(fid); });
    document.getElementById('b-rx-hear').addEventListener('click', function () { speakText(front); });
    document.getElementById('rx-flash').addEventListener('click', function () {
      if (revealed) return;
      revealed = true;
      this.innerHTML = '<strong>' + answer3 + '</strong>' + (item.source_quote ? '<div class="cloze-source">' + item.source_quote + '</div>' : '');
      document.getElementById('rx-confidence').style.display = 'grid';
    });
    var cBtns = document.querySelectorAll('#rx-confidence .mc-opt');
    for (var cb = 0; cb < cBtns.length; cb++) {
      cBtns[cb].addEventListener('click', function () {
        var knew = this.getAttribute('data-rx') === 'yes';
        if (knew) { score++; points += 0.7; removeFromRemixQueue(item); }
        qi++; renderNext();
      });
    }
  }

  function showRemixResults() {
    var pct = items.length ? Math.round(score / items.length * 100) : 0;
    var xpEarned = recordSession(fid, 'remix', points, items.length);
    var remainingFid = getRemixCount(fid);
    var h = '<div class="cloze-results">';
    h += '<div class="cr-emoji"></div>';
    h += '<div class="cr-score">' + score + ' / ' + items.length + '</div>';
    h += '<div class="cr-pct">' + pct + '% remixed</div>';
    h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
    if (remainingFid > 0) {
      h += '<p class="cr-hint">' + remainingFid + ' still in your remix queue \u2014 try again later.</p>';
    } else {
      h += '<p class="cr-hint">Queue cleared for this section. Nice work.</p>';
    }
    h += '<button class="study-btn sb-pri" id="b-rx-again">Back to activities</button>';
    h += '</div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('b-rx-again').addEventListener('click', function () { go(fid); });
  }

  renderNext();
}

// ---- Cross-Volume Review — pull due cards from ALL sections ----
function showCrossReview() {
  var allDue = getAllDueCards();
  if (!allDue.length) {
    document.getElementById('content').innerHTML =
      '<div class="cloze-results"><div class="cr-emoji">Done</div>' +
      '<div class="cr-msg">No cards due for review!</div>' +
      '<div class="cr-btns"><button class="study-btn sb-pri" id="b-rev-home">Home</button></div></div>';
    document.getElementById('b-rev-home').addEventListener('click', function () { goHome(); });
    return;
  }
  var cards = allDue.slice(0, 20);
  var ci = 0, flipped = false;
  var ratings = [];

  function renderCard() {
    if (ci >= cards.length) { showRevSummary(); return; }
    var c = cards[ci];
    flipped = false;
    var secIdx = IDS.indexOf(c.fid);
    var secName = secIdx >= 0 ? LBL[secIdx].split(' \u2014 ')[0] : c.fid;
    var typeColor = c.type === 'term' ? 'var(--vol6)' : 'var(--vol1)';

    var h = '<div class="fc-view">';
    h += '<div class="fc-progress">' + (ci + 1) + ' of ' + cards.length + ' due</div>';
    h += '<div class="fc-type" style="color:' + typeColor + '">' + secName + '</div>';
    h += '<div class="fc-card" id="fc-card">';
    h += '<div class="fc-front" id="fc-front">' + c.front + '</div>';
    h += '<div class="fc-back" id="fc-back" style="display:none">' + c.back + '</div>';
    h += '</div>';
    h += '<button class="cloze-audio" id="b-fc-hear">Listen</button>';
    h += '<div class="fc-action" id="fc-action">';
    h += '<button class="study-btn sb-pri" id="b-fc-flip">Flip to reveal</button>';
    h += '</div>';
    h += '<div class="fc-rate" id="fc-rate" style="display:none">';
    h += '<div class="fc-rate-label">How well did you know this?</div>';
    h += '<div class="fc-rate-btns">';
    var rLabels = ['Blank', 'Hard', 'Okay', 'Good', 'Easy'];
    var rColors = ['#dc2626', '#d97706', '#0891b2', '#059669', '#2563eb'];
    for (var r = 1; r <= 5; r++) {
      h += '<button class="fc-rate-btn" data-r="' + r +
        '" style="background:' + rColors[r - 1] + '">' +
        r + '<br><span class="fc-rate-sub">' + rLabels[r - 1] + '</span></button>';
    }
    h += '</div></div>';
    h += '<button class="study-btn" id="b-rev-quit" style="margin-top:18px">Back to Home</button>';
    h += '</div>';

    document.getElementById('content').innerHTML = h;
    document.getElementById('b-rev-quit').addEventListener('click', function () { goHome(); });
    document.getElementById('b-fc-hear').addEventListener('click', function () {
      speakText(flipped ? c.back : c.front);
    });
    document.getElementById('b-fc-flip').addEventListener('click', function () {
      flipped = true;
      document.getElementById('fc-front').style.display = 'none';
      document.getElementById('fc-back').style.display = '';
      document.getElementById('fc-card').classList.add('fc-flipped');
      document.getElementById('fc-action').style.display = 'none';
      document.getElementById('fc-rate').style.display = '';
    });
    var rBtns = document.querySelectorAll('.fc-rate-btn');
    for (var b = 0; b < rBtns.length; b++) {
      rBtns[b].addEventListener('click', function () {
        var r = parseInt(this.getAttribute('data-r'));
        ratings.push(r);
        var qualityMap = [0, 0, 1, 3, 4, 5];
        var updated = sm2(c, qualityMap[r]);
        updateCard(updated);
        ci++;
        renderCard();
      });
    }
  }

  function showRevSummary() {
    var avg = ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length;
    var remaining = getAllDueCount();
    var xpEarned = recordSession('review', 'review', cards.length, cards.length);
    var emoji = avg >= 4 ? 'Outstanding' : avg >= 3 ? 'Well done' : 'Keep going';
    var h = '<div class="cloze-results">';
    h += '<div class="cr-emoji">' + emoji + '</div>';
    h += '<div class="cr-score">' + cards.length + ' cards reviewed</div>';
    h += '<div class="cr-pct">Average confidence: ' + avg.toFixed(1) + ' / 5</div>';
    h += '<div class="cr-xp">+' + xpEarned + ' XP earned</div>';
    if (remaining > 0) h += '<div class="cr-mastery">' + remaining + ' more cards still due</div>';
    else h += '<div class="cr-mastery">Done: All caught up!</div>';
    h += '<div class="cr-btns">';
    if (remaining > 0) h += '<button class="study-btn sb-pri" id="b-rev-more">Review More</button>';
    h += '<button class="study-btn" id="b-rev-home">Home</button>';
    h += '</div></div>';
    document.getElementById('content').innerHTML = h;
    if (remaining > 0) document.getElementById('b-rev-more').addEventListener('click', function () { showCrossReview(); });
    document.getElementById('b-rev-home').addEventListener('click', function () { goHome(); });
  }

  renderCard();
}

function showDailyScroll() {
  var status = getDailyStatus();
  if (status.completedToday) { goHome(); return; }

  var picked = getDailyQuestion();
  if (picked) {
    renderDailyQ(picked.q);
    return;
  }

  // Not cached yet — async-load the seeded section then pick from it
  var seed = getDailySeed();
  var fid = IDS[Math.abs(seed) % IDS.length];
  loadContent(fid).then(function(data) {
    if (data && data.fill_blank && data.fill_blank.length) {
      renderDailyQ(data.fill_blank[Math.abs(seed) % data.fill_blank.length]);
    } else {
      return loadContent('file_1').then(function(d2) {
        if (d2 && d2.fill_blank && d2.fill_blank.length) {
          renderDailyQ(d2.fill_blank[0]);
        } else {
          showNoDailyQ();
        }
      });
    }
  }).catch(showNoDailyQ);

  function showNoDailyQ() {
    document.getElementById('content').innerHTML = '<div class="prog-view"><div class="prog-card"><h3>No daily question available yet — study a section first.</h3><button class="study-btn" id="b-ds-back">Back</button></div></div>';
    document.getElementById('b-ds-back').addEventListener('click', function () { goHome(); });
  }

  function renderDailyQ(q) {
    var answered = false;
    function render() {
      var h = '<div class="prog-view"><div class="prog-card" style="border-left:4px solid #166534">';
      h += '<div style="font-size:11px;color:#4ade80;font-weight:700;letter-spacing:1px;margin-bottom:8px">DAILY SCROLL</div>';
      h += '<div style="font-size:15px;font-weight:700;margin-bottom:12px">' + (q.prompt || q.question || '') + '</div>';
      h += '<input id="ds-input" type="text" placeholder="Your answer..." style="width:100%;box-sizing:border-box;padding:10px;border-radius:6px;border:1.5px solid #444;background:#111;color:#fff;font-size:15px;margin-bottom:10px">';
      h += '<button class="study-btn" id="ds-submit" style="background:#166534">Submit</button>';
      h += '<div id="ds-fb" style="min-height:36px;margin-top:10px"></div>';
      h += '</div></div>';
      document.getElementById('content').innerHTML = h;

      var inp = document.getElementById('ds-input');
      var btn = document.getElementById('ds-submit');
      var fb = document.getElementById('ds-fb');
      if (inp) inp.focus();

      function submit() {
        if (answered) return;
        answered = true;
        btn.disabled = true;
        var val = (inp ? inp.value : '').trim().toLowerCase();
        var ans = String(q.answer || '').trim().toLowerCase();
        var correct = val === ans || (ans.split('/').some(function(a){ return a.trim() === val; }));
        completeDailyScroll(correct);
        if (fb) {
          fb.innerHTML = (correct
            ? '<div style="color:#4ade80;font-weight:700">Correct! +25 XP</div>'
            : '<div style="color:#f87171;font-weight:700">The answer was: ' + q.answer + '</div>') +
            (q.source_quote ? '<div style="color:#aaa;font-size:12px;margin-top:6px">' + q.source_quote + '</div>' : '');
        }
        setTimeout(function () { goHome(); }, 2800);
      }

      if (btn) btn.addEventListener('click', submit);
      if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    }
    render();
  }
}

function showLevelUpScreen(levelName, cb) {
  var lvlObj = null;
  for (var i = 0; i < LEVELS.length; i++) {
    if (LEVELS[i].name === levelName) { lvlObj = LEVELS[i]; break; }
  }
  var iconSvg = lvlObj ? lbIcon(lvlObj.icon, 80) : '';
  var accentColor = '#c9a84c';
  var h = '<div class="level-up-screen">';
  h += '<div class="lu-burst" style="color:' + accentColor + '">' + iconSvg + '</div>';
  h += '<div class="lu-label">LEVEL UP</div>';
  h += '<div class="lu-name" style="color:' + accentColor + '">' + levelName + '</div>';
  h += '<div class="lu-msg">Keep going. The scroll is being revealed.</div>';
  h += '<button class="study-btn sb-pri" id="b-lu-ok">Continue</button>';
  h += '</div>';
  document.getElementById('content').innerHTML = h;
  document.getElementById('tb').textContent = 'Level Up';
  document.getElementById('b-lu-ok').addEventListener('click', function () { cb(); });
}

function showHowToPlay() {
  function htpRow(icon, head, body) {
    return '<div class="htp-section">' +
      '<div class="htp-icon">' + icon + '</div>' +
      '<div class="htp-body"><div class="htp-head">' + head + '</div>' +
      '<div class="htp-text">' + body + '</div></div>' +
      '</div>';
  }
  var h = '<div class="htp-view">';
  h += '<div class="htp-title">HOW TO STUDY</div>';

  h += htpRow(lbIcon('scroll', 22), 'DAILY SCROLL',
    'One question each day. Correct answer earns 25 bonus XP. Tap Start Daily Scroll on the home screen.');

  h += htpRow(lbIcon('book', 22), 'OPEN A SECTION',
    'Pick a volume from the index, then tap a section name. The activity screen shows all available study modes.');

  h += htpRow(lbIcon('pencil', 22), 'FILL IN THE BLANK',
    'Four options labeled A through D. Select the word that completes the verse. Earns 10 XP per correct answer.');

  h += htpRow(lbIcon('target', 22), 'MULTIPLE CHOICE',
    'Four options. Select the correct answer. Same XP as Fill in the Blank. Good for testing recognition.');

  h += htpRow(lbIcon('cards', 22), 'FLASHCARDS',
    'Rate each card 1 through 5. Low-rated cards return sooner. Due cards show as a badge on the home screen. Use Review All Due to work across all sections.');

  h += htpRow(lbIcon('trophy', 22), 'COVENANT TRIAL',
    'Unlocks after 10 study sessions or full flashcard mastery. Five synthesis questions, no hints, double XP. Best score saved per volume.');

  h += htpRow(lbIcon('puzzle', 22), 'OTHER MODES',
    'Key Terms, Memory Match, Listen &amp; Learn, FAQ, Mind Map, Concept Web, Timeline, Who Said It, True or False, Cause &amp; Effect, Story Sequence.');

  h += htpRow(lbIcon('sparkle', 22), 'XP AND LEVELS',
    'Seeker 0 XP &mdash; Scholar 600 XP &mdash; Guardian 3,000 XP &mdash; Keeper of the Scroll 12,000 XP. Covenant Trial earns double XP.');

  h += htpRow(lbIcon('flame', 22), 'STREAK',
    'Study at least once per day. Every 7-day milestone earns a freeze token. One missed day is covered automatically if you have a token.');

  h += '<button class="study-btn htp-back-btn" id="b-htp-back">Back to Home</button>';
  h += '</div>';
  document.getElementById('content').innerHTML = h;
  document.getElementById('tb').textContent = 'How to Study';
  document.getElementById('b-htp-back').addEventListener('click', function () { goHome(); });
  window.scrollTo(0, 0);
}

function goHome() {
  var stats = getStats();

  // Show level-up celebration if one is pending
  if (stats.pendingLevelUp) {
    var levelName = stats.pendingLevelUp;
    stats.pendingLevelUp = null;
    saveStats(stats);
    showLevelUpScreen(levelName, function () { goHome(); });
    return;
  }

  var lastFid = localStorage.getItem('acr_study_last');
  var hasResume = lastFid && IDS.indexOf(lastFid) >= 0;
  var totalDue = getAllDueCount();
  var lvl = getLevel(stats.xp || 0);
  var streak = stats.streak || 0;
  var xp = stats.xp || 0;

  var accentColor = lvl.current.name === 'Keeper of the Scroll' ? '#b8860b' :
    lvl.current.name === 'Guardian' ? '#7c3aed' :
    lvl.current.name === 'Scholar' ? '#2563eb' : '#4db84d';

  var html = '<div id="home">' +
    '<div class="home-paleo">&#x10909;&#x10904;&#x10905;&#x10904;</div>' +
    '<h1>ACR STUDY</h1>' +
    '<p class="tag">Spaced Repetition for The Ancient Covenant Record<br>Dead Sea Scrolls &amp; The Orit Ge\u2019ez</p>';

  // Stats pills
  if (totalDue > 0 || streak > 0 || xp > 0) {
    html += '<div class="home-stats">';
    if (totalDue > 0) html += '<div class="home-stat home-due">' + totalDue + ' cards due</div>';
    if (streak > 0) html += '<div class="home-stat home-streak">' + streak + ' day streak</div>';
    html += '<div class="home-stat home-level" style="background:' + accentColor + '30;border:1px solid ' + accentColor + '60">' +
      lbIcon(lvl.current.icon, 13) + ' ' + lvl.current.name + ' \u00B7 ' + xp + ' XP</div>';
    if ((stats.freezeTokens || 0) > 0) {
      html += '<div class="home-stat" style="background:#4c1d95;color:#c4b5fd">' +
        stats.freezeTokens + ' streak freeze' + (stats.freezeTokens > 1 ? 's' : '') + '</div>';
    }
    html += '</div>';
  }

  // XP progress bar
  if (lvl.next) {
    var xpPct = Math.min(100, Math.round((xp - lvl.current.xp) / (lvl.next.xp - lvl.current.xp) * 100));
    html += '<div style="width:100%;max-width:320px;margin:0 auto 18px">';
    html += '<div style="display:flex;justify-content:space-between;font-size:11px;color:#555;margin-bottom:5px;font-weight:700">';
    html += '<span>' + lvl.current.name + '</span><span>' + (lvl.next.xp - xp) + ' XP to ' + lvl.next.name + '</span>';
    html += '</div>';
    html += '<div style="background:#1a1a1a;border-radius:6px;height:8px;overflow:hidden">';
    html += '<div style="width:' + xpPct + '%;height:100%;background:linear-gradient(90deg,' + accentColor + ',#4db84d);border-radius:6px"></div>';
    html += '</div></div>';
  }

  // 7-day streak calendar
  var studyDays = {};
  (stats.sessions || []).forEach(function (ses) { if (ses.date) studyDays[ses.date] = true; });
  html += '<div style="display:flex;gap:5px;justify-content:center;margin:0 0 20px;align-items:center">';
  for (var d = 6; d >= 0; d--) {
    var dt = new Date();
    dt.setUTCDate(dt.getUTCDate() - d);
    var ds = dt.toISOString().slice(0, 10);
    var studied = !!studyDays[ds];
    html += '<div style="width:28px;height:28px;border-radius:50%;border:2px solid ' +
      (studied ? accentColor : '#2a2a2a') + ';background:' +
      (studied ? accentColor + '40' : 'transparent') +
      ';display:flex;align-items:center;justify-content:center">';
    html += '<div style="width:8px;height:8px;border-radius:50%;background:' +
      (studied ? accentColor : '#2a2a2a') + '"></div></div>';
  }
  html += '</div>';

  // Seal count badge
  var seals = getSeals();
  var sealCount = Object.keys(seals).length;
  if (sealCount > 0) {
    html += '<div style="font-size:12px;color:#b8860b;font-weight:700;margin:0 0 16px;letter-spacing:.04em">' +
      lbIcon('medal', 13) + ' ' + sealCount + ' of ' + SEALS.length + ' Covenant Seals earned</div>';
  }

  // Daily Scroll widget
  var dailyStatus = getDailyStatus();
  html += '<div id="daily-scroll-widget" style="background:linear-gradient(135deg,#0a1a0a,#0d240d);border:1.5px solid ' +
    (dailyStatus.completedToday ? '#4ade80' : '#166534') +
    ';border-radius:12px;padding:16px;margin:8px 0 16px;text-align:left">';
  html += '<div style="font-size:10px;color:#4ade80;font-weight:700;letter-spacing:1.5px;margin-bottom:10px">DAILY SCROLL</div>';
  if (dailyStatus.completedToday) {
    html += '<div style="display:flex;align-items:center;gap:12px">';
    html += '<div style="width:36px;height:36px;border-radius:50%;background:#166534;border:2px solid #4ade80;flex-shrink:0;display:flex;align-items:center;justify-content:center">';
    html += '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L19 7"/></svg></div>';
    html += '<div><div style="color:#86efac;font-size:15px;font-weight:700">Done for today</div>';
    html += '<div style="color:#4ade80;font-size:12px;margin-top:3px">' + dailyStatus.streak + '-day streak &nbsp;&middot;&nbsp; ' + dailyStatus.completed + ' total</div></div></div>';
  } else {
    html += '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">';
    html += '<div style="flex:1"><div style="color:#d4d4d4;font-size:13px;line-height:1.6">One question per day.<br>Correct = 25 bonus XP.</div>';
    if (dailyStatus.streak > 0) html += '<div style="color:#4ade80;font-size:12px;margin-top:4px;font-weight:700">' + dailyStatus.streak + '-day streak</div>';
    html += '</div>';
    html += '<button id="b-daily" style="background:#166534;color:#fff;border:none;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;flex-shrink:0;min-height:44px">Start</button>';
    html += '</div>';
  }
  html += '</div>';

  // Main action buttons
  html += '<div class="btns">';
  if (totalDue > 0) html += '<button id="b-review">Review All Due (' + totalDue + ' cards)</button>';
  html += '<button id="b-begin">Begin with Bereshit</button>' +
    (hasResume ? '<button id="b-resume">Resume where I left off</button>' : '') +
    '</div>' +
    '<div style="text-align:center;margin:10px 0">' +
    '<button id="b-howtoplay" style="background:none;border:none;color:#555;font-size:13px;cursor:pointer;text-decoration:underline">How to play</button>' +
    '</div>' +
    '<p class="small">' +
    'Data shared with the <a href="../">ACR Reader</a> on this device<br>' +
    'Add to Home Screen from Safari for offline access' +
    '</p>' +
    '</div>';

  document.getElementById('content').innerHTML = html;
  document.getElementById('tb').textContent = 'ACR Study';
  cur = -1;
  var secs = document.querySelectorAll('.sec');
  for (var i = 0; i < secs.length; i++) secs[i].classList.remove('on');
  var bBegin = document.getElementById('b-begin');
  if (bBegin) bBegin.addEventListener('click', function () { go(IDS[0]); });
  var bReview = document.getElementById('b-review');
  if (bReview) bReview.addEventListener('click', function () { showCrossReview(); });
  var bResume = document.getElementById('b-resume');
  if (bResume) {
    bResume.addEventListener('click', function () {
      var f = localStorage.getItem('acr_study_last');
      if (f && IDS.indexOf(f) >= 0) go(f);
    });
  }
  var bDaily = document.getElementById('b-daily');
  if (bDaily) bDaily.addEventListener('click', function () { showDailyScroll(); });
  var bHtp = document.getElementById('b-howtoplay');
  if (bHtp) bHtp.addEventListener('click', function () { showHowToPlay(); });
  window.scrollTo(0, 0);
}

// ---- Chapter Breakdown study view ----

function showStudyMode(fid) {
  var i = IDS.indexOf(fid);
  if (i < 0) return;
  loadContent(fid).then(function (data) {
    if (!data) {
      // Algorithmic fallback: show first verses as summary
      var verses = getVerses(fid);
      if (!verses.length) {
        fetch('../data/'+fid+'.json').then(function(r){return r.ok?r.json():null;}).then(function(d){
          if(d){CHAPTER_CACHE[fid]=d;showStudyMode(fid);}else{showStubForMode(fid,'summary');}
        }).catch(function(){showStubForMode(fid,'stub');}); return;
      }
      var secLabel = i >= 0 ? LBL[i] : fid;
      var preview = verses.slice(0, Math.min(5, verses.length)).join(' ');
      var h = '<div class="study-view">';
      h += '<h2 class="sv-title">' + secLabel + '</h2>';
      h += '<div class="sv-sec"><h3>Preview</h3><div class="sv-text">' + preview + '</div></div>';
      h += '<div class="sv-sec"><p class="study-na">Full curated summary, key terms, and FAQ will be added in a future session.</p></div>';
      h += '<button class="study-btn" id="b-back-na">Back to activities</button></div>';
      document.getElementById('content').innerHTML = h;
      document.getElementById('b-back-na').addEventListener('click', function () { go(fid); });
      return;
    }
    var h = '<div class="study-view">';
    h += '<h2 class="sv-title">' + data.label + '</h2>';
    h += '<div class="sv-sec"><h3>Summary</h3>';
    h += '<div id="sv-plain" class="sv-text">' + data.summary_plain + '</div>';
    h += '<div id="sv-deep" class="sv-text" style="display:none">' + data.summary_scholarly + '</div>';
    h += '<button class="sv-toggle" id="b-sum-toggle">Show deeper summary</button></div>';
    h += '<div class="sv-sec"><h3>Key Terms (' + data.key_terms.length + ')</h3>';
    for (var t = 0; t < data.key_terms.length; t++) {
      var k = data.key_terms[t];
      h += '<div class="sv-term"><strong class="sv-tw">' + k.term + '</strong> ';
      h += '<span class="sv-tp">(' + k.phonetic + ')</span> ';
      h += '<span class="sv-td">' + k.definition + '</span></div>';
    }
    h += '</div>';
    h += '<div class="sv-sec"><h3>Questions &amp; Answers (' + data.faq.length + ')</h3>';
    for (var f = 0; f < data.faq.length; f++) {
      h += '<div class="sv-faq"><div class="sv-fq">' + data.faq[f].question + '</div>';
      h += '<div class="sv-fa">' + data.faq[f].answer + '</div></div>';
    }
    h += '</div>';
    h += '<div class="sv-sec sv-actions"><h3>Practice</h3>';
    h += '<button class="study-btn sb-pri" disabled>Fill in the blank (' + data.fill_blank.length + ')</button>';
    h += '<button class="study-btn sb-pri" disabled>Multiple choice (' + data.multiple_choice.length + ')</button>';
    h += '<button class="study-btn sb-pri" disabled>Flashcards (' + ((data.key_terms || []).length + (data.fill_blank || []).length) + ')</button>';
    h += '</div>';
    h += '<button class="study-btn" id="b-back-read">Back to activities</button>';
    h += '</div>';
    document.getElementById('content').innerHTML = h;
    document.getElementById('tb').textContent = 'Study \u2014 ' + LBL[i];
    document.getElementById('b-sum-toggle').addEventListener('click', function () {
      var p = document.getElementById('sv-plain');
      var d = document.getElementById('sv-deep');
      if (p.style.display === 'none') { p.style.display = ''; d.style.display = 'none'; this.textContent = 'Show deeper summary'; }
      else { p.style.display = 'none'; d.style.display = ''; this.textContent = 'Show plain summary'; }
    });
    document.getElementById('b-back-read').addEventListener('click', function () { go(fid); });
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
  });
}

// ---- Curated study content loader ----
// Fetches study/content/file_N.json, caches in-memory per session.
// Returns a Promise that resolves to the content object, or null on failure.

var CONTENT_CACHE = {};

function loadContent(fid) {
  if (CONTENT_CACHE[fid]) return Promise.resolve(CONTENT_CACHE[fid]);
  return fetch('content/' + fid + '.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (d) {
      CONTENT_CACHE[fid] = d;
      return d;
    })
    .catch(function () { return null; });
}

// ---- Notes (per section) ----

function getNotes() {
  try { return JSON.parse(localStorage.getItem('acr_study_notes') || '{}'); }
  catch (e) { return {}; }
}
function getNote(fid) { return getNotes()[fid] || ''; }
function saveNote(fid, t) {
  var n = getNotes();
  if (t && t.trim()) n[fid] = t;
  else delete n[fid];
  try { localStorage.setItem('acr_study_notes', JSON.stringify(n)); } catch (e) {}
}

function closeNP() {
  npop = false;
  var np = document.getElementById('np');
  if (np) np.classList.remove('on');
  var bnt = document.getElementById('b-nt');
  if (bnt) bnt.classList.remove('on');
  var main = document.getElementById('main');
  if (main) main.classList.toggle('vopen', vop);
}

function toggleNV() {
  nvop = !nvop;
  var nv = document.getElementById('nv');
  if (nv) nv.classList.toggle('on', nvop);
  var bnv = document.getElementById('b-nv');
  if (bnv) bnv.classList.toggle('on', nvop);
}

function stopVoice() { /* implemented in follow-up commit */ }
function startPlayback() { /* implemented in follow-up commit */ }

// ---- UI bindings ----

function bindUI() {
  document.getElementById('b-sb').addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      document.getElementById('sb').classList.toggle('m');
    } else {
      sbo = !sbo;
      document.getElementById('sb').classList.toggle('h', !sbo);
      document.getElementById('main').classList.toggle('x', !sbo);
    }
  });

  document.getElementById('b-home').addEventListener('click', goHome);
  document.getElementById('tb').addEventListener('click', goHome);
  document.getElementById('tb').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHome(); }
  });

  document.getElementById('b-fs-').addEventListener('click', function () {
    fs = Math.max(8, fs - 1);
    applyFontSize();
    try { localStorage.setItem('acr_study_fs', fs); } catch (e) {}
  });

  document.getElementById('b-fs+').addEventListener('click', function () {
    fs = Math.min(22, fs + 1);
    applyFontSize();
    try { localStorage.setItem('acr_study_fs', fs); } catch (e) {}
  });

  // Theme cycle: light -> parchment -> navy -> amber -> light
  var themes = ['', 'theme-parchment', 'theme-navy', 'theme-amber'];
  var curTheme = localStorage.getItem('acr_study_theme_mode') || '';
  if (curTheme) document.body.classList.add(curTheme);
  document.getElementById('b-theme').addEventListener('click', function () {
    var idx = themes.indexOf(curTheme);
    document.body.classList.remove(curTheme);
    curTheme = themes[(idx + 1) % themes.length];
    if (curTheme) document.body.classList.add(curTheme);
    try { localStorage.setItem('acr_study_theme_mode', curTheme); } catch (e) {}
    this.classList.toggle('on', curTheme !== '');
  });
  if (curTheme) document.getElementById('b-theme').classList.add('on');

  // Child mode
  document.getElementById('b-child').addEventListener('click', function () {
    toggleChildMode();
    this.classList.toggle('on', childMode);
  });
  if (childMode) document.getElementById('b-child').classList.add('on');

  // Reading aids
  document.getElementById('b-beeline').addEventListener('click', function () {
    toggleBeeline();
    this.classList.toggle('on', beelineOn);
  });
  if (beelineOn) document.getElementById('b-beeline').classList.add('on');
  document.getElementById('b-linefocus').addEventListener('click', function () {
    toggleLineFocus();
    this.classList.toggle('on', lineFocusOn);
  });
  if (lineFocusOn) document.getElementById('b-linefocus').classList.add('on');

  // Notes — per-section textarea, saved under acr_study_notes[fid]
  document.getElementById('b-nt').addEventListener('click', function () {
    npop = !npop;
    document.getElementById('np').classList.toggle('on', npop);
    this.classList.toggle('on', npop);
    document.getElementById('main').classList.toggle('vopen', npop || vop);
    if (npop && cur >= 0) document.getElementById('np-ta').focus();
  });
  document.getElementById('np-cls').addEventListener('click', closeNP);
  document.getElementById('np-save').addEventListener('click', function () {
    if (cur < 0) return;
    saveNote(IDS[cur], document.getElementById('np-ta').value);
    var t = this;
    t.textContent = 'Saved!';
    setTimeout(function () { t.textContent = '\u2713 Save'; }, 1500);
  });
  document.getElementById('np-clr').addEventListener('click', function () {
    document.getElementById('np-ta').value = '';
    if (cur >= 0) saveNote(IDS[cur], '');
  });
  document.getElementById('np-ta').addEventListener('input', function () {
    if (cur >= 0) saveNote(IDS[cur], this.value);
  });

  document.getElementById('b-nv').addEventListener('click', toggleNV);

  // Voice reader — toggle only; speech logic added in follow-up commit
  document.getElementById('b-vt').addEventListener('click', function () {
    vop = !vop;
    document.getElementById('vr').classList.toggle('on', vop);
    document.getElementById('main').classList.toggle('vopen', vop || npop);
    this.classList.toggle('on', vop);
  });
  document.getElementById('b-pl').addEventListener('click', startPlayback);
  document.getElementById('b-pa').addEventListener('click', function () {});
  document.getElementById('b-st').addEventListener('click', stopVoice);
  document.getElementById('b-pv').addEventListener('click', function () {});
  document.getElementById('vs').addEventListener('change', function () {});
  document.getElementById('vc').addEventListener('change', function () {
    var v = ttsVoices[parseInt(this.value)];
    if (v) { try { localStorage.setItem('acr_study_voice', v.name); } catch (e) {} }
  });
  document.getElementById('vm').addEventListener('change', function () {});
}

document.addEventListener('DOMContentLoaded', function () {
  buildTOC();
  bindUI();
  goHome();

  // Font toggle: Atkinson Hyperlegible (default) ↔ OpenDyslexic
  var fontBtn = document.createElement('button');
  fontBtn.className = 'font-toggle-btn';
  fontBtn.textContent = 'Aa';
  fontBtn.title = 'Switch font: Atkinson Hyperlegible / OpenDyslexic';
  fontBtn.setAttribute('aria-label', 'Toggle dyslexic font');
  document.body.appendChild(fontBtn);
  if (localStorage.getItem('acr_study_font') === 'dyslexic') {
    document.body.classList.add('font-dyslexic');
    fontBtn.textContent = 'Dy';
  }
  fontBtn.addEventListener('click', function () {
    var on = document.body.classList.toggle('font-dyslexic');
    this.textContent = on ? 'Dy' : 'Aa';
    try { localStorage.setItem('acr_study_font', on ? 'dyslexic' : 'default'); } catch (e) {}
  });
});

/* ===== Truth Uncovered — game show: Evidence Board + Sealed Scrolls ===== */
var TU = { active:false, fid:null, bookLabel:'', terms:[], fills:[], termPool:[], state:null };
var TU_VALUES = [5,10,25,50,75,100,150,250,400,600,900,1400];
var TU_COLORS = ['#2563eb','#dc2626','#059669','#7c3aed'];
function tuEsc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function tuShort(t,n){ t=String(t==null?'':t); return t.length>n ? t.slice(0,n-1)+'…' : t; }

document.addEventListener('click', function (e) {
  var el = e.target && e.target.closest ? e.target.closest('[data-tu]') : null;
  if (!el) return;
  var a = el.getAttribute('data-tu');
  if (typeof TU[a] === 'function') { e.preventDefault(); TU[a](el.getAttribute('data-arg'), el); }
});
document.addEventListener('input', function (e) {
  var el = e.target && e.target.closest ? e.target.closest('[data-tu-name]') : null;
  if (!el || !TU.state) return;
  var i = parseInt(el.getAttribute('data-tu-name'), 10);
  if (TU.state.teams[i]) TU.state.teams[i].name = el.value;
});

function showTruthUncovered(fid) {
  TU.fid = fid; TU.active = true;
  var idx = IDS.indexOf(fid);
  TU.bookLabel = (idx >= 0 ? LBL[idx].split(' — ')[0] : 'This book');
  var others = shuffle(IDS.filter(function (x) { return x !== fid; })).slice(0, 4);
  var loads = [loadContent(fid)].concat(others.map(function (f) { return loadContent(f); }));
  document.getElementById('content').innerHTML = '<div class="tu-wrap"><div class="tu-msg">Preparing the stage…</div></div>';
  Promise.all(loads).then(function (all) {
    var main = all[0] || {};
    TU.terms = (main.key_terms || []).slice();
    TU.fills = (main.fill_blank || []).slice();
    var pool = [];
    for (var k = 1; k < all.length; k++) { var d = all[k]; if (d && d.key_terms) { for (var t = 0; t < d.key_terms.length; t++) pool.push(d.key_terms[t].term); } }
    TU.termPool = pool;
    TU.state = { view: 'setup', teams: [{ name: 'Team 1', score: 0, color: TU_COLORS[0] }, { name: 'Team 2', score: 0, color: TU_COLORS[1] }], stage: false };
    TU.render();
  }).catch(function () {
    document.getElementById('content').innerHTML = '<div class="tu-wrap"><div class="tu-msg">Could not load content for the game.</div></div>';
  });
}

TU._wrap = function (inner) {
  document.getElementById('content').innerHTML = '<div class="tu-wrap' + (this.state && this.state.stage ? ' tu-stage' : '') + '">' + inner + '</div>';
};
TU._bar = function () {
  var t = this.state.view === 'feud' ? 'Evidence Board' : this.state.view === 'sealed' ? 'Sealed Scrolls' : this.state.view === 'score' ? 'Final Scores' : 'Truth Uncovered';
  return '<div class="tu-bar"><button class="tu-back" data-tu="exit">‹ Back</button><div class="tu-title">' + t + '</div><button class="tu-tv' + (this.state.stage ? ' on' : '') + '" data-tu="toggleStage" aria-label="TV mode">TV</button></div>';
};
TU._teams = function (active) {
  var h = '<div class="tu-teams">';
  this.state.teams.forEach(function (t, i) { h += '<div class="tu-team' + (i === active ? ' active' : '') + '"><div class="tu-tn">' + tuEsc(t.name) + '</div><div class="tu-ts">' + t.score + '</div></div>'; });
  return h + '</div>';
};
TU.render = function () {
  var v = this.state.view;
  if (v === 'setup') this.setup();
  else if (v === 'feud') this.feud();
  else if (v === 'sealed') this.sealed();
  else if (v === 'score') this.scoreboard();
};
TU.exit = function () { TU.active = false; go(TU.fid); };
TU.toggleStage = function () { this.state.stage = !this.state.stage; this.render(); };
TU.teamCount = function (n) {
  n = parseInt(n, 10); var cur = this.state.teams, next = [];
  for (var i = 0; i < n; i++) next.push(cur[i] || { name: 'Team ' + (i + 1), score: 0, color: TU_COLORS[i] });
  this.state.teams = next; this.render();
};
TU.setup = function () {
  var s = this.state, h = this._bar();
  h += '<div class="tu-hero"><div class="tu-hero-t">Truth Uncovered</div><div class="tu-hero-s">' + tuEsc(this.bookLabel) + ' · play in teams around one screen, or tap TV and mirror to the big screen.</div></div>';
  h += '<div class="tu-sec">Teams</div><div class="tu-count">';
  [1, 2, 3, 4].forEach(function (n) { h += '<button class="tu-cbtn' + (s.teams.length === n ? ' on' : '') + '" data-tu="teamCount" data-arg="' + n + '">' + n + '</button>'; });
  h += '</div><div class="tu-teamset">';
  s.teams.forEach(function (t, i) { h += '<div class="tu-teamrow"><span class="tu-dot" style="background:' + t.color + '"></span><input class="tu-in" data-tu-name="' + i + '" value="' + tuEsc(t.name) + '" maxlength="16"></div>'; });
  h += '</div><div class="tu-sec">Choose a show</div><div class="tu-shows">';
  h += '<button class="tu-show tu-showfeud" data-tu="startFeud"><div class="tu-show-t">Evidence Board</div><div class="tu-show-s">Name the top answers. Three strikes and the other team can steal.</div></button>';
  h += '<button class="tu-show tu-showsealed" data-tu="startSealed"><div class="tu-show-t">Sealed Scrolls</div><div class="tu-show-s">Open sealed cases. Take the Scribe\'s offer, or hold.</div></button>';
  h += '</div>';
  this._wrap(h);
};

/* ---- Evidence Board (Family Feud) ---- */
TU.startFeud = function () {
  var s = this.state, terms = this.terms.slice(), self = this;
  if (terms.length < 3) { this._wrap(this._bar() + '<div class="tu-msg">This book has too few key terms for the board. Try a larger section.</div>'); return; }
  terms = shuffle(terms);
  var boards = [], per = terms.length >= 12 ? 6 : Math.min(8, terms.length);
  for (var i = 0; i < terms.length && boards.length < 3; i += per) {
    var chunk = terms.slice(i, i + per);
    if (chunk.length < 3) break;
    var defs = {}, ans = [];
    chunk.forEach(function (k) { ans.push(k.term); defs[k.term] = k.definition; });
    boards.push({ prompt: 'Name key terms from ' + self.bookLabel, answers: ans, defs: defs });
  }
  if (!boards.length) { this._wrap(this._bar() + '<div class="tu-msg">Not enough terms.</div>'); return; }
  s.view = 'feud'; s.feud = { boards: boards, round: 0 };
  this._feudRound();
};
TU._feudRound = function () {
  var s = this.state, f = s.feud, b = f.boards[f.round];
  var decoys = shuffle(this.termPool.filter(function (t) { return b.answers.indexOf(t) < 0; })).slice(0, 5);
  f.cur = { prompt: b.prompt, answers: b.answers.slice(), defs: b.defs, pool: shuffle(b.answers.concat(decoys)), found: {}, used: {}, strikes: 0, pot: 0, phase: s.teams.length > 1 ? 'faceoff' : 'play', control: 0, revealed: false };
  this.render();
};
TU._other = function (t) { return this.state.teams.length > 1 ? (t + 1) % this.state.teams.length : t; };
TU.feudFace = function (team) { this.state.feud.cur.control = parseInt(team, 10); this.state.feud.cur.phase = 'play'; this.render(); };
TU.feud = function () {
  var s = this.state, f = s.feud, c = f.cur, self = this;
  var h = this._teams(c.phase === 'steal' ? this._other(c.control) : c.control) + this._bar();
  h += '<div class="tu-prompt"><span class="tu-round">Round ' + (f.round + 1) + ' of ' + f.boards.length + '</span>' + tuEsc(c.prompt) + '</div>';
  if (c.phase === 'faceoff') {
    h += '<div class="tu-banner">Face-off. Who won the buzz and takes control?</div><div class="tu-choice">';
    s.teams.forEach(function (t, i) { h += '<button class="tu-cbtn2" data-tu="feudFace" data-arg="' + i + '">' + tuEsc(t.name) + '</button>'; });
    h += '</div>'; this._wrap(h); return;
  }
  var who = c.phase === 'steal' ? (tuEsc(s.teams[this._other(c.control)].name) + ' may steal') : (tuEsc(s.teams[c.control].name) + ' is playing');
  h += '<div class="tu-banner">' + who + '<span class="tu-pot">Pot ' + c.pot + '</span></div>';
  h += '<div class="tu-strikes">' + [0, 1, 2].map(function (i) { return '<span class="tu-x' + (i < c.strikes ? ' on' : '') + '">X</span>'; }).join('') + '</div>';
  h += '<div class="tu-board">';
  c.answers.forEach(function (a, i) {
    var open = c.found[i], rev = c.revealed && !open;
    h += '<div class="tu-slot' + (open ? ' open' : '') + (rev ? ' rev' : '') + '"><span class="tu-rank">' + (i + 1) + '</span><span class="tu-ans">' + ((open || rev) ? tuEsc(a) : '') + '</span></div>';
    if ((open || rev) && c.defs[a]) h += '<div class="tu-def">' + tuEsc(tuShort(c.defs[a], 120)) + '</div>';
  });
  h += '</div>';
  if (!c.revealed) {
    var act = c.phase === 'steal' ? 'feudSteal' : 'feudGuess';
    h += '<div class="tu-sec">Tap the answer</div><div class="tu-pool">';
    c.pool.forEach(function (p, i) { h += '<button class="tu-cand' + (c.used[i] ? ' used' : '') + '" data-tu="' + act + '" data-arg="' + i + '">' + tuEsc(p) + '</button>'; });
    h += '</div>';
  } else {
    h += '<button class="tu-next" data-tu="feudNext">' + (f.round + 1 < f.boards.length ? 'Next Round' : 'See Final Scores') + '</button>';
  }
  this._wrap(h);
};
TU.feudGuess = function (pi) {
  pi = parseInt(pi, 10); var c = this.state.feud.cur; if (c.revealed || c.used[pi]) return; c.used[pi] = true;
  var ai = c.answers.indexOf(c.pool[pi]);
  if (ai >= 0 && !c.found[ai]) { c.found[ai] = true; c.pot += 100; if (Object.keys(c.found).length === c.answers.length) { return this._feudBank(c.control); } }
  else { c.strikes++; if (c.strikes >= 3) { if (this.state.teams.length > 1) { c.phase = 'steal'; } else { return this._feudBank(c.control); } } }
  this.render();
};
TU.feudSteal = function (pi) {
  pi = parseInt(pi, 10); var c = this.state.feud.cur; if (c.revealed || c.used[pi]) return; c.used[pi] = true;
  var ai = c.answers.indexOf(c.pool[pi]);
  if (ai >= 0 && !c.found[ai]) { c.found[ai] = true; c.pot += 100; this._feudBank(this._other(c.control)); }
  else { this._feudBank(c.control); }
};
TU._feudBank = function (team) { var c = this.state.feud.cur; this.state.teams[team].score += c.pot; c.revealed = true; recordSession(TU.fid, 'truthuncovered', 1, 1); this.render(); };
TU.feudNext = function () { var f = this.state.feud; f.round++; if (f.round >= f.boards.length) { this.state.view = 'score'; this.render(); } else { this._feudRound(); } };

/* ---- Sealed Scrolls (Deal or No Deal) ---- */
TU.startSealed = function () {
  if (this.state.teams.length > 1) { this.state.view = 'sealed'; this.state.sealed = { phase: 'team' }; this.render(); }
  else { this.sealedBegin(0); }
};
TU.sealedBegin = function (team) {
  team = parseInt(team, 10);
  var facts = [];
  this.terms.forEach(function (k) { if (k.definition) facts.push(k.term + ': ' + k.definition); });
  this.fills.forEach(function (q) { if (q.answer) facts.push('Fill the blank: ' + q.prompt.replace('______', '_____') + ' Answer: ' + q.answer); });
  facts = shuffle(facts.length ? facts : ['A sealed testimony of the record.']);
  var vals = shuffle(TU_VALUES.slice());
  var cases = vals.map(function (v, i) { return { i: i, value: v, fact: facts[i % facts.length], open: false }; });
  this.state.view = 'sealed';
  this.state.sealed = { team: team, cases: cases, mine: null, phase: 'pick', round: 0, rounds: [3, 2, 2, 1, 1, 1], opensLeft: 0, offer: 0, lastFact: null };
  this.render();
};
TU._sealRemain = function () { return this.state.sealed.cases.filter(function (c) { return !c.open; }); };
TU.sealedPick = function (i) { i = parseInt(i, 10); var d = this.state.sealed; d.mine = i; d.cases[i].mine = true; d.phase = 'open'; d.round = 0; d.opensLeft = d.rounds[0]; this.render(); };
TU.sealedOpen = function (i) {
  i = parseInt(i, 10); var d = this.state.sealed, c = d.cases[i];
  if (c.open || i === d.mine || d.phase !== 'open') return;
  c.open = true; d.lastFact = c.fact + ' (' + c.value + ' pts)'; d.opensLeft--;
  if (d.opensLeft <= 0) { var rem = this._sealRemain().map(function (x) { return x.value; }); var mean = rem.reduce(function (a, b) { return a + b; }, 0) / rem.length; var frac = Math.min(0.95, 0.35 + 0.12 * d.round); d.offer = Math.max(5, Math.round(mean * frac / 5) * 5); d.phase = 'offer'; }
  this.render();
};
TU.sealedDeal = function () { var d = this.state.sealed; this.state.teams[d.team].score += d.offer; d.result = { took: 'deal', amount: d.offer, inCase: d.cases[d.mine].value }; d.phase = 'done'; d.cases.forEach(function (c) { c.open = true; }); recordSession(TU.fid, 'truthuncovered', 1, 1); this.render(); };
TU.sealedNoDeal = function () { var d = this.state.sealed; d.round++; var rem = this._sealRemain().filter(function (c) { return c.i !== d.mine; }); if (rem.length <= 1) { d.phase = 'final'; } else { d.opensLeft = Math.min(d.rounds[d.round] || 1, rem.length - 1); d.phase = 'open'; } this.render(); };
TU.sealedFinal = function (keep) {
  var d = this.state.sealed, mineCase = d.cases[d.mine];
  if (keep === '0') { var other = this._sealRemain().filter(function (c) { return c.i !== d.mine; })[0]; if (other) { d.mine = other.i; mineCase = other; } }
  this.state.teams[d.team].score += mineCase.value; d.result = { took: 'hold', amount: mineCase.value }; d.phase = 'done'; d.cases.forEach(function (c) { c.open = true; }); recordSession(TU.fid, 'truthuncovered', 1, 1); this.render();
};
TU.toScore = function () { this.state.view = 'score'; this.render(); };
TU.sealed = function () {
  var s = this.state, d = s.sealed;
  if (d.phase === 'team') {
    var h0 = this._bar() + '<div class="tu-banner">Which team takes the cases?</div><div class="tu-choice">';
    s.teams.forEach(function (t, i) { h0 += '<button class="tu-cbtn2" data-tu="sealedBegin" data-arg="' + i + '">' + tuEsc(t.name) + '</button>'; });
    this._wrap(h0 + '</div>'); return;
  }
  var h = this._teams(d.team) + this._bar();
  var sub = d.phase === 'pick' ? 'Pick one sealed case to hold as your own.' : d.phase === 'open' ? ('Open ' + d.opensLeft + ' more case' + (d.opensLeft === 1 ? '' : 's') + ' to reveal what they held.') : '';
  h += '<div class="tu-prompt"><span class="tu-round">Sealed Scrolls</span>' + sub + '</div>';
  if (d.lastFact && d.phase !== 'done') h += '<div class="tu-fact">Opened: ' + tuEsc(d.lastFact) + '</div>';
  h += '<div class="tu-ladder">' + TU_VALUES.slice().sort(function (a, b) { return a - b; }).map(function (v) { var gone = d.cases.some(function (c) { return c.open && c.value === v; }); return '<div class="tu-lad' + (gone ? ' gone' : '') + '"><span>Restoration</span><span class="tu-lv">' + v + '</span></div>'; }).join('') + '</div>';
  if (d.phase === 'offer') {
    h += '<div class="tu-offer"><div class="tu-offk">The Scribe offers</div><div class="tu-offv">' + d.offer + '</div><div class="tu-offs">Take the offer and give up your case, or hold the truth and keep opening.</div></div>';
    h += '<div class="tu-choice"><button class="tu-deal" data-tu="sealedDeal">Deal</button><button class="tu-nodeal" data-tu="sealedNoDeal">No Deal</button></div>';
    this._wrap(h); return;
  }
  if (d.phase === 'final') {
    h += '<div class="tu-banner">Two cases left. Keep your sealed case, or swap it?</div><div class="tu-choice"><button class="tu-deal" data-tu="sealedFinal" data-arg="1">Keep mine</button><button class="tu-cbtn2" data-tu="sealedFinal" data-arg="0">Swap</button></div>';
    this._wrap(h); return;
  }
  if (d.phase === 'done') {
    var r = d.result;
    h += '<div class="tu-offer"><div class="tu-offk">' + (r.took === 'deal' ? 'You took the offer' : 'You held the truth') + '</div><div class="tu-offv">' + r.amount + '</div><div class="tu-offs">' + (r.took === 'deal' ? ('Your sealed case held ' + r.inCase + '. ' + (r.inCase > r.amount ? 'The truth was worth more than the Scribe paid.' : 'A fair trade this time.')) : ('Added to ' + tuEsc(s.teams[d.team].name) + '.')) + '</div></div>';
    h += '<button class="tu-next" data-tu="toScore">See Final Scores</button>';
    this._wrap(h); return;
  }
  h += '<div class="tu-cases">';
  d.cases.forEach(function (c) {
    if (c.open) { h += '<div class="tu-case open">' + c.value + '</div>'; }
    else { var mine = c.i === d.mine; var act = d.phase === 'pick' ? 'sealedPick' : (mine ? '' : 'sealedOpen'); h += '<button class="tu-case' + (mine ? ' mine' : '') + '"' + (act ? ' data-tu="' + act + '" data-arg="' + c.i + '"' : ' disabled') + '>' + (mine ? 'MINE' : (c.i + 1)) + '</button>'; }
  });
  this._wrap(h + '</div>');
};
TU.scoreboard = function () {
  var s = this.state, ranked = s.teams.map(function (t, i) { return { t: t, i: i }; }).sort(function (a, b) { return b.t.score - a.t.score; });
  var h = this._bar() + '<div class="tu-final"><div class="tu-winbadge">' + lbIcon('trophy', 40) + '</div><div class="tu-wint">' + tuEsc(ranked[0].t.name) + ' wins</div><div class="tu-wins">' + ranked[0].t.score + ' points</div>';
  h += '<div class="tu-rank">' + ranked.map(function (r, idx) { return '<div class="tu-team' + (idx === 0 ? ' active' : '') + '" style="display:flex;justify-content:space-between;padding:12px 14px;margin-bottom:8px"><span class="tu-tn">' + (idx + 1) + '. ' + tuEsc(r.t.name) + '</span><span class="tu-ts">' + r.t.score + '</span></div>'; }).join('') + '</div>';
  h += '<button class="tu-next" data-tu="playAgain">Play Another Show</button></div>';
  this._wrap(h);
};
TU.playAgain = function () { this.state.view = 'setup'; this.render(); };

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}

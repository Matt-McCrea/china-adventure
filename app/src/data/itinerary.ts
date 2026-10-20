import type { Chapter, Idea, RouteSegment, Stop, Waypoint } from "./types";

/**
 * THE ITINERARY. Edit this file to change dates, stops, trains or copy.
 * Coordinates: OpenStreetMap (Nominatim / Overpass), checked Sept 2026.
 * Rail geometry is regenerated from `osmLines` by `npm run build:routes`.
 */

export const TRIP = {
  title: "China Adventure",
  start: "2026-10-02",
  end: "2026-10-27",
  arrival: "chongqing",
  departure: "xian",
  travellers: "Matthew & Aymon",
  strap: "Matthew and Aymon crossing China by train, bus and whatever local transport gets them there.",
  roughPlanNote: "After Hotan the plan is rough. Places, dates and trains may still change as we go.",
};

export const CHAPTERS: Chapter[] = [
  { id: "south", numeral: "I", title: "Mountain city & Guizhou", label: { lon: 110.2, lat: 28.4 } },
  { id: "sichuan", numeral: "II", title: "Sichuan", label: { lon: 101.6, lat: 30.9 } },
  { id: "xinjiang", numeral: "III", title: "Taklamakan rail corridor", label: { lon: 82.9, lat: 38.9 } },
  { id: "xian", numeral: "IV", title: "Xi'an", label: { lon: 111.4, lat: 34.9 } },
];

const OSM = "OpenStreetMap place node";

export const STOPS: Stop[] = [
  {
    id: "chongqing", number: 1, chapter: "south",
    dateStart: "2026-10-02", dateEnd: "2026-10-03",
    city: "Chongqing", chineseName: "重庆", region: "Chongqing", regionZh: "重庆市",
    longitude: 106.5479, latitude: 29.5657, confidence: "verified", coordSource: `${OSM} (Yuzhong)`,
    kicker: "Mountain city",
    highlights: ["Street food", "Old neighbourhoods & markets", "Monorail and stairs", "The city at night"],
    icon: "city",
  },
  {
    id: "taipan", number: 2, chapter: "south",
    dateStart: "2026-10-04", dateEnd: "2026-10-06",
    city: "Taipan Village", chineseName: "台盘村", locality: "台江县 Taijiang · 黔东南 Qiandongnan",
    region: "Guizhou", regionZh: "贵州",
    longitude: 108.1568, latitude: 26.6777, confidence: "approximate",
    coordSource: "OSM node for Taipan township (台盘乡) centre; the court itself is not mapped",
    kicker: "Village basketball",
    highlights: ["村BA 球王争霸赛 national finals", "Final day 5 Oct (per current event info)", "Village crowds & food stalls"],
    icon: "basketball",
    bigMoment: "村BA",
  },
  {
    id: "guiyang", number: 3, chapter: "south",
    dateStart: "2026-10-07", dateEnd: "2026-10-08",
    city: "Guiyang", chineseName: "贵阳", region: "Guizhou", regionZh: "贵州",
    longitude: 106.7088, latitude: 26.5876, confidence: "verified", coordSource: "OSM, Penshuichi (city centre)",
    kicker: "Guizhou regroup",
    highlights: ["Night markets", "Train reset day", "Street food and tea"],
    icon: "city",
  },
  {
    id: "chengdu", number: 4, chapter: "sichuan",
    dateStart: "2026-10-09", dateEnd: "2026-10-13",
    city: "Chengdu", chineseName: "成都", region: "Sichuan", regionZh: "四川",
    longitude: 104.0633, latitude: 30.6598, confidence: "verified", coordSource: "OSM, Tianfu Square",
    kicker: "Teahouses & Sichuan food",
    highlights: ["Sichuan food", "Teahouses", "Neighbourhood street life", "The relaxed pace"],
    icon: "teahouse",
  },
  {
    id: "kashgar", number: 5, chapter: "xinjiang",
    dateStart: "2026-10-14", dateEnd: "2026-10-15",
    city: "Kashgar", chineseName: "喀什", region: "Xinjiang", regionZh: "新疆",
    longitude: 75.9842, latitude: 39.4722, confidence: "verified", coordSource: "OSM, Id Kah Mosque (Old City)",
    kicker: "The far west",
    highlights: ["Old City lanes", "Markets & the livestock market", "Tea houses & bread ovens", "Everyday Uyghur life"],
    icon: "market",
    bigMoment: "Far west",
  },
  {
    id: "shache", number: 6, chapter: "xinjiang",
    dateStart: "2026-10-16", dateEnd: "2026-10-18",
    city: "Shache / Yarkant", chineseName: "莎车", region: "Xinjiang", regionZh: "新疆",
    longitude: 77.2486, latitude: 38.4148, confidence: "verified", coordSource: `${OSM} (Yarkant old town area)`,
    kicker: "Desert-edge market town",
    highlights: ["Uyghur bazaar streets", "Rail stop on the southern rim", "Gateway to Hotan corridor"],
    icon: "oasis",
  },
  {
    id: "hotan", number: 7, chapter: "xinjiang",
    dateStart: "2026-10-19", dateEnd: "2026-10-20",
    city: "Hotan", chineseName: "和田", region: "Xinjiang", regionZh: "新疆",
    longitude: 79.9272, latitude: 37.1143, confidence: "verified", coordSource: `${OSM} (city centre)`,
    kicker: "Southern Taklamakan rail bend",
    highlights: ["Jade-and-fruit markets", "Kunlun foothill oasis", "Start of the long eastbound desert run"],
    icon: "oasis",
  },
  {
    id: "turpan", tentative: true, number: 8, chapter: "xinjiang",
    dateStart: "2026-10-21", dateEnd: "2026-10-22",
    city: "Turpan", chineseName: "吐鲁番", region: "Xinjiang", regionZh: "新疆",
    longitude: 89.1796, latitude: 42.9425, confidence: "verified", coordSource: OSM,
    kicker: "Oasis in the depression",
    highlights: ["Vineyards", "Old settlements", "Extreme arid landscape"],
    icon: "oasis",
  },
  {
    id: "xining", tentative: true, number: 9, chapter: "xian",
    dateStart: "2026-10-23", dateEnd: "2026-10-24",
    city: "Xining", chineseName: "西宁", region: "Qinghai", regionZh: "青海",
    longitude: 101.7762, latitude: 36.6173, confidence: "verified", coordSource: "OSM, Xining station area",
    kicker: "Qinghai plateau stopover",
    highlights: ["Plateau city break", "Old quarter food streets", "Gateway to Qinghai landscapes"],
    icon: "city",
  },
  {
    id: "xian", tentative: true, number: 10, chapter: "xian",
    dateStart: "2026-10-25", dateEnd: "2026-10-27",
    city: "Xi'an", chineseName: "西安", region: "Shaanxi", regionZh: "陕西",
    longitude: 108.9423, latitude: 34.261, confidence: "verified", coordSource: "OSM, Bell Tower",
    kicker: "End of the line",
    highlights: ["Muslim Quarter food", "Old city walls & markets", "Decompression", "27 Oct: fly home"],
    icon: "gate",
    bigMoment: "Finish",
  },
];

/** Stations & transfer points (OSM railway=station nodes unless noted). */
export const WAYPOINTS: Waypoint[] = [
  { id: "cq-west", name: "Chongqing West", chineseName: "重庆西", longitude: 106.4322, latitude: 29.5029, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "kaili-south", name: "Kaili South", chineseName: "凯里南", longitude: 107.8838, latitude: 26.5177, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "kaili", name: "Kaili", chineseName: "凯里", longitude: 107.9718, latitude: 26.6065, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "guiyang-stn", name: "Guiyang", chineseName: "贵阳站", longitude: 106.6998, latitude: 26.561, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "guiyang-east", name: "Guiyang East", chineseName: "贵阳东", longitude: 106.7407, latitude: 26.6676, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "chengdu-east", name: "Chengdu East", chineseName: "成都东", longitude: 104.1389, latitude: 30.6313, confidence: "verified", coordSource: "OSM station", kind: "station" },
  // T60 routing points (stations the train calls at; used only to trace the track)
  { id: "chengdu-west", name: "Chengdu West", chineseName: "成都西", longitude: 103.9775, latitude: 30.6879, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "guangyuan", name: "Guangyuan", chineseName: "广元", longitude: 105.818, latitude: 32.4527, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "lanzhou", name: "Lanzhou", chineseName: "兰州", longitude: 103.8485, latitude: 36.0342, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "wuwei", name: "Wuwei", chineseName: "武威", longitude: 102.6222, latitude: 37.9037, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "jiayuguan", name: "Jiayuguan", chineseName: "嘉峪关", longitude: 98.2539, latitude: 39.7638, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "turpan-north", name: "Turpan North", chineseName: "吐鲁番北", longitude: 89.108, latitude: 43.0214, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "aksu", name: "Aksu", chineseName: "阿克苏", longitude: 80.3045, latitude: 41.1438, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "kashgar-stn", name: "Kashgar station", chineseName: "喀什站", longitude: 76.0461, latitude: 39.4921, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "shache-stn", name: "Shache / Yarkant station", chineseName: "莎车站", longitude: 77.2243, latitude: 38.4046, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "hotan-stn", name: "Hotan station", chineseName: "和田站", longitude: 79.8875, latitude: 37.146, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "minfeng", name: "Minfeng", chineseName: "民丰", longitude: 82.6831, latitude: 37.0611, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "qiemo", name: "Qiemo", chineseName: "且末", longitude: 85.5369, latitude: 38.1404, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "ruoqiang", name: "Ruoqiang", chineseName: "若羌", longitude: 88.1704, latitude: 39.0176, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "korla", name: "Korla", chineseName: "库尔勒", longitude: 86.1196, latitude: 41.7564, confidence: "verified", coordSource: "OSM station", kind: "via" },
  { id: "turpan-stn", name: "Turpan station (Daheyan)", chineseName: "吐鲁番站", longitude: 88.8723, latitude: 43.1499, confidence: "verified", coordSource: "OSM station", kind: "transfer" },
  { id: "xining-stn", name: "Xining", chineseName: "西宁", longitude: 101.7754, latitude: 36.6209, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "xian-north", name: "Xi'an North", chineseName: "西安北", longitude: 108.934, latitude: 34.3777, confidence: "verified", coordSource: "OSM station", kind: "station" },
];

/** OSM railway line relations (route=railway), see scripts/build-routes.ts */
export const LINES = {
  yuGui: 7945163, // 渝贵铁路 Chongqing–Guiyang
  huKunHSR: 10627959, // 沪昆高速线
  huKun: 14031196, // 沪昆线 (conventional, ex-湘黔)
  xiangQian: 1138440, // (原)湘黔线
  chengGuiHSR: 7754722, // 成贵客运专线
  nanjiang: 163712, // 南疆线 Southern Xinjiang
  lanxin: 163418, // 兰新线 Lanzhou–Xinjiang (conventional)
  lanxinHSR: 1043244, // 兰新客专线
  xulanHSR: 6651966, // 徐兰高速线
  baocheng: 1912130, // 宝成线 Baoji–Chengdu
  lanyu: 7873545, // 兰渝线 Lanzhou–Chongqing
  longhai: 284857, // 陇海线 (through Lanzhou)
  links: [14650524, 19421724, 19421725, 19421730, 11286955, 10747024], // 联络线 junction links
};

export const SEGMENTS: RouteSegment[] = [
  {
    id: "cq-kaili", from: "cq-west", to: "kaili-south", mode: "rail", leg: "taipan", date: "2026-10-04",
    transport: "High-speed rail via Guiyang", serviceStatus: "tbc",
    osmLines: [LINES.yuGui, LINES.huKunHSR, ...LINES.links],
  },
  {
    id: "kaili-taipan", from: "kaili-south", to: "taipan", mode: "local", leg: "taipan", date: "2026-10-04",
    transport: "Local bus or shared taxi", serviceStatus: "planned",
  },
  {
    id: "taipan-kaili", from: "taipan", to: "kaili", mode: "local", leg: "guiyang", date: "2026-10-07",
    transport: "Local bus or shared taxi back to Kaili", serviceStatus: "planned",
  },
  {
    id: "kaili-guiyang", from: "kaili", to: "guiyang-stn", mode: "rail", leg: "guiyang", date: "2026-10-07",
    transport: "Train, Kaili → Guiyang", serviceStatus: "tbc",
    osmLines: [LINES.huKun, LINES.xiangQian],
  },
  {
    id: "guiyang-chengdu", from: "guiyang-east", to: "chengdu-east", mode: "rail", leg: "chengdu", date: "2026-10-09",
    transport: "High-speed rail, Chengdu–Guiyang line", serviceStatus: "tbc",
    osmLines: [LINES.chengGuiHSR, ...LINES.links],
  },
  {
    id: "chengdu-kashgar", from: "chengdu-west", to: "kashgar-stn", mode: "rail", leg: "kashgar", date: "2026-10-12", dateEnd: "2026-10-14",
    transport: "Two-day sleeper train", service: "T60", serviceStatus: "confirmed", longJourney: true,
    notes: "Tracked along the rail network from Chengdu to Kashgar via Guangyuan, Lanzhou and the Lanzhou–Xinjiang corridor.",
    osmRoute: [
      { via: "guangyuan", lines: [LINES.baocheng, 19440382] },
      { via: "lanzhou", lines: [LINES.lanyu, LINES.longhai] },
      { via: "wuwei", lines: [LINES.lanxin, LINES.longhai] },
      { via: "jiayuguan", lines: [LINES.lanxin] },
      { via: "turpan-north", lines: [LINES.lanxinHSR, LINES.lanxin] },
      { via: "aksu", lines: [LINES.nanjiang, LINES.lanxinHSR, LINES.lanxin] },
      { via: "kashgar-stn", lines: [LINES.nanjiang] },
    ],
  },
  {
    id: "kashgar-shache", from: "kashgar-stn", to: "shache-stn", mode: "rail", leg: "shache", date: "2026-10-16",
    transport: "Train, Kashgar → Shache / Yarkant", serviceStatus: "tbc",
    osmLines: [LINES.nanjiang],
  },
  {
    id: "shache-hotan", from: "shache-stn", to: "hotan-stn", mode: "rail", leg: "hotan", date: "2026-10-19",
    transport: "Train, Shache / Yarkant → Hotan", serviceStatus: "tbc",
    osmLines: [LINES.nanjiang],
  },
  {
    id: "hotan-turpan", from: "hotan-stn", to: "turpan-stn", mode: "rail", leg: "turpan", date: "2026-10-21",
    transport: "Train east via Minfeng, Qiemo, Ruoqiang and Korla to Turpan", serviceStatus: "tbc",
    osmRoute: [
      { via: "minfeng", lines: [LINES.nanjiang] },
      { via: "qiemo", lines: [LINES.nanjiang] },
      { via: "ruoqiang", lines: [LINES.nanjiang] },
      { via: "korla", lines: [LINES.nanjiang] },
      { via: "turpan-stn", lines: [LINES.nanjiang, LINES.lanxinHSR, LINES.lanxin] },
    ],
  },
  {
    id: "daheyan-turpan", from: "turpan-stn", to: "turpan", mode: "local", leg: "turpan", date: "2026-10-21",
    transport: "Local bus or taxi into Turpan", serviceStatus: "planned",
    notes: "Turpan's conventional station is at Daheyan, well outside the city.",
  },
  {
    id: "turpan-xining", from: "turpan-stn", to: "xining-stn", mode: "rail", leg: "xining", date: "2026-10-23",
    transport: "High-speed rail toward Qinghai", serviceStatus: "tbc",
    osmLines: [LINES.lanxinHSR, LINES.lanxin, LINES.xulanHSR],
  },
  {
    id: "xining-xian", from: "xining-stn", to: "xian-north", mode: "rail", leg: "xian", date: "2026-10-25",
    transport: "High-speed rail to Xi'an", serviceStatus: "tbc",
    osmLines: [LINES.xulanHSR, LINES.longhai],
  },
];

/** Ideas for the loose second half (not booked). Coordinates: OpenStreetMap, Sept 2026. */
export const IDEAS: Idea[] = [];

/** Faint reference cities for orientation only — not part of the route. */
export const CONTEXT_CITIES = [
  { name: "Beijing", zh: "北京", lon: 116.3913, lat: 39.9057 },
  { name: "Shanghai", zh: "上海", lon: 121.47, lat: 31.2313 },
  { name: "Ürümqi", zh: "乌鲁木齐", lon: 87.6139, lat: 43.8244 },
  { name: "Lhasa", zh: "拉萨", lon: 91.1173, lat: 29.6542 },
  { name: "Kunming", zh: "昆明", lon: 102.7169, lat: 25.0399 },
];

/** Physical-geography labels (names from Natural Earth; anchors placed by hand). */
export const PHYSICAL_LABELS = [
  { name: "Taklimakan", sub: "Tarim Basin", lon: 83.2, lat: 39.4, size: 3 },
  { name: "Tian Shan", lon: 84.0, lat: 42.9, size: 2 },
  { name: "Plateau of Tibet", lon: 88.0, lat: 32.6, size: 3 },
  { name: "Kunlun Mountains", lon: 86.5, lat: 36.3, size: 1 },
  { name: "Qilian Shan", lon: 98.2, lat: 38.4, size: 1 },
  { name: "Gobi", lon: 104.0, lat: 42.6, size: 3 },
  { name: "Sichuan Basin", lon: 105.9, lat: 30.9, size: 1 },
  { name: "Yungui Plateau", lon: 104.2, lat: 25.6, size: 1 },
  { name: "Himalaya", lon: 85.0, lat: 28.9, size: 1 },
  { name: "Pamirs", lon: 74.4, lat: 38.4, size: 1 },
];

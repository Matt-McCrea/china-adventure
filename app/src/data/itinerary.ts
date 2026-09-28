import type { Chapter, RouteSegment, Stop, Waypoint } from "./types";

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
  strap: "Two friends crossing China by train, bus and whatever local transport gets them there.",
};

export const CHAPTERS: Chapter[] = [
  { id: "south", numeral: "I", title: "Mountain city & Guizhou", label: { lon: 110.2, lat: 28.4 } },
  { id: "sichuan", numeral: "II", title: "Sichuan", label: { lon: 101.6, lat: 30.9 } },
  { id: "west", numeral: "III", title: "Across the west", label: { lon: 90.5, lat: 35.0 } },
  { id: "xinjiang", numeral: "IV", title: "Southern Xinjiang", label: { lon: 80.6, lat: 37.4 } },
  { id: "hexi", numeral: "V", title: "Hexi Corridor", label: { lon: 98.2, lat: 41.4 } },
  { id: "xian", numeral: "VI", title: "Xi'an", label: { lon: 111.4, lat: 34.9 } },
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
    dateStart: "2026-10-04", dateEnd: "2026-10-05",
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
    id: "zhenyuan", number: 3, chapter: "south",
    dateStart: "2026-10-06", dateEnd: "2026-10-07",
    city: "Zhenyuan", chineseName: "镇远", locality: "黔东南 Qiandongnan",
    region: "Guizhou", regionZh: "贵州",
    longitude: 108.4254, latitude: 27.0522, confidence: "verified", coordSource: `${OSM} (old town)`,
    kicker: "Old river town",
    highlights: ["Wuyang River at night", "Zhusheng Bridge 祝圣桥", "Shiping Mountain 石屏山 at dawn", "Sour fish soup"],
    icon: "river",
  },
  {
    id: "tiexi", number: 4, chapter: "south",
    dateStart: "2026-10-07", dateEnd: "2026-10-07",
    city: "Tiexi Valley", chineseName: "铁溪", locality: "towards Longtan 龙潭",
    region: "Guizhou", regionZh: "贵州",
    longitude: 108.43, latitude: 27.09, confidence: "approximate",
    coordSource: "Not mapped in OSM; placed ~4 km north of Zhenyuan town per Baidu Baike / Ctrip",
    kicker: "Karst valley walk",
    highlights: ["Walk up the valley to Longtan", "Farmhouses & riverside lunch", "Limestone gorge"],
    icon: "valley",
    minor: true,
  },
  {
    id: "guiyang", number: 5, chapter: "south",
    dateStart: "2026-10-08", dateEnd: "2026-10-08",
    city: "Guiyang", chineseName: "贵阳", region: "Guizhou", regionZh: "贵州",
    longitude: 106.7088, latitude: 26.5876, confidence: "verified", coordSource: "OSM, Penshuichi (city centre)",
    kicker: "Buffer day",
    highlights: ["City day & night market", "Optional: Qingyan Ancient Town 青岩古镇"],
    icon: "city",
  },
  {
    id: "chengdu", number: 6, chapter: "sichuan",
    dateStart: "2026-10-09", dateEnd: "2026-10-11",
    city: "Chengdu", chineseName: "成都", region: "Sichuan", regionZh: "四川",
    longitude: 104.0633, latitude: 30.6598, confidence: "verified", coordSource: "OSM, Tianfu Square",
    kicker: "Teahouses & Sichuan food",
    highlights: ["Sichuan food", "Teahouses", "Neighbourhood street life", "The relaxed pace"],
    icon: "teahouse",
  },
  {
    id: "kashgar", number: 7, chapter: "xinjiang",
    dateStart: "2026-10-14", dateEnd: "2026-10-15",
    city: "Kashgar", chineseName: "喀什", region: "Xinjiang", regionZh: "新疆",
    longitude: 75.9842, latitude: 39.4722, confidence: "verified", coordSource: "OSM, Id Kah Mosque (Old City)",
    kicker: "The far west",
    highlights: ["Old City lanes", "Markets & the livestock market", "Tea houses & bread ovens", "Everyday Uyghur life"],
    icon: "market",
    bigMoment: "Far west",
  },
  {
    id: "kuqa", number: 8, chapter: "xinjiang",
    dateStart: "2026-10-16", dateEnd: "2026-10-17",
    city: "Kuqa", chineseName: "库车", region: "Xinjiang", regionZh: "新疆",
    longitude: 82.9544, latitude: 41.7135, confidence: "verified", coordSource: OSM,
    kicker: "Southern Xinjiang",
    highlights: ["Markets & food", "Local city life", "Silk Road history"],
    icon: "oasis",
  },
  {
    id: "turpan", number: 9, chapter: "xinjiang",
    dateStart: "2026-10-18", dateEnd: "2026-10-18",
    city: "Turpan", chineseName: "吐鲁番", region: "Xinjiang", regionZh: "新疆",
    longitude: 89.1796, latitude: 42.9425, confidence: "verified", coordSource: OSM,
    kicker: "Oasis in the depression",
    highlights: ["Vineyards", "Old settlements", "Extreme arid landscape"],
    icon: "oasis",
  },
  {
    id: "hami", number: 10, chapter: "hexi",
    dateStart: "2026-10-19", dateEnd: "2026-10-19",
    city: "Hami", chineseName: "哈密", region: "Xinjiang", regionZh: "新疆",
    longitude: 93.513, latitude: 42.8255, confidence: "verified", coordSource: OSM,
    kicker: "Eastern Xinjiang",
    highlights: ["Oasis city", "Desert approach by train"],
    icon: "oasis",
  },
  {
    id: "dunhuang", number: 11, chapter: "hexi",
    dateStart: "2026-10-20", dateEnd: "2026-10-20",
    city: "Dunhuang", chineseName: "敦煌", region: "Gansu", regionZh: "甘肃",
    longitude: 94.6611, latitude: 40.1387, confidence: "verified", coordSource: "OSM, Shazhou town centre",
    kicker: "Desert & caves",
    highlights: ["Mogao Caves", "Dunes at the edge of town", "Silk Road"],
    icon: "dune",
    bigMoment: "Desert",
  },
  {
    id: "zhangye", number: 12, chapter: "hexi",
    dateStart: "2026-10-21", dateEnd: "2026-10-21",
    city: "Zhangye", chineseName: "张掖", region: "Gansu", regionZh: "甘肃",
    longitude: 100.4556, latitude: 38.9365, confidence: "verified", coordSource: OSM,
    kicker: "Painted hills",
    highlights: ["Zhangye Danxia landforms", "Hexi Corridor town"],
    icon: "danxia",
    bigMoment: "Danxia",
  },
  {
    id: "xian", number: 13, chapter: "xian",
    dateStart: "2026-10-22", dateEnd: "2026-10-27",
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
  { id: "zhenyuan-stn", name: "Zhenyuan station", chineseName: "镇远站", longitude: 108.4073, latitude: 27.0402, confidence: "verified", coordSource: "OSM station", kind: "station" },
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
  { id: "kuqa-stn", name: "Kuqa station", chineseName: "库车站", longitude: 83.0138, latitude: 41.6933, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "turpan-stn", name: "Turpan station (Daheyan)", chineseName: "吐鲁番站", longitude: 88.8723, latitude: 43.1499, confidence: "verified", coordSource: "OSM station", kind: "transfer" },
  { id: "hami-stn", name: "Hami station", chineseName: "哈密站", longitude: 93.5046, latitude: 42.8484, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "liuyuan", name: "Liuyuan", chineseName: "柳园", longitude: 95.5054, latitude: 41.1052, confidence: "verified", coordSource: "OSM station", kind: "transfer" },
  { id: "zhangye-stn", name: "Zhangye station", chineseName: "张掖站", longitude: 100.5181, latitude: 38.9735, confidence: "verified", coordSource: "OSM station", kind: "station" },
  { id: "zhangye-west", name: "Zhangye West", chineseName: "张掖西", longitude: 100.4266, latitude: 38.9225, confidence: "verified", coordSource: "OSM station", kind: "station" },
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
    id: "taipan-kaili", from: "taipan", to: "kaili", mode: "local", leg: "zhenyuan", date: "2026-10-06",
    transport: "Local bus or shared taxi back to Kaili", serviceStatus: "planned",
  },
  {
    id: "kaili-zhenyuan", from: "kaili", to: "zhenyuan-stn", mode: "rail", leg: "zhenyuan", date: "2026-10-06",
    transport: "Train, Kaili → Zhenyuan", serviceStatus: "tbc",
    osmLines: [LINES.huKun, LINES.xiangQian],
  },
  {
    id: "zhenyuan-tiexi", from: "zhenyuan", to: "tiexi", mode: "local", leg: "tiexi", date: "2026-10-07",
    transport: "Taxi or on foot, there and back", serviceStatus: "planned",
  },
  {
    id: "zhenyuan-guiyang", from: "zhenyuan-stn", to: "guiyang-stn", mode: "rail", leg: "guiyang", date: "2026-10-08",
    transport: "Train, Zhenyuan → Guiyang", serviceStatus: "tbc",
    notes: "Drawn along the conventional line; bus to Kaili South + high-speed rail is the alternative.",
    osmLines: [LINES.huKun, LINES.xiangQian],
  },
  {
    id: "guiyang-chengdu", from: "guiyang-east", to: "chengdu-east", mode: "rail", leg: "chengdu", date: "2026-10-09",
    transport: "High-speed rail, Chengdu–Guiyang line", serviceStatus: "tbc",
    osmLines: [LINES.chengGuiHSR, ...LINES.links],
  },
  {
    // Drawn as a schematic arc by choice. The real track is still traced (osmRoute) for the distance;
    // set mode: "rail" (and from: "chengdu-west", to: "kashgar-stn") to draw the actual line instead.
    id: "chengdu-kashgar", from: "chengdu", to: "kashgar", mode: "schematic", bend: -0.22, leg: "kashgar", date: "2026-10-12", dateEnd: "2026-10-13",
    transport: "Two-day sleeper train", service: "T60", serviceStatus: "confirmed", longJourney: true,
    notes: "Drawn as an arc. The real line runs north via Guangyuan and Lanzhou, then west along the Hexi Corridor and across Xinjiang: the same corridor we return along.",
    // lines per Wikipedia (T62/59, T60/61次列车): 宝成 → 兰渝 → 陇海 → 兰新 (conventional to Hami, then the high-speed line to Turpan North) → 南疆
    osmRoute: [
      { via: "guangyuan", lines: [LINES.baocheng, 19440382] },
      { via: "lanzhou", lines: [LINES.lanyu, LINES.longhai] },
      { via: "wuwei", lines: [LINES.lanxin, LINES.longhai] },
      { via: "jiayuguan", lines: [LINES.lanxin] },
      { via: "hami-stn", lines: [LINES.lanxin] },
      { via: "turpan-north", lines: [LINES.lanxinHSR, LINES.lanxin] },
      { via: "aksu", lines: [LINES.nanjiang, LINES.lanxinHSR, LINES.lanxin] },
      { via: "kashgar-stn", lines: [LINES.nanjiang] },
    ],
  },
  {
    id: "kashgar-kuqa", from: "kashgar-stn", to: "kuqa-stn", mode: "rail", leg: "kuqa", date: "2026-10-16",
    transport: "Eastbound train, Southern Xinjiang line", service: "T270", serviceStatus: "tbc",
    notes: "T270 Kashgar → Xi'an, if the October 2026 service runs as expected. Times TBC.",
    osmLines: [LINES.nanjiang],
  },
  {
    id: "kuqa-turpan", from: "kuqa-stn", to: "turpan-stn", mode: "rail", leg: "turpan", date: "2026-10-18",
    transport: "Train east along the Southern Xinjiang line", serviceStatus: "tbc",
    osmLines: [LINES.nanjiang],
  },
  {
    id: "daheyan-turpan", from: "turpan-stn", to: "turpan", mode: "local", leg: "turpan", date: "2026-10-18",
    transport: "Local bus or taxi into Turpan", serviceStatus: "planned",
    notes: "Turpan's conventional station is at Daheyan, well outside the city.",
  },
  {
    id: "turpan-hami", from: "turpan-stn", to: "hami-stn", mode: "rail", leg: "hami", date: "2026-10-19",
    transport: "Train, Lanzhou–Xinjiang line", serviceStatus: "tbc",
    osmLines: [LINES.lanxin],
  },
  {
    id: "hami-liuyuan", from: "hami-stn", to: "liuyuan", mode: "rail", leg: "dunhuang", date: "2026-10-20",
    transport: "Train to Liuyuan (T270 does not stop at Dunhuang)", serviceStatus: "tbc",
    osmLines: [LINES.lanxin],
  },
  {
    id: "liuyuan-dunhuang", from: "liuyuan", to: "dunhuang", mode: "local", leg: "dunhuang", date: "2026-10-20",
    transport: "Bus or shared taxi across the desert", serviceStatus: "planned",
  },
  {
    id: "dunhuang-liuyuan", from: "dunhuang", to: "liuyuan", mode: "local", leg: "zhangye", date: "2026-10-21",
    transport: "Back to Liuyuan by bus or shared taxi", serviceStatus: "planned",
  },
  {
    id: "liuyuan-zhangye", from: "liuyuan", to: "zhangye-stn", mode: "rail", leg: "zhangye", date: "2026-10-21",
    transport: "Train east through the Hexi Corridor", serviceStatus: "tbc",
    osmLines: [LINES.lanxin],
  },
  {
    id: "zhangye-xian", from: "zhangye-west", to: "xian-north", mode: "rail", leg: "xian", date: "2026-10-22",
    transport: "High-speed rail via Xining & Lanzhou", serviceStatus: "tbc",
    notes: "Corridor shown via Xining, Lanzhou and Tianshui. Exact trains TBC.",
    osmLines: [LINES.lanxinHSR, LINES.xulanHSR],
  },
];

/** Faint reference cities for orientation only — not part of the route. */
export const CONTEXT_CITIES = [
  { name: "Beijing", zh: "北京", lon: 116.3913, lat: 39.9057 },
  { name: "Shanghai", zh: "上海", lon: 121.47, lat: 31.2313 },
  { name: "Lanzhou", zh: "兰州", lon: 103.8395, lat: 36.0526 },
  { name: "Xining", zh: "西宁", lon: 101.7762, lat: 36.6173 },
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

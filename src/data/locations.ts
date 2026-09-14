export interface PickupArea {
  id: string;
  name: string;
  zone: string;
}

export interface DestinationRoute {
  id: string;
  name: string;
  category: "airports" | "cairo" | "north_coast" | "delta_canal" | "red_sea" | "upper_egypt";
  categoryName: string;
  distanceKm: number;
  estimatedHours: string;
  startingPrice: number; // in EGP
  popular?: boolean;
}

export const ALEXANDRIA_PICKUP_AREAS: PickupArea[] = [
  { id: "smouha", name: "سموحة", zone: "وسط وشرق" },
  { id: "montazah", name: "المنتزه والمعمورة", zone: "شرق الإسكندرية" },
  { id: "ramleh", name: "محطة الرمل والأزاريطة", zone: "وسط الإسكندرية" },
  { id: "sidi_gaber", name: "سيدي جابر وكليوباترا", zone: "وسط الإسكندرية" },
  { id: "loran_san_stefano", name: "لوران وسان ستيفانو وجليم", zone: "شرق الإسكندرية" },
  { id: "miami", name: "ميامي وسيدي بشر", zone: "شرق الإسكندرية" },
  { id: "rushdy_kafr_abdo", name: "رشدي وكفر عبده", zone: "وسط الإسكندرية" },
  { id: "agamy", name: "العجمي والبيطاش والهانوفيل", zone: "غرب الإسكندرية" },
  { id: "king_mariout", name: "كينج مريوط والهوارية", zone: "غرب الإسكندرية" },
  { id: "borg_el_arab", name: "مدينة برج العرب", zone: "غرب الإسكندرية" },
  { id: "borg_airport", name: "مطار برج العرب الدولي", zone: "مطارات" },
  { id: "moharam_bek", name: "محرم بك وقنال المحمودية", zone: "وسط الإسكندرية" },
  { id: "bahari", name: "بحري والأنفوشي والمنشية", zone: "غرب ووسط" },
  { id: "other_alex", name: "عنوان مخصص آخر في الإسكندرية", zone: "عام" },
];

export const DESTINATIONS: DestinationRoute[] = [
  // Airports & Cairo
  {
    id: "cairo_airport",
    name: "مطار القاهرة الدولي (مبنى 1 / 2 / 3)",
    category: "airports",
    categoryName: "المطارات والقاهرة",
    distanceKm: 235,
    estimatedHours: "2:30 إلى 3 ساعات",
    startingPrice: 1850,
    popular: true,
  },
  {
    id: "tagamoa_new_cairo",
    name: "التجمع الخامس والقاهرة الجديدة",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 245,
    estimatedHours: "2:45 إلى 3 ساعات",
    startingPrice: 1900,
    popular: true,
  },
  {
    id: "sheikh_zayed_october",
    name: "الشيخ زايد ومدينة 6 أكتوبر",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 215,
    estimatedHours: "2:15 إلى 2:30 ساعة",
    startingPrice: 1800,
    popular: true,
  },
  {
    id: "sphinx_airport",
    name: "مطار سفنكس الدولي (أكتوبر)",
    category: "airports",
    categoryName: "المطارات والقاهرة",
    distanceKm: 195,
    estimatedHours: "2:00 إلى 2:15 ساعة",
    startingPrice: 1750,
    popular: true,
  },
  {
    id: "madinaty_rehab",
    name: "مدينتي والرحاب والشروق والعبور",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 250,
    estimatedHours: "2:45 إلى 3:15 ساعة",
    startingPrice: 1950,
  },
  {
    id: "downtown_maadi",
    name: "وسط البلد والزمالك والمعادي",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 225,
    estimatedHours: "2:30 إلى 3 ساعات",
    startingPrice: 1850,
  },
  {
    id: "heliopolis_nasr_city",
    name: "مصر الجديدة ومدينة نصر",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 230,
    estimatedHours: "2:30 إلى 3 ساعات",
    startingPrice: 1850,
  },
  {
    id: "new_capital",
    name: "العاصمة الإدارية الجديدة",
    category: "cairo",
    categoryName: "القاهرة الكبرى",
    distanceKm: 280,
    estimatedHours: "3:00 إلى 3:30 ساعات",
    startingPrice: 2200,
    popular: true,
  },

  // North Coast & Matrouh
  {
    id: "new_alamein",
    name: "العلمين الجديدة والأبراج الشاطئية",
    category: "north_coast",
    categoryName: "الساحل الشمالي ومطروح",
    distanceKm: 110,
    estimatedHours: "1:15 إلى 1:30 ساعة",
    startingPrice: 1200,
    popular: true,
  },
  {
    id: "marina_north_coast",
    name: "مارينا الساحل الشمالي (بوابات 1-7)",
    category: "north_coast",
    categoryName: "الساحل الشمالي ومطروح",
    distanceKm: 95,
    estimatedHours: "1:00 إلى 1:15 ساعة",
    startingPrice: 1100,
    popular: true,
  },
  {
    id: "sidi_abdelrahman",
    name: "سيدي عبد الرحمن وهاسيندا ومراسي",
    category: "north_coast",
    categoryName: "الساحل الشمالي ومطروح",
    distanceKm: 135,
    estimatedHours: "1:30 إلى 1:45 ساعة",
    startingPrice: 1400,
    popular: true,
  },
  {
    id: "ras_el_hekma",
    name: "رأس الحكمة وسيزر وسولاي",
    category: "north_coast",
    categoryName: "الساحل الشمالي ومطروح",
    distanceKm: 200,
    estimatedHours: "2:15 إلى 2:30 ساعة",
    startingPrice: 1950,
    popular: true,
  },
  {
    id: "marsa_matrouh",
    name: "مدينة مرسى مطروح ومصايفها",
    category: "north_coast",
    categoryName: "الساحل الشمالي ومطروح",
    distanceKm: 290,
    estimatedHours: "3:15 إلى 3:45 ساعات",
    startingPrice: 2600,
  },

  // Delta & Canal
  {
    id: "tanta_mahalla",
    name: "طنطا والمحلة الكبرى (الغربية)",
    category: "delta_canal",
    categoryName: "الدلتا ومدن القناة",
    distanceKm: 125,
    estimatedHours: "1:30 إلى 1:45 ساعة",
    startingPrice: 1300,
  },
  {
    id: "mansoura",
    name: "المنصورة والمنصورة الجديدة",
    category: "delta_canal",
    categoryName: "الدلتا ومدن القناة",
    distanceKm: 175,
    estimatedHours: "2:15 إلى 2:45 ساعة",
    startingPrice: 1650,
  },
  {
    id: "portsaid_damietta",
    name: "بورسعيد ودمياط ودمياط الجديدة",
    category: "delta_canal",
    categoryName: "الدلتا ومدن القناة",
    distanceKm: 260,
    estimatedHours: "3:00 إلى 3:30 ساعات",
    startingPrice: 2400,
  },
  {
    id: "ismailia_suez_sokhna",
    name: "الإسماعيلية / السويس والعين السخنة",
    category: "delta_canal",
    categoryName: "الدلتا ومدن القناة",
    distanceKm: 310,
    estimatedHours: "3:30 إلى 4:00 ساعات",
    startingPrice: 2800,
  },

  // Red Sea & Sinai
  {
    id: "hurghada_elgouna",
    name: "الغردقة والجونة وسهل حشيش",
    category: "red_sea",
    categoryName: "البحر الأحمر وسيناء",
    distanceKm: 680,
    estimatedHours: "6:30 إلى 7:30 ساعات",
    startingPrice: 5800,
  },
  {
    id: "sharm_el_sheikh",
    name: "شرم الشيخ ودهب",
    category: "red_sea",
    categoryName: "البحر الأحمر وسيناء",
    distanceKm: 740,
    estimatedHours: "7:30 إلى 8:30 ساعات",
    startingPrice: 6500,
  },

  // Upper Egypt
  {
    id: "beni_suef_minya",
    name: "بني سويف والفيوم والمنيا",
    category: "upper_egypt",
    categoryName: "محافظات الصعيد",
    distanceKm: 380,
    estimatedHours: "4:00 إلى 4:45 ساعات",
    startingPrice: 3500,
  },
  {
    id: "assiut_sohag",
    name: "أسيوط وسوهاج وقنا",
    category: "upper_egypt",
    categoryName: "محافظات الصعيد",
    distanceKm: 600,
    estimatedHours: "6:00 إلى 7:00 ساعات",
    startingPrice: 5500,
  },
];

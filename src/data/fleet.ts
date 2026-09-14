export interface Vehicle {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  tag: string;
  tagColor: "gold" | "emerald" | "amber" | "blue";
  passengers: number;
  luggage: number;
  image: string;
  description: string;
  descriptionEn: string;
  pricePerKmMultiplier: number;
  baseStartingPrice: number; // EGP Alex -> Cairo
  features: string[];
  featuresEn: string[];
}

export const FLEET: Vehicle[] = [
  {
    id: "toyota-corolla",
    name: "تويوتا كورولا 2024 (Toyota Corolla)",
    nameEn: "Toyota Corolla 2024",
    category: "سيدان كومفورت",
    tag: "الأكثر طلباً واقتصادية",
    tagColor: "gold",
    passengers: 4,
    luggage: 3,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    description: "السيارة الأكثر اعتمادية في مصر. راحة فائقة أثناء السفر على الطرق السريعة مع تكييف ياباني قوي ومقاعد مريحة وعزل متميز.",
    descriptionEn: "Egypt's most trusted sedan. Ultimate highway reliability with powerful climate control and comfortable seating.",
    pricePerKmMultiplier: 1.0,
    baseStartingPrice: 1850,
    features: [
      "موديل حديث معقم ومكيف بأعلى كفاءة",
      "سائق محترف وملتزم بالمواعيد 100%",
      "مياه معدنية مجانية وشواحن هواتف",
      "أسعار ثابتة شاملة البنزين والكارتات",
    ],
    featuresEn: [
      "Modern model, fully sanitized with high AC",
      "Professional and 100% punctual chauffeur",
      "Complimentary water and mobile chargers",
      "Fixed rates including fuel and highway tolls",
    ],
  },
  {
    id: "hyundai-elantra",
    name: "هيونداي إلنترا CN7 الفاخرة (Hyundai Elantra)",
    nameEn: "Hyundai Elantra CN7",
    category: "سيدان فاخرة",
    tag: "شياكة وفخامة وانسيابية",
    tagColor: "blue",
    passengers: 4,
    luggage: 3,
    image: "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?auto=format&fit=crop&w=1200&q=80",
    description: "تصميم عصري رياضي ومقصورة داخلية رحبة جداً ومقاعد مريحة للظهر في رحلات السفر الطويلة بين المحافظات والمطارات.",
    descriptionEn: "Futuristic design, spacious passenger cabin, and ultra-smooth highway suspension for effortless intercity trips.",
    pricePerKmMultiplier: 1.05,
    baseStartingPrice: 1950,
    features: [
      "صالون رحب مريح للرحلات الطويلة",
      "تكييف رقمي مزدوج وعزل صوتي ممتاز",
      "شواحن Type-C و Lightning لجميع الهواتف",
      "خدمة توصيل من الباب إلى الباب",
    ],
    featuresEn: [
      "Spacious ergonomic interior for long drives",
      "Dual-zone climate control and sound insulation",
      "Type-C & Lightning fast chargers",
      "Direct door-to-door service",
    ],
  },
  {
    id: "kia-cerato",
    name: "كيا سيراتو جراند (Kia Cerato Grand)",
    nameEn: "Kia Cerato Grand",
    category: "سيدان كومفورت",
    tag: "عملية ومريحة جداً",
    tagColor: "amber",
    passengers: 4,
    luggage: 3,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
    description: "صالون واسع وصندوق حقائب كبير يتسع لـ 3 حقائب سفر. الخيار العملي والمفضل لرحلات مطار القاهرة والتجمع وأكتوبر.",
    descriptionEn: "Wide legroom and large trunk fitting 3 suitcases. Practical favorite for airport runs and Cairo commutes.",
    pricePerKmMultiplier: 1.0,
    baseStartingPrice: 1850,
    features: [
      "شنطة سفر خلفية واسعة للحقائب",
      "تكييف هواء فائق البرودة",
      "سائق أمين وخبير بكافة المحاور والطرق",
      "متابعة مستمرة حتى الوصول بسلامة",
    ],
    featuresEn: [
      "Generous luggage boot for travel bags",
      "High-power air conditioning",
      "Trustworthy driver skilled on all highways",
      "Live trip tracking until safe arrival",
    ],
  },
  {
    id: "mercedes-e-class",
    name: "مرسيدس E-Class رجال الأعمال (Mercedes E-Class)",
    nameEn: "Mercedes-Benz E-Class Business",
    category: "درجة رجال الأعمال",
    tag: "الأكثر طلباً لرجال الأعمال",
    tagColor: "blue",
    passengers: 3,
    luggage: 3,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    description: "الهيبة الألمانية والأناقة المطلقة. مخصصة لرجال الأعمال، المؤتمرات، واستقبال كبار الزوار في صالات مطار القاهرة الدولي.",
    descriptionEn: "German engineering and prestige. Built for corporate executives, VIP conferences, and elite airport arrivals.",
    pricePerKmMultiplier: 1.65,
    baseStartingPrice: 3100,
    features: [
      "سائق محترف بزي رسمي كامل (بدلة وكرافتة)",
      "مقاعد جلد فاخرة ونظام تعليق ناعم جداً",
      "إنترنت واي فاي مفتوح داخل السيارة",
      "استقبال خاص بلافتة ترحيبية بصالة المطار",
    ],
    featuresEn: [
      "Uniformed professional chauffeur (suit & tie)",
      "Premium leather seating with air suspension",
      "Complimentary in-car high-speed Wi-Fi",
      "Airport meet & greet with personalized sign",
    ],
  },
  {
    id: "mercedes-s-class",
    name: "مرسيدس S-Class مايباخ VIP (Mercedes S-Class)",
    nameEn: "Mercedes-Benz S-Class VIP",
    category: "كبار الشخصيات VIP",
    tag: "القمة في الفخامة الملكية",
    tagColor: "gold",
    passengers: 3,
    luggage: 3,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description: "الأيقونة الملكية الأولى في عالم السفر الفاخر. مقاعد مساج مع شاشات خلفية وعزل صوتي كامل لتجربة سفر رئاسية استثنائية.",
    descriptionEn: "The undisputed royal benchmark. Reclining massage seats, rear entertainment screens, and whispering sound insulation.",
    pricePerKmMultiplier: 2.2,
    baseStartingPrice: 4200,
    features: [
      "سائق خاص VIP متقن للغات ومظهره راقٍ",
      "مقاعد خلفية قابلة للإمالة مع مساج وتبريد",
      "شاشات عرض وضيافة متميزة متكاملة",
      "تكييف رباعي المناطق مستقل للركاب",
    ],
    featuresEn: [
      "Bilingual VIP chauffeur with executive etiquette",
      "Reclining rear seats with massage & ventilation",
      "Rear screens and premium hospitality pack",
      "Quad-zone climate control for individual comfort",
    ],
  },
  {
    id: "hyundai-h1-vip",
    name: "هيونداي H1 رويال VIP (Hyundai H1 7-Seater)",
    nameEn: "Hyundai H1 Royal VIP (7 Seats)",
    category: "فان عائلي وسياحي",
    tag: "المثالية للعائلات والوفود",
    tagColor: "emerald",
    passengers: 7,
    luggage: 7,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "مساحة رحبة تتسع لـ 7 ركاب بكامل راحتهم مع سعة تخزين ضخمة لـ 7 حقائب كبيرة. مقاعد جلد كابتن وتكييف مركزي قوي جداً.",
    descriptionEn: "Generous 7-passenger capacity with huge trunk for 7 large suitcases. Captain seats and powerful dual-blower AC.",
    pricePerKmMultiplier: 1.4,
    baseStartingPrice: 2500,
    features: [
      "تتسع لـ 7 أفراد بارتياح تام",
      "مساحة شحن مخصصة لـ 7 حقائب سفر كبيرة",
      "تكييف هواء مركزي قوي لكل مقعد",
      "ستائر خصوصية ومنافذ شحن USB متعددة",
    ],
    featuresEn: [
      "Spacious seating for 7 passengers in pure comfort",
      "Luggage space accommodating 7 large suitcases",
      "Dual high-capacity air conditioning",
      "Privacy window shades and multi USB charge ports",
    ],
  },
  {
    id: "toyota-hiace-vip",
    name: "تويوتا هايس سقف عالي VIP (Toyota HiAce)",
    nameEn: "Toyota HiAce High Roof VIP (13 Seats)",
    category: "ميني باص سياحي",
    tag: "للمجموعات الكبيرة والرحلات",
    tagColor: "amber",
    passengers: 13,
    luggage: 12,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description: "الخيار الأول للرحلات السياحية والعائلات الكبيرة ووفود الشركات حتى 13 راكباً. سقف مرتفع وتكييف مركزي جبار ومقاعد سياحية متباعدة.",
    descriptionEn: "The premier choice for large families, tourist groups, and corporate delegations up to 13 passengers with a high-roof cabin.",
    pricePerKmMultiplier: 1.7,
    baseStartingPrice: 3200,
    features: [
      "سعة واسعة تتسع لـ 13 راكباً",
      "سقف مرتفع ومقاعد سياحية متباعدة ومريحة",
      "تكييف مركزي قوي يغطي الحافلة بالكامل",
      "صندوق خلفي كبير جداً لحقائب المجموعة",
    ],
    featuresEn: [
      "Expansive 13-seat capacity for large groups",
      "High roof with comfortable spaced touring seats",
      "Ducted central roof air conditioning",
      "Deep rear luggage cargo compartment",
    ],
  },
];
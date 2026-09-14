export type Language = "ar" | "en";

export interface Translations {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    badge: string;
  };
  header: {
    serviceStatus: string;
    exclusiveLaunch: string;
    instantCall: string;
    whatsapp: string;
    admin: string;
    switchLang: string;
  };
  hero: {
    topBadge: string;
    titleStart: string;
    alexandria: string;
    titleEnd: string;
    description: string;
    boldBrand: string;
    featureHeader: string;
    featureTitle: string;
    feature1: string;
    feature2: string;
    feature3: string;
    bookNow: string;
    exploreFleet: string;
    cardBadge: string;
    cardSub: string;
    statsTrips: string;
    statsTripsLabel: string;
    statsRating: string;
    statsRatingLabel: string;
    statsPunctual: string;
    statsPunctualLabel: string;
    statsSupport: string;
    statsSupportLabel: string;
  };
  booking: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    oneWay: string;
    roundTrip: string;
    discountBadge: string;
    pickupLabel: string;
    doorstepBadge: string;
    customAddressPlaceholder: string;
    destinationLabel: string;
    approxTime: string;
    distance: string;
    vehicleLabel: string;
    fleetDetailsLink: string;
    dateTimeLabel: string;
    immediateBtn: string;
    passengerHeader: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneError: string;
    notesLabel: string;
    notesPlaceholder: string;
    fareLabel: string;
    roundTripIncluded: string;
    fareDisclaimer: string;
    paymentNote: string;
    confirmBtn: string;
    submittingBtn: string;
    twoMinReply: string;
    freeCancellation: string;
    directLine: string;
  };
  fleet: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    categories: {
      all: string;
      vip: string;
      family: string;
      sedan: string;
      suv: string;
    };
    passengers: string;
    luggage: string;
    superAc: string;
    startingFrom: string;
    currency: string;
    bookThisCar: string;
  };
  routes: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    fromAlexHome: string;
    estimatedTime: string;
    startingFrom: string;
    currency: string;
    bookRoute: string;
  };
  amenities: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  faq: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  footer: {
    desc: string;
    contactTitle: string;
    coverageTitle: string;
    coverage1: string;
    coverage2: string;
    coverage3: string;
    coverage4: string;
    alexEgypt: string;
    allRightsReserved: string;
    luxuryPwa: string;
  };
  nav: {
    home: string;
    fleet: string;
    book: string;
    routes: string;
    call: string;
  };
  pwa: {
    title: string;
    badge: string;
    desc: string;
    installBtn: string;
    iosTitle: string;
    iosStep1: string;
    iosStep2: string;
    iosStep3: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    brand: {
      name: "وصـــول",
      tagline: "WOSOOL LIMOUSINE",
      subtagline: "فخامة السفر والأمان بين محافظات مصر",
      badge: "VIP",
    },
    header: {
      serviceStatus: "خدمة 24/7 في جميع أنحاء مصر",
      exclusiveLaunch: "انطلاق حصري من الإسكندرية لجميع المحافظات",
      instantCall: "اتصال فوري",
      whatsapp: "واتساب",
      admin: "لوحة التحكم",
      switchLang: "English",
    },
    hero: {
      topBadge: "التطبيق الرائد لرحلات الليموزين في مصر",
      titleStart: "رحلتك من",
      alexandria: "الإسكندرية",
      titleEnd: "إلى أي وجهة في مصر",
      description:
        "تطبيق وصول ليموزين يمنحك تجربة سفر فاخرة، آمنة، ودقيقة بالدقيقة. سيارات حديثة معقمة وسائقون محترفون بزي رسمي لمطارات القاهرة وكافة المحافظات.",
      boldBrand: "وصول ليموزين",
      featureHeader: "خدمة رجال الأعمال والعائلات VIP",
      featureTitle: "راحة تامة في كل كيلومتر.. من باب بيتك حتى وجهتك",
      feature1: "تأكيد حجز فوري عبر الواتساب بدون تعقيدات",
      feature2: "استقبال خاص في صالات مطار القاهرة الدولي",
      feature3: "شواحن لجميع الهواتف، مياه معدنية، وواي فاي مجاني",
      bookNow: "احجز رحلتك الآن",
      exploreFleet: "استعراض الأسطول",
      cardBadge: "مرسيدس الفئة S و E الفاخرة",
      cardSub: "متوفرة الآن للرحلات اليومية والمطارات",
      statsTrips: "+15,000",
      statsTripsLabel: "رحلة سفر ناجحة",
      statsRating: "4.9",
      statsRatingLabel: "تقييم ممتاز للخدمة",
      statsPunctual: "100%",
      statsPunctualLabel: "التزام بالدقيقة في المواعيد",
      statsSupport: "24/7",
      statsSupportLabel: "دعم ومتابعة لحظية",
    },
    booking: {
      badge: "حجز سريع ومباشر عبر واتساب",
      title: "احجز رحلتك مع",
      titleHighlight: "وصول ليموزين",
      subtitle: "اختر مكان الانطلاق والوجهة وفئة السيارة لتجهيز سيارتك وسائقك في الموعد بدقة",
      step1: "تفاصيل المسار",
      step2: "السيارة والوقت",
      step3: "التأكيد بالواتساب",
      oneWay: "ذهاب فقط (One Way)",
      roundTrip: "ذهاب وعودة (Round Trip)",
      discountBadge: "خصم 15%",
      pickupLabel: "نقطة الانطلاق (محصورة في الإسكندرية)",
      doorstepBadge: "من باب منزلك",
      customAddressPlaceholder: "اسم الشارع أو رقم العمارة أو علامة مميزة (اختياري)",
      destinationLabel: "الوجهة المقصودة (كافة المحافظات والمطارات)",
      approxTime: "زمن الرحلة التقريبي:",
      distance: "المسافة:",
      vehicleLabel: "اختر فئة السيارة المناسبة لرحلتك",
      fleetDetailsLink: "مواصفات الأسطول بالتفصيل",
      dateTimeLabel: "موعد وتوقيت الرحلة",
      immediateBtn: "حجز فوري عاجل الآن",
      passengerHeader: "بيانات المسافر للتواصل وتأكيد الحجز",
      nameLabel: "اسم العميل الكريم",
      namePlaceholder: "الاسم ثلاثي أو ثنائي",
      nameError: "يرجى إدخال اسم العميل الكريم",
      phoneLabel: "رقم الهاتف / الواتساب",
      phonePlaceholder: "01012345678",
      phoneError: "يرجى إدخال رقم هاتف صحيح للتواصل",
      notesLabel: "ملاحظات إضافية أو رقم الرحلة الجوية (Flight Number)",
      notesPlaceholder: "مثال: رحلة مصر للطيران رقم MS123، مقعد أطفال، أو محطة توقف...",
      fareLabel: "التسعير التقديري للرحلة:",
      roundTripIncluded: "شامل العودة",
      fareDisclaimer: "* السعر شامل السيارة الخاصة، السائق بزي رسمي، البنزين، وكارتات الطريق السريع بدون رسوم إضافية.",
      paymentNote: "دفع عند الوصول أو كاش / إنستاباي",
      confirmBtn: "تأكيد الحجز الفوري عبر واتساب وصول",
      submittingBtn: "جاري فتح محادثة الواتساب وتجهيز الحجز...",
      twoMinReply: "رد سريع خلال دقيقتين",
      freeCancellation: "إلغاء وتعديل مرن",
      directLine: "رقم مباشر: 01016518716",
    },
    fleet: {
      badge: "أحدث موديلات 2023 - 2024",
      title: "معرض سيارات",
      titleHighlight: "وصول الفاخرة",
      subtitle: "أسطول متكامل ومجهز خصيصاً للرحلات الطويلة والسفر بين المحافظات بأعلى درجات الهدوء والرفاهية",
      categories: {
        all: "جميع السيارات",
        vip: "مرسيدس VIP",
        family: "فانات عائلية وسياحية",
        sedan: "سيدان كومفورت",
        suv: "دفع رباعي 4x4",
      },
      passengers: "ركاب",
      luggage: "حقائب",
      superAc: "تكييف فائق",
      startingFrom: "يبدأ السعر لرحلات القاهرة من:",
      currency: "ج.م",
      bookThisCar: "احجز هذه السيارة",
    },
    routes: {
      badge: "مسارات يومية ثابتة ومباشرة",
      title: "أشهر رحلات",
      titleHighlight: "وصول من الإسكندرية",
      subtitle: "رحلات ذهاب فقط أو ذهاب وعودة بأسعار واضحة وتوصيل مباشر من باب بيتك",
      fromAlexHome: "الإسكندرية (من أمام منزلك)",
      estimatedTime: "الزمن المتوقع:",
      startingFrom: "تبدأ من",
      currency: "ج.م",
      bookRoute: "احجز فوراً",
    },
    amenities: {
      badge: "معايير الضيافة الملكية",
      title: "لماذا يختار عملاؤنا",
      titleHighlight: "تطبيق وصول؟",
      subtitle: "نهتم بأدق التفاصيل لتتحول ساعات السفر الطويلة إلى تجربة استرخاء واستمتاع",
    },
    testimonials: {
      badge: "تجارب حقيقية موثوقة",
      title: "ماذا يقول",
      titleHighlight: "عملاء وصول؟",
      subtitle: "أكثر من 15,000 عميل يثقون بنا في كافة رحلاتهم بين المحافظات",
    },
    faq: {
      badge: "كل ما تحتاج معرفته",
      title: "الأسئلة",
      titleHighlight: "الشائعة",
      subtitle: "إجابات واضحة ومباشرة لأهم استفسارات عملائنا الكرام",
    },
    footer: {
      desc: "التطبيق الرائد والمتخصص في توفير سيارات ليموزين حديثة وسائقين محترفين برحلات مباشرة من الإسكندرية إلى مطار القاهرة، الساحل الشمالي، وكافة المحافظات بأعلى معايير الراحة.",
      contactTitle: "الاتصال والحجز المباشر",
      coverageTitle: "نطاق التغطية",
      coverage1: "• مطار القاهرة الدولي صالة 1 / 2 / 3",
      coverage2: "• الساحل الشمالي، العلمين، ورأس الحكمة",
      coverage3: "• التجمع الخامس والشيخ زايد وأكتوبر",
      coverage4: "• محافظات الدلتا ومدن القناة والصعيد",
      alexEgypt: "الإسكندرية، جمهورية مصر العربية",
      allRightsReserved: "جميع الحقوق محفوظة.",
      luxuryPwa: "صمم بأعلى معايير الفخامة والسرعة • PWA Ready",
    },
    nav: {
      home: "الرئيسية",
      fleet: "الأسطول",
      book: "احجز الآن",
      routes: "المسارات",
      call: "اتصال",
    },
    pwa: {
      title: "ثبّت تطبيق وصول ليموزين",
      badge: "PWA",
      desc: "وصول أسرع بدون إنترنت وسهولة في حجز رحلاتك",
      installBtn: "تثبيت",
      iosTitle: "طريقة التثبيت على أجهزة iPhone:",
      iosStep1: "اضغط على زر المشاركة السفلي (Share)",
      iosStep2: "اختر 'إضافة إلى الصفحة الرئيسية' (Add to Home Screen)",
      iosStep3: "اضغط على 'إضافة' ليظهر كأيقونة تطبيق رسمي",
    },
  },
  en: {
    brand: {
      name: "WOSOOL",
      tagline: "WOSOOL LIMOUSINE",
      subtagline: "Premier Luxury Travel Across Egypt",
      badge: "VIP",
    },
    header: {
      serviceStatus: "24/7 Service Across Egypt",
      exclusiveLaunch: "Exclusive Intercity Limousine from Alexandria",
      instantCall: "Call Now",
      whatsapp: "WhatsApp",
      admin: "Dashboard",
      switchLang: "العربية",
    },
    hero: {
      topBadge: "Egypt's Premier Luxury Limousine App",
      titleStart: "Your Journey from",
      alexandria: "Alexandria",
      titleEnd: "to Anywhere in Egypt",
      description:
        "Wosool Limousine delivers a first-class, punctual, and safe intercity travel experience. Modern sanitized fleet and uniformed chauffeurs for Cairo Airport and all governorates.",
      boldBrand: "Wosool Limousine",
      featureHeader: "Executive & VIP Family Service",
      featureTitle: "Pure Comfort in Every Kilometer.. From Your Door to Destination",
      feature1: "Instant WhatsApp booking confirmation without hassle",
      feature2: "Exclusive Meet & Greet at Cairo International Airport",
      feature3: "Universal phone chargers, bottled water, and free Wi-Fi",
      bookNow: "Book Your Ride Now",
      exploreFleet: "View Fleet",
      cardBadge: "Mercedes S-Class & E-Class Luxury",
      cardSub: "Available now for airport transfers and intercity travel",
      statsTrips: "+15,000",
      statsTripsLabel: "Successful Trips",
      statsRating: "4.9",
      statsRatingLabel: "Outstanding Rating",
      statsPunctual: "100%",
      statsPunctualLabel: "On-Time Arrival",
      statsSupport: "24/7",
      statsSupportLabel: "Live Customer Care",
    },
    booking: {
      badge: "Direct & Instant WhatsApp Booking",
      title: "Book Your Ride with",
      titleHighlight: "Wosool Limousine",
      subtitle: "Choose pickup area, destination, and vehicle class to get your private car and chauffeur ready",
      step1: "Trip Details",
      step2: "Car & Time",
      step3: "WhatsApp Confirm",
      oneWay: "One Way",
      roundTrip: "Round Trip",
      discountBadge: "15% OFF",
      pickupLabel: "Pickup Point (Alexandria Only)",
      doorstepBadge: "From Your Doorstep",
      customAddressPlaceholder: "Street name, building number or landmark (optional)",
      destinationLabel: "Destination (All Cities & Airports)",
      approxTime: "Estimated Duration:",
      distance: "Distance:",
      vehicleLabel: "Select Preferred Vehicle Class",
      fleetDetailsLink: "View Fleet Specifications",
      dateTimeLabel: "Trip Date & Time",
      immediateBtn: "Urgent Instant Booking Now",
      passengerHeader: "Passenger Details for Contact & Confirmation",
      nameLabel: "Passenger Full Name",
      namePlaceholder: "Enter your full name",
      nameError: "Please enter passenger name",
      phoneLabel: "Phone / WhatsApp Number",
      phonePlaceholder: "01012345678",
      phoneError: "Please enter a valid phone number",
      notesLabel: "Special Notes or Flight Number",
      notesPlaceholder: "e.g. EgyptAir Flight MS123, child safety seat, or extra stops...",
      fareLabel: "Estimated Trip Fare:",
      roundTripIncluded: "Return Trip Included",
      fareDisclaimer: "* Fare includes private vehicle, uniformed chauffeur, fuel, and highway tolls with no hidden fees.",
      paymentNote: "Pay on arrival or Cash / InstaPay",
      confirmBtn: "Confirm Booking via Wosool WhatsApp",
      submittingBtn: "Opening WhatsApp chat and preparing your trip...",
      twoMinReply: "Response in 2 minutes",
      freeCancellation: "Flexible cancellation",
      directLine: "Hotline: +201016518716",
    },
    fleet: {
      badge: "Latest 2023 - 2024 Models",
      title: "Wosool Luxury",
      titleHighlight: "Fleet Showcase",
      subtitle: "A comprehensive fleet tailored for long-distance highway comfort, privacy, and smooth arrival",
      categories: {
        all: "All Vehicles",
        vip: "Mercedes VIP",
        family: "Family & Tourism Vans",
        sedan: "Comfort Sedans",
        suv: "4x4 SUVs",
      },
      passengers: "passengers",
      luggage: "bags",
      superAc: "Climate Control",
      startingFrom: "Starting Cairo fare from:",
      currency: "EGP",
      bookThisCar: "Book This Vehicle",
    },
    routes: {
      badge: "Daily Fixed Intercity Routes",
      title: "Popular Routes",
      titleHighlight: "from Alexandria",
      subtitle: "One-way and round trips with transparent pricing and door-to-door pickup",
      fromAlexHome: "Alexandria (From your doorstep)",
      estimatedTime: "Estimated Duration:",
      startingFrom: "Starting from",
      currency: "EGP",
      bookRoute: "Book Now",
    },
    amenities: {
      badge: "Royal Hospitality Standards",
      title: "Why Choose",
      titleHighlight: "Wosool App?",
      subtitle: "Every detail is curated to transform hours of road travel into restful indulgence",
    },
    testimonials: {
      badge: "Verified Client Reviews",
      title: "What Our",
      titleHighlight: "Clients Say",
      subtitle: "Over 15,000 travelers trust Wosool for their cross-city journeys in Egypt",
    },
    faq: {
      badge: "Everything You Need to Know",
      title: "Frequently Asked",
      titleHighlight: "Questions",
      subtitle: "Clear answers to the most common inquiries from our valued guests",
    },
    footer: {
      desc: "The premier limousine service providing modern vehicles and professional chauffeurs for direct trips from Alexandria to Cairo Airport, North Coast, and all Egyptian cities.",
      contactTitle: "Direct Contact & Bookings",
      coverageTitle: "Coverage Scope",
      coverage1: "• Cairo International Airport Terminals 1 / 2 / 3",
      coverage2: "• North Coast, New Alamein, and Ras El Hekma",
      coverage3: "• New Cairo (5th Settlement), Sheikh Zayed, 6th October",
      coverage4: "• Delta Governorates, Canal Cities, and Upper Egypt",
      alexEgypt: "Alexandria, Arab Republic of Egypt",
      allRightsReserved: "All rights reserved.",
      luxuryPwa: "Designed for Luxury & Speed • PWA Ready",
    },
    nav: {
      home: "Home",
      fleet: "Fleet",
      book: "Book Now",
      routes: "Routes",
      call: "Call",
    },
    pwa: {
      title: "Install Wosool Limousine App",
      badge: "PWA",
      desc: "Faster 1-tap access and easy offline trip bookings",
      installBtn: "Install",
      iosTitle: "How to install on iPhone:",
      iosStep1: "Tap the bottom Share button",
      iosStep2: "Select 'Add to Home Screen'",
      iosStep3: "Tap 'Add' to place it on your home screen",
    },
  },
};
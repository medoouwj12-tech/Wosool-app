"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Crown,
  Gift,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Zap,
  Shield,
  Phone,
  Tag,
  BadgePercent,
  CalendarDays,
  Building2,
  Plane,
  GraduationCap,
  Heart,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

const PACKAGES = [
  {
    id: "fiat-comfort",
    icon: <Zap className="w-5 h-5" />,
    badge: "الأكثر طلباً",
    badgeColor: "bg-amber-500 text-black",
    name: "باقة فيات تيبو كومفورت",
    nameEn: "Fiat Tipo Comfort Package",
    tagline: "سيدان إيطالية راقية للمشاوير والمطارات",
    taglineEn: "Elegant Italian sedan for airport & city commutes",
    description: "رحلة مريحة وهادئة بسيارة فيات تيبو موديل حديث مع سائق محترف وتكييف ممتاز",
    descriptionEn: "Quiet, smooth ride in a modern Fiat Tipo with professional chauffeur and high AC",
    features: [
      "سيارة فيات تيبو موديل حديث معقمة بالكامل",
      "سائق محترف وملتزم بالمواعيد 100%",
      "مياه معدنية وشواحن هواتف مجانية",
      "شاملة رسوم الطرق والكارتات وبنزين الرحلة",
      "خدمة من الباب للباب بدون أي انتظار",
    ],
    color: "from-amber-500/10 to-amber-600/5",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-400",
    whatsappMsg: "مرحباً، أريد الاستفسار عن حجز *باقة فيات تيبو كومفورت*. ما هي التفاصيل المتاحة؟",
  },
  {
    id: "mg-vip",
    icon: <Crown className="w-5 h-5" />,
    badge: "الأكثر تميزاً",
    badgeColor: "bg-gold-500 text-black",
    name: "باقة إم جي ZS العائلية VIP",
    nameEn: "MG ZS Family VIP Package",
    tagline: "SUV عائلية مرتفعة وواسعة للحقائب",
    taglineEn: "High-clearance family SUV with large luggage boot",
    description: "مساحة واسعة وراحة مطلقة لك ولعائلتك مع شنطة كبيرة تتسع لحقائب السفر",
    descriptionEn: "Expansive cabin and absolute comfort for family trips with generous luggage capacity",
    features: [
      "سيارة إم جي ZS فئة SUV حديثة وفاخرة",
      "شنطة سفر كبيرة تتسع للحقائب الكبيرة",
      "تكييف هواء فائق البرودة لجميع الركاب",
      "استقبال خاص من المطار أو من باب منزلك",
      "متابعة دورية للرحلة حتى الوصول بسلامة",
    ],
    color: "from-gold-500/15 to-gold-600/5",
    borderColor: "border-gold-500/40",
    accentColor: "text-gold-400",
    whatsappMsg: "مرحباً، أريد الاستفسار عن حجز *باقة إم جي ZS العائلية VIP*. ما هي التفاصيل المتاحة؟",
    featured: true,
  },
  {
    id: "roundtrip-saver",
    icon: <Users className="w-5 h-5" />,
    badge: "وفر في المشوار",
    badgeColor: "bg-emerald-600 text-white",
    name: "باقة الذهاب والعودة المخفضة",
    nameEn: "Round-Trip Saver Package",
    tagline: "خصم خاص عند حجز الذهاب والعودة معاً",
    taglineEn: "Special discount when booking round-trip together",
    description: "احجز رحلتك ذهاب وعودة واستمتع بانتظار مجاني وخصم إضافي خاص على الإجمالي",
    descriptionEn: "Book your round trip with complimentary waiting hours and special packaged discount",
    features: [
      "خصم خاص وتوفير على رحلة العودة",
      "ساعات انتظار مجانية حسب الاتفاق",
      "نفس السائق والسيارة لراحتك وأمانك",
      "مرونة في تعديل موعد رحلة العودة",
      "تأكيد فوري بدون أي مصاريف إضافية",
    ],
    color: "from-emerald-500/10 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    accentColor: "text-emerald-400",
    whatsappMsg: "مرحباً، أريد الاستفسار عن *باقة الذهاب والعودة المخفضة*. أحتاج رحلة ذهاب وعودة.",
  },
];

const SPECIAL_OFFERS = [
  {
    icon: <Plane className="w-5 h-5 text-blue-400" />,
    title: "عرض مطار القاهرة ومطار برج العرب",
    titleEn: "Cairo & Borg El Arab Airports",
    desc: "استقبال وتوديع على مدار 24 ساعة مع متابعة مواعيد الطيران",
    benefit: "خدمة VIP ومتابعة طيران",
    validity: "متاح يومياً 24/7",
    color: "border-blue-500/30 bg-blue-500/5",
    whatsappMsg: "أريد الاستفسار عن *عرض رحلات المطارات*. الرجاء تزويدي بالتفاصيل.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-purple-400" />,
    title: "باقة الشركات والمشاوير الرسمية",
    titleEn: "Corporate & Business Accounts",
    desc: "فواتير معتمدة وسائقين محترفين للزيارات الرسمية والاجتماعات",
    benefit: "أسعار خاصة للتعاقدات",
    validity: "للمؤسسات والشركات",
    color: "border-purple-500/30 bg-purple-500/5",
    whatsappMsg: "أريد الاستفسار عن *باقة الشركات والمشاوير الرسمية*. شركتنا تحتاج رحلات منتظمة.",
  },
  {
    icon: <Heart className="w-5 h-5 text-rose-400" />,
    title: "المناسبات الخاصة والأفراح",
    titleEn: "Weddings & Special Events",
    desc: "سيارات معقمة ومجهزة لمناسباتك السعيدة مع سائق راقٍ بزي أنيق",
    benefit: "تجهيز خاص للمناسبة",
    validity: "بالحجز المسبق",
    color: "border-rose-500/30 bg-rose-500/5",
    whatsappMsg: "أريد الاستفسار عن *رحلات المناسبات الخاصة والأفراح*. ما هي التجهيزات المتاحة؟",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    title: "عروض الطلاب والجامعات",
    titleEn: "Student & University Trips",
    desc: "مساعدة طلاب الجامعات في السفر الآمن بين الإسكندرية والمحافظات",
    benefit: "تخفيض خاص بالبطاقة الجامعية",
    validity: "طوال العام الدراسي",
    color: "border-cyan-500/30 bg-cyan-500/5",
    whatsappMsg: "أريد الاستفسار عن *عروض الطلاب والجامعات*. أنا طالب وأريد حجز رحلة.",
  },
];

const LOYALTY_TIERS = [
  {
    name: "برونزي",
    nameEn: "Bronze",
    trips: "5 رحلات",
    benefit: "أولوية حجز",
    color: "from-amber-700/20 to-amber-800/10 border-amber-700/40 text-amber-600",
    icon: "🥉",
  },
  {
    name: "فضي",
    nameEn: "Silver",
    trips: "15 رحلة",
    benefit: "خصم خاص دائم",
    color: "from-gray-400/20 to-gray-500/10 border-gray-400/40 text-gray-300",
    icon: "🥈",
  },
  {
    name: "ذهبي",
    nameEn: "Gold",
    trips: "30 رحلة",
    benefit: "ترقية مجانية",
    color: "from-gold-500/20 to-gold-600/10 border-gold-500/40 text-gold-300",
    icon: "🥇",
  },
  {
    name: "VIP بلاتيني",
    nameEn: "Platinum VIP",
    trips: "50 رحلة+",
    benefit: "خدمات حصرية وسائق مخصص",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/40 text-violet-300",
    icon: "💎",
  },
];

export default function OffersPage() {
  const { language } = useLanguage();
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/201016518716?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-gray-100 pb-24 font-cairo">
        {/* Hero Banner */}
        <section className="relative overflow-hidden pt-4 pb-6 px-3">
          <div className="ambient-glow top-0 right-1/4 w-64 h-64 bg-gold-500/10 pointer-events-none" />
          <div className="ambient-glow bottom-0 left-10 w-48 h-48 bg-emerald-600/8 pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] font-semibold mb-3"
            >
              <BadgePercent className="w-3.5 h-3.5 text-gold-400" />
              <span>{language === "ar" ? "عروض وباقات حصرية" : "Exclusive Packages & Offers"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-black text-white leading-tight"
            >
              {language === "ar" ? (
                <>باقات سفر مميزة مع <span className="gold-text-gradient">وصول ليموزين</span></>
              ) : (
                <>Premium Travel Packages with <span className="gold-text-gradient">Wosool</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed"
            >
              {language === "ar"
                ? "اختر الباقة الأنسب لمشوارك واستمتع بأعلى مستويات الراحة والأمان"
                : "Choose the best package for your trip and enjoy the highest standard of luxury and safety"}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-400"
            >
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>5.0 تقييم العملاء</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>أمان وراحة تامة</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-400" />
                <span>خدمة 24/7</span>
              </span>
            </motion.div>
          </div>
        </section>

        {/* Main Packages */}
        <section className="px-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gold-400" />
            <h2 className="text-base sm:text-lg font-black text-white">
              {language === "ar" ? "باقاتنا المميزة" : "Our Featured Packages"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-4 bg-gradient-to-b ${pkg.color} ${pkg.borderColor} cursor-pointer transition-all duration-200 ${
                  pkg.featured ? "ring-1 ring-gold-500/50 shadow-gold-sm" : ""
                } ${activePackage === pkg.id ? "scale-[1.01]" : ""}`}
                onClick={() => setActivePackage(activePackage === pkg.id ? null : pkg.id)}
              >
                {pkg.featured && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-gold-500 to-gold-400 text-black text-[10px] font-black px-3 py-0.5 rounded-full shadow">
                      ⭐ {language === "ar" ? "الأكثر طلباً" : "Most Popular"}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center ${pkg.accentColor}`}>
                    {pkg.icon}
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-1">
                  {language === "ar" ? pkg.name : pkg.nameEn}
                </h3>
                <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                  {language === "ar" ? pkg.description : pkg.descriptionEn}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-4">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-1.5 text-[10px] text-gray-300">
                      <CheckCircle className={`w-3 h-3 ${pkg.accentColor} flex-shrink-0 mt-0.5`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openWhatsApp(pkg.whatsappMsg);
                  }}
                  className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all touch-press ${
                    pkg.featured
                      ? "gold-btn shadow-gold-sm"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{language === "ar" ? "احجز هذه الباقة" : "Book This Package"}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Special Offers Grid */}
        <section className="px-3 max-w-4xl mx-auto mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-4 h-4 text-gold-400" />
            <h2 className="text-base sm:text-lg font-black text-white">
              {language === "ar" ? "عروض وتسهيلات خاصة" : "Special Facilities & Offers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SPECIAL_OFFERS.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border p-3.5 ${offer.color} flex items-start gap-3`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {offer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xs font-bold text-white leading-tight">
                      {language === "ar" ? offer.title : offer.titleEn}
                    </h3>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold whitespace-nowrap flex-shrink-0">
                      {offer.benefit}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2 leading-relaxed">{offer.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[9px] text-gray-500">
                      <CalendarDays className="w-2.5 h-2.5" />
                      <span>{offer.validity}</span>
                    </span>
                    <button
                      onClick={() => openWhatsApp(offer.whatsappMsg)}
                      className="text-[10px] font-bold text-gold-300 hover:text-gold-200 flex items-center gap-0.5 transition-colors"
                    >
                      <span>{language === "ar" ? "اطلب التفاصيل" : "Inquire"}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Loyalty Program */}
        <section className="px-3 max-w-4xl mx-auto mt-8">
          <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-gold-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-gold-400" />
              <h2 className="text-base sm:text-lg font-black text-white">
                {language === "ar" ? "برنامج عملاء وصول الدائمين" : "Wosool Frequent Traveler Program"}
              </h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">
              {language === "ar"
                ? "كلما زادت رحلاتك معنا، زادت المزايا والأولوية في الحجز والخدمات الحصرية"
                : "The more you travel with us, the higher priority and exclusive amenities you receive"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LOYALTY_TIERS.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-xl border p-3 text-center bg-gradient-to-b ${tier.color}`}
                >
                  <div className="text-2xl mb-1">{tier.icon}</div>
                  <div className="text-xs font-black text-white mb-0.5">{tier.name}</div>
                  <div className="text-[9px] text-gray-400 mb-1">{tier.trips}</div>
                  <div className="text-[9px] font-bold text-gold-300 leading-tight">{tier.benefit}</div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => openWhatsApp("مرحباً، أريد الاستفسار عن *برنامج عملاء وصول الدائمين* وكيفية الاستفادة منه.")}
              className="mt-4 w-full gold-btn py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 touch-press"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "تواصل للاستفسار عن المزايا" : "Inquire About Member Benefits"}</span>
            </button>
          </div>
        </section>

        {/* Guarantee Strip */}
        <section className="px-3 max-w-4xl mx-auto mt-6">
          <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 via-transparent to-gold-500/10 border border-white/5 p-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === "ar" ? "أمان وراحة على الطريق" : "Safety & Highway Comfort"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === "ar" ? "مرونة وإلغاء مجاني" : "Free Cancellation"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>{language === "ar" ? "رد سريع خلال دقيقتين" : "Reply in 2 Minutes"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span dir="ltr">01016518716</span>
            </span>
          </div>
        </section>

        {/* CTA Back */}
        <div className="px-3 max-w-4xl mx-auto mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gold-300 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home"}</span>
          </Link>
        </div>

        <Footer />
      </main>
      <FloatingContact />
      <BottomNav />
    </>
  );
}

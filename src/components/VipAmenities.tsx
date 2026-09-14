"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  UserCheck,
  Plane,
  Wifi,
  Coffee,
  CreditCard,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VipAmenities() {
  const { t, language } = useLanguage();

  const amenities = [
    {
      icon: <UserCheck className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "كباتن محترفون بزي رسمي" : "Uniformed Chauffeurs",
      description: language === "ar"
        ? "سائقون ذوو خبرة عالية في السفر الطويل، ملتزمون بالزي الأنيق وأرقى أساليب الضيافة وحسن الاستقبال."
        : "Experienced long-distance chauffeurs in full formal executive suit and respectful etiquette.",
    },
    {
      icon: <Plane className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "تتبع مواعيد الطيران لحظياً" : "Live Flight Tracking",
      description: language === "ar"
        ? "نتابع رحلتك الجوية بدقة. إذا تأخرت طائرتك ننتظرك بدون أي قلق، مع لافتة استقبال باسم العميل بصالة الوصول."
        : "Real-time airport arrival tracking with complimentary delay waiting and meet & greet signs in the arrivals terminal.",
    },
    {
      icon: <Wifi className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "إنترنت وشواحن لجميع الهواتف" : "In-Car Wi-Fi & Fast Chargers",
      description: language === "ar"
        ? "ابق على اتصال دائم مع شبكة Wi-Fi داخل السيارة ومنافذ شحن سريعة لكافة أجهزة iPhone و Android."
        : "Stay connected throughout your journey with complimentary Wi-Fi and rapid multi-device phone chargers.",
    },
    {
      icon: <Coffee className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "ضيافة مجانية ونظافة فائقة" : "Complimentary Hospitality",
      description: language === "ar"
        ? "مياه معدنية باردة، مناديل معقمة، وتعقيم شامل للصالون قبل كل رحلة لضمان أقصى درجات الراحة والصحة."
        : "Chilled bottled water, refreshing wipes, and rigorous vehicle cabin sanitization before every trip.",
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "دقة متناهية بنسبة 100%" : "100% On-Time Precision",
      description: language === "ar"
        ? "السيارة متواجدة أمام باب بيتك قبل موعد الانطلاق بـ 15 دقيقة، لا تأخير ولا مفاجآت في الطريق."
        : "Your dedicated vehicle arrives at your doorstep 15 minutes ahead of schedule. Zero stress, zero delays.",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-gold-400" />,
      title: language === "ar" ? "دفع آمن ومرن (كاش / إنستاباي)" : "Flexible Payment Options",
      description: language === "ar"
        ? "ادفع نقداً عند الوصول أو عبر التحويل اللحظي إنستاباي، فودافون كاش، أو البطاقات الائتمانية بكل أريحية."
        : "Pay easily on arrival in cash, instant transfer (InstaPay / Vodafone Cash), or credit/debit card.",
    },
  ];

  return (
    <section className="py-6 px-3 sm:px-4 max-w-5xl mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.amenities.badge}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {t.amenities.title} <span className="gold-text-gradient">{t.amenities.titleHighlight}</span>
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
          {t.amenities.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
        {amenities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="glass-card rounded-xl p-3 sm:p-4 border border-gold-500/15 hover:border-gold-500/35 transition-all flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-transparent border border-gold-500/30 flex items-center justify-center shadow-gold-sm flex-shrink-0">
              {item.icon}
            </div>

            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-white font-cairo">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
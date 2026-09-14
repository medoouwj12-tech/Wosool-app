"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqSection() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: language === "ar" ? "كيف يتم تأكيد الحجز بعد إرسال الطلب عبر الواتساب؟" : "How is my booking confirmed after submitting the WhatsApp request?",
      a: language === "ar"
        ? "بمجرد الضغط على زر الحجز، تنتقل تلقائياً إلى واتساب وصول مع رسالة منسقة بكافة بياناتك. يقوم فريق خدمة العملاء بالرد عليك فوراً خلال دقيقتين لتأكيد الحجز وتزويدك ببيانات الكابتن ونوع ورقم السيارة."
        : "Once you tap the booking button, you are redirected to Wosool WhatsApp with your pre-filled itinerary. Our operations team responds within 2 minutes with driver details, car model, and confirmation.",
    },
    {
      q: language === "ar" ? "كم من الوقت أحتاج للحجز المسبق؟ وهل يوجد حجز فوري؟" : "How far in advance should I book? Is urgent booking available?",
      a: language === "ar"
        ? "نفضل الحجز المسبق قبل موعد السفر بـ 6 إلى 24 ساعة لضمان تجهيز أفضل سيارة وسائق لك. ومع ذلك، يوفر تطبيق وصول خدمة الحجز الفوري العاجل حيث يمكن توفير سيارة خلال 30 إلى 45 دقيقة داخل الإسكندرية."
        : "We recommend booking 6 to 24 hours in advance to guarantee your preferred vehicle. Urgent requests can also be accommodated within 30-45 minutes across Alexandria.",
    },
    {
      q: language === "ar" ? "كيف يتم التعامل مع تأخر رحلات الطيران في مطار القاهرة أو برج العرب؟" : "How are flight delays handled for airport pickups?",
      a: language === "ar"
        ? "نقوم بربط حجزك برقم الرحلة الجوية وتتبع مسار الطائرة لحظة بلحظة. إذا تأخرت الرحلة لأي سبب، ينتظرك الكابتن دون أي قلق أو إلغاء للحجز، مع خدمة الاستقبال بلافتة تحمل اسم العميل داخل صالة الوصول."
        : "We link your reservation to your flight number. In case of any flight delay, your chauffeur waits patiently at the arrivals terminal with a personalized name board at no penalty.",
    },
    {
      q: language === "ar" ? "ما هي طرق الدفع المتاحة لدى وصول ليموزين؟" : "What payment methods are accepted?",
      a: language === "ar"
        ? "نوفر لك أقصى درجات المرونة: يمكنك الدفع نقداً (كاش) للكابتن بعد انتهاء الرحلة ووصولك بسلامة الله، أو عبر التحويل اللحظي (InstaPay / إنستاباي)، محافظ فودافون كاش والمحافظ الإلكترونية، أو بالفيزا والماستركارد."
        : "You can pay in Cash directly to the chauffeur upon arrival, via instant bank transfer (InstaPay / Vodafone Cash), or via Visa and Mastercard.",
    },
    {
      q: language === "ar" ? "هل المشوار شامل البنزين ورسوم الطرق السريعة (الكارتات)؟" : "Does the booking include fuel and highway tolls?",
      a: language === "ar"
        ? "نعم بكل تأكيد! سياستنا قائمة على الوضوح التام؛ رحلتك شاملة السيارة الخاصة بالسائق، استهلاك الوقود بالكامل، ورسوم بوابات الطرق السريعة (الكارتات)، بدون أي رسوم خفية أو مفاجآت."
        : "Yes, 100%! All bookings are all-inclusive: private vehicle, chauffeur service, fuel, and all highway toll fees. No hidden fees.",
    },
    {
      q: language === "ar" ? "هل يمكن طلب سيارة بمقعد أطفال أو طلب محطة توقف في الطريق؟" : "Can I request a child safety seat or rest stops?",
      a: language === "ar"
        ? "بالتأكيد. يمكنك ذكر ذلك في خانة الملاحظات أثناء الحجز. كما يسعد كباتن وصول بالتوقف في استراحات الطرق السريعة المعتمدة للراحة أو تناول القهوة والمشروبات وفق رغبتك."
        : "Absolutely. Mention it in the special notes during booking. Our chauffeurs gladly stop at premium highway rest areas for coffee and refreshments upon request.",
    },
  ];

  return (
    <section className="py-6 px-3 sm:px-4 max-w-5xl mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.faq.badge}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {t.faq.title} <span className="gold-text-gradient">{t.faq.titleHighlight}</span>
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
          {t.faq.subtitle}
        </p>
      </div>

      <div className="space-y-2.5 max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-card rounded-xl border border-border-subtle overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-3 sm:p-4 text-right flex items-center justify-between gap-2.5 text-xs sm:text-sm font-bold text-white hover:text-gold-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gold-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3 pb-3 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t, language } = useLanguage();

  const reviews = [
    {
      name: language === "ar" ? "م. طارق عبد الحميد" : "Eng. Tarek Abdelhamid",
      role: language === "ar" ? "رجل أعمال - رحلات متكررة لمطار القاهرة" : "Businessman - Frequent Cairo Airport Traveler",
      rating: 5,
      date: language === "ar" ? "منذ أسبوع" : "1 week ago",
      comment: language === "ar"
        ? "أفضل خدمة ليموزين تعاملت معها من الإسكندرية. السيارة مرسيدس E-Class وصلت قبل موعدها بـ 20 دقيقة، السائق قمة في الذوق والهدوء بالقيادة، والسيارة في غاية النظافة والرقي."
        : "The finest limousine service from Alexandria. The Mercedes arrived 20 minutes early, the chauffeur was remarkably courteous, and the drive was peaceful and comfortable.",
    },
    {
      name: language === "ar" ? "د. نورهان الشناوي" : "Dr. Nourhan El-Shennawy",
      role: language === "ar" ? "طبيبة - رحلة عائلية للساحل الشمالي" : "Family Trip to North Coast",
      rating: 5,
      date: language === "ar" ? "منذ 3 أيام" : "3 days ago",
      comment: language === "ar"
        ? "طلبنا فان هيونداي H1 لأسرة كاملة مع كمية حقائب كبيرة، الفان وسيعة جداً ومكيفة بامتياز ومريحة للأطفال. الحجز عبر واتساب كان سريعاً وتم تأكيده في ثوانٍ. شكراً وصول!"
        : "We booked the Hyundai H1 for a large family trip with lots of luggage. Huge cabin space, chilled AC, and very comfortable for children. Instant WhatsApp confirmation. Highly recommended!",
    },
    {
      name: language === "ar" ? "أ. هاني سراج" : "Mr. Hany Serag",
      role: language === "ar" ? "مسافر قادم من الخارج (مطار القاهرة)" : "Arriving Traveler (Cairo Airport)",
      rating: 5,
      date: language === "ar" ? "أمس" : "Yesterday",
      comment: language === "ar"
        ? "الطائرة تأخرت ساعتين وكنت قلق جداً، لكن وجدت الكابتن في انتظاري بلافتة ترحيب وساعدني في الحقائب بكل احترام حتى وصلت بيتي في سموحة دون أي عناء."
        : "My flight was delayed by 2 hours, but the driver was waiting patiently with a name sign at arrivals and handled all luggage with care. Smooth trip back to Alexandria.",
    },
  ];

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{t.testimonials.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-cairo">
          {t.testimonials.title} <span className="gold-text-gradient">{t.testimonials.titleHighlight}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          {t.testimonials.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-gold-500/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gold-500/30" />
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{rev.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-gray-400 block">{rev.role}</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car,
  Star,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BadgePercent,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<boolean>(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

export default function HeroSection() {
  const { t, language } = useLanguage();

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFleet = () => {
    const el = document.getElementById("fleet-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  const tripsCount = useCountUp(5200, 2000);
  const ratingVal = useCountUp(49, 1500); // will show as 4.9
  const punctualVal = useCountUp(99, 1800);

  return (
    <section className="relative overflow-hidden pt-2 pb-6 px-3 sm:px-4 w-full">
      {/* Ambient background glow */}
      <div className="ambient-glow top-0 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-gold-500/10 pointer-events-none" />
      <div className="ambient-glow -bottom-10 left-10 w-48 sm:w-80 h-48 sm:h-80 bg-amber-600/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* VIP Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-2 sm:mb-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500/15 via-gold-400/10 to-transparent border border-gold-500/30 text-gold-200 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-gold-sm">
            <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
            <span>{t.hero.topBadge}</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight font-cairo">
            {t.hero.titleStart} <span className="gold-text-gradient">{t.hero.alexandria}</span> {t.hero.titleEnd}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed px-1">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Hero Automotive Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 relative rounded-2xl overflow-hidden border border-gold-500/25 bg-gradient-to-b from-[#161622] to-[#0D0D12] p-3.5 sm:p-5 shadow-glass group"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="w-full md:w-1/2 space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-gold-400 font-bold uppercase tracking-wider">
                <Car className="w-3.5 h-3.5 text-gold-400" />
                <span>{t.hero.featureHeader}</span>
              </div>
              <h2 className="text-base sm:text-2xl font-extrabold text-white leading-snug">
                {t.hero.featureTitle}
              </h2>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature3}</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-1.5 flex gap-2 w-full">
                <button
                  onClick={scrollToBooking}
                  className="flex-1 gold-btn py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 touch-press"
                >
                  <span>{t.hero.bookNow}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={scrollToFleet}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-secondary/80 border border-gold-500/30 text-gold-200 hover:text-white text-xs sm:text-sm font-semibold transition-all touch-press whitespace-nowrap"
                >
                  {t.hero.exploreFleet}
                </button>
              </div>
            </div>

            {/* Visual vehicle showcase container */}
            <div className="w-full md:w-1/2 relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
              <Image
                src="/images/mg-zs.jpeg"
                alt="أسطول وصول الفاخر"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-2.5 sm:p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">إم جي ZS & فيات تيبو</span>
                    <span className="text-[10px] text-gold-300">سيارات حديثة مكيفة للسفر</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded bg-gold-500 text-black shadow">
                    VIP Class
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Trust & Performance Stats - Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center"
        >
          <div className="glass-panel rounded-xl p-2 sm:p-2.5 border border-border-subtle">
            <span className="text-base sm:text-xl font-black gold-text-gradient block font-mono">
              {tripsCount.toLocaleString("ar-EG")}+
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-400">{t.hero.statsTripsLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2 sm:p-2.5 border border-border-subtle">
            <div className="flex items-center justify-center gap-1">
              <span className="text-base sm:text-xl font-black text-white font-mono">
                {(ratingVal / 10).toFixed(1)}
              </span>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-400">{t.hero.statsRatingLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2 sm:p-2.5 border border-border-subtle">
            <span className="text-base sm:text-xl font-black text-emerald-400 block font-mono">
              {punctualVal}%
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-400">{t.hero.statsPunctualLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2 sm:p-2.5 border border-border-subtle">
            <span className="text-base sm:text-xl font-black text-gold-300 block font-mono">
              {t.hero.statsSupport}
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-400">{t.hero.statsSupportLabel}</span>
          </div>
        </motion.div>

        {/* Offers Promo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-3"
        >
          <Link
            href="/offers"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500/10 via-amber-500/5 to-transparent border border-gold-500/25 hover:border-gold-500/50 transition-all group"
          >
            <div className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span className="text-[11px] font-bold text-gold-200">
                {language === "ar" ? "🎁 عروض وباقات حصرية — وفّر حتى 20% على رحلتك!" : "🎁 Exclusive Packages — Save up to 20% on your trip!"}
              </span>
            </div>
            <ArrowIcon className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-[-2px] transition-transform flex-shrink-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
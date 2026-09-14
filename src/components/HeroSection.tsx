"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  Star,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <section className="relative overflow-hidden pt-4 pb-8 px-4 w-full">
      {/* Ambient background glow orbs */}
      <div className="ambient-glow top-0 right-1/4 w-72 h-72 bg-gold-500/10 pointer-events-none" />
      <div className="ambient-glow -bottom-10 left-10 w-80 h-80 bg-amber-600/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* VIP Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-500/15 via-gold-400/10 to-transparent border border-gold-500/30 text-gold-200 text-xs font-semibold backdrop-blur-md shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>{t.hero.topBadge}</span>
          </div>
        </motion.div>

        {/* Hero Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight font-cairo">
            {t.hero.titleStart} <span className="gold-text-gradient">{t.hero.alexandria}</span> {t.hero.titleEnd}
          </h1>
          <p className="mt-3 text-xs sm:text-base text-gray-300 font-normal leading-relaxed">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Hero Automotive Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 relative rounded-2xl overflow-hidden border border-gold-500/25 bg-gradient-to-b from-[#161622] to-[#0D0D12] p-4 shadow-glass group"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
                <Car className="w-4 h-4 text-gold-400" />
                <span>{t.hero.featureHeader}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {t.hero.featureTitle}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{t.hero.feature3}</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={scrollToBooking}
                  className="flex-1 min-w-[140px] gold-btn py-3 px-5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 touch-press"
                >
                  <span>{t.hero.bookNow}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToFleet}
                  className="px-4 py-3 rounded-xl bg-surface-secondary/80 border border-gold-500/30 text-gold-200 hover:text-white hover:border-gold-400 text-sm font-semibold transition-all touch-press"
                >
                  {t.hero.exploreFleet}
                </button>
              </div>
            </div>

            {/* Visual vehicle showcase container */}
            <div className="w-full md:w-1/2 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
                alt="أسطول وصول الفاخر"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{t.hero.cardBadge}</span>
                    <span className="text-[11px] text-gold-300">{t.hero.cardSub}</span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-gold-500 text-black shadow">
                    VIP Class
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Trust & Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center"
        >
          <div className="glass-panel rounded-xl p-2.5 border border-border-subtle">
            <span className="text-lg sm:text-xl font-black gold-text-gradient block font-mono">
              {t.hero.statsTrips}
            </span>
            <span className="text-[11px] text-gray-400">{t.hero.statsTripsLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2.5 border border-border-subtle">
            <div className="flex items-center justify-center gap-1">
              <span className="text-lg sm:text-xl font-black text-white font-mono">{t.hero.statsRating}</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-[11px] text-gray-400">{t.hero.statsRatingLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2.5 border border-border-subtle">
            <span className="text-lg sm:text-xl font-black text-emerald-400 block font-mono">
              {t.hero.statsPunctual}
            </span>
            <span className="text-[11px] text-gray-400">{t.hero.statsPunctualLabel}</span>
          </div>

          <div className="glass-panel rounded-xl p-2.5 border border-border-subtle">
            <span className="text-lg sm:text-xl font-black text-gold-300 block font-mono">
              {t.hero.statsSupport}
            </span>
            <span className="text-[11px] text-gray-400">{t.hero.statsSupportLabel}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
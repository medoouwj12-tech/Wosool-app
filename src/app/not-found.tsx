"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Car, Phone, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0C] text-gray-100 flex flex-col items-center justify-center px-4 font-cairo relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-0 right-1/4 w-96 h-96 rounded-full bg-gold-500/8 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-600/6 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold-500/50 shadow-gold-md bg-black">
            <Image src="/logo.jpeg" alt="وصول ليموزين" fill className="object-cover" />
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-8xl sm:text-9xl font-black gold-text-gradient font-mono leading-none block">
            404
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30">
            <Car className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-300 font-bold">الصفحة المطلوبة غير موجودة</span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-5 border border-gold-500/20 mb-6"
        >
          <h1 className="text-xl font-black text-white mb-2">
            عفواً، هذه الصفحة ضلّت الطريق! 🚗
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            يبدو أن السيارة انعدلت عن المسار الصح. لكن لا قلق — فريق وصول دايماً موجود لإعادتك للمسار الصحيح بأمان وراحة!
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>وصول ليموزين — رحلتك في أمان</span>
            <Sparkles className="w-3 h-3 text-gold-400" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <Link
            href="/"
            className="w-full gold-btn py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 touch-press shadow-gold-md"
          >
            <Home className="w-4 h-4" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/#booking-section"
              className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
            >
              <Car className="w-3.5 h-3.5 text-gold-400" />
              <span>احجز رحلة</span>
            </Link>
            <a
              href="tel:+201016518716"
              className="py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصل بنا</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 mt-2">
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>الإسكندرية، مصر — خدمة 24/7</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

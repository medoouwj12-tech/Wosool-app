"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Shield } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#08080A] border-t border-border-subtle pt-8 pb-24 px-3 sm:px-4 text-gray-400 text-xs font-cairo">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6">
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-gold-500/40 p-0.5 bg-black flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="وصول ليموزين"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="text-base sm:text-xl font-extrabold gold-text-gradient block">
                  {t.brand.name} | {t.brand.tagline}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gold-300">
                  {t.brand.subtagline}
                </span>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-1.5 text-xs">
              <a
                href="tel:+201016518716"
                className="flex items-center gap-1.5 text-gray-300 hover:text-gold-300 transition-colors"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-mono font-bold">+20 101 651 8716</span>
              </a>
              <a
                href="https://wa.me/201016518716"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>واتساب 24/7 (WhatsApp)</span>
              </a>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>{t.footer.alexEgypt}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {t.footer.coverageTitle}
            </h4>
            <ul className="space-y-1 text-[11px] text-gray-400">
              <li>{t.footer.coverage1}</li>
              <li>{t.footer.coverage2}</li>
              <li>{t.footer.coverage3}</li>
              <li>{t.footer.coverage4}</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] sm:text-[11px] text-gray-500 text-center sm:text-right">
          <p>© {new Date().getFullYear()} {t.brand.tagline}. {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-2.5 text-gray-400 flex-wrap justify-center">
            <Link href="/offers" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              🎁 العروض والباقات
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <Link href="/admin" className="text-gray-500 hover:text-gold-300 flex items-center gap-1 transition-colors">
              <Shield className="w-3 h-3" />
              <span>الإدارة</span>
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{t.footer.luxuryPwa}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, KeyRound } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
  language: "ar" | "en";
}

export default function AdminLogin({ onSuccess, language }: AdminLoginProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2026" || pin === "admin" || pin === "wosool2026") {
      sessionStorage.setItem("wosool_admin_auth", "true");
      onSuccess();
    } else {
      setError(language === "ar" ? "رمز المرور غير صحيح (الافتراضي: 2026)" : "Incorrect PIN (Default: 2026)");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-cairo">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl text-center space-y-6">
        <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-gold-500/50 p-1 bg-black shadow-gold-sm">
          <Image src="/logo.jpeg" alt="وصول" width={64} height={64} className="rounded-xl object-cover" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>{language === "ar" ? "لوحة الإدارة والتحكم المحمية" : "Protected Admin Portal"}</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            وصول ليموزين <span className="gold-text-gradient">VIP Admin</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {language === "ar"
              ? "أدخل رمز الدخول السري للوصول إلى الحجوزات وإدارة الأسطول"
              : "Enter secret PIN to access reservations & fleet"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={language === "ar" ? "رمز الدخول PIN (الافتراضي: 2026)" : "Enter PIN (Default: 2026)"}
                className="w-full glass-input rounded-xl px-4 py-3 text-center text-lg font-mono text-white tracking-widest placeholder-gray-500 focus:ring-2 focus:ring-gold-500"
                autoFocus
              />
              <KeyRound className="w-5 h-5 text-gold-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full gold-btn py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 touch-press"
          >
            <Lock className="w-4 h-4" />
            <span>{language === "ar" ? "تسجيل الدخول" : "Unlock Dashboard"}</span>
          </button>
        </form>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
          <Link href="/" className="hover:text-gold-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "العودة للتطبيق الرئيسي" : "Back to Main App"}</span>
          </Link>
          <span className="text-[11px] text-gray-500 font-mono">PIN: 2026</span>
        </div>
      </div>
    </div>
  );
}
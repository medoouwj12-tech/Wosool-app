"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Smartphone, Sparkles, PlusSquare } from "lucide-react";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // If dismissed recently, respect user choice
    const dismissed = localStorage.getItem("wosool_pwa_dismissed");
    if (!dismissed && isIosDevice) {
      // Show iOS banner after 3 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      alert("لتثبيت التطبيق: افتح قائمة المتصفح (⋮) ثم اختر 'تثبيت التطبيق' أو 'إضافة إلى الشاشة الرئيسية'");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem("wosool_pwa_dismissed", "true");
  };

  if (!showPrompt && !showIOSInstructions) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto">
      <div className="glass-panel p-3.5 rounded-2xl border border-gold-500/40 shadow-2xl bg-[#121218]/95 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gold-500/40 flex-shrink-0 bg-black">
              <Image
                src="/logo.jpeg"
                alt="شعار وصول"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white">ثبّت تطبيق وصول ليموزين</span>
                <span className="text-[9px] bg-gold-500/20 text-gold-300 px-1.5 py-0.2 rounded">PWA</span>
              </div>
              <p className="text-[10px] text-gray-300">
                وصول أسرع بدون إنترنت وسهولة في حجز رحلاتك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleInstallClick}
              className="gold-btn py-1.5 px-3 rounded-lg text-xs font-black flex items-center gap-1 touch-press"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تثبيت</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-gray-400 hover:text-white"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iOS Helper modal / tip */}
        {showIOSInstructions && (
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-300 space-y-1.5">
            <p className="font-bold text-gold-300 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>طريقة التثبيت على أجهزة iPhone:</span>
            </p>
            <ol className="list-decimal list-inside text-[11px] space-y-1 text-gray-300 pr-1">
              <li>اضغط على زر المشاركة السفلي (Share <PlusSquare className="inline w-3 h-3 text-gold-400" />)</li>
              <li>اختر <strong className="text-white">&quot;إضافة إلى الصفحة الرئيسية&quot;</strong> (Add to Home Screen)</li>
              <li>اضغط على &quot;إضافة&quot; ليظهر كأيقونة تطبيق رسمي</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

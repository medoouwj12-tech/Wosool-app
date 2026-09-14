"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  MapPin,
  Calendar,
  Car,
  Users,
  Briefcase,
  Navigation,
  CheckCircle,
  Sparkles,
  Send,
  ShieldCheck,
  AlertCircle,
  Flame,
  Clock,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ALEXANDRIA_PICKUP_AREAS, DESTINATIONS } from "@/data/locations";
import { FLEET } from "@/data/fleet";
import { getWhatsAppBookingUrl } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { saveBooking } from "@/lib/bookingsStorage";

interface BookingEngineProps {
  selectedVehicleId?: string;
  onVehicleChange?: (id: string) => void;
  selectedDestinationId?: string;
}

export default function BookingEngine({
  selectedVehicleId,
  selectedDestinationId,
}: BookingEngineProps) {
  const { t, language } = useLanguage();

  const [pickupArea, setPickupArea] = useState<string>("سموحة");
  const [customPickupAddress, setCustomPickupAddress] = useState<string>("");
  const [destinationId, setDestinationId] = useState<string>("cairo_airport");
  const [tripType, setTripType] = useState<"ذهاب فقط" | "ذهاب وعودة">("ذهاب فقط");

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [tripDate, setTripDate] = useState<string>(getTomorrowDate());
  const [tripTime, setTripTime] = useState<string>("10:00");
  const [isImmediate, setIsImmediate] = useState<boolean>(false);

  const [vehicleId, setVehicleId] = useState<string>(selectedVehicleId || "mg-zs");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [flightOrNotes, setFlightOrNotes] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedVehicleId && FLEET.some((f) => f.id === selectedVehicleId)) {
      setVehicleId(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  useEffect(() => {
    if (selectedDestinationId) setDestinationId(selectedDestinationId);
  }, [selectedDestinationId]);

  const selectedDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const selectedCar = FLEET.find((f) => f.id === vehicleId) || FLEET[0];

  const handleImmediateBookingToggle = () => {
    if (!isImmediate) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 45);
      setTripDate(new Date().toISOString().split("T")[0]);
      setTripTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      );
      setIsImmediate(true);
    } else {
      setIsImmediate(false);
      setTripDate(getTomorrowDate());
      setTripTime("10:00");
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!clientName.trim()) {
      newErrors.name = language === "ar" ? "يرجى كتابة اسمك" : "Please enter your name";
    }
    const cleanPhone = clientPhone.replace(/\s+/g, "").replace(/-/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.phone = language === "ar" ? "يرجى كتابة رقم هاتف صحيح للتواصل" : "Please enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E5AB", "#10B981", "#25D366"],
      });
    } catch {
      // ignore
    }

    const fullPickup = customPickupAddress.trim()
      ? `${pickupArea} (${customPickupAddress.trim()})`
      : pickupArea;

    const dateTimeStr = isImmediate
      ? `فوري الآن (${tripDate} ${tripTime})`
      : `${tripDate}`;

    const notes = flightOrNotes.trim();

    try {
      saveBooking({
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        pickupArea: fullPickup,
        destination: selectedDest.name,
        date: tripDate,
        time: tripTime,
        tripType: tripType,
        selectedVehicle: selectedCar.name,
        estimatedFare: 0,
        notes: notes,
      });
    } catch {
      // ignore
    }

    const whatsappUrl = getWhatsAppBookingUrl({
      name: clientName.trim(),
      phone: clientPhone.trim(),
      pickupArea: fullPickup,
      destination: selectedDest.name,
      date: dateTimeStr,
      time: tripTime,
      tripType: tripType,
      selectedVehicle: selectedCar.name,
      notes: notes,
    });

    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="booking-section" className="py-4 sm:py-6 px-3 sm:px-4 max-w-4xl mx-auto scroll-mt-16 sm:scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{language === "ar" ? "حجز سريع ومباشر" : "Instant Direct Booking"}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {language === "ar" ? (
            <>احجز رحلتك <span className="gold-text-gradient">بكل سهولة</span></>
          ) : (
            <>Book Your Trip <span className="gold-text-gradient">Effortlessly</span></>
          )}
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
          {language === "ar"
            ? "خطوات بسيطة — اختر مشوارك وسيارتك وسيتم التواصل معك وتأكيد حجزك فوراً"
            : "Simple steps — pick your route and car, instant confirmation via WhatsApp"}
        </p>
      </div>

      {/* Main Glass Booking Panel */}
      <div className="glass-panel rounded-2xl p-3.5 sm:p-6 border border-gold-500/30 shadow-2xl relative">
        {/* Simple Step indicator */}
        <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3 mb-4 text-[11px] sm:text-xs text-gray-400">
          <div className="flex items-center gap-1.5 text-gold-300 font-bold">
            <span className="w-5 h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span>{language === "ar" ? "المشوار" : "Route"}</span>
          </div>
          <span className="h-0.5 w-6 sm:w-12 bg-border-subtle" />
          <div className="flex items-center gap-1.5 text-gold-300 font-bold">
            <span className="w-5 h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] font-black">
              2
            </span>
            <span>{language === "ar" ? "السيارة" : "Vehicle"}</span>
          </div>
          <span className="h-0.5 w-6 sm:w-12 bg-border-subtle" />
          <div className="flex items-center gap-1.5 text-gold-300 font-bold">
            <span className="w-5 h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] font-black">
              3
            </span>
            <span>{language === "ar" ? "بياناتك" : "Details"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trip Type Toggle */}
          <div className="bg-surface-secondary/90 p-1 rounded-xl border border-border-subtle flex items-center">
            <button
              type="button"
              onClick={() => setTripType("ذهاب فقط")}
              className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                tripType === "ذهاب فقط"
                  ? "bg-gold-500 text-black shadow-gold-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>{language === "ar" ? "ذهاب فقط" : "One Way"}</span>
            </button>
            <button
              type="button"
              onClick={() => setTripType("ذهاب وعودة")}
              className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                tripType === "ذهاب وعودة"
                  ? "bg-gold-500 text-black shadow-gold-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>{language === "ar" ? "ذهاب وعودة" : "Round Trip"}</span>
            </button>
          </div>

          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Pickup */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-gray-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{language === "ar" ? "نقطة الانطلاق (الإسكندرية)" : "Pickup (Alexandria)"}</span>
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {language === "ar" ? "من أمام باب منزلك" : "Door-to-door"}
                </span>
              </label>

              <div className="relative">
                <select
                  value={pickupArea}
                  onChange={(e) => setPickupArea(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-gold-500"
                >
                  {ALEXANDRIA_PICKUP_AREAS.map((area) => (
                    <option key={area.id} value={area.name} className="bg-[#121218] text-white">
                      {language === "ar" ? `الإسكندرية - ${area.name} (${area.zone})` : `Alexandria - ${area.name}`}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>

              <input
                type="text"
                value={customPickupAddress}
                onChange={(e) => setCustomPickupAddress(e.target.value)}
                placeholder={language === "ar" ? "عنوانك بالتفصيل (اسم الشارع / علامة مميزة) - اختياري" : "Detailed address / Landmark (Optional)"}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-gray-200">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === "ar" ? "الوجهة" : "Destination"}</span>
                </span>
                <span className="text-[10px] text-gold-300 font-mono">
                  {selectedDest.distanceKm} كم
                </span>
              </label>

              <div className="relative">
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-gold-500"
                >
                  <optgroup label="⭐ أشهر الوجهات والمطارات" className="bg-[#121218] text-gold-300 font-bold">
                    {DESTINATIONS.filter((d) => d.popular).map((dest) => (
                      <option key={dest.id} value={dest.id} className="text-white font-normal">
                        {dest.name} - ({dest.estimatedHours})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="📍 جميع الوجهات والمحافظات" className="bg-[#121218] text-gray-400 font-bold">
                    {DESTINATIONS.filter((d) => !d.popular).map((dest) => (
                      <option key={dest.id} value={dest.id} className="text-white font-normal">
                        {dest.name} - ({dest.categoryName})
                      </option>
                    ))}
                  </optgroup>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 bg-surface-secondary/50 px-2.5 py-1 rounded-lg border border-white/5">
                <span>الوقت التقديري: <strong className="text-gray-200">{selectedDest.estimatedHours}</strong></span>
                <span>المسافة: <strong className="text-gray-200">{selectedDest.distanceKm} كم</strong></span>
              </div>
            </div>
          </div>

          {/* Vehicle Selection - Simple 2 Real Cars Grid */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-gray-200">
              <span className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-gold-400" />
                <span>{language === "ar" ? "اختر سيارتك المفضلة" : "Select Your Car"}</span>
              </span>
              <span className="text-[10px] text-gold-300">
                {language === "ar" ? "موديلات حديثة مكيفة" : "Modern Air-Conditioned"}
              </span>
            </label>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {FLEET.map((vehicle) => {
                const isSelected = vehicle.id === vehicleId;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => setVehicleId(vehicle.id)}
                    className={`cursor-pointer rounded-2xl p-2.5 sm:p-3 transition-all duration-200 border relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-gradient-to-b from-[#222234] to-[#14141e] border-gold-400 shadow-gold-sm ring-2 ring-gold-400/40"
                        : "bg-surface/80 border-border-subtle hover:border-gray-600 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm font-black text-white truncate">
                          {language === "ar" ? vehicle.name : vehicle.nameEn}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-gold-500 text-black flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2 bg-black border border-white/5">
                        <Image
                          src={vehicle.image}
                          alt={vehicle.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 300px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-gold-300 block font-bold">
                        {vehicle.category}
                      </span>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gold-400" />
                          <span>{vehicle.passengers} ركاب</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-gold-400" />
                          <span>{vehicle.luggage} حقائب</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-200">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>{language === "ar" ? "موعد الرحلة" : "Trip Schedule"}</span>
              </label>

              <button
                type="button"
                onClick={handleImmediateBookingToggle}
                className={`text-[10px] sm:text-[11px] px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-all ${
                  isImmediate
                    ? "bg-amber-500 text-black shadow"
                    : "bg-surface-secondary text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                }`}
              >
                <Flame className="w-3 h-3 fill-current" />
                <span>{language === "ar" ? "⚡ حجز فوري الآن" : "⚡ Immediate Trip"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <input
                type="date"
                value={tripDate}
                disabled={isImmediate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:ring-1 focus:ring-gold-500 disabled:opacity-50"
              />

              <input
                type="time"
                value={tripTime}
                disabled={isImmediate}
                onChange={(e) => setTripTime(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:ring-1 focus:ring-gold-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Passenger Information */}
          <div className="space-y-2.5 pt-1 border-t border-border-subtle/80">
            <h3 className="text-[11px] sm:text-xs font-bold text-gold-300">
              {language === "ar" ? "بيانات المسافر" : "Passenger Info"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] text-gray-300 mb-1 font-medium">
                  {language === "ar" ? "الاسم الكريم" : "Your Name"} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder={language === "ar" ? "مثال: أحمد محمد" : "e.g. Ahmed Mohamed"}
                  className={`w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] text-gray-300 mb-1 font-medium">
                  {language === "ar" ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="01012345678"
                  className={`w-full glass-input rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 text-right ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] text-gray-300 mb-1 font-medium">
                {language === "ar" ? "رقم الرحلة الجوية أو ملاحظات إضافية (اختياري)" : "Flight Number or Extra Notes (Optional)"}
              </label>
              <input
                type="text"
                value={flightOrNotes}
                onChange={(e) => setFlightOrNotes(e.target.value)}
                placeholder={language === "ar" ? "مثال: صالة 3 - وصول رحلة مصر للطيران" : "e.g. Terminal 3 arrival"}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Simple Reassurance Strip (NO PRICES) */}
          <div className="rounded-xl bg-gradient-to-r from-gold-500/10 via-[#181824] to-emerald-500/10 p-3 sm:p-3.5 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">
                  {language === "ar" ? "تأكيد فوري ومباشر مع الإدارة" : "Instant Confirmation with Management"}
                </span>
                <span className="text-[10px] text-gray-400">
                  {language === "ar" ? "بدون أي مصاريف خفية • سيارة معقمة وسائق محترف" : "No hidden fees • Sanitized car & professional driver"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gold-300 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "رد خلال دقيقتين" : "Response in 2 mins"}</span>
            </div>
          </div>

          {/* WhatsApp Direct Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full gold-btn py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-extrabold text-sm sm:text-lg flex items-center justify-center gap-2.5 shadow-gold-md hover:shadow-gold-lg transition-all touch-press group"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                <span>{language === "ar" ? "جاري تجهيز الحجز..." : "Preparing booking..."}</span>
              </span>
            ) : (
              <>
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="truncate">{language === "ar" ? "تأكيد الحجز عبر واتساب مباشرة" : "Confirm Booking via WhatsApp"}</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:-translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Guarantee Footer */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-gray-400 pt-0.5 flex-wrap">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{language === "ar" ? "تأكيد سريع 24/7" : "Fast confirmation 24/7"}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{language === "ar" ? "إلغاء مجاني" : "Free cancellation"}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span dir="ltr">01016518716</span>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
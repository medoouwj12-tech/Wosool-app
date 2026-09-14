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

  const [vehicleId, setVehicleId] = useState<string>(selectedVehicleId || "toyota-corolla");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [flightOrNotes, setFlightOrNotes] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedVehicleId) setVehicleId(selectedVehicleId);
  }, [selectedVehicleId]);

  useEffect(() => {
    if (selectedDestinationId) setDestinationId(selectedDestinationId);
  }, [selectedDestinationId]);

  const selectedDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const selectedCar = FLEET.find((f) => f.id === vehicleId) || FLEET[0];

  const calculateFare = () => {
    const baseRoutePrice = selectedDest.startingPrice;
    const vehicleMultiplier = selectedCar.pricePerKmMultiplier;
    let total = Math.round(baseRoutePrice * vehicleMultiplier);

    if (tripType === "ذهاب وعودة") {
      total = Math.round(total * 1.85);
    }
    return total;
  };

  const estimatedFare = calculateFare();

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
      newErrors.name = t.booking.nameError;
    }
    const cleanPhone = clientPhone.replace(/\s+/g, "").replace(/-/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.phone = t.booking.phoneError;
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

    const combinedNotes = [
      flightOrNotes.trim(),
      `السعر التقديري للتطبيق: ${estimatedFare.toLocaleString("ar-EG")} ج.م تقريباً`,
    ]
      .filter(Boolean)
      .join(" - ");

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
        estimatedFare: estimatedFare,
        notes: combinedNotes,
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
      notes: combinedNotes,
    });

    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <section id="booking-section" className="py-4 sm:py-6 px-3 sm:px-4 max-w-5xl mx-auto scroll-mt-16 sm:scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.booking.badge}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white font-cairo">
          {t.booking.title} <span className="gold-text-gradient">{t.booking.titleHighlight}</span>
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
          {t.booking.subtitle}
        </p>
      </div>

      {/* Main Glass Booking Panel */}
      <div className="glass-panel rounded-2xl p-3.5 sm:p-6 border border-gold-500/30 shadow-2xl relative">
        {/* Step indicator pills */}
        <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3 mb-4 text-[11px] sm:text-xs text-gray-400">
          <div className="flex items-center gap-1 text-gold-300 font-bold">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] sm:text-[11px] font-black">
              1
            </span>
            <span className="truncate">{t.booking.step1}</span>
          </div>
          <span className="h-0.5 w-4 sm:w-8 bg-border-subtle" />
          <div className="flex items-center gap-1 text-gold-300 font-bold">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] sm:text-[11px] font-black">
              2
            </span>
            <span className="truncate">{t.booking.step2}</span>
          </div>
          <span className="h-0.5 w-4 sm:w-8 bg-border-subtle" />
          <div className="flex items-center gap-1 text-gold-300 font-bold">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-500 text-black flex items-center justify-center text-[10px] sm:text-[11px] font-black">
              3
            </span>
            <span className="truncate">{t.booking.step3}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
              <span>{t.booking.oneWay}</span>
            </button>
            <button
              type="button"
              onClick={() => setTripType("ذهاب وعودة")}
              className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 relative ${
                tripType === "ذهاب وعودة"
                  ? "bg-gold-500 text-black shadow-gold-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span>{t.booking.roundTrip}</span>
              <span className="text-[9px] sm:text-[10px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded shadow">
                {t.booking.discountBadge}
              </span>
            </button>
          </div>

          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Pickup */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-gray-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t.booking.pickupLabel}</span>
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {t.booking.doorstepBadge}
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
                placeholder={t.booking.customAddressPlaceholder}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-gray-200">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.booking.destinationLabel}</span>
                </span>
                <span className="text-[10px] text-gold-300 font-mono">
                  {selectedDest.distanceKm} km
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
                <span>{t.booking.approxTime} <strong className="text-gray-200">{selectedDest.estimatedHours}</strong></span>
                <span>{t.booking.distance} <strong className="text-gray-200">{selectedDest.distanceKm} km</strong></span>
              </div>
            </div>
          </div>

          {/* Vehicle Selection - Mobile Touch Horizontal Swiper */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-200">
                <Car className="w-3.5 h-3.5 text-gold-400" />
                <span>{t.booking.vehicleLabel}</span>
              </label>
              <span className="text-[10px] text-gold-300 font-medium">
                (اسحب لاختيار السيارة ↔)
              </span>
            </div>

            {/* Horizontal Swipable Car Carousel */}
            <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
              {FLEET.map((vehicle) => {
                const isSelected = vehicle.id === vehicleId;
                const carShortName = language === "ar"
                  ? vehicle.name.replace(/\(.*?\)/g, "").trim()
                  : vehicle.nameEn.split(" ")[0] + " " + (vehicle.nameEn.split(" ")[1] || "");

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => setVehicleId(vehicle.id)}
                    className={`cursor-pointer flex-shrink-0 w-[145px] sm:w-[170px] snap-start rounded-xl p-2 transition-all duration-200 border text-right relative overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-b from-[#222234] to-[#14141e] border-gold-400 shadow-gold-sm ring-1 ring-gold-400/50"
                        : "bg-surface/80 border-border-subtle hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-gray-200 truncate">
                        {carShortName}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                      )}
                    </div>

                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden my-1 bg-black/50">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        sizes="170px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1">
                      <span className="flex items-center gap-0.5">
                        <Users className="w-2.5 h-2.5 text-gold-400" />
                        <span>{vehicle.passengers}</span>
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Briefcase className="w-2.5 h-2.5 text-gold-400" />
                        <span>{vehicle.luggage}</span>
                      </span>
                      <span className="text-gold-300 font-bold text-[9px]">
                        {vehicle.baseStartingPrice} ج.م
                      </span>
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
                <span>{t.booking.dateTimeLabel}</span>
              </label>

              <button
                type="button"
                onClick={handleImmediateBookingToggle}
                className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 transition-all ${
                  isImmediate
                    ? "bg-amber-500 text-black shadow"
                    : "bg-surface-secondary text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                }`}
              >
                <Flame className="w-3 h-3 fill-current" />
                <span>{t.booking.immediateBtn}</span>
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
              {t.booking.passengerHeader}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-[10px] sm:text-[11px] text-gray-300 mb-1 font-medium">
                  {t.booking.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder={t.booking.namePlaceholder}
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
                  {t.booking.phoneLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder={t.booking.phonePlaceholder}
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
                {t.booking.notesLabel}
              </label>
              <input
                type="text"
                value={flightOrNotes}
                onChange={(e) => setFlightOrNotes(e.target.value)}
                placeholder={t.booking.notesPlaceholder}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Live Fare Estimation */}
          <div className="rounded-xl bg-gradient-to-r from-gold-500/10 via-[#181824] to-gold-500/5 p-3 sm:p-4 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="space-y-0.5 text-center sm:text-right w-full sm:w-auto">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] text-gray-300 font-semibold">{t.booking.fareLabel}</span>
                <span className="text-lg sm:text-2xl font-black gold-text-gradient font-mono">
                  {estimatedFare.toLocaleString("ar-EG")} ج.م
                </span>
                {tripType === "ذهاب وعودة" && (
                  <span className="text-[9px] bg-gold-500/20 text-gold-300 px-1.5 py-0.2 rounded border border-gold-500/40">
                    {t.booking.roundTripIncluded}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400">
                {t.booking.fareDisclaimer}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.booking.paymentNote}</span>
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
                <span>{t.booking.submittingBtn}</span>
              </span>
            ) : (
              <>
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="truncate">{t.booking.confirmBtn}</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:-translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Guarantee Footer */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-gray-400 pt-0.5 flex-wrap">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{t.booking.twoMinReply}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{t.booking.freeCancellation}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>01016518716</span>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
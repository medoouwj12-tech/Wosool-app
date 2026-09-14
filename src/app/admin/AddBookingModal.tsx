"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { BookingRecord, saveBooking } from "@/lib/bookingsStorage";
import { FLEET } from "@/data/fleet";
import { DESTINATIONS, ALEXANDRIA_PICKUP_AREAS } from "@/data/locations";

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
  language: "ar" | "en";
}

export default function AddBookingModal({ isOpen, onClose, onAdded, language }: AddBookingModalProps) {
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    pickupArea: "سموحة",
    destination: "مطار القاهرة الدولي (مبنى 1 / 2 / 3)",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    tripType: "ذهاب فقط" as const,
    selectedVehicle: "مرسيدس E-Class رجال أعمال",
    estimatedFare: 3100,
    driverAssigned: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.clientPhone) {
      alert(language === "ar" ? "يرجى كتابة اسم العميل ورقم الهاتف" : "Please enter name and phone number");
      return;
    }
    saveBooking(form);
    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-cairo">
      <div className="glass-panel max-w-lg w-full rounded-3xl p-6 border border-gold-500/40 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-gold-400" />
            <span>{language === "ar" ? "إضافة حجز رحلة يدوي" : "Add Manual Booking"}</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">اسم العميل *</label>
              <input
                type="text"
                required
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">رقم الهاتف *</label>
              <input
                type="tel"
                required
                dir="ltr"
                value={form.clientPhone}
                onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">منطقة الانطلاق</label>
              <select
                value={form.pickupArea}
                onChange={(e) => setForm({ ...form, pickupArea: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white bg-[#121218]"
              >
                {ALEXANDRIA_PICKUP_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">الوجهة</label>
              <select
                value={form.destination}
                onChange={(e) => {
                  const dest = DESTINATIONS.find((d) => d.name === e.target.value);
                  setForm({
                    ...form,
                    destination: e.target.value,
                    estimatedFare: dest ? dest.startingPrice : form.estimatedFare,
                  });
                }}
                className="w-full glass-input rounded-xl px-3 py-2 text-white bg-[#121218]"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">نوع الرحلة</label>
              <select
                value={form.tripType}
                onChange={(e) => setForm({ ...form, tripType: e.target.value as any })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white bg-[#121218]"
              >
                <option value="ذهاب فقط">ذهاب فقط</option>
                <option value="ذهاب وعودة">ذهاب وعودة</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">التاريخ</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">الوقت</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">السيارة المختارة</label>
              <select
                value={form.selectedVehicle}
                onChange={(e) => setForm({ ...form, selectedVehicle: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white bg-[#121218]"
              >
                {FLEET.map((f) => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">السعر التقديري (ج.م)</label>
              <input
                type="number"
                value={form.estimatedFare}
                onChange={(e) => setForm({ ...form, estimatedFare: Number(e.target.value) })}
                className="w-full glass-input rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">تعيين السائق ورقم السيارة (اختياري)</label>
            <input
              type="text"
              value={form.driverAssigned}
              onChange={(e) => setForm({ ...form, driverAssigned: e.target.value })}
              placeholder="مثال: كابتن أحمد حسن - سيارة 3812 س ن"
              className="w-full glass-input rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">ملاحظات إضافية</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="رقم الرحلة أو تعليمات خاصة..."
              className="w-full glass-input rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white">
              إلغاء
            </button>
            <button type="submit" className="gold-btn px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 touch-press">
              <Plus className="w-4 h-4" />
              <span>حفظ وتأكيد الحجز</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BookingPayload {
  name: string;
  phone: string;
  pickupArea: string;
  destination: string;
  date: string;
  time: string;
  tripType: "ذهاب فقط" | "ذهاب وعودة";
  selectedVehicle: string;
  notes?: string;
}

export function formatWhatsAppMessage(data: BookingPayload): string {
  const notesText = data.notes && data.notes.trim() !== "" ? data.notes.trim() : "لا توجد ملاحظات خاصة";
  
  return `✨ طلب حجز جديد عبر تطبيق وصول ✨
----------------------------------
👤 اسم العميل: ${data.name}
📱 رقم الهاتف: ${data.phone}
📍 نقطة الانطلاق: الإسكندرية - ${data.pickupArea}
🏁 الوجهة: ${data.destination}
📅 التاريخ والوقت: ${data.date} | ${data.time}
🔄 نوع الرحلة: ${data.tripType}
🚘 السيارة المختارة: ${data.selectedVehicle}
📝 ملاحظات إضافية: ${notesText}
----------------------------------
تم إرسال الطلب عبر تطبيق وصول ليموزين 🚗✨`;
}

export function getWhatsAppBookingUrl(data: BookingPayload): string {
  const message = formatWhatsAppMessage(data);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/201016518716?text=${encoded}`;
}

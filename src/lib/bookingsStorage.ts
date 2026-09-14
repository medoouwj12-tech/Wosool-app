export interface BookingRecord {
  id: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  pickupArea: string;
  destination: string;
  date: string;
  time: string;
  tripType: "ذهاب فقط" | "ذهاب وعودة" | "One Way" | "Round Trip";
  selectedVehicle: string;
  estimatedFare: number;
  status: "new" | "confirmed" | "in_progress" | "completed" | "cancelled";
  driverAssigned?: string;
  notes?: string;
}

const STORAGE_KEY = "wosool_limousine_bookings_v1";

const INITIAL_MOCK_BOOKINGS: BookingRecord[] = [
  {
    id: "WSL-9041",
    createdAt: "2026-09-14T15:30:00.000Z",
    clientName: "م. طارق عبد الحميد",
    clientPhone: "01016518716",
    pickupArea: "سموحة - أمام نادي سموحة",
    destination: "مطار القاهرة الدولي (مبنى 1 / 2 / 3)",
    date: "2026-09-15",
    time: "06:00",
    tripType: "ذهاب فقط",
    selectedVehicle: "مرسيدس E-Class رجال أعمال",
    estimatedFare: 3100,
    status: "confirmed",
    driverAssigned: "كابتن محمود الصاوي (مرسيدس 4821)",
    notes: "استقبال بلافتة باسم العميل بصالة 3",
  },
  {
    id: "WSL-9040",
    createdAt: "2026-09-14T14:15:00.000Z",
    clientName: "د. نورهان الشناوي",
    clientPhone: "01123456789",
    pickupArea: "لوران - طريق الكورنيش",
    destination: "سيدي عبد الرحمن وهاسيندا ومراسي",
    date: "2026-09-15",
    time: "11:30",
    tripType: "ذهاب وعودة",
    selectedVehicle: "هيونداي H1 رويال VIP",
    estimatedFare: 3800,
    status: "new",
    notes: "معنا 6 حقائب سفر وأطفال",
  },
  {
    id: "WSL-9039",
    createdAt: "2026-09-14T10:45:00.000Z",
    clientName: "أ. هاني سراج الدين",
    clientPhone: "01098765432",
    pickupArea: "محطة الرمل",
    destination: "التجمع الخامس والقاهرة الجديدة",
    date: "2026-09-14",
    time: "14:00",
    tripType: "ذهاب فقط",
    selectedVehicle: "سيدان كومفورت فاخرة",
    estimatedFare: 1850,
    status: "in_progress",
    driverAssigned: "كابتن أحمد سامي (تويوتا كورولا 7192)",
  },
  {
    id: "WSL-9038",
    createdAt: "2026-09-13T18:20:00.000Z",
    clientName: "د. كريم المنشاوي",
    clientPhone: "01234567890",
    pickupArea: "المنتزه - المعمورة الشاطئ",
    destination: "الشيخ زايد ومدينة 6 أكتوبر",
    date: "2026-09-14",
    time: "08:00",
    tripType: "ذهاب فقط",
    selectedVehicle: "مرسيدس S-Class مايباخ VIP",
    estimatedFare: 4200,
    status: "completed",
    driverAssigned: "كابتن شريف عثمان (مرسيدس S 1100)",
  },
  {
    id: "WSL-9037",
    createdAt: "2026-09-13T12:00:00.000Z",
    clientName: "أ. ماجد العسقلاني",
    clientPhone: "01055566677",
    pickupArea: "سيدي جابر",
    destination: "طنطا والمحلة الكبرى (الغربية)",
    date: "2026-09-13",
    time: "15:00",
    tripType: "ذهاب فقط",
    selectedVehicle: "سيدان كومفورت فاخرة",
    estimatedFare: 1300,
    status: "completed",
  },
];

export function getBookings(): BookingRecord[] {
  if (typeof window === "undefined") return INITIAL_MOCK_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_BOOKINGS;
  }
}

export function saveBooking(booking: Omit<BookingRecord, "id" | "createdAt" | "status">): BookingRecord {
  const all = getBookings();
  const nextNum = 9042 + all.length;
  const newRecord: BookingRecord = {
    ...booking,
    id: `WSL-${nextNum}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  const updated = [newRecord, ...all];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newRecord;
}

export function updateBookingStatus(id: string, status: BookingRecord["status"], driverAssigned?: string): BookingRecord[] {
  const all = getBookings();
  const updated = all.map((b) => {
    if (b.id === id) {
      return {
        ...b,
        status,
        ...(driverAssigned !== undefined ? { driverAssigned } : {}),
      };
    }
    return b;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteBooking(id: string): BookingRecord[] {
  const all = getBookings();
  const filtered = all.filter((b) => b.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
  return filtered;
}

export function exportBookingsToCsv(bookings: BookingRecord[]) {
  const headers = ["رقم الحجز", "التاريخ", "العميل", "الهاتف", "الانطلاق", "الوجهة", "السيارة", "نوع الرحلة", "السعر", "الحالة", "السائق"];
  const rows = bookings.map((b) => [
    b.id,
    `${b.date} ${b.time}`,
    `"${b.clientName}"`,
    b.clientPhone,
    `"${b.pickupArea}"`,
    `"${b.destination}"`,
    `"${b.selectedVehicle}"`,
    b.tripType,
    b.estimatedFare,
    b.status,
    `"${b.driverAssigned || 'غير محدد'}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `wosool_bookings_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
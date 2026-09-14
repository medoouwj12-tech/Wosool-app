"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LogOut,
  Plus,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Car,
  Phone,
  ArrowLeft,
  Calendar,
  DollarSign,
  Trash2,
  Users,
  RefreshCw,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  BookingRecord,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  exportBookingsToCsv,
} from "@/lib/bookingsStorage";
import { FLEET } from "@/data/fleet";
import { useLanguage } from "@/context/LanguageContext";
import AdminLogin from "./AdminLogin";
import AddBookingModal from "./AddBookingModal";

export default function AdminPage() {
  const { language, toggleLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"bookings" | "fleet">("bookings");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("wosool_admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setBookings(getBookings());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("wosool_admin_auth");
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id: string, newStatus: BookingRecord["status"]) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleDelete = (id: string) => {
    const msg = language === "ar" ? "هل أنت متأكد من حذف هذا الحجز نهائياً؟" : "Are you sure you want to delete this booking?";
    if (window.confirm(msg)) {
      const updated = deleteBooking(id);
      setBookings(updated);
    }
  };

  const handleDirectWhatsAppClient = (b: BookingRecord) => {
    const cleanPhone = b.clientPhone.replace(/^0/, "20").replace(/[^0-9]/g, "");
    const greeting = language === "ar"
      ? `مرحباً ${b.clientName}، بخصوص حجزك مع وصول ليموزين رقم (${b.id}) من ${b.pickupArea} إلى ${b.destination}...`
      : `Hello ${b.clientName}, regarding your Wosool Limousine reservation #${b.id} to ${b.destination}...`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`, "_blank");
  };

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientPhone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((acc, curr) => acc + (curr.estimatedFare || 0), 0);

  const pendingCount = bookings.filter((b) => b.status === "new").length;
  const inProgressCount = bookings.filter((b) => b.status === "in_progress").length;

  const getStatusBadge = (status: BookingRecord["status"]) => {
    const badgeMap = {
      new: "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse",
      confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      in_progress: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      completed: "bg-gray-500/20 text-gray-300 border-gray-500/40",
      cancelled: "bg-red-500/20 text-red-300 border-red-500/40",
    };
    const labelMap = {
      ar: { new: "جديد للتأكيد", confirmed: "مؤكد", in_progress: "على الطريق", completed: "مكتمل", cancelled: "ملغي" },
      en: { new: "Pending", confirmed: "Confirmed", in_progress: "In Route", completed: "Completed", cancelled: "Cancelled" },
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeMap[status]}`}>
        {labelMap[language][status]}
      </span>
    );
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => { setIsAuthenticated(true); loadData(); }} language={language} />;
  }

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col font-cairo">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0E0E14]/95 backdrop-blur-xl border-b border-gold-500/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gold-500/40 bg-black flex-shrink-0">
              <Image src="/logo.jpeg" alt="وصول" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black gold-text-gradient">وصول | لوحة التحكم</span>
                <span className="text-[10px] bg-gold-500 text-black font-black px-1.5 py-0.2 rounded">ADMIN VIP</span>
              </div>
              <p className="text-[11px] text-gray-400">إدارة الحجوزات والأسطول والعملاء</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-surface-secondary text-xs font-bold text-gray-300 hover:text-white border border-border-subtle"
            >
              {language === "ar" ? "English" : "العربية"}
            </button>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-secondary text-gold-300 hover:bg-gold-500/20 border border-gold-500/30 text-xs font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "معاينة التطبيق" : "View App"}</span>
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-xl text-red-400 hover:bg-red-500/10" title="خروج">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-border-subtle">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>{language === "ar" ? "إجمالي الحجوزات" : "Total Bookings"}</span>
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{bookings.length}</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border-subtle">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>{language === "ar" ? "طلبات جديدة" : "New Requests"}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">{pendingCount}</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border-subtle">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>{language === "ar" ? "رحلات نشطة" : "Active Trips"}</span>
              <Car className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{inProgressCount}</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border-subtle">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>{language === "ar" ? "الإيرادات التقديرية" : "Est. Revenue"}</span>
              <DollarSign className="w-4 h-4 text-gold-400" />
            </div>
            <div className="text-2xl font-black gold-text-gradient font-mono">
              {totalRevenue.toLocaleString("ar-EG")} <span className="text-xs text-gray-300 font-sans">ج.م</span>
            </div>
          </div>
        </div>

        {/* Tab Header & Action Bar */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-3 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "bookings" ? "bg-gold-500 text-black shadow-gold-sm" : "bg-surface text-gray-300"
              }`}
            >
              {language === "ar" ? "سجل الحجوزات" : "Bookings"}
            </button>
            <button
              onClick={() => setActiveTab("fleet")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "fleet" ? "bg-gold-500 text-black shadow-gold-sm" : "bg-surface text-gray-300"
              }`}
            >
              {language === "ar" ? "حالة الأسطول" : "Fleet Status"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="gold-btn px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 touch-press"
            >
              <Plus className="w-4 h-4" />
              <span>{language === "ar" ? "إضافة حجز" : "Add Booking"}</span>
            </button>
            <button
              onClick={() => exportBookingsToCsv(bookings)}
              className="px-3 py-2 rounded-xl bg-surface-secondary border border-border-subtle text-gray-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button onClick={loadData} className="p-2 rounded-xl bg-surface-secondary border border-border-subtle text-gray-400">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="glass-panel p-3 rounded-2xl border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === "ar" ? "بحث بالاسم، الهاتف، أو الوجهة..." : "Search name, phone, route..."}
                  className="w-full glass-input rounded-xl px-3.5 py-2 pr-9 text-xs text-white"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                {["all", "new", "confirmed", "in_progress", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                      statusFilter === st ? "bg-gold-500/20 text-gold-300 border border-gold-500/50 font-bold" : "text-gray-400 bg-surface-secondary/60"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-4 border border-border-subtle hover:border-gold-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono font-bold text-gold-300 text-xs px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30">
                        {b.id}
                      </span>
                      {getStatusBadge(b.status)}
                      <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        <span>{b.date} | {b.time}</span>
                      </span>
                      <span className="text-xs text-gray-400 bg-surface-secondary px-2 py-0.5 rounded">{b.tripType}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-bold text-white">
                      <span>{b.clientName}</span>
                      <a href={`tel:${b.clientPhone}`} className="text-xs text-gold-400 font-mono flex items-center gap-1" dir="ltr">
                        <Phone className="w-3 h-3" />
                        <span>{b.clientPhone}</span>
                      </a>
                      <div className="flex items-center gap-1.5 text-xs text-gray-300 font-normal">
                        <Car className="w-3.5 h-3.5 text-gold-400" />
                        <span className="text-white font-semibold">{b.selectedVehicle}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-300 flex items-center gap-2">
                      <span>{b.pickupArea}</span>
                      <span className="text-gold-400">➔</span>
                      <strong className="text-gold-200">{b.destination}</strong>
                    </div>

                    {(b.driverAssigned || b.notes) && (
                      <div className="text-[11px] text-gray-400 bg-surface-secondary/40 p-2 rounded-lg border border-white/5 space-y-0.5">
                        {b.driverAssigned && <div><strong className="text-gold-300">السائق: </strong>{b.driverAssigned}</div>}
                        {b.notes && <div><strong className="text-gray-300">ملاحظات: </strong>{b.notes}</div>}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0 gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">السعر التقديري</span>
                      <span className="text-base font-black text-white font-mono">
                        {b.estimatedFare.toLocaleString("ar-EG")} ج.م
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleDirectWhatsAppClient(b)}
                        className="p-2 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40 flex items-center gap-1 text-xs font-bold"
                        title="واتساب العميل"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">واتساب</span>
                      </button>

                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                        className="glass-input rounded-xl px-2 py-1.5 text-xs text-white bg-[#161622] cursor-pointer"
                      >
                        <option value="new">جديد</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="in_progress">جارية</option>
                        <option value="completed">مكتملة</option>
                        <option value="cancelled">ملغاة</option>
                      </select>

                      <button onClick={() => handleDelete(b.id)} className="p-2 rounded-xl text-gray-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fleet Tab */}
        {activeTab === "fleet" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FLEET.map((car) => (
              <div key={car.id} className="glass-card rounded-2xl p-4 border border-border-subtle space-y-3">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/40">
                  <Image src={car.image} alt={car.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-gold-300 border border-gold-500/30">
                      {car.tag}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{car.name}</h4>
                  <p className="text-xs text-gray-400">{car.category}</p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>متاحة للرحلات</span>
                  </span>
                  <span className="font-mono text-gold-300 font-bold">{car.baseStartingPrice} ج.م</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AddBookingModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={loadData}
        language={language}
      />
    </div>
  );
}
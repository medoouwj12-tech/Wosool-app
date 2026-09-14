"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BookingEngine from "@/components/BookingEngine";
import FleetShowcase from "@/components/FleetShowcase";
import PopularRoutes from "@/components/PopularRoutes";
import VipAmenities from "@/components/VipAmenities";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import ServiceAreas from "@/components/ServiceAreas";
import BottomNav from "@/components/BottomNav";
import FloatingContact from "@/components/FloatingContact";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("toyota-corolla");
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>("cairo_airport");

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleSelectDestination = (destId: string) => {
    setSelectedDestinationId(destId);
  };

  return (
    <main className="min-h-screen bg-background text-gray-100 flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
      {/* Top Native Header */}
      <Header />

      {/* Hero Showcase */}
      <HeroSection />

      {/* Interactive Booking Engine */}
      <BookingEngine
        selectedVehicleId={selectedVehicleId}
        selectedDestinationId={selectedDestinationId}
      />

      {/* Fleet Showcase Gallery */}
      <FleetShowcase onSelectVehicle={handleSelectVehicle} />

      {/* Popular Intercity Routes */}
      <PopularRoutes onSelectDestination={handleSelectDestination} />

      {/* Egypt Service Areas Coverage Map */}
      <ServiceAreas />

      {/* VIP Amenities & Features */}
      <VipAmenities />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* PWA Home Screen Installation Prompt */}
      <PwaInstallPrompt />

      {/* Floating Fast WhatsApp & Call */}
      <FloatingContact />

      {/* Mobile App Native Bottom Navigation */}
      <BottomNav />
    </main>
  );
}

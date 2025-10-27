"use client";

import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function FooterBrand() {
  return (
    <div className="footer-brand">
      {/* Brand Logo */}
      <div className="mb-6">
        <img 
          src="/mehroob_logo.svg" 
          alt="MaskBar by Mehroob"
          className="h-10"
        />
      </div>
    </div>
  );
}

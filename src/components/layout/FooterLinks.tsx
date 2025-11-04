"use client";

import React from "react";
import Link from "next/link";

interface FooterLinkGroupProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
    disabled?: boolean;
  }>;
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="footer-link-group">
      <h4 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-bold)] mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            {link.disabled ? (
              <span className="text-sm text-[var(--color-text-secondary)] cursor-not-allowed opacity-60">
                {link.label}
              </span>
            ) : (
              <Link 
                href={link.href}
                className="text-sm text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterLinks() {
  const linkGroups = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Hydrating Masks", href: "/products?category=hydrating", disabled: true },
        { label: "Brightening Masks", href: "/products?category=brightening", disabled: true },
        { label: "Anti-Aging Masks", href: "/products?category=anti-aging", disabled: true },
        { label: "Acne Control", href: "/products?category=acne-control", disabled: true },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Track Order", href: "/track-order" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/story" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Sustainability", href: "/sustainability" },
      ],
    },
  ];

  return (
    <div className="footer-links grid grid-cols-1 md:grid-cols-3 gap-8">
      {linkGroups.map((group, index) => (
        <FooterLinkGroup key={index} title={group.title} links={group.links} />
      ))}
    </div>
  );
}

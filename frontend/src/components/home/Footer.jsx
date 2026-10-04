import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-surface border-t border-border mt-space-xl">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-border">

          {/* Brand & Info */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <Link
              className="flex items-center gap-1 shrink-0 group"
              to="/"
            >

              <div className="flex items-center justify-center text-primary">
                <ShoppingCart size={24} strokeWidth={2.2} />
              </div>
              <span className="font-title text-[1.6rem] font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                Cartora
              </span>
            </Link>

            <p className="text-sm text-text-secondary mb-5 max-w-sm leading-relaxed">
              Cartora is a multi-category modern e-commerce marketplace
              connecting customers with top brands and trusted merchants
              worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                aria-label="Facebook"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-accent-light text-text-secondary hover:text-primary flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">fb</span>
              </a>

              <a
                aria-label="Twitter / X"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-accent-light text-text-secondary hover:text-primary flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">x</span>
              </a>

              <a
                aria-label="Instagram"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-accent-light text-text-secondary hover:text-primary flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">ig</span>
              </a>

              <a
                aria-label="LinkedIn"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-accent-light text-text-secondary hover:text-primary flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Shop
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#todays-deals"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Today's Deals
                </a>
              </li>

              <li>
                <a
                  href="#best-sellers"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Best Sellers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Clearance Outlet
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Categories
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#shop-categories"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Electronics &amp; Tech
                </a>
              </li>

              <li>
                <a
                  href="#shop-categories"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Fashion &amp; Apparel
                </a>
              </li>

              <li>
                <a
                  href="#shop-categories"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Beauty &amp; Personal Care
                </a>
              </li>

              <li>
                <a
                  href="#shop-categories"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Home &amp; Kitchen
                </a>
              </li>

              <li>
                <a
                  href="#shop-categories"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Sports &amp; Fitness
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Customer Service
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Help Center &amp; FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Shipping &amp; Delivery
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Returns &amp; Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Order Tracking
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Account
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  My Profile
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Orders &amp; Invoices
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Wishlist
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Seller Portal
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Cartora Rewards
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>
              © 2026 Cartora Marketplace. All rights reserved.
            </span>

            <span className="hidden md:inline">·</span>

            <a
              href="#"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>

            <span className="hidden md:inline">·</span>

            <a
              href="#"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </a>

            <span className="hidden md:inline">·</span>

            <a
              href="#"
              className="hover:text-primary transition-colors"
            >
              Security
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] font-semibold">
            <span className="px-2 py-1 bg-surface-container-low border border-border rounded text-text-primary">
              VISA
            </span>

            <span className="px-2 py-1 bg-surface-container-low border border-border rounded text-text-primary">
              MASTERCARD
            </span>

            <span className="px-2 py-1 bg-surface-container-low border border-border rounded text-text-primary">
              AMEX
            </span>

            <span className="px-2 py-1 bg-surface-container-low border border-border rounded text-text-primary">
              APPLE PAY
            </span>

            <span className="px-2 py-1 bg-surface-container-low border border-border rounded text-text-primary">
              PAYPAL
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
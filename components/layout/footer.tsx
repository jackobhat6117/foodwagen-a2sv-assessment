"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Instagram, Facebook, Twitter, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="food-footer" data-test-id="food-footer">
      <div className="food-footer-container">
        <div className="food-footer-grid">
          {/* Company Column */}
          <div className="food-footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="food-footer-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Partner with us</a></li>
              <li><a href="#">Ride with us</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="food-footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund & Cancellation</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Follow Us & Newsletter Column */}
          <div className="food-footer-col">
            <h3>FOLLOW US</h3>
            <div className="food-socials">
              <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
            </div>

            <h3 className="food-newsletter-heading">Receive exclusive offers in your mailbox</h3>
            <form onSubmit={handleSubscribe} className="food-newsletter-form">
              <div className="food-newsletter-input-wrapper">
                <Mail className="food-newsletter-icon" size={20} />
                <input
                  type="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="food-newsletter-input"
                  data-test-id="food-newsletter-email"
                />
              </div>
              <button
                type="submit"
                className="food-newsletter-subscribe"
                data-test-id="food-newsletter-subscribe"
              >
                Subscribe
              </button>
            </form>
            {subscribed && <p className="food-subscribed-message">Thanks for subscribing!</p>}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="food-footer-bottom">
          <div className="food-footer-bottom-container">
            <p>All rights reserved © Your Company, 2021</p>
            <p className="food-footer-made-with">
              Made with <Heart size={16} className="food-footer-heart" /> by Themewagon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex bg-black text-white py-4 md:h-42 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 ">
        <div className="flex justify-center md:justify-start">
          <div
            className="flex w-40 h-auto items-center 
                       md:w-50 md:h-auto 
                       lg:w-60 lg:h-auto">
            <img
              src="/image/logo-wonderful-putih.png"
              alt="Wonderful Logo"
              className="w-full h-auto max-w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right ">
          <div className="flex  h-20">
            <div className="flex items-center space-x-6 mb-4">
              <a
                href="https://facebook.com"
                className="text-white hover:text-gray-400"
              >
                <img
                  src="/image/facebook.svg"
                  className="w-10 h-10"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://twitter.com"
                className="text-white hover:text-gray-400"
              >
                <img
                  src="/image/twitter.svg"
                  className="w-10 h-10"
                  alt="Twitter"
                />
              </a>
              <a
                href="https://instagram.com"
                className="text-white hover:text-gray-400"
              >
                <img
                  src="/image/instagram.svg"
                  className="w-10 h-10"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://youtube.com"
                className="text-white hover:text-gray-400"
              >
                <img
                  src="/image/youtube.svg"
                  className="w-10 h-10"
                  alt="YouTube"
                />
              </a>
              <a
                href="https://tiktok.com"
                className="text-white hover:text-gray-400"
              >
                <img
                  src="/image/tiktok.svg"
                  className="w-10 h-10"
                  alt="TikTok"
                />
              </a>
            </div>
          </div>
          <div className="flex">
            {/* Policy Links Section */}
            <div className="flex justify-center md:justify-end text-sm">
              <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:justify-end text-sm items-center gap-y-2">
                <a
                  href="/cookie-policy"
                  className="text-white font-semibold hover:text-gray-400 px-2"
                >
                  Cookie Policy
                </a>
                {/* Divider */}
                <span className="text-white select-none hidden md:block">
                  |
                </span>
                <a
                  href="/privacy-policy"
                  className="text-white font-semibold hover:text-gray-400 px-2"
                >
                  Privacy Policy
                </a>
                {/* Divider */}
                <span className="text-white select-none hidden md:block">
                  |
                </span>
                <a
                  href="/terms-and-conditions"
                  className="text-white font-semibold hover:text-gray-400 px-2"
                >
                  Terms and Conditions
                </a>
                {/* Divider */}
                <span className="text-white select-none hidden md:block">
                  |
                </span>
                <a
                  href="/contact-us"
                  className="text-white font-semibold hover:text-gray-400 px-2"
                >
                  Contact Us
                </a>
                {/* Divider */}
                <span className="text-white select-none hidden md:block">
                  |
                </span>
                <a
                  href="/about"
                  className="text-white font-semibold hover:text-gray-400 px-2"
                >
                  About
                </a>
                {/* No divider after the last item */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useEffect, useState } from "react";

// Define the language data outside the component or import it from a separate file
const languageData = [
  {
    country: "Australia",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/au.png",
    languages: [{ id: "en_AU", text: "Australia (English)", value: "au/en" }],
  },
  {
    country: "China",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/cn.png",
    languages: [
      { id: "en_CN", text: "China (English)", value: "cn/en" },
      { id: "zh_CN", text: "China (China (Simplified))", value: "cn/zh-cn" },
    ],
  },
  {
    country: "French",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/fr.png",
    languages: [
      { id: "en_FR", text: "French (English)", value: "fr/en" },
      { id: "fr_FR", text: "French (French)", value: "fr/fr" },
    ],
  },
  {
    country: "Germany",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/de.png",
    languages: [
      { id: "en_DE", text: "Germany (English)", value: "de/en" },
      { id: "de_DE", text: "Germany (Germany)", value: "de/de" },
    ],
  },
  {
    country: "Global",
    flag: null, // No image, will use SVG
    languages: [{ id: "en_GB", text: "Global (English)", value: "gb/en" }],
  },
  {
    country: "Hongkong",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/hk.png",
    languages: [
      { id: "en_HK", text: "Hongkong (English)", value: "hk/en" },
      { id: "zh_HK", text: "Hongkong (Hongkong (Traditional))", value: "hk/zh-tw" },
    ],
  },
  {
    country: "India",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/in.png",
    languages: [{ id: "en_IN", text: "India (English)", value: "in/en" }],
  },
  {
    country: "Indonesia",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/id.png",
    languages: [
      { id: "en_ID", text: "Indonesia (English)", value: "id/en" },
      { id: "id_ID", text: "Indonesia (Bahasa)", value: "id/id" },
    ],
  },
  {
    country: "Japan",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/jp.png",
    languages: [
      { id: "en_JP", text: "Japan (English)", value: "jp/en" },
      { id: "ja_JP", text: "Japan (Japan)", value: "jp/ja" },
    ],
  },
  {
    country: "Korea",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/kr.png",
    languages: [
      { id: "en_KR", text: "Korea (English)", value: "kr/en" },
      { id: "ko_KR", text: "Korea (Korea)", value: "kr/ko" },
    ],
  },
  {
    country: "Malaysia",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/my.png",
    languages: [
      { id: "en_MY", text: "Malaysia (English)", value: "my/en" },
      { id: "zh_MY", text: "Malaysia (Chinese (Simplified))", value: "my/zh-cn" },
    ],
  },
  {
    country: "Netherlands",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/nl.png",
    languages: [
      { id: "en_NL", text: "Netherlands (English)", value: "nl/en" },
      { id: "nl_NL", text: "Netherlands (Netherlands)", value: "nl/nl" },
    ],
  },
  {
    country: "Philippines",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/ph.png",
    languages: [{ id: "en_PH", text: "Philippines (English)", value: "ph/en" }],
  },
  {
    country: "Russia",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/ru.png",
    languages: [
      { id: "en_RU", text: "Russia (English)", value: "ru/en" },
      { id: "ru_RU", text: "Russia (Russia)", value: "ru/ru" },
    ],
  },
  {
    country: "Saudi Arabia",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/sa.png",
    languages: [
      { id: "en_SA", text: "Saudi Arabia (English)", value: "sa/en" },
      { id: "ar_SA", text: "Saudi Arabia (العَرَبِيَّة)", value: "sa/ar" },
    ],
  },
  {
    country: "Singapore",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/sg.png",
    languages: [
      { id: "en_SG", text: "Singapore (English)", value: "sg/en" },
      { id: "zh_SG", text: "Singapore (Chinese (Simplified))", value: "sg/zh-cn" },
    ],
  },
  {
    country: "Thailand",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/th.png",
    languages: [{ id: "en_TH", text: "Thailand (English)", value: "th/en" }],
  },
  {
    country: "United Arab Emirates",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/uae.png",
    languages: [
      { id: "en_AE", text: "United Arab Emirates (English)", value: "uae/en" },
      { id: "ar_AE", text: "United Arab Emirates (العَرَبِيَّة)", value: "uae/ar" },
    ],
  },
  {
    country: "United Kingdom",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/uk.png",
    languages: [{ id: "en_UK", text: "United Kingdom (English)", value: "uk/en" }],
  },
  {
    country: "United States",
    flag: "https://indonesia.travel//.resources/main/webresources/images/flag/us.png",
    languages: [{ id: "en_US", text: "United States (English)", value: "us/en" }],
  },
];

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State untuk mobile drawer
  const [isDesktopHamburgerOpen, setIsDesktopHamburgerOpen] = useState(false); // State baru untuk desktop hamburger
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  // Function to handle language change (can be called from any dropdown)
  const changeLanguage = (langValue) => {
    console.log("Changing language to:", langValue);
    setIsLanguageOpen(false);
    setIsDrawerOpen(false);
    setIsDesktopHamburgerOpen(false); // Close all menus
  };

  // Toggle a specific dropdown/drawer and close others
  const toggleDropdown = (dropdown) => {
    if (dropdown === "profile") {
      setIsProfileOpen(!isProfileOpen);
      setIsLanguageOpen(false);
      setIsDrawerOpen(false);
      setIsDesktopHamburgerOpen(false);
    } else if (dropdown === "language") {
      setIsLanguageOpen(!isLanguageOpen);
      setIsProfileOpen(false);
      setIsDrawerOpen(false);
      setIsDesktopHamburgerOpen(false);
    } else if (dropdown === "drawer") { // This is for MOBILE full-screen drawer
      setIsDrawerOpen(!isDrawerOpen);
      setIsProfileOpen(false);
      setIsLanguageOpen(false);
      setIsDesktopHamburgerOpen(false);
    } else if (dropdown === "desktopHamburger") { // This is for DESKTOP hamburger dropdown
      setIsDesktopHamburgerOpen(!isDesktopHamburgerOpen);
      setIsProfileOpen(false);
      setIsLanguageOpen(false);
      setIsDrawerOpen(false);
    }
  };

  // EFFECT to prevent body scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) { // Only prevent scroll if the MOBILE drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]); // Re-run effect when isDrawerOpen changes

  return (
    <nav
      className={`fixed top-0 w-full py-6 px-5 z-50 transition-colors duration-300 ${ // Perbesar py-6 dari p-5
        isNavbarHovered ? "bg-white" : "bg-transparent"
      }`}
      onMouseEnter={() => setIsNavbarHovered(true)}
      onMouseLeave={() => setIsNavbarHovered(false)}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0"> {/* Tambah px-4 di mobile, hapus di md */}
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={
              isNavbarHovered
                ? "/image/logo-wonderful-warna.png"
                : "/image/logo-wonderful-putih.png"
            }
            alt="Logo"
            className="h-14 transition-all duration-300" // Perbesar h-14 dari h-12
          />
        </a>

        {/* Right side - Desktop Menu Items and ALWAYS VISIBLE Hamburger */}
        <div className="flex items-center space-x-6"> {/* Perbesar space-x-6 dari space-x-5 */}

          {/* Hamburger Icon - ALWAYS VISIBLE with DYNAMIC BEHAVIOR */}
          <div className="relative">
            <button
              onClick={() => {
                if (window.innerWidth >= 768) { // If desktop
                  toggleDropdown("desktopHamburger");
                } else { // If mobile
                  toggleDropdown("drawer");
                }
              }}
              className={`flex items-center justify-center
                          h-11 w-11
                          rounded-full
                          transition-all duration-300 transform
                          hover:scale-110
                          cursor-pointer
                          `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className={`h-7 w-7 transition-colors duration-300 ${
                  isNavbarHovered ? "text-gray-700" : "text-white"
                }
                ${isDrawerOpen || isDesktopHamburgerOpen ? "text-gray-700" : ""}
                `}
              >
                {/* Change icon based on drawer state */}
                {(isDrawerOpen && window.innerWidth < 768) || (isDesktopHamburgerOpen && window.innerWidth >= 768) ? (
                  // Close icon (X) when either mobile drawer or desktop hamburger dropdown is open
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>

            {/* Desktop Hamburger Dropdown - Only visible on desktop */}
            <ul
              className={`absolute mt-3 right-0 bg-white shadow-lg rounded-md overflow-hidden py-1
                transition-all duration-300 ease-in-out transform z-20
                hidden md:block // HANYA TAMPIL DI DESKTOP
                ${isDesktopHamburgerOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
                w-48 // Lebar dropdown
              `}
            >
              <li className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => { toggleDropdown("desktopHamburger"); /* or just setIsDesktopHamburgerOpen(false) */ }}>Home</li>
              <li className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => { toggleDropdown("desktopHamburger"); }}>About</li>
              <li className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => { toggleDropdown("desktopHamburger"); }}>Services</li>
              <li className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => { toggleDropdown("desktopHamburger"); }}>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Side Panel / Fullscreen Overlay) - Only visible on mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white transition-transform duration-300 ease-in-out z-40 p-5 pt-20
                    md:hidden // KUNCI PERBAIKAN: Gunakan md:hidden di sini
                    ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
                   `}
        onClick={(e) => {
            if (e.target === e.currentTarget) {
                setIsDrawerOpen(false);
            }
        }}
      >
        <div className="flex flex-col space-y-4">
          {/* Menu items for mobile */}
          <a href="#" className="text-gray-700 text-lg font-semibold hover:text-blue-500" onClick={() => setIsDrawerOpen(false)}>Home</a>
          <a href="#" className="text-gray-700 text-lg font-semibold hover:text-blue-500" onClick={() => setIsDrawerOpen(false)}>About</a>
          <a href="#" className="text-gray-700 text-lg font-semibold hover:text-blue-500" onClick={() => setIsDrawerOpen(false)}>Services</a>
          <a href="#" className="text-gray-700 text-lg font-semibold hover:text-blue-500" onClick={() => setIsDrawerOpen(false)}>Contact</a>

          {/* Language Selection in Mobile Drawer */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Pilih Bahasa</h3>
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]"> {/* Kunci: max-h dan overflow-y-auto */}
              {languageData.map((countryGroup, index) => (
                <React.Fragment key={countryGroup.country}>
                  <div className="flex items-center px-4 py-2 text-gray-700 text-base font-semibold mb-1 sticky top-0 bg-white z-10 py-1"> {/* Sticky header for country */}
                    <span className="w-5 h-5 mr-2 flex-shrink-0">
                      {countryGroup.flag ? (
                        <img src={countryGroup.flag} alt={countryGroup.country} className="w-full h-full object-cover rounded-sm" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-full w-full text-gray-700"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      )}
                    </span>
                    {countryGroup.country}
                  </div>
                  {countryGroup.languages.map((lang) => (
                    <a
                      key={lang.id}
                      className="block pl-7 py-1 text-gray-600 hover:text-blue-500 transition-colors"
                      onClick={() => changeLanguage(lang.value)}
                    >
                      {lang.text}
                    </a>
                  ))}
                  {index < languageData.length - 1 && (
                    <hr className="my-1 border-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Profile/Logout in Mobile Drawer */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <a href="#" className="block text-gray-700 text-lg font-semibold hover:text-blue-500 py-2" onClick={() => setIsDrawerOpen(false)}>Profile</a>
            <a href="#" className="block text-gray-700 text-lg font-semibold hover:text-blue-500 py-2" onClick={() => setIsDrawerOpen(false)}>Settings</a>
            <a href="#" className="block text-red-500 text-lg font-semibold hover:text-red-700 py-2" onClick={() => setIsDrawerOpen(false)}>Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
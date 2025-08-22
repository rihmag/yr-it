import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Phone, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Supreme4Banner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Edit these banners to change content for each slide
  const banners = [
    {
      tag: "New",
      titleHighlight: "TRAINING",
      titleRest: " Programme",
      subtitle: "Next batch starts from 1 Sep.",
      ctaText: "Join Training Programme",
      ctaHref: "/training-programme",
      imageSrc: "/images/Women-shaping-the-future-of-coding-blog-08.03.2023.jpg"
    },
    {
      tag: "Special Offer",
      titleHighlight: "CODING",
      titleRest: " CLASS",
      subtitle: "In collaboration with Advance Study Sector",
      partner: "Advance Study Sector",
      headline: "WEBSITE DEVELOPMENT",
      badges: [
        { text: "Providing FREE consultant", color: "bg-red-500" },
        { text: "5% DISCOUNT for Govt. School", color: "bg-yellow-400 text-gray-900" }
      ],
      features: [
        "Easy schedule — 3 days/week",
        "Flexible learning options",
        "Participate in national hackathons",
        "Internship opportunity",
        "Hands-on practice"
      ],
      price: { amount: "₹4,500 /- month", valid: "Valid till 1st Sep" },
      bottomNote: "Batch starts from 1 September 2025",
      contact: { phone: "7404-89-0806", website: "www.yritsolutions.com" },
      showTrainers: false,
      ctaText: "Join Now",
      ctaHref: "/join-now",
      imageSrc: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png"
    },
    {
      tag: "Trainer",
      titleHighlight: "DATA SCIENCE",
      titleRest: " TRAINER",
      subtitle: "LEARN FROM INDUSTRY EXPERT AND GAIN HANDS-ON EXPERIENCE",
      name: "Vinay Sheoran",
      roleLine1: "Data Science Trainer at YR IT SOLUTIONS",
      roleLine2: "Ex Data Scientist at Flipkart & Publicis Re:Sources",
      contact: { phone: "+91 74048 908060", website: "www.yritsolutions.com", email: "yr.itsolutions.pvtltd@gmail.com" },
      ctaText: "Enroll Now",
      ctaHref: "/enroll-now",
      imageSrc: "/images/trainer1.jpg",
      showTrainers: false
    },
    {
      tag: "Trainer",
      titleHighlight: "WEBSITE DEVELOPMENT",
      titleRest: " TRAINER",
      subtitle: "LEARN FROM INDUSTRY EXPERT AND GAIN HANDS-ON EXPERIENCE",
      name: "Sumit Kumar",
      roleLine1: "Full Stack Developer at YR IT SOLUTIONS",
      roleLine2: "Ex Web Developer at PWC & DRDO",
      contact: { phone: "+91 74048 908060", website: "www.yritsolutions.com", email: "yr.itsolutions.pvtltd@gmail.com" },
      ctaText: "Enroll Now",
      ctaHref: "/enroll-now",
      imageSrc: "/images/trainer3.jpg",
      showTrainers: false
    },
    {
      tag: "Trainer",
      titleHighlight: "UI/ UX",
      titleRest: " TRAINER",
      subtitle: "LEARN FROM INDUSTRY EXPERT AND GAIN HANDS-ON EXPERIENCE",
      name: "Isha",
      roleLine1: "UI/UX Trainer at YR IT SOLUTIONS",
      roleLine2: "UI/UX Designer at MAAC",
      contact: { phone: "+91 74048 908060", website: "www.yritsolutions.com", email: "yr.itsolutions.pvtltd@gmail.com" },
      ctaText: "Enroll Now",
      ctaHref: "/enroll-now",
      imageSrc: "/images/trainer2.jpg",
      showTrainers: false
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(intervalId);
  }, [banners.length]);

  const active = banners[currentIndex];
  const isSecondBanner = active.titleHighlight === "COACHING";
  const isTrainerBanner = Boolean(active.titleRest?.includes("TRAINER"));
  const defaultFeatures = [
    "Easy & flexible learning",
    "Hands-on projects",
    "Internship opportunities",
    "National hackathons",
    "Industry expert training",
    "5% discount for students",
  ];
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  return (
    <div className="relative mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMz...')] opacity-20"></div>
            
            {/* Additional decorative elements */}
            <motion.div 
              className="absolute top-1/2 right-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-1/4 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              animate={{ width: ["6rem", "10rem", "6rem"], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative p-4 md:p-8 flex flex-col md:flex-row items-center justify-between min-h-[180px]">
            <motion.div 
              className="w-full md:w-3/5 flex flex-col items-center md:items-start space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isSecondBanner ? (
                <div className="w-full">
                  <div className="bg-white/90 text-gray-900 rounded-2xl shadow-xl border border-white/30 p-5 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full">{active.tag}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">{active.titleHighlight}</span>
                      <span className="text-gray-800">{active.titleRest}</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mt-1">
                      In Collaboration with <span className="font-semibold">{active.partner}</span>
                    </p>
                    {active.headline && (
                      <div className="mt-3 text-center md:text-left text-xs tracking-[0.3em] text-gray-700">
                        {active.headline}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {active.badges?.map((b, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${b.color}`}>
                          {b.text}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                      {(active.features || []).map((feature, i) => (
                        <div key={i} className="px-3 py-2 rounded-lg text-xs md:text-sm bg-indigo-50 text-indigo-800 border border-indigo-100">
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <a
                        href={active.ctaHref}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <ChevronRight size={18} />
                        {active.ctaText}
                      </a>
                    </div>
                  </div>
                  {/* Bottom red strip */}
                  {active.bottomNote && (
                    <div className="mt-3 bg-red-600 text-white text-center font-semibold rounded-xl px-4 py-2 shadow-md">
                      {active.bottomNote}
                    </div>
                  )}
                  {/* Contact row */}
                  {active.contact && (
                    <div className="mt-3 flex items-center justify-center gap-4 md:gap-8">
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/90">
                        <Phone size={16} />
                        <span>{active.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/90">
                        <Globe size={16} />
                        <span>{active.contact.website}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : isTrainerBanner ? (
                <div className="w-full">
                  <div className="bg-white/95 text-gray-900 rounded-2xl shadow-xl border border-white/30 p-5 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full">{active.tag}</span>
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left`}>
                      <span className="text-blue-700">{active.titleHighlight}</span>
                      <span className="text-gray-900">{active.titleRest}</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 mt-2 uppercase tracking-wide">
                      {active.subtitle}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-md border border-blue-100">
                      <span className="font-semibold">{active.name}</span>
                    </div>
                    <div className="mt-2 text-xs md:text-sm text-gray-600 leading-snug">
                      <div>{active.roleLine1}</div>
                      <div>{active.roleLine2}</div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={active.ctaHref}
                        className="inline-flex items-center gap-2 border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold px-6 py-2 rounded-xl transition-all"
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>
                  {/* Contact row */}
                  {active.contact && (
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/90">
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm"><Phone size={14} />{active.contact.phone}</div>
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm"><Globe size={14} />{active.contact.website}</div>
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm"><Mail size={14} />{active.contact.email}</div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {active.tag}
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <div className="countdown-timer flex gap-1 text-white text-xs">
                        <div className="text-center bg-indigo-800/50 px-2 py-1 rounded-lg">
                          <span className="font-bold">{String(timeLeft.days).padStart(2, '0')}d</span>
                        </div>
                        <div className="text-center bg-indigo-800/50 px-2 py-1 rounded-lg">
                          <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
                        </div>
                        <div className="text-center bg-indigo-800/50 px-2 py-1 rounded-lg">
                          <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                        </div>
                        <div className="text-center bg-indigo-800/50 px-2 py-1 rounded-lg">
                          <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.h2 
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{active.titleHighlight}</span>{active.titleRest}
                  </motion.h2>

                  <motion.p 
                    className="text-base md:text-lg opacity-90 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {active.subtitle}
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-xs md:text-sm w-full max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    {(active.features || defaultFeatures).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                        <span className="text-green-400 font-bold">✅</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  {active.showTrainers !== false && (
                    <motion.div 
                      className="flex gap-4 w-full max-w-3xl justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400">
                          <img src="/images/trainer1.jpg" alt="Vinay Sheoran" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">Vinay Sheoran</span>
                          <span className="text-xs">Data Science Trainer</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400">
                          <img src="/images/trainer3.jpg" alt="Sumit Kumar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">Sumit Kumar</span>
                          <span className="text-xs">Web Development Trainer</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-400">
                          <img src="/images/trainer2.jpg" alt="Isha" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">Isha</span>
                          <span className="text-xs">UI/UX Trainer</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.a
                    href={active.ctaHref}
                    className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 border border-white/20 mt-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    {active.ctaText}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </>
              )}
            </motion.div>
            
            {/* Right side image */}
            <motion.div 
              className="w-full md:w-2/5 mt-6 md:mt-0 flex justify-center items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                {isSecondBanner ? (
                  <div className="relative w-44 h-44 md:w-64 md:h-64">
                    <motion.div 
                      className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 blur-xl"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <img 
                      src={active.imageSrc}
                      alt="Training Illustration"
                      className="relative w-full h-full object-cover rounded-full ring-4 ring-white shadow-2xl"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/images/StockCake-Coding Coffee Break_1754419391.jpg"; }}
                    />
                    {active.price && (
                      <div className="absolute -bottom-3 left-2 flex items-center gap-2">
                        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          SPECIAL OFFER
                        </div>
                        <div className="bg-white text-gray-900 rounded-full p-3 shadow-lg border border-indigo-100">
                          <div className="text-sm font-extrabold leading-tight">{active.price.amount}</div>
                          <div className="text-[10px] text-gray-600">{active.price.valid}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isTrainerBanner ? (
                  <div className="relative w-44 h-44 md:w-64 md:h-64">
                    <motion.div 
                      className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 blur-xl"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <img 
                      src={active.imageSrc}
                      alt={active.name || "Trainer"}
                      className="relative w-full h-full object-cover rounded-full ring-4 ring-white shadow-2xl"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/images/StockCake-Coding Coffee Break_1754419391.jpg"; }}
                    />
                    {active.name && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <div className="bg-blue-700 text-white text-xs md:text-sm font-semibold px-4 py-1 rounded-lg shadow">
                          {active.name}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <motion.div 
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 p-1 rounded-2xl overflow-hidden border border-white/20">
                      <img 
                        src={active.imageSrc}
                        alt="Training Illustration" 
                        className="w-full h-48 md:h-64 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/StockCake-Coding Coffee Break_1754419391.jpg";
                        }}
                      />
                    </div>
                  </>
                )}
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>YR IT</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous banner"
          >
            <ChevronLeft size={22} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next banner"
          >
            <ChevronRight size={22} />
          </motion.button>

          {/* Dots Indicator inside banner */}
          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {banners.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to banner ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-6" : "bg-white/40"}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
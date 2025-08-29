import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function Supreme4Banner() {
  const [banners, setBanners] = useState([]);
  const [instructorBanners, setInstructorBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, instructorRes] = await Promise.all([
          fetch('https://backend-1-bn9o.onrender.com/api/banner/getbanner'),
          fetch('https://backend-1-bn9o.onrender.com/api/banner/getinstructor')
        ]);

        if (!bannerRes.ok) {
          throw new Error('Banner network response was not ok');
        }
        if (!instructorRes.ok) {
            throw new Error('Instructor network response was not ok');
        }

        const bannerData = await bannerRes.json();
        const instructorData = await instructorRes.json();

        const transformedBanners = bannerData.map((banner, index) => ({
          ...banner,
          titleRest: banner.title,
          imageSrc: banner.image,
        }));

        const transformedInstructorBanners = instructorData.map((banner, index) => ({
          ...banner,
          titleRest: banner.title,
          imageSrc: banner.image,
        }));
        
        setBanners(transformedBanners);
        setInstructorBanners(transformedInstructorBanners);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const displayedBanners = isMobile ? instructorBanners : banners;

  useEffect(() => {
    if (displayedBanners.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayedBanners.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [displayedBanners.length]);

  if (loading) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] flex items-center justify-center">
          <div className="text-center p-4">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-2 sm:mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm sm:text-base md:text-lg font-semibold">Loading banners...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-4 text-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] flex items-center justify-center">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Unable to load banners</h3>
            <p className="text-red-100 text-sm sm:text-base">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (displayedBanners.length === 0) {
    return (
      <div className="relative mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl shadow-2xl p-4 text-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] flex items-center justify-center">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">No banners available</h3>
            <p className="text-gray-300 text-sm sm:text-base">Check back later for updates!</p>
          </div>
        </div>
      </div>
    );
  }

  const active = displayedBanners[currentIndex];
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % displayedBanners.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + displayedBanners.length) % displayedBanners.length);

  return (
    <div className="relative mb-6 overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
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
              className="absolute top-1/2 right-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Full-width banner image container */}
          <div className="flex items-center justify-stretch">
            {/* Image with border */}
            <div className="relative w-full h-full ml-0 mr-0 justify-end flex"> 
              <motion.img 
                src={`data:image/jpeg;base64,${active.imageSrc}`}
                alt={active.titleRest || "Banner Image"} 
    
                className="w-full h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] border-4 border-white/30 object-cover"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl';
                  fallback.innerHTML = `<div class="text-center p-4 sm:p-6 md:p-8"><div class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-2 sm:mb-4">📚</div><div>${active.titleRest || 'Training Program'}</div></div>`;
                  e.target.parentNode.appendChild(fallback);
                }}
              />

              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3 md:p-4 lg:p-6">
                <motion.h2 
                  className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400">
                    {active.titleRest}
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Floating NEW badge */}
            <motion.div 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs sm:text-xs md:text-sm shadow-lg z-10"
              animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, scale: 0.8 }}
              
            >
              NEW!
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous banner"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next banner"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Dots Indicator inside banner */}
          <motion.div 
            className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {displayedBanners.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to banner ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-3 sm:w-4 md:w-6" : "bg-white/40"}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
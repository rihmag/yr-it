import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Supreme4Banner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  
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
  return (
    <div className="relative mb-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                New
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">TRAINING</span> Programme
            </motion.h2>

            <motion.p 
              className="text-base md:text-lg opacity-90 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Next batch starts from 1 Sep.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-xs md:text-sm w-full max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>Easy & flexible learning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>Hands-on projects</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>Internship opportunities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>National hackathons</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>Industry expert training</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-green-400 font-bold">✅</span>
                <span>5% discount for students</span>
              </div>
            </motion.div>

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

            <motion.a
              href="/training-programme"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 border border-white/20 mt-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Join Training Programme
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
          
          {/* Right side image */}
          <motion.div 
            className="w-full md:w-2/5 mt-6 md:mt-0 flex justify-center items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 p-1 rounded-2xl overflow-hidden border border-white/20">
                <img 
                  src="/images/Women-shaping-the-future-of-coding-blog-08.03.2023.jpg" 
                  alt="Training Illustration" 
                  className="w-full h-48 md:h-64 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/StockCake-Coding Coffee Break_1754419391.jpg";
                  }}
                />
              </div>
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
      </motion.div>
    </div>
  );
}
import CourseCard from "../components/CourseCard";
import AdvertisementBanner from "../components/AdvertisementBanner";
import Supreme4Banner from "../components/Supreme4Banner";
import InstructorShowcase from "../components/InstructorShowcase";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import { getCourses } from "../data/courses";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Search, Filter, TrendingUp, Users, Award, Clock, Code, BookOpen, FileText, Zap, Globe, Target, Play, Video, Trophy, Briefcase, Wrench, FolderOpen, Monitor, Book } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]);
  const navigate = useNavigate();

  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const found_courses = await getCourses();
      setCourses(found_courses);

      const uniqueInstructors = Object.values(
        found_courses.reduce((acc, course) => {
          if (!acc[course.instructor]) {
            acc[course.instructor] = course.instructor;
          }
          return acc;
        }, {})
      );
      setInstructors(uniqueInstructors);
      setLoading(false);
    };
    fetchData();
    setIsVisible(true);
  }, []);

  const categories = ["All", ...new Set(courses.map(course => course.category))];
  const featuredCourses = courses.slice(0, 3);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      toast.success(`Found ${filteredCourses.length} courses matching "${value}"`);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== "All") {
      const categoryCount = courses.filter(course => course.category === category).length;
      toast.success(`Showing ${categoryCount} ${category} courses`);
    } else {
      toast.success("Showing all courses");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 dark:border-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 dark:border-purple-600 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 dark:border-indigo-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-300 dark:border-pink-600 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Heading */}
              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">Master Skills That</span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Define Your </span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Future Career
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Transform your career with expert-led courses, hands-on projects, and industry-recognized certifications from top professionals.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toast.success("Redirecting to courses...");
                    navigate("/courses");
                  }}
                >
                  Explore Courses
                </motion.button>
                
              </motion.div>

              {/* Student Avatars */}
              <motion.div
                className="flex items-center gap-3 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${
                        i % 6 === 0 ? 'from-purple-400 to-pink-400' :
                        i % 6 === 1 ? 'from-blue-400 to-cyan-400' :
                        i % 6 === 2 ? 'from-green-400 to-emerald-400' :
                        i % 6 === 3 ? 'from-yellow-400 to-orange-400' :
                        i % 6 === 4 ? 'from-red-400 to-pink-400' :
                        'from-indigo-400 to-purple-400'
                      } flex items-center justify-center text-white font-bold text-sm`}>
                        {String.fromCharCode(65 + i - 1)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-center lg:text-left">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">50,000+</span>
                  <span className="ml-2 text-xs sm:text-sm">Students Enrolled</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Feature Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mt-8 lg:mt-0"
              initial={{ x: 50, opacity: 0 }}
              animate={heroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { title: "Live Classes", icon: Video, color: "from-purple-500 to-purple-600" },
                { title: "National Hackathons", icon: Trophy, color: "from-blue-500 to-blue-600" },
                { title: "Internship Opportunities", icon: Briefcase, color: "from-green-500 to-green-600" },
                { title: "Hand on Practice", icon: Wrench, color: "from-orange-500 to-orange-600" },
                { title: "Project Based Learning", icon: FolderOpen, color: "from-cyan-500 to-cyan-600" },
                { title: "Flexible Learning", icon: Monitor, color: "from-pink-500 to-pink-600" },
                { title: "Coding Challenges", icon: Code, color: "from-red-500 to-red-600" },
                { title: "Study Material", icon: Book, color: "from-yellow-500 to-yellow-600" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group cursor-pointer perspective-1000"
                  initial={{ y: 50, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {}}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-purple-500/50 rounded-lg p-2 sm:p-3 lg:p-4 h-20 sm:h-24 lg:h-28 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 group-hover:shadow-2xl overflow-hidden">
                    
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 blur-xl`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5`}></div>
                    </div>
                    
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-20 blur-sm animate-pulse`}></div>
                    </div>
                    
                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                    
                    <motion.div
                      className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </motion.div>
                    
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Featured Courses Section */}
        <motion.div 
          className="mb-16 mt-20 relative"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Enhanced Header Section */}
          <div className="text-center mb-12 relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Featured Courses
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Discover our most popular courses designed by industry experts to accelerate your career growth
            </motion.p>

            {/* Animated Divider */}
            <motion.div
              className="flex justify-center items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-20"></div>
            </motion.div>
          </div>

          {/* Enhanced Courses Grid */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.3 + (index * 0.15),
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  {/* Course Card Container */}
                  <div className="relative transform group-hover:scale-105 transition-all duration-500">
                    <CourseCard 
                      id={course._id} 
                      course={course.title}
                      courseImage={course.thumbnail}
                      price={course.price}
                      description={course.description}
                      instructor={course.instructor}
                      category={course.category}
                    />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '0.2s' }}>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Courses CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <motion.button
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/courses'}
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10">Explore All Courses</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>

                {/* Sparkle Effect */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.3s' }}></div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <Supreme4Banner />

        {/* Testimonials Section */}
        <Testimonials />    
      </div>
    </div>
  );
}
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
import { Search, Filter, TrendingUp, Users, Award, Clock } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]);
  
  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-300 rounded-full"></div>
      </div>

      <motion.div 
        className="container mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Hero Section with Floating Elements */}
        <motion.div 
          className="text-center mb-16 relative"
          style={{ y }}
        >
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 shadow-lg"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 shadow-lg"
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-60 shadow-lg"
            animate={{ 
              x: [0, 30, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight py-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              lineHeight: '1.2',
              paddingBottom: '0.5rem',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            Discover Amazing Courses
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn from industry experts and transform your career with our comprehensive course catalog
          </motion.p>
        </motion.div>

        <AdvertisementBanner />

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={statsInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
            whileHover={{ y: -5 }}
            onClick={() => toast.success(`Browse ${courses.length} courses available!`)}
          >
            <Users className="mx-auto mb-2 text-blue-600" size={32} />
            <div className="text-3xl font-bold text-gray-800">
              {statsInView && <CountUp end={courses.length} duration={2} />}+
            </div>
            <div className="text-gray-600">Courses</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
            whileHover={{ y: -5 }}
            onClick={() => toast.success(`Learn from ${instructors.length} expert instructors!`)}
          >
            <Award className="mx-auto mb-2 text-green-600" size={32} />
            <div className="text-3xl font-bold text-gray-800">
              {statsInView && <CountUp end={instructors.length} duration={2} />}
            </div>
            <div className="text-gray-600">Instructors</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
            whileHover={{ y: -5 }}
            onClick={() => toast.success("95% of our students successfully complete their courses!")}
          >
            <TrendingUp className="mx-auto mb-2 text-purple-600" size={32} />
            <div className="text-3xl font-bold text-gray-800">
              {statsInView && <CountUp end={95} duration={2} />}%
            </div>
            <div className="text-gray-600">Success Rate</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
            whileHover={{ y: -5 }}
            onClick={() => toast.success("24/7 support available for all students!")}
          >
            <Clock className="mx-auto mb-2 text-orange-600" size={32} />
            <div className="text-3xl font-bold text-gray-800">
              {statsInView && <CountUp end={24} duration={2} />}/7
            </div>
            <div className="text-gray-600">Support</div>
          </motion.div>
        </motion.div>

        {/* Featured Courses Section */}
        <motion.div 
          className="mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Featured Courses</h2>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex"
              >
                <CourseCard 
                          key={course._id} 
                          course={course.title}
                          courseImage={course.thumbnail}
                          price={course.price}
                          description={course.description}
                          instructor={course.instructor}
                          category={course.category}
                           />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Supreme4Banner />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Testimonials Section */}
        <Testimonials />    
      </motion.div>
    </div>
  );
}
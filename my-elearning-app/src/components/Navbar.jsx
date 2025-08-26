import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  BookOpen,
  Home,
  Info,
  LogIn,
  UserPlus,
  BarChart3,
  ChevronDown,
  Code,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { getCourses } from "../data/courses";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true);
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Show only first 5 results
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, courses]);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/ide", label: "IDE", icon: Code },
    { path: "/about", label: "About", icon: Info },
    {path:"/chatbot",label:"Chatbot",icon:User}
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsSearchOpen(false);
      setSearchResults([]);
    }
  };

  const handleCourseClick = (course) => {
    navigate(`/course/${course._id}`);
    setSearchTerm("");
    setIsSearchOpen(false);
    setSearchResults([]);
  };

  const handleViewAllResults = () => {
    navigate(`/courses?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setIsSearchOpen(false);
    setSearchResults([]);
  };


  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-xl border-b border-gray-200"
          : "bg-white/90 backdrop-blur"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        borderBottom: "3px solid",
        borderImage: "linear-gradient(to right, #6366f1, #a21caf) 1",
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with hover animation */}
          <motion.div >
            <Link to="/" className="flex items-center ">
              <img
                src="images/Your_paragraph_text-removebg-preview.png"
                alt="YR IT Solutions"
                className=""
                loading="eager"
                decoding="async"
                draggable="false"
                style={{ height: "40px", width: "110px" }}
              />
              
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    style={{ position: "relative" }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {/* Animated underline for active */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon/Bar */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.button
                    key="search-icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search size={20} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="search-container"
                    className="relative"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "400px" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search courses, instructors, topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchTerm("");
                          setSearchResults([]);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-all"
                      >
                        <X size={16} />
                      </button>
                    </form>

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                      {(searchResults.length > 0 || isSearching) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-hidden"
                        >
                          {isSearching ? (
                            <div className="p-4 text-center">
                              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-gray-600 text-sm">Searching...</p>
                            </div>
                          ) : (
                            <>
                              <div className="max-h-80 overflow-y-auto">
                                {searchResults.map((course) => (
                                  <motion.div
                                    key={course._id}
                                    whileHover={{ backgroundColor: "#f8fafc" }}
                                    className="p-3 border-b border-gray-100 last:border-b-0 cursor-pointer"
                                    onClick={() => handleCourseClick(course)}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen size={20} className="text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                                          {course.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-1">
                                          By {course.instructor}
                                        </p>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                          <div className="flex items-center space-x-1">
                                            <Clock size={12} />
                                            <span>12h</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Users size={12} />
                                            <span>1.2k</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Star size={12} className="text-yellow-500" />
                                            <span>4.8</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm font-bold text-blue-600">
                                          ${course.price}
                                        </div>
                                        <ArrowRight size={16} className="text-gray-400 mt-1" />
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>

                              {searchResults.length > 0 && (
                                <div className="p-3 bg-gray-50 border-t border-gray-200">
                                  <button
                                    onClick={handleViewAllResults}
                                    className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                  >
                                    View all{" "}
                                    {
                                      courses.filter(
                                        (course) =>
                                          course.title
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                          course.description
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                          course.instructor
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                          course.category
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                      ).length
                                    }{" "}
                                    results
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            {/* User Menu with avatar */}
            <div className="relative">
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Avatar with initials */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow">
                  YI
                </div>
                <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                  >
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LogIn size={16} />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserPlus size={16} />
                      <span>Sign Up</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-gray-50 rounded-xl p-4"
            >
              <div className="space-y-2">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search courses, instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />

                  {/* Mobile Search Results */}
                  <AnimatePresence>
                    {(searchResults.length > 0 || isSearching) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-64 overflow-y-auto z-50"
                      >
                        {isSearching ? (
                          <div className="p-4 text-center">
                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-gray-600 text-sm">Searching...</p>
                          </div>
                        ) : (
                          <>
                            {searchResults.map((course) => (
                              <motion.div
                                key={course._id}
                                whileHover={{ backgroundColor: "#f8fafc" }}
                                className="p-3 border-b border-gray-100 last:border-b-0 cursor-pointer"
                                onClick={() => {
                                  handleCourseClick(course);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={16} className="text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                                      {course.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                      By {course.instructor}
                                    </p>
                                    <div className="text-sm font-bold text-blue-600 mt-1">
                                      ${course.price}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}

                            {searchResults.length > 0 && (
                              <div className="p-3 bg-gray-50 border-t border-gray-200">
                                <button
                                  onClick={() => {
                                    handleViewAllResults();
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                  View all results
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
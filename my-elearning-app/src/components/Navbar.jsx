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
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { getCourses } from "../data/courses";
import ThemeToggle from "./ThemeToggle";

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
    { path: "/articles", label: "Articles", icon: FileText },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/ide", label: "IDE", icon: Code },
    { path: "/about", label: "About", icon: Info },
    {path:"/chatbot",label:"Chatbot",icon:User}
  ];

  const bottomNavItems = navItems.filter((item) =>
    ["/", "/courses", "/dashboard", "/about"].includes(item.path)
  );

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

  // Ensure page content isn't hidden behind the bottom mobile nav
  useEffect(() => {
    const applyPadding = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      if (isMobile) {
        document.body.style.paddingBottom = "64px"; // height of bottom nav
      } else {
        document.body.style.paddingBottom = "0px";
      }
    };
    applyPadding();
    window.addEventListener("resize", applyPadding);
    return () => {
      window.removeEventListener("resize", applyPadding);
      // cleanup on unmount
      document.body.style.paddingBottom = "0px";
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          borderBottom: "3px solid",
          borderImage: "linear-gradient(to right, #6366f1, #a21caf) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo with hover animation */}
            <motion.div >
              <Link to="/" className="flex items-center ">
                <img
                  src="/images/Your_paragraph_text-removebg-preview.png"
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
            <div className="hidden md:flex items-center space-x-6">
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
                      className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
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
            <div className="hidden md:flex items-center space-x-3">
              {/* Search Icon/Bar */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {!isSearchOpen ? (
                    <motion.button
                      key="search-icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
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
                      animate={{ opacity: 1, width: "360px" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                        <input
                          type="text"
                          placeholder="Search courses, instructors, topics..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchTerm("");
                            setSearchResults([]);
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-all"
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
                            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-hidden"
                          >
                            {isSearching ? (
                              <div className="p-4 text-center">
                                <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Searching...</p>
                              </div>
                            ) : (
                              <>
                                <div className="max-h-80 overflow-y-auto">
                                  {searchResults.map((course) => (
                                    <motion.div
                                      key={course._id}
                                      whileHover={{ backgroundColor: "#f8fafc" }}
                                      className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer"
                                      onClick={() => handleCourseClick(course)}
                                    >
                                      <div className="flex items-start space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <BookOpen size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            {course.title}
                                          </h4>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            By {course.instructor}
                                          </p>
                                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
                                          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                            ${course.price}
                                          </div>
                                          <ArrowRight size={16} className="text-gray-400 dark:text-gray-500 mt-1" />
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>

                                {searchResults.length > 0 && (
                                  <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                      onClick={handleViewAllResults}
                                      className="w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
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

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu with avatar */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
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
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2"
                    >
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogIn size={16} />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all"
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

            {/* Mobile Theme Toggle - Top Right Corner */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] flex flex-col justify-end"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Bottom Sheet Panel */}
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white dark:bg-gray-900 rounded-t-2xl p-4 border-t border-gray-200 dark:border-gray-800 max-h-[70vh] w-full overflow-y-auto"
            >
              <div className="mx-auto max-w-7xl">
                <div className="space-y-2">
                  {/* Mobile Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Search courses, instructors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-900"
                    />

                    {/* Mobile Search Results */}
                    <AnimatePresence>
                      {(searchResults.length > 0 || isSearching) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-50"
                        >
                          {isSearching ? (
                            <div className="p-4 text-center">
                              <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Searching...</p>
                            </div>
                          ) : (
                            <>
                              {searchResults.map((course) => (
                                <motion.div
                                  key={course._id}
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer"
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
                                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {course.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        By {course.instructor}
                                      </p>
                                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                                        ${course.price}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                              {searchResults.length > 0 && (
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                  <button
                                    onClick={() => {
                                      handleViewAllResults();
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
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
                        className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-600 dark:bg-blue-400 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3.5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3.5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur border-t border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-2">
          <ul className="flex items-stretch justify-between">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={`bottom-${item.path}`} className="flex-1">
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center justify-center h-16 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="mt-0.5">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            {/* Menu button to open/close the rest of the items */}
            <li className="flex-1">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-pressed={isMobileMenuOpen}
                className={`w-full flex flex-col items-center justify-center h-16 text-xs font-medium transition-colors ${
                  isMobileMenuOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="mt-0.5">{isMobileMenuOpen ? "Close" : "Menu"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
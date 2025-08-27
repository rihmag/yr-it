import { useState, useEffect } from "react";
import { getCourses } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { Search, Filter, Grid, List, BookOpen, Users, Clock, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import InstructorShowcase from "../components/InstructorShowcase"

export default function AllCourses() {
  const [activeCard, setActiveCard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [searchParams, setSearchParams] = useSearchParams();

  // Get unique categories from courses
  const categories = ["All", ...new Set(courses.map(course => course.category))];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Handle URL search parameter
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Filter and sort courses
  useEffect(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort courses
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        // Keep original order for popular (assuming it's already sorted by popularity)
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, sortBy]);

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + (course.students || 1200), 0),
    totalHours: courses.reduce((sum, course) => sum + (course.duration || 12), 0),
    avgRating: 4.8
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search parameter
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
        <div className="container mx-auto px-4 py-8 overflow-x-hidden">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight max-w-full">
              {searchTerm ? `Search Results for "${searchTerm}"` : "Discover Amazing Courses"}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4">
              {searchTerm 
                ? `Found ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} matching your search`
                : "Explore our comprehensive collection of courses designed to help you master new skills and advance your career"
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4">
              <div className="relative w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto px-2 sm:px-4">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">{stats.totalCourses}+</div>
                <div className="text-xs sm:text-sm text-blue-100">Courses</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">{stats.totalStudents.toLocaleString()}+</div>
                <div className="text-xs sm:text-sm text-blue-100">Students</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">{stats.totalHours}+</div>
                <div className="text-xs sm:text-sm text-blue-100">Hours</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">{stats.avgRating}★</div>
                <div className="text-xs sm:text-sm text-blue-100">Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-full">
          {/* Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              {/* Results Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
                </h2>
                {searchTerm && (
                  <span className="text-sm sm:text-base text-gray-600">
                    for "{searchTerm}"
                  </span>
                )}
                {(searchTerm || selectedCategory !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors self-start sm:self-auto"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-600 flex-shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-gray-600 flex-shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <AnimatePresence mode="wait">
            {filteredCourses.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12 sm:py-16 px-4"
              >
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No courses found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `No courses match "${searchTerm}". Try adjusting your search terms or filters.`
                    : "Try adjusting your search terms or filters to find what you're looking for."
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="courses-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 max-w-4xl mx-auto"
                }`}
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseCard 
                      course={course.title}
                      courseImage={course.thumbnail}
                      price={course.price}
                      description={course.description}
                      instructor={course.instructor}
                      category={course.category}
                      isActive={activeCard === course._id}
                      onHover={() => setActiveCard(course._id)}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Button (if needed) */}
          {filteredCourses.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Courses
              </motion.button>
            </div>
          )}

          <InstructorShowcase/>

          {/* Bottom Stats */}
          <div className="mt-12 sm:mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/50 shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">10,000+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Students Enrolled</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Placement Rate</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">4.9/5</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Student Rating</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Companies Hiring</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
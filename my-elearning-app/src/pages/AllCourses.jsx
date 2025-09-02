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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 dark:bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            All Courses
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our comprehensive collection of programming courses designed to advance your skills
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 dark:border-gray-700/20">
            <BookOpen className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{courses.length}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Total Courses</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 dark:border-gray-700/20">
            <Users className="mx-auto mb-2 text-green-600 dark:text-green-400" size={24} />
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">50K+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Students</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 dark:border-gray-700/20">
            <Clock className="mx-auto mb-2 text-orange-600 dark:text-orange-400" size={24} />
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">500+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Hours Content</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 dark:border-gray-700/20">
            <Star className="mx-auto mb-2 text-yellow-600 dark:text-yellow-400" size={24} />
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">4.8</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Avg Rating</div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20 dark:border-gray-700/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-600 dark:text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" 
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list" 
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-gray-700 dark:text-gray-300">
            Showing {filteredCourses.length} of {courses.length} courses
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp size={16} />
            <span>Sorted by {sortBy.replace('-', ' ')}</span>
          </div>
        </motion.div>

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
              <div className="text-gray-400 dark:text-gray-500 text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No courses found</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `No courses match "${searchTerm}". Try adjusting your search terms or filters.`
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 dark:bg-blue-400 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-semibold hover:from-blue-700 dark:hover:from-blue-500 hover:to-purple-700 dark:hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Courses
            </motion.button>
          </div>
        )}

        <InstructorShowcase/>

        {/* Bottom Stats */}
        <div className="mt-12 sm:mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-gray-700/50 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">10,000+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Students Enrolled</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Placement Rate</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Student Rating</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Companies Hiring</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Star, BookOpen, ArrowRight, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseCard({ course, isActive, onHover }) {
  const [showOnLeft, setShowOnLeft] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && isActive) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setShowOnLeft(rect.right + 300 > windowWidth);
    }
  }, [isActive]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites!");
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.origin + `/course/${course.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/course/${course.id}`);
      toast.success("Course link copied to clipboard!");
    }
  };

  const handleCourseClick = () => {
    setIsLoading(true);
    toast.success(`Opening ${course.title}...`);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    toast.success(isExpanded ? "Course details collapsed" : "Showing course details");
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Action buttons overlay */}
        <div className="absolute top-4 left-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={16} />
          </motion.button>
        </div>

        <Link to={`/course/${course.id}`} onClick={handleCourseClick} className="flex-1 flex flex-col">
          <div className="relative overflow-hidden">
            <motion.img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                ${course.price}
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {course.category}
              </motion.div>
            </div>
            
            {/* Loading overlay */}
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <motion.h3 
              className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {course.title}
            </motion.h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-shrink-0">
              By {course.instructor.name}
            </p>
            
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>1.2k</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <span>4.8</span>
                </div>
              </div>
            </div>
            
            <motion.div
              className="flex items-center justify-between mt-auto"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-bold text-blue-600">${course.price}</span>
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full group-hover:from-blue-700 group-hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>
          </div>
        </Link>

        {/* Learn More Button */}
        <div className="px-6 pb-6 flex-shrink-0">
          <motion.button
            onClick={handleLearnMore}
            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="px-6 pb-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="pt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{course.title}</h4>
                      <p className="text-sm text-gray-600">By {course.instructor.name}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen size={16} className="mr-3 text-blue-600 flex-shrink-0" />
                      <span>{course.chapters?.length || 0} chapters</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-3 text-green-600 flex-shrink-0" />
                      <span>
                        {course.curriculum?.sections?.reduce(
                          (total, section) => total + section.lessons.length,
                          0
                        ) || 0}{" "}
                        lessons
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-3 text-purple-600 flex-shrink-0" />
                      <span>{course.instructor.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                    <Link
                      to={`/course/${course.id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
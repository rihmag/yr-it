import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourses } from "../data/courses";
import InstructorComponent from "../components/InstructorComponent";
import { motion } from "framer-motion";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lesson_data,setlesson_data]=useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      const courses = await getCourses();
      const foundCourse = courses.find((c) => c._id === courseId);
      setlesson_data(foundCourse.lessons)
      setCourse(foundCourse);
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading course...</p>
      </div>
    </div>
  );
  
  if (!course) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h2>
        <p className="text-gray-600 dark:text-gray-300">The course you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const scrollToInstructor = () => {
    document
      .getElementById("instructor-section")
      .scrollIntoView({ behavior: "smooth" });
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:col-span-2">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {course.title}
            </motion.h1>
            <motion.p 
              className="text-lg mb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {course.description}
            </motion.p>

            {/* Course Includes Section */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20 dark:border-gray-700/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">This Course Includes:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3">📹</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Video Content</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.lessons?.length || 0} video lessons
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3">📝</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Course Chapters</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.lessons?.length || 0} comprehensive chapters
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3">🎓</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Certificate</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completion certificate included
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3">💬</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Direct access to instructor
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={scrollToInstructor}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline mb-4 font-medium flex items-center gap-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ x: 5 }}
            >
              Created by {course.instructor}
            </motion.button>
          </div>
          

          {/* Course Image and Subscribe Card */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/20">
              <img
                src={`data:image/jpeg;base64,${course.thumbnail}`}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{course.price}</span>
                </div>
                <motion.a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe-dr0_7my4ic_lMQplEDivsmOMTcAoQgTRJkA5TMtMzBLBYg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe to Course
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Lessons Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Lessons</h2>
          <div className="space-y-6">
            {lesson_data.map((lesson, index) => (
              <motion.div 
                key={lesson._id} 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{`${index + 1}. ${lesson.title}`}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {lesson.duration} mins
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{lesson.content}</p>
                  
                  {lesson.contentType === 'video' && (() => {
                    const url = lesson.video;
                    const match = url.match(/[?&]v=([^&#]+)/);
                    const videoId = match ? match[1] : null;

                    if (!videoId) return null;

                    return (
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                        />
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instructor Section */}
        <motion.div
          id="instructor-section"
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <InstructorComponent 
            instructor={{
              name: course.instructor,
              role: 'Course Instructor',
              avatar: '/images/default-avatar.jpg',
              tags: ['Teaching', course.category || 'Education']
            }} 
          />
        </motion.div>
      </div>
    </div>
  );
}
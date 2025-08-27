import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { 
  Code, 
  BookOpen, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Award, 
  Lightbulb,
  Target,
  Heart,
  Star,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Play,
  CheckCircle,
  Rocket,
  Brain,
  Monitor,
  Database,
  Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { getCourses } from "../data/courses";

export default function About() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [techRef, techInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });

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
  }, []);

  const features = [
    {
      icon: Code,
      title: "Integrated IDE",
      description: "Built-in code editor with syntax highlighting, autocomplete, and real-time collaboration features.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Extensive library of courses covering programming, web development, data science, and more.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Learning",
      description: "Interactive coding sessions with instant feedback and live collaboration.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with encrypted data and secure authentication.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners worldwide and build your professional network.",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const techStack = [
    { name: "React 19", category: "Frontend", icon: "⚛️" },
    { name: "Vite", category: "Build Tool", icon: "⚡" },
    { name: "Tailwind CSS", category: "Styling", icon: "🎨" },
    { name: "Framer Motion", category: "Animation", icon: "🎭" },
    { name: "Express.js", category: "Backend", icon: "🚀" },
    { name: "MongoDB", category: "Database", icon: "🍃" },
    { name: "Socket.io", category: "Real-time", icon: "🔌" },
    { name: "CodeMirror", category: "IDE", icon: "💻" },
    { name: "JWT", category: "Auth", icon: "🔐" },
    { name: "Cloudinary", category: "Media", icon: "☁️" }
  ];

  const teamMembers = [
    {
      name: "YR IT Solutions",
      role: "Founder & Lead Developer",
      avatar: "/images/Your_paragraph_text-removebg-preview.png",
      bio: "Passionate about creating innovative learning experiences through technology.",
      social: { github: "#", linkedin: "#", email: "contact@yr-it.com" }
    }
  ];

  const stats = [
    { label: "Active Learners", value: 10000, suffix: "+" },
    { label: "Courses Available", value: courses.length, suffix: "+" },
    { label: "Expert Instructors", value: instructors.length, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-300 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-20 h-20 border-2 border-indigo-300 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="text-center mb-20 relative"
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-loose pb-3"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About YR-Learning
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing online education with an integrated development environment, 
            real-time collaboration, and expert-led courses designed for the modern learner.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Award className="text-yellow-500" size={20} />
              <span className="font-semibold text-gray-700">Award-Winning Platform</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Users className="text-blue-500" size={20} />
              <span className="font-semibold text-gray-700">10K+ Active Learners</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Star className="text-purple-500" size={20} />
              <span className="font-semibold text-gray-700">4.9/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={statsInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ y: 30, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {statsInView && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To democratize quality programming education by providing an integrated learning environment 
              that combines theoretical knowledge with practical coding experience, making technology 
              education accessible to everyone, everywhere.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become the world's leading platform for interactive programming education, 
              fostering a global community of skilled developers who can build the future 
              through innovative technology solutions.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          ref={featuresRef}
          className="mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={featuresInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={featuresInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Platform Features
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={featuresInView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 group hover:bg-white/95 hover:border-blue-200 relative overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    rotateX: 5,
                    rotateY: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setActiveFeature(index)}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  {/* Glow effect background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 transition-all duration-300`}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <Icon className="text-white" size={28} />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          ref={techRef}
          className="mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={techInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight pb-3"
              initial={{ y: 30, opacity: 0 }}
              animate={techInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Technology Stack
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={techInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Built with cutting-edge technologies for optimal performance and user experience
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 group relative overflow-hidden"
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={techInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.08,
                  rotateY: 15,
                  rotateX: 10,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, 
                      hsl(${(index * 60) % 360}, 70%, 60%), 
                      hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                      hsl(${(index * 60 + 240) % 360}, 70%, 60%))`
                  }}
                  animate={{
                    background: [
                      `linear-gradient(45deg, 
                        hsl(${(index * 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 240) % 360}, 70%, 60%))`,
                      `linear-gradient(45deg, 
                        hsl(${(index * 60 + 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 180) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 300) % 360}, 70%, 60%))`,
                      `linear-gradient(45deg, 
                        hsl(${(index * 60) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 120) % 360}, 70%, 60%), 
                        hsl(${(index * 60 + 240) % 360}, 70%, 60%))`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Blur glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, 
                      hsl(${(index * 60) % 360}, 80%, 70%), 
                      hsl(${(index * 60 + 180) % 360}, 80%, 70%))`
                  }}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <motion.div 
                    className="text-3xl mb-3 transition-transform duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateZ: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    animate={{
                      rotateY: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                  <motion.h4 
                    className="font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.name}
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.category}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={ctaInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Ready to Start Learning?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Join thousands of learners who are already mastering programming with <br/>
              our interactive platform
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/courses')}
              >
                <Rocket size={20} />
                <span>Start Learning Now</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { Code, Brain, Zap, Shield, Star, Users, Clock, Award, Monitor, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Live Code Editor",
      description: "Practice coding directly in your browser with our integrated IDE. No setup required, just start coding immediately.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your skill level and learning pace with intelligent recommendations.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Project-Based Learning",
      description: "Build real-world projects that you can add to your portfolio. Learn by doing, not just watching.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Industry-Ready Skills",
      description: "Curriculum designed by industry experts to ensure you learn the most in-demand skills employers want.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Online & Offline Access",
      description: "Our platform is available for both online and offline learning, so you can study anytime, anywhere.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Industry Internships",
      description: "We provide internships on real-time industry projects to help you gain practical experience.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "10K+", label: "Active Learners", color: "text-blue-600" },
    { icon: <Clock className="w-6 h-6" />, number: "500+", label: "Hours of Content", color: "text-purple-600" },
    { icon: <Star className="w-6 h-6" />, number: "4.9", label: "Average Rating", color: "text-orange-600" },
    { icon: <Award className="w-6 h-6" />, number: "95%", label: "Success Rate", color: "text-green-600" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Why Choose YR-Learning?</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Skills with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Learning</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of education with our cutting-edge platform designed to make learning 
            interactive, engaging, and effective for the modern developer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-opacity-50`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers with YR-Learning. 
                Start building your future today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  <Link to="/courses">Explore Courses</Link>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <Link to="/about">Learn More</Link>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

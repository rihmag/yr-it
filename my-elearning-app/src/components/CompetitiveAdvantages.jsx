import { motion } from "framer-motion";
import { Code, Brain, Zap, Shield, TrendingUp, Users, Clock, Award, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompetitiveAdvantages() {
  const uniqueFeatures = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Browser-Based IDE",
      description: "Code, compile, and debug directly in your browser. No downloads, no setup - just pure coding.",
      metric: "0 Setup Time",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Adaptive Learning AI",
      description: "Our AI analyzes your progress and adjusts difficulty in real-time for optimal learning.",
      metric: "95% Personalization",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Collaboration",
      description: "Code together with peers in real-time. Share, learn, and grow as a community.",
      metric: "Real-time Sync",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Industry Projects",
      description: "Build real-world projects that employers actually want to see in your portfolio.",
      metric: "Portfolio Ready",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const performanceMetrics = [
    { label: "Learning Speed", yrLearning: 85, others: 45 },
    { label: "Retention Rate", yrLearning: 92, others: 68 },
    { label: "Project Completion", yrLearning: 88, others: 52 },
    { label: "Job Placement", yrLearning: 78, others: 35 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
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
            <span className="text-sm font-semibold text-gray-700">Why YR-Learning Stands Out</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The YR-Learning
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Difference</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our innovative approach to coding education creates a learning experience 
            that's faster, more effective, and more engaging than traditional methods.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-opacity-50">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="text-sm font-semibold text-blue-600">{feature.metric}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced Performance Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Performance Comparison</h3>
            <p className="text-gray-600">How YR-Learning outperforms traditional learning methods</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Style Bar Chart */}
            <div className="relative">
              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-blue-600 font-semibold">{metric.yrLearning}%</span>
                        <span className="text-gray-500">{metric.others}%</span>
                      </div>
                    </div>
                    
                    <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                      {/* YR-Learning Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.yrLearning}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                      />
                      
                      {/* Others Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.others}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-60"
                      />
                      
                      {/* 3D Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-8 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">YR-Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Traditional Methods</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center lg:text-left"
              >
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Why These Numbers Matter
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Faster Learning Curve</h5>
                      <p className="text-gray-600 text-sm">Our adaptive AI ensures you learn at your optimal pace</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Better Retention</h5>
                      <p className="text-gray-600 text-sm">Hands-on projects help you remember concepts longer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Higher Success Rate</h5>
                      <p className="text-gray-600 text-sm">More students complete courses and land jobs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Experience the YR-Learning Difference
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who have already discovered why YR-Learning 
                is the preferred choice for modern coding education.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  <Link to="/courses">Start Your Journey</Link>
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

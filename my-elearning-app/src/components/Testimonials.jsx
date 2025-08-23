import { useEffect, useState } from "react";

const testimonials = [
	{
		name: "Bhavya Bhalla",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=64",
		content:
			"This course is beginner friendly, starting from C++ basics to advanced concepts like Graphs and DP. The explanations and homework solutions are in-depth and practical. I can now approach DP problems with 2-3 clear strategies — huge confidence boost!",
		course: "DSA Supreme 2.0",
		company: "Microsoft",
	},
	{
		name: "Chirag Arora",
		role: "Software Engineer",
		avatar: "https://i.pravatar.cc/100?img=12",
		content:
			"Best DSA course I've taken online. Affordable, yet the delivery far exceeded the price. Variety of questions is top‑notch — better than many courses costing 20–25k!",
		course: "DSA Supreme 2.0",
		company: "Google",
	},
	{
		name: "Avi Juneja",
		role: "SDE Intern",
		avatar: "https://i.pravatar.cc/100?img=32",
		content:
			"I've been following the instructor since my first year of college. The guidance on DSA and real‑world problem solving helped me crack interviews and build confidence quickly.",
		course: "Web Development",
		company: "Amazon",
	},
	{
		name: "Nisha Patel",
		role: "Frontend Developer",
		avatar: "https://i.pravatar.cc/100?img=47",
		content:
			"UI projects and code reviews were game‑changers. My portfolio went from average to hire‑ready in weeks. Landed interviews at two startups right after.",
		course: "Web Development",
		company: "Flipkart",
	},
	{
		name: "Sarthak Verma",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=15",
		content:
			"Loved the structured roadmap and weekly challenges. Concepts stick because they're tied to real problems — not just theory.",
		course: "DSA Supreme 2.0",
		company: "Placement",
	},
	{
		name: "Meera Iyer",
		role: "Data Analyst",
		avatar: "https://i.pravatar.cc/100?img=5",
		content:
			"The practice sets and mentorship helped me switch from support to analytics. Cleared interviews with strong fundamentals and projects.",
		course: "Web Development",
		company: "Swiggy",
	},
	{
		name: "Rahul Sharma",
		role: "Full Stack Developer",
		avatar: "https://i.pravatar.cc/100?img=23",
		content:
			"From struggling with basic React concepts to building production apps — this course covers everything! The deployment and optimization modules saved me months of trial and error.",
		course: "Web Development",
		company: "Paytm",
	},
	{
		name: "Priya Desai",
		role: "Software Engineer",
		avatar: "https://i.pravatar.cc/100?img=41",
		content:
			"The mock interview sessions were incredibly helpful. Got comfortable with system design questions and cleared my dream job interview at Netflix with confidence!",
		course: "DSA Supreme 2.0",
		company: "Netflix",
	},
	{
		name: "Kartik Singh",
		role: "DevOps Engineer",
		avatar: "https://i.pravatar.cc/100?img=68",
		content:
			"Switched from manual testing to DevOps using skills from this course. The CI/CD and cloud deployment modules were exactly what I needed for my career pivot.",
		course: "Web Development",
		company: "Zomato",
	},
	{
		name: "Anjali Gupta",
		role: "Data Scientist",
		avatar: "https://i.pravatar.cc/100?img=19",
		content:
			"The algorithmic thinking approach helped me excel in data science interviews. Now I can optimize ML models and handle large datasets efficiently.",
		course: "DSA Supreme 2.0",
		company: "Uber",
	},
	{
		name: "Arjun Mehta",
		role: "Mobile App Developer",
		avatar: "https://i.pravatar.cc/100?img=56",
		content:
			"React Native integration and responsive design concepts from the web course helped me build cross-platform apps. Landed my first mobile dev role!",
		course: "Web Development",
		company: "PhonePe",
	},
	{
		name: "Sneha Agarwal",
		role: "Technical Lead",
		avatar: "https://i.pravatar.cc/100?img=33",
		content:
			"As someone with 3+ years experience, this course still taught me optimization techniques I use daily. The advanced patterns and system design insights are gold!",
		course: "DSA Supreme 2.0",
		company: "Salesforce",
	},
	{
		name: "Vikash Kumar",
		role: "Backend Developer",
		avatar: "https://i.pravatar.cc/100?img=71",
		content:
			"Database optimization and API design patterns from this course helped me scale our startup's backend from 100 to 10k+ users seamlessly.",
		course: "Web Development",
		company: "Razorpay",
	},
	{
		name: "Divya Joshi",
		role: "QA Engineer",
		avatar: "https://i.pravatar.cc/100?img=25",
		content:
			"Understanding algorithms helped me write better test cases and automation scripts. Transitioned from manual to automation testing with a 40% salary hike!",
		course: "DSA Supreme 2.0",
		company: "Adobe",
	},
	{
		name: "Rohit Agrawal",
		role: "Startup Founder",
		avatar: "https://i.pravatar.cc/100?img=44",
		content:
			"Built my entire SaaS product using techniques from this course. From MVP to 500+ paying customers — the scalability principles were crucial for growth.",
		course: "Web Development",
		company: "TechCorp",
	},
];

const StarRating = () => {
	return (
		<div className="flex gap-1">
			{[...Array(5)].map((_, i) => (
				<svg
					key={i}
					className="w-4 h-4 text-yellow-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
};

export default function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	// Auto-rotate reviews
	useEffect(() => {
		const interval = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % testimonials.length);
				setIsAnimating(false);
			}, 500);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	// Get 3 consecutive reviews starting from currentIndex
	const getVisibleReviews = () => {
		const reviews = [];
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % testimonials.length;
			reviews.push({
				...testimonials[index],
				displayIndex: i,
			});
		}
		return reviews;
	};

	const visibleReviews = getVisibleReviews();

	return (
		<section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full mb-6 shadow-sm">
						<div className="flex gap-1">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
							<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
						</div>
						<span className="text-sm font-semibold text-gray-700">Live Student Reviews</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
						Success Stories from Our Students
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
						See how our courses have transformed careers and helped students crack top tech interviews
					</p>
					
					<div className="mt-6 flex justify-center items-center gap-6">
						<div className="flex items-center gap-2">
							<StarRating />
							<span className="text-sm font-semibold text-gray-700">4.9/5</span>
						</div>
						<div className="h-4 w-px bg-gray-300"></div>
						<span className="text-sm text-gray-600">10,000+ Happy Students</span>
						<div className="h-4 w-px bg-gray-300"></div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-sm text-gray-600">Auto-updating</span>
						</div>
					</div>
				</div>

				{/* Single Row Reviews */}
				<div className="relative overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{visibleReviews.map((testimonial, index) => (
							<div
								key={`${testimonial.name}-${currentIndex}-${index}`}
								className={`
									bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50
									hover:shadow-2xl hover:scale-105 transition-all duration-500
									relative overflow-hidden group cursor-pointer
									${isAnimating ? 'animate-slideLeft' : 'animate-slideInRight'}
								`}
								style={{
									animationDelay: `${index * 0.1}s`,
								}}
							>
								{/* Gradient border effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								
								{/* Content */}
								<div className="relative z-10">
									{/* Header with avatar and info */}
									<div className="flex items-start gap-4 mb-6">
										<div className="relative">
											<img
												src={testimonial.avatar}
												alt={testimonial.name}
												className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
											/>
											{/* Online status */}
											<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
										</div>
										
										<div className="flex-1">
											<h4 className="font-bold text-gray-900 text-lg mb-1">
												{testimonial.name}
											</h4>
											<p className="text-blue-600 font-medium text-sm mb-2">
												{testimonial.role}
											</p>
											<div className="flex items-center gap-2">
												<StarRating />
											</div>
										</div>
									</div>
									
									{/* Review content */}
									<div className="mb-6">
										<svg className="w-8 h-8 text-blue-200 mb-2" fill="currentColor" viewBox="0 0 24 24">
											<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
										</svg>
										<p className="text-gray-700 leading-relaxed text-sm">
											{testimonial.content}
										</p>
									</div>
									
									{/* Tags */}
									<div className="flex flex-wrap gap-2">
										<span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
											{testimonial.course}
										</span>
										<span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
											@ {testimonial.company}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Progress indicators */}
					<div className="flex justify-center mt-8 gap-2">
						{testimonials.map((_, index) => (
							<div
								key={index}
								className={`h-1 rounded-full transition-all duration-500 ${
									index >= currentIndex && index < currentIndex + 3
										? 'w-8 bg-blue-500'
										: index === (currentIndex + 3) % testimonials.length
										? 'w-6 bg-blue-300'
										: 'w-2 bg-gray-300'
								}`}
							/>
						))}
					</div>

				</div>

				{/* Bottom Stats */}
				<div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div className="group">
							<div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">10,000+</div>
							<div className="text-sm text-gray-600 mt-1">Students Enrolled</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">95%</div>
							<div className="text-sm text-gray-600 mt-1">Placement Rate</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">4.9/5</div>
							<div className="text-sm text-gray-600 mt-1">Student Rating</div>
						</div>
						<div className="group">
							<div className="text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform">500+</div>
							<div className="text-sm text-gray-600 mt-1">Companies Hiring</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes slideInRight {
					0% {
						opacity: 0;
						transform: translateX(100px);
					}
					100% {
						opacity: 1;
						transform: translateX(0);
					}
				}
				
				@keyframes slideLeft {
					0% {
						opacity: 1;
						transform: translateX(0);
					}
					100% {
						opacity: 0;
						transform: translateX(-100px);
					}
				}
				
				.animate-slideInRight {
					animation: slideInRight 0.7s ease-out forwards;
				}
				
				.animate-slideLeft {
					animation: slideLeft 0.5s ease-in forwards;
				}
			`}</style>
		</section>
	);
}
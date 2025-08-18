import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstructorShowcase() {
	// Instructor data with enhanced styling
	const instructors = [
		{
			name: "Vinay Sheoran",
			role: "Senior Data Science Trainer",
			avatar: "/images/trainer1.jpg",
			bio:
				"Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
			tags: ["System Design", "DSA", "Java", "Mentorship"],
			accent: "from-blue-500 via-indigo-500 to-purple-500",
		},
		{
			name: "Sumit Kumar",
			role: "Web Development Instructor",
			avatar: "/images/trainer3.jpg",
			bio:
				"Former Full Stack Developer at DRDO & PwC. Expert in React.js, Node.js, database design, and scalable web architecture.",
			tags: ["Web", "Cloud", "Career", "Code Reviews"],
			accent: "from-emerald-500 via-teal-500 to-sky-500",
		},

		{
			name: "Isha",
			role: "UI/UX Design Specialist",
			avatar: "/images/trainer2.jpg",
			bio:
				"Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.",
			tags: ["UI/UX", "Design Systems", "Wireframing", "User Research"],
			accent: "from-pink-500 via-rose-500 to-red-500",
		},
	];

	return (
		<div className="mb-20 relative">
			<div className="mb-12 text-center">
				<motion.h2 
					className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block mb-3"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Meet Our Instructors
				</motion.h2>
				<motion.div 
					className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-full"
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: 96, opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.2 }}
				/>
				<motion.p 
					className="text-gray-600 mt-4 max-w-2xl mx-auto"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
				</motion.p>
			</div>

			{/* Instructors horizontally */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{instructors.map((instructor, index) => (
					<motion.div 
						key={instructor.name} 
						className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						whileHover={{ y: -5 }}
					>
						{/* Accent line */}
						<div
							className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${instructor.accent} transition-all duration-300 group-hover:h-3`}
						/>

						{/* Subtle grid */}
						<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

						<div className="relative p-6 md:p-8 z-10">
							<div className="flex flex-col gap-6 items-center">
								{/* Portrait */}
								<div className="w-full max-w-[180px] transform transition-transform duration-300 group-hover:scale-105">
									<div className={`relative mx-auto w-full rounded-2xl p-1.5 bg-gradient-to-br ${instructor.accent} shadow-lg`}>
										<div className="rounded-xl overflow-hidden aspect-square ring-2 ring-white/50">
											<motion.img
												src={instructor.avatar}
												alt={instructor.name}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4 }}
											/>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className="w-full text-center mt-2">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.35 }}
									>
										<h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">{instructor.name}</h3>
										<p className={`text-md bg-gradient-to-r ${instructor.accent} bg-clip-text text-transparent font-medium mt-1`}>{instructor.role}</p>
										<blockquote className="mt-4 text-gray-700 leading-relaxed relative text-sm px-4">
											<span className={`absolute top-0 left-0 text-4xl opacity-20 font-serif ${instructor.accent.includes('blue') ? 'text-blue-400' : instructor.accent.includes('emerald') ? 'text-emerald-400' : 'text-pink-400'}`}>"</span>
											{instructor.bio}
											<span className={`absolute bottom-0 right-0 text-4xl opacity-20 font-serif ${instructor.accent.includes('blue') ? 'text-blue-400' : instructor.accent.includes('emerald') ? 'text-emerald-400' : 'text-pink-400'}`}>"</span>
										</blockquote>

										{/* Expertise chips */}
										<div className="mt-6 flex flex-wrap gap-2 justify-center">
											{instructor.tags?.map((t) => (
												<motion.span
													key={t}
													className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${instructor.accent} text-white shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													{t}
												</motion.span>
											))}
										</div>
									</motion.div>
								</div>
							</div>
						</div>
						
						{/* Decorative element */}
						<div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl bg-gradient-to-br ${instructor.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
					</motion.div>
				))}
			</div>
			
			{/* Decorative background elements */}
			<motion.div 
				className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"
				animate={{ 
					scale: [1, 1.2, 1],
					opacity: [0.2, 0.3, 0.2]
				}}
				transition={{ 
					duration: 8,
					repeat: Infinity,
					repeatType: "reverse"
				}}
			/>
			<motion.div 
				className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-30 blur-3xl"
				animate={{ 
					scale: [1, 1.1, 1],
					opacity: [0.2, 0.3, 0.2]
				}}
				transition={{ 
					duration: 6,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 1
				}}
			/>
			<motion.div 
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-50 rounded-full opacity-20 blur-3xl -z-10"
				animate={{ 
					scale: [1, 1.3, 1],
					opacity: [0.1, 0.2, 0.1]
				}}
				transition={{ 
					duration: 10,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 2
				}}
			/>
		</div>
	);
}



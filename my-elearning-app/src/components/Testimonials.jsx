import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
	{
		name: "Bhavya Bhalla",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=64",
		content:
			"This course is beginner friendly, starting from C++ basics to advanced concepts like Graphs and DP. The explanations and homework solutions are in-depth and practical. I can now approach DP problems with 2-3 clear strategies — huge confidence boost!",
	},
	{
		name: "Chirag Arora",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=12",
		content:
			"Best DSA course I’ve taken online. Affordable, yet the delivery far exceeded the price. Variety of questions is top‑notch — better than many courses costing 20–25k!",
	},
	{
		name: "Avi Juneja",
		role: "SDE Intern",
		avatar: "https://i.pravatar.cc/100?img=32",
		content:
			"I’ve been following the instructor since my first year of college. The guidance on DSA and real‑world problem solving helped me crack interviews and build confidence quickly.",
	},
	{
		name: "Nisha Patel",
		role: "Frontend Dev",
		avatar: "https://i.pravatar.cc/100?img=47",
		content:
			"UI projects and code reviews were game‑changers. My portfolio went from average to hire‑ready in weeks. Landed interviews at two startups right after.",
	},
	{
		name: "Sarthak Verma",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=15",
		content:
			"Loved the structured roadmap and weekly challenges. Concepts stick because they’re tied to real problems — not just theory.",
	},
	{
		name: "Meera Iyer",
		role: "Data Analyst",
		avatar: "https://i.pravatar.cc/100?img=5",
		content:
			"The practice sets and mentorship helped me switch from support to analytics. Cleared interviews with strong fundamentals and projects.",
	},
	{
		name: "Rohan Gupta",
		role: "Backend Dev",
		avatar: "https://i.pravatar.cc/100?img=23",
		content:
			"Clean explanations, practical labs, and debugging sessions. I finally understood system design trade‑offs and databases.",
	},
	{
		name: "Priya Sharma",
		role: "Student",
		avatar: "https://i.pravatar.cc/100?img=58",
		content:
			"The doubt support is amazing. I never felt stuck — every concept built on the last, and I finished my first full‑stack app!",
	},
];

export default function Testimonials() {
	// Reveal testimonials one by one every 4.5 seconds
	const [visibleCount, setVisibleCount] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisibleCount((c) => (c < testimonials.length ? c + 1 : c));
		}, 4500);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-12">
			<div className="text-center mb-10">
				<h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
					What our Student Says
				</h2>
				<p className="mt-3 text-gray-600 max-w-3xl mx-auto">
					Discover inspiration and insights through recent reviews from our students. Their success
					stories reflect the transformative journey of learning and growth with YR‑IT.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{testimonials.slice(0, visibleCount).map((t, i) => (
					<motion.div
						key={t.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow p-6"
					>
						<div className="flex items-center gap-3 mb-4">
							<img
								src={t.avatar}
								alt={t.name}
								className="w-12 h-12 rounded-full object-cover border border-gray-200"
							/>
							<div>
								<div className="font-semibold text-gray-900">{t.name}</div>
								<div className="text-sm text-gray-500">{t.role}</div>
							</div>
						</div>
						<p className="text-gray-700 leading-relaxed">{t.content}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}



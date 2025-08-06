import { useState, useEffect } from "react";
import courses from "../data/courses";

// Map each course to a slide for its category
const slides = [
  // React Courses
  ...courses.filter(c => c.category === "React").map(course => ({
    title: course.title,
    description: course.description,
    button: `View ${course.title}`,
    link: `/courses#React`,
    image: course.image,
  })),
  // Web Development Courses
  ...courses.filter(c => c.category === "Web Development").map(course => ({
    title: course.title,
    description: course.description,
    button: `View ${course.title}`,
    link: `/courses#Web%20Development`,
    image: course.image,
  })),
  // AI Courses
  ...courses.filter(c => c.category === "AI").map(course => ({
    title: course.title,
    description: course.description,
    button: `View ${course.title}`,
    link: `/courses#AI`,
    image: course.image,
  })),
  // Programming Languages Courses
  ...courses.filter(c => c.category === "Programming Languages").map(course => ({
    title: course.title,
    description: course.description,
    button: `View ${course.title}`,
    link: `/courses#Programming%20Languages`,
    image: course.image,
  })),
];

export default function AdvertisementBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { title, description, button, link, image } = slides[current];

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow mb-8 p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-700">
      <div className="flex-1 flex flex-col items-start">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-lg md:text-xl mb-4">{description}</p>
        <a
          href={link}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-blue-50 transition"
        >
          {button}
        </a>
      </div>
      <div className="flex-shrink-0 w-full md:w-64 mt-6 md:mt-0 md:ml-8 flex justify-center">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg object-cover w-full h-40 md:h-48"
        />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition bg-white/60 ${current === idx ? 'bg-white' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 
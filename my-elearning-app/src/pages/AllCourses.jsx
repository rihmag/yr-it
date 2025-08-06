import { useState } from "react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

const categories = [
  "Business",
  "Web Development",
  "React",
  "AI",
  "Programming Languages",
];

export default function AllCourses() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      {categories.map(category => {
        const filtered = courses.filter(c => c.category === category);
        if (!filtered.length) return null;
        return (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{category} Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
              {filtered.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  isActive={activeCard === course.id}
                  onHover={() => setActiveCard(course.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
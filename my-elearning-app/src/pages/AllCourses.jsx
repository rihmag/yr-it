import { useState, useEffect } from "react";
import { getCourses } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function AllCourses() {
  const [activeCard, setActiveCard] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
        {courses.map(course => (
          <CourseCard 
            key={course._id} 
            course={course.title}
            courseImage={course.thumbnail}
            price={course.price}
            description={course.description}
            instructor={course.instructor}
            category={course.category}
            isActive={activeCard === course._id}
            onHover={() => setActiveCard(course._id)}
          />
        ))}
      </div>
    </div>
  );
}
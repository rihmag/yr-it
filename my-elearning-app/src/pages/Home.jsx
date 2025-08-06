import CourseCard from "../components/CourseCard";
import AdvertisementBanner from "../components/AdvertisementBanner";
import InstructorCard from "../components/InstructorCard";
import courses from "../data/courses";
import { useState } from "react";
// Get unique instructors
const instructors = Object.values(
  courses.reduce((acc, course) => {
    if (!acc[course.instructor.name]) {
      acc[course.instructor.name] = course.instructor;
    }
    return acc;
  }, {})
);

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const featuredCourses = courses.slice(0, 3);
  return (
    <div className="container mx-auto px-4">
      <AdvertisementBanner />
      <h1 className="text-3xl font-bold mb-6">Course Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="courses">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} isActive={activeCard===course.id} onHover={()=>setActiveCard(course.id)}/>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">Meet Our Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {instructors.map((instructor, idx) => (
          <InstructorCard key={instructor.name + idx} instructor={instructor} />
        ))}
      </div>
    </div>
  );
} 
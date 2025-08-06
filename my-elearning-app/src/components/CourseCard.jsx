import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course, isActive, onHover }) {
  const [showOnLeft, setShowOnLeft] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && isActive) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setShowOnLeft(rect.right + 300 > windowWidth);
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={onHover}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Link to={`/course/${course.id}`}>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              By {course.instructor.name}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-bold">${course.price}</span>
              <span className="text-sm text-gray-500">{course.category}</span>
            </div>
          </div>
        </Link>
      </div>

      {isActive && (
        <div
          className={`absolute z-10 ${
            showOnLeft ? "right-full mr-4" : "left-full ml-4"
          } top-0 w-72 bg-white rounded-lg shadow-xl p-4 transition-all duration-200 ease-in-out`}
        >
          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{course.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="mr-2">📚</span>
              <span>{course.chapters?.length} chapters</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="mr-2">⏱️</span>
              <span>
                {course.curriculum?.sections?.reduce(
                  (total, section) => total + section.lessons.length,
                  0
                )}{" "}
                lessons
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className="mr-2">👨‍🏫</span>
              <span>{course.instructor.name}</span>
            </div>
          </div>
          <Link
            to={`/course/${course.id}`}
            className="mt-4 block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </div>
      )}
    </div>
  );
}
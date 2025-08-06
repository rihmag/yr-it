import { useParams } from "react-router-dom";
import courses from "../data/courses";

export default function Course() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id.toString() === courseId);

  if (!course) return <div>Course not found</div>;

  const scrollToInstructor = () => {
    document
      .getElementById("instructor-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-6">{course.description}</p>

          {/* Course Includes Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">This Course Includes:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">📹</span>
                <div>
                  <h3 className="font-semibold">Video Content</h3>
                  <p className="text-sm text-gray-600">
                    {course.curriculum?.sections?.reduce(
                      (total, section) => total + section.lessons.length,
                      0
                    )}{" "}
                    video lessons
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">📝</span>
                <div>
                  <h3 className="font-semibold">Course Chapters</h3>
                  <p className="text-sm text-gray-600">
                    {course.chapters?.length} comprehensive chapters
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">🎓</span>
                <div>
                  <h3 className="font-semibold">Certificate</h3>
                  <p className="text-sm text-gray-600">
                    Completion certificate included
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">💬</span>
                <div>
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-gray-600">
                    Direct access to instructor
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToInstructor}
            className="text-blue-600 hover:text-blue-800 underline mb-4 font-medium flex items-center gap-2"
          >
            Created by {course.instructor.name}
          </button>
        </div>

        {/* Course Image and Subscribe Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold">${course.price}</span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() =>
                  alert("Subscribe functionality to be implemented")
                }
              >
                Subscribe to Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
        {course.curriculum?.sections?.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold bg-gray-100 p-4 rounded-md mb-4">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-md border"
                >
                  <span className="mr-3">📚</span>
                  <div className="flex-grow">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                  <button
                    className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
                    onClick={() => alert(`Starting lesson: ${lesson.title}`)}
                  >
                    START
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instructor Section */}
      <div
        id="instructor-section"
        className="bg-white rounded-lg shadow-lg p-6 mt-12"
      >
        <div className="flex items-center mb-6">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-16 h-16 rounded-full mr-6"
          />
          <div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: '"Vazirmatn", "SF Pro Text", sans-serif',
              }}
            >
              {course.instructor.name}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
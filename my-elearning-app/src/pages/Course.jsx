import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourses } from "../data/courses";
import InstructorComponent from "../components/InstructorComponent";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lesson_data,setlesson_data]=useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      const courses = await getCourses();
      const foundCourse = courses.find((c) => c.title === courseId);
      setlesson_data(foundCourse.lessons)
      setCourse(foundCourse);
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
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
                    {course.lessons?.length || 0} video lessons
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">📝</span>
                <div>
                  <h3 className="font-semibold">Course Chapters</h3>
                  <p className="text-sm text-gray-600">
                    {course.lessons?.length || 0} comprehensive chapters
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
            Created by {course.instructor}
          </button>
        </div>
        

        {/* Course Image and Subscribe Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${course.thumbnail}`}
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
            <div>
              <div className="bg-blue-200 text-green-700 text-lg font-bold">
                <h1>Lessons</h1>
              </div>
              <br />
             <ul>

        {lesson_data.map(lesson => (
          <li key={lesson._id}>
            <h3 className=" rounded-md border-4 bg-yellow-100">{lesson.title}</h3>
            <br />
            <p className=" rounded-md border-4 bg-orange-100 ">{lesson.content}</p>
            <br />
            <p className="h-10 w-24 text-sm bg-pink-100">Duration: {lesson.duration} minutes</p>
        <br />
         {lesson.contentType === 'video' && (() => {
                  const url = lesson.video;
                  const match = url.match(/[?&]v=([^&#]+)/);
                  const videoId = match ? match[1] : null;

                  if (!videoId) return null;

                  return (
                    <iframe 
                      width="560" 
                      height="315" 
                      src={`https://www.youtube.com/embed/${videoId} `}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                           />
                      );
                          })()}
      </li>
        ))}
      </ul>
    </div>
      {/* Instructor Section */}
      <div
        id="instructor-section"
        className="mt-12"
      >
        <InstructorComponent 
          instructor={{
            name: course.instructor,
            role: 'Course Instructor',
            avatar: '/images/default-avatar.jpg',
            tags: ['Teaching', course.category || 'Education']
          }} 
        />
      </div>
    </div>
  );
}
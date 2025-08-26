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
      const foundCourse = courses.find((c) => c._id === courseId);
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
                <span className="text-3xl font-bold">₹{course.price}</span>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe-dr0_7my4ic_lMQplEDivsmOMTcAoQgTRJkA5TMtMzBLBYg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe to Course
              </a>
            </div>
          </div>
        </div>
      </div>
            <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Lessons</h2>
        <div className="space-y-6">
          {lesson_data.map((lesson, index) => (
            <div key={lesson._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{`${index + 1}. ${lesson.title}`}</h3>
                  <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {lesson.duration} mins
                  </p>
                </div>
                <p className="text-gray-700 mb-4">{lesson.content}</p>
                
                {lesson.contentType === 'video' && (() => {
                  const url = lesson.video;
                  const match = url.match(/[?&]v=([^&#]+)/);
                  const videoId = match ? match[1] : null;

                  if (!videoId) return null;

                  return (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      />
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
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
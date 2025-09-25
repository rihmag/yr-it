import { useEffect, useState } from "react";
import { getCourses } from "../data/courses.js";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Fetch quotes from the text file
    async function fetchQuotes() {
      try {
        const response = await fetch('/quotesforwebsite.txt');
        const text = await response.text();
        const quotes = text.split('\n').filter(quote => quote.trim() !== '');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuote("Every day is a chance to learn something new!");
      }
    }
    fetchQuotes();
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const response = await fetch(`https://backend-1-bn9o.onrender.com/api/user/getuserdata/${user}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user courses");
          }
          const userData = await response.json();
          const allCourses = await getCourses();
          const enrolledCourseIds = userData.enrolledCourses;
          const userCourses = allCourses.filter(course => enrolledCourseIds.includes(course._id));
          setOngoingCourses(userCourses);
          setUserName(userData.username);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Optionally, set some error state to show in the UI
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Welcoming and Motivational Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900/80 dark:to-blue-700/80 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-lg dark:shadow-gray-800/30">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 font-medium mb-2">We're excited to see you continue your learning journey.</p>
          <div className="italic text-blue-900 dark:text-blue-100 text-base flex items-center gap-2 font-bold font-serif">
            <svg className="w-6 h-6 text-blue-500 dark:text-blue-400 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2M12 15v-6m0 0l-3 3m3-3l3 3" /></svg>
            {quote}
          </div>
        </div>
        <img src="/images/ai.jpg" alt="Motivation" className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-200 dark:border-blue-600" />
      </div>
      {/* End Welcoming and Motivational Section */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      ) : (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">My Courses</h2>
            {ongoingCourses.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">No enrolled courses.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {ongoingCourses.map((course) => (
                  <div key={course._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800/30 p-4 flex gap-4 items-center border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-800/50 transition-all">
                    <img src={`data:image/jpeg;base64,${course.thumbnail}`} alt={course.title} className="w-24 h-24 object-cover rounded border border-gray-200 dark:border-gray-600" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{course.title}</h3>
                      <div className="mt-3">
                        <a
                          href={`/course/${course._id}`}
                          className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
                        >
                          Go to Course
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
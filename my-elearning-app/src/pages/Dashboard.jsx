import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
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
    // TODO: Replace with real API call
    async function fetchDashboardData() {
      setLoading(true);
      // Simulate API call
      const dashboardData = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              userName: "Priya Sharma",
              ongoing: [
                {
                  id: 1,
                  title: "React for Beginners",
                  progress: 60,
                  image: "/images/reactimage.jpg",
                },
                {
                  id: 2,
                  title: "Python Basics",
                  progress: 30,
                  image: "/images/pythonimage.png",
                },
              ],
              completed: [
                {
                  id: 3,
                  title: "AI for Materials Discovery",
                  image: "/images/Artificial-Intelligence-for-Materials-Discovery-and-Design.png",
                },
              ],
            }),
          1000
        )
      );
      setUserName(dashboardData.userName);
      setOngoingCourses(dashboardData.ongoing);
      setCompletedCourses(dashboardData.completed);
      setLoading(false);
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcoming and Motivational Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-lg text-blue-700 font-medium mb-2">We're excited to see you continue your learning journey.</p>
          <div className="italic text-blue-900 text-base flex items-center gap-2 font-bold font-serif">
            <svg className="w-6 h-6 text-blue-500 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2M12 15v-6m0 0l-3 3m3-3l3 3" /></svg>
            {quote}
          </div>
        </div>
        <img src="/images/ai.jpg" alt="Motivation" className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-200" />
      </div>
      {/* End Welcoming and Motivational Section */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Ongoing Courses</h2>
            {ongoingCourses.length === 0 ? (
              <div className="text-gray-500">No ongoing courses.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {ongoingCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
                    <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">Progress: {course.progress}%</span>
                      <div className="mt-3">
                        <a
                          href={`/course/${course.id}`}
                          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm shadow"
                        >
                          Resume Course
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>
            {completedCourses.length === 0 ? (
              <div className="text-gray-500">No completed courses yet.</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded mb-2" />
                    <h3 className="text-lg font-bold text-center">{course.title}</h3>
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
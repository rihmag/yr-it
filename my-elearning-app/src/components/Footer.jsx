export default function Footer() {
  return (
    <footer className="mt-12 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-gray-600 text-sm mb-2 md:mb-0">&copy; {new Date().getFullYear()} YR-Learning. All rights reserved.</div>
        <div className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-blue-600 text-sm">Home</a>
          <a href="/#courses" className="text-gray-700 hover:text-blue-600 text-sm">Courses</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600 text-sm">About</a>
        </div>
      </div>
    </footer>
  );
} 
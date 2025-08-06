export default function InstructorCard({ instructor }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
      <img
        src={instructor.avatar}
        alt={instructor.name}
        className="w-20 h-20 rounded-full object-cover border mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{instructor.name}</h3>
      <p className="text-gray-600 text-sm">{instructor.bio}</p>
    </div>
  );
} 
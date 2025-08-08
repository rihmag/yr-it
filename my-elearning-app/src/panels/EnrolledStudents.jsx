import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EnrolledStudents.css';

// Mock data - replace with API calls in a real application
const mockCourses = [
    { id: 'c1', title: 'Introduction to React' },
    { id: 'c2', title: 'Advanced Node.js' },
    { id: 'c3', title: 'UI/UX Design Fundamentals' },
];

const mockStudents = [
    { id: 's1', name: 'Alice Johnson', courseId: 'c1', enrolledDate: '2023-10-01' },
    { id: 's2', name: 'Bob Williams', courseId: 'c1', enrolledDate: '2023-10-05' },
    { id: 's3', name: 'Charlie Brown', courseId: 'c2', enrolledDate: '2023-09-15' },
    { id: 's4', name: 'Diana Miller', courseId: 'c3', enrolledDate: '2023-10-20' },
    { id: 's5', name: 'Ethan Davis', courseId: 'c1', enrolledDate: '2023-10-22' },
    { id: 's6', name: 'Fiona Garcia', courseId: 'c3', enrolledDate: '2023-09-30' },
];

const EnrolledStudents = () => {
    const { id: educatorId } = useParams();
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch courses and students for the educator
        setTimeout(() => {
            setCourses(mockCourses);
            setStudents(mockStudents);
            setLoading(false);
        }, 1000);
    }, [educatorId]);

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const filteredStudents = students.filter(student =>
        selectedCourse === 'all' || student.courseId === selectedCourse
    );

    const getCourseTitle = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.title : 'Unknown Course';
    };

    if (loading) {
        return <div>Loading student data...</div>;
    }

    return (
        <div className="enrolled-students-container">
            <h2>Enrolled Students</h2>

            <div className="filter-container">
                <label htmlFor="course-filter">Filter by Course:</label>
                <select id="course-filter" value={selectedCourse} onChange={handleCourseChange} className="course-filter-select">
                    <option value="all">All Courses</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>

            {filteredStudents.length === 0 ? (
                <p>No students are enrolled in the selected course(s).</p>
            ) : (
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Course</th>
                            <th>Enrolled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{getCourseTitle(student.courseId)}</td>
                                <td>{new Date(student.enrolledDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EnrolledStudents;
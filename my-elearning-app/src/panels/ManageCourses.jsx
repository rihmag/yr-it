import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ManageCourses.css';

// Mock data - replace with an API call in a real application
const mockCourses = [
    {
        id: 'c1',
        title: 'Introduction to React',
        category: 'Web Development',
        price: 49.99,
        thumbnail: 'https://via.placeholder.com/150/007BFF/FFFFFF?text=React',
        enrolled: 120,
    },
    {
        id: 'c2',
        title: 'Advanced Node.js',
        category: 'Backend Development',
        price: 79.99,
        thumbnail: 'https://via.placeholder.com/150/28A745/FFFFFF?text=Node.js',
        enrolled: 85,
    },
    {
        id: 'c3',
        title: 'UI/UX Design Fundamentals',
        category: 'Design',
        price: 39.99,
        thumbnail: 'https://via.placeholder.com/150/FFC107/000000?text=UI/UX',
        enrolled: 210,
    },
];

const ManageCourses = () => {
    const { id: educatorId } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from an API based on educatorId
        setTimeout(() => {
            setCourses(mockCourses);
            setLoading(false);
        }, 1000);
    }, [educatorId]);

    const handleDelete = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            // In a real app, you'd make an API call to delete the course
            setCourses(courses.filter(course => course.id !== courseId));
            toast.success('Course deleted successfully!');
        }
    };

    if (loading) {
        return <div>Loading your courses...</div>;
    }

    return (
        <div className="manage-courses-container">
            <h2>Manage Your Courses</h2>
            {courses.length === 0 ? (
                <p>You haven't created any courses yet. <Link to={`/panel/${educatorId}/add-course`}>Add a new course</Link> to get started.</p>
            ) : (
                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td><img src={course.thumbnail} alt={course.title} className="course-thumbnail-small" /></td>
                                <td>{course.title}</td>
                                <td>${course.price.toFixed(2)}</td>
                                <td>{course.enrolled}</td>
                                <td className="course-actions">
                                    <Link to={`/panel/${educatorId}/edit-course/${course.id}`} className="action-btn edit-btn">Edit</Link>
                                    <button onClick={() => handleDelete(course.id)} className="action-btn delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageCourses;
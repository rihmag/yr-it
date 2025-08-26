import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ManageCourses.css';

const ManageCourses = () => {
    const { id: educatorId } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }

        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('You must be logged in to manage courses.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('https://backend-9zkx.onrender.com/api/course/allcourses', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    toast.error('Failed to fetch courses.');
                }
            } catch (error) {
                toast.error('An error occurred while fetching courses.');
                console.error('Fetch courses error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin) {
            fetchCourses();
        }
    }, [isAdmin]);

    const handleDelete = (courseId) => {
        // TODO: Implement delete functionality with an API call.
        // A new route needs to be created in the backend for this.
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            // In a real app, you'd make an API call to delete the course
            setCourses(courses.filter(course => course._id !== courseId));
            toast.success('Course deleted successfully (UI only)!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <div>You are not authorized to view this page.</div>;
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id}>
                                <td><img src={`data:image/jpeg;base64,${course.thumbnail}`} alt={course.title} className="course-thumbnail-small" /></td>
                                <td>{course.title}</td>
                                <td className="course-actions">
                                    <Link to={`/panel/${educatorId}/edit-course/${course._id}`} className="action-btn edit-btn">Edit</Link>
                                    <button onClick={() => handleDelete(course._id)} className="action-btn delete-btn">Delete</button>
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
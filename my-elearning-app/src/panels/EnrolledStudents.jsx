import React, { useState, useEffect } from 'react';
import './EnrolledStudents.css';

const EnrolledStudents = () => {
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await fetch('https://backend-1-bn9o.onrender.com/api/course/getstudents', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled students');
                }
                const data = await response.json();
                setEnrolledUsers(data.enrolled_users || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, []);

    if (loading) {
        return <div>Loading student data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="enrolled-students-container">
            <h2>Enrolled Students</h2>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Enrolled Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.enrolledCourses && user.enrolledCourses.length > 0
                                    ? user.enrolledCourses.map(course => course.title).join(', ')
                                    : 'No courses enrolled'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledStudents;

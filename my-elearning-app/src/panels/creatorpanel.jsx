import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import './CreatorPanel.css';

const CreatorPanel = () => {
    const { id } = useParams(); // Educator's ID
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    if (!isAdmin) {
        return <div>You are not authorized to view this page.</div>;
    }

    return (
        <div className="creator-panel">
            <aside className="panel-sidebar">
                <h2>Educator Panel</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={`/panel/${id}/add-course`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Add Course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/${id}/manage-courses`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Manage Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/${id}/enrolled-students`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Enrolled Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/${id}/earnings`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Earnings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/${id}/edit-banner`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                edit banner
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="panel-content">
                <Outlet />
            </main>
        </div>
    );
};

export default CreatorPanel;
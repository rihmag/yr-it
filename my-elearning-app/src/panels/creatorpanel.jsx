import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import './CreatorPanel.css';

const CreatorPanel = () => {
    const { id } = useParams(); // Educator's ID

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
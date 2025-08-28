import React, { useState, useEffect } from 'react';
import './EditInstructorBanner.css';

const InstructorManager = () => {
    const [instructors, setInstructors] = useState([]);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = 'https://backend-1-bn9o.onrender.com';

    const fetchAllInstructors = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${baseUrl}/api/banner/getinstructor`);
            if (!response.ok) throw new Error('Failed to fetch instructors.');
            const data = await response.json();
            setInstructors(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllInstructors();
    }, []);

    const resetForm = () => {
        setEditingInstructor(null);
        setName('');
        setAbout('');
        setImage(null);
        setPreview('');
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = null;
    };

    const handleSelectEdit = (instructor) => {
        setEditingInstructor(instructor);
        setName(instructor.name);
        setAbout(instructor.about);
        setPreview(`data:image/jpeg;base64,${instructor.image}`);
        setError('');
        window.scrollTo(0, 0);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !about || (!image && !editingInstructor)) {
            setError('Name, about, and a new image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('about', about);
        if (image) formData.append('image', image);

        const isEditMode = Boolean(editingInstructor);
        const url = isEditMode ? `${baseUrl}/api/banner/updateinstructor/${editingInstructor._id}` : `${baseUrl}/api/banner/addinstructor`;
        const method = isEditMode ? 'PUT' : 'POST';

        setLoading(true);
        setError('');

        try {
            const response = await fetch(url, { method, body: formData });
            if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} instructor.`);
            resetForm();
            await fetchAllInstructors();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (instructorId) => {
        if (!window.confirm('Are you sure you want to delete this instructor?')) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${baseUrl}/api/banner/deleteinstructor/${instructorId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete instructor.');
            await fetchAllInstructors();
            if (editingInstructor && editingInstructor._id === instructorId) {
                resetForm();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-instructor-panel">
            <h2>Manage Instructors</h2>
            {error && <p className="error">{error}</p>}

            <div style={{ marginBottom: '2rem' }}>
                <h3>{editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}</h3>
                <form onSubmit={handleSubmit} className="edit-instructor-form">
                    <div className="form-group">
                        <label htmlFor="name">Instructor Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">About Instructor</label>
                        <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Instructor Image</label>
                        {preview && <img src={preview} alt="Preview" className="image-preview" />}
                        <input id="image" type="file"  onChange={handleFileChange} accept="image/*" />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={loading}>{loading ? 'Saving...' : (editingInstructor ? 'Update Instructor' : 'Add Instructor')}</button>
                        {editingInstructor && <button type="button" onClick={resetForm} disabled={loading}>Cancel Edit</button>}
                    </div>
                </form>
            </div>

            <h3>Existing Instructors</h3>
            {loading && instructors.length === 0 && <p>Loading Instructors...</p>}
            <div className="instructors-list">
                {instructors.map((instructor) => (
                    <div key={instructor._id} className="instructor-card">
                        <img src={`data:image/jpeg;base64,${instructor.image}`} alt={instructor.name} />
                        <div className="instructor-info">
                            <h4>{instructor.name}</h4>
                            <p>{instructor.about}</p>
                            <div className="instructor-actions">
                                <button onClick={() => handleSelectEdit(instructor)} disabled={loading}>Edit</button>
                                <button onClick={() => handleDelete(instructor._id)} disabled={loading} className="delete-button">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorManager;

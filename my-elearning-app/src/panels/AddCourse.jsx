import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './AddCourse.css';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        roadmap: '',
        price: '',
        category: '',
        instructor: '',
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)');
                return;
            }
            setCourseData({
                ...courseData,
                thumbnail: file,
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();
            return data.secure_url; // This is the image URL
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseData.title || !courseData.description || !courseData.roadmap || !courseData.price || !courseData.category || !courseData.instructor || !courseData.thumbnail) {
            toast.error('Please fill in all fields and select an image.');
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';
            if (courseData.thumbnail) {
                imageUrl = await uploadImageToCloudinary(courseData.thumbnail);
            }

            const coursePayload = {
                title: courseData.title,
                description: courseData.description,
                roadmap: courseData.roadmap,
                price: courseData.price,
                category: courseData.category,
                instructor: courseData.instructor,
                thumbnail: imageUrl,
            };

            const response = await fetch('http://localhost:3000/api/course/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(coursePayload),
            });

            if (!response.ok) {
                throw new Error('Course creation failed');
            }

            await response.json();
            toast.success('Course created successfully!');

            setCourseData({
                title: '',
                description: '',
                roadmap: '',
                price: '',
                category: '',
                instructor: '',
                thumbnail: null,
            });
            setThumbnailPreview('');
        } catch (error) {
            toast.error(error.message || 'Something went wrong.');
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Create a New Course</h2>
            <form onSubmit={handleSubmit} className="add-course-form">
                <div className="form-group">
                    <label htmlFor="title">Course Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Course Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="roadmap">Roadmap</label>
                    <textarea
                        id="roadmap"
                        name="roadmap"
                        value={courseData.roadmap}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={courseData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instructor">Instructor Name</label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={courseData.instructor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Course Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>

                {thumbnailPreview && (
                    <div className="thumbnail-preview">
                        <p>Thumbnail Preview:</p>
                        <img src={thumbnailPreview} alt="Thumbnail preview" />
                    </div>
                )}

                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};

export default AddCourse;
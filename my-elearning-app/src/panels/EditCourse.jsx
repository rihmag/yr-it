import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './EditCourse.css';

// Mock data for a course - in a real app, you'd fetch this from your API
const mockCourseData = {
    id: 'c1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React, including components, state, props, and hooks.',
    price: 49.99,
    category: 'Web Development',
    thumbnail: 'https://via.placeholder.com/150/007BFF/FFFFFF?text=React',
    sections: [
        {
            id: 'sec1',
            title: 'Getting Started',
            lectures: [
                { id: 'lec1', title: 'What is React?', videoUrl: 'existing/video1.mp4' },
                { id: 'lec2', title: 'Setting up your environment', videoUrl: 'existing/video2.mp4' },
            ]
        },
        {
            id: 'sec2',
            title: 'Core Concepts',
            lectures: [
                { id: 'lec3', title: 'Components and Props', videoUrl: 'existing/video3.mp4' },
            ]
        }
    ]
};

const EditCourse = () => {
    const { courseId, id: educatorId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching course data based on courseId
        setTimeout(() => {
            const courseWithFileState = {
                ...mockCourseData,
                sections: mockCourseData.sections.map(section => ({
                    ...section,
                    lectures: section.lectures.map(lecture => ({
                        ...lecture,
                        videoFile: null, // For new video uploads
                        videoPreview: lecture.videoUrl // To show existing video info
                    }))
                }))
            };
            setCourse(courseWithFileState);
            setLoading(false);
        }, 1000);
    }, [courseId]);

    const handleCourseInfoChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSection = () => {
        setCourse(prev => ({
            ...prev,
            sections: [
                ...prev.sections,
                { id: `new_sec_${Date.now()}`, title: '', lectures: [] }
            ]
        }));
    };

    const handleSectionTitleChange = (sectionIndex, value) => {
        const updatedSections = [...course.sections];
        updatedSections[sectionIndex].title = value;
        setCourse(prev => ({ ...prev, sections: updatedSections }));
    };

    const handleAddLecture = (sectionIndex) => {
        const updatedSections = [...course.sections];
        updatedSections[sectionIndex].lectures.push({
            id: `new_lec_${Date.now()}`,
            title: '',
            videoFile: null,
            videoPreview: ''
        });
        setCourse(prev => ({ ...prev, sections: updatedSections }));
    };

    const handleLectureTitleChange = (sectionIndex, lectureIndex, value) => {
        const updatedSections = [...course.sections];
        updatedSections[sectionIndex].lectures[lectureIndex].title = value;
        setCourse(prev => ({ ...prev, sections: updatedSections }));
    };

    const handleLectureVideoChange = (sectionIndex, lectureIndex, file) => {
        if (!file) return;
        const updatedSections = [...course.sections];
        const lecture = updatedSections[sectionIndex].lectures[lectureIndex];
        lecture.videoFile = file;
        lecture.videoPreview = URL.createObjectURL(file); // For previewing video tags if you add them
        setCourse(prev => ({ ...prev, sections: updatedSections }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would use FormData to send all the data,
        // including new video files, to your backend API.
        console.log('Updated Course Data:', course);
        toast.success('Course updated successfully! (Demo)');
        navigate(`/panel/${educatorId}/manage-courses`);
    };

    if (loading) return <div>Loading course editor...</div>;
    if (!course) return <div>Course not found.</div>;

    return (
        <div className="edit-course-container">
            <h2>Edit Course: {mockCourseData.title}</h2>
            <form onSubmit={handleSubmit} className="edit-course-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label htmlFor="title">Course Title</label>
                        <input type="text" id="title" name="title" value={course.title} onChange={handleCourseInfoChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Course Description</label>
                        <textarea id="description" name="description" value={course.description} onChange={handleCourseInfoChange} rows="4" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input type="number" id="price" name="price" value={course.price} onChange={handleCourseInfoChange} min="0" step="0.01" required />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Course Content</h3>
                    <div className="sections-container">
                        {course.sections.map((section, sectionIndex) => (
                            <div key={section.id} className="section-item">
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                                    placeholder="Section Title"
                                    className="section-title-input"
                                    required
                                />
                                <div className="lectures-container">
                                    {section.lectures.map((lecture, lectureIndex) => (
                                        <div key={lecture.id} className="lecture-item">
                                            <input
                                                type="text"
                                                value={lecture.title}
                                                onChange={(e) => handleLectureTitleChange(sectionIndex, lectureIndex, e.target.value)}
                                                placeholder="Lecture Title"
                                                className="lecture-title-input"
                                                required
                                            />
                                            <div className="video-upload">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => handleLectureVideoChange(sectionIndex, lectureIndex, e.target.files[0])}
                                                    id={`video-upload-${section.id}-${lecture.id}`}
                                                    className="video-input"
                                                />
                                                <label htmlFor={`video-upload-${section.id}-${lecture.id}`} className="video-input-label">
                                                    {lecture.videoFile ? 'Change Video' : 'Upload Video'}
                                                </label>
                                                {lecture.videoPreview && (
                                                    <p className="video-preview-text">
                                                        {lecture.videoFile ? `New: ${lecture.videoFile.name}` : `Current: ${lecture.videoUrl}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => handleAddLecture(sectionIndex)} className="add-lecture-btn">
                                        + Add Lecture
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddSection} className="add-section-btn">
                        + Add Section
                    </button>
                </div>

                <button type="submit" className="save-changes-btn">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCourse;
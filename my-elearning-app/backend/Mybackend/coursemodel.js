const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define a schema for lessons which will be sub-documents in the Course model
const lessonSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        enum: ['video', 'text', 'quiz', 'code'],
        required: true
    },
    content: {
        type: String
    },
    video: {
        url: String,
        key: String
    },
    duration: {
        type: Number,
        default: 0
    }
});
const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lessons: [lessonSchema],
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });




// Define the main Course schema
 // Add createdAt and updatedAt timestamps

const Course = model('Course', courseSchema);

module.exports = Course;


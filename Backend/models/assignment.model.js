const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        required: true,
    },
    submissionEndingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Submitted', 'Draft', 'Graded'],
        default: 'Draft',
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
    },
});

module.exports = mongoose.model('Assignment', assignmentSchema);

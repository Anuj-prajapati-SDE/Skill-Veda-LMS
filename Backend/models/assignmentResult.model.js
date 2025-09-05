const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    resultAssignment: {
        type: Number,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    assignmentTitle: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
    },
    submissionEndDate: {
        type: Date,
    },
    score: {
        type: Number,
        min: 0,
    },
    grade: {
        type: String,
    },
    remarks: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Graded'],
        default: 'Pending',
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
});

module.exports = mongoose.model('Result', resultSchema);

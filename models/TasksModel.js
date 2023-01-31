const mongoose = require('mongoose')

const TaskModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {timestamps: true})

const Tasks = mongoose.model('Tasks', TaskModel)
module.exports = Tasks

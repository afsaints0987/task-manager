const mongoose = require('mongoose')

const TaskModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
}, {timestamps: true})

const Tasks = mongoose.model('Tasks', TaskModel)
module.exports = Tasks

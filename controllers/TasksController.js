const Tasks = require('../models/TasksModel')
// Get all tasks
const getTasks = async (req, res) => {
    const tasks = await Tasks.find()
    res.status(200).json(tasks)
}

// Create New tasks
const createTask = async (req, res) => {
    const {title} = req.body

    if(!title){
        res.status(400).json({message: 'Please input Task'})
    }

    // Task already exist
    const taskExist = await Tasks.findOne({title})
    if(taskExist){
        res.status(400).json({message: 'Task already exist'})
    }
    const task = await Tasks.create({
        title
    })
    if(task){
        res.status(201).json({
            _id: task.id,
            title: task.title,
            message: 'Task Created'
        })
    } else {
        res.status(400).json({message: 'Creating Task failed'})
    }
}

// Get task
const getTask = async (req, res) => {
    const taskId = await Tasks.findById(req.params.id)
    if(!taskId){
        res.status(400).json({message: "Task not found"})
    }
    res.status(200).json(taskId)
}

// Update Task
const updateTask = async (req, res) => {
    const updateTaskId = await Tasks.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    res.status(200).json(updateTaskId)
}

// Delete Task
const deleteTask = async (req, res) => {
    const taskId = await Tasks.findById(req.params.id)

    await taskId.remove()
    res.status(200).json({message: `Delete Task id: ${req.params.id}`})
}

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
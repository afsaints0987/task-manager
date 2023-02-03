const Tasks = require('../models/TasksModel')
const Users = require('../models/UserModel')
// Get all tasks
const getTasks = async (req, res) => {
    const tasks = await Tasks.find({ user: req.user.id })
    res.status(200).json(tasks)
}

// Create New tasks
const createTask = async (req, res) => {
    const user = await Users.findById(req.user.id)
    const {title, priority, isCompleted} = req.body

    if(!title && !priority){
        res.status(400).json({message: 'Please fill up the form'})
    }

    // Task already exist from the user
    const taskExist = await Tasks.findOne({title, user: req.user.id})
    if(taskExist){
        res.status(400).json({message: 'Task already exist'})
        return  
    }
    

    const task = await Tasks.create({
        title,
        priority,
        isCompleted,
        user: req.user.id
    })
    if(task){
        res.status(201).json({
            _id: task.id,
            title: task.title,
            priority: task.priority,
            isCompleted: task.isCompleted,
            user: task.user,
            message: 'Task Created'
        })
    } else {
        res.status(400).json({message: 'Creating Task failed'})
        return
    }
}

// Get task
const getTask = async (req, res) => {
    const user = await Users.findById(req.user.id)

    const taskId = await Tasks.findById(req.params.id)

    if(!taskId){
        res.status(400).json({message: "Task not found"})
        return
    }
    // If user task is not match to loggedin user
    if(taskId.user.toString() !== user.id){
        res.status(400).json({message: "User not authorized"})
        return
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
    const user = await Users.findById(req.user.id)

    const taskId = await Tasks.findById(req.params.id)

    // If user task is not match to loggedin user
    if(taskId.user.toString() !== user.id){
        res.status(400).json({message: "User not authorized"})
        return
    }

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
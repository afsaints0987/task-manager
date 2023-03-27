const express = require('express')
const router = express.Router()
const {getTasks, createTask, getTask, updateTask, deleteTask} = require('../controllers/TasksController')

const {protect} = require('../middlewares/AuthMiddleware')

router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask)

module.exports = router


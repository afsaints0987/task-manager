const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3001
const TasksRoute = require('./routes/TasksRoutes')
const UsersRoute = require('./routes/UsersRoutes')


const app = express();

// Middlewares
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/api/tasks', TasksRoute)
app.use('/api/users', UsersRoute)
// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('DB Connected to Host:',process.env.MONGODB_URI))
.catch((err) => {console.log('DB Connection Failed', err.message)})

// Connect to Server
app.listen(port, ()=> {
    console.log(`Server listening to PORT ${port}`)
})

module.exports = app;
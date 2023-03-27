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
app.use('/api/tasks', TasksRoute)
app.use('/api/users', UsersRoute)

app.get('/', (req, res) => {
    res.send('Server is running')
})
// Connect to DB
mongoose.connect(process.env.MONGO_URI_, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('DB Connected to Host:',process.env.MONGO_URI_))
.catch((err) => {console.log('DB Connection Failed', err.message)})

// Connect to Server
app.listen(port, ()=> {
    console.log(`Server listening to PORT ${port}`)
})

module.exports = app;
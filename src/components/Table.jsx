import {useState, useEffect, useCallback} from 'react'
import ConfirmDelete from '../components/ConfirmDelete'
import Loading from '../components/Loading'
import * as FaIcons from 'react-icons/fa'
import {Link} from 'react-router-dom'
import http from '../data/api'

const Table = ({userInfo}) => {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [show, setShow] = useState(false)
    const [success, setSuccess] = useState(false)
    
    // Get All Tasks
    const getTasks = useCallback(async () => {
            setLoading(true)
            const tasksData = await http.get('/api/tasks', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            const allTasks = await tasksData.data
            setTasks(allTasks)
            setLoading(false)
    },[userInfo])

    useEffect(()=> {
        getTasks();
    },[getTasks])
    
    // Toggle to show the status of the task
    const handleToggle = async (e) => {

        const taskId = e.target.id
        if(e.target.value === "completed"){
            const updateValue = { isCompleted: true }
            const response = await http.put(`api/tasks/${taskId}`, updateValue, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            if(response.status === 200) {
                setIsCompleted(true)
                getTasks()
                return isCompleted
            }
        }
        else if(e.target.value === "in-progress") {
            const updateValue = { isCompleted: false }
            const response = await http.put(`api/tasks/${taskId}`, updateValue, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            if(response.status === 200) {
                setIsCompleted(false)
                getTasks()
                return isCompleted
            }
        }
    }

    // Open Modal GET Task
    const handleShow = async (id) => {
        const taskData = await http.get(`api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        setTitle(taskData.data.title)
        setId(taskData.data._id)
        setShow(true)
    }
    // Close Modal
    const handleClose = () => setShow(false)
    
    // Delete Task
    const deleteTask = async (id) => {
        await http.delete(`api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        setShow(false)
        getTasks();
        setSuccess(true)
        setInterval(()=> {
            setSuccess(false)
        }, 5000)
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div className="tasks_ container-fluid mt-4">
            {success && <span className="text-success">Task Deleted Successfully!</span>}
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.priority}</td>
                            <td>
                            <select className="form-select form-select-sm border-0" id={task._id} onChange={handleToggle} >
                                <option>{task.isCompleted === false ? "In Progress" : "Completed"}</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            </td>
                            <td>{task.isCompleted ? <FaIcons.FaCheckCircle className="text-success"/> : <FaIcons.FaRegClock className="text-warning"/>}</td>
                            <td>
                                <Link to={`/edit/${task._id}`} className="btn btn-primary btn-sm mx-2"><FaIcons.FaEdit /></Link>
                                <button className="btn btn-danger btn-sm" 
                                onClick={() => handleShow(task._id)}>
                                <FaIcons.FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmDelete handleClose={handleClose} show={show} handleDelete={() => deleteTask(id)} title={title}/>
        </div>
    )
}

export default Table

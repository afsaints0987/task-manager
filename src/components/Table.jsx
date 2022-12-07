import {useState, useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
import {Link} from 'react-router-dom'
import http from '../data/api'

const Table = () => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const tasksData = await http.get('/api/tasks');
        console.log(tasksData.data)
        setTasks(tasksData.data)
    }
    
    useEffect(()=> {
       getTasks();
    },[])
    
    const deleteTask = async (id) => {
        await http.delete(`api/tasks/${id}`)
        getTasks();
    }

    return (
        <div className="tasks_ container-lg mt-4">
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.priority}</td>
                            <td>
                            <select className="form-select form-select-sm border-0 w-50">
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                            </td>
                            <td>
                                <Link to={`/edit/${task._id}`} className="btn btn-primary btn-sm mx-2"><FaIcons.FaEdit /></Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}><FaIcons.FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table

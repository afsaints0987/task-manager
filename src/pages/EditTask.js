import {useState, useEffect, useContext} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import http from '../data/api'
import {UserContext} from '../context/UserContext'

const options = ["High Priority", "Low Priority"]

const EditTask = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        const getTask = async () => {
            const data = await http.get(`/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            });
            const taskData = data.data
            console.log(taskData)
            setTitle(taskData.title)
            setPriority(taskData.priority)
        }
        getTask();
    },[id, state])


    const handleUpdate = e => {
        e.preventDefault();

        if(title === ''){
            setError(true)
        } else {
            http.put(`api/tasks/${id}`, {
                title,
                priority
            }, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            });
            navigate('/dashboard')
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center my-auto">
            <form className="mt-5" onSubmit={handleUpdate}>
            {error && <span className="text-danger">Please fill up the form</span>}
            <h5>Edit Task</h5>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Task</label>
                    <input className="form-control" type="text" name="title" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="priority">Status</label>
                    <select className="form-select" name="priority" placeholder="Task Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        {options.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                <button className="btn btn-success mt-4" type="submit">Update</button>
                <Link to='/dashboard' className="btn btn-warning mt-4 mx-2">Back</Link>
                </div>
            </form>
        </div>
    )
}

export default EditTask

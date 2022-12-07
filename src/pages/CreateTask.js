import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import http from '../data/api'

const options = ["High Priority", "Low Priority"]

const CreateTask = () => {
    let navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        priority: options[0]
    })

    const handleChange = e => {
        const {name, value} = e.target
        setTask({
            ...task,
            [name] : value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(task.title === ''){
            alert('Please fill up the form')
        } else {
            http.post('/api/tasks', task)
            navigate('/')
        } 
    }

    return (
        <div className="container d-flex justify-content-center align-items-center my-auto">
            <form className="mt-5" onSubmit={handleSubmit}>
                <h5>Create Task</h5>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Task</label>
                    <input className="form-control" type="text" name="title" placeholder="Task Title" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="priority">Status</label>
                    <select className="form-select" name="priority" placeholder="Task Priority"  onChange={handleChange}>
                        <option value=""></option>
                        {options.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className="btn btn-success mt-4" type="submit">Create</button>
                    <Link to='/' className="btn btn-danger mt-4 mx-2">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default CreateTask

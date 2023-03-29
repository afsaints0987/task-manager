import * as FaIcons from 'react-icons/fa'
import Table from '../components/Table'
import Loading from '../components/Loading'
import {Link} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react'
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const { state } = useContext(UserContext)
    
    useEffect(() => {
        setUser(state.user)
        setMessage(state.user.message)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    },[state])

    if(!user){
        return <Loading/>
    } 
    
    return (
        <div className="container-lg mt-4">
            {user && <p className="text-success">{message}</p>}
            <p>Welcome {user.userName}!</p>
            <div className="tasks_welcome">
            <h2>Dashboard</h2>
            <Link to='/create' className="btn btn-sm btn-success">Create Task <FaIcons.FaRegEdit className="mx-2"/></Link>
            </div>
            <Table userInfo={state.user}/>
        </div>
    )
}

export default Dashboard

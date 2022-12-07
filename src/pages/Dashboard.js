import * as FaIcons from 'react-icons/fa'
import Table from '../components/Table'
import {Link} from 'react-router-dom'


const Dashboard = () => {
    
    return (
        <div className="container-lg mt-4">
            <p>Welcome User!</p>
            <div className="tasks_welcome">
            <h2>Dashboard</h2>
            <Link to='/create' className="btn btn-sm btn-success">Create Task <FaIcons.FaRegEdit className="mx-2"/></Link>
            </div>
            <Table />
        </div>
    )
}

export default Dashboard

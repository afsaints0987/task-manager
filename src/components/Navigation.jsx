import * as FaIcons from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useContext} from 'react'
import { UserContext } from '../context/UserContext';


const Navigation = () => {
    const navigate = useNavigate()
    const {logout} = useLogout()
    const { state } = useContext(UserContext)
   
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header>
            <nav className="navbar bg-success text-light px-4 py-2">
                <Link to="/"><span className="">Task Manager</span></Link>
                {!state.user ? <Link to='/' className="text-light btn btn-transparent"><FaIcons.FaSignInAlt/> Sign In</Link> :
                <button className="text-light btn btn-transparent border-0" onClick={handleLogout}>
                <FaIcons.FaSignOutAlt/> Sign Out
                </button>}  
            </nav>
        </header>
    )
}

export default Navigation

import * as FaIcons from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Navigation = () => {
    return (
        <header>
            <nav className="navbar bg-success text-light px-4 py-2">
                <Link to="/"><span className="">Task Manager</span></Link>
                <Link className="text-light">
                    <FaIcons.FaSignInAlt/> Sign In
                </Link>
            </nav>
        </header>
    )
}

export default Navigation

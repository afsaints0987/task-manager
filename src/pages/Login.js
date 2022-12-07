import {useContext} from 'react'
import Context from '../context/UserContext'
const Login = () => {
    
    return (
        <div className="container d-flex justify-content-center mt-5">
            <form className="d-flex flex-column mt-5">
                <div className="my-3">
                    <h4 className="text-center">Task Manager</h4>
                </div>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group my-2">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password"/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-label">Remember Me</label>
                </div>
                <button className="btn btn-success" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login

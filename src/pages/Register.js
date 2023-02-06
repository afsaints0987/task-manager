import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import http from '../data/api'

const Register = () => {

    let navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [passCheck, setPassCheck] = useState(false)
    const [user, setUser] = useState({
        userName : '',
        email : '',
        password : '',
        verifyPass: ''
    })

    const handleChange = e => {
        setError(false)
        const {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user.userName || !user.email || !user.password){
            setError(true)
            console.log("Please complete the form")
            setMessage("Please complete the form")
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        } 
        if(user.password !== user.verifyPass){
            setError(true)
            console.log("Password is not match")
            setMessage("Password is not match")
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        } 
        const userData = {
            userName: user.userName,
            email: user.email,
            password: user.password
        }

        console.log(userData)
        const response = await http.post('api/users', userData)
        console.log(response.data)
        console.log(response.data.message)
        navigate('/')
    }
    
    return (
        <div className="container d-flex justify-content-center mt-5">
            <form className="d-flex flex-column mt-5" onSubmit={handleSubmit}>
            {error && <span className="text-danger text-center">{message}</span>}
                <div className="my-3 text-center">
                    <h4 style={{fontWeight: 700}}>Task Manager</h4>
                    <h5 className="mt-4">Register Account</h5>
                </div>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="userName">Username</label>
                    <input className="form-control" type="text" name="userName"onChange={handleChange}/>
                </div>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" onChange={handleChange}/>
                </div>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group">
                    <input className="form-control" type={passCheck ? "password" : "text"} name="password" onChange={handleChange}/>
                    <span className="icons px-2 input-group-text bg-transparent border-start-0 text-muted" onClick={() => setPassCheck(!passCheck)}>{passCheck ? <FaIcons.FaEyeSlash/> : <FaIcons.FaEye/>}</span>
                    </div>
                </div>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="verifyPass">Repeat Password</label>
                    <div className="input-group">
                    <input className="form-control" type={passCheck ? "password" : "text"} name="verifyPass" onChange={handleChange}/>
                    <span className="icons px-2 input-group-text bg-transparent border-start-0 text-muted" onClick={() => setPassCheck(!passCheck)}>{passCheck ? <FaIcons.FaEyeSlash/> : <FaIcons.FaEye/>}</span>
                    </div>
                </div>
                <button className="btn btn-success mt-3" type="submit">Register</button>
                <Link to='/' className="text-primary mt-2">Sign In</Link>
            </form>
        </div>
    )
}

export default Register
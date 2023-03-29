import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import Loading from '../components/Loading'

const Login = () => {
    
    const { login, loading, message } = useLogin()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // Handle form once submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: form.email,
            password: form.password,
        }
        
        await login(userData)

       
    }
    if (loading) {
        return <Loading />
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <form className="d-flex flex-column mt-5" onSubmit={handleSubmit}>
                {message && <p className="text-center text-danger">{message}</p>}
                <div className="my-3 text-center">
                    <h4 style={{ fontWeight: 700 }}>Task Manager</h4>
                    <h5 className="mt-4">Login Account</h5>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" onChange={handleChange} />
                </div>
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" onChange={handleChange} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-label">Remember Me</label>
                </div>
                <button className="btn btn-success" type='submit'>Login</button>
                <Link to='/register' className="text-primary mt-2">Register</Link>
            </form>
        </div>
    )
}

export default Login

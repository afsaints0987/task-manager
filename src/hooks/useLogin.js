import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import http from '../data/api'

export const useLogin = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const { dispatch } = useContext(UserContext)

    const login = async (userData) => {

        try {
            const response = await http.post('api/users/login', userData)
            const userLogin = await response.data

            console.log(JSON.stringify(userLogin))
            console.log(userLogin.message)
            localStorage.setItem('user', JSON.stringify(userLogin))
            dispatch({ type: 'LOGIN', payload: userLogin })

            setSuccess(true)
            console.log(success)
            setMessage(userLogin.message)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)

        } catch (err) {
            setError(true)
            console.log(error)
            setMessage(err.response.data.message)
            console.log(err.response.data.message)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }

    }

    return {
        login,
        error,
        message,
        success
    }
}
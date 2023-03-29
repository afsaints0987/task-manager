import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import http from '../data/api'

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { dispatch } = useContext(UserContext)

    const login = async (userData) => {
        setLoading(true)
        
        try {
            const response = await http.post('api/users/login', userData)
            const userLogin = await response.data
            

            localStorage.setItem('user', JSON.stringify(userLogin))
            dispatch({ type: 'LOGIN', payload: userLogin })
            
        } catch (err) {
            console.log(err.response.data.message)
            setMessage(err.response.data.message)
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }

        setLoading(false)
        
    }

    return {
        login,
        loading,
        message
    }
}
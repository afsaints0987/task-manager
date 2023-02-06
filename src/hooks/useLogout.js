import {useContext} from 'react'
import {UserContext} from '../context/UserContext'


export const useLogout = () => {
    const {dispatch} = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return{
        logout
    }
}
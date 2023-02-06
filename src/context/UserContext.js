import {createContext, useReducer, useEffect} from 'react'
import {userReducer, initialState} from '../reducer/userReducer'

export const UserContext = createContext(initialState)

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if(!user){
            return
        } else {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    return (
        <UserContext.Provider value={
            { 
            state,
            dispatch
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

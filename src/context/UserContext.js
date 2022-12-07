import {createContext, useState} from 'react'

export const UserContext = createContext({});

const Context = ({children}) => {
    
    return (<UserContext.Provider>
        {children}
    </UserContext.Provider>)
}

export default Context;


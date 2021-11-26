import { useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                setUser,
                login: async (email, password) => {
                    await axios.post("")
                }
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
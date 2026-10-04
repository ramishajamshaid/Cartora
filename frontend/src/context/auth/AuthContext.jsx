import { createContext, useEffect, useState } from "react";
import api from "../../api/api";

export const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUser = async()=>{
        try {
            const res = await api.get("users/me")
            if(res.data?.success){
                setUser(res.data.data)
            }
        } catch (error) {
            setUser(null)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, isLoading, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
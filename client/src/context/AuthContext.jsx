import { useContext } from "react"
import { createContext, useState } from "react"

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("fintechUser")) || null)

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>

}
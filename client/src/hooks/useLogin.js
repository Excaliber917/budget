import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setUser } = useAuthContext()
    const navigate = useNavigate()

    const login = async ({ userName, password }) => {
        const success = verifyInputs({ userName, password })
        if (!success)
            return

        try {
            setLoading(true)
            // console.log(loading)
            const res = await axios.post('/api/auth/login', {
                userName,
                password
            })
            toast.success("Log In successfull")
            localStorage.setItem("fintechUser", JSON.stringify(res.data))
            setUser(res.data)
            navigate("/")

        } catch (error) {
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
            // console.log(loading)
        }
    }

    return { loading, login }

}

const verifyInputs = ({ userName, password }) => {
    if (!userName || !password) {
        toast.error("fields are empty")
        return false
    }

    return true
}
import express from 'express'
import { login, logout, signUp } from '../controller/auth.controller.js'

const userRoute = express.Router()


userRoute.post('/signup',signUp)
userRoute.post('/login',login)
userRoute.post('/logout',logout)

export default userRoute
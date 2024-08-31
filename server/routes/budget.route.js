import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { getAllBudgets, setBudget } from '../controller/budget.controller.js'
const budgetRoute = express.Router()

budgetRoute.post("/",verifyUser,setBudget)
budgetRoute.get("/all",verifyUser,getAllBudgets)



export default budgetRoute
import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { getAllExpenses, setExpense } from '../controller/expense.controller.js'

const expenseRoute = express.Router()

expenseRoute.post("/",verifyUser,setExpense)
expenseRoute.get("/all",verifyUser,getAllExpenses)


export default expenseRoute
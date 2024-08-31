import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './db/connectDb.js';
import userRoute from './routes/auth.route.js';
import expenseRoute from './routes/expense.route.js';
import budgetRoute from './routes/budget.route.js';


dotenv.config()
const app = express()
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",userRoute)
app.use("/api/expense",expenseRoute)
app.use("/api/budget",budgetRoute)




app.listen(process.env.PORT,()=>{
    connectDb()
    console.log("app is running")
})
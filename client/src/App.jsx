import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Expenses from "./pages/Expenses"
import Budget from "./pages/Budget"
import Profile from "./pages/Profile"
import Reports from "./pages/Reports"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from 'react-hot-toast'
import SetIncome from "./pages/SetIncome"
import SingleBudgetItem from "./pages/singleBudgetItem"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/budgetitems" element={<SingleBudgetItem />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<SetIncome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>

      </BrowserRouter>
      <Toaster />

    </>
  )
}

export default App

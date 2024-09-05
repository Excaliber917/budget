import { useEffect } from "react";
import Summary from "../components/summary";
import { useSetBudgetList } from "../hooks/useSetBudgetList";
import { useSetExpenseList } from "../hooks/useSetExpenseList";
import { useTotalExpense } from "../hooks/useTotalExpense";
import { useTotalBudgetAmount } from "../hooks/useTotalBudgetAmount";
import { useAuthContext } from "../context/AuthContext";
import { useGetExenseList } from "../context/ExpenseContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Register chart.js elements
import PieChart from "../components/PieChart";

ChartJS.register(ArcElement, Tooltip, Legend); // Register Pie chart components

function Reports() {
  const { getAllExpenses } = useSetExpenseList();
  const { expenseList } = useGetExenseList(); // Fetching expenses
  const { getAllBudgets } = useSetBudgetList();

  const { totalEXAmount } = useTotalExpense();
  const { totalBDAmount } = useTotalBudgetAmount();
  const { user } = useAuthContext();
  const SavingStatus = user?.savingsGoal - (totalBDAmount() - totalEXAmount());


  useEffect(() => {
    getAllExpenses();
    getAllBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step 1: Extract unique categories and sum expenses for each category
  const categoryWiseExpenses = expenseList.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Step 2: Create data for Category-wise Expenses Pie Chart
  const categoryData = {
    labels: Object.keys(categoryWiseExpenses), // Categories
    datasets: [
      {
        data: Object.values(categoryWiseExpenses), // Corresponding expense amounts
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#0fe8f3", "#ef0ff3", "#780450", "#d68910"], // Colors for each slice
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#0fe8f3", "#ef0ff3", "#780450", "#d68910"],
      },
    ],
  };

  // Step 3: Prepare data for Savings vs Goal Pie Chart
  const savingsData = {
    labels: ["Remaining Goal", "Savings"],
    datasets: [
      {
        data: [SavingStatus, user?.savingsGoal - SavingStatus], // Savings and remaining goal
        backgroundColor: ["#4BC0C0", "#FFCE56"],
        hoverBackgroundColor: ["#4BC0C0", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Financial Reports</h1>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Category-wise Expenses (Pie Chart) */}
          <PieChart chartData={categoryData} />

          {/* Spending Comparison (Pie Chart) */}
          <PieChart chartData={savingsData} />
        </div>

        {/* Summary */}
        <Summary />
      </div>
    </div>
  );
}

export default Reports;

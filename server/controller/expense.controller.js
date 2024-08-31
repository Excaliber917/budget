import Expense from '../model/expense.model.js'
import ExpenseList from '../model/expenseList.model.js'

export const setExpense = async (req, res) => {
    const userId = req.user._id;
    const { expenseName, amount, category } = req.body;

    try {
        // Find the user's ExpenseList, or create one if it doesn't exist
        let expenseList = await ExpenseList.findOne({ userId });

        if (!expenseList) {
            expenseList = new ExpenseList({ userId, expenses: [] });
            await expenseList.save();
        }

        // Create a new expense
        const newExpense = new Expense({
            listId: expenseList._id,
            expenseName,
            amount,
            category,
            
        });

        // Save the expense
        const savedExpense = await newExpense.save();

        // Add the new expense ID to the user's ExpenseList
        expenseList.expenses.push(savedExpense._id);
        await expenseList.save();

        res.status(201).json({
            message: 'Expense created successfully',
            expense: savedExpense,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating expense',
            error: error.message,
        });
    }
};


export const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user._id
        const expenseList = await ExpenseList.findOne({ userId }).populate('expenses')
        if (!expenseList) {
            return res.status(201).json({message:"no list"})
        }
        res.status(200).json(expenseList)
    } catch (error) {
        res.status(500).json({
            message: 'Error getting all expenses',
            error: error.message,
        });

    }
}
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetBudgetList } from "../context/BudgetContext";

export const useSetBudgetList = () => {
    const [loading, setLoading] = useState(false);
    const { setBudgetList } = useGetBudgetList();

    const getAllBudgets = async () => {
        try {
            setLoading(true);
            const allBudgets = await axios.get("api/budget/all");
            setBudgetList(allBudgets.data.budgets);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error fetching budgets");
        } finally {
            setLoading(false);
        }
    };

    return { loading, getAllBudgets };
};

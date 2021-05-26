import { ExpenseOperations } from "../actionCreators/actionTypes";

export const addCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.ADD_CATEGORY,
            payload: category
        });
    }
}
export const updateCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.UPDATE_CATEGORY,
            payload: category
        });
    }
}

export const deleteCategory = (category) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.DELETE_CATEGORY,
            payload: category
        });
    }
}

export const addExpense = (expense) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.ADD_EXPENSE,
            payload: expense
        });
    }
}

export const updateExpense = (expense) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.UPDATE_EXPENSE,
            payload: expense
        });
    }
}

export const deleteExpense = (expense) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.DELETE_EXPENSE,
            payload: expense
        });
    }
}

export const getExpense = (expense) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.VIEW_EXPENSE,
            payload: expense
        });
    }
}

export const loadExpenses = (expenses) => {
    return (dispatch) => {
        dispatch({
            type: ExpenseOperations.LOAD_EXPENSES,
            payload: expenses
        });
    }
}
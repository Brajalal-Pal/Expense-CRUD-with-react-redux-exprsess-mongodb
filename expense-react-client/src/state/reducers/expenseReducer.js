import { ExpenseOperations } from "../actionCreators/actionTypes";
import { cloneDeep } from "lodash";
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns state
 */
function expenseReducer(state = [], action) {
    let store;
    let expense;

    switch (action.type) {
        case ExpenseOperations.ADD_EXPENSE:
            //console.log("ADD_EXPENSE");
            expense = Object.assign({}, action.payload);
            store = [...state, expense];
            return store;
        case ExpenseOperations.UPDATE_EXPENSE:
            //console.log("UPDATE_EXPENSE");
            store = cloneDeep(state);
            expense = Object.assign([], action.payload);
            let index = store.findIndex((item) => {
                return item.billref === expense.billref;
            });
            store[index] = expense;
            return store;
        case ExpenseOperations.DELETE_EXPENSE:
            //console.log("DELETE_EXPENSE");
            store = Object.assign([], state);
            let billRef = action.payload;
            let st = store && store.filter && store.filter((item) => {
                return item.billref !== billRef;
            });
            return st;
        case ExpenseOperations.VIEW_EXPENSE:
            //console.log("VIEW_EXPENSE");
            return state;
        case ExpenseOperations.LOAD_EXPENSES:
            //console.log("LOAD_EXPENSES");
            let expenses = Object.assign([], action.payload);
            store = [...state, ...expenses];
            return store;
        default:
            //console.log("default action.type");
            return state;
    }
}

export default expenseReducer;

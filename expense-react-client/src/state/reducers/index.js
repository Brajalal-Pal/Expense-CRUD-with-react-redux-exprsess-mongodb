import {combineReducers} from "redux";
import categoryReducer from "./categoryReducer";
import expenseReducer from "./expenseReducer";

export const reducers = combineReducers({    
    categoryStore: categoryReducer,
    expenseStore: expenseReducer
});
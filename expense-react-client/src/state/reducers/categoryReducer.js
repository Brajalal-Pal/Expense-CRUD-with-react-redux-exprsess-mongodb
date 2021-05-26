import { ExpenseOperations } from "../actionCreators/actionTypes";

function expenseReducer(state = [], action) {
    let store ;
    switch(action.type) {
        case ExpenseOperations.ADD_CATEGORY:            
            store = [...state, action.payload ];
            //localStorage.setItem("store", JSON.stringify(store));
            return store;            
        case ExpenseOperations.UPDATE_CATEGORY:
            store = [...state, action.payload ];
            //localStorage.setItem("store", JSON.stringify(store));
            return store;
        case ExpenseOperations.DELETE_CATEGORY:
            store = [...state, action.payload ];
            //localStorage.setItem("store", JSON.stringify(store));
            return store;
        default:
            return state;
    }
}

export default expenseReducer;

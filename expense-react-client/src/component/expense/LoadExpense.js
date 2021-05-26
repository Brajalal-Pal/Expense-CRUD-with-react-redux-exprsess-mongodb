import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { expenseActionCreators } from "../../state/actionCreators/index";
import { API_BASE_URI } from "../../services/config";
import Expense from './AddExpense';
import ExpenseList from './ExpenseList';
import UpdateExpense from "./UpdateExpense";
import "../../App.css";

const LoadExpense = () => {
    let api = `${API_BASE_URI}/expense`;
    
    const dispatch = useDispatch(null);
    const { loadExpenses } = bindActionCreators(expenseActionCreators, dispatch);

    useEffect(() => {
        axios.get(api).then(result => {            
            loadExpenses(result.data);
        }).catch(exp => {
            console.log("Error getting expense list", exp);
        });
    }, []);

    return (
        <Router>
            <div className="App-header">
                <NavLink to="/">Expense Entry</NavLink> &nbsp;&nbsp;
                <NavLink to="/list">Expense List</NavLink>
            </div>    
            <Switch>
                <Route path="/" component={Expense} exact />
                <Route path="/list" component={ExpenseList} exact />
                <Route path="/update/:billref" component={UpdateExpense} />
            </Switch>
            <footer className="fixed-footer">
                <hr/>
                Copyright &copy; 2021, <a href="https://www.brajalal.com" rel="noreferrer" target="_blank">www.brajalal.com</a>
            </footer>
        </Router>
    )
}

export default LoadExpense;

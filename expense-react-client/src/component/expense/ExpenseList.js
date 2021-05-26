import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const ExpenseList = () => {    
    const [expenses, setExpenses] = useState([]);
    const expenseStore = useSelector((state) => state.expenseStore);
    const gridWidth = 1515;

    useEffect(() => {
        console.log("expenseStore==>", expenseStore);
        setExpenses(expenseStore)

        //cleanup
        return () => {
            setExpenses([]);
        }

    }, [expenseStore]);

    return (
        <React.Fragment> 
            <div style={{padding: "10px"}}>
                <h1>Expenses</h1>           
                <Grid data={[...expenses]} >
                    <Column field="billref" width={`${gridWidth / 10}px`} title="Bill Ref#"
                        cell={(props) => (<td style={{ padding: "10px", textDecoration: "underline" }}><a href={`/update/${props.dataItem.billref}`} title="Update"> {props.dataItem.billref}</a></td>)}
                    />
                    <Column field="date" width="200px" title="Payment Date" />
                    <Column field="categoryid" width="100px" title="Category" />
                    <Column field="amount" width="125px" title="Amount" format="{0:format}" />
                    <Column field="paymentmode" width="150px" title="Payment Mode" />
                    <Column field="detail"  title="Details" />
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default ExpenseList;
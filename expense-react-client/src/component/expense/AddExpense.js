import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import { expenseActionCreators } from "../../state/actionCreators/index";
import { API_BASE_URI } from "../../services/config";

const style = {
    width: "200px"
}
const Expense = () => {
    const [expDate, setExpDate] = useState(new Date());
    const catRef = React.useRef(null);
    const [billref, setBillref] = useState("");
    const [amount, setAmount] = useState(0);
    const pmtModeRef = React.useRef("");
    const [details, setDetails] = useState("");
    const [message, setMessage] = useState("");
    let history = useHistory();

    const dispatch = useDispatch(null);
    const { addExpense } = bindActionCreators(expenseActionCreators, dispatch);

    const categories = [
        { id: "nobill", description: "-Select Category-" },
        { id: "mrch", description: "Mobile Recharge" },
        { id: "elbill", description: "Electricity Bill" },
        { id: "gshp", description: "Grocery shopping" },
    ];

    const paymentModes = [
        { id: "csh", description: "Cash" },
        { id: "cdcard", description: "Credit/Debit Card" },
        { id: "upi", description: "UPI" },
        { id: "nbank", description: "Net Banking" }
    ];

    const onSaveClickHandler = () => {
        if (catRef.current.selectedIndex <= 0) {
            setMessage("Please select category");
            return;
        }
        if (billref.trim() === "") {
            setMessage("Please enter bill reference number");
            return;
        } else if ((billref.indexOf("/") > -1) || (billref.indexOf("\\") > -1)) {
            setMessage("Bill reference number should not contain '/' or '\\'");
            return;
        }
        if (isNaN(parseFloat(amount))) {
            setMessage("Please enter a valid amount");
            return;
        }

        let api = `${API_BASE_URI}/expense`;
        let data = {
            date: expDate,
            categoryid: catRef.current.value,
            billref: billref,
            amount: amount,
            paymentmode: pmtModeRef.current.value,
            detail: details
        }
        axios.post(api, data).then(result => {
            if (result.data.error) {
                setMessage(result.data.message);
            } else {
                addExpense(result.data);
                history.push("/list");
            }
        }).catch(ex => {
            setMessage(ex);
        });
    }

    return (
        <table className="table add-expense " >
            <tbody>
                <tr>
                    <th colSpan="2" className="table-header">Expense Entry Form</th>
                </tr>
                <tr>
                    <td><label htmlFor="dt">Date of Expense</label> </td>
                    <td><DatePicker id="dt" className="form-control" selected={expDate} onChange={(date) => setExpDate(date)} /> </td>
                </tr>
                <tr>
                    <td>Expense Category</td>
                    <td>
                        <select style={style} className="form-control" ref={catRef} defaultValue={"nobill"}>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category.id}>{category.description}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Bill Ref Number</td>
                    <td><input type="text" style={style} className="form-control" id="billref" name="billref" value={billref} onChange={(event) => setBillref(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td>Amount Spent</td>
                    <td><input type="text" style={style} className="form-control" id="amount" name="amount" value={amount} onChange={(event) => setAmount(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td>Payment Mode</td>
                    <td>
                        <select style={style} className="form-control" ref={pmtModeRef}>
                            {
                                paymentModes.map(category => {
                                    return <option key={category.id} value={category.id}>{category.description}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Additional Detail</td>
                    <td><input type="text" style={style} className="form-control" value={details} onChange={(event) => setDetails(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button className="btn btn-primary" onClick={onSaveClickHandler}>Add</button>&nbsp;
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        {
                            message
                        }
                    </td>
                </tr>
            </tbody>

        </table>
    )
}

export default Expense;
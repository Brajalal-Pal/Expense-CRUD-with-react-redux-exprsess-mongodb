import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
const UpdateExpense = (props) => {
    const [expDate, setExpDate] = useState(new Date());
    const catRef = React.useRef(null);
    const [billref, setBillref] = useState("");
    const [amount, setAmount] = useState(0);
    const pmtModeRef = React.useRef("");
    const [details, setDetails] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const dispatch = useDispatch(null);
    const { updateExpense, deleteExpense } = bindActionCreators(expenseActionCreators, dispatch);

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

    useEffect(() => {
        console.clear();        
        axios.get(`${API_BASE_URI}/expense/billref/${props.match.params.billref}`)
            .then((result) => {
                //setData(result.data);
                console.log("*", result.data);
                setDetails(result.data[0].detail);
                setAmount(result.data[0].amount);
                setBillref(result.data[0].billref);

                for (let i = 0; i < categories.length; i++) {
                    if (result.data[0].categoryid == categories[i].id) {
                        catRef.current.selectedIndex = i;
                        break;
                    }
                }
                for (let i = 0; i < paymentModes.length; i++) {
                    if (result.data[0].paymentmode == paymentModes[i].id) {
                        pmtModeRef.current.selectedIndex = i;
                        break;
                    }
                }
            })
            .catch(err => {
                setMessage(JSON.stringify(err));
            });
    }, []);

    const onDeleteClickHandler = () => {
        if (billref.trim() === "") {
            setMessage("Bill reference number not selected");
            return;
        }

        let api = `${API_BASE_URI}/expense/${billref}`;
        axios.delete(api).then(result => {
            deleteExpense(billref);
            history.push("/list");
        }).catch(ex => {
            setMessage(JSON.stringify(ex));
        });
    }

    const onUpdateClickHandler = () => {
        if (catRef.current.selectedIndex <= 0) {
            setMessage("Please select category");
            return;
        }
        if (billref.trim() === "") {
            setMessage("Bill reference number not selected");
            return;
        }
        if (isNaN(parseFloat(amount))) {
            setMessage("Please enter a valid amount");
            return;
        }

        let api = `${API_BASE_URI}/expense/${billref}`;
        let data = {
            date: expDate,
            categoryid: catRef.current.value,
            billref: billref,
            amount: amount,
            paymentmode: pmtModeRef.current.value,
            detail: details
        }

        axios.put(api, data).then(result => {
            if (result.data.error) {
                setMessage(result.data.message);
            } else {
                updateExpense(result.data);
                history.push("/list");
            }
        }).catch(ex => {
            setMessage(JSON.stringify(ex));
        });
    }

    return (
        <table className="table add-expense" >
            <tbody>
                <tr>
                    <th colSpan="2" className="table-header">Expense Update Form</th>
                </tr>
                <tr>
                    <td>Date of Expense</td>
                    <td><DatePicker selected={expDate} onChange={(date) => setExpDate(date)} /> </td>
                </tr>
                <tr>
                    <td>Expense Category</td>
                    <td>
                        <select style={style} ref={catRef} defaultValue={"nobill"}>
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
                    <td><input readOnly type="text" style={{ width: "200px", backgroundColor: "#ddd" }} id="billref" name="billref" title="Bill Ref (Read-only)" value={billref} onChange={(event) => setBillref(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td>Amount Spent</td>
                    <td><input type="text" style={style} id="amount" name="amount" value={amount} onChange={(event) => setAmount(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td>Payment Mode</td>
                    <td>
                        <select style={style} ref={pmtModeRef}>
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
                    <td><input type="text" style={style} value={details} onChange={(event) => setDetails(event.target.value)} /> </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button className="btn btn-warning" onClick={onUpdateClickHandler}>Update</button>&nbsp;
                        <button className="btn btn-danger" onClick={onDeleteClickHandler}>Delete</button>&nbsp;
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">{message}</td>
                </tr>
            </tbody>

        </table>
    )
}

export default UpdateExpense;
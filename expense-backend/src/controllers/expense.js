//Expense file
const Expense = require("../models/expense");

exports.getExpenses = (req, res, next) => {    
    Expense.find()
        .then((result) => {
            //return res.json(result);
            return res.json(result);
        })
        .catch(ex => {
            return res.json({
                error: "ERROR getting expenses",
                message: ex.message
            });
        });    
}

exports.getExpenseByBillRef = (req, res, next) => {
    let billRef = req.params.billRef;
    console.log("billRef", billRef);

    Expense.find({ billref: billRef })
        .then((result) => {
            console.log("**", result);

            return res.json(result);
        })
        .catch(err => {
            return res.json({
                error: "Error getting expense by billref number",
                message: err.message
            });
        });
}

exports.getExpenseByCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;

    Expense.find({ categoryid: categoryId })
        .then((result) => {
            return res.json(result);
        })
        .catch(ex => {
            return res.json({
                error: "ERROR getting expense",
                message: ex.message
            });
        });
}

exports.getExpenseByPaymentMode = (req, res, next) => {
    const paymentMode = req.params.paymentMode;

    Expense.find({ paymentmode: paymentMode })
        .then((result) => {
            return res.json(result);
        })
        .catch(ex => {
            return res.json({
                error: "ERROR getting expense",
                message: ex.message
            });
        });
}

exports.getExpenseByDate = (req, res, next) => {
    const date = req.params.expenseDate;

    Expense.find({ date: date })
        .then((result) => {
            return res.json(result);
        })
        .catch(ex => {
            return res.json({
                error: "ERROR getting expense by date",
                message: ex.message
            });
        });
}

//Update specific expense
exports.putUpdateExpense = (req, res, next) => {
    try {
        const billRef = req.params.billRef;
        let data = {
            date: req.body.date,
            categoryid: req.body.categoryid,
            amount: req.body.amount,
            paymentmode: req.body.paymentmode,
            detail: req.body.detail
        };
        //console.log("data to be updated with", data);
        Expense.updateOne({ billref: billRef }, {
            $set: data
        }).then((result) => {
            if (result.nModified > 0) {
                Expense.findOne({ billref: billRef })
                    .then((rs) => {
                        return res.json(rs);
                    })
                    .catch(err => {
                        //console.log("error1", err);
                        return res.json({
                            error: err,
                            message: err.message
                        });
                    });
            } else {
                throw new Error("No record updated");
            }

        }).catch(ex => {
            //console.log("error2", ex);
            return res.json({
                error: ex,
                message: ex.message
            });
        });
    } catch (exp) {
        //console.log("error3", exp);
        return res.json({
            error: exp,
            message: exp.message
        });
    }

}

exports.deleteExpense = (req, res, next) => {
    try {
        const billRef = req.params.billRef;
        //const billRef = req.body.billRef;
        //console.log("To be deleted billRef", billRef);

        Expense.deleteOne({ billref: billRef }).then((result) => {
            if (result.deletedCount == 0) {
                console.log("No record to delete..");
            }
            return res.json(result);
        }).catch(ex => {
            return res.json({
                error: "ERROR while trying to execute deleteOne()",
                message: ex.message
            });
        });
    } catch (exp) {
        return res.json({
            error: "ERROR while trying to execute deleteExpense()",
            message: exp.message
        });
    }

}

exports.postAddExpense = (req, res, next) => {
    try {
        const billRef = req.body.billref;
        const categoryId = req.body.categoryid;
        const date = req.body.date;
        const amount = req.body.amount;
        const paymentMode = req.body.paymentmode;
        const details = req.body.detail;

        const expense = new Expense({
            date: date,
            categoryid: categoryId,
            billref: billRef,
            amount: amount,
            paymentmode: paymentMode,
            detail: details
        });

        //console.log("Expense to be added:", expense);
        // return;

        expense.save()
            .then(result => {
                console.log("Expense added");
                return res.json(result);
            })
            .catch(ex => {
                return res.json({
                    error: ex,
                    message: ex.message
                });
            });
    } catch (exp) {
        //console.log(exp);
        return res.json({
            error: "ERROR while trying to execute postAddExpense()",
            message: exp.message
        });
    }

}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    categoryid: {
        type: String,
        require: true
    },
    billref: {
        type: String,
        require: true,
        unique: true
    },
    amount : {
        type: Number,
        require: true
    },
    paymentmode: {
        type: String,
        require: true
    },
    detail: {
        type: String        
    },
});

module.exports = mongoose.model("Expense", expenseSchema);
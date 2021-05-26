const express = require("express");
const expenseController = require("../controllers/expense");
const router = express.Router();

//POST : Add new expense
router.post("/", expenseController.postAddExpense);

//GET all expenses
router.get("/", expenseController.getExpenses);

//GET a specific expense by billref number
router.get("/billref/:billRef", expenseController.getExpenseByBillRef);

//GET a specific expense details
router.get("/category/:categoryId", expenseController.getExpenseByCategory);
router.get("/payment/:paymentMode", expenseController.getExpenseByPaymentMode);
router.get("/date/:expenseDate", expenseController.getExpenseByDate);

//PUT: Update a specific expense details
router.put("/:billRef", expenseController.putUpdateExpense);

//DELETE: Delete a specific expense
router.delete("/:billRef", expenseController.deleteExpense);

module.exports = router;
const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();

//POST : Add new category
router.post("/category", categoryController.postAddCategory);

//GET all categories
router.get("/category", categoryController.getCategories);

//GET a specific category details
router.get("/category/:categoryId", categoryController.getCategoryById);

//PUT: Update a specific category details
router.put("/category/:categoryId", categoryController.putUpdateCategory);

//DELETE: Delete a specific category
router.delete("/category/:categoryId", categoryController.deleteCategory);


module.exports = router;
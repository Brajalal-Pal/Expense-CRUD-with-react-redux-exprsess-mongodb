//Expense category file
const Category = require("../models/category");

exports.getCategories = (req, res, next) => {    
    Category.find()
        .then((result)=> {            
            return res.json(result);
        })
        .catch(ex=> {            
            return res.json({
                error: "ERROR getting categories",
                message: ex.message
            });
        });
}

exports.getCategoryById = (req, res, next) => {
    const categoryId = req.params.categoryId;    
    
    Category.find({categoryid: categoryId})
        .then((result)=> {            
            
            if(result.length==0) {
                return res.json({
                    message: "Not Found"
                });
            } else {
                return res.json(result);
            }
        })
        .catch(ex=> {            
            return res.json({
                error: "ERROR getting categories",
                message: ex.message
            });
        });
}

//Update specific category
exports.putUpdateCategory = (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const categoryName = req.body.categoryname;

        Category.findOne({categoryid: categoryId}).updateOne({
            categoryname: categoryName
        }).then((result)=> {
            //console.log(result);
            return res.json(result);
        }).catch(ex=> {
            //console.log(ex);
            return res.json({
                error: "ERROR while trying to execute updateOne()",
                message: ex.message
            });
        });
    } catch(exp) {
        //console.log("error", exp);
        return res.json({
            error: "ERROR while trying to execute putUpdateCategory()",
            message: exp.message
        });
    }
    
}

exports.deleteCategory = (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;        
        Category.deleteOne({categoryid: categoryId}).then((result)=> {            
            if(result.deletedCount == 0) {
                console.log("No record to delete..");
            }
            return res.json(result);
        }).catch(ex=> {
            //console.log(ex);
            return res.json({
                error: "ERROR while trying to execute deleteOne()",
                message: ex.message
            });
        });
    } catch(exp) {
        //console.log("error", exp);
        return res.json({
            error: "ERROR while trying to execute deleteCategory()",
            message: exp.message
        });
    }
    
}

exports.postAddCategory = (req, res, next) => {
    try {
        const categoryId = req.body.categoryid;
        const categoryName = req.body.categoryname;

        const category = new Category({
            categoryid: categoryId,
            categoryname: categoryName
        });
        

        category.save()
            .then(result=> {
                console.log("Category created");
                return res.json(category);
            })
            .catch(ex=>{                
                return res.json({
                    error: "ERROR creating category",
                    message: ex.message
                });
            });
    } catch(exp) {
        console.log("error", exp);
        return res.json({
            error: "ERROR while trying to execute postAddCategory()",
            message: exp.message
        });
    }
    
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryid: {
        type: String,
        require: true
    },
    categoryname: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Category", categorySchema);
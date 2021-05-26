const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path =require("path");
const cors = require("cors");
const morgan = require("morgan");
const categoryRoutes = require("./src/routes/category");
const expenseRoutes = require("./src/routes/expense");

const app = express();
let port = process.env.PORT || 3001;

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(categoryRoutes);
app.use("/expense", expenseRoutes);

app.get("/", (req, res) => {
   res.render("index", {      
      message: "Financial Expense DB utility API"
   });
});

mongoose.connect("mongodb://localhost:27017/FinAdvisorDB?retryWrites=true&w=majority",
   {useNewUrlParser: true, useUnifiedTopology: true})
   .then((result)=> {
      console.clear();
      console.log("Database 'FinAdvisorDB' connected successfully!!");
      app.listen(port, () => {
         console.log(`Running server at port ${port}`);
      });
   })
   .catch(err=> {
      console.log("Error connecting database.", err);
   });


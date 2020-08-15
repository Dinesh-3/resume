const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router.js")
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/",router)

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
};

app.listen(
    port, 
    () => console.log(`Server is running on port : ${port}`));

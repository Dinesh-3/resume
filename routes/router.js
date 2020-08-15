const router = require("express").Router();
const {db,mysqlQuery} = require("../database/mysql");

router.route('/signup')
    .get(
        (req,res)=>{
            res.render("signup")
        })
    .post(
        (req,res) => {
            // console.log(req.body);
            if(req.body.password === req.body.rPassword){
                let query = `INSERT INTO signup VALUES(${req.body.firstName},${req.body.lastName},${req.body.dob},${req.body.password},${req.body.email})`
                console.log(query);
                
                if(mysqlQuery(query)){
                    res.redirect("/login")
                }else{
                    res.send("error")
                }
                
            }else{
                res.send("Invalid Password")
            }
            
        }
    )    
router.route("/login")
        .get(
            (req,res) => {
                res.render("login")
            }
        )
        .post(
            (req,res) => {
                console.log(req.body);

                res.send(req.body)
            }

        )
module.exports=router

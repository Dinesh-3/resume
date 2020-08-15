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
                let query = `INSERT INTO signup VALUES('${req.body.firstName}','${req.body.lastName}','${req.body.dob}','${req.body.password}','${req.body.email}')`
                
                mysqlQuery(query,res)
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
            let query = `select email,password from signup where email='${req.body.email}'`   
            db.query(query, (err, data,fields) => {
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    let email = data[0].email
                    let password = data[0].password
                    if(req.body.email === email && req.body.password === password){
                        res.send("Success")
                    }else{
                        res.send("Invalid email and password")
                    }
                } 
            })
        })
module.exports=router

const router = require("express").Router();
const {db,mysqlQuery} = require("../database/mysql");
const generatePdf = require("../services/generatePdf")

router.route('/signup')
    .get(
        (req,res)=>{
            res.render("signup",{message:""})
        })
    .post(
        (req,res) => {
            console.log(req.body);
            if(req.body.password === req.body.rPassword){
                let query = `INSERT INTO signup VALUES('${req.body.firstName}','${req.body.lastName}','${req.body.dob}','${req.body.password}','${req.body.email}')`
                mysqlQuery(query,res)
            }else{
                res.render("signup",{message:"Passwords do not match try again"})
            }
            
        }
    )   
    

router.route("/login")
        .get(
            (req,res) => {
                res.render("login",{message:""})
            }
        )
        .post(
            (req,res) => {
                //     console.log(req.body);
                    let query = `select email,password from signup where email='${req.body.email}'`
                    db.query(query, (err, data,fields) => {
                        if(err){
                            console.log(err);
                            res.send(err)
                        }else{
                            if(data[0]){
                                let email = data[0].email
                                let password = data[0].password
                                if(req.body.email === email && req.body.password === password){
                                    res.render("personaldetails")
                                }else{
                                    res.render("login",{message:"Invalid Username and Password"})
                                }
                            }else{
                                res.render("login",{message:"Invalid Username and Password"})
                            }
                        } 
                    })
        })
router.route("/details")
        .get(
            (req,res) => {
                res.render("details")
            }
        )
        .post(
            (req,res) => {
                generatePdf(req.body.qual,req.body.stren,req.body.pd)
                res.redirect('details')
            }
        )


module.exports=router

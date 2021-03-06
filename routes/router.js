const router = require("express").Router();
const {db,mysqlQuery} = require("../database/mysql");
const generatePdf = require("../services/generatePdf")
const fs = require('fs')
const path = require('path')
const bcrypt = require("bcrypt")
const saltRounds = 5
router.route('/signup')
    .get(
        (req,res)=>{
            res.render("signup",{message:""})
        })
    .post(
        (req,res) => {
            console.log(req.body);
            if(req.body.password === req.body.rPassword){
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    let query = `INSERT INTO signup(fname,lname,dob,password,email) VALUES('${req.body.firstName}','${req.body.lastName}','${req.body.dob}','${hash}','${req.body.email}')`
                    mysqlQuery(query,res)
                });
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
                    let query = `select * from signup where email='${req.body.email}'`
                    db.query(query, (err, data,fields) => {
                        if(err){
                            console.log(err);
                            res.send(err)
                        }else{
                            if(data[0]){
                                let email = data[0].email
                                let hash = data[0].password
                                bcrypt.compare(req.body.password, hash, function(err, result) {
                                    if(req.body.email === email && result){
                                        delete data[0].password
                                        if(data[0].qual){
                                            let pdfPath = generatePdf(data[0])
                                            res.redirect('details')
                                        }else{
                                            res.render("personaldetails",{user:data[0]})
                                        }
                                    }else{
                                        res.render("login",{message:"Invalid Username and Password"})
                                    }
                                });
                                
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
                let filePath = path.resolve(__dirname,`../pdf/output.pdf`)
                fs.readFile(filePath, function (err,data){
                    res.contentType("application/pdf");
                    res.send(data);
                }) 
            }
        )

router.route('/update').post(
    (req,res) => {
        // console.log(req.body.email);
        let query = `UPDATE signup SET qual='${req.body.qual}',strength='${req.body.strength}',pd='${req.body.pd}'  WHERE email='${req.body.email}'`
        db.query(query, (err, data,fields) => {
            if(err){
                console.log(err);
                res.send(err)
            }else{
                let pdfPath = generatePdf(req.body)
                res.redirect('details')
                }
            }
        )
    }
)
module.exports=router

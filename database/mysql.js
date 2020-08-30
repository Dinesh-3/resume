const mysql      = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Dinesh@3',
    database : "project"
  });
  
  
db.connect((err) => {
      if(err){
          throw new Error(err)
      }else{
          console.log("Database connected successfully");
      }
  
  });


function mysqlQuery(getData,res){

    db.query(getData, (err, data,fields) => {
            if(err){
                console.log(err.errno);
                if(err.errno == 1062){
                    res.render("signup",{message:"Email already exist try again"})
                }
                else if(err.errno == 1292){
                    res.render("signup",{message:"Invalid input! Please try again"})   
                }
            }else{
                res.render("login",{message:""})
            }
})
}

module.exports = {db,mysqlQuery};
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


function mysqlQuery(getData){
    console.log(getData);
    
    db.query(getData, (err, data) => {
            if(err){
                console.log(err);
                return false
            }else{
                return true
            }
    });

}

module.exports = {db,mysqlQuery};
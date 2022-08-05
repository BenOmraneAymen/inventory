const {Sequelize} = require('sequelize')
const fs = require('fs');

const sequelize = new Sequelize('mydatabase','user','pass', {
    dialect: 'sqlite',
    host:'./database.sqlite',
    //logging raw sql queries using custom logging function
    "logging": customLogger,
    
})



function customLogger ( queryString, queryObject ) {
    //queryString : a query (insert) missing its values (values replaced by ${number} )
    //queryObject : an array containing values used by the query
    if(queryObject.bind!=null){
        //if queryObject.bind is null , the query does not change the database
    let statment = queryString
    for(i=0;i<queryObject.bind.length+1;i++){
        let temp = '$'+i
        //replacing every ${number} by its correspondant value
        let value = "'"+queryObject.bind[i-1]+"'"
        statment = statment.replace(temp,value)
    }
    //every query string starts with 'Executing (default): '
    statment = statment.replace('Executing (default): ','')
    statment = statment+'\n'
    fs.appendFile('./backup/backup.txt', statment, err => {
        if (err) {
          console.error(err);
        }
      });
    }
}

module.exports = sequelize;  
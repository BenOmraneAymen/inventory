const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sequelize = require('./database')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoute.js')
const typeRoute = require('./routes/typesRoute.js')
const objetRoute = require('./routes/objectsRoute.js')
const cors = require("cors");

dotenv.config()


let port = process.env.PORT || 3000

sequelize.sync({ logging: console.log }).then(()=> {
    console.log('db is ready')
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())

app.use(cors());

app.use('/',authRoute)

app.use('/types',typeRoute)

app.use('/objet',objetRoute)

app.listen(port,()=> {console.log(`listening on port ${port}...`)})
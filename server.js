'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//const PORT = 4000;
const PORT = parseInt(process.env.PORT || '3000');


const employeeRoutes = require('./routes/employee'); //const employeeRoutes = express.Router()


app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

/*this takes control of requests starting with path: /api/employees */
app.use('/api/employees', employeeRoutes); //idk if this corresponse with /todos, todoRoutes

mongoose.connect('mongodb://127.0.0.1:27017/employees', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB database connection established successfully!");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

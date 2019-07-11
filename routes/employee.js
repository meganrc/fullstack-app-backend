'use strict';

const express = require('express');
const router = express.Router();

let Employee = require('../employee.model');

const DATABASE = {};

/* GET employees listing. */ //idk wtf this is
router.get('', function(req, res) {
  return res.send(DATABASE);
});

//GET ALL EMPLOYEES
/* /api/employees/ URL path*/
router.route('/retrieve').get(function(req, res){
  Employee.find(function(err, employees){
    if(err){
      console.log(err);
    } else{
      res.json(employees);
    }
  });
});

//GET ALL EMPLOYEE BY ID
router.route('/:id').get(function(req, res){
  let id = req.params.id;
  Employee.findById(id, function(err, employee){
    res.json(employee);
  });
});

//ADD NEW Employee - send HTTP POST request
router.route('/add').post(function(req, res){
  let employee = new Employee(req.body);
  employee.save()
          .then(employee => {
            res.status(200).json({'employee': 'Employee was added succesfully!'});
          })
          .catch(err => {
            res.status(400).send('cannot add new employee');
          });
});


//UDPATE POST EMPLOYEE by their ID  - send POST Reqeust
router.route('/update/:id').post(function(req, res){
  Employee.findById(req.params.id, function(err, employee){
    if (!employee)
      res.status(404).send("employee not found");
    else
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.hireDate = req.body.hireDate;
      employee.role = req.body.role;
      employee.joke = req.body.joke;
      employee.quote = req.body.quote;

      employee.save().then(employee => {
        res.json("Employee info updated!");
      })
      .catch(err => {
        res.status(400).send("Employee update not possible");
      });
  });
});


//DELETE EMPLOYEE
  router.route('/delete/:id').get(function (req, res) {
    Employee.findByIdAndRemove({_id: req.params.id}, function(err, employee){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
  });


module.exports = router;

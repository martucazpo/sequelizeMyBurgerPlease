var express = require('express');
var router = express.Router();
var getData = function(data){
  return data.dataValues;
};

//module.exports = function (app) {

  var db = require("../models/");

  router.get("/", function(req, res) {
    db.Burger.findAll({}).then(function (data) {
     var hbsObject = {
       burgers : data.map(getData)
     };
      res.render("index", hbsObject );
      console.log(hbsObject);
    
    });
  });


  router.get("/api/burgers", function (req, res) {
    //console.log('cats: ' + Burger);
    db.Burger.findAll({}).then(function (dbBurger) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbBurger);
      
    });
  });


  // The variables cols and vals are arrays.
  router.post("/api/burgers", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Burger.create({
        name: req.body.name,
        devoured: req.body.devoured
      })
      .then(function (dbBurger) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbBurger);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log(condition);
    console.log(req.body);
    db.Burger.update(
       req.body,
      {
        where: {id: req.params.id},
      }).then(
      function(result) {
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          console.log(result);
          //return res.status(404).end();
        }
        res.status(200).end();
  
      });
  });

module.exports = router;
//};
// Export the database functions for the controller (catsController.js).
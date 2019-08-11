var express = require('express');
var router = express.Router();


//module.exports = function (app) {

  var db = require("../models/");

  router.get("/", function(req, res) {
    db.Burger.findAll({}).then(function (dbBurger) {
      res.render("index", {burgers: dbBurger});
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

  router.put("/api/burgers", function (req, res) {
    db.Burger.update({
        devoured: req.body.devoured
      }, {
        where: {
          id: req.body.id
        }
      }).then(function (dBburger) {
        res.json(dBburger);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

module.exports = router;
//};
// Export the database functions for the controller (catsController.js).
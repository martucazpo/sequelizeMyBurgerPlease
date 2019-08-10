var db = require("../models");


module.exports = function (app) {

  app.get("/api/burgers", function (req, res) {
    db.Burgers.findAll({}).then(function (dbBurgers) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbBurgers);
      
    });
  });


  // The variables cols and vals are arrays.
  app.post("/api/burgers", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Burgers.create({
        name: req.body.name,
        devoured: req.body.devoured
      })
      .then(function (dbBurgers) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbBurgers);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  app.put("/api/burgers", function (req, res) {
    db.Burgers.update({
        devoured: req.devoured
      }, {
        where: {
          id: req.body.id
        }
      }).then(function (dBburgers) {
        res.json(dBburgers);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


};
// Export the database functions for the controller (catsController.js).
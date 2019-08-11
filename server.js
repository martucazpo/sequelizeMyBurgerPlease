
var express = require("express");

var PORT = process.env.PORT || 8000;

var app = express();

var db = require('./models');


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.engine("handlebars", exphbs({ layoutsDir: "views/layouts", partialsDir: "views/partials/burgers", defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/api-routes");
//routes = require("./routes/html-routes");
app.use(routes);

db.sequelize.sync({ force: false }).then(function(res) {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

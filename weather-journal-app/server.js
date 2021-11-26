// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors  = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 4000;
const host = "127.0.0.1";
function listening() {
  console.log(host, port);
}
//GET route
app.get("/all", function(req, res){
  res.status(200).send(projectData)
});

//POST route
app.post("/add", function(req, res) {
  projectData = req.body;
  // console.log(projectData);
  res.status(200).send(projectData);
});
app.listen(port, listening);
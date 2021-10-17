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

//GET route
function getAll(request, response) {
  response.status(200).send(projectData);
}
app.get("/all", getAll);

//POST route
function posting(request, response) {
  projectData = request.body;
  console.log(projectData);
  response.status(200).send(projectData);
}
app.post("/add", posting);

// Setup Server
const port = 4000;
const host = "127.0.0.1";

function watch() {
  console.log(host, port);
}
app.listen(port, watch);
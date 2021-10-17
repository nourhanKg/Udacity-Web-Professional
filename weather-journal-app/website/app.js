// const { url } = require("inspector");

/* Global Variables */
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const city = document.querySelector("#city");
const descrip = document.querySelector("#description");
const myServer ="http://127.0.0.1:4000";
const apiURL ="https://api.openweathermap.org/data/2.5/weather?zip=";
const myAPIKey ="&appid=9af97303ca9a609bd7732f6658b613a7&units=metric"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//getting data from user 
const genBtn = document.querySelector("#generate");
function getingData() {
  const zipCode = document.querySelector("#zip").value;
  const feeling = document.querySelector("#feelings").value;

  //get weather update
  getWeatherData(zipCode).then((returnedData) => {
    if(returnedData) {
      const {
        main: { temp },
        weather: [{description}],
        name: city,
      } = returnedData;
      const displayedData = {
        newDate,
        temp,
        description,
        city,
        feeling,
      }
      displayData(myServer + "/add", displayedData);
      updateUI();
      document.getElementById("entry").style.opacity = 1;
    }
  });
}
genBtn.addEventListener("click", getingData);

//getting weather updates
const getWeatherData = async (zipCode) => {
  try {
    const response = await fetch(apiURL + zipCode + myAPIKey); //constructing link
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}
//displaying data
const displayData = async (address = "", data = {}) => {
  const response = await fetch(address, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newDate;
  }
  catch (error) {
    console.log(error);
  }
}
//updating interface
const updateUI = async () => {
  const response = await fetch(myServer + "/all");
  try {
    const savedData = await response.json();
    date.innerHTML = savedData.newDate;
    temp.innerHTML = savedData.temp + "&degC;";
    content.innerHTML = savedData.feeling;
    city.innerHTML = savedData.city;
    descrip.innerHTML = savedData.description;
  }
  catch (error) {
    console.log(error);
  }
}
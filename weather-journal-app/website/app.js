/* Global Variables */
const genBtn = document.querySelector("#generate");

const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const city = document.querySelector("#city");

const myServer ="http://127.0.0.1:4000";
const apiURL ="https://api.openweathermap.org/data/2.5/weather?zip=";
const myAPIKey ="&appid=9af97303ca9a609bd7732f6658b613a7&units=metric"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Event Listener
genBtn.addEventListener("click", getData);

//getting data from user 
function getData() {
  const zipCode = document.querySelector("#zip").value;
  const feeling = document.querySelector("#feelings").value;
  
  //get weather update from API
  getWeatherData(zipCode)
  .then(receivedData => {
    if(!receivedData) {
      throw new Error("City not found");
    }
    console.log(receivedData);
    //deconstructing data
    const {
      main: { temp },
      name: city,
    } = receivedData;
    const Data = {
      newDate,
      temp,
      city,
      feeling,
    }
    //posting data
    displayData(`${myServer}/add`, Data);
    updateUI();
    document.getElementById("entry").style.opacity = 1;
  })
  .catch(err => console.log(err.message))
}

//getting weather updates
const getWeatherData = async function(zipCode) {
  try {
    const response = await fetch(`${apiURL}${zipCode}${myAPIKey}`); //constructing link
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}
//displaying data
const displayData = async function(address = "", data = {}) {
  const response = await fetch(address, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const Data = await response.json();
    return Date;
  }
  catch (error) {
    console.log(error);
  }
}
//updating interface
const updateUI = async function() {
  const response = await fetch(`${myServer}/all`);
  try {
    const Data = await response.json();
    date.innerHTML = Data.newDate;
    temp.innerHTML = Data.temp + "&degC;";
    content.innerHTML = Data.feeling;
    city.innerHTML = Data.city;
  }
  catch (error) {
    console.log(error);
  }
}
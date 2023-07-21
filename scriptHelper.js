// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");
      missionTarget.innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${image}">`;
}

function validateInput(testInput) {
  let testInputValidate = Number(testInput);
  if (testInput === "") {
    return "Empty";

  } else if (isNaN(testInputValidate)) {
    return "Not a Number";

  } else (!isNaN(testInputValidate)) 
    return "Is a Number";
  }
  

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let launchStatus = document.getElementById("launchStatus");
  

  if (validateInput(pilot) === "Empty" ||  validateInput(copilot) === "Empty"||
  validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
    alert ("All fields are required.");

   } else if ( validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
     alert ("Fuel level & cargo level must be a number.");

  } else if (validateInput(pilot) === "Is a Number" ||  validateInput(copilot) === "Is a Number") {
    alert ("Pilot and Co-Pilot must be valid names, no numbers or symbols");

  } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready.`;
    copilotStatus.innerHTML = `Co-Pilot ${copilot} is ready.`;
    list.style.visibility = "visible";
  }

     if (fuelLevel < 10000 && cargoMass > 10000) {
      launchStatus.innerHTML = "Shuttle not ready to Launch!";
      fuelStatus.innerHTML = "Not enough fuel to launch!";
      cargoStatus.innerHTML = "Too much mass in cargo for launch!";
      launchStatus.style.color = "#C7254E";
    
    } else if (fuelLevel > 10000 && cargoMass > 10000) {
      launchStatus.innerHTML = "Shuttle not ready to Launch!";
      cargoStatus.innerHTML = "Too much mass in cargo for launch!";
      launchStatus.style.color = "#C7254E";
  
    } else if (fuelLevel < 10000 && cargoMass < 10000) {
      launchStatus.innerHTML = "Shuttle not ready to Launch!";
      fuelStatus.innerHTML = "Not enough fuel to launch!";
      launchStatus.style.color = "#C7254E";
    
    } else {
      launchStatus.innerHTML = "Shuttle ready to Launch!";
      launchStatus.style.color = "#419F6A";
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json()
       });

    return planetsReturned;
}

function pickPlanet(planets) {
  let randomPlanet = Math.floor(Math.random() * planets.length);
  return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

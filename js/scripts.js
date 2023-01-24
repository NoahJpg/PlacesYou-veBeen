// Business Logic for AddressBook ---------
function Placeslist() {
  this.places = {};
  this.currentId = 0;
}

Placeslist.prototype.addDestination = function (destination) {
  destination.id = this.assignId();
  this.places[destination.id] = destination;
};

Placeslist.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

Placeslist.prototype.findPlace = function (id) {
  if (this.places[id] !== undefined) {
    return this.places[id];
  }
  return false;
};

Placeslist.prototype.deletePlace = function (id) {
  if (this.places[id] === undefined) {
      return false;
  }
  delete this.places[id];
  return true;
};

// Business Logic for Destination ---------
function Destination(location, landmarks, timeOfYear) {
  this.location = location;
  this.landmarks = landmarks;
  this.timeOfYear = timeOfYear;
}

Destination.prototype.fullInfo = function () {
  return this.location
};


// UI Logic

let place = new Placeslist();

function listPlaceDetail(placesToDisplay) {
  let placesDiv = document.querySelector("div#places");
  placesDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(placesToDisplay.places).forEach(function (key) {
      const place = placesToDisplay.findPlace(key);
      const li = document.createElement("li");
      li.append(place.fullInfo());
      li.setAttribute("id", place.id);
      ul.append(li);
  });
  placesDiv.append(ul);
}

function displayPlacesDetails(event) {
  const place = places.findPlace(event.target.id);
  console.log(place + "- place")
  document.querySelector(".city-details").innerText = place.location;
  document.querySelector(".landmark-details").innerText = place.landmarks;
  document.querySelector(".best-season-details").innerText = place.timeOfYear;
  document.querySelector("div#places-details").removeAttribute("class");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputCity = document.querySelector("input#city").value;
  const inputLandmark = document.querySelector("input#landmark").value;
  const inputTime = document.querySelector("input#time").value;
  let newPlace = new Destination(inputCity, inputLandmark, inputTime);
  place.addDestination(newPlace);
  listPlaceDetail(places);
}

window.addEventListener("load", function() {
  document.querySelector("form#new-places").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#places").addEventListener("click", displayPlacesDetails); 
})



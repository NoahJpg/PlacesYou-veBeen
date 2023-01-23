// Business Logic for AddressBook ---------
function Places() {
  this.places = {};
  this.currentId = 0;
}

Places.prototype.addDestination = function (destination) {
  destination.id = this.assignId();
  this.places[destination.id] = destination;
};

Places.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

Places.prototype.findPlace = function (id) {
  if (this.places[id] !== undefined) {
    return this.places[id];
  }
  return false;
};

Places.prototype.deletePlace = function (id) {
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
  return this.location + "'s most famous landmark is " + this.landmarks + " and the best time to visit is " + this.timeOfYear;
};


// UI Logic

let places = new Places();

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

function displayPlacesDetails() {
  console.log("The id of this <li> is " + event.target.id + ".");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputCity = document.querySelector("input#city").value;
  const inputLandmark = document.querySelector("input#landmark").value;
  const inputTime = document.querySelector("input#time").value;
  let newPlace = new Destination(inputCity, inputLandmark, inputTime);
  places.addDestination(newPlace);
  listPlaceDetail(places);
}

window.addEventListener("load", function() {
  document.querySelector("form#new-places").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#places").addEventListener("click", displayPlacesDetails); 
})



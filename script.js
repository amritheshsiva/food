// Initialize Firebase (replace with your own configuration)
var firebaseConfig = {
    apiKey: "AIzaSyC4uXG_kt0odBztUbLtJmpORijmzThl2MM",
    authDomain: "foodflow-420911.firebaseapp.com",
    databaseURL: "https://foodflow-420911-default-rtdb.firebaseio.com",
    projectId: "foodflow-420911",
    storageBucket: "foodflow-420911.appspot.com",
    messagingSenderId: "525890054881",
    appId: "1:525890054881:web:b85c6a6579b3cb4d7265a0",
    measurementId: "G-61RELJP128"
};
firebase.initializeApp(firebaseConfig);

// Reference to the database
var database = firebase.database();

function checkLocation() {
  // Get donor location from the form
  var donorLocation = document.getElementById("donor-location").value;

  // Reference to the registered camps collection
  var campsRef = database.ref("registeredCamps");

  // Clear previous results
  document.getElementById("results").innerHTML = "";

  campsRef.once("value", function(snapshot) {
    var found = false;
    snapshot.forEach(function(childSnapshot) {
      var campData = childSnapshot.val();
      if (campData.location === donorLocation) {
        found = true;
        // Display matched location results
        var result = document.createElement("p");
        result.textContent = "Donation camps available in your location: " + campData.name;
        document.getElementById("results").appendChild(result);
      }
    });
    if (!found) {
      // Display no camps message
      var result = document.createElement("p");
      result.textContent = "No Donation Camps in your location.";
      document.getElementById("results").appendChild(result);
    }
  });
}


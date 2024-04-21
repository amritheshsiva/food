// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4uXG_kt0odBztUbLtJmpORijmzThl2MM",
    authDomain: "foodflow-420911.firebaseapp.com",
    databaseURL: "https://foodflow-420911-default-rtdb.firebaseio.com",
    projectId: "foodflow-420911",
    storageBucket: "foodflow-420911.appspot.com",
    messagingSenderId: "525890054881",
    appId: "1:525890054881:web:4ca8667eda7ef2737265a0",
    measurementId: "G-DWZB59D1YH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Function to compare locations
function compareLocations() {
    var donorLocation = document.getElementById('donorLocation').value;

    // Retrieve registered locations from the database
    database.ref('registeredLocations').once('value', function(snapshot) {
        var locations = snapshot.val();

        // Check if any registered location matches the donor's location
        var foundMatch = false;
        for (var key in locations) {
            if (locations[key] === donorLocation) {
                foundMatch = true;
                break;
            }
        }

        // Display the result based on the match
        var resultContainer = document.getElementById('result');
        if (foundMatch) {
            resultContainer.innerText = "Donation Camps in your location!";
            // Display both locations if needed
            // You can implement this part if required
        } else {
            resultContainer.innerText = "No Donation Camps in your location.";
        }
    });
}

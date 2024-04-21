// Initialize Firebase
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

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Initialize the map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644}, // Default center (can be changed later)
        zoom: 8 // Default zoom level (can be changed later)
    });
}

// Function to compare addresses
function compareAddresses() {
    var donorAddress = document.getElementById('address').value;

    // Fetch addresses from Firebase and compare with donor address
    fetchFirebaseData(donorAddress);
}

// Function to fetch addresses from Firebase
function fetchFirebaseData(donorAddress) {
    database.ref('addresses').once('value', function(snapshot) {
        var closestAddress;
        var minDistance = Infinity;

        snapshot.forEach(function(childSnapshot) {
            var address = childSnapshot.val().address;

            // Perform geocoding for each address
            geocodeAddress(address, function(result) {
                var distance = calculateDistance(result.geometry.location, donorAddress);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestAddress = address;
                }

                // Display map with closest and donor addresses
                if (closestAddress && donorAddress) {
                    displayMap(donorAddress, closestAddress);
                }
            });
        });
    });
}

// Function to perform geocoding
function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            callback(results[0]);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
            callback(null);
        }
    });
}

// Function to calculate distance between two locations
function calculateDistance(location1, location2) {
    // Replace this with your own distance calculation logic
    return google.maps.geometry.spherical.computeDistanceBetween(location1, location2);
}

// Function to display map with donor and closest addresses
function displayMap(donorAddress, closestAddress) {
    geocodeAddress(donorAddress, function(donorResult) {
        geocodeAddress(closestAddress, function(closestResult) {
            if (donorResult && closestResult) {
                // Create markers for donor and closest addresses
                var donorMarker = new google.maps.Marker({
                    map: map,
                    position: donorResult.geometry.location,
                    title: 'Donor Address: ' + donorAddress
                });
                var closestMarker = new google.maps.Marker({
                    map: map,
                    position: closestResult.geometry.location,
                    title: 'Closest Address: ' + closestAddress
                });

                // Center the map on the markers
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(donorMarker.getPosition());
                bounds.extend(closestMarker.getPosition());
                map.fitBounds(bounds);
            }
        });
    });
}

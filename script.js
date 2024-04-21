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

// Function to handle the one-click action
function handleOneClick() {
    // Fetch address from the database
    fetchDatabaseAddress();
    
    // Geocode the donor's address
    var donorAddress = document.getElementById('address').value;
    geocodeAddress(donorAddress)
        .then(donorLocation => {
            // Fetch and compare addresses from the database
            database.ref('addresses').once('value', function(snapshot) {
                var closestAddress;
                var minDistance = Infinity;

                snapshot.forEach(function(childSnapshot) {
                    var address = childSnapshot.val().address;

                    // Geocode the address from the database
                    geocodeAddress(address)
                        .then(databaseLocation => {
                            // Calculate distance between donor's location and database location
                            var distance = calculateDistance(donorLocation, databaseLocation);

                            // Update closest address if distance is smaller
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestAddress = address;
                            }

                            // Display map with closest and donor addresses
                            if (closestAddress && donorAddress) {
                                displayMap(donorLocation, databaseLocation);
                            }
                        })
                        .catch(error => {
                            console.error('Error geocoding database address:', error);
                        });
                });
            });
        })
        .catch(error => {
            console.error('Error geocoding donor address:', error);
        });
}

// Function to fetch address from the database
function fetchDatabaseAddress() {
    // Implement code to fetch address from the database
}

// Function to geocode an address
function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        // Construct the geocoding API URL with your API key
        var apiKey = 'FUFocWgc0wt8XeHKTUMrk49nCTmx26AKQQ9gRKupJ7OOyHnzwiZU7DpM6WVST6uP';
        var apiUrl = 'https://api.distancematrix.ai/maps/api/distancematrix/json?origins=' + encodeURIComponent(address) + '&key=' + apiKey;

        // Make a GET request to the geocoding API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Geocoding API request failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.rows && data.rows.length > 0 && data.rows[0].elements && data.rows[0].elements.length > 0) {
                    // Extract the location from the geocoding response
                    var location = data.rows[0].elements[0].distance;
                    resolve(location);
                } else {
                    throw new Error('No results found');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to calculate distance between two locations
function calculateDistance(location1, location2) {
    // Implement code to calculate distance between two locations
}

// Function to display map with donor and closest addresses
function displayMap(donorLocation, databaseLocation) {
    // Implement code to display the map with markers for donor and closest addresses
}

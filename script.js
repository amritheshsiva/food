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

            // Call distancematrix.ai API to get distance between addresses
            var apiUrl = 'https://api.distancematrix.ai/maps/api/distancematrix/json?origins=' + encodeURI(donorAddress) + '&destinations=' + encodeURI(address) + &key='FUFocWgc0wt8XeHKTUMrk49nCTmx26AKQQ9gRKupJ7OOyHnzwiZU7DpM6WVST6uP';

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var distance = data.rows[0].elements[0].distance.value;

                // Update closest address if distance is smaller
                if (distance < minDistance) {
                    minDistance = distance;
                    closestAddress = address;
                }

                // Display map with closest and donor addresses
                if (closestAddress && donorAddress) {
                    displayMap(donorAddress, closestAddress);
                }
            })
            .catch(error => {
                console.error('Error fetching distance data:', error);
            });
        });
    });
}

// Function to display map with donor and closest addresses
function displayMap(donorAddress, closestAddress) {
    // This function should handle displaying the map with markers for donor and closest addresses
    // You can use Google Maps API or any other mapping library to implement this functionality
}

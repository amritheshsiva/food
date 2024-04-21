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
  fetchDatabaseAddress()
    .then(databaseAddress => {
      // Geocode the donor's address
      var donorAddress = document.getElementById('address').value;
      geocodeAddress(donorAddress)
        .then(donorLocation => {
          // Compare addresses with fetched database address
          compareAddresses(databaseAddress, donorLocation);
        })
        .catch(error => {
          console.error('Error geocoding donor address:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching database address:', error);
    });
}

// Function to fetch address from the database
function fetchDatabaseAddress() {
  return new Promise((resolve, reject) => {
    database.ref('addresses').once('value', function (snapshot) {
      if (snapshot.val()) {
        // Assuming there's only one address in the 'addresses' node
        resolve(snapshot.val().address);
      } else {
        reject(new Error('No address found in the database'));
      }
    });
  });
}

// Function to geocode an address
function geocodeAddress(address) {
  // Replace with your valid API key from a geocoding service
  var apiKey = 'FUFocWgc0wt8XeHKTUMrk49nCTmx26AKQQ9gRKupJ7OOyHnzwiZU7DpM6WVST6uP'; // Placeholder, replace with your actual key

  var apiUrl = 'https://api.distancematrix.ai/maps/api/distancematrix/json?origins=' + encodeURIComponent(address) + '&key=' + apiKey;

  return new Promise((resolve, reject) => {
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
  // Implement your logic here based on the location objects (likely containing latitude and longitude)
  // You can use the Haversine formula or other distance calculation methods

  // Example using Haversine formula (replace with your preferred method):
  var lat1 = location1.latitude;
  var lon1 = location1.longitude;
  var lat2 = location2.latitude;
  var lon2 = location2.longitude;

  var R = 6371e3; // meters = earth's radius
  var φ1 = radians(lat1);
  var φ2 = radians(lat2);
  var Δφ = radians(lat2 - lat1);
  var Δλ = radians(lon2 - lon1);

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = R * c;

  return distance;
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

// Function to compare addresses and display map (modified)
function compareAddresses(databaseAddress, donorLocation) {
  geocodeAddress(databaseAddress)
    .then(databaseLocation => {
      var distance = calculateDistance(donorLocation, databaseLocation);
      console.log(`Closest address: ${databaseAddress} (distance: ${distance} meters)`);

      // Prepare data for map display (assuming you have a mapping library)
      var mapData = {
        donorMarker: {
          latitude: donorLocation.latitude,
          longitude: donorLocation.longitude,
          label: "Your Address"
        },
        closestMarker: {
          latitude: databaseLocation.latitude,
          longitude: databaseLocation.longitude,
          label: databaseAddress
        }
      };

      // Call your mapping library function to display the map with markers (replace with your actual logic)
      displayMap(mapData);
    })
    .catch(error => {
      console.error('Error geocoding database address:', error);
    });
}


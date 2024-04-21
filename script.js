// Your web app's Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
var database = firebase.database();

// Reference to a specific location in the database
var dataRef = database.ref('path/to/data');

// Retrieve data in real-time
dataRef.on('value', function(snapshot) {
  var data = snapshot.val();
  console.log(data);
  // Handle the retrieved data here, e.g., update UI
});

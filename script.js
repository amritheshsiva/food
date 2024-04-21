// Retrieve data once
dataRef.once('value', function(snapshot) {
  var data = snapshot.val();
  console.log(data); // <- Data is logged here
  // Handle the retrieved data here
});

// Or, retrieve data in real-time
dataRef.on('value', function(snapshot) {
  var data = snapshot.val();
  console.log(data); // <- Data is logged here
  // Handle the retrieved data here
});

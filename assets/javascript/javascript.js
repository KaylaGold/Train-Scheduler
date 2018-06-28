// Initialize Firebase        

let config = {
    apiKey: "AIzaSyDm0liGnmCTQiGGVrmWUvLozma0EsBgpUY",
    authDomain: "train-schedule-d04d3.firebaseapp.com",
    databaseURL: "https://train-schedule-d04d3.firebaseio.com",
    projectId: "train-schedule-d04d3",
    storageBucket: "train-schedule-d04d3.appspot.com",
    messagingSenderId: "678925602282"
  };
  firebase.initializeApp(config);
  
  // Create a variable to reference the database.
  let database = firebase.database();
  
  
  // Create Button to add trains
  $("#train btn btn-primary").on("click", function(event){
    // Makes sure form doesnt perform via default nad refreshes the page
    event.preventDefault();
  
    //Grab user input from the form
    let trainName = $("#name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let initialTime = $("#trainTime-input").val().trim();
    let frequency = $("#frequency-input").val().trim();
    
    // Create local "temporary" object for holding new train data when input by user
    let newTrain = {
      trainName:trainName,
        destination: destination,
        initialTime: initialTime,
        frequency: frequency, 
        
    }
  
  // Upload new train data to the database
  database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.initialTime);
    console.log(newTrain.frequency);
  
  
  
  // Alert
  alert("New Train Successfully Added!");
  
  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#trainTime-input").val("");
  $("#frequency").val("");
  
  });
  
  //Create Firebase event for adding new train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
     // Store everything into a variable
  let trainName = childSnapshot.val().trainName;
  let destination = childSnapshot.val().destination;
  let initialTime = childSnapshot.val().initialTime;
  let frequency = childSnapshot.val().frequency; 
  
  
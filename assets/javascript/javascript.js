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
  $("#trainBtn").on("click", function(event){
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
  
// Convert the time
let firstTrTimeConverted = moment(initialTime, "HH:mm");
console.log(firstTrTimeConverted);

//Current Time
let currentTime = moment().format("HH:mm");
// Calculating difference in time between current time and converted time
let diffInTime = moment().diff(moment(firstTrTimeConverted), "minutes");

// Determining the remainder of time left
let timeRemainder = diffInTime % frequency;


// From the remainder, determining the time away the train is based on frequency
let minutesAway = frequency - timeRemainder;


// Calculating the next train time based on the current time and minutesAway
let nextTrain = moment().add(minutesAway, "minutes").format("HH:mm"); 


// Creating table containing information in database and appending when new data is created

$("#new-train").append("<tr><td>" + trainName + 
"</td><td>" + destination + "</td><td>" + frequency + 
 "</td><td>" + nextTrain +  "</td><td>" + minutesAway + "</td></tr>");
 
  });
  


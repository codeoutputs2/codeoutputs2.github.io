// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDzXeLZ4CN9eWbsUByJG83-LyAtxlOlj9c",
  authDomain: "simplemessaging-c251f.firebaseapp.com",
  databaseURL: "https://simplemessaging-c251f-default-rtdb.firebaseio.com",
  projectId: "simplemessaging-c251f",
  storageBucket: "simplemessaging-c251f.appspot.com",
  messagingSenderId: "544113655157",
  appId: "1:544113655157:web:30ae0028849e3c34f4e73c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
var password = prompt("Please Enter Your Password");
while (password != "rutspassword" && password != "adminspassword") {
  password = prompt("Please Enter Your Password");
}
username = password=="adminspassword" ? "Haldun" : "Rut";


// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";
  console.log(message)

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

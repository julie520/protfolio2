function validateForm(event) {
  event.preventDefault();

  const form = document.forms["myForm"];
  const name = form["name"].value;
  const email = form["email"].value;
  const message = form["message"].value;

  if (name == "") {
    alert("Please input name");
    form["name"].focus();
    return false;
  } 

  if (email == "") {
    alert("Please input email");
    form["email"].focus();
    return false;
  } 

  if (message == "") {
    alert("Please input message");
    form["message"].focus();
    return false;
  } 

  sendMessage({name, email, message});  
}


const sendMessage = (data) => {
  let result = document.querySelector('.result'); 

// Creating a XHR object 
  let xhr = new XMLHttpRequest(); 
  let url = "https://meetup-ape.herokuapp.com/api/contact/send-message"; 
  // open a connection 
  xhr.open("POST", url, true); 
  xhr.withCredentials = true

  // Set the request header i.e. which type of content you are sending 
  xhr.setRequestHeader("Content-Type", "application/json"); 

  // Create a state change callback 
  xhr.onreadystatechange = function () { 
      if (xhr.readyState === 4 && xhr.status === 200) { 

          var jsonResponse = JSON.parse(this.responseText);
        // {"message":"Your request was accepted successfully"}
          // console.log(jsonResponse.message);
          result.innerHTML = jsonResponse.message; 
          toggleModal();
      } 
  }; 

  // Converting JSON data to string 
  var data = JSON.stringify(data); 

  // Sending data with the request 
  xhr.send(data); 
}


var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

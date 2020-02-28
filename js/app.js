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
  xhr.withCredentials = false

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

 // Navigation scroll
  // Select all links with hashes
  // https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
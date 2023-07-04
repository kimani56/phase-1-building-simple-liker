// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const errorModalMessage = document.getElementById("modal-message");

  // Hide error modal on page load
  errorModal.classList.add("hidden");

  // Function to toggle heart state
  function toggleHeart(heart) {
    if (heart.innerText === EMPTY_HEART) {
      heart.innerText = FULL_HEART;
      heart.classList.add("activated-heart");
    } else {
      heart.innerText = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  }

  // Function to handle server response
  function handleServerResponse() {
    mimicServerCall()
      .then(() => {
        // Heart clicked, change to full heart
        toggleHeart(this);
      })
      .catch((error) => {
        // Server error, display error modal
        errorModalMessage.innerText = error;
        errorModal.classList.remove("hidden");
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  }

  // Attach click event listener to all like buttons
  const likeButtons = document.getElementsByClassName("like");
  Array.from(likeButtons).forEach((button) => {
    button.addEventListener("click", handleServerResponse);
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const trackingForm = document.getElementById("tracking-form");
    const  notesContainer = document.getElementById("notes-container");
    const tipsContainer = document.getElementById("tips-container");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
 
      const isValidLogin = username === "aurasync" && password === "aurasync";
  
      if (isValidLogin) {
    
        window.location.href = "./index.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  
  
    if (trackingForm && notesContainer && tipsContainer) {
      trackingForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
     
        const date = document.getElementById("date").value;
        const mood = document.getElementById("mood").value;
  
        displayNotesandTips(mood);
    
        console.log("Date:", date);
        console.log("Mood:", mood);
  
  
      });
    }
    function displayNotesandTips(selectedMood) {

      const moodNotes = "Your custom notes for this mood..."
      const moodTips = {
        happy: "Tips for a happy mood...",
        sad: "Tips for a sad mood...",
        relaxed: "Tips for a relaxed mood...",
      
      };
      notesContainer.textContent = "Notes: " + moodNotes;
   
      tipsContainer.textContent = "Tips: " + (moodTips[selectedMood] || "No tips available for this mood.");
    }
  });
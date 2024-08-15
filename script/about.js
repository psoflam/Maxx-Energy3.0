'use strict'

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const accessKey = "b7eb3829-3c99-49c5-bdf4-e8ebfcbd1077";
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      formData.append("access_key", accessKey);
  
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Failed to send the message. Please try again later.");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    });
  });
  
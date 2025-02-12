function loadTask(taskId) {
  const contentDiv = document.getElementById("content");
  const taskListDiv = document.getElementById("task-list");

  // Hide the task list
  taskListDiv.style.display = "none";

  // Clear current content except for the back button
  contentDiv.innerHTML = "";

  // Create a Back button to return to the task list
  const backButton = document.createElement("button");
  backButton.innerText = "Back to Task List";
  backButton.id = "back-button";

  // Attach the event listener to the back button before adding it to contentDiv
  backButton.addEventListener("click", function () {
    console.log("Back button clicked");
    taskListDiv.style.display = "block"; // Show the task list again
    contentDiv.innerHTML = ""; // Clear current content
  });

  contentDiv.appendChild(backButton);

  // Load HTML content
  fetch(`questions/${taskId}/index.html`)
    .then((response) => response.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html; // Create a div with the loaded HTML
      contentDiv.appendChild(div); // Append the content to contentDiv
    })
    .catch((error) => {
      console.error("Error loading HTML:", error);
      contentDiv.innerHTML +=
        "<p>Error loading HTML content. Please try again later.</p>";
    });

  // Load CSS content
  fetch(`questions/${taskId}/style.css`)
    .then((response) => response.text())
    .then((css) => {
      // Create a new <style> element and insert the CSS into the <head>
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = css;
      styleSheet.setAttribute("data-task-id", taskId); // Optional attribute to identify styles
      document.head.appendChild(styleSheet);
    })
    .catch((error) => {
      console.error("Error loading CSS:", error);
      const fallbackCSS = `
            body {
              background-color: #f0f0f0;
              color: #333;
            }
            p {
              color: red;
            }
          `;
      // Fallback CSS if the CSS file is not loaded
      const fallbackStyleSheet = document.createElement("style");
      fallbackStyleSheet.type = "text/css";
      fallbackStyleSheet.innerText = fallbackCSS;
      document.head.appendChild(fallbackStyleSheet);
    });
}

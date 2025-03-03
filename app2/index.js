document.getElementById("get-btn").addEventListener("click", getUsers);

function getUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("GET response:", data);

      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";

      if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No players yet.</p>";
        return;
      }

      data.forEach((user, index) => {
        if (user.name && user.move) {
          resultsContainer.innerHTML += `<p>Player ${index + 1}: ${
            user.name
          } chose ${user.move}</p>`;
        }
      });

      const result = data.find((item) => item.result);
      if (result) {
        resultsContainer.innerHTML += `<h2>${result.result}</h2>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching users.");
    });
}

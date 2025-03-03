const statusContainer = document.getElementById("status-container");
const choicesContainer = document.getElementById("choices-container");
const resultContainer = document.getElementById("result-container");

function fetchGameStatus() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);

      if (!data.users) {
        console.error("Error: 'users' is undefined in the response.");
        return;
      }

      const { users, countdown, result } = data;

      if (users.length === 1) {
        statusContainer.innerHTML = `<p>Waiting for the other player... ${countdown} seconds remaining.</p>`;
        choicesContainer.innerHTML = `<p>Player 1: ${users[0].name} chose ${users[0].move}</p>`;
        resultContainer.innerHTML = "";
      } else if (users.length === 2) {
        statusContainer.innerHTML = "";

        choicesContainer.innerHTML = users
          .map(
            (user, index) =>
              `<p>Player ${index + 1}: ${user.name} chose ${user.move}</p>`
          )
          .join("");

        if (result) {
          resultContainer.innerHTML = `<h2>${result}</h2>`;
        }
      } else {
        statusContainer.innerHTML = "<p>Waiting for players...</p>";
        choicesContainer.innerHTML = "";
        resultContainer.innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

setInterval(fetchGameStatus, 1000);

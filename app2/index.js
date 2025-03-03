const resultsContainer = document.getElementById("results-container");
const countdownContainer = document.getElementById("countdown-container");

let countdown = 0; // Counter
let countdownInterval = null;

function fetchUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => {
      updateResults(data);

      const result = data.find((item) => item.result);
      if (result && !countdownInterval) {
        startCountdown();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateResults(users) {
  resultsContainer.innerHTML = "";

  if (users.length === 0) {
    resultsContainer.innerHTML = "<p>No players yet.</p>";
    return;
  }

  users.forEach((user, index) => {
    if (user.name && user.move) {
      resultsContainer.innerHTML += `<p>Player ${index + 1}: ${
        user.name
      } chose ${user.move}</p>`;
    }
  });

  const result = users.find((item) => item.result);
  if (result) {
    resultsContainer.innerHTML += `<h2>${result.result}</h2>`;
  }
}

function startCountdown() {
  countdown = 10;
  countdownInterval = setInterval(() => {
    countdownContainer.innerHTML = `<p>Game reset in ${countdown} seconds...</p>`;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownContainer.innerHTML = "";
      resultsContainer.innerHTML = "<p>No players yet.</p>";
    }
  }, 1000);
}

//POLLING 1 second
setInterval(fetchUsers, 1000);

function getUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => console.log("get response", data))
    .catch((error) => console.error("Error:", error));
}

const addUser = () => {
  const playerName = document.getElementById("player1").value;
  const selectedMove = document.querySelector('input[type="radio"]:checked');

  if (!selectedMove) {
    alert("Please select a move");
    return;
  }

  const move = selectedMove.value;

  const user = {
    name: playerName,
    move: move,
  };

  fetch("http://localhost:5050/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => console.log("post response", data))
    .catch((error) => console.error("Error:", error));
};

document.getElementById("add-btn").addEventListener("click", addUser, getUsers);

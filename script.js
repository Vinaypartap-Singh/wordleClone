// pending : remove code related to guess list and make clues visible on tiles and user will be able to type even if the hints are visible

// Function to show the game screen
function showGameScreen() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("game").style.display = "block";
  var keyboardRows = document.getElementsByClassName("keyboard-row");
  for (var i = 0; i < keyboardRows.length; i++) {
    keyboardRows[i].style.display = "flex";
  }
  document.getElementById("board").style.display = "flex";
}

// Global variables
var row = 0;
var col = 0;
var correctGuesses = localStorage.getItem("correctGuesses")
  ? parseInt(localStorage.getItem("correctGuesses"))
  : 0;
var totalGuesses = localStorage.getItem("totalGuesses")
  ? parseInt(localStorage.getItem("totalGuesses"))
  : 0;
var score =
  totalGuesses > 0 ? Math.round((correctGuesses / totalGuesses) * 100) : 0;
document.getElementById("score").innerText = `Your Score: ${score}%`;
var gameOver = false;
var word = "";
var height = 1;
var width = 0;
var definitionClues = [];
var letterClues = [];

// Function to get the data for the current day
function getDailyData() {
  let today = new Date().toISOString().split("T")[0];
  fetch("dailyData.json")
    .then((response) => response.json())
    .then((data) => {
      const todayData = data.find((entry) => entry.Date === today);
      if (todayData) {
        word = todayData.Word.toUpperCase();
        definitionClues = [
          todayData.DefinitionClue1,
          todayData.DefinitionClue2,
          todayData.DefinitionClue3,
          todayData.DefinitionClue4,
          todayData.DefinitionClue5,
        ];
        letterClues = [
          todayData.LetterClue1,
          todayData.LetterClue2,
          todayData.LetterClue3,
          todayData.LetterClue4,
          todayData.LetterClue5,
        ];
        width = word.length;
        initialize();
        checkDailyLimit();
      } else {
        console.error("No data found for today");
      }
    })
    .catch((error) => console.error("Error fetching daily data:", error));
}

window.onload = function () {
  getDailyData();
};

// Function to initialize the game
function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  for (let i = 0; i < keyboard.length; i++) {
    let currRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < currRow.length; j++) {
      let keyTile = document.createElement("div");
      let key = currRow[j];
      keyTile.innerText = key;
      if (key == "Enter") {
        keyTile.id = "Enter";
      } else if (key == "⌫") {
        keyTile.id = "Backspace";
      } else if ("A" <= key && key <= "Z") {
        keyTile.id = "Key" + key;
      }

      keyTile.addEventListener("click", processKey);

      if (key == "Enter") {
        keyTile.classList.add("enter-key-tile");
      } else {
        keyTile.classList.add("key-tile");
      }
      keyboardRow.appendChild(keyTile);
    }
    document.body.appendChild(keyboardRow);
  }

  document.addEventListener("keyup", (e) => {
    processInput(e);
  });

  displayClues();
}

// Function to display clues
function displayClues() {
  for (let i = 0; i < definitionClues.length; i++) {
    let clue = document.createElement("div");
    clue.classList.add("clue");
    clue.innerText = `Clue ${i + 1}: ${definitionClues[i]} (Position ${
      letterClues[i]
    })`;
    document.getElementById("clues").appendChild(clue);
  }
}

// Function to process key input
function processKey() {
  e = { code: this.id };
  processInput(e);
}

// Function to process user input
function processInput(e) {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    while (col < width) {
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      if (currTile.innerText == "") {
        currTile.innerText = e.code[3];
        col += 1;
        break;
      }
      col += 1;
    }
  } else if (e.code == "Backspace") {
    while (col > 0) {
      col -= 1;
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      if (currTile.innerText != "") {
        currTile.innerText = "";
        break;
      }
    }
  } else if (e.code == "Enter") {
    update();
  }

  if (!gameOver && row == height) {
    gameOver = true;
    document.getElementById("answer").innerText = word;
    document.getElementById("play-again").style.display = "block";
  }
}

// Function to update the game state
function update() {
  let guess = "";
  document.getElementById("answer").innerText = "";

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;
    guess += letter;
  }

  guess = guess.toLowerCase();

  let correct = 0;
  let letterCount = {};
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
      letterCount[letter] = 1;
    }
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correct");
      let keyTile = document.getElementById("Key" + letter);
      keyTile.classList.remove("present");
      keyTile.classList.add("correct");
      correct += 1;
      letterCount[letter] -= 1;
    }

    if (correct == width) {
      document.getElementById("answer").innerText =
        "You guessed the correct word. Click Play again to restart the game";

      correctGuesses += 1;
      totalGuesses += 1;
      localStorage.setItem("correctGuesses", correctGuesses.toString());
      localStorage.setItem("totalGuesses", totalGuesses.toString());
      updateScore();

      gameOver = true;
      document.getElementById("play-again").style.display = "block";
      setCookie("playedToday", "true", 1);
    }
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    if (!currTile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currTile.classList.add("present");
        let keyTile = document.getElementById("Key" + letter);
        if (!keyTile.classList.contains("correct")) {
          keyTile.classList.add("present");
        }
        letterCount[letter] -= 1;
      } else {
        currTile.classList.add("absent");
        let keyTile = document.getElementById("Key" + letter);
        keyTile.classList.add("absent");
      }
    }
  }

  row += 1;
  col = 0;
}

// Function to update the score
function updateScore() {
  var score =
    totalGuesses > 0 ? Math.round((correctGuesses / totalGuesses) * 100) : 0;
  localStorage.setItem("score", score.toString());
  document.getElementById("score").innerText = `Your Score: ${score}%`;
}

// Function to reset the game
function resetGame() {
  location.reload();
}

// Function to check if the daily limit is reached
function checkDailyLimit() {
  let today = new Date().toISOString().split("T")[0];
  if (
    localStorage.getItem("playedToday") === "true" &&
    localStorage.getItem("lastDate") === today
  ) {
    alert("You have already played today's puzzle. Please come back tomorrow!");
    document.getElementById("answer").innerText =
      "You have already played today's puzzle. Please come back tomorrow!";
    gameOver = true;
  } else {
    localStorage.setItem("lastDate", today);
  }
}

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to erase a cookie
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

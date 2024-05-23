var wordList = ["maintenance"];
var guessList = ["javascript", "python", "rust", "springboot"];

var row = 0; // current guess (attempt #)
var col = 0; // current letter for that attempt

// Get the score from localStorage
var correctGuesses = localStorage.getItem("correctGuesses")
  ? parseInt(localStorage.getItem("correctGuesses"))
  : 0;
var totalGuesses = localStorage.getItem("totalGuesses")
  ? parseInt(localStorage.getItem("totalGuesses"))
  : 0;

// Calculate the score percentage
var score =
  totalGuesses > 0 ? Math.round((correctGuesses / totalGuesses) * 100) : 0;
document.getElementById("score").innerText = `Your Score: ${score}%`;

var gameOver = false;

guessList = guessList.concat(wordList);

function getDailyWord() {
  let lastDate = localStorage.getItem("lastDate");
  let today = new Date().toISOString().split("T")[0];

  if (lastDate !== today) {
    let newWord =
      wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    localStorage.setItem("word", newWord);
    localStorage.setItem("lastDate", today);
    return newWord;
  } else {
    return localStorage.getItem("word");
  }
}

var word = getDailyWord();
console.log(word);

var height = 1; // number of guesses
var width = word.length; // length of the word

window.onload = function () {
  initialize();
  checkDailyLimit();
};

function initialize() {
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Create the keyboard
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

  // Listen for Key Press
  document.addEventListener("keyup", (e) => {
    processInput(e);
  });
}

function processKey() {
  e = { code: this.id };
  processInput(e);
}

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

  if (!guessList.includes(guess)) {
    // Increment total guesses and update the score
    totalGuesses += 1;
    localStorage.setItem("totalGuesses", totalGuesses.toString());
    updateScore();
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

      // Increment correct guesses and total guesses, then update the score
      correctGuesses += 1;
      totalGuesses += 1;
      localStorage.setItem("correctGuesses", correctGuesses.toString());
      localStorage.setItem("totalGuesses", totalGuesses.toString());
      updateScore();

      gameOver = true;
      document.getElementById("play-again").style.display = "block";
      localStorage.setItem("playedToday", "true");
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

function updateScore() {
  // Calculate and update the score percentage
  var score =
    totalGuesses > 0 ? Math.round((correctGuesses / totalGuesses) * 100) : 0;
  localStorage.setItem("score", score.toString());
  document.getElementById("score").innerText = `Your Score: ${score}%`;
}

function resetGame() {
  location.reload();
}

function checkDailyLimit() {
  let lastDate = localStorage.getItem("lastDate");
  let today = new Date().toISOString().split("T")[0];

  if (localStorage.getItem("playedToday") === "true" && lastDate === today) {
    alert("You have already played today's puzzle. Please come back tomorrow!");
    document.getElementById("answer").innerText =
      "You have already played today's puzzle. Please come back tomorrow!";
    gameOver = true;
  }
}

// document.getElementsByClassName(".keyboard-row").style.display = "flex"

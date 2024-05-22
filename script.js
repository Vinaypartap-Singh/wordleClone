// var wordList = ["peace", "flush", "catty"];

// var guessList = ["bijou", "biked", "biker", "bikes"];

// var height = 6; //number of guesses
// var width = 5; //length of the word

// var row = 0; //current guess (attempt #)
// var col = 0; //current letter for that attempt

// var score = localStorage.getItem("score")
//   ? parseInt(localStorage.getItem("score"))
//   : 0;

// // var getScore = parseInt(localStorage.getItem("score"));
// document.getElementById("score").innerText = `Your Score: ${score}`;

// var gameOver = false;
// // var word = "SQUID";

// guessList = guessList.concat(wordList);
// console.log(guessList);

// var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
// console.log(word);

// window.onload = function () {
//   intialize();
// };

// function intialize() {
//   // Create the game board
//   for (let r = 0; r < height; r++) {
//     for (let c = 0; c < width; c++) {
//       // <span id="0-0" class="tile">P</span>
//       let tile = document.createElement("span");
//       tile.id = r.toString() + "-" + c.toString();
//       tile.classList.add("tile");
//       tile.innerText = "";
//       document.getElementById("board").appendChild(tile);
//     }
//   }

//   // Create the key board
//   let keyboard = [
//     ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//     ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
//     ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
//   ];

//   for (let i = 0; i < keyboard.length; i++) {
//     let currRow = keyboard[i];
//     let keyboardRow = document.createElement("div");
//     keyboardRow.classList.add("keyboard-row");

//     for (let j = 0; j < currRow.length; j++) {
//       let keyTile = document.createElement("div");

//       let key = currRow[j];
//       keyTile.innerText = key;
//       if (key == "Enter") {
//         keyTile.id = "Enter";
//       } else if (key == "⌫") {
//         keyTile.id = "Backspace";
//       } else if ("A" <= key && key <= "Z") {
//         keyTile.id = "Key" + key; // "Key" + "A";
//       }

//       keyTile.addEventListener("click", processKey);

//       if (key == "Enter") {
//         keyTile.classList.add("enter-key-tile");
//       } else {
//         keyTile.classList.add("key-tile");
//       }
//       keyboardRow.appendChild(keyTile);
//     }
//     document.body.appendChild(keyboardRow);
//   }

//   // Listen for Key Press
//   document.addEventListener("keyup", (e) => {
//     processInput(e);
//   });
// }

// function revealRandomLetters() {
//   const numReveals = Math.floor(width / 3); // Adjust this value as needed
//   const revealedPositions = new Set();

//   while (revealedPositions.size < numReveals) {
//     const randomIndex = Math.floor(Math.random() * width);
//     revealedPositions.add(randomIndex);
//   }

//   let hintsContainer = document.createElement("div");
//   hintsContainer.id = "hints";
//   hintsContainer.classList.add("hints-container");
//   document.body.appendChild(hintsContainer);

//   revealedPositions.forEach((pos) => {
//     let hint = document.createElement("div");
//     hint.classList.add("hint");
//     hint.innerHTML = `Hint: ${word[pos].toUpperCase()}`;
//     hintsContainer.appendChild(hint);
//   });

//   document.getElementById("hintBtn").style.display = "none";
// }

// function processKey() {
//   e = { code: this.id };
//   processInput(e);
// }

// function processInput(e) {
//   if (gameOver) return;

//   // alert(e.code);
//   if ("KeyA" <= e.code && e.code <= "KeyZ") {
//     if (col < width) {
//       let currTile = document.getElementById(
//         row.toString() + "-" + col.toString()
//       );
//       if (currTile.innerText == "") {
//         currTile.innerText = e.code[3];
//         col += 1;
//       }
//     }
//   } else if (e.code == "Backspace") {
//     if (0 < col && col <= width) {
//       col -= 1;
//     }
//     let currTile = document.getElementById(
//       row.toString() + "-" + col.toString()
//     );
//     currTile.innerText = "";
//   } else if (e.code == "Enter") {
//     update();
//   }

//   if (!gameOver && row == height) {
//     gameOver = true;
//     document.getElementById("answer").innerText = word;
//   }
// }

// function update() {
//   let guess = "";
//   document.getElementById("answer").innerText = "";

//   // string up the guesses into the word
//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;
//     guess += letter;
//   }

//   guess = guess.toLowerCase(); // case sensitive

//   // Resetting the correct variable and letter count
//   let correct = 0;
//   let letterCount = {};
//   for (let i = 0; i < word.length; i++) {
//     let letter = word[i];
//     if (letterCount[letter]) {
//       letterCount[letter] += 1;
//     } else {
//       letterCount[letter] = 1;
//     }
//   }

//   if (!guessList.includes(guess)) {
//     if (score > 0) {
//       score -= 1;
//       localStorage.setItem("score", score.toString()); // Update local storage score
//       document.getElementById("score").innerText = `Your Score: ${score}`; // Display updated score
//     }
//   }

//   // Check each guessed letter against the word
//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;

//     // If the letter is in the correct position
//     if (word[c] == letter) {
//       currTile.classList.add("correct");
//       let keyTile = document.getElementById("Key" + letter);
//       keyTile.classList.remove("present");
//       keyTile.classList.add("correct");
//       correct += 1;
//       letterCount[letter] -= 1;
//     }

//     if (correct == width) {
//       // If the entire word is guessed correctly
//       document.getElementById("answer").innerText =
//         "You Guessed the correct word. Click Play again to restart the game";
//       score += 1;
//       localStorage.setItem("score", score.toString()); // Update local storage score
//       document.getElementById("score").innerText = `Your Score: ${score}`; // Display updated score
//       gameOver = true;
//       document.getElementById("play-again").style.display = "block";
//     }
//   }

//   // Mark present or absent letters
//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;

//     if (!currTile.classList.contains("correct")) {
//       if (word.includes(letter) && letterCount[letter] > 0) {
//         currTile.classList.add("present");
//         let keyTile = document.getElementById("Key" + letter);
//         if (!keyTile.classList.contains("correct")) {
//           keyTile.classList.add("present");
//         }
//         letterCount[letter] -= 1;
//       } else {
//         currTile.classList.add("absent");
//         let keyTile = document.getElementById("Key" + letter);
//         keyTile.classList.add("absent");
//       }
//     }
//   }

//   row += 1;
//   col = 0;
// }

// function resetGame() {
//   row = 0;
//   col = 0;
//   gameOver = false;

//   // Clear the board
//   for (let r = 0; r < height; r++) {
//     for (let c = 0; c < width; c++) {
//       let currTile = document.getElementById(r.toString() + "-" + c.toString());
//       currTile.innerText = "";
//       currTile.className = "tile"; // Reset class
//     }
//   }

//   // Clear the keyboard
//   let keyTiles = document.querySelectorAll(".key-tile, .enter-key-tile");
//   keyTiles.forEach((keyTile) => {
//     keyTile.className = keyTile.classList.contains("enter-key-tile")
//       ? "enter-key-tile"
//       : "key-tile";
//   });

//   // Reset the word to a new random word from the word list
//   word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
//   console.log(word);

//   // Hide the "Play Again" button
//   document.getElementById("answer").innerText = "";
// }

// var wordList = ["mongoose", "express", "nodejs"];
// var guessList = ["javascript", "python", "rust", "springboot"];

// var row = 0; // current guess (attempt #)
// var col = 0; // current letter for that attempt

// var score = localStorage.getItem("score")
//   ? parseInt(localStorage.getItem("score"))
//   : 0;

// document.getElementById("score").innerText = `Your Score: ${score}`;

// var gameOver = false;

// guessList = guessList.concat(wordList);

// var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
// console.log(word);

// var height = 1; // number of guesses
// var width = word.length; // length of the word

// window.onload = function () {
//   initialize();
//   revealRandomLetters();
// };

// function initialize() {
//   // Create the game board
//   for (let r = 0; r < height; r++) {
//     for (let c = 0; c < width; c++) {
//       let tile = document.createElement("span");
//       tile.id = r.toString() + "-" + c.toString();
//       tile.classList.add("tile");
//       tile.innerText = "";
//       document.getElementById("board").appendChild(tile);
//     }
//   }

//   // Create the keyboard
//   let keyboard = [
//     ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//     ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
//     ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
//   ];

//   for (let i = 0; i < keyboard.length; i++) {
//     let currRow = keyboard[i];
//     let keyboardRow = document.createElement("div");
//     keyboardRow.classList.add("keyboard-row");

//     for (let j = 0; j < currRow.length; j++) {
//       let keyTile = document.createElement("div");

//       let key = currRow[j];
//       keyTile.innerText = key;
//       if (key == "Enter") {
//         keyTile.id = "Enter";
//       } else if (key == "⌫") {
//         keyTile.id = "Backspace";
//       } else if ("A" <= key && key <= "Z") {
//         keyTile.id = "Key" + key;
//       }

//       keyTile.addEventListener("click", processKey);

//       if (key == "Enter") {
//         keyTile.classList.add("enter-key-tile");
//       } else {
//         keyTile.classList.add("key-tile");
//       }
//       keyboardRow.appendChild(keyTile);
//     }
//     document.body.appendChild(keyboardRow);
//   }

//   // Listen for Key Press
//   document.addEventListener("keyup", (e) => {
//     processInput(e);
//   });
// }

// function revealRandomLetters() {
//   const numReveals = Math.floor(width / 3); // Adjust this value as needed
//   const revealedPositions = new Set();

//   while (revealedPositions.size < numReveals) {
//     const randomIndex = Math.floor(Math.random() * width);
//     revealedPositions.add(randomIndex);
//   }

//   revealedPositions.forEach((pos) => {
//     let hintTile = document.getElementById("0-" + pos);
//     hintTile.innerText = word[pos];
//     hintTile.classList.add("hint-tile");
//   });

//   document.getElementById("hintBtn").style.display = "none";
// }

// function processKey() {
//   e = { code: this.id };
//   processInput(e);
// }

// function processInput(e) {
//   if (gameOver) return;

//   if ("KeyA" <= e.code && e.code <= "KeyZ") {
//     while (col < width) {
//       let currTile = document.getElementById(
//         row.toString() + "-" + col.toString()
//       );
//       if (
//         currTile.innerText == "" &&
//         !currTile.classList.contains("hint-tile")
//       ) {
//         currTile.innerText = e.code[3];
//         col += 1;
//         break;
//       }
//       col += 1;
//     }
//   } else if (e.code == "Backspace") {
//     while (col > 0) {
//       col -= 1;
//       let currTile = document.getElementById(
//         row.toString() + "-" + col.toString()
//       );
//       if (!currTile.classList.contains("hint-tile")) {
//         currTile.innerText = "";
//         break;
//       }
//     }
//   } else if (e.code == "Enter") {
//     update();
//   }

//   if (!gameOver && row == height) {
//     gameOver = true;
//     document.getElementById("answer").innerText = word;
//   }
// }

// function update() {
//   let guess = "";
//   document.getElementById("answer").innerText = "";

//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;
//     guess += letter;
//   }

//   guess = guess.toLowerCase();

//   let correct = 0;
//   let letterCount = {};
//   for (let i = 0; i < word.length; i++) {
//     let letter = word[i];
//     if (letterCount[letter]) {
//       letterCount[letter] += 1;
//     } else {
//       letterCount[letter] = 1;
//     }
//   }

//   if (!guessList.includes(guess)) {
//     if (score > 0) {
//       score -= 1;
//       localStorage.setItem("score", score.toString());
//       document.getElementById("score").innerText = `Your Score: ${score}`;
//     }
//   }

//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;

//     if (word[c] == letter) {
//       currTile.classList.add("correct");
//       let keyTile = document.getElementById("Key" + letter);
//       keyTile.classList.remove("present");
//       keyTile.classList.add("correct");
//       correct += 1;
//       letterCount[letter] -= 1;
//     }

//     if (correct == width) {
//       document.getElementById("answer").innerText =
//         "You guessed the correct word. Click Play again to restart the game";
//       score += 1;
//       localStorage.setItem("score", score.toString());
//       document.getElementById("score").innerText = `Your Score: ${score}`;
//       gameOver = true;
//       document.getElementById("play-again").style.display = "block";
//     }
//   }

//   for (let c = 0; c < width; c++) {
//     let currTile = document.getElementById(row.toString() + "-" + c.toString());
//     let letter = currTile.innerText;

//     if (!currTile.classList.contains("correct")) {
//       if (word.includes(letter) && letterCount[letter] > 0) {
//         currTile.classList.add("present");
//         let keyTile = document.getElementById("Key" + letter);
//         if (!keyTile.classList.contains("correct")) {
//           keyTile.classList.add("present");
//         }
//         letterCount[letter] -= 1;
//       } else {
//         currTile.classList.add("absent");
//         let keyTile = document.getElementById("Key" + letter);
//         keyTile.classList.add("absent");
//       }
//     }
//   }

//   row += 1;
//   col = 0;
// }

// function resetGame() {
//   location.reload();
// }
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

var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word);

var height = 1; // number of guesses
var width = word.length; // length of the word

window.onload = function () {
  initialize();
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

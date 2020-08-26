/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activeplayer, gamePlaying, diccDom;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6 + 1);

    diccDom.style.display = "block";
    diccDom.src = "dice-" + dice + ".png";

    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(
        "current-" + activeplayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add Cuurent score to Player Global score.
    scores[activeplayer] += roundScore;

    // Update the UI.
    document.getElementById("score-" + activeplayer).textContent =
      scores[activeplayer];
    // To check if player wont the game.
    if (scores[activeplayer] >= 20) {
      document.getElementById("name-" + activeplayer).textContent = "Winner";
      diccDom.style.display = "none";
      document
        .querySelector(".player-" + activeplayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activeplayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player if Player Have not won.
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activeplayer).textContent = "0";
  activeplayer === 0 ? (activeplayer = 1) : (activeplayer = 0);
  var diccDom = document.querySelector(".dice");
  diccDom.style.display = "none";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
  scores = [0, 0];

  roundScore = 0;

  activeplayer = 0;
  gamePlaying = true;
  diccDom = document.querySelector(".dice");
  // Hiding Dice
  document.querySelector(".dice").style.display = "none";
  // Setting Round Scores & Global Scores for both Players to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Changing both players names back to original
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Removing Active and winner classes from both players

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Adding active class to player 1
  document.querySelector(".player-0-panel").classList.add("active");
}

var randomPlayerSelection = "";
var randomUserNumber = Math.random();
randomPlayerSelection =
  randomUserNumber < 1 / 3
    ? "rock"
    : randomUserNumber >= 2 / 3
    ? "paper"
    : "scissors";

let computerPlay = () => {
  var randomNumber = Math.random();
  return randomNumber < 1 / 3
    ? "rock"
    : randomUserNumber >= 2 / 3
    ? "paper"
    : "scissors";
};

let userScore = 0;
let computerScore = 0;
let answers = ["rock", "paper", "scissors"];

function playRound() {
  var playerRespond = prompt(
    "Rock, Paper or Scissors?",
    `${randomPlayerSelection}`
  ).toLowerCase();

  if (answers.indexOf(playerRespond) === -1) {
    console.log(
      "Invalid answer! Please click ok or write rock, paper or scissors."
    );
    return;
  }

  var computerSelection = computerPlay();
  var w = "You Win!";
  var d = "Draw!";
  var l = "You Lose!";
  arrayOfResults = [
    [d, l, w],
    [w, d, l],
    [l, w, d],
  ];

  i = playerRespond === answers[0] ? 0 : playerRespond === answers[1] ? 1 : 2;
  j =
    computerSelection === answers[0]
      ? 0
      : computerSelection === answers[1]
      ? 1
      : 2;

  if (arrayOfResults[i][j] === w) {
    userScore++;
  } else if (arrayOfResults[i][j] === l) {
    computerScore++;
  }

  console.log(
    `computerSelection was: ${computerSelection}, ${arrayOfResults[i][j]}\ncurrent score; computer: ${computerScore}, your score: ${userScore}`
  );
  return arrayOfResults[i][j];
}

const game = () => {
  for (let i = 0; i < 5; i++) {
    playRound();
  }
};
game();

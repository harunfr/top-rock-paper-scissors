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
  randomNumber < 1 / 3
    ? "rock"
    : randomUserNumber >= 2 / 3
    ? "paper"
    : "scissors";
};
var computerSelection = computerPlay();
computerPlay();
console.log(computerSelection);

const playRound = function (playerSelection, computerSelection) {
  var computerSelection = computerPlay();
  var playerSelection = prompt(
    "Rock, Paper or Scissors?",
    `${randomPlayerSelection}`
  ).toLowerCase();
  var w = "You Win!";
  var d = "Draw!";
  var l = "You Lose!";
  arrayOfResults = [
    [d, l, w],
    [w, d, l],
    [l, w, d],
  ];
  var i = playerSelection == "rock" ? 0 : playerSelection == "paper" ? 1 : 2;
  console.log(computerSelection);
  console.log(i);
  var j =
    computerSelection == "rock" ? 0 : computerSelection == "paper" ? 1 : 2;
  console.log(j);
  alert(
    `${arrayOfResults[i][j]}, Computer's selection was: ${computerSelection}`
  );
  return arrayOfResults[i][j];
};

const game = () => {
  for (let i = 0; i < 5; i++) {
    playRound();
  }
};
game();
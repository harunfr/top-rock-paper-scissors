class Game {
  constructor() {
    /** Core Properties */
    this.coords = [];
    this.rocks = [];
    this.papers = [];
    this.scissorses = [];
    /** Gameplay Properties */
    this.playerSign = null;
    this.computerSign = null;
    this.prevPlayerSign = null;
    this.prevComputerSign = null;
    this.playerScore = 0;
    this.computerScore = 0;
    this.round = 0;
    this.roundWinner = null;
    this.gameWinner = null;
  }

  initializeNewRound() {
    // prepare coords
    const coordsAsIndexes = [];
    const coords = [];
    for (let index = 0; index < 100; index++) {
      coordsAsIndexes.push(index);
      coords.push({ sign: null });
    }
    const shuffledArray = this.shuffleArray(coordsAsIndexes);

    const rocks = shuffledArray.slice(0, 10);
    const papers = shuffledArray.slice(10, 20);
    const scissorses = shuffledArray.slice(20, 30);

    for (const rock of rocks) {
      coords[rock].sign = "r";
    }
    for (const paper of papers) {
      coords[paper].sign = "p";
    }
    for (const scissors of scissorses) {
      coords[scissors].sign = "s";
    }

    // set coords and prepare sign array
    this.coords = coords;
    this.rocks = rocks;
    this.papers = papers;
    this.scissorses = scissorses;
    // assign random sign to computer
    const randomNum = Math.random();
    if (randomNum < 0.33) {
      this.computerSign = "r";
    } else if (randomNum < 0.66) {
      this.computerSign = "p";
    } else {
      this.computerSign = "s";
    }
    this.signsSetter({
      computerSign: this.computerSign,
      playerSign: this.playerSign,
    });
  }

  /* get average values of x and y of rocks, papers, scissorses */
  get rocksMean() {
    return this.getMeanXandY(this.rocks);
  }

  get papersMean() {
    return this.getMeanXandY(this.papers);
  }

  get scissorsesMean() {
    return this.getMeanXandY(this.scissorses);
  }

  /* Helper methods to be used in main class methods. */
  signBeatsMap = {
    r: "s",
    s: "p",
    p: "r",
  };

  get randomNum() {
    return Math.random();
  }

  convertToCoord(num) {
    const coord = { x: 0, y: 0 };
    const str = String(num);
    const spl = str.split("");
    if (spl.length === 1) {
      coord.x = Number(spl[0]);
    } else {
      coord.x = Number(spl[1]);
      coord.y = Number(spl[0]);
    }
    return coord;
  }

  getMeanXandY(arr) {
    const averageXandY = { x: 0, y: 0 };
    // convert to coordinates
    const totalXandY = arr.reduce(
      (total, curr) => {
        const coord = this.convertToCoord(curr);
        total.x += coord.x;
        total.y += coord.y;
        return total;
      },
      // default focus point
      { x: 0, y: 0 }
    );

    // divide by zero fix
    const length = arr.length || 1;
    averageXandY.x = Math.round(totalXandY.x / length);
    averageXandY.y = Math.round(totalXandY.y / length);
    return averageXandY;
  }

  getNeighborIndexes(index) {
    const { x, y } = this.convertToCoord(index);
    const neighbors = [
      // starts from north, goes clockwise
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y + 1 },
    ];
    const neighborIndexes = neighbors.map(this.convertToIndex);
    return neighborIndexes;
  }

  convertNeighbors(index, sign) {
    const neighborIndexes = this.getNeighborIndexes(index);

    neighborIndexes.forEach((neighborIndex) => {
      if (this.coords[neighborIndex]) {
        let neighborSign = this.coords[neighborIndex].sign;
        const hasBeatableSign = neighborSign === this.signBeatsMap[sign];

        if (hasBeatableSign) {
          this.coords[neighborIndex].sign = sign;
          this.transferSigns(sign, neighborIndex);
        }
      }
    });
  }

  transferSigns(sign, index) {
    if (sign === "r") {
      this.rocks.push(index);
      this.scissorses.splice(this.scissorses.indexOf(index), 1);
    } else if (sign === "p") {
      this.papers.push(index);
      this.rocks.splice(this.rocks.indexOf(index), 1);
    } else if (sign === "s") {
      this.scissorses.push(index);
      this.papers.splice(this.papers.indexOf(index), 1);
    }
  }

  convertToIndex({ x, y }) {
    return Number(`${y}${x}`);
  }

  // fisher yates shuffle algorithm
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /* Main Class Methods. */
  convertRockNeighbors() {
    this.rocks.forEach((rock) => {
      this.convertNeighbors(rock, "r");
    });
  }

  convertPaperNeighbors() {
    this.papers.forEach((paper) => {
      this.convertNeighbors(paper, "p");
    });
  }

  convertScissorsNeighbors() {
    this.scissorses.forEach((scissors) => {
      this.convertNeighbors(scissors, "s");
    });
  }

  catchRocks() {
    for (const paper of this.papers) {
      this.catchOppositeSign(paper, "p");
    }
  }

  catchPapers() {
    for (const scissors of this.scissorses) {
      this.catchOppositeSign(scissors, "s");
    }
  }

  catchScissorses() {
    for (const rock of this.rocks) {
      this.catchOppositeSign(rock, "r");
    }
  }

  /* Catch Opposite Sign Method And Its Helpers */
  /* #1 Firstly, main moving method invokes and calls #2 attempt(). */
  catchOppositeSign(index, sign) {
    let focusPoint = null;
    if (sign === "r") {
      focusPoint = this.scissorsesMean;
    } else if (sign === "p") {
      focusPoint = this.rocksMean;
    } else if (sign === "s") {
      focusPoint = this.papersMean;
    }

    // focus point's coordinates
    const { x: fX, y: fY } = focusPoint;
    // chosen point's coordinates
    const { x, y } = this.convertToCoord(index);
    // calculate difference between focus and individual point
    const dX = fX - x;
    const dY = fY - y;
    // probability of direction
    const total = Math.abs(dX) + Math.abs(dY);
    const Px = Math.abs(dX) / total;

    // prioritize north
    if (dX === 0 && dY > 0) {
      this.attempt("N", index, sign, Px);
    }
    // prioritize south
    else if (dX === 0 && dY < 0) {
      this.attempt("S", index, sign, Px);
    }
    // prioritize west
    else if (dX < 0 && dY === 0) {
      this.attempt("W", index, sign, Px);
    }
    // prioritize east
    else if (dX > 0 && dY === 0) {
      this.attempt("E", index, sign, Px);
    }

    // prioritize north east
    else if (dX > 0 && dY > 0) {
      this.attempt("NE", index, sign, Px);
    }
    // prioritize south east
    else if (dX > 0 && dY < 0) {
      this.attempt("SE", index, sign, Px);
    }
    // prioritize north west
    else if (dX < 0 && dY > 0) {
      this.attempt("NW", index, sign, Px);
    }
    // prioritize south west
    else if (dX < 0 && dY < 0) {
      this.attempt("SW", index, sign, Px);
    }
  }

  /* #2 Secondly, attempt() tries to move cell to another coordinate 
  by repetitively invoking and getting response from move()   */
  attempt(direction, index, sign, Px) {
    let isMoved = false;

    /* MAIN DIRECTIONS */
    // North
    if (direction === "N") {
      isMoved = this.move("N", index, sign);
      if (!isMoved) {
        if (this.randomNum > 0.5) {
          isMoved = this.move("E", index, sign);
        } else {
          this.move("W", index, sign);
        }
      }
    }
    // East
    if (direction === "E") {
      isMoved = this.move("E", index, sign);
      if (!isMoved) {
        if (!isMoved && this.randomNum > 0.5) {
          isMoved = this.move("N", index, sign);
        } else {
          this.move("S", index, sign);
        }
      }
    }
    // South
    if (direction === "S") {
      isMoved = this.move("S", index, sign);
      if (!isMoved) {
        if (this.randomNum > 0.5) {
          isMoved = this.move("E", index, sign);
        } else {
          this.move("W", index, sign);
        }
      }
    }
    // West
    if (direction === "W") {
      isMoved = this.move("W", index, sign);
      if (!isMoved) {
        if (this.randomNum > 0.5) {
          isMoved = this.move("N", index, sign);
        } else {
          this.move("S", index, sign);
        }
      }
    }

    /** INTERMEDIARY DIRECTIONS */
    // North East
    if (direction === "NE") {
      if (this.randomNum > Px) {
        isMoved = this.move("N", index, sign);
      } else {
        this.move("E", index, sign);
      }
    }

    // South East
    if (direction === "SE") {
      if (this.randomNum > Px) {
        isMoved = this.move("S", index, sign);
      } else {
        this.move("E", index, sign);
      }
    }

    // North West
    if (direction === "NW") {
      if (this.randomNum > Px) {
        isMoved = this.move("N", index, sign);
      } else {
        this.move("W", index, sign);
      }
    }

    // South West
    if (direction === "SW") {
      if (this.randomNum > Px) {
        isMoved = this.move("S", index, sign);
      } else {
        this.move("W", index, sign);
      }
    }
  }

  /* #3 Lastly, move() just executes attempt()'s order and 
  returns a response to attempt()'s request. */
  move(direction, index, sign) {
    const { x, y } = this.convertToCoord(index);
    let invalidMove;
    let newIndex = "";

    if (direction === "N") {
      invalidMove = y + 1 >= 10;
      newIndex = this.convertToIndex({ x: x, y: y + 1 });
    } else if (direction === "E") {
      invalidMove = x + 1 >= 10;
      newIndex = this.convertToIndex({ x: x + 1, y: y });
    } else if (direction === "S") {
      invalidMove = y - 1 <= 0;
      newIndex = this.convertToIndex({ x: x, y: y - 1 });
    } else if (direction === "W") {
      invalidMove = x - 1 <= 0;
      newIndex = this.convertToIndex({ x: x - 1, y: y });
    }

    if (invalidMove) {
      return false;
    }
    const isFull = this.coords[newIndex].sign !== null;

    if (isFull) {
      return false;
    }

    if (sign === "r") {
      this.rocks.push(newIndex);
      this.rocks.splice(this.rocks.indexOf(index), 1);
    } else if (sign === "p") {
      this.papers.push(newIndex);
      this.papers.splice(this.papers.indexOf(index), 1);
    } else if (sign === "s") {
      this.scissorses.push(newIndex);
      this.scissorses.splice(this.scissorses.indexOf(index), 1);
    }

    this.coords[newIndex].sign = sign;
    this.coords[index].sign = null;
    return true;
  }

  // First Converts Neighbors, then Moves to Nearby Tiles.
  playOneStep() {
    /** First Step - Convert All Randomly */
    const convertsArr = [
      () => this.convertRockNeighbors(),
      () => this.convertPaperNeighbors(),
      () => this.convertScissorsNeighbors(),
    ];
    const shuffledConvertsArr = this.shuffleArray(convertsArr);

    for (const convertFn of shuffledConvertsArr) {
      convertFn();
    }

    /** Second Step, Moves Signs */
    const catchesArr = [
      () => this.catchRocks(),
      () => this.catchPapers(),
      () => this.catchScissorses(),
    ];
    const shuffledCatchesArr = this.shuffleArray(catchesArr);
    for (const catchFn of shuffledCatchesArr) {
      catchFn();
    }
    /** Set Coords Ui State After Every Meaningful Change */
    const cloneCoords = this.coords.slice(0);
    this.coordsSetter(cloneCoords);
  }

  /* State Setters Borrowed From React */
  coordsSetter() {}
  signsSetter() {}
  prevSignsSetter() {}
  scoreSetter() {}
  roundWinnerSetter() {}
  gameWinnerSetter() {}

  setWinner() {
    const hasPlayer3Scores = this.playerScore === 3;
    const hasComputer3Scores = this.computerScore === 3;
    if (hasPlayer3Scores) {
      this.gameWinner = "Player";
    } else if (hasComputer3Scores) {
      this.gameWinner = "Computer";
    }
  }

  playOneTurn() {
    const timerId = setInterval(() => {
      const isRocksWinner = this.rocks.length === 30;
      const isPapersWinner = this.papers.length === 30;
      const isScissorsesWinner = this.scissorses.length === 30;
      const isCompletedTurn =
        isRocksWinner || isPapersWinner || isScissorsesWinner;

      if (isCompletedTurn) {
        clearInterval(timerId);

        const win =
          (isRocksWinner && this.playerSign === "r") ||
          (isPapersWinner && this.playerSign === "p") ||
          (isScissorsesWinner && this.playerSign === "s");

        const lose =
          (isRocksWinner && this.computerSign === "r") ||
          (isPapersWinner && this.computerSign === "p") ||
          (isScissorsesWinner && this.computerSign === "s");

        if (win) {
          this.roundWinner = "Player";
          this.playerScore += 1;
        } else if (lose) {
          this.computerScore += 1;
          this.roundWinner = "Computer";
        } else {
          this.roundWinner = "Draw";
        }

        this.roundWinnerSetter(this.roundWinner);
        this.scoreSetter({
          playerScore: this.playerScore,
          computerScore: this.computerScore,
        });

        this.prevComputerSign = this.computerSign;
        this.prevPlayerSign = this.playerSign;
        console.log(this.prevPlayerSign);
        this.playerSign = null;

        this.prevSignsSetter({
          prevComputerSign: this.prevComputerSign,
          prevPlayerSign: this.prevPlayerSign,
        });
        this.setWinner();
        const winner = this.gameWinner;

        if (winner) {
          this.gameWinnerSetter(this.gameWinner);
        } else {
          // this.
          this.initializeNewRound();
        }
      } // seperate line else
      else {
        this.playOneStep();
      }
    }, 1000);
  }
}

export default Game;

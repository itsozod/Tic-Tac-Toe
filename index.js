const gameBoard = document.querySelector('#game-board');
const resultShow = document.querySelector('#result-show');
const restartBtnContainer = document.querySelector('#restart-container');
const restartBtn = document.querySelector('#restart');
const startBtnContainer = document.querySelector('#start-container');
const startBtn = document.querySelector('#start');
const modeContainer = document.querySelector('#mode-container');
const playerVsPlayer = document.querySelector('#plavspla-mode');
const playerVsAI = document.querySelector('#plavsai-mode');

// Player vs Player version
let squares = [
  "", "", "", "", "", "", "", "", ""
]

// function to show squares inside the game board
function displaySquares() {
    squares.forEach((_square, index) => {
        const squareEl = document.createElement('div');
        squareEl.classList.add('square');
        squareEl.id = index;
        squareEl.addEventListener('click', displayWeapons); 
        gameBoard.appendChild(squareEl);
        })
    };
displaySquares();

// functorial function for showing X and O and the message in resultShow inside the displayWeapons function
const weapons = (weapon) => {
    const playerEl = document.createElement('div');
    const displayPlayers = () => `It's ${weapon}'s turn now!`;
    playerEl.displayPlayers = displayPlayers;
    return playerEl;
  };

  let currentPlayer = 'X';
  let player1;
  let player2;
  let gameStarted = false; // won't let the players make moves on squares untill the game is started

  // pop up button when you open the game for the first time
  function startGame() {
    startBtnContainer.classList.add('active');
    setTimeout(() => {
        startBtnContainer.style.display = 'none';
        modeContainer.style.display = 'flex';
    }, 900);
}

startBtn.addEventListener('click', startGame);


// pop up button to choose either player vs player or player vs computer (AI) mode after clicking to start the game
  function showPlayerMode() {
  modeContainer.classList.add('active');
  setTimeout(() => {
    modeContainer.style.display = 'none';
    gameStarted = true;
  }, 1300);
  setTimeout(() => {
    gameBoard.style.transition = '0.5s ease-in-out';
    gameBoard.style.opacity = '1'
  }, 1200);
  setTimeout(() => {
  resultShow.textContent = "It's X's turn now!";
  resultShow.style.transition = '0.5s ease-in-out';
  }, 1300);
}

playerVsPlayer.addEventListener('click', showPlayerMode);

// function to display X and O elements when you click on the squares
  function displayWeapons(e) {
    if (!gameStarted) {
        return;
      }

    player1 = weapons('X');
    player2 = weapons('O');

    if (currentPlayer === 'X') {
        player1.classList.add('cross');
        e.target.appendChild(player1);
        resultShow.textContent = "It's O's turn now!";
        currentPlayer = 'O';
    } 
    else {
        player2.classList.add('circle');
        e.target.appendChild(player2);
        resultShow.textContent = player1.displayPlayers();
        currentPlayer = 'X';
    }
    e.target.removeEventListener('click', displayWeapons);
    theWinner();
  }

  // function to declare the winner or draw after one of the winningMoves are filled in the squares
  function theWinner() {
    let winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const allSquares = document.querySelectorAll('.square');
    let crossWins = false;
    let circleWins = false;
    let winnerFound = false;
  
    winningMoves.forEach(array => {
      // checks if one of the winningMoves (squares) contains a cross elemets if yes X wins the game
      crossWins = array.every(square => allSquares[square].firstChild?.classList.contains('cross'));
  
      if (crossWins) {
        resultShow.textContent = "X wins the game!";
        array.forEach(squareIndex => {
          allSquares[squareIndex].classList.add('winning-square');
        });
        gameBoard.style.opacity = '0.3';
        setTimeout(() => {
          restartBtnContainer.style.display = 'flex';
          restartBtnContainer.classList.add('active');
        }, 1000);
        winnerFound = true; // Flag variable
        return;
      }
  
      // checks if one of the winningMoves (squares) contains a circle elemets if yes O wins the game
      circleWins = array.every(square => allSquares[square].firstChild?.classList.contains('circle'));
  
      if (circleWins) {
        resultShow.textContent = 'O wins the game!';
        array.forEach(squareIndex => {
          allSquares[squareIndex].classList.add('winning-square1');
        });
        gameBoard.style.opacity = '0.3';
        setTimeout(() => {
          restartBtnContainer.style.display = 'flex';
        }, 1000);
        winnerFound = true;
        return;
      }
    });
  
    // Checks if all the squares are filled but no winningMove was found so it returns draw
    const allFilled = Array.from(allSquares).every(square => square.firstChild !== null);
    if (allFilled && !winnerFound) {
      resultShow.textContent = "It's a draw!";
      gameBoard.style.opacity = '0.3';
      setTimeout(() => {
        restartBtnContainer.style.display = 'flex';
      }, 1000);
    }
  }

  // pop up button to restart the game once the winner was declared or draw
function restartGame() {
    restartBtnContainer.style.display = 'none';
    gameBoard.style.opacity = '1';
    resultShow.textContent = "It's X's turn now!";
    squares = ["", "", "", "", "", "", "", "", ""];

    const allSquares = document.querySelectorAll('.square');
    currentPlayer = 'X'

    allSquares.forEach(square => {
        square.innerHTML = '';
        square.style.opacity = '1';
        square.classList.remove('winning-square');
        square.classList.remove('winning-square1');
        square.addEventListener('click', displayWeapons);
        square.addEventListener('click', displayPlayerAndAI);
    });
}

restartBtn.addEventListener('click', restartGame);


// Player vs Computer (AI) version
let humanPlayer;
let aiPlayer;
let aiGame = false; // won't activate this mode until player vs computer (AI) mode is chosen

playerVsAI.addEventListener('click', showAIMode);

// function to start player vs computer (AI) mode, if you choose player vs player mode this mode will be disabled
function showAIMode() {
  modeContainer.classList.add('active');
  setTimeout(() => {
    modeContainer.style.display = 'none';
    aiGame = true;
  }, 1300);
  setTimeout(() => {
    gameBoard.style.transition = '0.5s ease-in-out';
    gameBoard.style.opacity = '1'
  }, 1200);
  setTimeout(() => {
    resultShow.textContent = "It's X's turn now!";
    resultShow.style.transition = '0.5s ease-in-out';
  }, 1300);
}

// function to make squares clickable in player vs AI mode only
const allSquares = document.querySelectorAll('.square');
allSquares.forEach(square => {
  square.addEventListener('click', displayPlayerAndAI);
});

// function to display X as a human player
function displayPlayerAndAI(e) {
  if (!aiGame) {
    return;
  }
    const clickedSquare = e.target;

    if (currentPlayer === 'X') {
      humanPlayer = document.createElement('div');
      humanPlayer.classList.add('cross');
      clickedSquare.appendChild(humanPlayer);
      resultShow.textContent = "It's O's turn now!";
      currentPlayer = 'O';

      makeComputerMove(); // calling makeComputerMove function after human player makes its move
    }
    theWinner(); // calling theWinner function after every move to check if anyone won the game
    clickedSquare.removeEventListener('click', displayPlayerAndAI); // removing and event listeners from clicked squares so they can't be clicked again and again
}

// function for funding empty squares for computer to make moves on them
function getEmptySpots() {
  const emptySpots = [];
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach(square => {
    if (square.firstChild === null) {
      emptySpots.push(square);
    }
  });
  return emptySpots;
}

// function to display O as a computer player
function makeComputerMove() {
  // Delay the computer move to add some delay before making the move
  setTimeout(() => {
    if (resultShow.textContent === 'X wins the game!') {
      return;
    }
    const emptySpots = getEmptySpots();
    if (emptySpots.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySpots.length);
      const randomSpot = emptySpots[randomIndex];
      aiPlayer = document.createElement('div');
      aiPlayer.classList.add('circle');
      randomSpot.appendChild(aiPlayer);
      resultShow.textContent = "It's X's turn now!";
      currentPlayer = 'X';

      // Check for a winner after the computer's move
      theWinner();
      // remove event listeners from squares that computer made move so they can't be clicked again and again
      randomSpot.removeEventListener('click', displayPlayerAndAI);
    }
  }, 500);
}



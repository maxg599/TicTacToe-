"use strict";

//// PLAYERS /////
const Player = (player, symbol) => {
  const getPlayer = player;
  const getSymbol = symbol;
  return {
    getPlayer,
    getSymbol,
  };
};

////   GAME BOARD  ////

const Gameboard = (() => {
  const board = Array(9).fill(null);
  const getBoard = () => board;

  const updateBoard = (i, value) => {
    board[i] = value;
  };
  return {
    getBoard,
    updateBoard,
  };
})();

/// GAME MODEL  ///

const GameModel = (() => {
  ///PLAYERS//
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");
  ///////////

  let currPlayer = playerOne;
  let gameOver = false;

  let cells = document.querySelectorAll(".board > div");
  console.log(cells);

  const switchPlayer = () => {
    if (currPlayer == playerOne) currPlayer = playerTwo;
    else if (currPlayer == playerTwo) currPlayer = playerOne;
  };

  const handleClick = (index, element) => {
    cells.forEach((El, ind) => {
      El.addEventListener("click", () => {
        if (Gameboard.getBoard()[index] === null && index === ind) {
          Gameboard.updateBoard(index, currPlayer.getSymbol);
          El.innerHTML = currPlayer.getSymbol;
          checkForWinner(El.innerHTML, index);
          switchPlayer();
        }
      });
    });
  };

  const checkForWinner = (boardEl, boardI) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let selectedCombos = winningCombos.filter(i => i.toString().includes(boardI));
    let currBoard = Gameboard.getBoard();
    var symbolCount = 0;

    console.log('selctedcombo',selectedCombos);
    for(var i=0;i<selectedCombos.length;i++){
      
      for(var a=0;a<selectedCombos[i].length;a++){
        console.log('arrayIndex',selectedCombos[i][a]);
        if(currBoard[selectedCombos[i][a]]===null){
          continue;
        }
        console.log('currBoard[a]',currBoard[selectedCombos[i][a]]);

        if(currBoard[selectedCombos[i][a]]=== boardEl.toString()){
          symbolCount++;
          console.log('sympbolcount',symbolCount);
        }
      }
      if(symbolCount===3){
        console.log('winner'+ boardEl);
      }else{
        symbolCount=0;
      }
    }

    // winningCombos.forEach((arr, ind)=>{
    //   // const str = arr.toString();
    //   // console.log(str);
    //   // console.log(boardI.toString());
    //   arr.forEach((arrEl)=>{
    //     console.log(arrEl);
    //     console.log(boardEl);
    //     console.log(boardI);
    //     let combo = [];

    //     if(arrEl === boardI && boardEl !==null
    //       //will change !null to player symbol//
    //     ){
    //       combo.push(arrEl);
    //       console.log(combo);
    //     }
    //   });
    // });
  };

  // const endOfGame = (() => {
  //   if (gameOver == true) console.log("Game over!");
  // })();

  return {
    switchPlayer,
    handleClick,
    gameOver,
    checkForWinner,
  };
})();

///  GAME CONTROLLER ////

const GameController = (() => {
  const startGame = (() => {
    const board = Gameboard.getBoard();
    board.forEach((element, index) => {
      GameModel.handleClick(index, element);
      // console.log(element);
      // GameModel.checkForWinner(element,index);
      // if(GameModel.checkForWinner(element)){
      //    console.log('winner');
      // }
    });
  })();

  return {
    startGame,
  };
})();

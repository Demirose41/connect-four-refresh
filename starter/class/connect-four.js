const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
    //Horizontal Check
    let horizontalWin = []
    for(let i = 0; i < grid.length ; i++){
      for(let j = 0; j < grid[0].length - 3; j++){
        horizontalWin.push([grid[i][j], grid[i][j+1], grid[i][j+2], grid[i][j+3]])
      };
    }
    
    if(horizontalWin.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(horizontalWin.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }

    //Vertical Check
    let verticalWin = [];
    for(let i = 0; i < grid.length - 3; i++){
      for(let j = 0; j < grid[0].length; j++){
        verticalWin.push([grid[i][j], grid[i+1][j], grid[i+2][j], grid[i+3][j]])
      };
    }
    
    if(verticalWin.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(verticalWin.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }
    //Diagonal Check
    let leftToRightDiagonal = [];
    let rightToLeftDiagonal = [];
    let reversedGrid = [...grid].reverse()
    for(let i = 0; i < grid.length - 3; i++){
      for(let j = 0; j < grid[0].length - 3; j++){
        leftToRightDiagonal.push([grid[i][j], grid[i+1][j+1], grid[i+2][j+2], grid[i+3][j+3]])
      };
    }
    for(let i = 0; i < grid.length - 3; i++){
      for(let j = 0; j < grid[0].length - 3; j++){
        leftToRightDiagonal.push([reversedGrid[i][j], reversedGrid[i+1][j+1], reversedGrid[i+2][j+2], reversedGrid[i+3][j+3]])
      };
    }
    // console.log(leftToRightDiagonal);
    // console.log(grid);
    if(leftToRightDiagonal.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(leftToRightDiagonal.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }
    if(rightToLeftDiagonal.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(rightToLeftDiagonal.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }
    // Return 'T' if the game is a tie
    if (grid.every((row) => row.every((ele) => ele == 'X' || ele == 'O'))){
      return 'T';
    }
    // Return false if the game has not ended
    else{ 
      return false;
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;

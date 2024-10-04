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
    if(grid.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(grid.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }

    //Vertical Check
    let verticalWin = [];
    for(let i = 0; i < grid[0].length; i ++ ){
      verticalWin.push(grid.map((row) => row[i]));
    }
    if(verticalWin.some((row) => row.filter(x => x == 'X').length >= 4)){
      return 'X';
    }
    if(verticalWin.some((row) => row.filter(x => x == 'O').length >= 4)){
      return 'O';
    }


    // Return 'T' if the game is a tie
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

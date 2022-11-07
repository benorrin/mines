/**
 * Creates a random gameboard of a given size, with a given number of mines
 * 
 * @param {int} boardSize Size of the gameboard to be generate squared. e.g. 5x5, 4x4 etc.
 * @param {int} numMines The number of mines to be placed on the gameboard.
 * 
 * @returns {array} gameBoard The generated gameboard in array form. 1 respresents mines, 0 represents free squares.
 */

async function generateBoard (boardSize, numMines){
    let gameBoard = [];
    boardSize = await Math.pow(boardSize,2);
    let x = 0;

    for (let i = 0; i < boardSize; i++) {
        gameBoard.push(0);
    }

    while (x < numMines) {
        let square = Math.floor(Math.random() * (boardSize));

        if(gameBoard[square] == 0) {
            gameBoard[square] = 1;
            x++;
        }
    }
    return JSON.stringify(gameBoard);
}

module.exports = generateBoard;
import { Gameboard, Ship , Player, startGame, syncBoard, playerTurn} from "./game.js";
// const gameboard = new Gameboard();
// gameboard.placeShip('Carrier', [0,0], 'horizontal')
// gameboard.placeShip('Battleship', [5,5], 'vertical')
// gameboard.receiveAttack([0,0]);
// gameboard.receiveAttack([0,1]);
// gameboard.receiveAttack([0,2]);
// gameboard.receiveAttack([0,3]);
// //gameboard.receiveAttack([0,4]);
// console.log(gameboard.board)
// console.log(gameboard.ships)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let players = startGame("Human", "Computer");
console.log(players)
//players[0].autoTurn()
//players[1].autoTurn()
let gameOver = false;
while (gameOver === false) {
    players[0].autoTurn();
    await sleep(1000);
    players[1].autoTurn();
    await sleep(100)
    console.log(players[0].board)
    if (players[0].board.totalHits === 17) {
        gameOver = true;
        console.log('GAME OVER. CPU WINS!')
    }
    else if (players[1].board.totalHits === 17) {
        gameOver = true;
        console.log('GAME OVER. YOU WIN!')
    }
    //console.log(gameOver)
}
//while gameOn alternate players
//human player => activeplayer.takeTurn()
//cpu => activeplayer.autoTurn()
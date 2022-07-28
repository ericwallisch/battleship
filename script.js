import { Gameboard, Ship , Player, startGame, syncBoard} from "./game.js";
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

let players = startGame("Human", "Computer");
//players[0].board.placeShip('Carrier', 0, 'horizontal')
//players[1].board.placeShip('Battleship', 15, 'vertical')
//syncBoard(players)
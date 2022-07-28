export class Ship {
    shipTypes = {
        'Carrier': 5,
        'Battleship': 4,
        'Destroyer': 3,
        'Submarine': 3,
        'Patrol Boat': 2,
    }

    constructor(type) {
        this.type = type;
        this.length = this.shipTypes[type];
        this.hit = 0;
        this.sunk = false;
    }

    hitShip() {
        this.hit++;
        this.isSunk();
    }

    isSunk() {
        //if this ship has empty slot in array it isn't sunk
        if (this.hit < this.length) {
            return false;
        }
        else {
            this.sunk = true;
        }
    }

}

export class Gameboard {
    constructor() {
        // this.board = [
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        //     new Array(10),
        // ]
        this.board = new Array(100);
        this.ships = []
    }

    changeBoard(index, marker) {
        // let row = index[0];
        // let col = index[1];
        // this.board[row][col] = marker
        this.board[index] = marker;
    }

    placeShip(shipType, startPosition, direction) {
        //take ship.length and array of position coordinates and add to board
        const ship = new Ship(shipType)
        this.ships.push(ship);
        // let x = startPosition[0];
        // let y = startPosition[1];
        // if (direction === 'vertical') {
        //     for (let i = 0; i < ship.length; i++) {
        //         this.changeBoard([x,y], ship);
        //         x++;
        //     }
        // }
        // else if (direction === 'horizontal') {
        //     for (let i = 0; i < ship.length; i++) {
        //         this.changeBoard([x,y], ship);
        //         y++;
        //     }
        // }
        if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard(startPosition, ship);
                startPosition += 10;
            }
        }
        else if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard(startPosition, ship);
                startPosition ++;
            }
        }
    }

    receiveAttack(player, target) {
        // if (typeof this.board[coordinates[0]][coordinates[1]] === "object") {
        //     this.board[coordinates[0]][coordinates[1]].hitShip()
        //     console.log(this.board[coordinates[0]][coordinates[1]].hit)
        // }
        // else {
        //     this.board[coordinates[0]][coordinates[1]] = 'X'
        // }
        if (this.board[target] === 'MISS' || this.board[target] === 'HIT') {
            return false;
        }

        console.log(target)
        console.log(player.board)
        if (typeof this.board[target] === "object") {
            this.board[target].hitShip()
            this.board[target] = 'HIT'
            syncBoard(player);
            return true;
        }

        else {
            this.board[target] = 'MISS'
            syncBoard(player);
            return true;
        }
    }

    allSunk() {

    }
}

export class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
}

function initializeDOMBoard(players) {
    //for item in array, create div element
    let human = players[0];
    let computer = players[1];
    let playerBoard = document.getElementById('playerBoard');
    let computerBoard = document.getElementById('computerBoard');
    //update player board
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        div.id = i;
        div.addEventListener('click', function (e) {
            //playerBoardClick(human, e.target.id);
            human.board.receiveAttack(human, e.target.id);
        });
        playerBoard.appendChild(div);
    }
    //update computer board
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        div.id = i;
        div.addEventListener('click', function (e) {
            computer.board.receiveAttack(computer, e.target.id);
        });
        computerBoard.appendChild(div);
    }
    
    //sync player board with existing ships
    //human board
    // let playerChildren = playerBoard.children;
    // console.log(human.board.board)
    // for (let i = 0; i < 100; i++) {
    //     if (typeof human.board.board[i] === "object") {
    //         console.log(playerChildren[i])
    //         playerChildren[i].classList.add("ship");
    //     }
    // }
    // //computer board
    // let computerChildren = computerBoard.children;
    // console.log(computer.board.board)
    // for (let i = 0; i < 100; i++) {
    //     if (typeof computer.board.board[i] === "object") {
    //         console.log(`ship at ${i}`)
    //         computerChildren[i].classList.add("ship");
    //     }
    // }
    //console.log(children.getElementById('[0,0]'));
    //sync computer board with existing ships
}

export function syncBoard(player) {
    if (player.name === "Human") {
        let playerChildren = playerBoard.children;
        for (let i = 0; i < 100; i++) {
            if (typeof player.board.board[i] === "object") {
                playerChildren[i].classList.add("ship");
            }
            if (player.board.board[i] === 'MISS') {
                playerChildren[i].classList.add("missed")
            }
            if (player.board.board[i] === 'HIT') {
                playerChildren[i].classList.add("hit");
            }
        }
    }
    else if (player.name === "Computer") {
        //let computerBoard = document.getElementById('computerBoard');
        let computerChildren = computerBoard.children;
        for (let i = 0; i < 100; i++) {
            if (typeof player.board.board[i] === "object") {
                computerChildren[i].classList.add("ship");
            }
            if (player.board.board[i] === 'MISS') {
                computerChildren[i].classList.add("missed")
            }
            if (player.board.board[i] === 'HIT') {
                computerChildren[i].classList.add("hit");
            }
        }
    }
}

export function startGame(p1, p2) {
    let playerOne = new Player(p1);
    let playerTwo = new Player(p2);
    playerOne.board.placeShip('Carrier', 0, 'horizontal')
    playerOne.board.placeShip('Battleship', 15, 'vertical')
    playerOne.board.placeShip('Destroyer', 50, 'horizontal')
    playerOne.board.placeShip('Submarine', 29, 'vertical')
    playerOne.board.placeShip('Patrol Boat', 72, 'horizontal')
    playerTwo.board.placeShip('Carrier', 2, 'horizontal')
    playerTwo.board.placeShip('Battleship', 20, 'vertical')
    playerTwo.board.placeShip('Destroyer', 55, 'horizontal')
    playerTwo.board.placeShip('Submarine', 29, 'vertical')
    playerTwo.board.placeShip('Patrol Boat', 72, 'horizontal')
    initializeDOMBoard([playerOne, playerTwo]);
    syncBoard(playerOne);
    syncBoard(playerTwo);
    return [playerOne, playerTwo];
}
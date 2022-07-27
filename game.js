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
        this.board = [
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
            new Array(10),
        ]
        this.ships = []
    }

    changeBoard(index, marker) {
        let row = index[0];
        let col = index[1];
        this.board[row][col] = marker
    }

    placeShip(shipType, startPosition, direction) {
        //take ship.length and array of position coordinates and add to board
        const ship = new Ship(shipType)
        this.ships.push[ship];
        let x = startPosition[0];
        let y = startPosition[1];
        if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard([x,y], ship);
                x++;
            }
        }
        else if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard([x,y], ship);
                y++;
            }
        }
    }

    receiveAttack(coordinates) {
        if (typeof this.board[coordinates[0]][coordinates[1]] === "object") {
            this.board[coordinates[0]][coordinates[1]].hitShip()
            console.log(this.board[coordinates[0]][coordinates[1]].hit)
        }
        else {
            this.board[coordinates[0]][coordinates[1]] = 'X'
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
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let div = document.createElement('div');
            div.id = `[${i},${j}]`
            playerBoard.appendChild(div);
        }
    }
    //update computer board
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let div = document.createElement('div');
            div.id = `[${i},${j}]`;
            computerBoard.appendChild(div);
        }
    }
}

export function updateDOMBoard() {

}

export function startGame(p1, p2) {
    let playerOne = new Player(p1);
    let playerTwo = new Player(p2);
    initializeDOMBoard([playerOne, playerTwo]);
    return [playerOne, playerTwo];
}
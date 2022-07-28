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
        this.board = new Array(100);
        this.ships = []
        this.totalHits = 0;
    }

    changeBoard(index, marker) {
        this.board[index] = marker;
    }

    placeShip(shipType, startPosition, direction) {
        //take ship.length and array of position coordinates and add to board
        const ship = new Ship(shipType)
        this.ships.push(ship);
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
        if (this.board[target] === 'MISS' || this.board[target] === 'HIT') {
            return false;
        }

        console.log(target)
        console.log(player.board)
        if (typeof this.board[target] === "object") {
            this.board[target].hitShip()
            this.board[target] = 'HIT'
            console.log('HIT')
            this.hit++
            this.totalHits++;
            player.syncBoard();
            return true;
        }

        else {
            this.board[target] = 'MISS'
            player.syncBoard();
            console.log('MISS')
            return true;
        }
    }

    allSunk() {
        //17 hit spaces
        if (this.totalHits === this.ships.length) {
            return true;
        } 
        else {
            return false;
        }

    }
}

export class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
        this.guesses = []
    }

    takeTurn(guess) {
        this.board.receiveAttack(this, guess);
        //console.log(validTurn)
    }

    autoTurn() {
        console.log('autoturn')
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
          }
        let validGuess = false;
        let guess;
        while (!validGuess) {
            guess = getRandomInt(0, 99);
            if (!this.guesses.includes(guess)) {
                validGuess = true;
            }
        }
        this.takeTurn(guess)
        this.guesses.push(guess)
        if (this.board.allSunk()) {
            return true;
        }
        else {
            return false;
        }
    }

    syncBoard() {
        if (this.name === "Human") {
            let playerChildren = playerBoard.children;
            for (let i = 0; i < 100; i++) {
                if (typeof this.board.board[i] === "object") {
                    playerChildren[i].classList.add("ship");
                }
                if (this.board.board[i] === 'MISS') {
                    playerChildren[i].classList.add("missed")
                }
                if (this.board.board[i] === 'HIT') {
                    playerChildren[i].classList.add("hit");
                }
            }
        }
        else if (this.name === "Computer") {
            //let computerBoard = document.getElementById('computerBoard');
            let computerChildren = computerBoard.children;
            for (let i = 0; i < 100; i++) {
                if (typeof this.board.board[i] === "object") {
                    computerChildren[i].classList.add("ship");
                }
                if (this.board.board[i] === 'MISS') {
                    computerChildren[i].classList.add("missed")
                }
                if (this.board.board[i] === 'HIT') {
                    computerChildren[i].classList.add("hit");
                }
            }
        }
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
}

export function syncBoard(player) {
    if (player.name === "Human") {
        console.log(player.name)
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
        console.log(player.name)
        //let computerBoard = document.getElementById('computerBoard');
        let computerChildren = computerBoard.children;
        for (let i = 0; i < 100; i++) {
            //if (typeof player.board.board[i] === "object") {
            //    computerChildren[i].classList.add("ship");
            //}
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
    playerTwo.board.placeShip('Carrier', 0, 'horizontal')
    playerTwo.board.placeShip('Battleship', 15, 'vertical')
    playerTwo.board.placeShip('Destroyer', 20, 'horizontal')
    playerTwo.board.placeShip('Submarine', 29, 'vertical')
    playerTwo.board.placeShip('Patrol Boat', 72, 'horizontal')
    initializeDOMBoard([playerOne, playerTwo]);
    playerOne.syncBoard();
    playerTwo.syncBoard();
    return [playerOne, playerTwo];
}

export function playerTurn(player) {
    //do nothing until click on valid cell, which will trigger

    //check if all sunk,
}

export function computerTurn(player) {

}
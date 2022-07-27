class Ship {
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
        this.hit = new Array(this.length);
        this.sunk = false;
    }

    hitShip(location) {
        this.hit[location] = 'X'
    }

    isSunk() {
        //if this ship has empty slot in array it isn't sunk
        if (this.hit.includes(undefined)) {
            return false;
        }
        else {
            return true;
        }
    }

}

class Gameboard {
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
    }

    changeBoard(index, marker) {
        let row = index[0];
        let col = index[1];
        this.board[row][col] = marker
    }

    placeShip(shipType, startPosition, direction) {
        //take ship.length and array of position coordinates and add to board
        const ship = new Ship(shipType)
        let x = startPosition[0];
        let y = startPosition[1];
        if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard([x,y], 'S');
                x++;
            }
        }
        else if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.changeBoard([x,y], 'S');
                y++;
            }
        }

    }
}

const gameboard = new Gameboard();
gameboard.placeShip('Carrier', [0,0], 'horizontal')
gameboard.placeShip('Battleship', [5,5], 'vertical')
console.log(gameboard.board)
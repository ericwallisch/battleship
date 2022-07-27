class ship {
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

const battleship = new ship('Battleship');
console.log(battleship);
battleship.hitShip(0);
battleship.hitShip(1);
battleship.hitShip(2);
battleship.hitShip(3); 
console.log(battleship);
console.log(battleship.isSunk());
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
        this.hit = 0;
        this.sunk = false;
    }

}

const battleship = new ship('Battleship');
console.log(battleship);

const carrier = new ship('Carrier');
console.log(carrier);
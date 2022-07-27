import { Ship , Gameboard } from './script.js'

test('create ship', () => {
    const battleship = new Ship('Battleship');
    expect(battleship).toBe(battleship);
})

test('hit ship', () => {
    const battleship = new Ship('Battleship');
    battleship.hitShip();
    battleship.hitShip();
    expect(battleship.hit).toEqual(2)
})

test('see if ship is sunk - it is not', () => {
    const battleship = new Ship('Battleship');
    battleship.hitShip(0);
    battleship.hitShip(1);
    expect(battleship.isSunk()).toBe(false);
})

test('see if ship is sunk - it is', () => {
    const battleship = new Ship('Battleship');
    battleship.hitShip(0);
    battleship.hitShip(1);
    battleship.hitShip(2);
    battleship.hitShip(3);
    expect(battleship.isSunk()).toBe(true);
})

// test('gameboard init creates gameboard array', () => {
//     const gameboard = new Gameboard();
//     expect(gameboard.board).toEqual(new Array(10).fill(new Array(10).fill(0)))
// })

// test('place ship in gameboard', () => {
//     const gameboard = new Gameboard();
//     gameboard.placeShip('Battleship', [0,0], 'vertical')
//     expect(gameboard.board).toEqual(
//         [,,,,,,,,,,]
//     )
// })
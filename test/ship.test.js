import shipFactory from "../src/ship"


test('Create Ship', () => {
    const battleship = shipFactory(4)
    expect(battleship.hitsTaken).toBe(0)
    expect(battleship.isSunk()).toBe(false)
    expect(battleship.length).toBe(4)
})

test('Ship Hit', () => {
    const submarine = shipFactory(3)
    submarine.hit()
    expect(submarine.hitsTaken).toBe(1)
})

test('Ship Sunk', () => {
    const patrolBoat = shipFactory(2)
    patrolBoat.hit()
    expect(patrolBoat.isSunk()).toBe(false)
    patrolBoat.hit()
    expect(patrolBoat.isSunk()).toBe(true)
})
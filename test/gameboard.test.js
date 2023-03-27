import boardFactory from "../src/gameboard"
import shipFactory from "../src/ship"


test('Create Board', () => {
    const testBoard = boardFactory(10,10)
    expect(testBoard.board[0][1].location).toBe('b1')
    expect(testBoard.board[9][9].location).toBe('j10')
})

test('Place Ship', () => {
    const testBoard = boardFactory(5,5)
    testBoard.placeShip(shipFactory(2), 0, 0, false)
    

    expect(testBoard.placeShip(shipFactory(2), 5, 5, false)).toBe(false)
    expect(testBoard.board[0][1].contains).not.toBeNull()
    expect(testBoard.board[0][2].contains).toBeNull()
})

test('Send Hit', () => {
    const testBoard = boardFactory(5,5)
    testBoard.placeShip(shipFactory(2), 0, 0, true)
    const result = testBoard.receiveAttack(1,0)
    expect(result).toBe('HIT')
    expect(testBoard.board[1][0].contains.hitsTaken).toBe(1)
    expect(testBoard.receiveAttack(1,1)).toBe('MISS')
    expect(testBoard.receiveAttack(-1,1)).toBe(false)
    expect(testBoard.receiveAttack(1,1)).toBe(false)
    expect(testBoard.attackedSpaces.length).toBe(2)
})

test('No Ships Left', () => {
    const testBoard = boardFactory(5,5)
    testBoard.placeShip(shipFactory(2), 0, 0, true)
    expect(testBoard.noShipsLeft()).toBe(false)
    testBoard.receiveAttack(0,0)
    testBoard.receiveAttack(1,0)
    expect(testBoard.totalShips).toBe(1)
    expect(testBoard.sunkShips).toBe(1)
    expect(testBoard.noShipsLeft()).toBe(true)
})
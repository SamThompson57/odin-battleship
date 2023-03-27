import boardFactory from "../src/gameboard"
import { cpuFactory, playerFactory } from "../src/player"

test('Players created and a CPU attack', () => {
    const playerA = playerFactory()
    const comB = cpuFactory(5, 5)

    playerA.playerBoard = boardFactory(5, 5) 
    comB.playerBoard = boardFactory(5, 5)

    playerA.opponentBoard = comB.playerBoard
    comB.opponentBoard = playerA.playerBoard

    expect(comB.takeTurn()).toBe('MISS')
    expect(comB.availibleTargets.length).toBe(24)
})
import gameState from "../src/gamestates"


test('Create New Game', () => {
    const newGame = gameState(true, 5, 5, [5,4,3,3,2])

    expect(newGame.playerB.takeTurn()).toBe('MISS')
    expect(newGame.playerB.availibleTargets.length).toBe(24)
})

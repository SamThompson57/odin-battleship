import boardFactory from "./gameboard"
import { cpuFactory, playerFactory } from "./player"

const gameState = (bCPU, height, width, shipArr) => {
    const playerA = playerFactory()
    const playerB = bCPU ? cpuFactory(height, width) : playerFactory()

    playerA.playerBoard = boardFactory(height, width) 
    playerB.playerBoard = boardFactory(height, width)
    
    playerA.opponentBoard = playerB.playerBoard
    playerB.opponentBoard = playerA.playerBoard

    let mainState = false 
    
    function announceWinner() {
        //Announce Winner
    }
    // Anounce Winner
    return {playerA, playerB, mainState, announceWinner}
}

export default gameState
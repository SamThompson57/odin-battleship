import boardFactory from "./gameboard"
import { cpuFactory, playerFactory } from "./player"
import shipFactory from "./ship"

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

    // **** START OF THE PLACE SHIP SECTION ******

    //Player A places his ships
    playerA.playerBoard.placeShip(shipFactory(shipArr[0]), 1, 1, true, 'A') // place A ship on e3

    //Player B places their ships if they are human, if they are CPU they do it random
    playerB.playerBoard.placeShip(shipFactory(shipArr[0]), 5, 5, false, null) // Place B ship on b3 

    mainState = true

    // ***** END OF THE PLACE SHIP SECTION *****

    return {playerA, playerB, mainState, announceWinner}
}

export default gameState
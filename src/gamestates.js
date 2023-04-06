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
    let gameOver = false 
    
    function announceWinner(loser) {
        console.log(mainState)
        if (loser === 'A') console.log ('Player B Wins')
        else console.log('Player A wins')
        //NEED TO NOW CREATE A STATE THAT STOPS PEOPLE FROM HITTING ANY MORE BUTTONS
    }

    // **** START OF THE PLACE SHIP SECTION ******

    // !!! Need this to be called with the board squares e.g. b3

    //Player A places his ships
    playerA.playerBoard.placeShip(shipFactory(shipArr[0]), 'a1', 1, 'A') // place A ship on e3
    playerA.playerBoard.placeShip(shipFactory(shipArr[1]), 'b1', 1, 'A')
    playerA.playerBoard.placeShip(shipFactory(shipArr[2]), 'c1', 1, 'A')
    playerA.playerBoard.placeShip(shipFactory(shipArr[3]), 'd1', 1, 'A')
    playerA.playerBoard.placeShip(shipFactory(shipArr[4]), 'j1', 1, 'A')
    // Player B places their ships if they are human, if they are CPU they do it random
    playerB.placeOwnShips(shipArr) // Place B ship on b3 

    mainState = true

    // ***** END OF THE PLACE SHIP SECTION *****

    let playerATurn = true

    function nextTurn() {
        if (this.gameOver)return
        console.log('next turn')
        playerATurn = !playerATurn
        if (!playerATurn && bCPU){
            playerB.takeTurn()
        }
    }

    return {playerA, playerB, mainState, announceWinner, nextTurn, gameOver}
}

export default gameState
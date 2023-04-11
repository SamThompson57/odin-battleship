import { currentGame } from "."

const moveContainer = document.createElement('div')
const playerAMoves = document.createElement('div')
const playerBMoves = document.createElement('div')

export function announceUpdate(){
    const announcer = document.getElementById('announcer') 
    
    if (currentGame.gameOver === true) return
    
    if (currentGame.mainState === false ) announcer.textContent = `Place your (${currentGame.shipArr[currentGame.playerA.playerBoard.totalShips]} square long) Ship`
    
    
    else { 
        announcer.textContent = 'Select a Square to attack'
        
        
        playerAMoves.setAttribute('id', 'plyrA')
        playerBMoves.setAttribute('id', 'plyrB')
        
        announcer.appendChild(moveContainer)
        moveContainer.appendChild(playerAMoves)
        moveContainer.appendChild(playerBMoves)

        

        //playerAMoves.textContent = 'Player A:'
        //playerBMoves.textContent = 'Player B:'

    }

}
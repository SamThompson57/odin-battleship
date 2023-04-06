

// Code to 

import { currentGame } from "."

export function announceUpdate(){
    if (currentGame.gameOver === true) return
    const announcer = document.getElementById('announcer') 
    if (currentGame.mainState === false ) announcer.textContent = `Place your (${currentGame.shipArr[currentGame.playerA.playerBoard.totalShips]} square long) Ship`
}
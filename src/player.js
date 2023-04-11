import { currentGame } from "."
import { arrToCoord } from "./coordConverter"
import shipFactory from "./ship"

const boardLetters = "abcdefghijklmnopqrstuvwxyz".split('')

export const playerFactory = () => {
    // Here we want to put in the actions that the player can take 
    let playerBoard = null
    
    let opponentBoard = null // When the game starts they will need to be assigned an opponent to allow them to attack a board
    function takeTurn(x, y, targetPlayer){
        console.log(x)
        //Sends an attack to the opponents board
        return this.opponentBoard.receiveAttack(boardLetters.indexOf(x), y, targetPlayer)
    }
    return {takeTurn, opponentBoard, playerBoard}
}

export const cpuFactory = (height, width) => {
    let playerBoard = null
    let opponentBoard = null
    function buildTargets(){
        let boardMap = []
        for(let y = 1; y < height+1 ; y++){ // 1, 2, 3, 4, 5 ...etc
            for(let x = 0; x < width; x++){ // 0, 1, 2, 3, 4 ...etc
                boardMap.push(boardLetters[x] + y)
            }
        }
        return boardMap
    }
    let availibleTargets = buildTargets()
    function takeTurn(){
        const rndindex = Math.floor(Math.random() * availibleTargets.length)
        const coords = availibleTargets[rndindex].split('')
        availibleTargets.splice(rndindex, 1)
        const cordOfY = coords.slice(1).join('')
        const cordOfX = boardLetters.indexOf(coords[0])
        const status = this.opponentBoard.receiveAttack( cordOfX, cordOfY, 'A')
        const plyrB = document.getElementById('plyrB')
        plyrB.textContent = `Player B: ${boardLetters[cordOfX] + cordOfY} - ${status}`
        currentGame.nextTurn()
        return status
    }
    function placeOwnShips(shipArray){
        console.log(shipArray)
        let allSpaces = []
        let horrSpaces = availibleTargets
        let vertSpaces = availibleTargets 
        allSpaces.push(horrSpaces)
        allSpaces.push(vertSpaces)
        shipArray.forEach(shipElement => {
            let shipPlaced = false
            while(!shipPlaced){
                const alignment = Math.floor(Math.random() * 2)
                const rndindex = Math.floor(Math.random() * allSpaces[alignment].length)

                /*const coords = allSpaces[alignment][rndindex]
                allSpaces[alignment].splice(rndindex, 1)
                const cordOfY = coords[y]
                const cordOfX = boardLetters.indexOf(coords[0])
                */
                if(this.playerBoard.placeShip(shipFactory(shipElement), allSpaces[alignment][rndindex], alignment, 'B')) shipPlaced = true
                
                // placeShip(ship, xStart, yStart, vertical, player)
                console.log(shipPlaced)
            }
        });
    }
    return {takeTurn, opponentBoard, playerBoard, availibleTargets, placeOwnShips}
}

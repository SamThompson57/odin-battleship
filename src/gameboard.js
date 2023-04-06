import { currentGame } from "."
import { arrToCoord, coordToArr } from "./coordConverter"
import shipFactory from "./ship"

export const boardLetters = "abcdefghij".split('')

class Space {
    constructor(location){
        this.location = location
        this.contains = null
        this.targetable = true
    }
}

const boardFactory = (width, height) => {
    function buildSquares(){
        let boardMap = []
        
        for(let y = 1; y < height+1 ; y++){
            let line = []
            for(let x = 0; x < width; x++){
                const square = new Space(boardLetters[x] + y)
                line.push(square)
            }
            boardMap.push(line)
        }
        return boardMap
    }
    const board = buildSquares()
    let totalShips = 0
    let sunkShips = 0

    function placeShip(ship, coord, vertical, player) {
        console.log(coord)
        const coordArr = coordToArr(coord)
        console.log(coordArr)
        const yStart = coordArr[0]
        const xStart = coordArr[1]
        let xAdd = 0
        let yAdd = 0
        if(vertical > 0) {yAdd = 1}
        else {xAdd = 1}
        
        //Check if the placement is legal (Not able to place ships in no empty or non existenet squares)
        for(let i = 0; i < ship.length; i ++){
            if (this.board[yStart + (yAdd * i)] === undefined || this.board[yStart + (yAdd * i)][xStart + (xAdd * i)] === undefined) {
                console.log('Illegal placement: Undefined Space')
                return false;
            }
            if (this.board[yStart + (yAdd * i)][xStart + (xAdd * i)].contains != null){
                console.log('Illegal placement: Space occupied')
                return false;
            }
        
        }

        for(let i = 0; i < ship.length; i ++){
            this.board[yStart + (yAdd * i)][xStart + (xAdd * i)].contains = ship
            if(player === 'A'){
                const shipSquare = document.getElementById(`${boardLetters[xStart + (xAdd * i)]}${yStart+(yAdd * i)+1}${player}`)
                shipSquare.setAttribute('class','ship')
                // Drawing needed to draw physical ships on the board
            }
            
        }
        this.totalShips ++
        return true
    }

    let attackedSpaces = []
    
    function noShipsLeft() {
        if (this.totalShips === this.sunkShips) return true
        return false
    }

    function receiveAttack(x , y, target) {
        if (currentGame.gameOver === true) return false
        if(this.board[y-1] === undefined || this.board[y-1][x] === undefined)return false
        if(!this.board[y-1][x].targetable) return false
        this.board[y-1][x].targetable = false
        this.attackedSpaces.push(this.board[y-1][x])
        if(this.board[y-1][x].contains) {
            this.board[y-1][x].contains.hit()
            
            const hit = document.createElement('img')
            document.getElementById(`${boardLetters[x]}${y}${target}`).appendChild(hit)
            hit.src = '../img/hit.png'
            if(this.board[y-1][x].contains.isSunk()) {
                this.sunkShips ++
                if (this.noShipsLeft()){
                    currentGame.gameOver = true
                    document.getElementById('announcer').textContent = 'GAME OVER'
                    currentGame.announceWinner(target)
                    return 'GAME OVER'
                }
                return 'SHIP SUNK'
             } // Add the noShipsLeft check here
            return 'HIT'
        }
        // Add the drawing for miss marker here
        const miss = document.createElement('img')
        document.getElementById(`${boardLetters[x]}${y}${target}`).appendChild(miss)
        miss.src = '../img/close-box.png'
        return 'MISS'
    }

    return {board, placeShip, receiveAttack, attackedSpaces, noShipsLeft, totalShips, sunkShips}
}

export default boardFactory
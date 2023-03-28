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

    function placeShip(ship, xStart, yStart, vertical, player) {
        let xAdd = 0
        let yAdd = 0
        if(vertical) {yAdd = 1}
        else {xAdd = 1}

        //Check if the placement is legal (Not able to place ships in no empty or non existenet squares)
        for(let i =0; i < ship.length; i ++){
            if ((this.board[yStart + (yAdd * i)] === undefined || this.board[yStart + (yAdd * i)][xStart + (xAdd * i)] === undefined) || this.board[yStart + (yAdd * i)][xStart + (xAdd * i)].contains !== null) return false;
        }

        for(let i =0; i < ship.length; i ++){
            this.board[yStart + (yAdd * i)][xStart + (xAdd * i)-1].contains = ship
            if(player){
                const shipSquare = document.getElementById(`${boardLetters[xStart + (xAdd * i)-1]}${yStart + (yAdd * i)}${player}`)
                shipSquare.setAttribute('class','ship')
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
        console.log(`Y: ${y}, X: ${x}, Target: ${target}`)
        if(this.board[y] === undefined || this.board[y][x] === undefined)return '404'
        if(!this.board[y][x].targetable) return 'Already Shot here'
        this.board[y][x].targetable = false
        this.attackedSpaces.push(this.board[y][x])
        if(this.board[y][x].contains) {
            this.board[y][x].contains.hit()
            
            const hit = document.createElement('img')
            document.getElementById(`${boardLetters[x]}${y}${target}`).appendChild(hit)
            hit.src = '../img/hit.png'
            if(this.board[y][x].contains.isSunk()) {
                this.sunkShips ++
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
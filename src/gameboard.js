import shipFactory from "./ship"

const boardLetters = "abcdefghijklmnopqrstuvwxyz".split('')

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
            for(let x = 0; x < width+1; x++){
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
    function placeShip(ship, xStart, yStart, vertical) {
        let xAdd = 0
        let yAdd = 0
        if(vertical) {yAdd = 1}
        else {xAdd = 1}
        for(let i =0; i < ship.length; i ++){
            this.board[yStart + (yAdd * i)][xStart + (xAdd * i)].contains = ship
        }
        this.totalShips ++
    }

    let attackedSpaces = []
    
    function noShipsLeft() {
        if (this.totalShips === this.sunkShips) return true
        return false
    }

    function receiveAttack(y , x) {
        if(this.board[y] === undefined || this.board[y][x] === undefined)return false
        if(!this.board[y][x].targetable) return false
        this.board[y][x].targetable = false
        this.attackedSpaces.push(this.board[y][x])
        if(this.board[y][x].contains) {
            this.board[y][x].contains.hit()
            if(this.board[y][x].contains.isSunk()) this.sunkShips ++ // Add the noShipsLeft check here
            return 'HIT'
        }
        return 'MISS'
    }

    return {board, placeShip, receiveAttack, attackedSpaces, noShipsLeft, totalShips, sunkShips}
}

export default boardFactory
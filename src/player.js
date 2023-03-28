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
        return this.opponentBoard.receiveAttack(coords[1]-1, boardLetters.indexOf(coords[0]), 'A') 
    }
    return {takeTurn, opponentBoard, playerBoard, availibleTargets}
}

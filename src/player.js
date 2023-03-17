const boardLetters = "abcdefghijklmnopqrstuvwxyz".split('')

const playerFactory = () => {
    // Here we want to put in the actions that the player can take 
    let opponentBoard = null // When the game starts they will need to be assigned an opponent to allow them to attack a board
    function takeTurn(attackSquare){
        const coords = attackSquare.split('')
        //Sends an attack to the opponents board
        opponentBoard.recieveAttack(Number(coords[1]), boardLetters.indexOf(coords[0]))
    }
    return {takeTurn, opponentBoard}
}

const cpuFactory = (height, width) => {
    let opponentBoard = null
    function buildTargets(){
        let boardMap = []
        for(let y = 1; y < height+1 ; y++){
            for(let x = 0; x < width+1; x++){
                line.push(boardLetters[x] + y)
            }
        }
        return boardMap
    }
    let availibleTargets = buildTargets()
    function takeTurn(){
        const rndindex = Math.floor(Math.random() * availibleTargets.length)
        const coords = availibleTargets[rndindex].split('')
        opponentBoard.recieveAttack(Number(coords[1]), boardLetters.indexOf(coords[0]))
        availibleTargets.splice(rndindex, 1)
    }
    return {takeTurn, opponentBoard}
}

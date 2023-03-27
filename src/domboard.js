import { currentGame } from "."
import { boardLetters } from "./gameboard"
import gameState from "./gamestates"

function createBoard(owningPlayer, height, width){ 
    //I will likely need to add stipulations such as width and height to the above
    const board = document.createElement('div')
    board.setAttribute('class', 'board')
    board.setAttribute('id', 'board')

    for(let y = height; y > 0 ; y--){
        const label = document.createElement('div')
        label.setAttribute('id', `row${y}`)
        label.setAttribute('class', 'row')
        label.textContent = `${y}`
        board.appendChild(label)
        for(let x = 0; x < width; x++){
            const square = document.createElement('div');
            square.setAttribute('id', `${boardLetters[x] + y + owningPlayer}`);
            if ((y+x)%2 == 1){
                square.setAttribute('class', owningPlayer === 'B' ? 'red' : 'dark')
            } else square.setAttribute('class', 'light') 
            board.appendChild(square)
            
            square.onclick = () => {
                console.log(square.id)
                let coordinates = square.id.split('')
                const player = coordinates.splice(-1).join('')
                const row = coordinates.splice(1).join('')
                const collum = coordinates
                if (player === 'B'){
                    console.log(`Attacking ${collum+row}`)
                    console.log(currentGame.playerA.takeTurn(`${collum+row}`))
                } 
                

            }
        }
    }
    let collumns = boardLetters
    collumns.unshift('')
    collumns.splice(width+1)
    collumns.forEach(num => {
        const numLabel = document.createElement('div')
        numLabel.setAttribute('id', `col${num}`)
        numLabel.setAttribute('class', 'col')
        numLabel.textContent = num
        board.appendChild(numLabel)
    })
    collumns.shift()

    return board
}

export default createBoard
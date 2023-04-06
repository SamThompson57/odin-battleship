import { currentGame } from "."
import { announceUpdate } from "./anounce"
import { boardLetters } from "./gameboard"
import gameState from "./gamestates"
import shipFactory from "./ship"

let placeDirection = 1

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
            
            // Want to change the mouse based on the action that will be taken
            square.onmouseover = () => {
                if (currentGame.mainState === false && owningPlayer === 'A'){
                    square.style.cursor = placeDirection ? `url(../img/vert.png)25 10,auto` : 'url(../img/hor.png)25 10,auto'
                }
                else square.style.cursor = 'auto'
            }

            square.addEventListener('contextmenu', function(ev) {
                ev.preventDefault();
                placeDirection = (placeDirection + 1)%2
            }, false);

            square.onclick = () => {
                let coordinates = square.id.split('')
                const player = coordinates.splice(-1).join('')
                const row = coordinates.splice(1).join('')
                const collum = coordinates[0]
                if (currentGame.mainState === true){
                    console.log(square.id)
                    
                    if (player === 'B'){
                        const status = currentGame.playerA.takeTurn(collum, row, player)
                        console.log(`STATUS: ${status}`)
                        if (status) currentGame.nextTurn()
                    } 
                }
                else if (player === 'A'){
                    currentGame.playerA.playerBoard.placeShip(shipFactory(currentGame.shipArr[currentGame.playerA.playerBoard.totalShips]), collum+row, placeDirection, 'A' )
                    if (currentGame.playerA.playerBoard.totalShips >= currentGame.shipArr.length) currentGame.mainState = true
                }
                announceUpdate()

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
import createBoard from "./domboard.js"
import gameState from "./gamestates.js"

const content = document.getElementById('content')

const anouncer = document.createElement('div')
anouncer.setAttribute('id', 'announcer')
content.appendChild(anouncer)

anouncer.textContent = 'Select a square to attack'

const playerAContainer = document.createElement('div')
playerAContainer.setAttribute('id', 'playerB')

const playerBContainer = document.createElement('div')
playerBContainer.setAttribute('id','playerA')

const boardB = createBoard('B', 10, 10, 'red') /// this should be done based on the player actions.
const boardA = createBoard('A', 10, 10, 'dark')


content.appendChild(playerBContainer)
content.appendChild(playerAContainer)

playerAContainer.appendChild(boardA)
playerBContainer.appendChild(boardB)

export let currentGame = gameState(true, 10, 10, [5, 4 , 3 , 3 , 2 ])


/* TASK LIST

   
5) Finish it up
*********   
    a) There are several options available for letting users place their 
    ships. You can let them type coordinates for each ship, or 
    investigate implementing drag and drop.
    
    b) You can polish the intelligence of the computer player by having 
    it try adjacent slots after getting a ‘hit’.

    c) Optionally, create a 2 player option that lets users take turns by 
    passing the device back and forth. If you’re going to go this route, 
    make sure the game is playable on a mobile screen and implement a 
    ‘pass device’ screen so that players don’t see each others boards!

*/
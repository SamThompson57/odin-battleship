import { boardLetters } from "./gameboard"

export function coordToArr(coordString){ // e.g a10
    let ansArr = []
    const coords = coordString.split('') // a, 1, 0
    const cordOfY = Number(coords.slice(1).join('')) //10
    const cordOfX = boardLetters.indexOf(coords[0]) // 1
    ansArr.push(cordOfY-1)
    ansArr.push(cordOfX)
    return ansArr // [9,0]
}

export function arrToCoord(coordArr){ // [9, 0]
    let ans = boardLetters[coordArr[1]] + (coordArr[0] + 1)
    return ans
}
const shipFactory = (length) => {
    let hitsTaken = 0;
    function isSunk() {
        if (this.hitsTaken >= this.length) return true // Used >= in the event of features that do more damage in a single square
        return false
    };
    function hit(){
        this.hitsTaken++
        //if(hits === length) 
    }
    return { length, hitsTaken, isSunk, hit}
}

export default shipFactory
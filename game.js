function Game (first)
{
    this.turn = first
    this.board = new Board(6, 7)
    console.log(this.board.toString())

    // callbacks
    this.placementCallbacks = []
    this.placementCallbacks.push(function(r, c) {
        console.log("piece placed at [%d, %d]", r, c)
    })

}

Game.prototype.drop = function (colId)
{
    var newPieceLocation = this.board.drop(this.turn, colId)
    if (!newPieceLocation) {
        return
    }

    console.log(this.board.toString())

    this.placementCallbacks.forEach(function (callback) {
        callback(newPieceLocation[0], newPieceLocation[1])
    })

    this.turn = (this.turn == PLAYER0 ? PLAYER1 : PLAYER0)
}

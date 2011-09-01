function Game (first)
{
    this.turn = first
    this.board = new Board(6, 7)
    console.log(this.board.toString())

    // callbacks
    this.placementCallbacks = []
    this.placementCallbacks.push(function(p) {
        console.log("piece placed at " + p)
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
        callback(newPieceLocation)
    })

    this.turn = (this.turn == PLAYER0 ? PLAYER1 : PLAYER0)
}

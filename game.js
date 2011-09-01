function Game (first)
{
    this.turn = first
    this.board = new Board(6, 7)
    console.log(this.board.toString())

    // callbacks
    this.placementCallbacks = []
    this.registerPlacementCallback(function(p) {
        console.log("piece placed at " + p)
    }, this)
    this.registerPlacementCallback(this.checkForWin, this)

}

Game.prototype.drop = function (colId)
{
    var newPieceLocation = this.board.drop(this.turn, colId)
    if (!newPieceLocation) {
        return
    }

    console.log(this.board.toString())

    this.placementCallbacks.forEach(function (callback) {
        callback[1].call(callback[0], newPieceLocation)
    })

    this.turn = (this.turn == PLAYER0 ? PLAYER1 : PLAYER0)
}

Game.prototype.registerPlacementCallback = function (cb, scope)
{
    this.placementCallbacks.push([scope, cb])
}

Game.prototype.checkForWin = function (p)
{
    var lists = this.board.visit(p)
    for (l in lists) {
        var list = lists[l]
        if (list.length >= 4) {
            console.log("check: " + list)
            var successes = 0
            for (c in list) {
                var cell = list[c]
                if (this.board.at(p) == this.board.at(cell)) {
                    successes++
                    console.log("successes: " + successes)
                } else {
                    break
                }
                if (successes >= 4) {
                    console.log("WIN")
                }
            }
        }
    }
}

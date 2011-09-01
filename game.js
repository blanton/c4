
Game = Ext.extend(Ext.util.Observable, {
    constructor: function (config) {
        this.addEvents({
            'pieceDropped': true,
            'win': true
        })

        this.listeners = config.listeners

        Game.superclass.constructor.call(this, config)

        // finally
        this.turn = PLAYER0
        this.board = new Board(6, 7)
        this.addListener('pieceDropped', this.winCheck)
        console.log(this.board.toString())
    }
})

Game.prototype.drop = function (colId)
{
    var newPieceLocation = this.board.drop(this.turn, colId)
    if (!newPieceLocation) {
        return
    }

    console.log(this.board.toString())

    this.fireEvent('pieceDropped', newPieceLocation)

    this.turn = (this.turn == PLAYER0 ? PLAYER1 : PLAYER0)
}

Game.prototype.winCheck = function (p0)
{
    var lists = this.board.visit(p0)
    Ext.each(lists, function (list) {
        if (list.length >= 4) {
            var successes = 0
            Ext.each(list, function (cell) {
                if (this.board.at(p0) == this.board.at(cell)) {
                    successes++
                } else {
                    return false  // no need to check more
                }
                if (successes >= 4) {
                    this.fireEvent('win', this.board.at(p0))
                    return false  // no need to check more
                }
            }, this)
        }
    }, this)
}

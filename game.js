
/**
 * Game tracks game logic.
 *
 * Extends Observable for event support.
 *
 * Tracks turn, the board, and whether or not the game is locked (after win).
 */

/**
 * Create a game.
 */
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
        this.locked = false
    }
})

/**
 * Drop a piece for player at given column.
 *
 * Functions as a wrapper around board.drop().
 */
Game.prototype.drop = function (playerId, colId)
{
    if (this.locked || playerId != this.turn) {
        return
    }

    var newPieceLocation = this.board.drop(playerId, colId)
    if (!newPieceLocation) {
        return
    }

    this.turn = (this.turn == PLAYER0 ? PLAYER1 : PLAYER0)

    this.fireEvent('pieceDropped', newPieceLocation)
}

/**
 * Check the board for a win now that p0 has been placed.
 */
Game.prototype.winCheck = function (p0)
{
    var lists = this.board.visit(p0)
    var p0Value = this.board.at(p0)

    for (var dir = 0; dir < lists.length - 1; dir += 2) {
        var count = 0
        var list0 = lists[dir]
        var list1 = lists[dir + 1]
        for (var i = 1; i < list0.length; i++) {
            if (this.board.at(list0[i]) != p0Value) {
                break
            }
            count++
        }
        for (var i = 1; i < list1.length; i++) {
            if (this.board.at(list1[i]) != p0Value) {
                break
            }
            count++
        }
        if (count >= 3) {
            this.locked = true
            this.fireEvent('win', p0Value)
            break
        }
    }
}

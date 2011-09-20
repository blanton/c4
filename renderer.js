
/**
 * The interface is an HTML 5 Canvas.  The Renderer hooks into the game and
 * provides a drawing routine.
 */

/**
 * Create a Renderer attached to given game.
 */
Renderer = Ext.extend(Object, {
    constructor: function (config) {
        this.game = config.game
        Renderer.superclass.constructor.call(this, config)

        this.game.addListener('pieceDropped', this.render, this)
        this.game.addListener('win', this.onWin, this)
    }
})

/**
 * Render after events.
 */
Renderer.prototype.render = function ()
{
    var radius = 40

    var ctx = document.getElementById('canvas').getContext('2d')

    ctx.clearRect(0, 0, 700, 600)

    // draw yellow background
    ctx.fillStyle = "yellow"
    ctx.fillRect(0, 0, 700, 600)

    // draw pieces
    for (var x = 0; x < this.game.board.nbCols; x++) {
        for (var y = 0; y < this.game.board.nbRows; y++) {
            var p = vec2(x * 100 + radius + 10, y * 100 + radius + 10)
            var cell = this.game.board.at(vec2(x, y))
            switch (cell) {
            case EMPTY:
                ctx.fillStyle = "white"
                break
            case PLAYER0:
                ctx.fillStyle = "red"
                break
            case PLAYER1:
                ctx.fillStyle = "black"
                break
            default:
                ctx.fillStyle = "yellow"
                break
            }
            ctx.beginPath()
            ctx.arc(p.x, p.y, radius, 0, Math.PI*2, true)
            ctx.fill()
        }
    }

}

/**
 * Hook into win to supply notifications.
 */
Renderer.prototype.onWin = function (player)
{
    // defer is so rendering can take place before alert
    switch (player) {
    case PLAYER0:
        Ext.defer(function () {
            alert("YOU WIN")
        }, 10)
        break
    case PLAYER1:
        Ext.defer(function () {
            alert("you lose")
        }, 10)
        break
    default:
        break
    }
}

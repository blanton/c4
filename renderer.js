Renderer = Ext.extend(Object, {
    constructor: function (config) {
        this.game = config.game
        Renderer.superclass.constructor.call(this, config)

        this.game.addListener('pieceDropped', this.render, this)
    }
})

Renderer.prototype.render = function ()
{
    var radius = 40

    var ctx = document.getElementById('canvas').getContext('2d')

    ctx.clearRect(0, 0, 700, 600)
    ctx.fillStyle = "yellow"
    ctx.fillRect(0, 0, 700, 600)

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

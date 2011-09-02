var app = new Ext.Application({
    launch: function() {
        new Ext.Panel({
            fullscreen: true,
            html: '<canvas id="canvas" width="700" height="600"></canvas>'
        })

        this.game = new Game(PLAYER0)

        this.game.addListener('win', function (player) {
            console.log("WINNER: " + player)
        })

        this.agent = new Agent({
            game: this.game
        })

        this.renderer = new Renderer({
            game: this.game
        })
        this.renderer.render()
    }
})

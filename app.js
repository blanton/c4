var app = new Ext.Application({
    launch: function() {
        new Ext.Panel({
            fullscreen: true,
            html: '<canvas id="canvas" width="700" height="600"></canvas>',

            afterRender: function() {
                this.mon(this.el, {
                    tap: function(event) {
                        var pos = Math.floor(event.event.x/100)
                        app.game.drop(PLAYER0, pos)
                    }
                })
            }

        })

        this.game = new Game(PLAYER0)

        this.game.addListener('win', function (player) {
            console.log("WINNER: " + player)
        })

        this.agent = new Agent({
            game: this.game,
            level: DEFAULT_LEVEL
        })

        this.renderer = new Renderer({
            game: this.game
        })
        this.renderer.render()
    }
})

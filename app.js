
/**
 * Sench Touch application.
 */

var app = new Ext.Application({
    launch: function() {
        new Ext.Panel({
            fullscreen: true,
            html: '<canvas id="canvas" width="700" height="600"></canvas>',

            // register a tap callback so we can drop pieces
            afterRender: function() {
                this.mon(this.el, {
                    tap: function(event) {
                        var pos = Math.floor(event.event.x/100)
                        app.game.drop(PLAYER0, pos)
                    }
                })
            }

        })

        // create game
        this.game = new Game({})

        // callback to print out winner
        this.game.addListener('win', function (player) {
            console.log("WINNER: " + player)
        })

        // create agent which will attach to the game's PLAYER0
        this.agent = new Agent({
            game: this.game,
            level: DEFAULT_LEVEL
        })

        // create renderer
        this.renderer = new Renderer({
            game: this.game
        })
        this.renderer.render()
    }
})

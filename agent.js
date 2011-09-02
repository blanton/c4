function Agent (cfg)
{
    this.game = cfg.game

    this.game.addListener('pieceDropped', this.onPieceDropped, this)

}

Agent.prototype.onPieceDropped = function (p)
{
    var player = this.game.board.at(p)
    if (player == PLAYER1) {
        return
    }
    this.game.drop(p.x)
}

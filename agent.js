function Agent (cfg)
{
    this.game = cfg.game
    this.level = cfg.level

    this.game.addListener('pieceDropped', this.onPieceDropped, this)

}

Agent.prototype.onPieceDropped = function (p)
{
    var player = this.game.board.at(p)
    if (player == PLAYER1) {
        return
    }
    this.run()
}

Agent.prototype.run = function ()
{
    this.moves = []

    // initialize
    for (var x = 0; x < this.game.board.cols.length; x++) {
        // create
        var move = this.moves[x] = {
            col: x,
            //score: Math.min(x, this.game.board.cols.length - x - 1)
            score: 0
        }
        // find pos
        var col = this.game.board.cols[x]
        for (var y = col.length - 1; y >= 0; y--) {
            if (col[y] == EMPTY) {
                move.pos = vec2(x, y)
                break
            }
        }
        // prevent playing full cols (position is given iff an empty is found)
        if (!move.pos) {
            move.score = -1
        }
    }

    // evaluate each possible move
    if (this.level >= 1) {
        Ext.each(this.moves, function (move) {
            if (move.score >= 0) {
                this.analyzeStage1(move.pos)
            }
        }, this)
    }

    // evaluate each possible move
    if (this.level >= 2) {
        Ext.each(this.moves, function (move) {
            if (move.score >= 0) {
                this.analyzeStage2(move.pos)
            }
        }, this)
    }


    // sort moves by score
    this.moves = this.moves.sort(function (a, b) {
        return b.score - a.score
    })

    // filter moves, keeping only those of the highest score
    var bestScore = this.moves[0].score
    var filteredMoves = []
    Ext.each(this.moves, function (move) {
        if (move.score == bestScore) {
            filteredMoves.push(move)
        }
    })
    this.moves = filteredMoves

    // choose a random move (these moves should all have the same score by now)
    var moveIdx = Math.floor(Math.random() * this.moves.length)
    this.game.drop(PLAYER1, this.moves[moveIdx].col)
}

Agent.prototype.analyzeStage1 = function (p0)
{
    var lists = this.game.board.visit(p0)

    var p0Max = 0
    var p1Max = 0
    for (var dir = 0; dir < lists.length - 1; dir += 2) {
        var p0Count = 0
        var p1Count = 0
        var list0 = lists[dir]
        var list1 = lists[dir + 1]
        for (var i = 1; i < list0.length; i++) {
            if (this.game.board.at(list0[i]) != PLAYER0) {
                break
            }
            p0Count++
        }
        for (var i = 1; i < list1.length; i++) {
            if (this.game.board.at(list1[i]) != PLAYER0) {
                break
            }
            p0Count++
        }
        for (var i = 1; i < list0.length; i++) {
            if (this.game.board.at(list0[i]) != PLAYER1) {
                break
            }
            p1Count++
        }
        for (var i = 1; i < list1.length; i++) {
            if (this.game.board.at(list1[i]) != PLAYER1) {
                break
            }
            p1Count++
        }
        if (p0Count > p0Max) {
            p0Max = p0Count
        }
        if (p1Count > p1Max) {
            p1Max = p1Count
        }
    }

    if (p1Max >= 3) {
        // for the win
        this.moves[p0.x].score += 10000
    }
    if (p0Max >= 3) {
        // block user
        this.moves[p0.x].score += 1000
    }
}

Agent.prototype.analyzeStage2 = function (p0)
{
    var lists = this.game.board.visit(p0)

    console.log("stage2: " + p0.toString())

    var p1Sum = 0
    var p1Max = 0
    for (var dir = 0; dir < lists.length - 1; dir += 2) {
        var p1Count = 0
        var list0 = lists[dir]
        var list1 = lists[dir + 1]
        for (var i = 1; i < list0.length; i++) {
            if (this.game.board.at(list0[i]) == PLAYER0) {
                break
            }
            if (this.game.board.at(list0[i]) == PLAYER1) {
                p1Count += 10
            }
            if (this.game.board.at(list0[i]) == EMPTY) {
                p1Count += 1
            }
        }
        for (var i = 1; i < list1.length; i++) {
            if (this.game.board.at(list1[i]) == PLAYER0) {
                break
            }
            if (this.game.board.at(list1[i]) == PLAYER1) {
                p1Count += 10
            }
            if (this.game.board.at(list1[i]) == EMPTY) {
                p1Count += 1
            }
        }
        console.log("p1Count: " + p1Count)
        p1Sum += p1Count
        p1Max = Math.max(p1Max, p1Count)
    }

    console.log("p1Sum: " + p1Sum)
    console.log("p1Max: " + p1Max)

    this.moves[p0.x].score += (p1Sum + p1Max)
}

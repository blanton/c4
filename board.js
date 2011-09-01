function Board (r, c)
{
    this.nbRows = r
    this.nbCols = c

    this.cols = []

    // fill cols
    for (var c = 0; c < this.nbCols; c++) {
        this.cols[c] = []
        for (var r = 0; r < this.nbRows; r++) {
            this.cols[c].push(EMPTY)
        }
    }

}

Board.prototype.toString = function ()
{
    // description
    var nfo = "Board(" + this.nbRows + ", " + this.nbCols + "):\n"

    // col headers
    nfo += "  "
    for (var c = 0; c < this.nbCols; c++) {
        nfo += c + " "
    }
    nfo += "\n"

    // rows
    for (var r = 0; r < this.nbRows; r++) {
        nfo += r + " "
        for (var c = 0; c < this.nbCols; c++) {
            nfo += this.cols[c][r] + " "
        }
        nfo += "\n"
    }

    return nfo
}

Board.prototype.drop = function (playerId, colId)
{
    console.assert(colId < this.nbCols)
    var col = this.cols[colId]
    for (var r = this.nbRows - 1; r >= 0; r--) {
        if (col[r] == EMPTY) {
            col[r] = playerId
            return vec2(colId, r)
        }
    }
    console.warn("column " + colId + " is full")
    return null
}

Board.prototype.contains = function (p)
{
    if (p.x < 0 || p.x >= this.nbCols ||
        p.y < 0 || p.y >= this.nbRows)
    {
        return false
    }
    return true
}

Board.prototype.at = function (p)
{
    return this.cols[p.x][p.y]
}

Board.prototype.visit = function (p0)
{
    var results = []

    console.log("p0: " + p0.toString())
    console.assert(this.contains(p0))

    var directions = [
        vec2( 1,  0), // W
        vec2( 1, -1), // NW
        vec2( 0, -1), // N
        vec2(-1, -1), // NE
        vec2(-1,  0), // E
        vec2(-1,  1), // SE
        vec2( 0,  1), // S
        vec2( 1,  1)  // SW
    ]

    for (d in directions) {
        var dir = directions[d]
        var p = p0
        var list = []
        while (this.contains(p)) {
            list.push(p)
            p = p.add(dir)
        }
        results.push(list)
    }

    return results
}

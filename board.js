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
            return true
        }
    }
    console.warn("column " + colId + " is full")
    return false
}

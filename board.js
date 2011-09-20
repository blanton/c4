
/**
 * Internal representation of a c4 board.
 */

/**
 * Create with the given rows and columns.
 */
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

/**
 * Drop a piece at the given column.
 *
 * The Game is responsible for turn management.
 */
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

/**
 * Helper function determines if coordinate p is contained in this board.
 */
Board.prototype.contains = function (p)
{
    if (p.x < 0 || p.x >= this.nbCols ||
        p.y < 0 || p.y >= this.nbRows)
    {
        return false
    }
    return true
}

/**
 * Returns the value at point p.
 */
Board.prototype.at = function (p)
{
    return this.cols[p.x][p.y]
}

/**
 * Utility function that finds cells related to p0.
 *
 * This returns an array of arrays.  The first level contains arrays in various
 * directions emanating from p0.
 *
 * The arrays are arranged such that, for example, W to E may be checked.  N to
 * S.  And so on.
 *
 *   - W, E
 *   - NW, SE
 *   - N, S
 *   - NE, SW
 */
Board.prototype.visit = function (p0)
{
    var results = []

    console.assert(this.contains(p0))

    // aligning the directions (e.g. W to E)
    var directions = [
        vec2( 1,  0), // W
        vec2(-1,  0), // E

        vec2( 1, -1), // NW
        vec2(-1,  1), // SE

        vec2( 0, -1), // N
        vec2( 0,  1), // S

        vec2(-1, -1), // NE
        vec2( 1,  1)  // SW
    ]

    Ext.each(directions, function (dir) {
        var p = p0
        var list = []
        while (this.contains(p)) {
            list.push(p)
            p = p.add(dir)
        }
        results.push(list)
    }, this)

    return results
}

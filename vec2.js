/**
 * A vector, used for basic data representation and calculations.
 */

/**
 * Construct a vector at x, y.
 */
function Vector2 (x, y)
{
    this.x = x
    this.y = y
}

Vector2.prototype.toString = function ()
{
    return "vec2(" + this.x + ", " + this.y + ")"
}

/**
 * Add v to this, returning a new vector.
 */
Vector2.prototype.add = function (v)
{
    return new Vector2(this.x + v.x, this.y + v.y)
}

/**
 * A constructor shortcut.
 */
function vec2 (x, y)
{
    return new Vector2(x, y)
}

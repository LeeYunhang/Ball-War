/**
 * Created by mrcode on 16-4-3.
 *
 */

//该类主要用来制造小球
class Ball {

    constructor(owner, point = new Point(0, 0), radius = 10, color = '#000', background = '#fff', eats = 0) {
        this._owner = owner;
        this._point = point;
        this._radius = radius;
        this._color = color;
        this._eats = eats;
        this.background = background;
    }

    get speed() {
    }

    set speed(s) {
    }

    get weight() {
    }

    //set weight(w) {}

    get owner() {
        return this._owner
    }

    get point() {
        return this._point
    }

    set point(p) {
        this._point = p
    }

    get eats() {
        return this._eats
    }

    set eats(e) {
        this._eats = e
    }

    get radius() {
        return this._radius
    }

    set radius(r) {
        this._radius = r
    }


    toString() {
        return this._owner;
    }
}

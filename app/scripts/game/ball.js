/**
 * Created by mrcode on 16-4-3.
 * 小球的数据结构
 */
class Ball {

    constructor(owner, point = new Point(0, 0), color = '#000', background = '#fff', eats = 0) {
        this._owner = owner;
        this._point = point;
        this._color = color;
        this._eats = eats;
        this.background = background;
    }

    get speed() {
        return Math.round((40000 / Math.pow(200 + this.eats, 0.9)));
    }

    //set speed(s) {}

    get weight() {
        return Math.round(Math(this.eats, 1.2));
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
        return 10;
    }

    toString() {
        return this._owner;
    }
}

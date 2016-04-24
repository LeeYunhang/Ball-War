/**
 * Created by mrcode on 16-4-3.
 */


class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y
    }

    distance(point) {
        return Math.pow(Math.pow(this.x - point.x, 2) +
            Math.pow(this.y - point.y, 2), 0.5);
    }

    toString() {
        return `x=${this.x},y=${this.y}`;
    }
}
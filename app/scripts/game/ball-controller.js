/**
 * Created by mrcode on 16-4-3.
 */


class BallController {

    constructor(ball) {
        this.ball = ball;
        if (!(ball instanceof Ball)) {
            throw TypeError('参数ball的类型不能是Ball');
        }
    }

    /**
     * 小球控制器启动
     * */
    start() {
        var self = Asset.players[0].username;
        this.painting();   //画小球

        //如果控制的小球是自己的话
        if (this.ball.owner == self) {
            var canvas = document.querySelector('#gameStage');
            canvas.addEventListener('keydown', ((e)=> {
                var keycode = e.key;

                //如果当前的stage获得了焦点的话
                if (canvas === document.activeElement) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.keydown(keycode);
                }
            }).bind(this));

            canvas.onclick = (e => {
                e.preventDefault();
                this.click(new Point(e.x, e.y));
            }).bind(this);

        }
    }

    /**
     * 画小球
     * */
    painting() {
        var point = this.ball.point;

        var tmp = new Hilo.Graphics()
            .lineStyle(1, this.ball.color)
            .beginFill(this.ball.background)
            .drawCircle(point.x, point.y, this.ball.radius)
            .endFill()
            .addTo(game.stage);   //添加小球到stage

    }

    /**
     * 键盘控制小球移动
     * */
    keydown(key) {
        "use strict";
        var to = new Point(this.ball.point.x, this.ball.point.y);

        switch (key) {
            case Constant.UP:
                to.y = gameBackground.height / -2;
                break;
            case Constant.RIGHT:
                to.x = gameBackground.width / 2;
                break;
            case Constant.DOWN:
                to.y = gameBackground.height / 2;
                break;
            case Constant.LEFT:
                to.y = gameBackground.width / 2;
                break;
            default:
                break;
        }
        this.move(to, this.ball.speed)  //移动小球
    };

    //鼠标控制小球移动
    click(to) {
        "use strict";
        if (to instanceof Point) {
            this.move(to, this.ball.speed)
        } else {
            throw new TypeError();
        }
    };

    /**
     * 移动小球
     * @param {Point}  移动的目的地
     * @param {Number} 移动的速度
     * */
    move(to, speed) {

    }
}

/**
 * Created by mrcode on 16-4-3.
 * 小球的控制器
 */


class BallController {

    constructor(ballView) {
        this.ball = ballView.ball;
        this.ballView = ballView;

        if (!(ballView instanceof BallView)) {
            throw TypeError('参数ball的类型必须是BallView');
        }
    }

    /**
     * 小球控制器启动
     * */
    start() {
        var self = Asset.players[0].playname;   //获得玩家自己的游戏昵称
        this.ballView.painting();               //刷新小球

        //如果控制的小球是自己的话
        if (this.ball.owner == self) {
            var canvas = game.canvas;
            document.addEventListener('keydown', e=> {
                var keycode = e.key;
                this.keydown(keycode);
            }, false);

            canvas.onclick = e =>this.click(new Point(e.clientX, e.clientY));

        }
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
            throw new TypeError()
        }
    };

    /**
     * 移动小球
     * @param {Point}  移动的目的地
     * @param {Number} 移动的速度
     * */
    move(to, speed) {
        var canvas = game.canvas,
            left = canvas.getBoundingClientRect().left,
            top  = canvas.getBoundingClientRect().top,
            distance = to.distance(this.ball.point),
            x = to.x - left - this.ball.radius,
            y = to.y - top - this.ball.radius;


        Hilo.Tween.to(this.ballView.ballGraphic, {x: x, y: y},
            {
                duration: 1000 * (distance / this.ball.speed),
                loop: false,
                //ease: Hilo.Ease.Quad.EaseIn,
            });

        this.ball.point = to;
    }
}

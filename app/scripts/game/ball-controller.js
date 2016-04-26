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
            var canvas = game.canvas,
                point = this.ball.point,
                left = canvas.getBoundingClientRect().left,
                top  = canvas.getBoundingClientRect().top,
                offsetX, offsetY;

            to.x -=left; to.y -= top;         //求出相对于视口左上角的距离
            offsetX = to.x - game.width/2;
            offsetY = to.y - game.height/2;
            to.x = point.x + offsetX;        //求出目的坐标
            to.y = point.y + offsetY;
            this.move(to, this.ball.speed);
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
        var distance = to.distance(this.ball.point),
            offsetX = to.x - this.ball.point.x,
            offsetY = to.y - this.ball.point.y;

        for(let i = 0; i < gameBackground.v; ++i) {
            for (let j = 0; j < gameBackground.h; ++j) {
                let regionView = gameBackground.regionViews[i][j],
                    _x = regionView.x,
                    _y = regionView.y;
                var tmp = gameBackground.regionViews;

                //如果region在viewport里的话
                if(regionView.regionInViewport()) {
                    Hilo.Tween.to(regionView, {x: _x - offsetX, y: _y - offsetY},
                        {
                            duration: 1000 * (distance / this.ball.speed),
                            loop: false,
                        });

                } else{  //调整region的位置
                    if(regionView.beyondTop()) {
                        let length = gameBackground.regionViews[i].length,
                            lastRegion = gameBackground.regionViews[i][length - 1];

                        //超出的region放到最下面,同时交换在数组中的顺序,使其数组顺序与视图上的顺序一致
                        regionView.y = lastRegion.y + lastRegion.height();
                        gameBackground.regionViews[i].shift();
                        gameBackground.regionViews[i].push(regionView);
                        j = -1;
                        continue;
                    } else if(regionView.beyondBottom()) {
                        let firstRegion = gameBackground.regionViews[i][0];
                        regionView.y = firstRegion.y - firstRegion.height();
                        gameBackground.regionViews[i].pop();
                        gameBackground.regionViews[i].unshift(regionView);
                    }
                    //} else if (regionView.beyondLeft()) {
                    //    let length = gameBackground.regionViews[i].length,
                    //        last = gameBackground.regionViews[length - 1][j];
                    //    for (let k = 0; k < length - 1; ++k) {
                    //        gameBackground.regionViews[k][j] = gameBackground.regionViews[k + 1][j];
                    //    }
                    //    gameBackground.regionViews[length - 1][j] = regionView;
                    //    regionView.x = last.x + last.width();
                    //    --j; continue;
                    //}
                    //} else if (regionView.beyondRight()){
                    //    let firstRegion = gameBackground.regionViews[0][j],
                    //        length = gameBackground.regionViews.length;
                    //
                    //    regionView.x = firstRegion.x - firstRegion.width();
                    //    for(let k = length-2; k >= 0; --k){
                    //        gameBackground[k+1][j] = gameBackground[k][j];
                    //    }
                    //
                    //    gameBackground[0][j] = regionView;
                    //}
                    //
                    //移动调整后的region
                    Hilo.Tween.to(regionView, {x: regionView.x - offsetX, y: regionView.y - offsetY},
                        {
                            duration: 1000 * (distance / this.ball.speed),
                            loop: false,
                        });
                }
            }
        }
        this.ball.point.x += offsetX;
        this.ball.point.y += offsetY;

        //tmp.forEach(t=>t.forEach(t1=>console.log(t1.y)));
    }
}

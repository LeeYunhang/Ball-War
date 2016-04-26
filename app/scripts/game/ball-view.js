/**
 * Created by mrcode on 16-4-24.
 * 小球的视图类
 */

class BallView {
    constructor(ball) {
        if(!(ball instanceof Ball)) {
            throw new TypeError()
        }
        this.ball = ball;
    }

    /**
     * 刷新小球位置
     * */
    painting() {
        var point = this.ball.point;
        this.ballGraphic = new Hilo.Graphics()
            .lineStyle(1, this.ball.color)
            .beginFill(this.ball.background)
            .drawCircle(point.x, point.y, this.ball.radius)
            .endFill()
            .addTo(game.stage);   //添加小球到stage
        this.ballGraphic.x = game.width/2;
        this.ballGraphic.y = game.height/2;
    }
}
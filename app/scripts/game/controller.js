/**
 * 整个游戏的控制器
 * */
var Controller = {
    controllers: [],
    /**
     * 游戏开始
     * */
    start () {
        "use strict";

        //给每一个球加上控制器
        for (let i = 0, length = Asset.players.length; i < length; ++i) {
            let ball = Asset.players[i].ball,
                selfController = new BallController(new BallView(ball));
            selfController.start();
            this.controllers.push(selfController);
        }
    },
}
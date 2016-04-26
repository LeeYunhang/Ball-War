/**
 * Created by mrcode on 16-3-19.
 */
{
    var game = {
        //场景的基本属性
        width: 1000,
        height: 600,
        background: '#333333',

        stage: null,
        ticker: null,

        //初始化游戏
        init() {
            //加载初始资源
            Asset.load((()=> {
                "use strict";
                this.initStage();
                this.canvas = document.querySelector('canvas');
                Controller.start();
            }).bind(this))

        },

        //初始化游戏舞台
        initStage() {
            //新建一个场景
            this.stage = new Hilo.Stage({
                renderType: 'canvas',
                width: this.width,
                height: this.height,
                background: this.background,
            });

            //添加刷新
            this.ticker = new Hilo.Ticker(30);
            this.ticker.addTick(Hilo.Tween);
            this.ticker.addTick(this.stage);
            this.ticker.start();

            gameBackground.init(this.stage);                   //初始化背景
            document.getElementById('gameStage').appendChild(this.stage.canvas); //添加
            this.stage.canvas.setAttribute('style', 'position'); //取消默认的绝对定位
            this.stage.enableDOMEvent(Hilo.event.POINTER_START, true); //允许舞台响应鼠标点击事件
        }
    }

    window.onload = function () {
        "use strict";
        game.init();
    }
}
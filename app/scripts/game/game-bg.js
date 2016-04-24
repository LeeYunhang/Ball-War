/**
 * Created by mrcode on 16-4-2.
 */

var gameBackground = {
    width: 20000,
    height: 20000,
    gridSpacing: 50,     //栅格间距
    gridColor: '#444',   //栅格颜色
    backgroundColor: '#333333',
    x: null,
    y: null,

    background: null,    //背景的实体变量
    initBackground (stage) {
        "use strict";
        this.x = this.width / -2;
        this.y = this.height / -2;

        //初始化和添加背景容器
        this.background = new Hilo.Container({
            width: this.width,
            height: this.height,
            left: this.width / -2,
            top: this.height / -2,
        }).addTo(stage);

        //给背景添加栅格(能够体现出小球的移动效果)
        var graphics = new Hilo.Graphics()
            .lineStyle(0.5, '#444', 0.8, 'null', 'null');

        //画横线
        var x = this.x,
            y = this.y;
        while (y <= this.height / 2) {
            graphics.moveTo(x, y)
                .lineTo(-x, y)
                .endFill()
                .addTo(this.background);

            y += this.gridSpacing;
        }

        //画纵线
        x = this.x;
        y = this.y;
        while (x <= this.width / 2) {
            graphics.moveTo(x, y)
                .lineTo(x, -y)
                .endFill()
                .addTo(this.background);
            x += this.gridSpacing;
        }
    }
};
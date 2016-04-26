/**
 * Created by mrcode on 16-4-2.
 */

var gameBackground = {
    v: 4,               //单列的块的个数
    h: 4,               //单行的块的个数
    gridSpacing: 50,     //栅格间距
    gridColor: '#444',   //栅格颜色
    backgroundColor: '#333333',
    x: null,
    y: null,
    regionViews: [],

    /**
     * 初始化背景
     * */
    init(stage) {
        "use strict";
        this.width = game.width/2 * this.h;
        this.height= game.height/2 * this.v;

        this.container = new Hilo.Container({
            width: gameBackground.width,
            height: gameBackground.height,
            x: gameBackground.width / -2 + game.width / 2,
            y: gameBackground.height / -2 + game.height / 2,
        }).addTo(stage);

        for(let i = 0; i < this.h; ++i){
            this.regionViews.push([]);
            for(let j = 0; j < this.v; ++j){
                let view = new RegionView(
                    new Region(i * this.width / 4, j * this.height / 4, this.container));
                this.regionViews[i].push(view);
            }
        }

    },
};
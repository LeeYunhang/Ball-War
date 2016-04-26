/**
 * Created by mrcode on 16-4-25.
 * Region的View
 */
class RegionView {
    constructor(region) {
        var _this = this;
        if(!(region instanceof Region)) {
            throw new TypeError('region的类型不是Region!');
        }
        this.region = region;

        this.view = new Hilo.Container({
            width: _this.region.width,
            height: _this.region.height,
            x: _this.region.x,
            y: _this.region.y,
        }).addTo(this.region.container);

        //开始画网格线
        let graphics = new Hilo.Graphics()
            .lineStyle(0.5, gameBackground.gridColor, 0.8, 'null', 'null'),
            width = this.view.width,
            height= this.view.height;

        for (let i = 0; i <= width; i += gameBackground.gridSpacing){
            graphics.moveTo(i, 0)
                .lineTo(i, height)
                .endFill()
                .addTo(this.view);
        }

        for(let j = 0; j <= height; j += gameBackground.gridSpacing) {
            graphics.moveTo(0, j)
                .lineTo(width, j)
                .endFill()
                .addTo(this.view);
        }
        //画网格线结束
        //this.hidden();   //默认隐藏view
    }

    get x() {
        return this.view.x;
    }

    set x(number) {
        this.view.x = number;
        this.region.x = this.view.x;
    }

    get y() {
        return this.view.y;
    }

    set y(number) {
        this.view.y = number;
        this.region.y = this.view.y;
    }

    show(){
        this.view.visible = true;
    }

    hidden(){
        this.view.visible = false;
    }

    /**
     * region是否在视区里
     * */
    regionInViewport() {
        return !(this.beyondTop() || this.beyondLeft()
            || this.beyondRight() || this.beyondBottom());
    }

    //超出上边
    beyondTop(){
        return this.view.y < 0;
    }

    beyondLeft(){
        return this.view.x < 0;
    }

    beyondRight(){
        return this.view.x > (gameBackground.h - 1)*this.view.width;
    }

    beyondBottom(){
        return this.view.y > (gameBackground.v - 1)*this.view.height;
    }

    width(){
        return this.view.width;
    }

    height(){
        return this.view.height;
    }


}

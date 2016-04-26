/**
 * Created by mrcode on 16-4-25.
 * 区域类, 描述一个区域的数据结构
 * 区域类主要用于将整个游戏分块,游戏资源加载的时候 仅仅加载视图上可见的块的资源。
 */
class Region {
    constructor(x, y, container) {
        this.x = x;
        this.y = y;
        this.width = game.width/2;
        this.height = game.height/2;
        this.container = container;
    }
}

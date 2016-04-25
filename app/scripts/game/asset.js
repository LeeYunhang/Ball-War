/**
 * Created by mrcode on 16-3-19.
 * 游戏资源类
 */



let Asset = {
    players: [],
    load(callback) {
        var resources = [];        //资源列表
        this.callback = callback;  //设置回调

        //加载资源
        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete() {

        this.players.push(new Player('Mr-code', new Ball('Mr-code')));
        this.players.push(new Player('Berry',   new Ball('Berry')));

        this.queue.off('complete');
        this.queue.fire('complete');
        this.callback();;
    }
}
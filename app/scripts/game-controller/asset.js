/**
 * Created by mrcode on 16-3-19.
 */

//var asset = function () {
//    'use strict';
//
//    return {
//
//    };
//
//}

class Asset {
    load(callback) {
        //资源列表
        var resources = [];

        this.callback = callback;  //设置回调

        //加载资源
        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    }

    onComplete() {
        //
        //...。
        //
        this.queue.off('complete');
        this.queue.fire('complete');
        this.callback();;
    }
}
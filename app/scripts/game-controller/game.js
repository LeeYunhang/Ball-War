/**
 * Created by mrcode on 16-3-19.
 */

{
    "use strict";

    let game = {
        width: 0,
        height: 0,
        asset: null,
        stage: null,
        ticker: null,
        init() {
            this.asset = new Asset();
            this.asset.load((() => this.initStage()).bind(this));
        },
        initStage() {
            this.width = 1000;
            this.height = 600;

            this.stage = new Hilo.Stage({
                renderType: 'canvas',
                width: this.width,
                height: this.height
            });
            document.getElementById('game').appendChild(game.stage.canvas);
        }

    }

    window.onload = function () {
        game.init();
    }
}
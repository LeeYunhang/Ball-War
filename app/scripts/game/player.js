/**
 * Created by mrcode on 16-4-23.
 * Description: 玩家类
 */
class Player {
    constructor(playname, ball) {
        if (!(ball instanceof Ball)) {
            throw new TypeError('类型名必须是Ball')
        }
        this.playname = playname;
        this.ball = ball;
    }
}
var preload = function (game) { }

preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(500, 400, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar, 0);

        for (j = 0; j < boxes.length; j++) {
            for (i = 1; i <= 16; i++) {
                this.game.load.image(boxes[j] + i.toString(), 'img/' + boxes[j] + '/' + i.toString() + '.png');
            }
        }
        this.game.load.spritesheet('glass', 'img/glass.png', 400, 400);
        this.game.load.image('refresh', 'img/refresh.png');
        this.game.load.image('start', 'img/start.png');
        this.game.load.image('end', 'img/end.png');
    },
    create: function () {
        this.game.state.start("TheGame");
    }
}
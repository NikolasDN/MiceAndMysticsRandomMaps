
var MaMRM = (function () {
    var tiles;
    var boxes = ['DWT', 'SR'];
    var usedTiles = [];
    var isOddMap = 0;

    function isOdd(n) {
        return (Math.abs(n) % 2 == 1);
    }

    function getRandomTile(game) {
        var nr = game.rnd.integerInRange(1, 16);
        if (isOddMap == 0) {
            while (!isOdd(nr)) {
                nr = game.rnd.integerInRange(1, 16);
            }
        }
        else {
            while (isOdd(nr)) {
                nr = game.rnd.integerInRange(1, 16);
            }
        }
        
        var tileToUse = boxes[game.rnd.integerInRange(0, boxes.length - 1)] + nr.toString();
        while (usedTiles.indexOf(tileToUse) > 0) {
            tileToUse = getRandomTile(game);
        }
        usedTiles.push(tileToUse);
        return tileToUse;
    };

    function revealTile(button) {
        var tileX = button.x;
        var tileY = button.y;
        tiles.remove(button);
        var tile = tiles.create(-500, -500, getRandomTile(this.game));
        tile.anchor.setTo(0.5, 0.5);
        tile.scale.setTo(3, 3);
        this.game.add.tween(tile.position).to({ x: tileX, y: tileY }, 1500, Phaser.Easing.Exponential.Out, true);
        this.game.add.tween(tile.scale).to({ x: 1, y: 1 }, 1500, Phaser.Easing.Exponential.Out, true);
    }

    function MaMRM() {
        this.game = new Phaser.Game(1000, 800, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });

    }
    MaMRM.prototype.preload = function () {
        for (j = 0; j < boxes.length; j++) {
            for (i = 1; i <= 16; i++) {
                this.game.load.image(boxes[j] + i.toString(), 'img/' + boxes[j] + '/' + i.toString() + '.png');
            }
        }
        this.game.load.spritesheet('glass', 'img/glass.png', 400, 400);
    };
    MaMRM.prototype.create = function () {
        isOddMap = this.game.rnd.integerInRange(0, 1);
        var firstX = this.game.rnd.integerInRange(0, 1);
        var firstY = this.game.rnd.integerInRange(0, 1);

        tiles = this.game.add.group();
        for (x = 0; x <= 1; x++) {
            for (y = 0; y <= 1; y++) {
                if (x == firstX && y == firstY) {
                    var tile = tiles.create((x * 400) + 300, (y * 400) + 200, getRandomTile(this.game));
                    tile.anchor.setTo(0.5, 0.5);
                }
                else
                {
                    var button = this.game.make.button((x * 400) + 300, (y * 400) + 200, "glass", revealTile, this, 0, 0, 1);
                    button.anchor.setTo(0.5, 0.5);
                    tiles.add(button);
                }                
                
                //tile.scale.setTo(0.2, 0.2);
                //this.game.add.tween(tile.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            }
        }
        
    };
    MaMRM.prototype.update = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);
    }

    return MaMRM;
})();

window.onload = function () {
    var game = new MaMRM();
};
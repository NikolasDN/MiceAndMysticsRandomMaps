
var MaMRM = (function () {
    var tiles;
    var boxes = ['DWT', 'SR'];
    var usedTiles = [];
    var isOddMap = 0;
    //var text;

    function isOdd(n) {
        return (Math.abs(n) % 2 == 1);
    }

    function getRandomTileWithoutCheck(game) {
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

        return boxes[game.rnd.integerInRange(0, boxes.length - 1)] + nr.toString();
    }

    function getRandomTile(game) {
        var tileToUse = getRandomTileWithoutCheck(game);
        while (usedTiles.indexOf(tileToUse) >= 0) {
            tileToUse = getRandomTileWithoutCheck(game);
        }
        usedTiles.push(tileToUse);
        //if (text != null) {
        //    text.setText(usedTiles.toString());
        //}
        return tileToUse;
    };

    function revealTile(button) {
        var tileX = button.x;
        var tileY = button.y;
        tiles.remove(button);
        var tileName = getRandomTile(this.game);
        var tile = this.game.make.button((x * 400) + 300, (y * 400) + 200, tileName, revealOtherSide, this);
        tile.name = tileName;
        tile.otherName = calculateOtherSide(tileName);
        tile.flipped = false;
        tile.anchor.setTo(0.5, 0.5);
        tile.scale.setTo(3, 3);
        tile.angle = 50;
        tiles.add(tile);
        this.game.add.tween(tile.position).to({ x: tileX, y: tileY }, 1000, Phaser.Easing.Exponential.Out, true);
        this.game.add.tween(tile.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Exponential.Out, true);
        this.game.add.tween(tile).to({ angle: 0 }, 1000, Phaser.Easing.Exponential.Out, true);
    }

    function calculateOtherSide(name) {
        var thenum = parseInt(name.replace(/^\D+/g, ''));
        var theString = name.replace(/[0-9]/g, '');
        if (isOdd(thenum)) {
            return theString + (thenum + 1).toString();
        }
        else {
            return theString + (thenum - 1).toString();
        }
    }

    function revealOtherSide(button) {
        if (button.flipped) {
            button.flipped = false;
            button.loadTexture(button.name, 0);
        }
        else {
            button.flipped = true;
            button.loadTexture(button.otherName, 0);
        }
    }

    function refreshMap() {
        location.reload();
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
        this.game.load.image('refresh', 'img/refresh.png');
    };
    MaMRM.prototype.create = function () {
        this.game.scale.startFullScreen(false, false)
        isOddMap = this.game.rnd.integerInRange(0, 1);
        var firstX = this.game.rnd.integerInRange(0, 1);
        var firstY = this.game.rnd.integerInRange(0, 1);

        tiles = this.game.add.group();
        for (x = 0; x <= 1; x++) {
            for (y = 0; y <= 1; y++) {
                if (x == firstX && y == firstY) {
                    var tileName = getRandomTile(this.game);
                    var tile = this.game.make.button((x * 400) + 300, (y * 400) + 200, tileName, revealOtherSide, this);
                    tile.name = tileName;
                    tile.otherName = calculateOtherSide(tileName);
                    tile.flipped = false;
                    tile.anchor.setTo(0.5, 0.5);
                    tiles.add(tile);
                }
                else
                {
                    var button = this.game.make.button((x * 400) + 300, (y * 400) + 200, "glass", revealTile, this, 0, 0, 1);
                    button.anchor.setTo(0.5, 0.5);
                    tiles.add(button);
                }                
                
            }
        }
        var refreshButton = this.game.add.button(64, 64, "refresh", refreshMap, this);
        refreshButton.anchor.setTo(0.5, 0.5);
        
        //var style = { font: "40px Arial", fill: "#ff0044", align: "center" };
        //text = this.game.add.text(this.game.world.centerX - 300, 0, text, style);
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
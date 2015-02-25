var theGame = function (game) {
    
}

theGame.prototype = {
    create: function () {
        //this.game.scale.startFullScreen(false, false)
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
                else {
                    var button = this.game.make.button((x * 400) + 300, (y * 400) + 200, "glass", revealTile, this, 0, 0, 1);
                    button.anchor.setTo(0.5, 0.5);
                    tiles.add(button);
                }

            }
        }
        var refreshButton = this.game.add.button(64, 64, "refresh", refreshMap, this);
        refreshButton.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);
    }
}
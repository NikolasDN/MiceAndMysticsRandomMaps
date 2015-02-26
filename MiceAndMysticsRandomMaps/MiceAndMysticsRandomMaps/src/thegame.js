var theGame = function (game) {
    
}

theGame.prototype = {
    create: function () {
        pages = 0;
        usedTiles = [];
        isOddMap = this.game.rnd.integerInRange(0, 1);
        var firstX = this.game.rnd.integerInRange(0, 1);
        var firstY = this.game.rnd.integerInRange(0, 1);
        var endX = 0;
        var endY = 0;
        if (firstX == 0) {
            endX = 1;
        }
        if (firstY == 0) {
            endY = 1;
        }

        tiles = this.game.add.group();
        for (x = 0; x <= 1; x++) {
            for (y = 0; y <= 1; y++) {
                if ((x == firstX && y == firstY) | (x == endX && y == endY)) {
                    if (x == firstX && y == firstY) {
                        var tileName = getRandomTile(this.game, null);
                        var tile = this.game.make.button((x * 400) + 300, (y * 400) + 200, tileName, revealOtherSide, this);
                        tile.name = tileName;
                        tile.otherName = calculateOtherSide(tileName);
                        tile.flipped = false;
                        tile.anchor.setTo(0.5, 0.5);
                        tiles.add(tile);

                        start = this.game.add.sprite((x * 400) + 300 - 100 + (this.game.rnd.integerInRange(0, 1) * 200), (y * 400) + 200 - 100 + (this.game.rnd.integerInRange(0, 1) * 200), "start");
                        start.parentTile = tileName;
                        start.anchor.setTo(0.5, 0.5);
                    }
                    
                    if (x == endX && y == endY) {
                        var tileName = getRandomTile(this.game, null);
                        var tile = this.game.make.button((x * 400) + 300, (y * 400) + 200, tileName, revealOtherSide, this);
                        tile.name = tileName;
                        tile.otherName = calculateOtherSide(tileName);
                        tile.flipped = false;
                        tile.anchor.setTo(0.5, 0.5);
                        tiles.add(tile);

                        end = this.game.add.sprite((x * 400) + 300 - 100 + (this.game.rnd.integerInRange(0, 1) * 200), (y * 400) + 200 - 100 + (this.game.rnd.integerInRange(0, 1) * 200), "end");
                        end.parentTile = tileName;
                        end.anchor.setTo(0.5, 0.5);
                    }
                    
                }
                else {
                    var button = this.game.make.button((x * 400) + 300, (y * 400) + 200, "glass", revealTile, this, 0, 0, 1);
                    button.anchor.setTo(0.5, 0.5);
                    tiles.add(button);
                }

            }
        }

        for (i = 1; i <= 8; i++) {
            var page = this.game.add.sprite(950, (i * 50) - 25, "page" + i.toString());
            page.scale.setTo(0.5, 0.5);
            page.anchor.setTo(0.5, 0.5);
        }

        var refreshButton = this.game.add.button(64, 64, "refresh", function () {
            this.game.state.start("TheGame");
        }, this);
        refreshButton.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.setScreenSize(true);
    }
}
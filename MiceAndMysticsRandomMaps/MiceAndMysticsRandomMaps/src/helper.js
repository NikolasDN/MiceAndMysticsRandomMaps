
var tiles;
var boxes = ['DWT', 'SR'];
var usedTiles = [];
var isOddMap = 0;
var start;
var end;
//var text;


function isOdd(n) {
    return (Math.abs(n) % 2 == 1);
}

function checkPaths(newTile, button) {
    var xResult = false;
    var yResult = false;
    //for (i = 0; i < tiles.length; i++) {
    tiles.forEach(function (item) {
        if (item.name != '') {
            if (button.x > item.x && button.y == item.y) {
                xResult = checkWestEast(item.name, newTile);
                if (!xResult) {
                    xResult = checkWestEast(item.otherName, calculateOtherSide(newTile));
                }
            }
            if (button.x < item.x && button.y == item.y) {
                xResult = checkWestEast(newTile, item.name);
                if (!xResult) {
                    xResult = checkWestEast(calculateOtherSide(newTile), item.otherName);
                }
            }
            if (button.y > item.y && button.x == item.x) {
                yResult = checkNorthSouth(item.name, newTile);
                if (!yResult) {
                    yResult = checkNorthSouth(item.otherName, calculateOtherSide(newTile));
                }
            }
            if (button.y < item.y && button.x == item.x) {
                yResult = checkNorthSouth(newTile, item.name);
                if (!yResult) {
                    yResult = checkNorthSouth(calculateOtherSide(newTile), item.otherName);
                }
            }
        }
    });
    if (xResult == true && yResult == true) {
        return true;
    }
    else {
        return false;
    }
}

function getRandomTileName(game) {
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

function getRandomTileWithoutCheck(game, button) {
    var trials = 0;
    var tileToAdd = getRandomTileName(game);
    if (button != null) {
        while (!checkPaths(tileToAdd, button) && trials < 50) {
            tileToAdd = getRandomTileName(game);
            trials++;
        }
    }
    
    return tileToAdd;
}

function getRandomTile(game, button) {
    var tileToUse = getRandomTileWithoutCheck(game, button);
    while (usedTiles.indexOf(tileToUse) >= 0) {
        tileToUse = getRandomTileWithoutCheck(game, button);
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
    var tileName = getRandomTile(this.game, button);
    tiles.remove(button);
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

    if (start.parentTile == button.name) {
        if (button.flipped) {
            start.visible = false;
        }
        else {
            start.visible = true;
        }
    }

    if (end.parentTile == button.name) {
        if (button.flipped) {
            end.visible = false;
        }
        else {
            end.visible = true;
        }
    }
}

function refreshMap(game) {
    location.reload();
    
}


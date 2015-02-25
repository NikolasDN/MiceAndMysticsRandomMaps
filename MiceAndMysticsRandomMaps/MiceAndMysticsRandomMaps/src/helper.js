
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


var paths = {
    "DWT1": ["N", "S", "E"],
    "DWT2": ["S", "W"],
    "DWT3": ["N", "E", "W"],
    "DWT4": ["N", "E", "S", "W"],
    "DWT5": ["N", "E", "S", "W"],
    "DWT6": ["N", "E", "S", "W"],
    "DWT7": ["N", "E", "S", "W"],
    "DWT8": ["N", "S", "W"],
    "DWT9": ["N", "S"],
    "DWT10": ["N", "S"],
    "DWT11": ["N", "E"],
    "DWT12": ["S"],
    "DWT13": ["E", "S", "W"],
    "DWT14": ["S", "W"],
    "DWT15": ["S"],
    "DWT16": ["N", "E", "S"],
    "SR1": [],
    "SR2": ["N", "E", "S"],
    "SR3": ["E", "S", "W"],
    "SR4": ["N", "E", "S", "W"],
    "SR5": ["E", "W"],
    "SR6": ["N", "S"],
    "SR7": ["N", "E", "S"],
    "SR8": ["E", "W"],
    "SR9": ["E", "S"],
    "SR10": ["N", "S", "W"],
    "SR11": ["W"],
    "SR12": ["E", "S"],
    "SR13": ["N", "W"],
    "SR14": ["N"],
    "SR15": ["N", "S"],
    "SR16": ["N", "S"]
};

function checkNorthSouth(northTile, southTile) {
    if (paths[northTile].indexOf("S") >= 0 && paths[southTile].indexOf("N") >= 0) {
        return true;
    }
    else {
        return false;
    }
}

function checkWestEast(westTile, eastTile) {
    if (paths[westTile].indexOf("E") >= 0 && paths[eastTile].indexOf("W") >= 0) {
        return true;
    }
    else {
        return false;
    }
}
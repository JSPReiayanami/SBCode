
var OpType = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right"
}
var printMap = function (map) {
    let mapStr = ""
    for (let n in map) {
        for (let m in map[n]) {
            mapStr += map[n][m] + " "
        }
        mapStr += '\n'
    }
    console.log(mapStr)
}
var chaiMap = function (n, m, map, opArr, chaiCount = 0) {
    let tempMap = JSON.parse(JSON.stringify(map))
    if (chaiCount >= opArr.length) {
        return { Ok: false, NewMap: tempMap }
    }
    let opInfo = opArr[chaiCount]
    let pos1 = opInfo.Pos1
    let pos2 = opInfo.Pos2
    if(opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]] >= 2){
        return chaiMap(n, m, map, opArr, chaiCount + 1)
    }
    if(opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]] == null){
        opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]] = 1
    }else{
        opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]]++
    }
    
    //给他换个方向
    if (opInfo.PutType != OpType.Up) {
        if (pos1[0] - 1 >= 0 && tempMap[pos1[0] - 1][pos1[1]] == 1) {
            tempMap[pos1[0] - 1][pos1[1]] = 0
            tempMap[pos2[0]][pos2[1]] = 1
            opArr[chaiCount].PutType = OpType.Up
            opArr[chaiCount].Pos2 = [pos1[0] - 1, pos1[1]]
            return { Ok: true, NewMap: tempMap, Count: chaiCount }
        }
    }

    if (opInfo.PutType != OpType.Left) {
        if (pos1[1] - 1 >= 0 && tempMap[pos1[0]][pos1[1] - 1] == 1) {
            tempMap[pos1[0]][pos1[1] - 1] = 0
            tempMap[pos2[0]][pos2[1]] = 1
            opArr[chaiCount].PutType = OpType.Left
            opArr[chaiCount].Pos2 = [pos1[0], pos1[1] - 1]
            return { Ok: true, NewMap: tempMap, Count: chaiCount }
        }
    }

    if (opInfo.PutType != OpType.Right) {
        if (pos1[1] + 1 < m && tempMap[pos1[0]][pos1[1] + 1] == 1) {
            tempMap[pos1[0]][pos1[1] + 1] = 0
            tempMap[pos2[0]][pos2[1]] = 1
            opArr[chaiCount].PutType = OpType.Right
            opArr[chaiCount].Pos2 = [pos1[0], pos1[1] + 1]
            return { Ok: true, NewMap: tempMap, Count: chaiCount }
        }
    }

    if (opInfo.PutType != OpType.Down) {
        if (pos1[0] + 1 < n && tempMap[pos1[0] + 1][pos1[1]] == 1) {
            tempMap[pos1[0] + 1][pos1[1]] = 0
            tempMap[pos2[0]][pos2[1]] = 1
            opArr[chaiCount].PutType = OpType.Down
            opArr[chaiCount].Pos2 = [pos1[0] + 1, pos1[1]]
            return { Ok: true, NewMap: tempMap, Count: chaiCount }
        }
    }
    opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]] = null
    delete opArr[chaiCount].ChaiMap[ pos2[0]+":"+pos2[1]]
    return chaiMap(n, m, map, opArr, chaiCount + 1)
}

var putNodeInMap = function (n, m, map) {
    let putCount = 0
    let opArr = []
    let oMap = JSON.parse(JSON.stringify(map))
    for (let indexN = 0; indexN < n; indexN++) {
        for (let indexM = 0; indexM < m; indexM++) {
            if (map[indexN][indexM] == 1) {
                if (map[indexN][indexM] != 1) continue
                //先考虑后面和上面的
                //先放上面的
                if (indexN - 1 >= 0 && map[indexN - 1][indexM] == 1) {
                    map[indexN][indexM] = 0
                    map[indexN - 1][indexM] = 0
                    putCount++
                    opArr.push({ Pos1: [indexN, indexM], Pos2: [indexN - 1, indexM], PutType: OpType.Up ,ChaiMap:{}})
                    printMap(map)
                    continue
                }
                //放后面的
                if (indexM - 1 >= 0 && map[indexN][indexM - 1] == 1) {
                    map[indexN][indexM] = 0
                    map[indexN][indexM - 1] = 0
                    putCount++
                    opArr.push({ Pos1: [indexN, indexM], Pos2: [indexN, indexM - 1], PutType: OpType.Left ,ChaiMap:{}})
                    printMap(map)
                    continue
                }
                //先横着放
                if (indexM + 1 < m && map[indexN][indexM + 1] == 1) {
                    map[indexN][indexM] = 0
                    map[indexN][indexM + 1] = 0
                    putCount++
                    opArr.push({ Pos1: [indexN, indexM], Pos2: [indexN, indexM + 1], PutType: OpType.Right ,ChaiMap:{}})
                    printMap(map)
                    continue
                }
                //然后竖着放
                if (indexN + 1 < n && map[indexN + 1][indexM] == 1) {
                    putS = true
                    map[indexN][indexM] = 0
                    map[indexN + 1][indexM] = 0
                    putCount++
                    opArr.push({ Pos1: [indexN, indexM], Pos2: [indexN + 1, indexM], PutType: OpType.Down ,ChaiMap:{}})
                    printMap(map)
                    continue
                }

                //如果都不可以尝试之前的拆分
                let chaiInfo = chaiMap(n, m, map, opArr)
                if (chaiInfo.Ok == true) {
                    let tempMap = JSON.parse(JSON.stringify(oMap))
                    let newArr = []
                    putCount = 0
                    for(let arrIndex = 0;arrIndex <= chaiInfo.Count;arrIndex++){
                        let opInfo = opArr[arrIndex]
                        newArr.push( opInfo )
                        tempMap[opInfo.Pos1[0]][opInfo.Pos1[1]] = 0
                        tempMap[opInfo.Pos2[0]][opInfo.Pos2[1]] = 0
                        putCount++
                    }
                    map = tempMap
                    opArr = newArr
                    printMap(map)
                    indexN = -1
                    indexM = 0
                    break
                }

            }
        }
    }
    return putCount
}

/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} broken
 * @return {number}
 */
var domino = function (n, m, broken) {
    let map = {}
    for (let indexN = 0; indexN < n; indexN++) {
        map[indexN] = {}
        for (let indexM = 0; indexM < m; indexM++) {
            map[indexN][indexM] = 1
        }
    }
    for (let indexBroken in broken) {
        let bPos = broken[indexBroken]
        map[bPos[0]][bPos[1]] = 2
    }
    printMap(map)
    return putNodeInMap(n, m, map)
};
//console.log(domino(2, 3, [[1, 1], [1, 2]]))
//console.log(domino(8, 8, [[1, 0], [2, 5], [3, 1], [3, 2], [3, 4], [4, 0], [4, 3], [4, 6], [4, 7], [5, 3], [5, 5], [5, 6], [6, 3], [7, 2], [7, 7]]))
console.log(domino(8,8,[[0, 1], [0, 6], [0, 7], [2, 0], [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 2], [3, 6], [4, 0], [4, 4], [5, 0], [5, 3], [6, 6], [7, 4], [7, 6]]))

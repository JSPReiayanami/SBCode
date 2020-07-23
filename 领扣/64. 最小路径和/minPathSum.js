/*
给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
*/

/** 
 * @param {number[][]} grid
 * @return {number}
 */
var SetMapCost = function(posx,posy,cost,map){
    if(map[posy] == null) map[posy] = {}
    if(map[posy][posx] == null) map[posy][posx] = -1
    map[posy][posx] = cost
}

var GetMapCost = function(posx,posy,map){
    if(map[posy] == null) return 0
    if(map[posy][posx] == null) return 0
    return map[posy][posx]
}

var minPathSum = function(grid) {
    let shuCount = grid.length
    let hengCount = grid[0].length
    let initCount = shuCount > hengCount ? shuCount : hengCount;
    let mapCost = {}
    SetMapCost(0,0,grid[0][0],mapCost)
    for(let initIndex = 1;initIndex < initCount;initIndex++){
        if(initIndex < shuCount){
            SetMapCost(0,initIndex,grid[initIndex][0] + GetMapCost(0,initIndex - 1,mapCost),mapCost)
        }
        if(initIndex < hengCount){
            SetMapCost(initIndex,0,grid[0][initIndex] + GetMapCost(initIndex - 1,0,mapCost),mapCost)
        }
    }
    for(let hengIndex = 1;hengIndex < hengCount;hengIndex++){
        for(let shuIndex = 1;shuIndex < shuCount;shuIndex++){
            SetMapCost(hengIndex,shuIndex,grid[shuIndex][hengIndex] + Math.min( GetMapCost(hengIndex - 1,shuIndex,mapCost),GetMapCost(hengIndex,shuIndex - 1,mapCost)),mapCost)
        }
    }
    return GetMapCost(hengCount - 1,shuCount - 1,mapCost)
};

//=====

var AStar = function (map) {
    this._Map = map
    this._NodeMap = {}
}

AStar.prototype.CreateNode = function(x,y,c) {
    var node = {}
    node.x = x
    node.y = y
    node.c = c == null ? this.GetMapCost(x,y) : c
    node.isClose = false
    node.newNode = true
    return node
}

AStar.prototype.GetMapCost = function(x,y) {
    return this._Map[y][x]
}

AStar.prototype.GetNode = function(x,y,c) {
    if(this._NodeMap[y] == null)this._NodeMap[y] = {}
    if(this._NodeMap[y][x] == null) this._NodeMap[y][x] = this.CreateNode(x,y,c)
    return this._NodeMap[y][x]
}

AStar.prototype.IsSameNode = function(node1,node2) {
    if(node1.x == node2.x && node1.y == node2.y) return true
    return false
}
//2个方向
AStar.prototype.OpenNode = function (openNode,endNode) {
    let x = openNode.x
    let y = openNode.y
    let c = openNode.c
    if(x + 1< this._Map[0].length){
        this.AddToOpenList( this.GetNode(x + 1,y,c + this.GetMapCost(x+1,y)) ) 
        if(x + 1 == endNode.x && y == endNode.y) return true
    }
    if(y + 1< this._Map.length){
        this.AddToOpenList(this.GetNode(x,y + 1,c + this.GetMapCost(x,y+1)))
        if(x == endNode.x && y + 1 == endNode.y) return true
    }
    return false
}
AStar.prototype.AddToOpenList = function(node) {
    this._OpenList[node.x+":"+node.y] = node
}
AStar.prototype.GetMinNode = function () {
    let minC = null
    let closC = null
    let newOpenMap = {}
    for(let index in this._OpenList){
        let node = this._OpenList[index]
        if(minC == null ) {
            minC = node
            closC = node
            newOpenMap[minC.x+":"+minC.y] = minC
            continue
        }
        if(node.c < minC.c){
            newOpenMap = {}
            newOpenMap[node.x+":"+node.y] = node
            minC = node
            closC = node
        }else if(node.c == minC.c){
            if((node.x+node.y) > (closC.x+closC.y)){
                closC = node
            }
            newOpenMap[node.x+":"+node.y] = node
        }
    }
    this._OpenList = newOpenMap
    return closC
}

AStar.prototype.FindPath = function(startPos,endPos) {
    let findNode = this.GetNode(startPos.x,startPos.y)
    let endNode = this.GetNode(endPos.x,endPos.y)
    findNode.newNode = false
    this._OpenList = {}
    while(!this.IsSameNode(findNode,endNode)){
        if(this.OpenNode(findNode,endNode)){
            return endNode
        }
        findNode = this.GetMinNode()
        if(findNode == null) return endNode
    }
    return endNode
}
//有点小问题以后再说新思路
var minPathSum2 = function(grid) {
    let aStar = new AStar(grid);
    let endNode = aStar.FindPath({x:0,y:0},{x:grid[0].length - 1,y:grid.length - 1})
    return endNode.c
};
console.log(minPathSum([
      [1,3,1],
      [1,5,1],
      [4,2,1]
    ]))
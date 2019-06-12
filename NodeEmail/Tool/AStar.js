let AStarNode = function(pos,data){
    this.m_G = data.G || 0
    this.m_F = data.F || 0
    this.m_H = data.H || 0
    this.m_Next = null
    this.m_Last = data.LastNode
    this.m_Pos = pos
}   
//---
let AStar = function(){
    this.m_Map = null
    this.m_FindDir = AStar.Dir.Eight
    this.m_CanMoveCall = null
    this.m_FindDirOp = [
        [{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1}],
        [{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:-1,y:1},{x:1,y:-1},{x:1,y:1}],
    ]
}
AStar.Dir = {
    Four:0,
    Eight:1,
}
AStar.prototype.SetMapData = function(mapData){
    if(mapData == null) return
    this.m_Map = mapData
}

AStar.prototype.FindPath = function(pos,targetPos){
    this.ClearFindData()
    if(pos == null || targetPos == null) return []
    if(pos.x == targetPos.x && pos.y == targetPos.y){
        return []
    }
    this.m_StartPos = pos
    this.m_EndPos = targetPos
    let curNode = this.CreateNode(pos,{G:1,H:0})
    while(curNode != null){
        curNode = this.OpenNode(curNode)
        if(curNode == null){
            return []
        }
        if(curNode.m_Pos.x == this.m_EndPos.x && curNode.m_Pos.y == this.m_EndPos.y){
            return this.GetPathArr(curNode)
        }
    }
    return []
}

AStar.prototype.ClearFindData = function(){
    this.m_StartPos = null
    this.m_EndPos = null
    this.m_CloseNodeList = {}
    this.m_OpenNodeList = {}
}

AStar.prototype.GetPathArr = function(node){
    let pathNode = node
    let posArr = []
    while(pathNode != null){
        posArr.push(pathNode.m_Pos)
        pathNode = pathNode.m_Last
    }
    return posArr
}

AStar.prototype.OpenNode = function(node){
    this.AddCloseNode(node)
    let pos = node.m_Pos;
    //console.log("[Open:]",pos)
    let findOp = this.m_FindDirOp[ this.m_FindDir ]
    let goodNode = null
    for(let index in findOp){
        let opObject = findOp[index]
        let newNode = this.CreateNode({ x:pos.x+opObject.x,y:pos.y+opObject.y},{LastNode:node,G:node.m_G+1})
        this.AddOpenNode( newNode )
    }
    if(goodNode == null){
        goodNode = this.GetGoodOpenNode()
    }
    return goodNode
}

AStar.prototype.AddCloseNode = function(node){
    let pos = node.m_Pos
    this.m_CloseNodeList[pos.x+":"+pos.y] = node
    delete this.m_OpenNodeList[ pos.x+":"+pos.y ]
}

AStar.prototype.AddOpenNode = function(node){
    if(node == null) return
    let pos = node.m_Pos
    this.m_OpenNodeList[pos.x+":"+pos.y] = node
}

AStar.prototype.GetGoodOpenNode = function(){
    let node = null
    for(let index in this.m_OpenNodeList){
        let newNode = this.m_OpenNodeList[index]
        if(node == null){
            node = newNode
        }else{
            if(node.m_F > newNode.m_F){
                node = newNode
            }
        }
    }
    return node
}

AStar.prototype.CreateNode = function(pos,data){
    if(this.m_Map[pos.y] == null || this.m_Map[pos.x] == null) return null
    if( this.m_CloseNodeList[pos.x+":"+pos.y] != null ) return
    if( this.m_OpenNodeList[pos.x+":"+pos.y] != null ) return
    if(this.CanMove( pos ) != true) return null
    data.F = this.GetF(pos)
    data.H = this.GetH(pos)
    let node = new AStarNode(pos,data)
    return node
}

AStar.prototype.GetF = function(pos){
    let disx = Math.pow(this.m_EndPos.x - pos.x,2)
    let disy = Math.pow(this.m_EndPos.y - pos.y,2)
    return disx+disy
}

AStar.prototype.GetH = function(pos){
    let disx = Math.pow(this.m_StartPos.x - pos.x,2)
    let disy = Math.pow(this.m_StartPos.y - pos.y,2)
    return disx+disy
}

AStar.prototype.SetCanMoveCall = function(callback){
    this.m_CanMoveCall = callback
}

AStar.prototype.CanMove = function(pos){
    if(this.m_CanMoveCall == null) return true
    return this.m_CanMoveCall(pos,this.m_Map[pos.y][pos.x])
}

AStar.prototype.PrintMapInfo = function(){
    this.PrintMap(this.m_Map)
}

AStar.prototype.PrintMap = function(map){
    if(map == null){
        console.log("no map")
        return
    }
    for(let y in map){
        let lineMap = ""
        for(let x in map[y]){
            lineMap = lineMap+map[y][x]+" "
        }
        console.log(lineMap)
    }
}

AStar.prototype.PrintFindPath = function(posArr){
    if(this.m_Map == null){
        console.log("no map")
        return
    }
    let tempMap = JSON.parse( JSON.stringify( this.m_Map ) )
    for(let index in posArr){
        let pos = posArr[index]
        if(tempMap[pos.y] != null && tempMap[pos.y][pos.x] != null){
            tempMap[pos.y][pos.x] = "x"
        }
    }
    this.PrintMap(tempMap)
}
module.exports = AStar

gameData = {};
var CreatePathNode = function(step,last = null,target = null)
{
    return { Last:last, Target:target,Step:step,Self:self}
}
var FindPath = function()
{
    var path = [ CreatePathNode(0,0,null,0) ]
    var targetNode = null
    while(true)
    {
        var newPath = []
        for(var index in path)
        {
            var node = path[index]
            var canTo = gameData.Graph[ node.Target ]
            for(var _ in canTo)
            {
                if(canTo[_] == gameData.Mouse.CurPos)
                {
                    targetNode = CreatePathNode( node.step+1,node, canTo[_] ,node.Target)
                    node.Next = targetNode
                }else{
                    var tempNode = CreatePathNode( node.step+1,node, canTo[_] ,node.Target)
                    node.Next = tempNode
                    newPath.push( tempNode )
                }
            }
        }
        if( targetNode != null )
        {
            break;
        }
    }
    //to path arr
    gameData.Path = []
    gameData.Path.push( targetNode.Self )
    while(targetNode.Last != null)
    {
        gameData.Path.push( targetNode.Last.Self )
        targetNode.Last = targetNode.Last.Last
    }
}

var MouseLogic = function()
{
    if(gameData.Path == null)
    {
        FindPath()
    }
    
}

/**
 * @param {number[][]} graph
 * @return {number}
 */

var catMouseGame = function(graph) {
    gameData.Graph = graph
    gameData.Mouse = {
        LastPos:null,
        CurPos:1
    }
    gameData.Cats = []
    for(var index in graph[2])
    {
        gameData.Cats.push({
            LastPos:null,
            CurPos:2
        })
        
    }
    var step = 0;
    while(true)
    {
        //mouse run
        MouseLogic()
    }  
};

console.log(catMouseGame([[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]))
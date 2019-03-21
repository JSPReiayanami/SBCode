
/**
 * @param {number} n
 * @return {number}
 */
var climpNode = function(p,v)
{
    return {
        left:null,
        right:null,
        parent:p,
        value:v
    }
}

var climbStairs2 = function(n) {
    var openlist = [climpNode(null,0)]
    var overlist = [];
    while(openlist.length > 0)
    {
        var temp = [];
        for(var i in openlist)
        {
            var curNode = openlist[i];
            var v = curNode.value;
            if(n - v >= 2)
            {
                curNode.left = climpNode(curNode,v+1);
                curNode.right = climpNode(curNode,v+2);
                temp.push(curNode.left);
                temp.push(curNode.right);
            }else if(n - v >= 1)
            {
                curNode.left = climpNode(curNode,v+1);
                temp.push(curNode.left);
            }

            if(v == n)
            {
                overlist.push(curNode);
            }
        }
        openlist = temp;
    }
    return overlist.length;
};

var climbStairs = function(n)
{
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;
    if (n == 2)
        return 2;
        
    var f1 = 1;
    var f2 = 2;
    var result = 0;
    for(var i=3; i<=n; i++){
        result = f1 + f2;
        f1 = f2;
        f2 = result;
    }
    return result;
}


console.log(climbStairs(8));
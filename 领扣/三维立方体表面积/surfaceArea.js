/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function(grid) {
    var xzObj = {};
    var allArea = 0;
    for(var x in grid)
    {
        xzObj[x] = {};
        for(var z in grid[x])
        {
            var num = grid[x][z];
            if(num == 0) continue;
            var repeateArea = num - 1;
            if(xzObj[x][z - 1] != null )
            {
                repeateArea += num > xzObj[x][z - 1] ? xzObj[x][z - 1] : num;
            }
            if(xzObj[x -1] != null && xzObj[x -1][z] != null )
            {
                repeateArea += num > xzObj[x - 1][z]? xzObj[x - 1][z] : num;
            }
            xzObj[x][z] = num;

            allArea += (6*num - 2*repeateArea);
        }
    }
    return allArea; 
};

var area = surfaceArea([[2,2,2],[2,1,2],[2,2,2]])
console.log(area);
/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
    var maxY = board.length
    var maxX = board[0].length
    var RY = null
    var RX = null
    for(var y in board){
        for(var x in board[y]){
            if(board[y][x] === 'R'){
                RY = parseInt(y)
                RX = parseInt(x)
                break
            }
        }
    }
    var findLeft = RX - 1
    var findRight = RX + 1
    var findUp = RY + 1
    var findDown = RY - 1
    var canCatch = 0
    while(findLeft != null || findRight != null || findUp != null || findDown != null){
        if(findLeft != null)
        {   
            if( findLeft >= 0){
                var ch = board[RY][findLeft]
                if(ch === 'p'){
                    canCatch++
                    findLeft = null
                }else if(ch === 'B'){
                    findLeft = null
                }else{
                    findLeft--
                }
            }else{
                findLeft = null
            }
        }

        if(findRight != null){
            if(findRight < maxX){
                var ch = board[RY][findRight]
                if(ch === 'p'){
                    canCatch++
                    findRight = null
                }else if(ch === 'B'){
                    findRight = null
                }else{
                    findRight++
                }
            }else{
                findRight = null
            }

        }

        if(findUp != null){
            if(findUp < maxY){
                var ch = board[findUp][RX]
                if(ch === 'p'){
                    canCatch++
                    findUp = null
                }else if(ch === 'B'){
                    findUp = null
                }else{
                    findUp++
                }
            }else{
                findUp = null
            }
        }

        if(findDown != null){
            if(findDown >= 0){
                var ch = board[findDown][RX]
                if(ch === 'p'){
                    canCatch++
                    findDown = null
                }else if(ch === 'B'){
                    findDown = null
                }else{
                    findDown--
                }
            }else{
                findDown = null
            }
            
        }
    }
    return canCatch
};

console.log( 
    numRookCaptures(
        [[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","R",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
    )
)

/**
 * @param {character[][]} board
 * @return {number}
 
 在一个 8 x 8 的棋盘上，有一个白色车（rook）。也可能有空方块，白色的象（bishop）和黑色的卒（pawn）。它们分别以字符 “R”，“.”，“B” 和 “p” 给出。大写字符表示白棋，小写字符表示黑棋。

车按国际象棋中的规则移动：它选择四个基本方向中的一个（北，东，西和南），然后朝那个方向移动，直到它选择停止、到达棋盘的边缘或移动到同一方格来捕获该方格上颜色相反的卒。另外，车不能与其他友方（白色）象进入同一个方格。

返回车能够在一次移动中捕获到的卒的数量。

 
 */
var checkDirTarget = function(curPos,disPos,board,target){
    let findPos = null
    while(true){
        curPos.x += disPos.x
        curPos.y += disPos.y
        if(curPos.x < 0 || curPos.y < 0) break
        if(board[curPos.y] == null || board[curPos.y][curPos.x] == null) break
        if(board[curPos.y][curPos.x] === '.') continue;
        if(board[curPos.y][curPos.x] === target){
            findPos = curPos
            break
        }else{
            break
        }

    }
    return findPos
}

var numRookCaptures = function (board) {
    let RPos = { x: 0, y: 0 }
    let count = 0
    for (let indexY = 0; indexY < board.length; indexY++) {
        for (let indexX = 0; indexX < board[indexY].length; indexX++) {
            if(board[indexY][indexX] === 'R'){
                RPos.x = indexX
                RPos.y = indexY
                break
            }
        }
    }
    if(checkDirTarget({x:RPos.x,y:RPos.y},{x:1,y:0},board,"p") != null) count++
    if(checkDirTarget({x:RPos.x,y:RPos.y},{x:-1,y:0},board,"p") != null) count++
    if(checkDirTarget({x:RPos.x,y:RPos.y},{x:0,y:1},board,"p") != null) count++
    if(checkDirTarget({x:RPos.x,y:RPos.y},{x:0,y:-1},board,"p") != null) count++
    return count
};


console.log(numRookCaptures([[".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", "p", ".", ".", ".", "."], [".", ".", ".", "p", ".", ".", ".", "."], ["p", "p", ".", "R", ".", "p", "B", "."], [".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", "B", ".", ".", ".", "."], [".", ".", ".", "p", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."]]))
/* 
老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻的孩子中，评分高的孩子必须获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？

示例 1:

输入: [1,0,2]
输出: 5
解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2:

输入: [1,2,2]
输出: 4
解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
第三个孩子只得到 1 颗糖果，这已满足上述两个条件
*/

/**
 * @param {number[]} ratings
 * @return {number}
 */
//思路一 - 会超时,需要用另一种思路优化
// var candy = function(ratings) {
//     var candyCount = ratings.length
//     var sendIndex = 0
//     var candyObj = {}
//     if(ratings.length < sendIndex) return candyCount
//     for(let _ in ratings){
//         candyObj[_] = 1
//     }
//     while( ratings.length > sendIndex ){
//         let needCheckBack = false
//         if( ratings[sendIndex - 1] != null && ratings[sendIndex - 1] < ratings[sendIndex] && candyObj[sendIndex - 1] >= candyObj[sendIndex]){
//             let lastCandy = candyObj[sendIndex - 1]
//             let selfCandy = candyObj[sendIndex]
//             let addCandy = lastCandy - selfCandy + 1
//             candyObj[sendIndex] += addCandy
//             candyCount += addCandy
//         }

//         if(ratings[sendIndex + 1] != null && ratings[sendIndex + 1] < ratings[sendIndex] && candyObj[sendIndex + 1] >= candyObj[sendIndex]){
//             let nextCandy = candyObj[sendIndex + 1] 
//             let selfCandy = candyObj[sendIndex]
//             let addCandy = nextCandy - selfCandy + 1
//             candyObj[sendIndex] += addCandy
//             candyCount += addCandy
//             needCheckBack = true
//         }
//         let op = 1 
//         if(needCheckBack){
//             if(ratings[sendIndex - 1] > ratings[sendIndex] && candyObj[sendIndex - 1] <= candyObj[sendIndex]){
//                 op=-1
//             }
//         }
//         sendIndex += op
//     }
//     return candyCount
// };
// console.log(candy([1,4,3,2]))

/**
 * @param {number[]} ratings
 * @return {number}
 */
//思路一 - 会超时,需要用另一种思路优化
var candy = function(ratings) {
    let sendIndex = 0
    let candyCount = 0
    let candyObj = {}
    while(ratings.length > sendIndex){
        var flagIndex = ratings.length
        var curValue =  ratings[sendIndex]
        var op = null
        for(let startIndex = sendIndex+1;startIndex < ratings.length;startIndex++){
            if(op == null){
                if(curValue > ratings[startIndex]){
                    op = true
                }else{
                    op = false
                }
            }
            if(op){
                if(curValue > ratings[startIndex]){
                    curValue = ratings[startIndex]
                }else{
                    flagIndex = startIndex
                    break
                }
            }else{
                if(curValue < ratings[startIndex]){
                    curValue = ratings[startIndex]
                }else{
                    flagIndex = startIndex
                    break
                }
            }

        }
        //找到关键点后开始发糖果
        if(op){
            for(let index = sendIndex;index < flagIndex;index++){
                let opIndex = index
                let opValue = flagIndex - index
                if(index < 0) continue
                if(candyObj[opIndex] == null)
                    candyObj[index] = opValue
                else
                    candyObj[opIndex] = candyObj[opIndex] > opValue? candyObj[opIndex] : opValue
            }
        }else{
            for(let index = sendIndex;index < flagIndex;index++){
                let opIndex = index
                let opValue = index - sendIndex +1
                if(candyObj[opIndex] == null)
                    candyObj[opIndex] = opValue
                else
                candyObj[opIndex] = candyObj[opIndex] > opValue ? candyObj[opIndex] : opValue
            }
        }

        if(ratings[ flagIndex - 1 ] != null && ratings[flagIndex] != null && ratings[ flagIndex - 1 ] == ratings[flagIndex]){
            sendIndex = flagIndex
        }else{
            if(ratings[flagIndex]  != null)
                sendIndex = flagIndex - 1
            else
                sendIndex = flagIndex
        }
        
        
    }
    for(let index in candyObj){
        candyCount+=candyObj[index]
    }
    return candyCount
}
// console.log(candy([1,2,2]))
// console.log(candy([1,4,3,2]))
// console.log(candy([1,0,1]))

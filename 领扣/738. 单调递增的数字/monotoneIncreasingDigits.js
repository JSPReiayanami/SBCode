/**
 * @param {number} N
 * @return {number}
 */

 /**
给定一个非负整数 N，找出小于或等于 N 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。

（当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。）

示例 1:

输入: N = 10
输出: 9
示例 2:

输入: N = 1234
输出: 1234
示例 3:

输入: N = 332
输出: 299

输入: N = 33923
输出: 33899

说明: N 是在 [0, 10^9] 范围内的一个整数。
 */
var changeNumberToArr = function(N){
    var strN = ""+N
    var strNLength = strN.length
    let numberArr = []
    for(let index = 0 ;index < strNLength; index++){
        numberArr.push(strN[index])
    }
    return numberArr
}
var monotoneIncreasingDigits = function(N) {
    if(N <= 9) return N
    var numArr = changeNumberToArr(N)
    var numLength = numArr.length
    let strNew = ""
    let allNight = false
    for(let index = 0 ;index < numLength - 1; index++){
        if(index < 0) continue
        if(allNight){
            numArr[index] = "9"
            continue
        }
        let curN = parseInt(numArr[index])
        let nexN = parseInt(numArr[index + 1])
        if(curN > nexN){
            if(index >= 1){
                let lastN = parseInt(numArr[index - 1])
                if(lastN > curN - 1){
                    numArr[index] = ""+(curN - 1)
                    numArr[index+1] = "9"
                    index -= 2
                    continue
                }else{
                    allNight = true
                }
            }else{
                allNight = true
            }
            if(allNight){
                numArr[index] = ""+(curN - 1)
            }
        }
    }
    if(allNight){
        numArr[numLength - 1] = "9"
    }
    return parseInt(numArr.join(""))
};
console.log(monotoneIncreasingDigits(1234))
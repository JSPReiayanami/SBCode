/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var maxFour = []
// var noUse = 0
// var objMap = {}
// var objKey = []
// var makesquare = function(nums) {
//     if(nums.length < 4) return false
//     var totalSize = 0
//     objMap = {}
//     objKey = []
//     maxFour = []
//     noUse = nums.length
//     nums.sort((a,b)=>{
//         return b-a
//     })


//     for(var index in nums){
//         totalSize += nums[index]
//         if(objMap[nums[index]] == null) {
//             objMap[nums[index]] = 0 
//             objKey.push(nums[index])
//         }
//         objMap[nums[index]]++
//     }
//     for(let bian = 0;bian < 4;bian++){
//         maxFour.push(0)
//     }
//     objKey.sort((a,b)=>{
//         return b-a
//     })
//     if(totalSize % 4 != 0) return false
//     var bianChang = Math.floor(totalSize / 4)
//     var findKeyIndex = 0
//     var findBian = 0
//     while(noUse > 0 && objKey[findKeyIndex] != null){        
//         var key = objKey[findKeyIndex]
//         while(objMap[key] > 0){
//             if(maxFour[findBian] + key <= bianChang){
//                 maxFour[findBian] += key
//                 objMap[key]--
//                 noUse--
//             }else{
//                 break
//             }
//         }
//         if(maxFour[findBian] < bianChang){
//             findKeyIndex++
//         }else if(maxFour[findBian] == bianChang){
//             findKeyIndex = 0
//             findBian++
//         }else{
//             return false
//         }
        
//         if(findBian >= 4) break
//     }

//     if(noUse == 0){
//         return true
//     }
//     return false
// };
var calSum = function(nums){
    var sum  = 0
    for(let index in nums){
        sum += nums[index]
    }
    return sum
}

var makesquare = function (nums) {
    if (nums.length < 4) return false
    let sum = calSum(nums)
  
    if (sum % 4 !== 0) return false
    let side = sum / 4
  
    nums.sort()   // 从小到大,  如果想从大到小 就你想遍历
    let len = nums.length
    let tags = Array.from({ length: len }, item => item = false)
  
    return dfs(nums, 0, 0, tags, side, nums.length - 1)
  
  }
  
  // sum 标示 现在有的木棍总长
  function dfs(array, count, sum, tags, side, start) {
    if (!sum) {
      // 如果 sum 为0 的话
      if (++count === 4) return true
      return dfs(array, count, side, tags, side, array.length - 1)
    }
  
    for (let i = start; i >= 0; i--) {
      if (!tags[i] && sum >= array[i]) {
        tags[i] = true
        if (dfs(array, count, sum - array[i], tags, side, i - 1)) return true
        tags[i] = false
            // 第二个剪枝问题
        if (array[i] === sum || sum === side) return false
      }
    }
    return false
  }
console.log(makesquare([5,5,5,5,4,4,4,4,3,3,3,3]))


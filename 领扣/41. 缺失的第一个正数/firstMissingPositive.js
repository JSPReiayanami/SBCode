/**
 * @param {number[]} nums
 * @return {number}
 */
// var firstMissingPositive = function(nums) {
//     let minNum = null;
//     let gapMinNum = null;
//     let gpMinNum = {}
//     for(let index in nums){
//         if(nums[index] <= 0) continue
//         if(minNum == null){
//             minNum = nums[index]
//             gapMinNum = nums[index]
//         }else{
//             if( nums[index] < minNum  ){
//                 minNum = nums[index]
//             }
//             if(gapMinNum != minNum){
//                 if(gapMinNum > minNum){

//                 }
//             }
//         }
//     }

//     if(minNum == null || minNum > 1) return 1

//     return minNum+1

// };
var firstMissingPositive = function (nums) {
    let posDisArr = {}
    for (let index in nums) {
        if(nums[index] <= 0) continue
        posDisArr[nums[index]] = 1
    }
    let length = 1
    while(true){
        if(posDisArr[length] == null) break;
        length++;
    }
    return length
};
console.log(firstMissingPositive([1, 2, 0]))
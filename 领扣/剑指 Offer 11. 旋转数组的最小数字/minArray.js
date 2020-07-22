/**
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

示例 1：

输入：[3,4,5,1,2]
输出：1
示例 2：

输入：[2,2,2,0,1]
输出：0
*/
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray2 = function(numbers) {
    let curNumber = numbers[0]
    for(let index = 1;index < numbers.length;index++){
        if(curNumber > numbers[index]){
            return numbers[index]
        }
    }
    return numbers[0]
};
var checkMinArr = function(mid,target,numbers){
    let last = null
    if(mid - 1 >= 0){
        last = numbers[mid - 1]
    }
    let curN = numbers[mid]
    let next = null
    if(mid+1 < numbers.length){
        next = numbers[mid + 1]
    }
    if(last != null && last > curN){
        return curN
    }
    if(next != null && curN > next){
        return next
    }
    let left = null
    let right = null
    let gap = Math.floor(Math.abs((mid - target)) / 2)
    if(mid < target){
        gap = -gap
    }
    if(gap === 0) return null
    left = checkMinArr(target+gap,target,numbers)
    right = checkMinArr(target+gap,mid,numbers)
    if(left != null) return left
    if(right != null) return right
    return null
}
var minArray = function(numbers) {
    let left = checkMinArr(Math.floor(numbers.length / 2),0,numbers)
    if(left != null) return left
    let right = checkMinArr(Math.floor(numbers.length / 2),numbers.length - 1,numbers)
    if(right != null) return right
    return numbers[0]
};

console.log(minArray([1,1,1,3,1]))
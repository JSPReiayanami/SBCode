/**
 * @param {number[]} A
 * @param {number} S
 * @return {number}
 */
var numSubarraysWithSum = function(A, S) {
    var startIndex = null
    var endIndex = null
    var sum = 0
    var count = 0
    for(var index = 0;index < A.length;index++){
        if(startIndex == null){
            startIndex = index
        }
        sum += A[index]
        if(sum == S){
            count++
            if(sum > S){
                while(startIndex <= index){
                    sum -= A[startIndex]
                    startIndex++
                    if(startIndex == index){
                        startIndex = null
                        break
                    }
                    if(sum == S) count++
                    if(sum < S){
                        break
                    }
                }
            }
        }
    }

    while(startIndex < A.length){
        sum -= A[startIndex]
        startIndex++
        if(sum == S) count++
        if(sum < S){
            break
        }
    }
    return count
};

console.log(numSubarraysWithSum([0,0,0,0,0],0))
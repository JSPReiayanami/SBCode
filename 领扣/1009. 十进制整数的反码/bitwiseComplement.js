/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function(N) {
    let bitNum = N.toString(2)
    let tenNum = ''
    for(let index in bitNum)
    {

        tenNum = tenNum+(bitNum[index] === '0' ? 1 : 0)
    }
    return parseInt(tenNum,2)
};
console.log(bitwiseComplement(5))
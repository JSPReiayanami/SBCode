/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    var forCount = a.length
    var bigBinary = a 
    var smallBinary = b
    if(a.length < b.length){
        forCount = b.length
        bigBinary = b 
        smallBinary = a
    }
    var newBinary = ''
    var moreValue = 0
    var binaryValue = 2
    var disLenth = bigBinary.length - smallBinary.length
    for (var forIndex = forCount - 1; forIndex >= 0; forIndex--){
        var curValue = moreValue
        curValue += bigBinary[forIndex] - '0'

        if(forIndex - disLenth  >= 0){
            curValue += smallBinary[forIndex - disLenth] - '0'
        }
        newBinary = (""+curValue%binaryValue) + newBinary
        moreValue = Math.floor(curValue / binaryValue)
        //console.log("[curValue:",curValue,"][newBinary:",newBinary,"]")
    }
    while(moreValue > 0){
        newBinary = (""+moreValue%binaryValue) + newBinary
        //console.log("[moreValue:",moreValue,"][newBinary:",newBinary,"]")
        moreValue = Math.floor(moreValue / binaryValue)
    }
    return newBinary
};

console.log(addBinary("11", "1"))


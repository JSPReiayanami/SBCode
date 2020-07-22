/*
给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。你需要给出所有可能的组合的结果。有效的运算符号包含 +, - 以及 * 。

示例 1:

输入: "2-1-1"
输出: [0, 2]
解释: 
((2-1)-1) = 0 
(2-(1-1)) = 2
示例 2:

输入: "2*3-4*5"
输出: [-34, -14, -10, -10, 10]
解释: 
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
*/
/**
 * @param {string} input
 * @return {number[]}
 */
var mathOp = function(num1,num2,op){
    if(op === "+"){
        return num1 + num2
    }else if(op === '-'){
        return num1 - num2
    }else if(op === '*'){
        return num1 * num2
    }
    return 0
}

var getMoreCl = function(firstClIndex,clMathArr,oMathArr,oMathArrStr,endMap,endArr){
    oMathArr[firstClIndex+2]= mathOp( parseInt(oMathArr[firstClIndex]),parseInt(oMathArr[firstClIndex+2]),oMathArr[firstClIndex + 1])
    oMathArrStr[firstClIndex+2]= "("+oMathArrStr[firstClIndex]+ ""+oMathArrStr[firstClIndex + 1] +""+oMathArrStr[firstClIndex+2]+")"
    if(firstClIndex == 0){
        oMathArr.shift()
        oMathArr.shift()
        oMathArrStr.shift()
        oMathArrStr.shift()
    }else{
        oMathArr.splice(firstClIndex,2)
        oMathArrStr.splice(firstClIndex,2)
    }
    //console.log("oMathArr:",oMathArr.toString(),"firstClIndex:",firstClIndex)
    if(oMathArr.length === 3) {
        let clCode = "("+oMathArrStr[0]+""+oMathArrStr[1]+""+oMathArrStr[2]+")"
        let obj = {}
        obj.End = mathOp( parseInt(oMathArr[0]),parseInt(oMathArr[2]),oMathArr[1])
        obj.ClCode = clCode
        if(endMap[obj.ClCode] == null){
            endMap[obj.ClCode] = obj.End
            endArr.push(obj.End)
        }
        return obj
    }else if(oMathArr.length === 1){
        let clCode = oMathArrStr[0]
        let obj = {}
        obj.End = oMathArr[0]
        obj.ClCode = clCode
        if(endMap[obj.ClCode] == null){
            endMap[obj.ClCode] = obj.End
            endArr.push(obj.End)
        }
        return 
    }
    for(let index = 0;index < oMathArr.length - 1;index+= 2){
       //console.log("oMathArr:",oMathArr.toString(),"再从index:",index,'开始计算')
       let end = getMoreCl(index,clMathArr,JSON.parse(JSON.stringify(oMathArr)),JSON.parse(JSON.stringify(oMathArrStr)),endMap,endArr)
       //console.log("end:",end)
       

    }
}

var getAddOpArr = function(arr,op){
    let newArr = []
    for(let index = 0;index < arr.length - 1;index++){
        newArr.push( arr[index] )
        newArr.push( op )
    }
    newArr.push( arr[arr.length - 1] )
    return newArr
}

var getSplitOpArr = function(arr,op){
    let newArr = []
    for(let index = 0;index < arr.length;index++){
        let str = arr[index]
        let opArr = str.split(op)
        if(opArr.length >= 2){
            let mixArr = getAddOpArr(opArr,op)
            Array.prototype.push.apply(newArr,mixArr)
        }else{
            newArr.push( str )
        }
    }
    return newArr
}

var getMathArrWithInput = function(input,opArr){
    let tempArr = []
    tempArr.push(input)
    for(let index = 0;index < opArr.length;index++){
        tempArr = getSplitOpArr(tempArr,opArr[index])
    }
    return tempArr
}

var diffWaysToCompute = function(input) {
    let mathArr = getMathArrWithInput(input,['+','-','*'])
    if(mathArr.length <= 2 || mathArr[0] == ''){
        return [input]
    }
    let endMap = {}
    let endArr = []
    for(let index = 0;index < mathArr.length - 1;index+= 2){
        //console.log(mathArr.toString())
        //console.log("从Index:",index,"开始计算")
        getMoreCl(index,[],JSON.parse(JSON.stringify(mathArr)),JSON.parse(JSON.stringify(mathArr)),endMap,endArr)
    }
    endArr = endArr.sort((a,b)=>{
        return a - b 
    })
    return endArr
};
console.log(diffWaysToCompute("0+1"))

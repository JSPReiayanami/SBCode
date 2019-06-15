/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var convtToList = function (arr) {
    let numHead = null
    let tempNode = null
    for (let inedex in arr) {
        let num = arr[inedex]
        let node = {
            Min: num[0],
            Max: num[1],
            Last: tempNode,
            Next: null
        }
        if (numHead == null) numHead = node
        if (tempNode) {
            tempNode.Next = node
        }
        tempNode = node

    }
    return numHead
}

var mixOtherNode = function (nowNode, bNode) {
    if(bNode == null ) return {A:nowNode,B:bNode}
    while(nowNode != null){
        if(nowNode.Max < bNode.Min){
            nowNode = nowNode.Next
        }else{
            break
        }
    }
    if(nowNode == null) return {A:nowNode,B:bNode}
    while(bNode != null){
        if(nowNode.Min > bNode.Max){
            bNode = bNode.Next
        }else{
            break
        }
    }
    if(bNode == null) return {A:nowNode,B:bNode}
    let rs = []
    if(nowNode.Min < bNode.Min && nowNode.Max > bNode.Max){
        rs.push( [ bNode.Min ,bNode.Max ] )
        bNode = bNode.Next
    }else if(nowNode.Min > bNode.Min && nowNode.Max < bNode.Max){
        rs.push( [ nowNode.Min ,nowNode.Max ] )
        nowNode = nowNode.Next
    }else if( nowNode.Min < bNode.Min && nowNode.Max > bNode.Min && nowNode.Max < bNode.Max){
        rs.push( [ bNode.Min ,nowNode.Max ] )
        nowNode = nowNode.Next
    }else if( nowNode.Min > bNode.Min && nowNode.Min < bNode.Max && nowNode.Max > bNode.Max){
        rs.push( [ nowNode.Min ,bNode.Max ] )
        bNode = bNode.Next
    }else if( nowNode.Min == bNode.Max){
        rs.push( [ nowNode.Min ,bNode.Max ] )
        bNode = bNode.Next
    }else if( nowNode.Max == bNode.Min){
        rs.push( [ nowNode.Max ,bNode.Min ] )
        nowNode = nowNode.Next
    }else if( nowNode.Min == bNode.Min){
        if(nowNode.Max > bNode.Max){
            rs.push( [ nowNode.Min ,bNode.Max ] )
            bNode = bNode.Next
        }else if(nowNode.Max == bNode.Max){
            rs.push( [ nowNode.Min ,bNode.Max ] )
            bNode = bNode.Next
            nowNode = nowNode.Next
        }else{
            rs.push( [ nowNode.Min ,nowNode.Max ] )
            nowNode = nowNode.Next
        }
    }else if( nowNode.Max == bNode.Max){
        if(nowNode.Min > bNode.Min){
            rs.push( [ nowNode.Min ,nowNode.Max ] )
        }else{
            rs.push( [ bNode.Min ,bNode.Max ] )
        }
        bNode = bNode.Next
        nowNode = nowNode.Next
    }
    return {A:nowNode,B:bNode,Rs:rs}
}

var intervalIntersection = function (A, B) {
    let ANumHead = convtToList(A)
    let BNumHead = convtToList(B)
    let rs = []
    let aCheckNode = ANumHead
    let bCheckNode = BNumHead
    while (aCheckNode != null) {
        let rstInfo = mixOtherNode(aCheckNode,bCheckNode)
        bCheckNode = rstInfo.B
        aCheckNode = rstInfo.A
        if(rstInfo.Rs != null){
            for(let index in rstInfo.Rs){
                rs.push(rstInfo.Rs[index])
            }
        }
        if (aCheckNode == null || bCheckNode == null)
            break
    }

    return rs
};

//console.log(intervalIntersection([[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]]))
console.log(intervalIntersection([[2,4],[8,10],[11,12],[15,17]],[[4,7],[9,13],[18,19]]))
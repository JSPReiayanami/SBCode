/**
 * @param {string} s
 * @param {number} k
 * @return {string}
给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。

你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。

在执行完所有删除操作后，返回最终得到的字符串。

本题答案保证唯一。

 

示例 1：

输入：s = "abcd", k = 2
输出："abcd"
解释：没有要删除的内容。
示例 2：

输入：s = "deeedbbcccbdaa", k = 3
输出："aa"
解释： 
先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
再删除 "bbb"，得到 "dddaa"
最后删除 "ddd"，得到 "aa"
示例 3：

输入：s = "pbbcggttciiippooaais", k = 2
输出："ps"
 

提示：

1 <= s.length <= 10^5
2 <= k <= 10^4
s 中只含有小写英文字母。

 */
var createNode = function(char,count = 0,next,last){
    return {
        Char:char,
        Count:count,
        Next:next,
        Last:last
    }
}

var removeSameCount = function(head,sameCouunt){
    let node = head
    let haveRemove = false
    while(node != null){
        if(node.Count === sameCouunt || node.Count % sameCouunt == 0){
            haveRemove = true
            if(node.Last == null){
                node = node.Next
                head = node
                head.Last = null
                continue
            }
            if(node.Next === null){
                node.Last.Next = null
                break
            }
            if(node.Last.Char === node.Next.Char){
                node.Last.Count += node.Next.Count
                node.Last.Next = node.Next.Next
                node.Next.Next.Last = node.Last
                node = node.Next.Next
                continue
            }else{
                node.Last.Next = node.Next
                node.Next.Last = node.Last
            }
        }else{
            if(node.Count > sameCouunt){
                node.Count = node.Count % sameCouunt
            }
        }
        node = node.Next
    }

    return {HaveRemove:haveRemove,Head:head}
}

var nodeListToChar = function(head){
    if(head == null) return ''
    let node = head
    let newChar = ''
    while(node != null){
        newChar += new Array(node.Count + 1).join(node.Char)
        node = node.Next
    }
    return newChar
}

var removeDuplicates = function(s, k) {
    let head = null
    let lastNode = null
    for(let index = 0;index < s.length ;index++){
        let char = s[index]
        if(lastNode == null){
            lastNode = createNode( char,1)
            if(head == null) head = lastNode
            continue
        }
        if(lastNode.Char === char){
            lastNode.Count++
        }else{
            let newNode = createNode( char,1,null,lastNode)
            lastNode.Next = newNode
            lastNode = newNode
        }
        
    }
    let haveRemove = true
    while(haveRemove){
        let info = removeSameCount(head,k)
        haveRemove = info.HaveRemove
        head = info.Head
    }

    return nodeListToChar(head)
};

console.log(removeDuplicates("pbbcggttciiippooaaiis",2))
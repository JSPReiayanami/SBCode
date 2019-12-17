/**
 * @param {string} s
 * @return {number}
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

 */
var lengthOfLongestSubstring = function(s) {
    let checkMap = {}
    let count = 0
    let lastCount = 0
    for(let index = 0;index < s.length;index++){
        let char = s[index]
        if(checkMap[char] != null){
            checkMap = {}
            if(count > lastCount){
                lastCount = count
            }
            index -= count
            count = 0
        }else{
            checkMap[char] = index
            count++
        }
    }
    if(count > lastCount){
        lastCount = count
    }
    return lastCount
};


var lengthOfLongestSubstring2 = function(s) {
    let  size,i=0,j,k,max=0;
    size = s.length;
    for(j = 0;j<size;j++){
        for(k = i;k<j;k++)
            if(s[k]==s[j]){
                i = k+1;
                break;
            }
        if(j-i+1 > max)
            max = j-i+1;
    }
    return max;
};



console.log(lengthOfLongestSubstring2("pwwkew"))
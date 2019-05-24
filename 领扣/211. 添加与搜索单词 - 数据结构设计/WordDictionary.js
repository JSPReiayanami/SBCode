
/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.m_WordKeyIndex = {};
    this.m_Words = [];
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    this.m_Words.push(word)
    var lentgh = word.length;
    var index = this.m_Words.length - 1;
    if(this.m_WordKeyIndex[length] == null) this.m_WordKeyIndex[length] = [];
    this.m_WordKeyIndex[length].push(index);

};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    var lentgh = word.length;
    
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = Object.create(WordDictionary).createNew()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
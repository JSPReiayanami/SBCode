String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
let stream = require('stream');

let ToolClass = require('./ToolClass')
let tool = new ToolClass()
process.on('beforeExit', (code) => {
    console.log('进程 beforeExit 事件的代码: ', code);
});
  
process.on('exit', (code) => {
    console.log('进程 exit 事件的代码: ', code);
});
  

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.PutCode = function(){
    tool.Help()
    rl.question('输入指令:', (answer) => {
        this.WaitPutCode = answer
        if(tool.NoDataFuncMap[answer] === 1){
            this.DealPut()
        }else{
            this.PutData()
        }
        
    });
}
exports.PutData = function(){
    rl.question('输入指令的参数,多个参数空格隔开:', (answer) => {
        this.WaitPutCodeData = answer.split(' ')
        this.DealPut()
    });
}

exports.DealPut = function(){
    if(tool[this.WaitPutCode] == null){
        console.log("没有这个指令!!")
    }else{
        try {
            tool[this.WaitPutCode](this.WaitPutCodeData)
        } catch (error) {
            console.log("执行指令错误:",error)
        }
    }
    this.WaitPutCode = null
    this.WaitPutCodeData = null
    this.PutCode()
}

this.PutCode()
//tool.ReplceName([ '/Users/b/Desktop/temp/hot/1.73.416', 'cloud', 'hot', 'Y' ,'Y','json'])
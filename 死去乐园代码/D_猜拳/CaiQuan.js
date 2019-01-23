process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
var caiTable = {
    'g':{ g:0,c:1,p:0},
    'c':{ g:0,c:0,p:1},
    'p':{ g:1,c:0,p:0},
}
var caiWin = function(caiA,caiB)
{
    if(caiTable[caiA] == null) return 0;
    if(caiTable[caiA][caiB] == null) return 0;

    return caiTable[caiA][caiB];
}

var deal = function(data)
{
    if(data.length <= 0) return;
    var num = parseInt(data[0]);
    var aWin = 0;
    var bWin = 0;
    for(var i = 1 ; i <= num ; i++)
    {
        var lineData = data[i];
        var caiArr = lineData.split(' ');
        if(caiArr.length == 2)
        {
            aWin += caiWin(caiArr[0],caiArr[1]);
            bWin += caiWin(caiArr[1],caiArr[0]);
        }
    }
    console.log(aWin);
    console.log(bWin);
}
reader.on('line', (line) => {
  lines.push(line);
  //console.log("输入:",lines[lines.length - 1]);
});
reader.on('close', () => {
  //console.log("输入:",lines);
  deal(lines);
});

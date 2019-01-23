process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var ChangeNumToIndex = function(zLength,target)
{
    var strTarget = ''+target;
    var disLen = zLength - strTarget.length;
    if(disLen <= 0) return strTarget;
    var zStr = '';
    for(var i = 0;i < disLen ;i++)
    {
      zStr += '0';
    }
    return zStr+strTarget;
}

var Deal = function(data)
{
    data = data.split(' ');
    var zIndexNum = parseInt(data[0]);
    var startNum = parseInt(data[1]);
    var endNum = parseInt(data[2]);
    for(var i = startNum ; i <= endNum ; i++)
    {
      console.log(ChangeNumToIndex(zIndexNum,i));
    }
}


var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  //console.log(lines[0]);
  Deal(lines[0]);
});

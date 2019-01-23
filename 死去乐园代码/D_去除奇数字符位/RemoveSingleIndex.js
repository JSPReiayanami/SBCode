process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var Deal = function(data)
{
    var newData = '';
    for(var key in data)
    {
      var tempCh = data[key]
      if(key % 2 == 0)
      {
        newData += tempCh;
      }
    }
    return newData;
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
  console.log(Deal(lines[0]));
});
console.log(Deal('PXaXiXzXaX'));
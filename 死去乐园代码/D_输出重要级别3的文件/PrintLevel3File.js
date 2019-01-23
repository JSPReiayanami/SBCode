process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var Deal = function(data)
{
  var level_3_file = [];
  for(var key in data)
  {
    if(key == 0) continue;
    var dataArr = data[key].split(' ');
    if(dataArr.length == 2 && parseInt( dataArr[1] ) == 3)
    {
      console.log( dataArr[0] );
    }
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
  Deal(lines)
});

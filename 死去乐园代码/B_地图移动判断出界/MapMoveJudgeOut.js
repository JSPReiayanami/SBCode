process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var Move = function(pos,chOp)
{
  if(chOp == 'U')
  {
    pos.Y++;
  }
  else if(chOp == 'D')
  {
    pos.Y--;
  }
  else if(chOp == 'L')
  {
    pos.X--;
  }
  else if(chOp == 'R')
  {
    pos.X++;
  }
  return pos;
}


var Deal = function(data)
{
    var mapData = data[0].split(' ');
    var mapW = parseInt(mapData[0]);
    var mapH = parseInt(mapData[1]);
    var opNum = parseInt(mapData[2]);
    var pos = {X:1,Y:1};
    for(var i = 1; i <= opNum;i++)
    {
       pos = Move(pos,data[i]);
       if(pos.X > mapW || pos.X <= 0 || pos.Y > mapH || pos.Y <= 0)
       {
         return 'invalid'
       }
    }

    return 'valid'
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
  console.log(Deal(lines));
});
//console.log(Deal(['2 2 4','R','L','U','U']));
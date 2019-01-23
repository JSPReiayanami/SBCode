process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var Deal = function(data)
{
    if(data.length < 2 ) return 'error';
    var myMoney = parseFloat(data[0]);
    var getMoney = parseFloat(data[1]);
    if(isNaN(myMoney) == false && isNaN(getMoney) == false)
    {
        if(myMoney >= getMoney)
        {
            return myMoney - getMoney;
        }
    }   
    return 'error';
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

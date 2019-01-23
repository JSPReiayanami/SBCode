process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var GetNoSameCh = function(str,target)
{
  if(target == '') return str;
  var sameMax = 0;
  var tCh = '';
  var sCh = '';
  for(var i = 0 ; i < target.length;i++ )
  {
    var tCh = target[ target.length - i - 1 ] + tCh;
    var sCh = sCh + str[i];
    if(sCh == null) return '';
    if(tCh != sCh) continue;
    sameMax = i+1;
  }
  return str.substr(sameMax, str.length - sameMax)
}
var Deal = function(data)
{
  var startCh = '';
  for(var key in data)
  {
    if(key == 0) continue;
    startCh += GetNoSameCh(data[key],startCh)
  }
  return startCh;

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
  console.log(Deal(lines))
});
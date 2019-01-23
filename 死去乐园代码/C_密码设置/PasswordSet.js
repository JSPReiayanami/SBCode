process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var isHaveNumAndCh = function(data)
{
    var haveNum = false;
    var haveCh = false;
    var haveNoOtherCh = true;
    for(var key in data)
    {
        var singelCh = data[key]+'';
        if( singelCh >= '0' && singelCh <= '9')
        {
            haveNum = true;
        }

        if( (singelCh >= 'a' && singelCh <= 'z') || (singelCh >= 'A' && singelCh <= 'Z') )
        {
            haveCh = true;
        }
    }

    return haveNum&&haveCh;
}

var isHaveSameCh = function(data)
{
    var jugeCh = null;
    var sameNum = 0;
    for(var key in data)
    {
        if(jugeCh == null) jugeCh = data[key];
        if(jugeCh == data[key])
        {
            sameNum++;
        }else{
            sameNum = 0;
            jugeCh = data[key];
        }
        if(sameNum >= 2) return false
    }

    return true;
}

var Deal = function(data)
{
    data = data.toLowerCase();
    if(data.length < 6) return 'Invalid';
    if(isHaveNumAndCh(data) == false) return'Invalid';
    if(isHaveSameCh(data) == false) return'Invalid';
    return 'Valid'
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
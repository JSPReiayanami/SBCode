process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var Deal = function(data)
{
    var comNum = parseInt(data[0]);
    var allComInfo = {};
    var winComIndex = null;
    for(var i = 1;i <= comNum ;i++)
    {
        var comData = data[i];
        var info = {};
        info.Score = 0;
        info.W = 0;
        info.D = 0;
        info.L = 0;
        for(var key in comData)
        {
            if(comData[key] == '-')continue;
            if(comData[key] == 'W')
            {
                info.W++;
                info.Score+=2;
            }
            else if(comData[key] == 'D')
            {
                info.D++;
                info.Score++;
            }
            else if(comData[key] == 'L')
            {
                info.L++;
            }
        }
        allComInfo[i] = info;
        if(winComIndex == null)
        {
            winComIndex = i;
        }else{
            if( allComInfo[i].Score > allComInfo[winComIndex].Score)
            {
                winComIndex = i;
            }
        }
        
    }
    var winCom = allComInfo[winComIndex];
    console.log(winComIndex+' '+winCom.Score+' '+winCom.W+' '+winCom.D+' '+winCom.L)
}

//输出  冠军队伍  得分 胜场  平场  负场
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
  Deal(lines);
});

 
// Deal([
//     3,
//     '-WW',
//     'L-L',
//     'LW-',
// ]);
 
 
 
 

// Deal([
//     10,
//     '-WLDWWDWWW',
//     'L-WDWWWLWW',
//     'WL-LWWLWWD',
//     'DDW-WWDWWW',
//     'LLLL-LLLWW',
//     'LLLLW-WLLL',
//     'DLWDWL-WLW',
//     'LWLLWWL-WW',
//     'LLLLLWWL-W',
//     'LLDLLWLLL-',
// ]);
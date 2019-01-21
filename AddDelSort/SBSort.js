

var sbSort = function(arr)
{
    var baoliuArr = [];
    var FuShuArr = [];
    var ZhengShuArr = [];
    var op = true;
    var minChangge = 0;
    for(var index in arr)
    {
        baoliuArr.push(arr[index]);
        if(arr[index] == 0)
        {
            ZhengShuArr.push(index);
        }
        if(Math.abs( arr[index] ) == 0) continue;
        if(minChangge == 0)
        {
            minChangge = Math.abs( arr[index] )
        }
        else if(Math.abs( arr[index] ) < minChangge)
        {
            minChangge = Math.abs( arr[index] )
        }
    }
    while(op == true && minChangge !=0 )
    {
        op = false;
        var tempMinChangge = 0;
        for(var index in arr)
        {
            if(arr[index] > 0)
            {
                arr[index]-= minChangge;
                op = true;
                if(arr[index] == 0)ZhengShuArr.push(index);
            }else if(arr[index] < 0){
                arr[index]+= minChangge;
                op = true;
                if(arr[index] == 0)FuShuArr.push(index);
            }
            if(arr[index] != 0)
            {
                if(tempMinChangge == 0)
                {
                    tempMinChangge = Math.abs( arr[index] )
                }
                else if(Math.abs( arr[index] ) < tempMinChangge)
                {
                    tempMinChangge = Math.abs( arr[index] )
                }
            }
        }
        minChangge = tempMinChangge;
    }
    //最后结合一下
    //越先加到0的负数越大，所以...
    //越先减到0的正数越小，所以...
    var arrSort = [];
    for(var i = FuShuArr.length - 1; i >= 0;i--)
    {
        arrSort.push(baoliuArr[  FuShuArr[i] ])
    }
    for(var i = 0; i < ZhengShuArr.length;i++)
    {
        arrSort.push(baoliuArr[  ZhengShuArr[i] ])
    }
    return arrSort;
}

var randBig = 99999;
var needArr = [];
for(var i = 0;i < 1000;i++)
{
    if(i%2 == 0)
        needArr.push( -1*Math.floor(  Math.random()* randBig ) );
    else
        needArr.push( Math.floor(  Math.random()* randBig ) );
}
console.log("arr:",needArr);
var startTime = Date.now();
sbSort(needArr)
var endTime = Date.now();
console.log("start time:",startTime);
console.log("end time:",endTime);
console.log("数组长度:",needArr.length,"耗时:",endTime - startTime,"毫秒") ;
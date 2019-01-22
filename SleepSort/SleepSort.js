

var SleepSort = function(arr,call)
{
    var newArr = [];
    var allLength = arr.length;
    var oarr = [];
    var min = null;
    for(var key in arr)
    {
        oarr.push( arr[key] )
        if(min == null)
        {
            min = arr[key];
        }else if(min < arr[key])
        {
            min = arr[key];
        }
    }
    //把负数变成正数
    for(var key in oarr)
    {
        oarr[key] += Math.abs(min);
    }
    var func = function PrintNum(k)
    {
        //console.log(arr[k]);
        newArr.push(arr[k]);
        if(newArr.length == allLength)
        {
            call(newArr);
        }
    }
    for(var key  in oarr)
    {
        var num = oarr[key];
        setTimeout(func.bind(this,key),num*5);
    }

}
var ranBigNum = 50;
var needArr = [];
for(var i = 0;i < 1000;i++)
{
    if(i%2 == 0)
        needArr.push( Math.floor( Math.random()*ranBigNum ) )
    else
    needArr.push( -1* Math.floor( Math.random()*ranBigNum ) )
}
console.log('对排序:',needArr);
var startTime = Date.now();
SleepSort(needArr,function(arr){
    var endTime = Date.now();
    console.log(arr);
    console.log('排序开始时间:',startTime);
    console.log('排序结束时间:',endTime);
    console.log('[长度:',arr.length,']排序耗时毫秒:',(endTime -  startTime));
});

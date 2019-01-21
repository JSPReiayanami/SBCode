

var sbSort = function(arr)
{
    var baoliuArr = [];
    var FuShuArr = [];
    var ZhengShuArr = [];
    var op = true;
    for(var index in arr)
    {
        baoliuArr.push(arr[index]);
        if(arr[index] == 0)
        {
            ZhengShuArr.push(index);
        }
    }
    while(op == true)
    {
        op = false;
        for(var index in arr)
        {
            if(arr[index] > 0)
            {
                arr[index]--;
                op = true;
                if(arr[index] == 0)ZhengShuArr.push(index);
            }else if(arr[index] < 0){
                arr[index]++;
                op = true;
                if(arr[index] == 0)FuShuArr.push(index);
            }
        }
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
var needArr = [1,3,-5,3,8,10,2,-5,-2];
console.log("arr:",needArr);
console.log("start time:",Date.now());
console.log(sbSort(needArr));
console.log("end time:",Date.now());
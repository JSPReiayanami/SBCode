var fs = require("fs")
function readDirSync(path){
    let pathArr = []
    let dirArr = []  
    let pa = fs.readdirSync(path);  
    pa.forEach(function(ele,index){  
        var info = fs.statSync(path+"/"+ele)      
        if(info.isDirectory()){  
            dirArr.push(path+"/"+ele)
            let info = readDirSync(path+"/"+ele)
            let nextArr = info.PathArr;  
            pathArr = pathArr.concat( nextArr )
            dirArr = dirArr.concat( info.DirArr )
            
        }else{  
            pathArr.push(path+"/"+ele)
        }     
    })  
    return {PathArr:pathArr,DirArr:dirArr}
}   
let ToolClass = function(){
    this.NoDataFuncMap = {Help:1,Close:1}
}
ToolClass.prototype.Help = function(){
    console.log(
        "命令:\n"
        +"  Help:[详细指令]\n"
        +"  Close:[关闭工具]\n"
        +"  ReplceName:[绝对路径,原名,替换的名字,是否包括文件夹的名字(Y/N)]\n"
        
    )
}

ToolClass.prototype.Close = function(){
    process.exit(0)
}

ToolClass.prototype.ReplceName = function(data){
    let path = data[0]
    let oldKey = data[1]
    let newKey = data[2]
    let andDir = data[3]
    let fileInfo = readDirSync(path)
    let fileArr = fileInfo.PathArr
    let dirArr = fileInfo.DirArr
    for(let index in fileArr){
        let filePathStr = fileArr[index]
        let filePathArr = filePathStr.split("/")
        let fileName = filePathArr[ filePathArr.length - 1]
        filePathArr[ filePathArr.length - 1] = fileName.replace(new RegExp(oldKey,'g'),newKey)
        let newPathStr = filePathArr.join('/')
        fs.renameSync( filePathStr,newPathStr )
    }
    if(andDir === 'Y'){
        let rootPathStrArr = path.split('/')
        dirArr.sort((pathA,pathB)=>{
            let pathAArr = pathA.split("/")
            let pathBArr = pathB.split("/")
            return pathAArr.length > pathBArr.length ? -1:1
        })
        for(let index in dirArr){
            let filePathStr = dirArr[index]
            let filePathArr = filePathStr.split("/")
            let fileName = filePathArr[ filePathArr.length - 1]
            filePathArr[ filePathArr.length - 1] = fileName.replace(new RegExp(oldKey,'g'),newKey)
            let newPathStr = filePathArr.join('/')
            if(filePathStr === newPathStr)continue
            fs.renameSync( filePathStr,newPathStr )
        }
    }
}

 

module.exports = ToolClass
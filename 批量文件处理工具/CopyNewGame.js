let ToolClass = require('./ToolClass')
let tool = new ToolClass()
let data = process.argv
console.log(data)
if(data.length != 5){
    console.log("参数个数有问题!")
    return
}
let path = data[2]
let oName = data[3]
let oFist = oName[0]
let oFistBigName = oFist.toLocaleUpperCase+''+oName.substr(1,oName.length - 1)
let newName = data[4]
let newFist = newName[0]
let newFistBigName = newFist.toLocaleUpperCase+''+newFist.substr(1,newFist.length - 1)
let scpOPath = path+"/scripts/scene-slots-machine/slots-machines/"+oName
let scpNewPath = path+"/scripts/scene-slots-machine/slots-machines/"+newName
console.log("脚本拷贝开始")
tool.CopyDirectory(scpOPath,scpNewPath)
console.log("脚本拷贝结束")
let resOPath = path+"/resources/slots-machines/"+oName
let resNewPath = path+"/resources/slots-machines/"+newName
console.log("资源拷贝开始")
tool.CopyDirectory(resOPath,resNewPath)
console.log("资源拷贝结束")
setTimeout(()=>{
console.log("删除meta文件开始")
tool.DeleteFileWithType([scpNewPath,'meta'])
tool.DeleteFileWithType([resNewPath,'meta'])
console.log("删除meta文件结束")
console.log("修改文件名字开始")
//首字母大写消息都处理一下
tool.ReplceName([ scpNewPath, oName, newName, 'Y' ,'Y'])
tool.ReplceName([ resNewPath, oName, newName, 'Y' ,'Y'])
tool.ReplceName([ scpNewPath, oFistBigName, newFistBigName, 'Y' ,'Y'])
tool.ReplceName([ resNewPath, oFistBigName, newFistBigName, 'Y' ,'Y'])
console.log("修改文件名字结束")
console.log("拷贝场景")
let sceneOPath = path+"/scene/machine-scene/"+oName+"-machine-scene.fire"
let sceneNewPath = path+"/scene/machine-scene/"+newName+"-machine-scene.fire"
tool.CopyFile(sceneOPath,sceneNewPath)
console.log("拷贝场景结束")
},1000)

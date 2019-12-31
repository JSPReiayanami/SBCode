let ToolClass = require('./ToolClass')
let tool = new ToolClass()
let data = process.argv
console.log(data)
if(data.length != 5){
    console.log("参数个数有问题!")
    return
}
let path = data[2]
let newPath = data[3]
let oName = data[4]


console.log("脚本拷贝开始")
let scpOPath = path+"/assets/scripts/scene-slots-machine/slots-machines/"+oName
let scpNewPath = newPath+"/assets/scripts/scene-slots-machine/slots-machines/"+oName
tool.DeleteDirectory(scpNewPath)
tool.CopyDirectory(scpOPath,scpNewPath)
tool.CopyFile(scpOPath+".meta",scpNewPath+".meta")
console.log("脚本拷贝结束")

console.log("资源拷贝开始")
let resOPath = path+"/assets/resources/slots-machines/"+oName
let resNewPath = newPath+"/assets/resources/slots-machines/"+oName
tool.DeleteDirectory(resNewPath)
tool.CopyDirectory(resOPath,resNewPath)
tool.CopyFile(resOPath+".meta",resNewPath+".meta")
console.log("资源拷贝结束")

console.log("打包资源拷贝开始")
let picOPath = path+"/projTools/PicPackInfoEditor/originResources/scene/scene_"+oName+"_all"
let picNewPath = newPath+"/projTools/PicPackInfoEditor/originResources/scene/scene_"+oName+"_all"
tool.DeleteDirectory(picNewPath)
tool.CopyDirectory(picOPath,picNewPath)
console.log("打包资源拷贝结束")


console.log("拷贝协议开始")
tool.CreateDirectory(newPath+"/projTools/SFSObject2Native/proto/machines")
let protoOPath = path+"/projTools/SFSObject2Native/proto/machines/slots_proto_"+oName+".json"
let protoNewPath = newPath+"/projTools/SFSObject2Native/proto/machines/slots_proto_"+oName+".json"
tool.CopyFile(protoOPath,protoNewPath)
console.log("拷贝协议结束")



console.log("拷贝场景开始")
tool.CreateDirectory(newPath+"/assets/scene/machine-scene")
let sceneOPath = path+"/assets/scene/machine-scene/"+oName+"-machine-scene.fire"
let sceneNewPath = newPath+"/assets/scene/machine-scene/"+oName+"-machine-scene.fire"
tool.CopyFile(sceneOPath,sceneNewPath)
tool.CopyFile(sceneOPath+".meta",sceneNewPath+".meta")
console.log("拷贝场景结束")
setTimeout(()=>{

},1000)

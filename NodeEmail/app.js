// let Email = require('./Tool/Email')
// let OptionsKey = Email.OptionsKey
// let MailOptionsKey = Email.MailOptionsKey
// let opt = {}
// opt[OptionsKey.Preloading] = true
// //opt[OptionsKey.Port] = 300
// opt[OptionsKey.Service] = "qq"
// opt[OptionsKey.SecureConnection] = true
// opt[OptionsKey.User] = "562168830@qq.com"
// opt[OptionsKey.Pass] = "bpnuxkxldgmdbffj"
// let preMopt = {}
// preMopt[ MailOptionsKey.From ] =  '"EmailServer"<562168830@qq.com>'
// let email = new Email(opt,preMopt)


// let mailOptions = {};
// mailOptions[ MailOptionsKey.To ] =  '1105998247@163.com'
// mailOptions[ MailOptionsKey.Subject ] =  'Hello Hello Hello'
// mailOptions[ MailOptionsKey.Html ] =  '<b>code:22222</b>'
// email.SendEmail(mailOptions)

// let fs = require('fs')
// let IdentifyingCode = require('./Tool/IdentifyingCode')
// let identifyingCode = new IdentifyingCode()
// let imgBuffer = identifyingCode.CreateCode("reia678")

// console.log(imgBuffer)

let AStar = require('./Tool/AStar')
let star = new AStar()
star.PrintMapInfo()

star.SetCanMoveCall( (pos,mapData)=>{
    if(mapData >= 8) return false
    return true
} )
//star.PrintMapInfo()
let testCount = 10
let totalTime = 0
for(let test = 0;test < testCount;test++){
    let randMap = []
    let MapSize = {w:500,h:500}
    for(let y = 0;y<MapSize.h;y++){
    let xMap = []
    for(let x = 1;x<MapSize.w;x++){
        xMap.push( Math.floor( Math.random() *  10 ) )
    }
        randMap.push(xMap)
    }
    star.SetMapData(randMap)
    let startTime = Date.now()
    let path = star.FindPath({x:0,y:0},{x:MapSize.w - 1,y:MapSize.h-1})
    let endTime = Date.now()
    console.log("耗时:",endTime - startTime)
    totalTime+= endTime - startTime
    console.log(path)
}
console.log("寻路次数:",testCount)
console.log("总耗时:",totalTime)
console.log("平均耗时:",totalTime/testCount)
//star.PrintFindPath(path)



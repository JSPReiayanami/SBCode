var fs = require("fs")
var xlsx = require("xlsx")
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
function readDirSync(path) {
    let pathArr = []
    let dirArr = []
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            dirArr.push(path + "/" + ele)
            let info = readDirSync(path + "/" + ele)
            let nextArr = info.PathArr;
            pathArr = pathArr.concat(nextArr)
            dirArr = dirArr.concat(info.DirArr)

        } else {
            pathArr.push(path + "/" + ele)
        }
    })
    return { PathArr: pathArr, DirArr: dirArr }
}
let ToolClass = function () {
    this.NoDataFuncMap = { Help: 1, Close: 1 }
}
ToolClass.prototype.Help = function () {
    console.log(
        "命令:\n"
        + "  Help:[详细指令]\n"
        + "  Close:[关闭工具]\n"
        + "  ReplceName:[绝对路径,原名,替换的名字,是否包括文件夹的名字(Y/N),是否包含文件夹内文件内容(Y/N),包含的文件内容的文件后缀名(例子:json,txt,js)]\n"
        + "  DeleteFileWithType:[绝对路径,需要删除的文件类型,可写多个用逗号隔开(例子js,txt)]\n"
        + "  XLSXReplace:[绝对路径,原名,替换的名字]\n"
    )
}

ToolClass.prototype.Close = function () {
    process.exit(0)
}
//typeArr String
ToolClass.prototype.GetFileTypeArrMap = function (typeArrStr) {
    if (typeArrStr == null) return null
    let typeArrMap = null
    try {
        typeArr = typeArrStr.split(',')
        for (let index in typeArr) {
            if (typeArrMap == null) typeArrMap = {}
            typeArrMap[typeArr[index]] = 1
        }
    } catch (error) {
        typeArrMap = null
    }
    return typeArrMap
}

ToolClass.prototype.IsFileTypeInMap = function (filePathStr, fileTypeMap) {
    let splitPath = filePathStr.split('.')
    if (splitPath.length > 0) {
        let fileType = splitPath[splitPath.length - 1]
        if (fileTypeMap[fileType] != null) {
            return true
        }
    }
    return false
}

ToolClass.prototype.ReplceName = function (data) {
    let path = data[0]
    let oldKey = data[1]
    let newKey = data[2]
    let andDir = data[3]
    let andContetnt = data[4]
    let modiyContentTypeMap = this.GetFileTypeArrMap(data[5])
    let fileInfo = readDirSync(path)
    let fileArr = fileInfo.PathArr
    let dirArr = fileInfo.DirArr

    if (andContetnt === 'Y') {
        console.log('开始替换内容')
        for (let index in fileArr) {
            let filePathStr = fileArr[index]
            let content = fs.readFileSync(filePathStr, { encoding: 'utf-8' })
            let needRplace = true
            if (modiyContentTypeMap != null) {
                needRplace = false
                if (this.IsFileTypeInMap(filePathStr, modiyContentTypeMap)) {
                    needRplace = true
                }
            }
            if (needRplace == false) continue
            content = content.replaceAll(oldKey, newKey)
            fs.writeFileSync(filePathStr, content, { encoding: 'utf-8' })
        }
        console.log('替换内容结束')
    }
    console.log('开始修改文件名字')
    for (let index in fileArr) {
        let filePathStr = fileArr[index]
        let filePathArr = filePathStr.split("/")
        let fileName = filePathArr[filePathArr.length - 1]
        filePathArr[filePathArr.length - 1] = fileName.replace(new RegExp(oldKey, 'g'), newKey)
        let newPathStr = filePathArr.join('/')
        fs.renameSync(filePathStr, newPathStr)
    }
    console.log('修改文件名字结束')
    if (andDir === 'Y') {
        console.log('开始修改文件夹名字')
        let rootPathStrArr = path.split('/')
        dirArr.sort((pathA, pathB) => {
            let pathAArr = pathA.split("/")
            let pathBArr = pathB.split("/")
            return pathAArr.length > pathBArr.length ? -1 : 1
        })
        for (let index in dirArr) {
            let filePathStr = dirArr[index]
            let filePathArr = filePathStr.split("/")
            let fileName = filePathArr[filePathArr.length - 1]
            filePathArr[filePathArr.length - 1] = fileName.replace(new RegExp(oldKey, 'g'), newKey)
            let newPathStr = filePathArr.join('/')
            if (filePathStr === newPathStr) continue
            fs.renameSync(filePathStr, newPathStr)
        }
        console.log('修改文件夹名字结束')
    }

}


ToolClass.prototype.DeleteFileWithType = function (data) {
    let path = data[0]
    let fileTypeArrMap = this.GetFileTypeArrMap(data[1])
    let fileInfo = readDirSync(path)
    let fileArr = fileInfo.PathArr
    let dirArr = fileInfo.DirArr
    if (fileTypeArrMap == null) {
        console.log('没有指定删除的类型,删除失败!')
        return
    }
    console.log('开始检测删除文件')
    let deleteCount = 0
    for (let index in fileArr) {
        let filePathStr = fileArr[index]
        if (fileTypeArrMap != null) {
            if (this.IsFileTypeInMap(filePathStr, fileTypeArrMap)) {
                console.log('删除文件:', filePathStr)
                fs.unlinkSync(filePathStr)
                deleteCount++
            }
        }
    }
    console.log('删除文件:', deleteCount, '个文件')
}


ToolClass.prototype.XLSXReplace = function (data) {
    let path = data[0]
    let oldKey = data[1]
    let newKey = data[2]
    let fileInfo = readDirSync(path)
    let fileArr = fileInfo.PathArr
    let dirArr = fileInfo.DirArr
    for (let index in fileArr) {
        let filePathStr = fileArr[index]
        if (this.IsFileTypeInMap(filePathStr, { 'xlsx': 1 })) {
            let workBook = xlsx.readFile(filePathStr)
            for (let indexBook in workBook.Sheets) {
                let sheet = workBook.Sheets[indexBook]
                for (let sheetIndex in sheet) {
                    let hengPaiArr = sheet[sheetIndex]
                    if (typeof hengPaiArr === 'string') continue
                    for (let indexHengPai in hengPaiArr) {
                        let content = hengPaiArr[indexHengPai]

                        if (typeof content === 'number') {
                            content = "" + content
                            content = content.replaceAll(oldKey, newKey)
                            try {
                                content = parseFloat(content)
                            } catch (error) {
                            }
                        } else if (typeof content === 'string') {
                            content = content.replaceAll(oldKey, newKey)
                        } else {

                        }

                        workBook.Sheets[indexBook][sheetIndex][indexHengPai] = content
                    }
                }
            }
            xlsx.writeFile(workBook, filePathStr)
            console.log(workBook)
        }

    }

}

ToolClass.prototype.CopyDirectory = function (src, dst) {
    this.DeleteDirectory(dst);
    this.CreateDirectory(dst);
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach((path) => {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat(_src, (err, stats) => {  //stats  该对象 包含文件属性
            if (err) throw err;
            if (stats.isFile()) { //如果是个文件则拷贝 
                fs.copyFileSync(_src, _dst)
            } else if (stats.isDirectory()) { //是目录则 递归 
                this.CopyDirectory(_src,_dst);
            }
        });
    })
}



ToolClass.prototype.DeleteDirectory = function (path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach( (file, index) =>{
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                this.DeleteDirectory(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
ToolClass.prototype.CreateDirectory = function (dir) {
    if (fs.existsSync(dir) != true) {
        fs.mkdirSync(dir);
    }
}

ToolClass.prototype.CopyFile = function (src,dst) {
    fs.copyFileSync(src, dst)
}
module.exports = ToolClass
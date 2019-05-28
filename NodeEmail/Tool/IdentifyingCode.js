/**
 * @https://cnodejs.org/topic/581b2502e90cfbec054d763f
 */
let BMP24 = require('gd-bmp').BMP24;
let fs = require('fs')
function rand(min, max) {
    return Math.random()*(max-min+1) + min | 0; 
}

function IdentifyingCode(){

}


IdentifyingCode.prototype.CreateCode = function(code){
    var img = new BMP24(100,50);
    img.drawString(code, 0,0, BMP24.font8x16, rand(0, 0xffffff));
    return img.getFileData();
}

IdentifyingCode.prototype.CreatePng = function(code){
    var img = new BMP24(100,50);
    img.drawString(code, 0,0, BMP24.font8x16, rand(0, 0xffffff));
    fs.writeFile("./img.png",imgBuffer,(err)=>{
        console.log(err)
    })
}


module.exports = IdentifyingCode
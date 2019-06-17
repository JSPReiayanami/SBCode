let GameWorldBase = require('./GameWorldBase')

let SHJWorld = function(){

}
SHJWorld.prototype = new GameWorldBase()
SHJWorld.prototype.constructor = GameWorldBase
//////////////

SHJWorld.prototype.GetWorldType = function(){
    return GameWorldBase.prototype.GetWorldType.apply(this, Array.prototype.slice.apply(arguments));
}
module.exports = SHJWorld
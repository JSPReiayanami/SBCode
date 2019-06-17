let GameWorldBase = function(){
    this.InitData()
}
/////////////
GameWorldBase.WolrdType = {
    NULL:0,
    SHJ:1
}
////////////
GameWorldBase.prototype.InitData = function(){
    this.m_WolrdType = GameWorldBase.WolrdType.NULL
}

GameWorldBase.prototype.GetWorldType = function(a){
    this.m_WolrdType = a*a
    return this.m_WolrdType
}

module.exports = GameWorldBase
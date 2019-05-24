class SeedRandom{
    //---
    m_Sedd = 0

    //---
    constructor(seed)
    {
        this.m_Seed;
    }
    GetRandomNum(min,max)
    {
        max = max || 1;
        min = min || 0;
    
        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280.0;
    
        return Math.ceil( min + rnd * (max - min) ); 
    }
}

module.exports = SeedRandom


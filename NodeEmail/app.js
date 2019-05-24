let Email = require('./Tool/Email')
let OptionsKey = Email.OptionsKey
let MailOptionsKey = Email.MailOptionsKey
let opt = {}
opt[OptionsKey.Preloading] = true
//opt[OptionsKey.Port] = 300
opt[OptionsKey.Service] = "qq"
opt[OptionsKey.SecureConnection] = true
opt[OptionsKey.User] = "562168830@qq.com"
opt[OptionsKey.Pass] = "bpnuxkxldgmdbffj"
let preMopt = {}
preMopt[ MailOptionsKey.From ] =  '"EmailServer"<562168830@qq.com>'
let email = new Email(opt,preMopt)


let mailOptions = {};
mailOptions[ MailOptionsKey.To ] =  '1105998247@163.com'
mailOptions[ MailOptionsKey.Subject ] =  'Hello Hello Hello'
mailOptions[ MailOptionsKey.Html ] =  '<b>code:22222</b>'
email.SendEmail(mailOptions)


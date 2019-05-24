let nodemailer = require('nodemailer');

function Email(options,preMailOptions){
  this.Options = options || {}
  this.PreMailOptions = preMailOptions || {}
  this.State = Email.StateType.Init
  this.Transporter = null
  if(this.Options.Preloading == true){
    this.Init()
  }
}

Email.StateType = {
  Init:0,
  InitOver:1,
  OptionsErr:2
}

Email.OptionsKey = {
  Preloading:"Preloading",
  Service:"Service",
  Port:"Port",
  SecureConnection:"SecureConnection",
  User:"User",
  Pass:"Pass"
}
/*
  let mailOptions = {
    from: '"JavaScript之禅" <a>', // sender address
    to: '1206223891@qq.com', // list of receivers
    subject: 'Hello', // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  };
*/
Email.MailOptionsKey = {
  From:"From",
  To:"To",
  Subject:"Subject",
  Text:"Text",
  Html:"Html"
}

Email.prototype.Init =  function(){

  if(this.State == Email.StateType.InitOver) {
    return
  }
  this.State = Email.StateType.OptionsErr
  if( 
      this.Options != null && 
      this.Options[ Email.OptionsKey.Service ] != null && 
      //this.Options[ Email.OptionsKey.Port ] != null && 
      this.Options[ Email.OptionsKey.SecureConnection ] != null && 
      this.Options[ Email.OptionsKey.User ] != null && 
      this.Options[ Email.OptionsKey.Pass ] != null 
    ){
      try {
        this.Transporter = null
        this.Transporter = nodemailer.createTransport({
          // host: 'smtp.ethereal.email',
          service: this.Options[ Email.OptionsKey.Service ], // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
          port: this.Options[ Email.OptionsKey.Port ], // SMTP 端口
          secureConnection: this.Options[ Email.OptionsKey.SecureConnection ], // 使用了 SSL
          auth: {
            user: this.Options[ Email.OptionsKey.User ],
            //smtp授权码
            pass: this.Options[ Email.OptionsKey.Pass ],
          }
        })
        if(this.Transporter != null){
          this.State = Email.StateType.InitOver
          console.warn("Email Init Ok")
        }else{
          console.warn("Email Init Err Null")
        }
      } catch (error) {
        console.error("Email Init Err:",error)
      }
    }else{
      console.error("Options Err:",this.Options)
    }
}

Email.prototype.SendEmail = function(mailOptions){
    if(this.State == Email.StateType.Init){
      this.Init()
    }
  
    if(this.State != Email.StateType.InitOver){
      console.error("State Can Not Send :",this.State);
      return
    }
    mailOptions = mailOptions || {}
    mailOptions[ Email.MailOptionsKey.From ] = mailOptions[ Email.MailOptionsKey.From ] == null ? this.PreMailOptions[ Email.MailOptionsKey.From ] : mailOptions[ Email.MailOptionsKey.From ]
    mailOptions[ Email.MailOptionsKey.To ] = mailOptions[ Email.MailOptionsKey.To ] == null ? this.PreMailOptions[ Email.MailOptionsKey.To ] : mailOptions[ Email.MailOptionsKey.To ]
    mailOptions[ Email.MailOptionsKey.Subject ] = mailOptions[ Email.MailOptionsKey.Subject ] == null ? this.PreMailOptions[ Email.MailOptionsKey.Subject ] : mailOptions[ Email.MailOptionsKey.Subject ] == null
    if(
        mailOptions[ Email.MailOptionsKey.From ] == null ||
        mailOptions[ Email.MailOptionsKey.To ] == null ||
        mailOptions[ Email.MailOptionsKey.Subject ] == null ||
        (mailOptions[ Email.MailOptionsKey.Text ] == null && mailOptions[ Email.MailOptionsKey.Html ] == null)
      ){
        console.error("MailOptions Err :",MailOptionsKey);
        return
      }

      let mopt = {
        from: mailOptions[ Email.MailOptionsKey.From ],
        to:mailOptions[ Email.MailOptionsKey.To ],
        subject:mailOptions[ Email.MailOptionsKey.Subject ],
        // 发送text或者html格式
        text: mailOptions[ Email.MailOptionsKey.Text ],
        html: mailOptions[ Email.MailOptionsKey.Html ]
      };


    // send mail with defined transport object
    this.Transporter.sendMail(mopt, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
}

module.exports = Email
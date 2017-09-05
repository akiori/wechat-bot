const { Wechaty, log, Message, Contact, MediaMessage } = require('wechaty')
const qrcode = require('qrcode-terminal')

Wechaty.instance()
    .on('scan', (url, code) => {
        let loginUrl = url.replace('qrcode', 'l')
        qrcode.generate(loginUrl)
        console.log(url)
    })
    .on('login',  user => console.log(`User ${user.name()} logined`))
    .on('message', async m => {
        try {
            
            const inMessage = m.from()
            // From whose meassage?
            // MessageInstance.name()
            if (m.room() == null) {
                if (inMessage.name() === '巫英才' || inMessage.name() === 'm.a.u.d') {
                    let cont = "";
                    if (m instanceof MediaMessage) {
                        cont = "发的不是文字"
                    }
                    else {
                        // fetch the content of message
                        cont = m.content()
                    }
                    // To whom I will forward to?
                    // Contact.find(Query)
                    const forwardTo = await Contact.find({ name: '陆俊华的大脑管理员' })
                    await forwardTo.say(inMessage.name() + " said: " + cont)
                }
            }
        }

        catch (e) {
            log.error('Bot', 'on(message) exception: %s' , e)
        }
    })
    .init()

const { Wechaty, log, Message, Contact } = require('wechaty')
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
            if (inMessage.name() === 'm.a.u.d') {
                // fetch the content of message
                const cont = m.content()
                // To whom I will forward to?
                // Contact.find(Query)
                const forwardTo = await Contact.find({ name: '陆俊华的大脑管理员' })
                
                await forwardTo.say(cont)
            }
        }

        catch (e) {
            log.error('Bot', 'on(message) exception: %s' , e)
        }
    })
    .init()

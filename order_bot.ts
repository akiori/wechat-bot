const { Wechaty, log, Room } = require('wechaty')
const qrcode = require('qrcode-terminal')

const vag_choice = [
    {weight: 15, txt: '食堂'},
    {weight: 10, txt: '烤辣鸡'},
    {weight: 10, txt: '韩妈'},
    {weight: 20, txt: '烧鸭面'},
    {weight: 10, txt: '精品牛肉面'},
    {weight: 10, txt: '杨国福'},
    {weight: 10, txt: '妈妈手擀面'},
    {weight: 5, txt: '请点外卖' },
    {weight: 20, txt: '你怎么这么优秀?'},
]

const xixi_choice = [
    { weight: 10, txt: '杭大留食' },
    { weight: 10, txt: '石锅拌饭' },
    { weight: 10, txt: '麦当劳' },
    // { weight: 10, txt: '马塍路外婆家' },
    // { weight: 5, txt: '鲍师傅' },
    { weight:20, txt: '衢州小吃'},
]

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function randomChoices() {
    return vag_choice[getRandomInt(0, vag_choice.length)].txt
}

Wechaty.instance()
    .on('scan', (url, code) => {
        let loginUrl = url.replace('qrcode', 'l')
        qrcode.generate(loginUrl)
        console.log(url)
    })
    .on('login',  user => console.log(`User ${user.name()} logined`))
    .on('message', async m => {
        try {
            const vagRoom = await Room.find({topic: /预备役部队|for one night/})
            console.log(vagRoom)
            if (vagRoom
                && m.room().topic() === vagRoom.topic()
                && m.mentioned()
                && /马哥翔神郭博梅博琦神真爱粉|aki/.test(m.content())
                && /吃/.test(m.content())
                // && !m.self()
            )
            {
                await m.say(`今天我们吃：${randomChoices()}\nfrom Dirac sea`)
                log.info('Bot', 'REPLY: 我们今天吃：${randomChoices()}')
            }

        } catch (e) {
            log.error('Bot', 'on(message) exception: %s' , e)
        }
    })
    .init()

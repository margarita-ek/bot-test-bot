const TelegramApi = require('node-telegram-bot-api')
const { gameOptions, againOptions } = require('./options')

const token = '6269764918:AAEzzvaJ3cSa98jQaS_Jjy29anZxFMyyAmA'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const wordsLooser = ['лох', 'сосай', 'не плачь', 'пэздуй', 'фу, натурал']
const wordsWin = ['удачливей тебя только твоя жопа', 'успешный пидор', 'сегодня тебя ждёт отсос', 'теплого тебе ануса', 'анальный дебошир']

const startGame = async (chatId) => { 
    await bot.sendMessage(chatId, `Я загадаю цифру от 0 до 5, а ты отгадай`)
    const randomNumber = Math.floor(Math.random() * 5)
    chats[chatId] = randomNumber
    // chats[chatId] = 8
    await bot.sendMessage(chatId, `Отгадывай`, gameOptions)
}

const start = () => { 
    bot.setMyCommands([
        {command: '/start', description: 'Денатурализация'},
        {command: '/info', description: 'Ты кто такой'},
        {command: '/game', description: 'Гейская игрушка'},
    ])

    bot.on('message', async msg => { 
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') { 
            await bot.sendSticker(chatId, './img/12.webp')
            return bot.sendMessage(chatId, `Здарова, уёба!`)
        }
        if (text === '/info') { 
            await bot.sendSticker(chatId, './img/6.webp')
            return bot.sendMessage(chatId, `Кот все сказал`)
        }
        if (text === '/game') { 
            return startGame(chatId)
        }
        await bot.sendSticker(chatId, './img/11.webp')
        return bot.sendMessage(chatId, "Я тебя не понимаю")
        
    })
    
    bot.on('callback_query', msg => { 
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let num = Math.floor(Math.random() * 3)
        let numLooser = Math.floor(Math.random() * 9)
        let wordLooserRandom = Math.floor(Math.random() * 4)
        let wordWinRandom = Math.floor(Math.random() * 4)

        if (data === '/again') { 
            return startGame(chatId)
        }
        
        console.log('data', data);
        console.log('chats[chatId]', chats[chatId]);

        if (+data === +chats[chatId]) {
            bot.sendSticker(chatId, `./img/win/${num}.webp`)
            return bot.sendMessage(chatId, `Поздравляю, ${wordsWin[wordWinRandom]}, ты отгадал цифру ${chats[chatId]}`, againOptions)
        } else { 
            bot.sendSticker(chatId, `./img/looser/${numLooser}.webp`)
            return bot.sendMessage(chatId, `Загаданная цифра ${chats[chatId]}, ${wordsLooser[wordLooserRandom]}`, againOptions)
        }
    })
}

start()
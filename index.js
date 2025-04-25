const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Настройки бота
const token = '7577559406:AAG274SvIrBgA2akl4BlPTODsmmSyejoFPs';
const bot = new TelegramBot(token);

// URL вашего Mini App
const miniAppUrl = 'https://godateapp.ru';

// Настройки сервера
const port = 3000;
const webhookUrl = 'https://your-domain.com'; // Замените на ваш домен

// Включаем парсинг JSON
app.use(express.json());

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    // Создаем кнопку для открытия Mini App
    const keyboard = {
        inline_keyboard: [[
            {
                text: 'Открыть Mini App',
                web_app: { url: miniAppUrl }
            }
        ]]
    };

    bot.sendMessage(chatId, 'Добро пожаловать! Нажмите на кнопку ниже, чтобы открыть Mini App:', {
        reply_markup: keyboard
    });
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
    console.log(error);
});

// Маршрут для вебхука
app.post('/webhook', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Установка вебхука
bot.setWebHook(`${webhookUrl}/webhook`)
    .then(() => {
        console.log('Вебхук успешно установлен');
    })
    .catch((error) => {
        console.error('Ошибка при установке вебхука:', error);
    });

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

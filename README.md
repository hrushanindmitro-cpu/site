# 🔒 Security Config

## Файлы безопасности

### `js/secure-config.js` - основной файл с приватными данными
Хранит:
- Email
- Telegram Bot Token и Chat ID
- Ссылки на профили (Telegram, Instagram, Facebook, GitHub, LinkedIn)
- Дополнительные контакты

**ВАЖНО:** Этот файл в `.gitignore` и не попадает в GitHub!

### `js/secure-config.example.js` - пример для других разработчиков
Шаблон без реальных данных, можно коммитить.

## Как настроить

1. Скопируй `js/secure-config.example.js` → `js/secure-config.js`
2. Заполни своими данными:
   ```js
   email: "your@real-email.com",
   telegram: {
     botToken: "123456:ABC-DEF...",
     chatId: "123456789",
     link: "https://t.me/your_real_username"
   }
   ```

3. Не коммить `secure-config.js`!

## Использование в коде

```js
// В brief.html - автоматически подтягивается
CONFIG.telegramBotToken = SECURE_CONFIG.telegram.botToken
CONFIG.telegramChatId = SECURE_CONFIG.telegram.chatId

// В index.html - ссылки на профили
document.querySelectorAll('a[href*="t.me"]').forEach(a => a.href = SECURE_CONFIG.profiles.telegram)
```

## Что делать если токен утек?

1. Сразу пересоздай бота в @BotFather → /revoke
2. Обнови токен в secure-config.js
3. Проверь историю Git - удали коммиты с токеном

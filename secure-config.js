// 🔒 SECURE CONFIG - Публичные данные
// Токен Telegram в переменных окружения Vercel, а не здесь

const SECURE_CONFIG = {
  email: "dmytro.saas@gmail.com",
  profiles: {
    telegram: "https://t.me/DmytroSaasWeb3_bot",
    instagram: "https://www.instagram.com/dmytrosaasweb3architect?utm_source=qr&stkn=cm54YnprMXFsNzk0",
    facebook: "https://www.facebook.com/share/18HnRQvbk6/",
    github: "https://github.com/hrushanindmitro-cpu",
    linkedin: "https://linkedin.com/in/your_username",
    email: "mailto:dmytro.saas@gmail.com"
  },
  telegram: {
    username: "Dima010110",
    link: "https://t.me/DmytroSaasWeb3_bot"
  }
};

if (typeof window !== 'undefined') {
  window.SECURE_CONFIG = SECURE_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SECURE_CONFIG;
}

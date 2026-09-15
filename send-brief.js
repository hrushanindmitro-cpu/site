// api/send-brief.js - Vercel Serverless - с твоими реальными данными
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, contact, type, description, budget, deadline, payments, goals, lang, fullData } = req.body;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8934036369:AAFvOCI1xmegEJHcSRivSSKdSYYJPfBmcAM";
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5231343630";

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Telegram not configured', ok: false });
  }

  const tgText = `<b>🚀 Новый бриф Architect.Dev</b>

<b>Контакт:</b> ${name || '-'} | ${contact || '-'}
<b>Тип:</b> ${type || '-'} 
<b>Бюджет:</b> ${budget || '-'} | <b>Дедлайн:</b> ${deadline || '-'}
<b>Оплаты:</b> ${payments || '-'}
<b>Цели:</b> ${goals || '-'}
<b>Описание:</b> ${(description || '-').substring(0, 500)}
<b>Язык:</b> ${lang || 'ru'}
<b>Дата:</b> ${new Date().toLocaleString('ru-RU')}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: tgText, parse_mode: 'HTML' })
    });
    const tgData = await tgRes.json();
    if (!tgData.ok) return res.status(500).json({ error: 'Telegram failed', details: tgData, ok: false });
    return res.status(200).json({ ok: true, message: 'Sent' });
  } catch (err) {
    return res.status(500).json({ error: err.message, ok: false });
  }
}

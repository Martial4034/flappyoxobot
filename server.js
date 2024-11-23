const express = require('express');
const bot = require('./bot');

const app = express();

// Utiliser le middleware de Telegraf pour les webhooks
app.use(bot.webhookCallback('/api/webhook'));

// Définir le webhook
bot.telegram.setWebhook(`${process.env.APP_URL}/api/webhook`);

// Démarrer le serveur
app.get('/', (req, res) => {
  res.send('Le bot est en cours d\'exécution.');
});

module.exports = app;
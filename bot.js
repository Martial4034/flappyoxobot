require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

// Initialisation du bot avec le token
const bot = new Telegraf(process.env.BOT_TOKEN);

// Variable dynamique pour l'URL (initialisée depuis .env)
let currentUrl = process.env.INITIAL_URL || 'https://google.com/';

// Commande /start
bot.start((ctx) => {
  ctx.reply(
    `Bienvenue dans ${process.env.GAME_TITLE || 'votre application'}! Cliquez ci-dessous pour commencer :`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('Accéder à la mini-app', currentUrl)],
    ])
  );
});

// Commande pour mettre à jour l'URL (admin uniquement)
const ADMIN_ID = process.env.ADMIN_ID; // Votre ID Telegram

bot.command('updateurl', (ctx) => {
  if (ctx.from.id.toString() === ADMIN_ID) {
    const args = ctx.message.text.split(' ').slice(1); // Récupérer l'argument après /updateurl
    const newUrl = args[0];

    if (newUrl) {
      currentUrl = newUrl; // Mettre à jour l'URL actuelle
      ctx.reply(`✅ L'URL a été mise à jour avec succès : ${currentUrl}`);
    } else {
      ctx.reply('❌ Usage: /updateurl <Nouvelle_URL>\nExemple: /updateurl https://example.com');
    }
  } else {
    ctx.reply("❌ Vous n'êtes pas autorisé à utiliser cette commande.");
  }
});

// Commande pour afficher l'URL actuelle
bot.command('currenturl', (ctx) => {
  ctx.reply(`🔗 URL actuelle : ${currentUrl}`);
});

// Gestion des erreurs
bot.catch((err, ctx) => {
  console.error(`❌ Erreur pour ${ctx.updateType}:`, err);
});

// Exportation du bot pour utilisation avec les webhooks
module.exports = bot;

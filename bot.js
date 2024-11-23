require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

// Initialisation du bot avec le token
const bot = new Telegraf(process.env.BOT_TOKEN);

// Commande /start
bot.start((ctx) => {
  ctx.reply(
    'Bienvenue dans Flappy Oxo! Choisissez une option pour commencer à jouer:',
    Markup.inlineKeyboard([
      [
        Markup.button.webApp('Jouer sur oxelta.io', 'https://flappy.oxo.oxelta.io/'),
        Markup.button.webApp('Jouer en local', 'http://127.0.0.1:3000/'),
      ],
    ])
  );
});

// Commande pour modifier les paramètres (réservée à l'admin)
const ADMIN_ID = process.env.ADMIN_ID; // Votre ID Telegram

bot.command('update', (ctx) => {
  if (ctx.from.id.toString() === ADMIN_ID) {
    const args = ctx.message.text.split(' ').slice(1);
    const [link1, link2] = args;
    if (link1 && link2) {
      process.env.LINK1 = link1;
      process.env.LINK2 = link2;
      ctx.reply('Les liens du jeu ont été mis à jour avec succès.');
    } else {
      ctx.reply('Usage: /update <Lien1> <Lien2>');
    }
  } else {
    ctx.reply("Vous n'êtes pas autorisé à utiliser cette commande.");
  }
});

// Gestion des erreurs
bot.catch((err, ctx) => {
  console.error(`Erreur pour ${ctx.updateType}:`, err);
});

// Exportation du bot pour utilisation avec les webhooks
module.exports = bot;
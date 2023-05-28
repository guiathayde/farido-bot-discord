import 'dotenv/config';

import { Events } from 'discord.js';

import discordClient from './services/discordClient';

import commands from './commands';

// commands import
for (const command of commands) {
  if ('data' in command && 'execute' in command) {
    discordClient.commands.set(command.data.name, command);
  } else {
    console.error(
      `Esse comando: ${JSON.stringify(
        command
      )} está com "data" ou "execute ausentes"`
    );
  }
}

// login do bot
discordClient.once(Events.ClientReady, (c) => {
  console.log(`🟢 Ready! Logged in as ${c.user.tag}`);
});
discordClient.login(process.env.TOKEN);

// bot interactions listener
discordClient.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    console.error('Não é um comando');
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    interaction.reply('esse comando nao existe o burrao!');
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply(
      'essa merda q se ta falando nao da pra fazer o arrombado!'
    );
  }
});

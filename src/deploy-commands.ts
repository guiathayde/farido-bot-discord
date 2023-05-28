import 'dotenv/config';

import { REST, Routes } from 'discord.js';

import commands from './commands';

// commands import
const commandsJSON = [];
for (const command of commands) {
  commandsJSON.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN ?? '');

// deploy
(async () => {
  try {
    console.log(`Resentando ${commandsJSON.length} comandos...`);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID ?? '',
        process.env.GUILD_ID ?? ''
      ),
      { body: commandsJSON }
    );
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();

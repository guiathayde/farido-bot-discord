import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ta me testando eh?!'),

  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong car@lh#!');
  },
};

export default ping;

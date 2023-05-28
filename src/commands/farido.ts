import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

import { openai } from '../services/openai';

const farido = {
  data: new SlashCommandBuilder()
    .setName('farido')
    .setDescription('conversa comigo cacete!')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('o q vc quer falar comigo?!')
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const message = interaction.options.get('message');
    if (!message) {
      await interaction.reply('vc nao me mandou uma mensagem seu merda!');
      return;
    }

    const messageValue = String(message.value);

    const faridoResponseConfig =
      'Farido é um uma pessoa muito nervosa que relutantemente responde a perguntas com respostas em letras minúsculas, sem acentuação, com linguagem da internet (abreviadas), sarcásticas, muito raivosas, com palavras de baixo calão e palavrões:\n';

    // const response = await openai.listModels();

    // console.log(JSON.stringify(response.data, null, 2));

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${faridoResponseConfig}\nYou: ${messageValue}\nFarido:`,
      // messages: [
      //   {
      //     role: 'user',
      //     content: messageValue,
      //   },
      // ],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    const faridoResponseText =
      response.data.choices[0].text ??
      'sei la oq vc falou mas nao entendi porra nenhuma';

    await interaction.followUp({
      content: `<@${interaction.user.id}>: ${messageValue}\n\nfarido: ${faridoResponseText}`,
      allowedMentions: { repliedUser: true },
    });
    // await interaction.followUp('calaboca man, faz favor');
  },
};

export default farido;

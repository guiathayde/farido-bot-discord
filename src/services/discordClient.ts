import { Client, Collection, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

export default client;

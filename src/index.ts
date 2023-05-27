import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';
// import fs from 'node:fs';
// import path from 'node:path';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.TOKEN);

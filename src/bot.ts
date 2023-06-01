import { Client, GatewayIntentBits, Events } from "discord.js";
import config from "./config";
import * as commandModules from "./commands"

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits

const commands = Object(commandModules)

export const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    const { commandName } = interaction;
    
    try {
        await commands[commandName].execute(interaction, client);
    } catch (err) {
        console.error(err);
    }
})

client.login(config.TOKEN)
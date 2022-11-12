const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const chalk = require("chalk");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const fs = require('fs');
const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit

const Meme = require("memer-api");

client.memer = new Meme(process.env.MEME_API || config.meme_api);

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;

console.log(chalk.bgMagenta('             ,----------------,              ,---------,\n' +
	'        ,-----------------------,          ,"        ,"|\n' +
	'      ,"                      ,"|        ,"        ,"  |\n' +
	'     +-----------------------+  |      ,"        ,"    |\n' +
	'     |  .-----------------.  |  |     +---------+      |\n' +
	'     |  |                 |  |  |     | -==----\'|      |\n' +
	'     |  |  MEME BOT!      |  |  |     |         |      |\n' +
	'     |  |  Loading        |  |  |/----|`---=    |      |\n' +
	'     |  |  C:\\>_         |  |  |   ,/|==== ooo |      ;\n' +
	'     |  |                 |  |  |  // |(((( [33]|    ,"\n' +
	'     |  `-----------------\'  |," .;\'| |((((     |  ,"\n' +
	'     +-----------------------+  ;;  | |         |,"     -XCALIBUR-\n' +
	'        /_)______________(_/  //\'   | +---------+\n' +
	'   ___________________________/___  `,\n' +
	'  /  oooooooooooooooo  .o.  oooo /,   \\,"-----------\n' +
	' / ==ooooooooooooooo==.o.  ooo= //   ,`\\--{)B     ,"\n' +
	'/_==__==========__==_ooo__ooo=_/\'   /___________,"\n' +
	'`-----------------------------\'\n'))
fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN).then(r => console.log(chalk.bgYellowBright('Bot Is Ready')))

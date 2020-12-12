//if you read this, join my channel (#zneix) and say hi :)
const {ChatClient} = require('dank-twitch-irc');
const chalk = require('chalk');
const fs = require('fs');

const util = require('./util.js');
const config = require('./config.json');

const client = new ChatClient({
    username: config.username,
    password: `oauth:${config.token}`,
});

if (!fs.existsSync('channels.txt')) return util.logTime(`${chalk.red('[ERROR]')} channels.txt doesn't exist!`);
const channels = fs.readFileSync('channels.txt').toString().split('\n').filter(c => c).map(c => c.trim().toLowerCase());
if (!channels.length) return util.logTime(`${chalk.red('[ERROR]')} No channels specified in channels.txt!`);

util.logTime(`${channels.length} channels`);
client.connect();

client.on('USERNOTICE', msg => {
    if (msg.isSubgift() || msg.isAnonSubgift()){
        //you got a sub VisLaud
        if (msg.eventParams.recipientDisplayName.toLowerCase() == config.username.toLowerCase()){
            util.logTime(`${chalk.hex('#F97304')('[SUB RECEIVED]')} ${chalk.red('#' + msg.channelName)} || ${chalk.yellow(msg.displayName || '👻 Anonymous')}`);
        }
        else {
            util.logTime(`${chalk.green('[SUBGIFT]')} || ${chalk.red('#' + msg.channelName)} || ${chalk.yellow(msg.displayName || '👻 Anonymous')} -> ${chalk.magenta(msg.eventParams.recipientDisplayName)}`, 1);
        }
    }
});

client.on('JOIN', context => {
	util.logTime(`${chalk.blueBright('[JOIN]')} ${chalk.whiteBright(context.channelName)}`, 2);
});

client.on('PART', context => {
	util.logTime(`${chalk.blue('[PART]')} ${chalk.white(context.channelName)}`, 2);
});

client.on('ready', async () => {
    util.logTime(`${chalk.green('[CONNECTED]')} || Connected to twitch.`, 0);
    await client.joinAll(channels);
});

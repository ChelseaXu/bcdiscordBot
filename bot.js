const Discord = require('discord.io');

const logger = require('winston');
const auth = require('./auth.json');
const bittrexExchange = require('./exchanges/bittrexExchange');
const binanceExchange = require('./exchanges/binanceExchange');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const subscribedChannels = new Set();
const exchanges = new Set([bittrexExchange, binanceExchange]);

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    for(let exchange of exchanges){
       
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it needs to execute a command
    // for this script it will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'subscribe':
                subscribedChannels.add(channelID);
                bot.sendMessage({ to: channelID, message: 'Subcribed to new market messages.' });
            break;
            default:
                bot.sendMessage({ to: channelID, message: 'Unknown command.' });
        }
    }
});

let alertNewMarkets = function(newMarkets, exchange){
    for(let newMarket of newMarkets){
        for(let channelID of subscribedChannels){
            let newMarketMessage = 'New Market added to ' + exchange.exchangeName + '.\n' + exchange.exchangeMarketUrlPrefix + newMarket;
            bot.sendMessage({ to: channelID, message: newMarketMessage });
        }
    }
}

let checkForNewMarkets = function(){
    for(let exchange of exchanges){
        console.log('test');
        exchange.searchForNewMarkets(alertNewMarkets);
    }
}

let interval = setInterval(checkForNewMarkets, 30000);

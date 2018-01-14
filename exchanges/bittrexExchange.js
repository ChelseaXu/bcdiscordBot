exchangePrototype = require('./exchange');
let bittrexApi = require('node-bittrex-api');

let bittrexExchange = Object.create(exchangePrototype);

bittrexExchange.exchangeName = 'Bittrex';
bittrexExchange.exchangeMarketUrlPrefix = 'https://bittrex.com/Market/Index?MarketName=';

bittrexExchange.searchForNewMarkets = function(callback) {
    bittrexExchange.getMarkets(function(updatedMarkets){
        exchangePrototype.searchForNewMarkets(updatedMarkets, bittrexExchange, callback);
    });
};

bittrexExchange.getMarkets = function(callback) {
   
    bittrexApi.getmarketsummaries( function(data, err) {
        if (err) {
            return console.error(err);
        }
        
        let markets = new Set();
        for( let i in data.result ) {
            let marketName = data.result[i].MarketName;
            if(marketName.indexOf('BTC') > -1){
                markets.add(marketName);
            }
        }
        callback(markets);
    });
};

bittrexExchange.getMarkets(function(markets){
    bittrexExchange.currentMarkets = markets;
});

module.exports = bittrexExchange;
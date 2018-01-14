exchangePrototype = require('./exchange');

let binanceApi = require('node-binance-api'); 

let binanceExchange = Object.create(exchangePrototype);

binanceExchange.exchangeName = 'Binance';
binanceExchange.exchangeMarketUrlPrefix ='https://www.binance.com/trade.html?symbol='; 

binanceExchange.searchForNewMarkets = function(callback){
	binanceExchange.getMarkets(function(updatedMarkets){
		exchangePrototype.searchForNewMarkets(updatedMarkets, binanceExchange, callback);
	});
};

binanceExchange.getMarkets = function(callback) {

	binanceApi.bookTickers(function(ticker){
		
		let markets = new Set(); 

		let marketUnparsed = Object.keys(ticker); 

		for(let i in marketUnparsed){


			if(marketUnparsed[i].endsWith('BTC')){
				let containsBTC = marketUnparsed[i]; 
				let notBTC = containsBTC.substring(0, containsBTC.indexOf('BTC') - 1);

				let properMarket = notBTC + '_' + 'BTC';
				markets.add(properMarket);
			}
		}
		callback(markets); 
		

	}); 
};

binanceExchange.getMarkets(function(markets){
	binanceExchange.currentMarkets = markets; 

}); 

module.exports = binanceExchange; 
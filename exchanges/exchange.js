var exchangePrototype = {

  exchangeName: 'Exchange Name',
  
  exchangeMarketUrlPrefix: 'Market Prefix',
  
  currentMarkets: 'Current Markets Set',
  
  searchForNewMarkets: function(markets, exchange, callback) {
      let newMarkets = new Set();
      markets.add('BTC-FAKE');
      for (let market of markets){
          if(!exchange.currentMarkets.has(market)){
              newMarkets.add(market);
              exchange.currentMarkets.add(market);
          }
      }
      callback(newMarkets, exchange);
  }
  
};

module.exports = exchangePrototype;
const request = require('request')
const webSocket = require('ws');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var EthUsdPrice = 200.0

function getMMMP() {

	// Get ETH price from CoinMarketCap
	request('https://api.coinmarketcap.com/v1/ticker/ethereum/', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log('body:', body); // Print the JSON
		EthUsdPrice = JSON.parse(body)[0].price_usd;
	});
	
	// Get MZI prices from EtherDelta
	//https://api.etherdelta.com/orders/0xfd0df7b58bd53d1dd4835ecd69a703b4b26f7816/0
	//https://socket.etherdelta.com
	
	//const ws = new webSocket('https://socket.etherdelta.com');
	
	//ws.on('open', function open() {
	//	ws.send('getMarket', { token: '0xfd0df7b58bd53d1dd4835ecd69a703b4b26f7816' });
	//});
	
	/*ws.on('message', function incoming(data) {
		console.log(data);
	});*/
	
	// Calculate mid market price
	
	console.log(EthUsdPrice);
	
	return EthUsdPrice;
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .get('/', function(request, response) {
	  response.sendStatus(getMMMP());
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

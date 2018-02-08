const async = require('async');
const request = require('request')
const webSocket = require('ws');
const express = require('express')
//const wait = require('wait.for');
const path = require('path')
const PORT = process.env.PORT || 5000
//var EthUsdPrice = 0.0

const urls= [
  "https://api.coinmarketcap.com/v1/ticker/ethereum/"//,
  //"http://localhost:3010/alm/development_tool",
  //"http://localhost:3010/alm/project_architecture"
];

function getMMMP() {

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
}



// Handle request call
function handleRequest(req, res){
	async.map(urls, httpGet, function (err, mapRes){
		if (err) {
			return console.log(err);
		}
		// Get values after all requests have returned
		var ethUsdPrice = mapRes[0][0].price_usd;  //JSON.parse(mapRes[0])[0].price_usd;
		
		// WebSocket not working....
		/*console.log('TESTING  HERE ');
		//const ws = new webSocket('https://socket.etherdelta.com');
		const ws = new webSocket('ws://socket.etherdelta.com');
		ws.on('open', function open() {
			ws.send('getMarket', { token: '0xfd0df7b58bd53d1dd4835ecd69a703b4b26f7816' });
		});
		
		ws.on('market', function incoming(data) {
			console.log(data);
		});
		ws.on('error', function (err) {
			console.log(err);
		});*/
		
		
		
		// Log values
		console.log('Eth Variable: ' + ethUsdPrice);
		
		// Calculate mid market price
		
		// Return web response
		var responseJson = {
			ETHUSD_Price: ethUsdPrice,
			MZIUSD_Price: 7
		};
		res.status(200).json(responseJson);
	});
}

// Default handling of each web request from the async map function
function httpGet(url, callback) {
	const options = {
		url :  url,
		json : true
	};
	// Request for http calls
	request(options,
		function(err, res, body) {
			callback(err, body);
		});
	
	// Request for soket calls
}

// Web server default setup
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {
	  handleRequest(req, res);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

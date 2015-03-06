// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var request = require("request");

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8066
var webServer = http.createServer(httpApp).listen(8066);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

easyrtc.setOption('appIceServers', [
	{url: "stun:test1.dehuinet.com"},
	{
	    "url":"turn:test1.dehuinet.com:3478?transport=udp",
	    "username":"user1",
	    "credential":"easy123"
	  },
	  {
	    "url":"turn:test1.dehuinet.com:3478?transport=tcp",
	    "username":"user1",
	    "credential":"easy123"
	  }
]);

/*easyrtc.on("getIceConfig", function(connectionObj, callback) {
    // This object will take in an array of XirSys STUN and TURN servers
    var iceConfig = [];

    request.post('https://api.xirsys.com/getIceServers', {
        form: {
            ident: "bingoli",
            secret: "890fec8e-19ce-44f3-9277-17dabb222f50",
            domain: "rtcdemo",
            application: "default",
            room: "rtcdemo",
            secure: 1
        },
        json: true
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // body.d.iceServers is where the array of ICE servers lives
            iceConfig = body.d.iceServers;
            console.log(iceConfig);
            callback(null, iceConfig);
        } else {
       		console.info('请求turn数据失败', body);
        }
    });
});*/

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);

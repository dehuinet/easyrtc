// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

easyrtc.setOption('appIceServers', [
	{url: "stun:stun.l.google.com:19302"},
    {url: "stun:stun.sipgate.net"},
    {url: "stun:217.10.68.152"},
    {url: "stun:stun.sipgate.net:10000"},
    {url: "stun:217.10.68.152:10000"},
    /*{
		'url': 'turn:numb.viagenie.ca:3478',
		'credential': '86052623',
		'username': 'skar9363@163.com'
	}*/
	{
	    "url":"turn:turn.anyfirewall.com:3478?transport=udp",
	    "username":"1421510621:KellyApp",
	    "credential":"a2w1Z2kwZ2Y"
	  },
	  {
	    "url":"turn:turn.anyfirewall.com:443?transport=tcp",
	    "username":"1421510621:KellyApp",
	    "credential":"a2w1Z2kwZ2Y"
	  }
]);

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);

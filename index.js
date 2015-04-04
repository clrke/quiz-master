var http = require('http'),
	fs = require('fs'),
	url = require('url');

http.createServer(function (request, response) {
	var route = url.parse(request.url);

	function setResponse (contentType, filename) {
		fs.readFile(filename, function readFile (err, contents) {
			if(err) {
				response.writeHead(502, {'Content-Type': 'text/text'});
				response.end('502 Bad gateway');
			} else {
				response.writeHead(200, {'Content-Type': contentType});
				response.end(contents);
			}
		});
	}

	switch(route.path) {
		case '/':
			setResponse('text/html', 'index.html');
			break;
		case '/foundation.css':
			setResponse('text/css', 'foundation/css/foundation.css');
			break;
		case '/main.css':
			setResponse('text/css', 'main.css');
			break;
		case '/animate.css':
			setResponse('text/css', 'animate.css');
			break;
		case '/angular.js':
			setResponse('text/javascript', 'angular.js');
			break;
		case '/quiz.js':
			setResponse('text/javascript', 'js/quiz.js');
			break;
		case '/description.json':
			setResponse('text/json', 'description.json');
			break;
		case '/tick.mp3':
			setResponse('', 'tick.mp3');
			break;
		case '/alarm.mp3':
			setResponse('', 'alarm.mp3');
			break;
		case '/banner.jpg':
			setResponse('', 'img/banner.jpg');
			break;
		default:
			response.writeHead(404, {'Content-Type': 'text/text'});
			response.end('404 page not found');
	}
}).listen(8000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8000/');


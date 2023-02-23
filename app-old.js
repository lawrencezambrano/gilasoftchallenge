const http = require('http');

http.createServer((request, response) => {

    response.writeHead(200, {'Content-Type': 'application/json'});

    const person = {
        id: 1,
        name: 'Lawrence'
    }

    response.write(JSON.stringify(person));
    response.end();
})
.listen(8080);

console.log('Listening on port 8080');
const buffer = require('buffer');
const fs = require('fs');
const http = require('http');

const dataBuffer = fs.readFileSync('./cats for comps.pdf');
const base64Data = dataBuffer.toString('base64');

const jsonString = JSON.stringify({ data: base64Data });
const jsonData = JSON.parse(jsonString);

fs.writeFileSync('test.pdf', buffer.Buffer.from(jsonData.data, 'base64'));

// Create a local server to receive data from
const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    });
    res.end(JSON.stringify({
        data: base64Data
    }));
});

server.listen(8000);
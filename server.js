// define ports
const httpPort = 15752;
const wsPort = 15753;

// init express and path libraries
const express = require('express');
const app = express();
const path = require('path');

// init json parser and tell express to use it
const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

// init websockets and start server on defined port
const ws = require('ws');
const wss = new ws.Server({port: wsPort});

// print port to console
wss.on('listening', () => {
    console.log(`WS listening on port ${wsPort}`);
})

// print ws client info to console
wss.on('connection', (ws, req) => {
    console.log(`websocket connection established: ${req.socket.remoteAddress}`);
    wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({
                name: "",
                message: `Successfully connected to the\nOffical LoveReceipts Server\non port ${wsPort}`
            }))
        }
    })
})

// serve main webpage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// serve ios icon
app.get('/apple-touch-icon.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/apple-touch-icon.png'));
})

// send json data from web form to ws client in stringified json format
app.post("/", (req, res) => {
    wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({
                name: `${req.body.name}`,
                message: `${req.body.message}`
            }));
            console.log("message sent successfully");
        }
    });
    res.redirect("/lovereceipts");
})

// start http server on defined port
app.listen(httpPort, () => {
    console.log(`HTTP listening on port ${httpPort}`);
})

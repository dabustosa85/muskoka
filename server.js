#!/usr/bin/env node

const app = require('./Server/Config/app');
const debug = require('debug');
debug('test-package:server');
const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


const server = http.createServer(app);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const options = process.env.DB_OPTIONS;

const connectionString = `mongodb+srv://${username}:${password}@${host}/${dbName}?${options}`;

const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = 'pipe ' + addr;
    debug('Listening on ' + bind);
}

mongoose.connect(connectionString, clientOptions).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
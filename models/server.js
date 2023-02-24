const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectToDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectToDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', require('../routes/webapp'));
        this.app.use('/api/messages/', require('../routes/messages'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on port: ${this.port}`);
        });
    }
}
module.exports = Server;
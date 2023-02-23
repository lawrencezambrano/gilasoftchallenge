const {Response} = require('express');

const webApp = (req, res = Response) => {
    res.sendFile(__dirname + '/public/index.html');
}

module.exports = {webApp}
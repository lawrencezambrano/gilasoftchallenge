const { response } = require('express');

const messagesGet = (req, res = response) => {
    res.json({
        message: 'GET API Controller'
    });
}

const messagesPost = (req, res = response) => {
    const {category, message} = req.body;
    const displayedMessage = message + " " + category
    res.json({
        category,
        displayedMessage
    });
}

module.exports = {
    messagesGet,
    messagesPost,
}
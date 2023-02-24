const { response } = require('express');
const message = require('../models/message');
const Message = require('../models/message');

const categories = ['World','Politics','Business','Opinion','Science','Sports','Food','Travel'];
const channels = ['SMS','Email','Push'];

const users = [
    {
        id: 1,
        name: 'Damon Baird',
        email: 'dbaird@mail.com',
        phone: '123456789',
        subscribed: ['Sports','Science'],
        channels: ['SMS']
    },
    {
        id: 2,
        name: 'Marcus Phoenix',
        email: 'marcus@mail.com',
        phone: '123456789',
        subscribed: ['Travel','Politics','Business'],
        channels: ['Email','Push']
    },
    {
        id: 3,
        name: 'Samantha Byrne',
        email: 'sam.byrne@mail.com',
        phone: '123456789',
        subscribed: ['Travel','Food','Politics'],
        channels: ['Push']
    },
    {
        id: 4,
        name: 'Anya Stroud',
        email: 'anyastroud1988@mail.com',
        phone: '123456789',
        subscribed: ['Science','Business','Sports'],
        channels: ['SMS','Email']
    },
    {
        id: 5,
        name: 'Clayton Carmine',
        email: 'c.carmine@mail.com',
        phone: '123456789',
        subscribed: ['Opinion','Food','Travel'],
        channels: ['SMS','Email']
    }
];

const messagesGet = (req, res = response) => {
    res.json({
        message: 'GET API Controller'
    });
}

const messagesPost = async(req, res = response) => {
    const {category, messageFromUI} = req.body;
    
    try {
        // Obtain receivers
        let receivers = "";
        receivers = await getReceivers(category);


    } catch (error) {
        receivers = error
    }

    res.json({
        receivers
    });
}

const sendToDB = async(message, receivers) => {
    const message = new Message();
}

const getReceivers = (category) => {
    let receivers = [];
    return new Promise((resolve, reject) => {
        users.forEach(element => {
            if (element.subscribed.includes(category))
                receivers.push(element);
        });
        (receivers.length > 0)
            ? resolve(receivers)
            : reject(`There are no users subscribed to the ${category} category`)
    });
}

module.exports = {
    messagesGet,
    messagesPost,
}
const { response } = require('express');
const Message = require('../models/message');
const messaging = require('./messaging');

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
    const {category, message} = req.body;
    let postResponse;
    try {
        postResponse = await controlMessageFlow(message, category);
        res.json({
            postResponse
        });
    } catch (error) {
        res.json({
            error
        });
    }
}

const controlMessageFlow = async(message, category) => {
    let deliveryData;
    let messageStatus;
    let errorMessage;
    await buildData(category)
        .then(async dataResponse => {
            deliveryData = dataResponse;
            return await messaging.evaluateMessage(message, deliveryData);
        })
        .then(async messagingResponse => {
            messageStatus = messagingResponse;
        })
        .catch(error => {
            errorMessage = error;
        });
    
    if (!errorMessage) {
        deliveryData.deliveryStatus = messageStatus;
        return deliveryData;
    } else {
        return errorMessage;
    }
}

const buildData = async(category) => {
    let deliveryData;
    let receivers;
    let channels;
    let errorMessage;
    await getReceivers(category)
        .then(receiversResponse => {
            receivers = receiversResponse;
            return getChannels(receivers);
        })
        .then(channelsResponse => {
            channels = channelsResponse;
        })
        .catch(error => {
            errorMessage = error;
            console.log(error);
        });
        
    if (!errorMessage) {
        let channelsArray = [];
        channels.forEach(elementArray => {
            elementArray.forEach(element => {
                if (!channelsArray.includes(element)) {
                    channelsArray.push(element);
                }
            });
        });
        
        deliveryData = {"users": receivers, "channels": channelsArray};
        return deliveryData;
    }
    else {
        return errorMessage;
    }
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

const getChannels = (receivers) => {
    let channels = [];
    return new Promise((resolve, reject) => {
        receivers.forEach(element => {
            channels.push(element.channels);
        });
        (channels.length > 0)
            ? resolve(channels)
            : reject(`There are no channels to deliver the message`)
    });
}

module.exports = {
    messagesGet,
    messagesPost,
}
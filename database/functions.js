const Message = require('../models/message');

const saveToDB = (objectToSave) => {
    try {
        objectToSave.logs.forEach(element => {
            console.log(element);
            const message = new Message(element);
            message.save();
            return message;
        });
    } catch (error) {
        return error;
    }
}

const getLogs = async() => {
    try {
        const messages = await Message.find();
        console.log(messages);
        return messages;
    } catch (error) {
        return error;
    }
}

module.exports = {
    saveToDB,
    getLogs
}
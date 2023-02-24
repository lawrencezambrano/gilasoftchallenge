
const evaluateMessage = async(message, deliveryData) => {
    const channels = deliveryData.channels;
    let deliveryResponse = "OK";

    try {
        channels.forEach(async element => {
            if (element === 'SMS')
                await deliverSMSMessage(message);
            if (element === 'Email')
                await deliverEmailMessage(message);
            if (element === 'Push')
                await deliverPushMessage(message);
        });
    } catch (error) {
        deliveryResponse = error;
    }
    return deliveryResponse;
}

const deliverSMSMessage = (message) => {
    console.log('Sending SMS...');
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log('SMS Sent'));
        }, 10000);
    });
}

const deliverEmailMessage = (message) => {
    console.log('Sending Email...');
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log('Email Sent'));
        }, 3000);
    });
}

const deliverPushMessage = (message) => {
    console.log('Sending Push Notification...');
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log('Push Notification Sent'));
        }, 5000);
    });
}

module.exports = {
    evaluateMessage
}
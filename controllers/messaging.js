const buildLogData = (message, deliveryData) => {
    let logDataToSave = {};
    let usersArray = [];
    let deliveryResponse = "OK";
    try {
        deliveryData.users.forEach(userElement => {
            let tempData = {};
            tempData.message = message;
            tempData.name = userElement.name;
            tempData.email = userElement.email;
            tempData.phoneNumber = userElement.phone;
            tempData.subscribed = userElement.subscribed;
            tempData.channels = userElement.channels;
            deliveryResponse = evaluateDeliveryChannels(message, tempData.channels);
            tempData.deliveryStatus = deliveryResponse;
            usersArray.push(tempData);
        });
        logDataToSave.logs = usersArray;
    } catch (error) {
        deliveryResponse = error;
        logDataToSave.deliveryStatus = error;
    }
    return logDataToSave;
}

const evaluateDeliveryChannels = (message, channels) => {
    let deliverMessageResponse = [];
    channels.forEach(element => {
        if (element === 'SMS') {
            return new Promise((resolve, reject) => {
                let smsSendingResponse = sendSMSMessage(message);
                if (smsSendingResponse === 'SMS Sent') {
                    resolve('OK');
                } else {
                    reject(smsSendingResponse);
                }
                deliverMessageResponse.push(smsSendingResponse);
            });
        }

        if (element === 'Email') {
            return new Promise((resolve, reject) => {
                let emailSendingResponse = sendEmailMessage(message);
                if (emailSendingResponse === 'Email Sent') {
                    resolve('OK');
                } else {
                    reject(emailSendingResponse);
                }
                deliverMessageResponse.push(emailSendingResponse);
            });
        }
            
        if (element === 'Push') {
            return new Promise((resolve, reject) => {
                let pushNotificationSendingResponse = sendPushMessage(message);
                if (pushNotificationSendingResponse === 'Push Notification Sent') {
                    resolve('OK');
                } else {
                    reject(pushNotificationSendingResponse);
                }
                deliverMessageResponse.push(pushNotificationSendingResponse);
            });
        }
    });
    return deliverMessageResponse;
}

const sendSMSMessage = (message) => {
    console.log('Sending SMS...');
    return 'SMS Sent';
    /*try {
        setTimeout(() => {
            console.log('SMS Sent');
            return 'SMS Sent'
          }, 10000);        
    } catch (error) {
        return error;
    }*/
}

const sendEmailMessage = (message) => {
    console.log('Sending Email...');
    return 'Email Sent'
    /*try {
        setTimeout(() => {
            console.log('Email Sent');
            return 'Email Sent'
          }, 3000);        
    } catch (error) {
        return error;
    }*/
}

const sendPushMessage = (message) => {
    console.log('Sending Push Notification...');
    return 'Push Notification Sent'
    /*try {
        setTimeout(() => {
            console.log('Push Notification Sent');
            return 'Push Notification Sent'
          }, 5000);
    } catch (error) {
        return error;
    }*/
}

module.exports = {
    buildLogData
}
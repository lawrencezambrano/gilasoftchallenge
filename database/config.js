const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DBConnectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('DB Connection Successfull');
    }
    catch (error) {
        throw new Error('Error while connecting to DB: ' + error);
    }
}

module.exports = {
    dbConnection
}
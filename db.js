const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            tls: false,
            tlsAllowInvalidCertificates: true,
        }),
            console.log('MongoDB started')
    } catch (err) {
        console.error(err);
    }
}

const disconnectDB = async () => {

    await mongoose.connection.close()
    console.log('MongoDB connection closed!')

}

module.exports = { connectDB, disconnectDB }
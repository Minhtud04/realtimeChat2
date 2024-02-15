require('dotenv').config();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Failed to connect to MongoDB', err);
});

let cache = global.mongoose;            //check if mongoose is already connected
if (!cache) {
    cache = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        const opts = {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,

            bufferCommands: false, // Disable mongoose buffering
            socketTimeoutMS: 0, // Close sockets after 30 seconds of inactivity
        };

        try {
            cache.promise = mongoose.connect(MONGODB_URI, opts);
        } catch (e) {
            console.error('Failed to connect to MongoDB', e);
        }
    }
    cache.conn = await cache.promise;
    return cache.conn;
}

module.exports = dbConnect;
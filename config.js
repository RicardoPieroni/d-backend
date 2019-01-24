import dotenv from 'dotenv-safe';
dotenv.load();

const config = {
    mongo: {
        uri: process.env.MONGOOSE_URI,
        options: {
            useMongoClient: true,
        },
    },
    express:{
        accessControlUrl: process.env.ACCESS_CONTROL_URL,
        accessControlHeaders: process.env.ACCESS_CONTROL_HEADERS,
    },
}

module.exports = config;
export default module.exports;
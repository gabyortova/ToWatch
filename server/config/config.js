const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: 'mongodb://localhost:27017/to-watch',
        origin: ['http://localhost:5555', 'http://localhost:4200', 'http://localhost:50243']
    },
    production: {
        port: process.env.PORT || 5000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];

require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    // DB_USER 
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASS,
    // AUTH
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    //API KEYS
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKey: process.env.ADMIN_API_KEY_TOKEN
}

module.exports = { config }
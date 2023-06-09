import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    environment: process.env.ENVIRONMENT || 'DEV',
    mongoUrl: process.env.MONGO_URL,
    persistence: 'MONGO',
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    frontendUrlCors: process.env.FRONTEND_URL_CORS,
    mailingUser: process.env.MAILING_USER,
    mailingPass: process.env.MAILING_PASS
}
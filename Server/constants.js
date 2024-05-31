require('dotenv').config();

module.exports = Object.freeze({
    FRONTEND_IP: process.env.FRONTEND_IP || 'http://localhost:3000',
    CLIENT_ID: process.env.CLIENT_ID || '78i4d1l8ouatghoueh5ja0h16l',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '1phuin4coqn4djiv14erd26gcbd18pl3224r01hh3tafji0ne4u1',
    REDIRECT_LOGIN_URL: process.env.REDIRECT_LOGIN_URL || 'http://localhost:3000',
    TOKEN_URL: process.env.TOKEN_URL || 'https://pwr.auth.us-east-1.amazoncognito.com/oauth2/token',
    JWKS_URI: process.env.JWKS_URI || 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sZOCd9c53/.well-known/jwks.json',
    EXPECTED_ISSUER: process.env.EXPECTED_ISSUER || 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sZOCd9c53',

    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '<empty>',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '<empty>',
    sessionToken: process.env.AWS_SESSION_TOKEN || '<empty>',
    region: process.env.AWS_REGION || 'us-east-1'
});

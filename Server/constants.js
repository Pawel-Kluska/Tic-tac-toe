require('dotenv').config();

module.exports = Object.freeze({
    FRONTEND_IP: process.env.IP_ADDRESS || 'http://localhost:3000',
    CLIENT_ID: process.env.CLIENT_ID || '78i4d1l8ouatghoueh5ja0h16l',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '1phuin4coqn4djiv14erd26gcbd18pl3224r01hh3tafji0ne4u1',
    TOKEN_URL: process.env.TOKEN_URL || 'https://pwr.auth.us-east-1.amazoncognito.com/oauth2/token',
    JWKS_URI: process.env.JWKS_URI || 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sZOCd9c53/.well-known/jwks.json',
    EXPECTED_ISSUER: process.env.EXPECTED_ISSUER || 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sZOCd9c53',

    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ASIATCKAPGEX3AAJZWME',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'Jfnj59TRA7AvB6c3P+mLLdxTD+OlQ7nufWGW15D8',
    sessionToken: process.env.AWS_SESSION_TOKEN || 'IQoJb3JpZ2luX2VjENT//////////wEaCXVzLXdlc3QtMiJGMEQCIDE0eD9Y7ya7Qe0znfFjUeDH6wo5BXm/o5s1YVnUmA85AiBS/YbsqS+R3hEgK1+iZu7ZUsc0k9i2iPW1RKMoYwHDDCqnAghdEAAaDDIxMTEyNTQ4MTc3NSIMzvn0Tvoq3NZnmL3tKoQCt2okjYIOHUu8rrX0OJ3b4iJ8AUZPEnPs3oDWFCqS15EbID8JcxzzpQHx9BctMKs1ZhcSIuGmpCa3iPG296khm9XE+tSSUwAcq65FpVH+Ug5d52zc2Fo7833U7OqpbkbgzfR+EQTRkZqJ6Gvwvvv6xMu7RRG+ZU8/qxbRJ4wESQav0OQKEungq7VUNr6Di958AEsQ10eieOebbTWowQ9Y6Socm11Xp84f+qLrQdUfLI6mmqV3rPOU3rJnjELFGG7NymVy9Gx6yZuGfDojStnEfAg1RiCncRjeEMe57sHoq41LGRb1GTo8dVQHINa9AtBWpSofAMLttLYJxu2ONHwVLGDQemgwt57ssgY6ngG8H2Yf3s/Uth/dkjFn2AN9ZGGtc46riL6GoXYYNWqEkmTCGK9ORKWNFCJ2TVVd03z1JPEdHWRKEYCsmLF+IegM+4v4rCgbjE5OkyN/v5ZpdT7Ji1j7SmV5MIfEruvXzqCf1haLEEgeehxDUpCk9xxH9ceV/TsSCaQ3AKSVf4X489vlZIvDtH+qEk2bo7t7PHkkwy47BV/nBc0qLRXeEQ==',
    region: process.env.AWS_REGION || 'us-east-1'
});

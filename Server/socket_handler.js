const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const util = require('util');
const constants = require('./constants'); // Adjust the path as needed

const client = jwksClient({
    jwksUri: constants.JWKS_URI
});

const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

const socketHandler = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return res.status(403).send('Token is required');
        }

        const decodedToken = jwt.decode(token, { complete: true });
        const kid = decodedToken.header.kid;

        const key = await util.promisify(getKey)({ kid });

        const verifiedToken = jwt.verify(token, key, {
            algorithms: ['RS256'],
        });

        // Optionally, you can check the claims
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (verifiedToken.exp < currentTimestamp) {
            return res.status(403).send('Token has expired');
        }

        const expectedAudience = constants.CLIENT_ID;
        const expectedIssuer = constants.EXPECTED_ISSUER;

        if (verifiedToken.client_id !== expectedAudience) {
            return res.status(403).send('Token audience mismatch');
        }

        if (verifiedToken.iss !== expectedIssuer) {
            return res.status(403).send('Token issuer mismatch');
        }

        next();
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(403).send("Invalid error");
    }
};

module.exports = socketHandler;
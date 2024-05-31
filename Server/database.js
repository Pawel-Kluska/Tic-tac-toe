const { v4: generateId } = require('uuid');
const dynamodb = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');

const {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    ScanCommand,
    QueryCommand,
} = require('@aws-sdk/lib-dynamodb');
const {region, accessKeyId, secretAccessKey, sessionToken} = require("./constants");

const client = new dynamodb.DynamoDBClient({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken
    },
});
const ddbDocClient = new DynamoDBDocumentClient(client);

function addNewGame(player1, player2, winner) {
    const cmd = new PutCommand({
        Item: {
            id: uuidv4(),
            player1: player1,
            player2: player2,
            winner: winner,
        },
        TableName: 'games',
    });
    return ddbDocClient.send(cmd);
}
function getAllGames() {
    const cmd = new ScanCommand({
        TableName: 'games',
    });
    return ddbDocClient.send(cmd);
}

module.exports = {
    ddbDocClient,
    addNewGame,
    getAllGames,
};
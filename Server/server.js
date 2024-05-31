const express = require('express');
const http = require('http');
const cors = require('cors');

const {Server} = require('socket.io');
const axios = require('axios');
const bodyParser = require('body-parser');
const constants = require("./constants");
const qs = require('qs'); // to format the query string


const app = express();
const router = express.Router();

const corsOptions = {
    origin: "http://" + constants.FRONTEND_IP,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://" + constants.FRONTEND_IP,
    },
});

const auth_handler = require("./auth_handler");
const {getAllGames, addNewGame} = require("./database");
const socketHandler = require("./socket_handler");

router.use('/auth', auth_handler);
app.use('/', router);

app.post('/login', async (req, res) => {
    const code = req.body.code;
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', constants.CLIENT_ID);
    params.append('code', code);
    params.append('redirect_uri', 'https://' + constants.FRONTEND_IP);

    const encodedCredentials = Buffer.from(`${constants.CLIENT_ID}:${constants.CLIENT_SECRET}`).toString('base64');

    try {
        const response = await axios.post(constants.TOKEN_URL, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        });

        const {access_token, refresh_token, id_token} = response.data;
        res.json({access_token, refresh_token, id_token});
    } catch (error) {
        console.error('Error fetching tokens from Cognito:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/refresh-token', async (req, res) => {
    const { refresh_token } = req.body;

    const basicAuth = Buffer.from(`${constants.CLIENT_ID}:${constants.CLIENT_SECRET}`).toString('base64');

    const data = qs.stringify({
        grant_type: 'refresh_token',
        client_id: constants.CLIENT_ID,
        refresh_token: refresh_token
    });

    const config = {
        method: 'post',
        url: constants.TOKEN_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`
        },
        data: data
    };

    try {
        const response = await axios(config);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

app.get('/auth/get-user', async (req, res) => {
    const accessToken = req.get("Authorization");

    if (!accessToken) {
        return res.status(400).json({ error: 'AccessToken is required' });
    }

    const region = constants.region; // Replace with your AWS region
    const url = `https://cognito-idp.${region}.amazonaws.com/`;
    const headers = {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
    };
    const body = {
        AccessToken: accessToken
    };

    try {
        const response = await axios.post(url, body, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Cognito:', error);
        res.status(error.response ? error.response.status : 500).json({
            error: error.response ? error.response.data : 'Internal Server Error'
        });
    }
});

app.get('/auth/ranking', (req, res) => {
    getAllGames()
        .then(r => {
            res.json(r.Items)
            res.status(200);
            res.send();
        })
        .catch(err => {
            res.status(400);
            res.send();
        })

});

app.post('/auth/ranking', async (req, res) => {
    const body = req.body;
    addNewGame(body.player1, body.player2, body.winner)
        .then(() => {
            res.status(200);
            res.send();
        })
        .catch(() => {
            res.status(400);
            res.send();
        })

});


const allUsers = {};
const allRooms = [];

io.use(socketHandler);

io.on("connection", (socket) => {
    allUsers[socket.id] = {
        socket: socket,
        online: true,
    };

    socket.on("request_to_play", (data) => {
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName;

        let opponentPlayer;

        for (const key in allUsers) {
            const user = allUsers[key];
            if (user.online && !user.playing && socket.id !== key) {
                opponentPlayer = user;
                break;
            }
        }

        if (opponentPlayer) {
            opponentPlayer.playing = true;
            currentUser.playing = true;
            allRooms.push({
                player1: opponentPlayer,
                player2: currentUser,
            });

            currentUser.socket.emit("OpponentFound", {
                opponentName: opponentPlayer.playerName,
                playingAs: "circle",
            });

            opponentPlayer.socket.emit("OpponentFound", {
                opponentName: currentUser.playerName,
                playingAs: "cross",
            });

            currentUser.socket.on("playerMoveFromClient", (data) => {
                opponentPlayer.socket.emit("playerMoveFromServer", {
                    ...data,
                });
            });

            opponentPlayer.socket.on("playerMoveFromClient", (data) => {
                currentUser.socket.emit("playerMoveFromServer", {
                    ...data,
                });
            });
        } else {
            currentUser.socket.emit("OpponentNotFound");
        }
    });

    socket.on("disconnect", function () {
        const currentUser = allUsers[socket.id];
        currentUser.online = false;
        currentUser.playing = false;

        for (let index = 0; index < allRooms.length; index++) {
            const {player1, player2} = allRooms[index];

            if (player1.socket.id === socket.id) {
                player2.socket.emit("opponentLeftMatch");
                break;
            }

            if (player2.socket.id === socket.id) {
                player1.socket.emit("opponentLeftMatch");
                break;
            }
        }
    });
});


httpServer.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});



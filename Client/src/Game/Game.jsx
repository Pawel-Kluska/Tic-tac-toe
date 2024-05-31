import React, {useEffect, useState} from "react";
import "./Game.css";
import Square from "../Square/Square.jsx";
import {io} from "socket.io-client";
import {API_BASE_URL} from "../constants/index.js";
import axiosHttp from "../axios.jsx";

const renderFrom = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

const Game = () => {
    const [gameState, setGameState] = useState(renderFrom);
    const [currentPlayer, setCurrentPlayer] = useState("circle");
    const [finishedState, setFinishetState] = useState(false);
    const [finishedArrayState, setFinishedArrayState] = useState([]);
    const [playOnline, setPlayOnline] = useState(false);
    const [socket, setSocket] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [opponentName, setOpponentName] = useState(null);
    const [playingAs, setPlayingAs] = useState(null);

    const getUserInfo = async () => {
        try {
            const response = await axiosHttp.get("/auth/get-user")
            return response.data;
        } catch (error) {
            if (error.response.status === 401 && error.response.data === 'Token expired') {

                const response = await axiosHttp.post("/refresh-token", {
                    refresh_token: localStorage.getItem("refresh_token")
                })
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("id_token", response.data.id_token);
                const response2 = await axiosHttp.get("/auth/get-user")
                return response2.data;
            }
        }
    };

    const saveResultInDatabase = async () => {

        const body = {
            player1: playerName,
            player2: opponentName,
            winner: playerName
        }

        try {
            const response = await axiosHttp.post("/auth/ranking", body)
            return response.data;

        } catch (error) {
            if (error.response.status === 401 && error.response.data === 'Token expired') {

                const response = await axiosHttp.post("/refresh-token", {
                    refresh_token: localStorage.getItem("refresh_token")
                })
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("id_token", response.data.id_token);
                const response2 = await axiosHttp.post("/auth/ranking", body)
                return response2.data;
            }
        }
    }

    const checkWinner = () => {
        // row dynamic
        for (let row = 0; row < gameState.length; row++) {
            if (
                gameState[row][0] === gameState[row][1] &&
                gameState[row][1] === gameState[row][2]
            ) {
                setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
                return gameState[row][0];
            }
        }

        // column dynamic
        for (let col = 0; col < gameState.length; col++) {
            if (
                gameState[0][col] === gameState[1][col] &&
                gameState[1][col] === gameState[2][col]
            ) {
                setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
                return gameState[0][col];
            }
        }

        if (
            gameState[0][0] === gameState[1][1] &&
            gameState[1][1] === gameState[2][2]
        ) {
            return gameState[0][0];
        }

        if (
            gameState[0][2] === gameState[1][1] &&
            gameState[1][1] === gameState[2][0]
        ) {
            return gameState[0][2];
        }

        const isDrawMatch = gameState.flat().every((e) => {
            if (e === "circle" || e === "cross") return true;
        });

        if (isDrawMatch) return "draw";

        return null;
    };

    useEffect(() => {
        getUserInfo().then(r => {
            const username = r.Username;
            setPlayerName(username);

            const newSocket = io(API_BASE_URL, {
                autoConnect: true,
                auth: {
                    token: localStorage.getItem('access_token'), // or any other method to get the token
                }
            });

            newSocket?.emit("request_to_play", {
                playerName: username,
            });

            setSocket(newSocket);
        });
    }, []);

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            console.log(winner)
            console.log(playingAs)
            setFinishetState(winner);
            if (winner === playingAs) {
                saveResultInDatabase().then(r => console.log(r));

            }
        }
    }, [gameState]);


    socket?.on("opponentLeftMatch", () => {
        setFinishetState("opponentLeftMatch");
    });

    socket?.on("playerMoveFromServer", (data) => {
        const id = data.state.id;
        setGameState((prevState) => {
            let newState = [...prevState];
            const rowIndex = Math.floor(id / 3);
            const colIndex = id % 3;
            newState[rowIndex][colIndex] = data.state.sign;
            return newState;
        });
        setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
    });

    socket?.on("connect", function () {
        setPlayOnline(true);
    });

    socket?.on("OpponentNotFound", function () {
        setOpponentName(false);
    });

    socket?.on("OpponentFound", function (data) {
        setPlayingAs(data.playingAs);
        setOpponentName(data.opponentName);
    });

    if (!playOnline) {
        return (
            <div>
            </div>
        );
    }

    if (playOnline && !opponentName) {
        return (
            <div className="waiting">
                <p>Waiting for opponent</p>
            </div>
        );
    }

    return (
        <div className="main-div">
            <div className="move-detection">
                <div
                    className={`left ${
                        currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
                    }`}
                >
                    {playerName}
                </div>
                <div
                    className={`right ${
                        currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
                    }`}
                >
                    {opponentName}
                </div>
            </div>
            <div>
                <h1 className="game-heading water-background">Tic Tac Toe</h1>
                <div className="square-wrapper">
                    {gameState.map((arr, rowIndex) =>
                        arr.map((e, colIndex) => {
                            return (
                                <Square
                                    socket={socket}
                                    playingAs={playingAs}
                                    gameState={gameState}
                                    finishedArrayState={finishedArrayState}
                                    finishedState={finishedState}
                                    currentPlayer={currentPlayer}
                                    setCurrentPlayer={setCurrentPlayer}
                                    setGameState={setGameState}
                                    id={rowIndex * 3 + colIndex}
                                    key={rowIndex * 3 + colIndex}
                                    currentElement={e}
                                />
                            );
                        })
                    )}
                </div>
                {finishedState &&
                    finishedState !== "opponentLeftMatch" &&
                    finishedState !== "draw" && (
                        <h3 className="finished-state">
                            {finishedState === playingAs ? "You " : finishedState} won the
                            game
                        </h3>
                    )}
                {finishedState &&
                    finishedState !== "opponentLeftMatch" &&
                    finishedState === "draw" && (
                        <h3 className="finished-state">It's a Draw</h3>
                    )}
            </div>
            {!finishedState && opponentName && (
                <h2>You are playing against {opponentName}</h2>
            )}
            {finishedState && finishedState === "opponentLeftMatch" && (
                <h2>You won the match, Opponent has left</h2>
            )}
            <a className="button" href={'/'}>Back to menu</a>
        </div>
    );
};

export default Game;

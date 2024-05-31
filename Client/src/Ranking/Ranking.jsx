import "./Ranking.css";
import React, {useEffect, useState} from "react";
import axiosHttp from "../axios.jsx";


const Ranking = () => {
    const [gameList, setGameList] = useState([]);

    const getRanking = async () => {
        try {
            const response = await axiosHttp.get("/auth/ranking")
            return response.data;
        } catch (error) {
            if (error.response.status === 401 && error.response.data === 'Token expired') {
                const response = await axiosHttp.post("/refresh-token", {
                    refresh_token: localStorage.getItem("refresh_token")
                })
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("id_token", response.data.id_token);
                const response2 = await axiosHttp.get("/auth/ranking")
                return response2.data;
            }
        }
    }

    useEffect(() => {
        getRanking().then(r => {
            setGameList(r);
        });
    }, []);

    return (
        <div className="main-div">
            <h1 className="title">Games history</h1>
            <table>
                <thead>
                <tr>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Winner</th>
                </tr>
                </thead>
                <tbody>
                {gameList.map((match, index) => (
                    <tr key={index}>
                        <td>{match.player1}</td>
                        <td>{match.player2}</td>
                        <td>{match.winner}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a className="button" href={'/'}>Back to menu</a>
        </div>
    );
}

export default Ranking;


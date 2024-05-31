const TitleScreen = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
        <div className="main-div">
            <h1>Tic tac toe</h1>
            <p>To play, please log in first</p>
        </div>
        );
    }
    else {
        return (
            <div className="main-div">
                <h1>Tic tac toe</h1>
                <a className="playOnline" href={'/game'}>Play game</a>
            </div>
        );
    }

}

export default TitleScreen;

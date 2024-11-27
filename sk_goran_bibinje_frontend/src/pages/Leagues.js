import Navigation from "../components/Navigation";
import classes from "./Leagues.module.css";
import Player from "../components/Player";
import { useState, useEffect } from "react";

const Leagues = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const [leagues, setLeagues] = useState([]);
  const [players, setPlayers] = useState([]);

  const urlGetLeagues = "http://localhost:8080/league/all";
  const optionsGetLeagues = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const urlGetPlayers = "http://localhost:8080/player/all";
  const optionsGetPlayers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getPlayers = async () => {
    const response = await fetch(urlGetPlayers, optionsGetPlayers);
    if (!response.ok) {
      setPlayers([]);
    } else {
      const data = await response.json();
      data.sort((a, b) => b.rating - a.rating);
      setPlayers(data);
    }
  };

  const getLeagues = async () => {
    const response = await fetch(urlGetLeagues, optionsGetLeagues);
    if (!response.ok) {
      setLeagues([]);
    } else {
      const data = await response.json();
      setLeagues(data);
    }
  };

  useEffect(() => {
    getLeagues();
    getPlayers();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      {leagues.map((league) => {
        return (
          <div>
            <div className={classes.section1}>
              <div className={classes.text1}>
                <h2>{league.name}</h2>
                <p>{league.leagueText}</p>
                <a href={league.resultsUrl} target="_blank">
                  Poredak i rezultati
                </a>
                {league.gamesUrl !== null && (
                  <a href={league.gamesUrl} target="_blank">
                    Prijenos partija
                  </a>
                )}
              </div>
              <div className={classes.image1}>
                <img
                  src={league.leagueImage}
                  alt="Team"
                  className={classes.image1}
                ></img>
              </div>
            </div>
            <div className={classes.playerSection}>
              <h2>Igrači - {league.name}</h2>
              <div className={classes.players}>
                {players.map((player) => {
                  if (player.team === league.id || player.team === 0) {
                    return <Player data={player} />;
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Leagues;

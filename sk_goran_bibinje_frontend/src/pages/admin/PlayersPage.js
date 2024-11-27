import { useState, useEffect } from "react";
import classes from "./PlayersPage.module.css";
import Navigation from "../../components/Navigation";
import PlayerEdit from "../../components/PlayerEdit";
import { useNavigate } from "react-router-dom";

const PlayersPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [players, setPlayers] = useState([]);

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

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    } else {
      getPlayers();
    }
  }, [refresh]);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h2>Igrači</h2>
      <button
        className={classes.btnNew}
        onClick={() => {
          navigate("/admin/managePlayers/new");
        }}
      >
        Dodaj igrača
      </button>
      <div className={classes.players}>
        {players.map((player) => {
          return <PlayerEdit refresh={refreshPage} data={player} />;
        })}
      </div>
    </div>
  );
};

export default PlayersPage;

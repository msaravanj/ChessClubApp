import classes from "../Home.module.css";
import Navigation from "../../components/Navigation";
import { useState, useEffect } from "react";
import LeagueEdit from "./LeagueEdit";
import { useNavigate } from "react-router-dom";

const LeaguesManagement = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [leagues, setLeagues] = useState([]);

  const urlGetLeagues = "http://localhost:8080/league/all";
  const optionsGetLeagues = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    }
    getLeagues();
  }, [refresh]);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h2>Lige</h2>
      <button
        className={classes.btnNew}
        onClick={() => {
          navigate("/admin/manageLeagues/new");
        }}
      >
        Dodaj novu ligu
      </button>
      <div className={classes.articles}>
        {leagues.map((league) => {
          return <LeagueEdit refresh={refreshPage} data={league} />;
        })}
      </div>
    </div>
  );
};

export default LeaguesManagement;

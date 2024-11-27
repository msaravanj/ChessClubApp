import classes from "./LeagueEdit.module.css";
import { NavLink } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

const LeagueEdit = (props) => {
  const link = `/admin/manageLeagues/${props.data.id}`;

  return (
    <div className={classes.league}>
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>{props.data.name}</h2>
          <p>{props.data.leagueText}</p>
          <a href={props.data.resultsUrl} target="_blank">
            Poredak i rezultati
          </a>
          {props.data.gamesUrl !== null && (
            <a href={props.data.gamesUrl} target="_blank">
              Prijenos partija
            </a>
          )}
        </div>
        <div className={classes.image1}>
          <img
            src={props.data.leagueImage}
            alt="Team"
            className={classes.image1}
          ></img>
        </div>

        <div className={classes.btns}>
          <NavLink to={link}>Uredi</NavLink>
          <button
            className={classes.btn}
            onClick={async () => {
              const isConfirmed = window.confirm(
                "Sigurno želiš izbrisati sadržaj?"
              );
              if (isConfirmed) {
                try {
                  const response = await fetch(
                    `http://localhost:8080/league/delete/${props.data.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                      },
                    }
                  );
                  if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                  }
                  console.log("League deleted successfully");
                  props.refresh();
                } catch (error) {
                  console.error("Failed to delete league: ", error);
                }
              }
            }}
          >
            Izbriši
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeagueEdit;

import classes from "./Player.module.css";
import { NavLink } from "react-router-dom";
import { getAuthToken } from "../util/Auth";
import blankPhoto from "../assets/blank_profile.jpg";

const PlayerEdit = (props) => {
  let imgPath = props.data.photo;
  const link = `/admin/managePlayers/${props.data.id}`;

  return (
    <div className={classes.cardEdit}>
      {imgPath === null ? (
        <img src={blankPhoto} alt="Player's photo"></img>
      ) : (
        <img src={imgPath} alt="Player's photo"></img>
      )}

      <h4>{props.data.name}</h4>
      <p>{props.data.title}</p>
      <p>Rejting: {props.data.rating}</p>
      <p>
        Liga: {props.data.pointsScored}/{props.data.gamesPlayed}
      </p>
      <a href={props.data.fideUrl} target="_blank">
        FIDE PROFIL
      </a>
      <div className={classes.btns}>
        <NavLink to={link}>Uredi</NavLink>
        <button
          className={classes.btn}
          onClick={async () => {
            const isConfirmed = window.confirm(
              "Sigurno želiš izbrisati igrača?"
            );
            if (isConfirmed) {
              try {
                const response = await fetch(
                  `http://localhost:8080/player/delete/${props.data.id}`,
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

                console.log("Article deleted successfully");
                props.refresh();
              } catch (error) {
                console.error("Failed to delete article:", error);
              }
            }
          }}
        >
          Izbriši
        </button>
      </div>
    </div>
  );
};

export default PlayerEdit;

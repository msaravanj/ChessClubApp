import classes from "./Player.module.css";

const Player = (props) => {
  let imgPath = props.data.photo;

  return (
    <div className={classes.card}>
      {imgPath === null ? (
        <img src="blank_profile.jpg" alt="Player's photo"></img>
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
    </div>
  );
};

export default Player;

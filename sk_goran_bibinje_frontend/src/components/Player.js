import classes from "./Player.module.css";
import sasa from "../assets/rezan_sasa.jpg";

const Player = () => {
  return (
    <div className={classes.card}>
      <img src={sasa} alt="Saša Režan"></img>
      <h4>Saša Režan</h4>
      <p>IM</p>
      <p>Rejting: 2400</p>
      <p>Liga: 4.5/8</p>
      <a href="https://ratings.fide.com/profile/14504804" target="_blank">
        FIDE PROFIL
      </a>
    </div>
  );
};

export default Player;

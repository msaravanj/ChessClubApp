import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import logo from "../assets/logo1.png";

const Navigation = (props) => {
  return (
    <nav className={classes.navigation} style={props.navStyle}>
      <div className={classes.navStart}>
        <NavLink to="/">
          <img src={logo} className={classes.logo}></img>
        </NavLink>
        <NavLink className={classes.text} to="/">
          Šahovski klub Goran Bibinje
        </NavLink>
      </div>
      <div className={classes.navEnd}>
        <NavLink className={classes.text} to="/about">
          O klubu
        </NavLink>
        <NavLink className={classes.text} to="/">
          Lige
        </NavLink>
        <NavLink className={classes.text} to="/">
          Škola šaha
        </NavLink>
        <NavLink className={classes.text} to="/">
          Kontakt
        </NavLink>
        <NavLink className={classes.text} to="/login">
          Prijava
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

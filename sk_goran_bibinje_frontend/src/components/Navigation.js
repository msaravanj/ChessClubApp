import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./Navigation.module.css";
import "./LinksStyle.css";
import logo from "../assets/logo1.png";
import { Form } from "react-router-dom";

const Navigation = (props) => {
  const token = useRouteLoaderData("root");

  return (
    <nav className={classes.navigation} style={props.navStyle}>
      <div className={classes.navStart}>
        <NavLink to="/home">
          <img src={logo} className={classes.logo}></img>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/home"
        >
          Šahovski klub Goran Bibinje
        </NavLink>
      </div>
      <div className={classes.navEnd}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/about"
        >
          O klubu
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/leagues"
        >
          Lige
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/school"
        >
          Škola šaha
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/contact"
        >
          Kontakt
        </NavLink>
        {!token && (
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to="/login"
          >
            Prijava
          </NavLink>
        )}
        {token && (
          <Form className={classes.form} action="/logout" method="post">
            <button className={classes.text}>Odjava</button>
          </Form>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

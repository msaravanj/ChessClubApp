import classes from "./AdminPage.module.css";
import Navigation from "../../components/Navigation";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const AdminPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    }
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h3>Dobrodošao u admin sučelje!</h3>
      <div className={classes.options}>
        <div className={classes.option}>
          <NavLink to="/admin/manageClubInfo" className={classes.link}>
            Upravljaj podacima o klubu
          </NavLink>
        </div>
        <div className={classes.option}>
          <NavLink to="/admin/manageArticles" className={classes.link}>
            Upravljaj objavama
          </NavLink>
        </div>
        <div className={classes.option}>
          <NavLink to="/admin/managePlayers" className={classes.link}>
            Upravljaj igračima
          </NavLink>
        </div>
        <div className={classes.option}>
          <NavLink to="/admin/manageLeagues" className={classes.link}>
            Upravljaj ligama
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

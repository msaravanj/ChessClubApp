import { useEffect } from "react";
import classes from "./CreateArticle.module.css";
import Navigation from "../../components/Navigation";
import LeagueForm from "../../components/LeagueForm";

const CreatePlayer = () => {
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
      <LeagueForm />
    </div>
  );
};

export default CreatePlayer;

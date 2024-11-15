import Article from "../components/Article";
import Navigation from "../components/Navigation";
import classes from "./Home.module.css";

const Home = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h1>Šahovski klub "Goran" Bibinje</h1>
      <div className={classes.articles}>
        <Article />
        <Article />
      </div>
    </div>
  );
};

export default Home;

import Navigation from "../components/Navigation";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={classes.layout}>
      <Navigation />
      <div className={classes.box}>
        <h1>Šahovski klub Goran Bibinje</h1>
        <p>Dobrodošli na stranice našeg kluba!</p>
        <button className={classes.button}>NASTAVI</button>
      </div>
    </div>
  );
};

export default WelcomePage;

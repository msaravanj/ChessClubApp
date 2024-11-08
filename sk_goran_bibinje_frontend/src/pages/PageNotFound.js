import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={classes.layout}>
      <h1 className={classes.fof}>404</h1>
      <h2 className={classes.fof2}>Ups! Izgleda da stranica ne postoji...</h2>
      <Link className={classes.link} to="/">
        Idi na početnu stranicu
      </Link>
    </div>
  );
};

export default PageNotFound;

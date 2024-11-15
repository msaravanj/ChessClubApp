import classes from "./Article.module.css";
import image1 from "../assets/article1img.jpg";
import { NavLink } from "react-router-dom";
import moment from "moment";

const Article = () => {
  const time = moment().format("DD.MM.YYYY");

  return (
    <div className={classes.article}>
      <div className={classes.articleImg}>
        <img src={image1} alt="Chess pieces"></img>
      </div>
      <div className={classes.text}>
        <h3>Prvaci 3. HŠL - jug</h3>
        <p className={classes.date}>{time}</p>
        <p>
          Naša druga momčad ostvarila je izniman uspjeh osvojivši 3. ligu - jug.
          Završili su ligu bez poraza - ostvareno je čak 7 pobjeda i 2 remija.
          Time su se kvalificirali u 2. ligu...
        </p>
        <NavLink to="/article:{id}">PRIKAŽI VIŠE</NavLink>
      </div>
    </div>
  );
};

export default Article;

import classes from "./Article.module.css";
import { NavLink } from "react-router-dom";

const Article = (props) => {
  const date = new Date(props.data.date);
  const month = date.getMonth() + 1;
  const time = date.getDate() + "." + month + "." + date.getFullYear() + ".";

  const link = `/articles/${props.data.id}`;
  const content = props.data.content.slice(0, 151) + "...";

  return (
    <div className={classes.article}>
      <div className={classes.articleImg}>
        <img src={props.data.photo} alt="Chess pieces"></img>
      </div>
      <div className={classes.text}>
        <h3>{props.data.title}</h3>
        <p className={classes.date}>{time}</p>
        <p>{content}</p>
        <NavLink to={link}>PRIKAŽI VIŠE</NavLink>
      </div>
    </div>
  );
};

export default Article;

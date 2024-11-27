import classes from "./ArticlePage.module.css";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ArticlePage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const params = useParams();
  const id = params.articleId;

  const [article, setArticle] = useState(null);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const urlGetArticle = `http://localhost:8080/article/?id=${id}`;
  const optionsGetArticle = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getArticle = async () => {
    const response = await fetch(urlGetArticle, optionsGetArticle);
    if (!response.ok) {
      setArticle(null);
    } else {
      const data = await response.json();
      setArticle(data);
      const date = new Date(data.date);
      const month = date.getMonth() + 1;
      const time =
        date.getDate() + "." + month + "." + date.getFullYear() + ".";
      setTime(time);
      setTitle(data.title);
      setContent(data.content);
      setImg(data.photo);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.article}>
        <div className={classes.links}>
          <NavLink to="/home" className={classes.link}>
            Povratak
          </NavLink>
        </div>
        <h2>{title}</h2>
        <p className={classes.date}>{time}</p>
        <p className={classes.text}>{content}</p>
        <img src={img} alt="Article photo" className={classes.image}></img>
      </div>
    </div>
  );
};

export default ArticlePage;

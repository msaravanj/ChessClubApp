import Article from "../components/Article";
import Navigation from "../components/Navigation";
import classes from "./Home.module.css";
import { useState, useEffect } from "react";

const Home = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const [articles, setArticles] = useState([]);

  const urlGetArticles = "http://localhost:8080/article/all";
  const optionsGetArticles = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getArticles = async () => {
    const response = await fetch(urlGetArticles, optionsGetArticles);
    if (!response.ok) {
      setArticles([]);
    } else {
      const data = await response.json();
      data.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      setArticles(data);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h1>Šahovski klub "Goran" Bibinje</h1>
      <div className={classes.articles}>
        {articles.map((article) => {
          return <Article data={article} />;
        })}
      </div>
    </div>
  );
};

export default Home;

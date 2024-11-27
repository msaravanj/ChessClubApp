import classes from "../Home.module.css";
import Navigation from "../../components/Navigation";
import { useState, useEffect } from "react";
import ArticleEdit from "./ArticleEdit";
import { useNavigate } from "react-router-dom";

const ArticlesManagement = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
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

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    }
    getArticles();
  }, [refresh]);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <h1>Šahovski klub "Goran" Bibinje</h1>
      <button
        className={classes.btnNew}
        onClick={() => {
          navigate("/admin/manageArticles/new");
        }}
      >
        Nova objava
      </button>
      <div className={classes.articles}>
        {articles.map((article) => {
          return <ArticleEdit refresh={refreshPage} data={article} />;
        })}
      </div>
    </div>
  );
};

export default ArticlesManagement;

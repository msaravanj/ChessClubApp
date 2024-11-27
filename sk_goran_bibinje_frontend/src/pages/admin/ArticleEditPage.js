import classes from "./ArticleEditPage.module.css";
import Navigation from "../../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/Auth";
import { Alert } from "react-bootstrap";

const ArticleEditPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const params = useParams();
  const id = params.articleId;

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [article, setArticle] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: null,
    image: null,
  });

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
      const date = data.date.slice(0, 10);
      setFormData({
        title: data.title,
        content: data.content,
        date: date,
        image: data.photo,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let img = null;

    try {
      img = await handleUpload(image);
    } catch (error) {
      console.error("Error: " + error);
    }

    const data = {
      title: formData.title,
      date: formData.date,
      content: formData.content,
      photo: img,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/article/updateArticle/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log(response.text());
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setFailed(true);
        setTimeout(() => {
          setFailed(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 2000);
    }
  };

  const handleUpload = async (image) => {
    if (!image) {
      return null;
    }

    const formData1 = new FormData();
    formData1.append("file", image);

    try {
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: formData1,
      });

      if (response.ok) {
        const result = await response.json();

        return result.data.url;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    }
    getArticle();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h4>Ažuriranje objave</h4>
          <div className={classes.element}>
            <label>Naslov:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Datum:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              defaultValue={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Tekst objave:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Fotografija:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={classes.element}></div>
          <button className={classes.btn} type="submit">
            Spremi
          </button>
          {success && (
            <Alert className={classes.alert} key="success" variant="success">
              Ažuriranje uspješno!
            </Alert>
          )}
          {failed && (
            <Alert className={classes.alert} key="danger" variant="danger">
              Pogreška prilikom ažuriranja!
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default ArticleEditPage;

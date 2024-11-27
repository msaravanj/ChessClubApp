import classes from "./ArticleEditPage.module.css";
import Navigation from "../../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/Auth";
import { Alert } from "react-bootstrap";

const LeagueEditPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const params = useParams();
  const id = params.leagueId;

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [league, setLeague] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    leagueText: "",
    gamesUrl: "",
    resultsUrl: "",
    leagueImage: null,
  });

  const urlGetLeague = `http://localhost:8080/league/?id=${id}`;
  const optionsGetLeague = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getLeague = async () => {
    const response = await fetch(urlGetLeague, optionsGetLeague);
    if (!response.ok) {
      setLeague(null);
    } else {
      const data = await response.json();
      setLeague(data);
      setFormData({
        name: data.name,
        leagueText: data.leagueText,
        resultsUrl: data.resultsUrl,
        leagueImage: data.leagueImage,
        gamesUrl: data.gamesUrl,
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
      name: formData.name,
      leagueText: formData.leagueText,
      leagueImage: img,
      gamesUrl: formData.gamesUrl,
      resultsUrl: formData.resultsUrl,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/league/updateLeague/${id}`,
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
      console.error("Error: ", error);
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
        alert("Neuspješan upload!");
        return null;
      }
    } catch (error) {
      alert("Pogreška prilikom upload-a!");
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return (window.location = "/login");
    }
    getLeague();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h4>Ažuriranje lige</h4>
          <div className={classes.element}>
            <label>Naziv:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={classes.element}>
            <label>Link na rezultate:</label>
            <input
              name="resultsUrl"
              value={formData.resultsUrl}
              onChange={handleChange}
            />
          </div>
          <div className={classes.element}>
            <label>Link prijenosa:</label>
            <input
              name="gamesUrl"
              value={formData.gamesUrl}
              onChange={handleChange}
            />
          </div>
          <div className={classes.element}>
            <label>Tekst lige:</label>
            <textarea
              name="leagueText"
              value={formData.leagueText}
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

export default LeagueEditPage;

import classes from "./ArticleEditPage.module.css";
import Navigation from "../../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/Auth";
import { Alert } from "react-bootstrap";

const PlayerEditPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const params = useParams();
  const id = params.playerId;

  const [player, setPlayer] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(null);
  const [pointsScored, setPointsScored] = useState(null);
  const [image, setImage] = useState(null);
  const [fideUrl, setFideUrl] = useState("");
  const [team, setTeam] = useState(0);

  const urlGetPlayer = `http://localhost:8080/player/?id=${id}`;
  const optionsGetPlayer = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getPlayer = async () => {
    const response = await fetch(urlGetPlayer, optionsGetPlayer);
    if (!response.ok) {
      setPlayer(null);
    } else {
      const data = await response.json();
      setPlayer(data);
      setName(data.name);
      setTitle(data.title);
      setFideUrl(data.fideUrl);
      setGamesPlayed(data.gamesPlayed);
      setPointsScored(data.pointsScored);
      setRating(data.rating);
      setTeam(data.team);
    }
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
      name: name,
      title: title,
      rating: rating,
      fideUrl: fideUrl,
      photo: img,
      gamesPlayed: gamesPlayed,
      pointsScored: pointsScored,
      team: team,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/player/updatePlayer/${id}`,
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
    getPlayer();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h4>Ažuriranje igrača</h4>
          <div className={classes.element}>
            <label>Ime i prezime:</label>
            <input
              className={classes.input}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>Titula:</label>
            <input
              className={classes.input}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>Rejting:</label>
            <input
              className={classes.input}
              type="number"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>Odigrano partija:</label>
            <input
              className={classes.input}
              type="number"
              value={gamesPlayed}
              onChange={(e) => {
                setGamesPlayed(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>Ostvario bodova:</label>
            <input
              className={classes.input}
              type="number"
              value={pointsScored}
              step=".1"
              onChange={(e) => {
                setPointsScored(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>FIDE profil:</label>
            <input
              className={classes.input}
              value={fideUrl}
              onChange={(e) => {
                setFideUrl(e.target.value);
              }}
            />
          </div>
          <div className={classes.element}>
            <label>Momčad:</label>
            <select
              name="team"
              id="team"
              className={classes.input}
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
            >
              <option value={0}>1. i 2. ekipa</option>
              <option value={1}>1. ekipa</option>
              <option value={2}>2. ekipa</option>
              <option value={3}>Kadetska</option>
              <option value={4}>Juniorska</option>
            </select>
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

export default PlayerEditPage;

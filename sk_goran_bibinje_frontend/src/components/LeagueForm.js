import classes from "./ArticleForm.module.css";
import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import { getAuthToken } from "../util/Auth";
import { Alert } from "react-bootstrap";

const LeagueForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gamesUrl, setGamesUrl] = useState("");
  const [resultsUrl, setResultsUrl] = useState("");
  const [image, setImage] = useState(null);

  const formRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleReset = () => {
    formRef.current.reset();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let img = null;

    try {
      img = await handleUpload(image);
    } catch (error) {
      console.error("Error: " + error);
    }

    const data = {
      name: title,
      resultsUrl: resultsUrl,
      gamesUrl: gamesUrl,
      leagueText: content,
      leagueImage: img,
    };

    try {
      const response = await fetch("http://localhost:8080/league/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response.text());
        handleReset();
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
    }
  };

  return (
    <Form
      ref={formRef}
      method="post"
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <h2>Dodaj ligu</h2>
      <div className={classes.element}>
        <label>Naziv:</label>
        <input
          className={classes.input}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Link rezultata:</label>
        <input
          className={classes.input}
          required
          onChange={(e) => {
            setResultsUrl(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Link prijenosa:</label>
        <input
          className={classes.input}
          onChange={(e) => {
            setGamesUrl(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Tekst lige:</label>
        <textarea
          className={classes.input}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Fotografija:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={handleImageChange}
        />
      </div>
      <button className={classes.btn} type="submit">
        Spremi
      </button>
      {success && (
        <Alert className={classes.alert} key="success" variant="success">
          Kreiranje uspješno!
        </Alert>
      )}
      {failed && (
        <Alert className={classes.alert} key="danger" variant="danger">
          Pogreška prilikom kreiranja!
        </Alert>
      )}
    </Form>
  );
};

export default LeagueForm;
import classes from "./ArticleForm.module.css";
import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import { getAuthToken } from "../util/Auth";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);

  const formRef = useRef(null);

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
        console.log(result);
        console.log("URL slike: " + result.data.url);

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
      title: title,
      date: date,
      content: content,
      photo: img,
    };

    try {
      const response = await fetch("http://localhost:8080/article/create", {
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
        alert("Uspješno kreirano!");
      } else {
        alert("Pogreška prilikom kreiranja.");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Pogreška prilikom kreiranja.");
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
      <h2>Kreiraj objavu</h2>
      <div className={classes.element}>
        <label>Naslov:</label>
        <input
          className={classes.input}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Datum:</label>
        <input
          className={classes.input}
          type="date"
          required
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className={classes.element}>
        <label>Tekst objave:</label>
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
    </Form>
  );
};

export default ArticleForm;

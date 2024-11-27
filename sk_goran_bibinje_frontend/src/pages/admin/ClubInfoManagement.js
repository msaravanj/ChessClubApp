import Navigation from "../../components/Navigation";
import classes from "./ClubInfoManagement.module.css";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/Auth";
import { Alert } from "react-bootstrap";

const ClubInfoManagement = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const [clubs, setClubs] = useState([]);

  const urlGetClubs = "http://localhost:8080/club/all";
  const optionsGetClubs = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const [aboutUsImage, setAboutUsImage] = useState(null);
  const [chessSchoolImage, setChessSchoolImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    aboutUsText: "",
    chessSchoolText: "",
    aboutUsImage: null,
    chessSchoolImage: null,
  });

  const getClubs = async () => {
    const response = await fetch(urlGetClubs, optionsGetClubs);
    if (!response.ok) {
      setClubs([]);
    } else {
      const data = await response.json();
      setClubs(data);
      setFormData({
        name: data[0].name,
        email: data[0].email,
        address: data[0].address,
        aboutUsText: data[0].aboutUsText,
        chessSchoolText: data[0].chessSchoolText,
        aboutUsImage: data[0].aboutUsImage,
        chessSchoolImage: data[0].chessSchoolImage,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let aboutImg = null;
    let chessImg = null;

    try {
      aboutImg = await handleUpload(aboutUsImage);
      chessImg = await handleUpload(chessSchoolImage);
    } catch (error) {
      console.error("Error: " + error);
    }

    const data = {
      name: formData.name,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      email: formData.email,
      chessSchoolText: formData.chessSchoolText,
      aboutUsText: formData.aboutUsText,
      chessSchoolImage: chessImg,
      aboutUsImage: aboutImg,
    };

    try {
      const response = await fetch("http://localhost:8080/club/updateClub/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
      });

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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "aboutUsImage") {
      setAboutUsImage(files[0]);
    } else if (name === "chessSchoolImage") {
      setChessSchoolImage(files[0]);
    }
  };

  const handleUpload = async (image) => {
    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: formData,
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

    getClubs();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h4>Ažuriranje podataka o klubu</h4>
          <div className={classes.element}>
            <label>Ime kluba:</label>
            <input
              type="text"
              name="clubName"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Adresa:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>O klubu:</label>
            <textarea
              name="aboutUs"
              value={formData.aboutUsText}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Foto (o klubu):</label>
            <input
              type="file"
              name="aboutUsImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={classes.element}>
            <label>Škola šaha:</label>
            <textarea
              name="chessSchoolText"
              value={formData.chessSchoolText}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.element}>
            <label>Foto (škola šaha):</label>
            <input
              type="file"
              name="chessSchoolImage"
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
              Uspješno ažurirano!
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

export default ClubInfoManagement;

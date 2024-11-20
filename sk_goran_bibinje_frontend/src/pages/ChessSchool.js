import classes from "./ChessSchool.module.css";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";

const ChessSchool = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const email = "s.k.goran.bibinje@gmail.com";
  const [schoolText, setSchoolText] = useState("");
  const [schoolImg, setSchoolImg] = useState("");

  const urlGetClub = "http://localhost:8080/club/?email=" + email;
  const optionsGetClub = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getClub = async () => {
    const response = await fetch(urlGetClub, optionsGetClub);
    if (!response.ok) {
      setSchoolText("");
      setSchoolImg("");
    } else {
      const data = await response.json();

      setSchoolText(data.chessSchoolText);

      let path = data.chessSchoolImage.replace(/\\/g, "/");
      setSchoolImg(path.replace("public/", ""));
    }
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>Škola šaha</h2>
          <p>{schoolText}</p>
        </div>
        <div>
          <img
            src={schoolImg}
            alt="Kid playing chess"
            className={classes.image1}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ChessSchool;

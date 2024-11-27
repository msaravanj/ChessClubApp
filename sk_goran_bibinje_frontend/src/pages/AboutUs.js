import Navigation from "../components/Navigation";
import classes from "./AboutUs.module.css";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const [aboutUsText, setAboutUsText] = useState(null);
  const [aboutUsImg, setAboutUsImg] = useState(null);

  const urlGetClub = "http://localhost:8080/club/?id=1";
  const optionsGetClub = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getClub = async () => {
    const response = await fetch(urlGetClub, optionsGetClub);
    if (!response.ok) {
      setAboutUsText(null);
      setAboutUsImg(null);
    } else {
      const data = await response.json();

      setAboutUsText(data.aboutUsText);

      setAboutUsImg(data.aboutUsImage);
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
          <h2>O nama</h2>
          <p className={classes.p1}>{aboutUsText}</p>
        </div>
        <img
          src={aboutUsImg}
          alt="Chess pieces"
          className={classes.image1}
        ></img>
      </div>
    </div>
  );
};

export default AboutUs;

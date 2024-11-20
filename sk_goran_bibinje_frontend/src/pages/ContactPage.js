import classes from "./ContactPage.module.css";
import Navigation from "../components/Navigation";
import Map from "../components/Map";
import { useState, useEffect } from "react";

const ContactPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  const email = "s.k.goran.bibinje@gmail.com";
  const [clubName, setClubName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const urlGetClub = "http://localhost:8080/club/?email=" + email;
  const optionsGetClub = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getClubInfo = async () => {
    const response = await fetch(urlGetClub, optionsGetClub);
    if (!response.ok) {
      setClubName("");
      setAddress("");
      setLat(null);
      setLong(null);
    } else {
      const data = await response.json();

      setClubName(data.name);
      setAddress(data.address);
      setLat(data.latitude);
      setLong(data.longitude);
    }
  };

  useEffect(() => {
    getClubInfo();
  }, []);

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>{clubName}</h2>
          <h4>LOKACIJA</h4>
          <p>{address}</p>
          <h4>E-MAIL</h4>
          <p>{email}</p>
        </div>
        <div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

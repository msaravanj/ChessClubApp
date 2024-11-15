import classes from "./ContactPage.module.css";
import Navigation from "../components/Navigation";
import Map from "../components/Map";

const ContactPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>Šahovski klub "Goran" Bibinje</h2>
          <h4>LOKACIJA</h4>
          <p>Trg dr. Franje Tuđmana 2, Bibinje</p>
          <h4>E-MAIL</h4>
          <p>s.k.goran.bibinje@gmail.com</p>
        </div>
        <div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

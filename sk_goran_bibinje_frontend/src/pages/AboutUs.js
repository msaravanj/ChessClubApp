import Navigation from "../components/Navigation";
import classes from "./AboutUs.module.css";
import image1 from "../assets/slika1.jpg";

const AboutUs = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>O nama</h2>
          <p>
            Osnovni cilj Kluba je poticanje, razvijanje i unapređenje šahovskog
            sporta, te razvitak odgojnih, moralnih, etičkih i sportskih
            vrijednosti kod svojih članova, bavljenjem sportom.
          </p>
          <p>
            Klub je utemeljen 26. lipnja 1971. godine pod imenom: ŠAHOVSKA
            SEKCIJA SPORTSKOG DRUŠTVA „GORAN“ BIBINJE. Pod sadašnjim imenom Klub
            djeluje od 20. veljače 1972. godine. Dan Kluba je 26. lipnja.
          </p>
          <p>
            Klub ima dvije seniorske ekipe. Prva momčad natječe se u najvišem
            ligaškom rangu u Hrvatskoj - u 1. A Hrvatskoj šahovskoj ligi, dok se
            druga momčad natječe u 3. HŠL - jug.
          </p>
          <p>
            U Klub je učlanjeno 35 članova, a najveći fokus stavljamo na školu
            šaha koju svake godine aktivno provodimo i kroz koju obrazujemo nove
            generacije mladih šahista.
          </p>
        </div>
        <div>
          <img src={image1} alt="Chess pieces" className={classes.image1}></img>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

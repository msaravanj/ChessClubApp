import classes from "./ChessSchool.module.css";
import Navigation from "../components/Navigation";
import image1 from "../assets/kid_img.jpg";

const ChessSchool = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>Škola šaha</h2>
          <p>
            Naš klub svake godine organizira Školu šaha za naše najmlađe. Cilj
            škole šaha je potaknuti djecu na aktivno druženje s vršnjacima učeći
            šah istovremeno.<br></br>
            <br></br>
            Naša želja je privući što više mladih u klub i nastaviti tradiciju
            igranja šaha u našoj zajednici. Upravo zato je škola šaha i
            besplatna za sve.<br></br>
            <br></br>
            Treninzi se održavaju svakog utorka i četvrtak u 18 sati. Slobodno
            nam se javite za više informacija.
            <br></br>
            <br></br>
            Upiši se i postani novi majstor!{" "}
          </p>
        </div>
        <div>
          <img
            src={image1}
            alt="Kid playing chess"
            className={classes.image1}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ChessSchool;

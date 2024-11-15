import Navigation from "../components/Navigation";
import classes from "./Leagues.module.css";
import teamImg from "../assets/first_team.jpg";
import team2Img from "../assets/second_team.jpg";
import Player from "../components/Player";

const Leagues = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <div className={classes.section1}>
        <div className={classes.text1}>
          <h2>1. A HŠL</h2>
          <p>
            Naša prva seniorska momčad nastupa u najvišem ligaškom rangu u
            Hrvatskoj čime se posebno ponosimo. Ove godine liga se održala u
            Velom Lošinju gdje su naši momci izborili 8. mjesto i izbjegli
            ispadanje u nižu ligu.
            <br />
            <br />
            Za momčad su nastupili: Gergely Aczel, Zoltan Medvegy, Franjo
            Bilobrk, Saša Režan, Zdenko Plenković, Vjekoslav Biliškov, Mladen
            Zelić i Toni Petrušić.
            <br />
            <br />
          </p>
          <a
            href="https://chess-results.com/tnr1025527.aspx?lan=13&art=46&turdet=YES&flag=30&fbclid=IwY2xjawGjDQtleHRuA2FlbQIxMAABHcDg5wjfNqAwfyUzTHnoj6MpaC7TK8AkHCK1ufEiQPO0vvA1QdcB0a3ZZg_aem_VAKpMQXbhObniNlRmGyTiQ"
            target="_blank"
          >
            Poredak i rezultati
          </a>
          <a
            href="https://lichess.org/broadcast/croatian-team-championships-2024--open-1a/round-9/V8HEi8uF?fbclid=IwY2xjawGjDSdleHRuA2FlbQIxMAABHUlU0ct7SY_DVYYyToajDjeb8-RR5nw-r-2BiRAW7AzThyxBTPTQ0-R8NA_aem_uMjFmOyTtEAMix3waQ8HYw"
            target="_blank"
          >
            Prijenos partija
          </a>
        </div>
        <div className={classes.image1}>
          <img src={teamImg} alt="First team" className={classes.image1}></img>
        </div>
      </div>
      <div className={classes.playerSection}>
        <h2>Igrači - prva momčad</h2>
        <div className={classes.players}>
          <Player />
          <Player />
          <Player />
          <Player />
        </div>
      </div>
      <div className={classes.section2}>
        <div className={classes.text1}>
          <h2>3. HŠL - JUG</h2>
          <p>
            Naša druga seniorska momčad nastupila je u 3. hrvatskoj šahovskoj
            ligi za regiju jug. Ove godine ekipa je uvjerljivo osvojila ligu sa
            7 pobjeda i 2 remija. Na taj način ekipa se kvalificirala u viši
            rang i dogodine će se boriti u 2. HŠL - jug!
            <br />
            <br />
            Za momčad su nastupili: Toni Petrušić, Romeo Sorić, Matija
            Šaravanja, Antonio Janković, John Ivan Krstičević, Filip Šindija,
            Šimun Mrkić, Vitomir Lasić, Lovre Klanac, Kristijan Knežević i Ivan
            Šimunić.
            <br />
            <br />
          </p>
          <a
            href="https://chess-results.com/tnr903385.aspx?lan=13&art=46&fbclid=IwY2xjawGjTaBleHRuA2FlbQIxMAABHQd8rtoFgwHCTzZMFywZHuta1_D2SPH7uWjqtCujU5n9zEkIRfubf0bBJg_aem_SsXlIlJuYGxx_M2sTs6MyQ"
            target="_blank"
          >
            Poredak i rezultati
          </a>
        </div>
        <div className={classes.image1}>
          <img src={team2Img} alt="First team" className={classes.image1}></img>
        </div>
      </div>
      <div className={classes.playerSection}>
        <h2>Igrači - druga momčad</h2>
        <div className={classes.players}>
          <Player />
          <Player />
          <Player />
          <Player />
        </div>
      </div>
    </div>
  );
};

export default Leagues;

import LoginForm from "../components/LoginForm";
import Navigation from "../components/Navigation";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const navStyle = {
    backgroundColor: "#28282B",
    paddingBottom: "2.5rem",
  };

  return (
    <div className={classes.layout}>
      <Navigation navStyle={navStyle} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;

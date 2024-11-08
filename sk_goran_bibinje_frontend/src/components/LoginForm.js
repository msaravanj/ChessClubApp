import { useState } from "react";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Spremi JWT token
        // Preusmjeri korisnika nakon prijave
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
      alert("Došlo je do pogreške. Pokušajte ponovno.");
    }
  };

  return (
    <form className={classes.form} onSubmit={handleLogin}>
      <h2>Admin prijava</h2>
      <input
        className={classes.input}
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsLoginFailed(false);
        }}
      />
      <input
        className={classes.input}
        type="password"
        placeholder="Lozinka"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsLoginFailed(false);
        }}
      />
      {isLoginFailed && (
        <p className={classes.errorMessage}>Neispravni podaci za prijavu.</p>
      )}
      <button className={classes.btn} type="submit">
        Prijava
      </button>
    </form>
  );
};

export default LoginForm;

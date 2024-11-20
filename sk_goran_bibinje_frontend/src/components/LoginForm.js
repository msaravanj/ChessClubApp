import { useState } from "react";
import classes from "./LoginForm.module.css";
import { Form } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        alert("Uspješna prijava");
        window.location.href = "/home";
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
      alert("Došlo je do pogreške. Pokušajte ponovno.");
    }
  };

  return (
    <Form method="post" className={classes.form} onSubmit={handleLogin}>
      <h2>Admin prijava</h2>
      <input
        className={classes.input}
        type="email"
        placeholder="E-mail"
        value={email}
        required
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
        required
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
    </Form>
  );
};

export default LoginForm;

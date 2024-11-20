import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import classes from "../App.module.css";
import { useEffect } from "react";
import { getTokenDuration } from "../util/Auth";

function AppLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <div>
      <main className={classes.app}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

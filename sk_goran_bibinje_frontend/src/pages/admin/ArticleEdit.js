import classes from "./ArticleEdit.module.css";
import { NavLink } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

const ArticleEdit = (props) => {
  const date = new Date(props.data.date);
  const month = date.getMonth() + 1;
  const time = date.getDate() + "." + month + "." + date.getFullYear() + ".";

  const link = `/admin/manageArticles/${props.data.id}`;
  const content = props.data.content.slice(0, 121) + "...";

  return (
    <div className={classes.article}>
      <div className={classes.articleImg}>
        <img src={props.data.photo} alt="Chess pieces"></img>
      </div>
      <div className={classes.text}>
        <h3>{props.data.title}</h3>
        <p className={classes.date}>{time}</p>
        <p>{content}</p>
        <div className={classes.btns}>
          <NavLink to={link}>Uredi</NavLink>
          <button
            className={classes.btn}
            onClick={async () => {
              const isConfirmed = window.confirm(
                "Sigurno želiš izbrisati objavu?"
              );
              if (isConfirmed) {
                try {
                  const response = await fetch(
                    `http://localhost:8080/article/delete/${props.data.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                      },
                    }
                  );

                  if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                  }

                  console.log("Article deleted successfully");
                  props.refresh();
                } catch (error) {
                  console.error("Failed to delete article:", error);
                }
              }
            }}
          >
            Izbriši
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;

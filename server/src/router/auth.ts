import app from "../app";

import auth from "../controllers/auth";
import signup from "../controllers/signup";
import login from "../controllers/login";
import logout from "../controllers/logout";

app.post("/signup", signup());

app.post("/login", login());

app.get("/logout", auth(), logout());

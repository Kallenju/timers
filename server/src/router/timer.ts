import app from "../app";

import auth from "../controllers/auth";
import stopAndSendTimer from "../controllers/stopAndSendTimer";
import createAndSendTimer from "../controllers/createAndSendTimer";

app.post("/api/timers/:id/stop", auth(), stopAndSendTimer());

app.post("/api/timers", auth(), createAndSendTimer());

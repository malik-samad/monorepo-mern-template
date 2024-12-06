import { RequestHandler, Router } from "express";
import { version } from "../../../package.json";
import healthRoute from "./health";
import Logging from "../utils/logging";

const apiRoute = Router();

// Middlewares

// expose system version
apiRoute.use("/version", (async (req, res) => {
  try {
    res.status(200).send({ version });
  } catch (err) {
    Logging.error(err);
    res.status(500).send("Internal server error");
  }
}) as RequestHandler);

// register API Routes
apiRoute.use("/health", healthRoute);

export default apiRoute;

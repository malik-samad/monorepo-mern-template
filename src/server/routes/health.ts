import { Router } from "express";
import health from "../services/health/health.controller";

const healthRoute = Router();

healthRoute.use("/", (req, res) => {
  const result = health();
  res.status(200).send(result);
});

export default healthRoute;

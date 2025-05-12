import { Express } from "express";
import { handleAppointment } from "./routes/appointments";

export async function registerRoutes(app: Express) {
  app.post("/api/appointments", handleAppointment);

  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong" });
  });
}

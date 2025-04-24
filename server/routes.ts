import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleAppointment } from "./routes/appointments";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/appointments', handleAppointment);
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}

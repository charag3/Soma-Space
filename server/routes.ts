import type { Express } from "express";
import { handleAppointment } from "./routes/appointments";

// Puedes importar más handlers según los módulos que necesites

export async function registerRoutes(app: Express): Promise<void> {
  // ✅ Ruta para agendar citas
  app.post("/api/appointments", handleAppointment);

  // 🛠 Aquí puedes seguir agregando más rutas
  // app.get("/api/usuarios", getUsuarios);
  // app.post("/api/contacto", enviarMensaje);
}

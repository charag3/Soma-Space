
import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const handleAppointment = async (req: Request, res: Response) => {
  const { fullName, email, date, time, message } = req.body;

  if (!fullName || !email || !date || !time) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    await pool.query(
      'INSERT INTO appointments (full_name, email, appointment_date, appointment_time, message) VALUES ($1, $2, $3, $4, $5)',
      [fullName, email, date, time, message]
    );
    res.status(200).json({ success: true, message: 'Cita agendada con éxito.' });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

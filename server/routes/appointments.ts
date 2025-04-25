
import { Request, Response } from 'express';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Configuración del transporte de correo para Zoho
let transporter: nodemailer.Transporter | null = null;
if (process.env.ZOHO_USER && process.env.ZOHO_PASS) {
  transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS
    }
  });
}

export const handleAppointment = async (req: Request, res: Response) => {
  const { 
    fullName, 
    email, 
    date, 
    time, 
    message, 
    call_type, 
    phone, 
    jitsi_url 
  } = req.body;

  // Validar campos obligatorios
  if (!fullName || !email || !date || !time || !call_type) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar número de teléfono para llamadas telefónicas
  if (call_type === 'telefono' && !phone) {
    return res.status(400).json({ error: 'El número de teléfono es obligatorio para llamadas telefónicas.' });
  }

  try {
    // Crear la tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TEXT NOT NULL,
        call_type TEXT NOT NULL,
        phone TEXT,
        jitsi_url TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT now()
      )
    `);
    
    // Insertar la cita
    await pool.query(
      `INSERT INTO appointments (
        full_name, email, appointment_date, appointment_time, 
        call_type, phone, jitsi_url, message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [fullName, email, date, time, call_type, phone || null, jitsi_url || null, message]
    );

    // Enviar correo electrónico de confirmación
    if (transporter) {
      try {
        // Armar el cuerpo del correo según el tipo de llamada
        let emailBody = `
          <h2>Nueva cita agendada</h2>
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Hora:</strong> ${time}</p>
          <p><strong>Tipo de llamada:</strong> ${call_type === 'telefono' ? 'Llamada telefónica' : 'Videollamada'}</p>
        `;

        if (call_type === 'telefono') {
          emailBody += `<p><strong>Teléfono:</strong> ${phone}</p>`;
        } else if (call_type === 'videollamada' && jitsi_url) {
          emailBody += `
            <p><strong>Enlace de videollamada:</strong> <a href="${jitsi_url}">${jitsi_url}</a></p>
            <p>Haz clic en el enlace a la hora programada para unirte a la videollamada.</p>
          `;
        }

        if (message) {
          emailBody += `<p><strong>Mensaje:</strong> ${message}</p>`;
        }

        await transporter.sendMail({
          from: process.env.ZOHO_USER,
          to: 'hola@somaspace.site',
          subject: 'Nueva cita agendada',
          html: emailBody
        });

        // También enviar confirmación al usuario
        await transporter.sendMail({
          from: process.env.ZOHO_USER,
          to: email,
          subject: 'Confirmación de tu cita',
          html: `
            <h2>¡Tu cita ha sido agendada con éxito!</h2>
            <p>Hola ${fullName},</p>
            <p>Hemos confirmado tu cita para el día ${date} a las ${time}.</p>
            ${call_type === 'videollamada' && jitsi_url ? 
              `<p>Para tu videollamada, utiliza este enlace a la hora programada: 
                <a href="${jitsi_url}">${jitsi_url}</a>
              </p>` : 
              `<p>Te contactaremos por teléfono al número ${phone} a la hora acordada.</p>`
            }
            <p>¡Gracias por agendar con nosotros!</p>
            <p>Equipo Soma</p>
          `
        });
      } catch (emailError) {
        console.error('Error al enviar correo electrónico:', emailError);
        // Continuar aunque falle el envío de correo
      }
    }

    res.status(200).json({ success: true, message: 'Cita agendada con éxito.' });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

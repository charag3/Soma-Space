
import { Request, Response } from 'express';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Función para prueba de conexión
async function testDBConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a PostgreSQL establecida correctamente');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error al conectar a PostgreSQL:', err);
    return false;
  }
}

// Probar la conexión al iniciar
testDBConnection();

// Configuración del transporte de correo para Zoho
let transporter: nodemailer.Transporter | null = null;
if (process.env.ZOHO_USER && process.env.ZOHO_PASS) {
  transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true para puerto 465, false para otros
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS
    },
    tls: {
      rejectUnauthorized: false // Necesario en algunos entornos
    }
  });
  
  // Verificar la configuración del correo
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Error en la configuración del correo:', error);
    } else {
      console.log('✅ Servidor de correo listo para enviar mensajes');
    }
  });
}

// Función para generar un archivo ICS (calendario)
function generateICSFile(fullName: string, dateStr: string, timeStr: string, call_type: string, phone?: string, jitsi_url?: string): string {
  // Parseamos la fecha y hora para crear el evento
  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const [hours, minutes] = timeStr.split(':').map(num => parseInt(num, 10));
  
  const startDate = new Date(year, month - 1, day, hours, minutes, 0);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1); // Duración: 1 hora
  
  // Formatear fechas para ICS
  const formatForICS = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d+/g, '');
  };
  
  const startDateFormatted = formatForICS(startDate);
  const endDateFormatted = formatForICS(endDate);
  const now = formatForICS(new Date());
  
  // Descripción según tipo de llamada
  let description = `Cita con ${fullName}.\n`;
  if (call_type === 'telefono') {
    description += `Llamada telefónica al número: ${phone}`;
  } else if (call_type === 'videollamada' && jitsi_url) {
    description += `Videollamada en: ${jitsi_url}`;
  }
  
  // Generar contenido ICS
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SomaSpace//NONSGML Event Calendar//ES
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@somaspace.site
DTSTAMP:${now}
DTSTART:${startDateFormatted}
DTEND:${endDateFormatted}
SUMMARY:Cita con ${fullName}
DESCRIPTION:${description}
${call_type === 'videollamada' && jitsi_url ? `URL:${jitsi_url}\n` : ''}
LOCATION:${call_type === 'videollamada' ? 'Videollamada' : 'Llamada telefónica'}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Recordatorio
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

export const handleAppointment = async (req: Request, res: Response) => {
  console.log('Recibida solicitud de cita:', req.body);
  
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
    console.error('❌ Validación fallida - campos obligatorios:', { fullName, email, date, time, call_type });
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar número de teléfono para llamadas telefónicas
  if (call_type === 'telefono' && !phone) {
    console.error('❌ Validación fallida - teléfono obligatorio para llamada telefónica');
    return res.status(400).json({ error: 'El número de teléfono es obligatorio para llamadas telefónicas.' });
  }

  try {
    // Verificar conexión a la base de datos primero
    const dbConnected = await testDBConnection();
    if (!dbConnected) {
      throw new Error('No se pudo establecer conexión con la base de datos');
    }

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
    console.log('✅ Tabla de citas verificada/creada');
    
    // Insertar la cita
    const insertResult = await pool.query(
      `INSERT INTO appointments (
        full_name, email, appointment_date, appointment_time, 
        call_type, phone, jitsi_url, message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [fullName, email, date, time, call_type, phone || null, jitsi_url || null, message]
    );
    
    const appointmentId = insertResult.rows[0].id;
    console.log(`✅ Cita creada con ID: ${appointmentId}`);

    // Generar archivo ICS para el calendario
    const icsContent = generateICSFile(fullName, date, time, call_type, phone, jitsi_url);

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

        // Enviar correo al administrador con archivo ICS adjunto
        await transporter.sendMail({
          from: process.env.ZOHO_USER,
          to: process.env.ZOHO_USER, // Enviar al mismo usuario que es el administrador
          subject: `Nueva cita: ${fullName} - ${date} ${time}`,
          html: emailBody,
          attachments: [
            {
              filename: 'cita.ics',
              content: icsContent,
              contentType: 'text/calendar'
            }
          ]
        });
        console.log('✅ Correo enviado al administrador');

        // También enviar confirmación al usuario con archivo ICS
        await transporter.sendMail({
          from: process.env.ZOHO_USER,
          to: email,
          subject: 'Confirmación de tu cita con Soma',
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
            <p>Adjuntamos un archivo de calendario que puedes agregar a tu aplicación favorita (Google Calendar, Outlook, etc).</p>
            <p>¡Gracias por agendar con nosotros!</p>
            <p>Equipo Soma</p>
          `,
          attachments: [
            {
              filename: 'cita.ics',
              content: icsContent,
              contentType: 'text/calendar'
            }
          ]
        });
        console.log('✅ Correo de confirmación enviado al usuario');
      } catch (emailError) {
        console.error('❌ Error al enviar correo electrónico:', emailError);
        // Continuar aunque falle el envío de correo
      }
    } else {
      console.warn('⚠️ No se configuró el transporte de correo. No se enviarán notificaciones por email.');
    }

    res.status(200).json({ success: true, message: 'Cita agendada con éxito.', appointmentId });
  } catch (error) {
    console.error('❌ Error al agendar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

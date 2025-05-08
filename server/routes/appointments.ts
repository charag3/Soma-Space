
import { Request, Response } from 'express';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';

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

// Verificar la conexión al iniciar
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

// Función para enviar notificaciones por Telegram
async function sendTelegramNotification(message: string): Promise<boolean> {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.warn('⚠️ No se han configurado las credenciales de Telegram');
      return false;
    }
    
    const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await axios.post(telegramApiUrl, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('✅ Notificación de Telegram enviada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error al enviar notificación por Telegram:', error);
    return false;
  }
}

// Función para crear evento en el calendario de Zoho a través de su API de correo
async function createZohoCalendarEvent(
  subject: string, 
  description: string, 
  startDate: Date,
  endDate: Date,
  emailTo: string,
  callType: string,
  phone?: string,
  meetingUrl?: string
): Promise<boolean> {
  try {
    if (!transporter) {
      console.warn('⚠️ No se ha configurado el transporte de correo para Zoho');
      return false;
    }
    
    // Formato de fecha compatible con calendarios: YYYYMMDDTHHMMSSZ
    const formatDateForCalendar = (date: Date) => {
      return format(date, "yyyyMMdd'T'HHmmss'Z'");
    };
    
    const startDateFormatted = formatDateForCalendar(startDate);
    const endDateFormatted = formatDateForCalendar(endDate);
    const now = formatDateForCalendar(new Date());
    
    // Crear un identificador único para el evento
    const eventId = `soma-appointment-${Date.now()}@somaspace.site`;
    
    // Generar el contenido del calendario iCalendar (RFC 5545)
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SomaSpace//Appointment Calendar//ES
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${eventId}
DTSTAMP:${now}
DTSTART:${startDateFormatted}
DTEND:${endDateFormatted}
SUMMARY:${subject}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${callType === 'videollamada' ? 'Videollamada' : 'Llamada telefónica'}
${callType === 'videollamada' && meetingUrl ? `URL:${meetingUrl}\n` : ''}
ORGANIZER;CN=SomaSpace:mailto:${process.env.ZOHO_USER}
ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${emailTo}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Recordatorio
END:VALARM
END:VEVENT
END:VCALENDAR`;
    
    // Enviar correo con evento adjunto - para agregar al calendario de Zoho
    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      to: process.env.ZOHO_USER,
      subject: `[CALENDARIO] ${subject}`,
      html: `
        <p>Este es un correo automático para agregar un evento al calendario.</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Fecha:</strong> ${format(startDate, 'd MMMM yyyy', { locale: es })}</p>
        <p><strong>Hora:</strong> ${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')}</p>
        <p><strong>Tipo:</strong> ${callType === 'videollamada' ? 'Videollamada' : 'Llamada telefónica'}</p>
        ${callType === 'telefono' ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${callType === 'videollamada' && meetingUrl ? `<p><strong>Enlace:</strong> <a href="${meetingUrl}">${meetingUrl}</a></p>` : ''}
      `,
      icalEvent: {
        filename: 'event.ics',
        method: 'REQUEST',
        content: icsContent
      }
    });
    
    console.log('✅ Evento agregado al calendario de Zoho');
    return true;
  } catch (error) {
    console.error('❌ Error al crear evento en el calendario de Zoho:', error);
    return false;
  }
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

    // Convertir la fecha y hora de string a objeto Date
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    
    const appointmentDate = new Date(year, month - 1, day, hours, minutes, 0);
    const endTime = new Date(appointmentDate);
    endTime.setHours(endTime.getHours() + 1); // La cita dura 1 hora
    
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
          <p><strong>Fecha:</strong> ${format(appointmentDate, 'd MMMM yyyy', { locale: es })}</p>
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
          subject: `Nueva cita: ${fullName} - ${format(appointmentDate, 'd MMM yyyy', { locale: es })} ${time}`,
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
            <p>Hemos confirmado tu cita para el día ${format(appointmentDate, 'd MMMM yyyy', { locale: es })} a las ${time}.</p>
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
        
        // Crear evento en el calendario de Zoho
        const appointmentSubject = `Cita con ${fullName}`;
        let appointmentDescription = `
          Nombre: ${fullName}
          Email: ${email}
          Fecha: ${format(appointmentDate, 'd MMMM yyyy', { locale: es })}
          Hora: ${time}
          Tipo: ${call_type === 'telefono' ? 'Llamada telefónica' : 'Videollamada'}
        `;
        
        if (call_type === 'telefono') {
          appointmentDescription += `\nTeléfono: ${phone}`;
        }
        
        if (message) {
          appointmentDescription += `\nMensaje: ${message}`;
        }
        
        // Agregar evento al calendario de Zoho
        await createZohoCalendarEvent(
          appointmentSubject,
          appointmentDescription,
          appointmentDate,
          endTime,
          email,
          call_type,
          phone,
          jitsi_url
        );
        
      } catch (emailError) {
        console.error('❌ Error al enviar correo electrónico:', emailError);
        // Continuar aunque falle el envío de correo
      }
    } else {
      console.warn('⚠️ No se configuró el transporte de correo. No se enviarán notificaciones por email.');
    }
    
    // Enviar notificación a Telegram
    try {
      // Formatear la fecha para Telegram
      const formattedDate = format(appointmentDate, 'd MMMM yyyy', { locale: es });
      
      let telegramMessage = `
<b>🔔 Nueva cita agendada</b>

<b>Nombre:</b> ${fullName}
<b>Email:</b> ${email}
<b>Fecha:</b> ${formattedDate}
<b>Hora:</b> ${time}
<b>Tipo:</b> ${call_type === 'telefono' ? '📞 Llamada telefónica' : '🖥️ Videollamada'}
`;

      if (call_type === 'telefono' && phone) {
        telegramMessage += `<b>Teléfono:</b> ${phone}\n`;
      }
      
      if (call_type === 'videollamada' && jitsi_url) {
        telegramMessage += `<b>Enlace:</b> ${jitsi_url}\n`;
      }
      
      if (message) {
        telegramMessage += `\n<b>Mensaje:</b> ${message}\n`;
      }
      
      telegramMessage += `\n<b>ID:</b> ${appointmentId}`;
      
      await sendTelegramNotification(telegramMessage);
      
    } catch (telegramError) {
      console.error('❌ Error al enviar notificación por Telegram:', telegramError);
      // Continuar aunque falle el envío por Telegram
    }

    res.status(200).json({ success: true, message: 'Cita agendada con éxito.', appointmentId });
  } catch (error) {
    console.error('❌ Error al agendar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

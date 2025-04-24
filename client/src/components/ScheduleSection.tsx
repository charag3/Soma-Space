import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar as CalendarIcon, Clock, Mail, MessageSquare, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define tipos para el formulario
interface ScheduleFormData {
  fullName: string;
  email: string;
  date: Date | undefined;
  time: string;
  message: string;
}

// Define posibles errores en el formulario
interface FormErrors {
  fullName?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
}

const ScheduleSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  
  // Estado para manejar datos del formulario
  const [formData, setFormData] = useState<ScheduleFormData>({
    fullName: "",
    email: "",
    date: "",
    time: "",
    message: ""
  });
  
  // Estado para manejar errores de validación
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para manejar envío de formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animación de scroll
  useScrollAnimation(formRef);
  
  // Manejar cambios en los campos
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error específico cuando el usuario escribe
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validar nombre
    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    }
    
    // Validar email con expresión regular
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    
    // Validar fecha
    if (!formData.date) {
      newErrors.date = "La fecha es requerida";
    }
    
    // Validar hora
    if (!formData.time) {
      newErrors.time = "La hora es requerida";
    }
    
    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // FUTURO: Integración con Google Calendar API
      // Esta sección será reemplazada con la llamada real a la API de Google Calendar
      // 1. Autenticar con credenciales OAuth2
      // 2. Crear un evento en el calendario con los datos del formulario
      // 3. Enviar confirmación al usuario
      
      alert('Cita agendada correctamente');
      
      // Reiniciar formulario
      setFormData({
        fullName: "",
        email: "",
        date: "",
        time: "",
        message: ""
      });
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert('Hubo un error al agendar tu cita. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="schedule" className="py-20 md:py-32 bg-dark-800 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-dark-900 rounded-2xl p-8 md:p-12 shadow-xl gradient-bg"
            data-scroll="true"
            ref={formRef}
          >
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-6 text-center">
              Agenda una <span className="text-primary">llamada</span>
            </h2>
            <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
              Completa el formulario para programar una llamada con nuestro equipo y descubrir cómo podemos ayudarte a optimizar tu negocio.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Campo Nombre */}
              <div>
                <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full bg-dark-800 border ${
                    errors.fullName ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                  placeholder="Tu nombre completo"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              
              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-dark-800 border ${
                    errors.email ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                  placeholder="tu@correo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              {/* Fecha y Hora en Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Fecha */}
                <div>
                  <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    Fecha deseada
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full bg-dark-800 border ${
                      errors.date ? "border-red-500" : "border-dark-700"
                    } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
                
                {/* Campo Hora */}
                <div>
                  <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Hora preferida
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full bg-dark-800 border ${
                      errors.time ? "border-red-500" : "border-dark-700"
                    } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>
              
              {/* Campo Mensaje */}
              <div>
                <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                  Mensaje o motivo
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-dark-800 border ${
                    errors.message ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                  placeholder="¿Cómo podemos ayudarte?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              
              {/* Botón de envío */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient font-medium py-3 px-8 rounded-lg shadow-[0_0_10px_rgba(46,233,220,0.2)] hover:shadow-[0_0_15px_rgba(46,233,220,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-800 disabled:opacity-70 w-full md:w-auto"
                >
                  {isSubmitting ? "Procesando..." : "Agendar llamada"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
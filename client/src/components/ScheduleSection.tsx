import { useRef, useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar as CalendarIcon, Clock, Mail, MessageSquare, User, CheckCircle, RefreshCw, Phone, Video } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Tipo para la modalidad de llamada
type CallType = 'telefono' | 'videollamada';

// Define tipos para el formulario
interface ScheduleFormData {
  fullName: string;
  email: string;
  date: Date | undefined;
  time: string;
  message: string;
  call_type: CallType | '';
  phone?: string;
  jitsi_url?: string;
}

// Define posibles errores en el formulario
interface FormErrors {
  fullName?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  call_type?: string;
  phone?: string;
}

const ScheduleSection = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ScheduleFormData>({
    fullName: "",
    email: "",
    date: undefined,
    time: "",
    message: "",
    call_type: "",
    phone: "",
    jitsi_url: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useScrollAnimation(formRef);

  useEffect(() => {
    if (
      formData.call_type === 'videollamada' &&
      formData.date &&
      formData.time
    ) {
      const dateStr = format(formData.date, 'yyyy-MM-dd');
      setFormData((prev) => ({
        ...prev,
        jitsi_url: `https://meet.jit.si/somaspace-${dateStr}-${prev.time}`,
      }));
    }
  }, [formData.call_type, formData.date, formData.time]);

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date,
    }));

    if (errors.date) {
      setErrors(prev => ({
        ...prev,
        date: undefined
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCallTypeChange = (value: string) => {
    const callType = value as CallType;
    setFormData(prev => ({
      ...prev,
      call_type: callType,
      phone: callType === 'telefono' ? prev.phone : '',
    }));

    if (errors.call_type) {
      setErrors(prev => ({
        ...prev,
        call_type: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    if (!formData.date) {
      newErrors.date = "La fecha es requerida";
    }
    if (!formData.time) {
      newErrors.time = "La hora es requerida";
    }
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }
    if (!formData.call_type) {
      newErrors.call_type = "Selecciona un tipo de llamada";
    }
    if (formData.call_type === 'telefono' && (!formData.phone || !formData.phone.trim())) {
      newErrors.phone = "El número de teléfono es requerido para llamadas telefónicas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      email: "",
      date: undefined,
      time: "",
      message: "",
      call_type: "",
      phone: "",
      jitsi_url: ""
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al agendar la cita');
      setIsSuccess(true);
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      setIsSuccess(false);
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
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="h-24 w-24 text-primary animate-pulse" />
                </div>
                <h3 className="font-space font-bold text-2xl md:text-3xl mb-4">
                  ¡Cita agendada con éxito!
                </h3>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                  Hemos recibido tu solicitud correctamente. Te enviaremos un correo electrónico con la confirmación de tu cita y recordatorios previos a la fecha seleccionada.
                </p>
                <Button 
                  onClick={resetForm}
                  className="btn-gradient font-medium py-3 px-8 rounded-lg shadow-[0_0_10px_rgba(46,233,220,0.2)] hover:shadow-[0_0_15px_rgba(46,233,220,0.4)]"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Agendar otra llamada
                </Button>
              </div>
            ) : (
              <>
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
                    {/* Campo Fecha con Popover y Calendar */}
                    <div>
                      <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                        Fecha deseada
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full bg-dark-800 border justify-start text-left font-normal",
                              !formData.date && "text-gray-400",
                              errors.date ? "border-red-500" : "border-dark-700"
                            )}
                          >
                            {formData.date ? (
                              format(formData.date, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-dark-800 border-dark-700" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={handleDateChange}
                            initialFocus
                            locale={es}
                            className="bg-dark-800 border-dark-700 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                      )}
                    </div>
                    
                    {/* Campo Hora con Popover y opciones predefinidas */}
                    <div>
                      <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        Hora preferida
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full bg-dark-800 border justify-start text-left font-normal",
                              !formData.time && "text-gray-400",
                              errors.time ? "border-red-500" : "border-dark-700"
                            )}
                          >
                            {formData.time ? (
                              <span>{formData.time} horas</span>
                            ) : (
                              <span>Selecciona una hora</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3 bg-dark-800 border-dark-700" align="start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm mb-3 text-gray-300">Horarios disponibles</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((hora) => (
                                <Button
                                  key={hora}
                                  variant={formData.time === hora ? "default" : "outline"}
                                  className="w-full bg-dark-800 border-dark-700 hover:bg-dark-700"
                                  onClick={() => {
                                    setFormData(prev => {
                                      const updated = {...prev, time: hora};
                                      
                                      // Si es videollamada, actualizar la URL de Jitsi
                                      if (prev.call_type === 'videollamada' && prev.date) {
                                        const dateStr = format(prev.date, 'yyyy-MM-dd');
                                        updated.jitsi_url = `https://meet.jit.si/somaspace-${dateStr}-${hora}`;
                                      }
                                      
                                      return updated;
                                    });
                                    
                                    // Limpiar error específico de la hora
                                    if (errors.time) {
                                      setErrors(prev => ({...prev, time: undefined}));
                                    }
                                  }}
                                >
                                  {hora}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      {errors.time && (
                        <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Tipo de llamada */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      Tipo de llamada
                    </label>
                    <Select
                      value={formData.call_type}
                      onValueChange={handleCallTypeChange}
                    >
                      <SelectTrigger 
                        className={`w-full bg-dark-800 border ${
                          errors.call_type ? "border-red-500" : "border-dark-700"
                        } focus:border-primary rounded-lg text-white`}
                      >
                        <SelectValue placeholder="Selecciona el tipo de llamada" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-800 border-dark-700">
                        <SelectItem value="telefono">Llamada telefónica</SelectItem>
                        <SelectItem value="videollamada">Videollamada</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.call_type && (
                      <p className="mt-1 text-sm text-red-500">{errors.call_type}</p>
                    )}
                  </div>
                  
                  {/* Número de teléfono (condicional) */}
                  {formData.call_type === 'telefono' && (
                    <div>
                      <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        Número de teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-dark-800 border ${
                          errors.phone ? "border-red-500" : "border-dark-700"
                        } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                        placeholder="+34 123 456 789"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  )}
                  
                  {/* URL de Jitsi (generada pero no visible) */}
                  {formData.call_type === 'videollamada' && formData.jitsi_url && (
                    <div className="bg-dark-800 border border-primary/30 rounded-lg p-3">
                      <p className="flex items-center text-sm font-medium text-white mb-2">
                        <Video className="w-4 h-4 mr-2 text-primary" />
                        Enlace de videollamada
                      </p>
                      <p className="text-sm text-gray-300">
                        Se generará un enlace de videollamada que recibirás por email.
                      </p>
                      <div className="mt-2 text-xs text-gray-400 break-all bg-dark-900 p-2 rounded border border-dark-700">
                        {formData.jitsi_url}
                      </div>
                    </div>
                  )}
                  
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
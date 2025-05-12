import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useScrollAnimation(formRef);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      date: "",
      time: "",
      call_type: "telefono",
      phone: "",
      jitsi_url: ""
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.name,
          email: data.email,
          date: data.date,
          time: data.time,
          call_type: data.call_type,
          phone: data.call_type === "telefono" ? data.phone : null,
          jitsi_url: data.call_type === "videollamada" ? data.jitsi_url : null,
          message: data.message,
        }),
      });

      if (!response.ok) throw new Error("Error al agendar cita");

      toast({
        title: "Cita agendada",
        description: "Gracias por agendar con nosotros. Te confirmaremos por correo.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al agendar tu cita. Intenta más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-dark-900 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-dark-800 rounded-2xl p-8 md:p-12 shadow-xl shadow-dark-900/50"
            data-scroll="true"
            ref={formRef}
          >
            <h2 className="font-space font-bold text-3xl mb-8 text-center">
              ¿Listo para <span className="text-primary">optimizar</span> tu negocio?
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full bg-dark-900 border ${
                    errors.name ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full bg-dark-900 border ${
                    errors.email ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className={`w-full bg-dark-900 border ${
                    errors.message ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha de la cita
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date")}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                  Hora
                </label>
                <input
                  type="time"
                  id="time"
                  {...register("time")}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de llamada
                </label>
                <select
                  {...register("call_type")}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none"
                >
                  <option value="telefono">Teléfono</option>
                  <option value="videollamada">Videollamada</option>
                </select>
                {errors.call_type && (
                  <p className="mt-1 text-sm text-red-500">{errors.call_type.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="jitsi_url" className="block text-sm font-medium text-gray-300 mb-2">
                  Enlace de videollamada (opcional)
                </label>
                <input
                  type="url"
                  id="jitsi_url"
                  {...register("jitsi_url")}
                  placeholder="https://meet.jit.si/ejemplo"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary rounded-lg py-3 px-4 text-white transition-all focus:outline-none"
                />
                {errors.jitsi_url && (
                  <p className="mt-1 text-sm text-red-500">{errors.jitsi_url.message}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient font-medium py-3 px-8 rounded-lg shadow-[0_0_10px_rgba(46,233,220,0.2)] hover:shadow-[0_0_15px_rgba(46,233,220,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-800 disabled:opacity-70"
                >
                  {isSubmitting ? "Enviando..." : "Agendar cita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

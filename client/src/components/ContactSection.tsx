import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validation";
import { ContactFormData } from "shared/schema";

const ContactSection = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(formRef);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al enviar el formulario');

      alert('Mensaje enviado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
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
                  } focus:border-primary rounded-lg py-3 px-4 text-white form-field transition-all focus:outline-none`}
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
                  } focus:border-primary rounded-lg py-3 px-4 text-white form-field transition-all focus:outline-none`}
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
                  {...register("message")}
                  rows={4}
                  className={`w-full bg-dark-900 border ${
                    errors.message ? "border-red-500" : "border-dark-700"
                  } focus:border-primary rounded-lg py-3 px-4 text-white form-field transition-all focus:outline-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto btn-gradient font-medium py-3 px-8 rounded-lg shadow-[0_0_10px_rgba(29,204,133,0.2)] hover:shadow-[0_0_15px_rgba(29,204,133,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900"
                >
                  Enviar mensaje
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
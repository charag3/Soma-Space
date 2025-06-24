import React, { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { 
    Clock, Zap, Smartphone, CheckCircle, Star, Code, Palette, 
    BarChart3, ArrowRight, Calendar as CalendarIcon, User, Globe, Mail, 
    MessageSquare, Phone, Video, RefreshCw 
} from 'lucide-react';

// Interfaces y Tipos del formulario de agendamiento
type CallType = 'telefono' | 'videollamada';

interface ScheduleFormData {
  fullName: string;
  email: string;
  date: string; // Cambiado a string para input[type=date]
  time: string;
  message: string;
  call_type: CallType | '';
  phone?: string;
  jitsi_url?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  call_type?: string;
  phone?: string;
}

// Componente ScheduleSection adaptado e integrado
const ScheduleSection = () => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    fullName: "",
    email: "",
    date: "",
    time: "",
    message: "",
    call_type: "",
    phone: "",
    jitsi_url: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (formData.call_type === 'videollamada' && formData.date && formData.time) {
      setFormData((prev) => ({
        ...prev,
        jitsi_url: `https://meet.jit.si/somaspace-${prev.date}-${prev.time}`,
      }));
    }
  }, [formData.call_type, formData.date, formData.time]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ingresa un correo electrónico válido";
    if (!formData.date) newErrors.date = "La fecha es requerida";
    if (!formData.time) newErrors.time = "La hora es requerida";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    if (!formData.call_type) newErrors.call_type = "Selecciona un tipo de llamada";
    if (formData.call_type === 'telefono' && (!formData.phone || !formData.phone.trim())) newErrors.phone = "El número de teléfono es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ fullName: "", email: "", date: "", time: "", message: "", call_type: "", phone: "", jitsi_url: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Simulación de envío
      console.log("Enviando:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula llamada a API
      setIsSuccess(true);
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert('Hubo un error al agendar tu cita. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="schedule" className="py-20 px-6 bg-emerald-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="h-24 w-24 text-emerald-600 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">¡Cita agendada con éxito!</h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Hemos recibido tu solicitud. Te enviaremos un correo electrónico con la confirmación y los detalles de tu cita.
                </p>
                <button 
                  onClick={resetForm}
                  className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center mx-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Agendar otra llamada
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
                  Agenda una <span className="text-emerald-600">llamada</span>
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                  Completa el formulario para programar una llamada con nuestro equipo y descubrir cómo podemos ayudarte.
                </p>
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-emerald-600" />Nombre completo
                    </label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full border ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`} placeholder="Tu nombre completo" />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-emerald-600" />Correo electrónico
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`} placeholder="tu@correo.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2 text-emerald-600" />Fecha deseada
                      </label>
                      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={`w-full border ${errors.date ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`} />
                      {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                    </div>
                    <div>
                      <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 mr-2 text-emerald-600" />Hora preferida
                      </label>
                      <select id="time" name="time" value={formData.time} onChange={handleChange} className={`w-full border ${errors.time ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`}>
                        <option value="" disabled>Selecciona una hora</option>
                        {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(hora => <option key={hora} value={hora}>{hora}</option>)}
                      </select>
                      {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="call_type" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-emerald-600" />Tipo de llamada
                    </label>
                    <select id="call_type" name="call_type" value={formData.call_type} onChange={handleChange} className={`w-full border ${errors.call_type ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`}>
                      <option value="" disabled>Selecciona el tipo</option>
                      <option value="telefono">Llamada telefónica</option>
                      <option value="videollamada">Videollamada</option>
                    </select>
                    {errors.call_type && <p className="mt-1 text-sm text-red-500">{errors.call_type}</p>}
                  </div>
                  {formData.call_type === 'telefono' && (
                    <div>
                      <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 mr-2 text-emerald-600" />Número de teléfono
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`} placeholder="+52 123 456 7890" />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  )}
                  {formData.call_type === 'videollamada' && formData.jitsi_url && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <p className="flex items-center text-sm font-medium text-emerald-800 mb-1"><Video className="w-4 h-4 mr-2" />Enlace de videollamada</p>
                      <p className="text-sm text-emerald-700">Se ha generado un enlace único para tu videollamada. Lo recibirás en tu correo de confirmación.</p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />Mensaje o motivo
                    </label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`w-full border ${errors.message ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-500 rounded-lg py-3 px-4 transition-all`} placeholder="¿Cómo podemos ayudarte?" />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  <div className="text-center pt-4">
                    <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 w-full md:w-auto">
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


const SomaExpressLanding = () => {
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const plans = [
    { name: 'Lite', timeline: '5-7 days', price: '$3,000 USD', bestFor: 'Small businesses, 1-3 pages', features: ['Custom design', 'Mobile responsive', 'Basic SEO', '2 revisions'] },
    { name: 'Pro', timeline: '2-4 weeks', price: '$5,000-8,000 USD', bestFor: 'Service providers, startups', features: ['Advanced features', 'E-commerce ready', 'Analytics setup', 'Content strategy', '2 revisions'] },
    { name: 'Custom', timeline: '4-6 weeks', price: '$10,000+ USD', bestFor: 'Tech, eCom, complex projects', features: ['Complex integrations', 'Custom functionality', 'Advanced e-commerce', 'Full SEO audit', 'Unlimited revisions'] }
  ];

  const portfolioItems = [
    { brand: 'TechFlow Solutions', improvement: 'Increased conversions by 240% with modern UX', tag: 'Made in 24h', demo: '#' },
    { brand: 'Verde Marketplace', improvement: 'Complete e-commerce overhaul, 180% more sales', tag: 'eCommerce Refresh', demo: '#' },
    { brand: 'Innovate Corp', improvement: 'Corporate redesign with enhanced user flow', tag: 'Corporate Redesign', demo: '#' }
  ];

  const faqs = [
    { q: 'Do I need to send you a design brief?', a: 'Nope. We\'ll audit your current site and suggest improvements.' },
    { q: 'Can I request changes?', a: 'Yes, 2 revisions are included in every plan.' },
    { q: 'How does the maintenance work?', a: 'One monthly update included in our support plan.' },
    { q: 'Do you offer eCommerce?', a: 'Yes, available in Pro and Custom tiers.' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-emerald-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Soma Express</span>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25">
              Book Free Call
            </button>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-16 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              Your new website, <span className="text-emerald-600">live in 7 days.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Built with the speed of AI and the vision of a designer who understands business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#schedule" className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/25">
                Book a Free Discovery Call
              </a>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                View Live Demos
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Take a look at what we built for our clients ↓
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">What is Soma Express Sites?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Soma Express Sites is a lightning-fast web design service built for serious businesses. We turn outdated, slow, or messy websites into high-converting machines — using automation, creativity and proven UX strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-gray-900">AI Powered</h3>
              <p className="text-gray-600 text-sm">Built with AI tools to move faster than traditional agencies</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Palette className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-gray-900">Custom Design</h3>
              <p className="text-gray-600 text-sm">No templates. Every design is customized for your brand</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-gray-900">Built to Convert</h3>
              <p className="text-gray-600 text-sm">Designed to turn visitors into customers with proven UX</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Smartphone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-gray-900">Mobile First</h3>
              <p className="text-gray-600 text-sm">Blazing fast performance on all devices</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Fast, professional websites at transparent pricing</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {plans.map((plan) => (
              <div key={plan.name} className={`p-8 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan === plan.name ? 'border-emerald-500 bg-emerald-50 transform scale-105 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow-md'}`} onClick={() => setSelectedPlan(plan.name)}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{plan.price}</div>
                  <div className="text-gray-500 text-sm mb-4">{plan.timeline}</div>
                  <div className="text-gray-600">{plan.bestFor}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#schedule" className={`block text-center w-full py-3 px-6 rounded-lg font-semibold transition-colors ${selectedPlan === plan.name ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-500">Need maintenance? We offer monthly support starting at <span className="text-emerald-600 font-semibold">$50/month</span></p>
          </div>
        </div>
      </section>

      {/* Schedule Section (NUEVA VERSIÓN) */}
      <ScheduleSection />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-semibold mb-3 text-emerald-600">Q: {faq.q}</h3>
                  <p className="text-gray-700">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="text-lg font-bold text-gray-900">Soma Express</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Soma Express. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SomaExpressLanding;
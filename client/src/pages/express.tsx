import React, { useState } from 'react';
import { Clock, Zap, Smartphone, CheckCircle, Star, Code, Palette, BarChart3, ArrowRight, Calendar, User, Briefcase, Globe } from 'lucide-react';

// Componente ScheduleSection
const ScheduleSection = () => {
  return (
    <section className="py-20 px-6 bg-emerald-600">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <Calendar className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book a free 30-minute discovery call to discuss your project and see how we can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg">
              Schedule Free Call
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors">
              View Portfolio
            </button>
          </div>
          <p className="text-emerald-100 text-sm mt-6">
            No commitment required • 30-minute consultation • Get expert advice
          </p>
        </div>
      </div>
    </section>
  );
};

const SomaExpressLanding = () => {
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const plans = [
    {
      name: 'Lite',
      timeline: '5-7 days',
      price: '$3,000 USD',
      bestFor: 'Small businesses, 1-3 pages',
      features: ['Custom design', 'Mobile responsive', 'Basic SEO', '2 revisions']
    },
    {
      name: 'Pro',
      timeline: '2-4 weeks',
      price: '$5,000-8,000 USD',
      bestFor: 'Service providers, startups',
      features: ['Advanced features', 'E-commerce ready', 'Analytics setup', 'Content strategy', '2 revisions']
    },
    {
      name: 'Custom',
      timeline: '4-6 weeks',
      price: '$10,000+ USD',
      bestFor: 'Tech, eCom, complex projects',
      features: ['Complex integrations', 'Custom functionality', 'Advanced e-commerce', 'Full SEO audit', 'Unlimited revisions']
    }
  ];

  const portfolioItems = [
    {
      brand: 'TechFlow Solutions',
      improvement: 'Increased conversions by 240% with modern UX',
      tag: 'Made in 24h',
      demo: '#'
    },
    {
      brand: 'Verde Marketplace',
      improvement: 'Complete e-commerce overhaul, 180% more sales',
      tag: 'eCommerce Refresh',
      demo: '#'
    },
    {
      brand: 'Innovate Corp',
      improvement: 'Corporate redesign with enhanced user flow',
      tag: 'Corporate Redesign',
      demo: '#'
    }
  ];

  const faqs = [
    {
      q: 'Do I need to send you a design brief?',
      a: 'Nope. We\'ll audit your current site and suggest improvements.'
    },
    {
      q: 'Can I request changes?',
      a: 'Yes, 2 revisions are included in every plan.'
    },
    {
      q: 'How does the maintenance work?',
      a: 'One monthly update included in our support plan.'
    },
    {
      q: 'Do you offer eCommerce?',
      a: 'Yes, available in Pro and Custom tiers.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
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

      {/* Hero Section */}
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
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/25">
                Book a Free Discovery Call
              </button>
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

      {/* What is Soma Express */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">What is Soma Express Sites?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Soma Express Sites is a lightning-fast web design service built for serious businesses.
              We turn outdated, slow, or messy websites into high-converting machines — using automation, creativity and proven UX strategy.
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

      {/* Pricing Plans */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Fast, professional websites at transparent pricing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedPlan === plan.name
                    ? 'border-emerald-500 bg-emerald-50 transform scale-105 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >
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
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedPlan === plan.name
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500">
              Need maintenance? We offer monthly support starting at <span className="text-emerald-600 font-semibold">$50/month</span>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600">Simple process, powerful results</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/25">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Send Current Site</h3>
                <p className="text-gray-600 text-sm">You send us your current website</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/25">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">AI Magic</h3>
                <p className="text-gray-600 text-sm">We scrape content and design a new version</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/25">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Live Demo</h3>
                <p className="text-gray-600 text-sm">You receive a live demo site — no strings attached</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/25">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Refine & Deliver</h3>
                <p className="text-gray-600 text-sm">We jump on a call, refine, contract and deliver</p>
              </div>
            </div>

            <div className="text-center mt-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Code className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-700">
                We use smart scraping, AI and developer tools to build <strong>real web code</strong> — no mockups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Express Portfolio */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Express Portfolio</h2>
            <p className="text-xl text-gray-600">See what we've built for our clients</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md">
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                  <Globe className="h-16 w-16 text-emerald-600" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{item.brand}</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.improvement}</p>
                  <button className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
                    View Live Demo <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25">
              View All Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">About the Founder</h2>
                <p className="text-xl text-gray-700 mb-6">
                  Hi, I'm Carlos Aguirre, a designer and digital strategist.
                </p>
                <p className="text-gray-600 mb-6">
                  I've worked with brands like Disney, Republic Cosmetics and more.
                  I build tools that increase business performance, save time, and look amazing.
                </p>
                <p className="text-gray-600 mb-8">
                  If you want to upgrade your digital presence without wasting time or overpaying, let's talk.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                    LinkedIn
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <User className="h-32 w-32 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="text-center mt-12 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
              <Star className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <p className="text-lg text-emerald-700 font-semibold">
                If you don't absolutely love what we build, you don't pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <ScheduleSection />

      {/* FAQ */}
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

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Let's build something powerful together.</h2>
            <p className="text-xl text-gray-600 mb-12">
              Ready to transform your website into a high-converting machine?
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg mb-12">
              <Calendar className="h-12 w-12 text-emerald-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Book Your Free Discovery Call</h3>
              <p className="text-gray-600 mb-6">
                Let's discuss your project and see how we can help you grow your business.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/25">
                Schedule Now
              </button>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Powered by cutting-edge tech</h3>
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                <span className="flex items-center"><Zap className="h-5 w-5 mr-2" />AI Tools</span>
                <span className="flex items-center"><Code className="h-5 w-5 mr-2" />GitHub</span>
                <span className="flex items-center"><Globe className="h-5 w-5 mr-2" />Web Standards</span>
              </div>
              <p className="text-emerald-600 font-semibold mt-4">
                100% owned code. 100% yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="text-lg font-bold text-gray-900">Soma Express</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Soma Express. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SomaExpressLanding;
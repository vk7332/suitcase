import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactPageProps {
  onBackClick: () => void;
}

export default function ContactPage({ onBackClick }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'itr',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', service: 'itr', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={onBackClick}
        className="flex items-center gap-2 mb-12 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors group font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold mb-6 uppercase tracking-widest">
          Expert Gateway
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-dark dark:text-white leading-tight">
          Connect with <span className="text-amber-600 dark:text-amber-500 italic">VK Tax Experts</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Get personalized financial guidance and professional compliance solutions from our network of verified experts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
          <h2 className="text-2xl font-bold mb-8 text-navy-dark dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
              <Send className="w-5 h-5" />
            </div>
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-navy-dark dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-navy-dark dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-navy-dark dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Service Required *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-navy-dark dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none"
                >
                  <option value="itr">ITR Filing</option>
                  <option value="tax-advisory">Tax Advisory</option>
                  <option value="gst">GST Compliance</option>
                  <option value="audit">Tax Audit</option>
                  <option value="business">Business Consulting</option>
                  <option value="other">Other Services</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-navy-dark dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group"
            >
              Submit Inquiry
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 shadow-xl shadow-blue-500/5">
            <h3 className="text-xl font-bold mb-8 text-navy-dark dark:text-white uppercase tracking-widest text-[10px]">
              Contact Information
            </h3>

            <div className="space-y-8">
              {[
                { icon: <Mail className="w-5 h-5" />, title: 'Email Us', info: ['contact@vktax.in', 'support@vktax.in'], color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                { icon: <Phone className="w-5 h-5" />, title: 'Call Us', info: ['+91 98765 43210', 'Mon-Sat, 9:00 AM - 6:00 PM IST'], color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { icon: <MapPin className="w-5 h-5" />, title: 'Visit Us', info: ['123 Business Tower, Financial District, Mumbai'], color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { icon: <Clock className="w-5 h-5" />, title: 'Business Hours', info: ['Mon-Fri: 9AM - 7PM', 'Sat: 9AM - 4PM'], color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group cursor-default">
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark dark:text-white mb-1">
                      {item.title}
                    </h4>
                    {item.info.map((line, idx) => (
                      <p key={idx} className="text-sm text-gray-500 dark:text-gray-400">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xl font-bold mb-6 relative z-10">
              Why Choose VK Tax?
            </h3>
            <ul className="space-y-4 relative z-10">
              {[
                '15+ years of tax expertise',
                '10,000+ satisfied clients',
                '100% compliance guarantee',
                'Transparent & upfront pricing'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



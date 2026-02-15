
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, TESTIMONIALS, PRICING_PLANS, FAQS } from './lib/data';
import { Service, BookingFormData } from './types';
import { ThreeDHero } from './components/ThreeDHero';

// --- Sub-components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const ServiceCard = ({ service, onClick }: { service: Service; onClick: (s: Service) => void }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    onClick={() => onClick(service)}
  >
    <div className="text-5xl mb-6">{service.icon}</div>
    <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{service.description}</p>
    <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
      <span>اعرف أكتر</span>
      <span className="text-lg">←</span>
    </button>
  </motion.div>
);

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    address: '',
    service: '',
    details: '',
    isEmergency: false,
    preferredTime: ''
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowBookingModal(false);
      setSelectedService(null);
    }, 4000);
  };

  const constructWhatsAppLink = () => {
    const baseUrl = "https://wa.me/201033776986?text=";
    const msg = formData.name 
      ? `السلام عليكم، عايز احجز خدمة من HomeServe Pro.\nالاسم: ${formData.name}\nالعنوان: ${formData.address}\nالخدمة: ${formData.service || (selectedService?.title || 'عامة')}\nطوارئ؟ ${formData.isEmergency ? 'نعم' : 'لا'}\nالوقت: ${formData.preferredTime}`
      : "السلام عليكم، عايز احجز خدمة من HomeServe Pro. ممكن تفاصيل الحجز؟";
    return baseUrl + encodeURIComponent(msg);
  };

  const constructEmailLink = () => {
    const subject = encodeURIComponent("طلب خدمة - HomeServe Pro");
    const body = encodeURIComponent(`مرحبًا،\n\nعايز أطلب خدمة من HomeServe Pro.\nالاسم: ${formData.name}\nرقم الموبايل: ${formData.phone}\nالعنوان: ${formData.address}\n\nشكرًا`);
    return `mailto:el3arif.m@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen gradient-bg selection:bg-orange-200">
      {/* Sticky Header */}
      <nav className="fixed top-0 w-full z-50 glass shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className="text-2xl font-black text-blue-900 tracking-tighter">HomeServe <span className="text-orange-600">Pro</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">الرئيسية</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">الخدمات</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">الباقات</a>
            <a href="#proof" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">آراء العملاء</a>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
            >
              احجز الآن
            </button>
          </div>

          <button className="lg:hidden text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100 px-6 py-8"
            >
              <div className="flex flex-col gap-6 text-center">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-blue-900">الرئيسية</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-blue-900">الخدمات</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-blue-900">الباقات</a>
                <button 
                  onClick={() => { setIsMenuOpen(false); setShowBookingModal(true); }}
                  className="bg-orange-600 text-white py-4 rounded-2xl font-bold"
                >
                  احجز خدمة دلوقتي
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-sm mb-6 border border-blue-100">
              <span className="animate-pulse">●</span>
              <span>متاحين 24 ساعة لخدمتك في مصر</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-blue-900 leading-tight mb-6">
              بيتك يستاهل <br /> <span className="text-orange-500">صيانة محترفة</span> <br /> من غير تعب.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              هوم سيرف برو بتقدم لك نخبة من الفنيين المعتمدين في جميع المجالات بضمان حقيقي وأسعار شفافة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200"
              >
                احجز خدمة دلوقتي
              </button>
              <a 
                href="#contact"
                className="bg-white text-blue-900 border-2 border-blue-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all text-center"
              >
                اطلب عرض سعر
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                ))}
              </div>
              <div>
                <div className="flex text-orange-400 font-bold items-center gap-1">
                  <span>★★★★★</span>
                  <span className="text-blue-900 font-black">4.8/5</span>
                </div>
                <p className="text-gray-500 text-sm">من +1200 تقييم عملاء حقيقيين</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -z-10 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <ThreeDHero />
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: 'فنيين معتمدين', s: 'فحص خلفية جنائية', i: '🛡️' },
            { t: 'ضمان 30 يوم', s: 'على جميع الخدمات', i: '✅' },
            { t: 'دعم 24/7', s: 'فريق جاهز لأي طارئ', i: '📞' },
            { t: 'أسعار شفافة', s: 'ادفع اللي اتفقت عليه', i: '💰' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">{item.i}</span>
              <h4 className="font-bold text-blue-900">{item.t}</h4>
              <p className="text-xs text-gray-500">{item.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <SectionTitle 
            title="خدماتنا المنزلية" 
            subtitle="كل اللي بيتك محتاجه في مكان واحد. فنيين متخصصين، أدوات حديثة، وسرعة في التنفيذ."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onClick={(s) => setSelectedService(s)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-blue-900 text-white rounded-[4rem] mx-6">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="إزاي بنشتغل؟" 
            subtitle="خطوات بسيطة وسهلة تخلصك من كل مشاكل البيت في دقايق."
          />
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { n: '01', t: 'اختار الخدمة والوقت', d: 'حدد نوع العطل والوقت اللي يناسبك من خلال الموقع أو التطبيق.' },
              { n: '02', t: 'يوصلك الفني المعتمد', d: 'في الميعاد بالظبط، هيوصلك فني متخصص بشنطة عِدّة كاملة.' },
              { n: '03', t: 'ادفع واستلم الضمان', d: 'بعد التأكد من جودة الشغل، ادفع بسهولة واستلم وصل الضمان.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-3xl bg-blue-800/50 border border-blue-700"
              >
                <div className="text-6xl font-black text-blue-700 absolute -top-10 left-1/2 -translate-x-1/2">{step.n}</div>
                <h3 className="text-2xl font-bold mt-8 mb-4">{step.t}</h3>
                <p className="text-blue-100">{step.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <div className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg">
              🚀 طوارئ؟ بنوصلك في خلال 30 دقيقة بس!
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto">
          <SectionTitle title="خطط وأسعار تناسبك" subtitle="شفافية تامة في الأسعار، بدون رسوم خفية أو مفاجآت." />
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map(plan => (
              <div key={plan.id} className={`p-10 rounded-[2.5rem] relative ${plan.isPopular ? 'bg-blue-600 text-white shadow-2xl scale-105 z-10' : 'glass'}`}>
                {plan.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">الأكثر طلباً</div>}
                <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                <div className="text-4xl font-black mb-8">{plan.price}</div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={plan.isPopular ? 'text-blue-200' : 'text-green-500'}>✓</span>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.isPopular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof/Testimonials */}
      <section id="proof" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle title="قصص نجاح عملائنا" subtitle="أكتر من 1200 عيلة في مصر بتثق في هوم سيرف برو." />
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex text-orange-400 mb-4">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-700 mb-6 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <SectionTitle title="الأسئلة المتكررة" />
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group glass p-6 rounded-2xl cursor-pointer">
                <summary className="list-none flex justify-between items-center font-bold text-blue-900 text-lg">
                  {faq.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="glass rounded-[3rem] p-8 lg:p-16 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-blue-900 mb-6">محتاج مساعدة؟ <br />تواصل معانا مباشرة</h2>
              <p className="text-gray-600 mb-10">سواء كنت عايز تحجز خدمة، تطلب عرض سعر، أو عندك استفسار.. إحنا هنا عشانك.</p>
              
              <div className="space-y-6">
                <a href="tel:+201033776986" className="flex items-center gap-6 p-6 bg-white rounded-3xl hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl">📞</div>
                  <div>
                    <h4 className="font-black text-blue-900">اتصل بينا</h4>
                    <p className="text-gray-500">201033776986+</p>
                  </div>
                </a>
                <a href={constructWhatsAppLink()} target="_blank" className="flex items-center gap-6 p-6 bg-white rounded-3xl hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center text-2xl">💬</div>
                  <div>
                    <h4 className="font-black text-blue-900">واتساب</h4>
                    <p className="text-gray-500">متاحين للرد السريع 24/7</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-12 p-8 bg-blue-900 text-white rounded-[2rem]">
                <h4 className="font-bold mb-2">⚠️ تحذير الصيانة المتأخرة</h4>
                <p className="text-blue-200 text-sm">تأجيل إصلاح تسريبات المياه أو الأعطال الكهربائية البسيطة ممكن يضاعف تكلفة الإصلاح 5 مرات خلال شهر واحد. احمي بيتك دلوقتي.</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-900">الاسم الكامل</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="مثلاً: محمد أحمد" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-900">رقم الموبايل</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="01xxxxxxxxx" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900">نوع الخدمة</label>
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="">اختار الخدمة...</option>
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900">وصف المشكلة</label>
                <textarea rows={4} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} placeholder="اشرح لنا المشكلة باختصار..." className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-blue-500 transition-colors"></textarea>
              </div>
              <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-2xl">
                <input type="checkbox" id="emergency" checked={formData.isEmergency} onChange={e => setFormData({...formData, isEmergency: e.target.checked})} className="w-6 h-6" />
                <label htmlFor="emergency" className="text-orange-900 font-bold">الحالة طوارئ (حجز عاجل)</label>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition-all">إرسال الطلب</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
              <span className="text-xl font-black text-blue-900">HomeServe <span className="text-orange-600">Pro</span></span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">أكبر شبكة فنيين معتمدين في مصر. بنهتم بكل تفاصيل بيتك عشان تعيش في راحة وأمان.</p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">f</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#services" className="hover:text-blue-600">الخدمات</a></li>
              <li><a href="#pricing" className="hover:text-blue-600">الباقات</a></li>
              <li><a href="#faq" className="hover:text-blue-600">الأسئلة المتكررة</a></li>
              <li><a href="#" className="hover:text-blue-600">انضم كفني</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-6">تحميل التطبيق</h4>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl">
                <span className="text-2xl">🍎</span>
                <div className="text-right">
                  <p className="text-[10px] opacity-70">Download on</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl">
                <span className="text-2xl">🤖</span>
                <div className="text-right">
                  <p className="text-[10px] opacity-70">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} هوم سيرف برو. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">سياسة الخصوصية</a>
            <a href="#" className="hover:underline">الشروط والأحكام</a>
          </div>
          <p className="italic">Built for the best homes in Egypt.</p>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedService(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
              <button className="absolute top-6 right-6 text-2xl z-10" onClick={() => setSelectedService(null)}>✕</button>
              <div className="h-48 bg-blue-900 relative flex items-center justify-center">
                <div className="text-8xl">{selectedService.icon}</div>
                <div className="absolute -bottom-6 left-12 bg-orange-500 text-white px-6 py-3 rounded-2xl font-black shadow-lg">
                  ابتداءً من {selectedService.priceStart} جنيه
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-3xl font-black text-blue-900 mb-4">{selectedService.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{selectedService.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <span>🔧</span> مشاكل بنحلها:
                    </h4>
                    <ul className="space-y-2 text-gray-500 text-sm">
                      {selectedService.commonProblems.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 font-bold uppercase">متوسط وقت الوصول</p>
                      <p className="text-blue-900 font-black">{selectedService.expectedTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">الضمان</p>
                      <p className="text-green-600 font-black">30 يوم ضمان كامل</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setShowBookingModal(true);
                  }}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition-all"
                >
                  احجز الخدمة دي دلوقتي
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md" onClick={() => setShowBookingModal(false)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden relative shadow-2xl p-8 md:p-12"
            >
              <button className="absolute top-8 right-8 text-2xl" onClick={() => setShowBookingModal(false)}>✕</button>
              
              {!isSuccess ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-blue-900 mb-2">أهلاً بيك!</h3>
                    <p className="text-gray-500">املى البيانات دي وهنكلمك في أسرع وقت.</p>
                  </div>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-900">الاسم</label>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500" placeholder="اسمك" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-blue-900">الموبايل</label>
                        <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500" placeholder="01..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-blue-900">المنطقة</label>
                        <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500" placeholder="مثلاً: المعادي" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-900">الموعد المناسب</label>
                      <select value={formData.preferredTime} onChange={e => setFormData({...formData, preferredTime: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500">
                        <option>دلوقتي (طوارئ)</option>
                        <option>اليوم (خلال ساعات)</option>
                        <option>غداً</option>
                        <option>تحديد موعد لاحق</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-orange-700 transition-all">تأكيد الحجز</button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">🎉</motion.div>
                  <h3 className="text-4xl font-black text-blue-900 mb-4">تم الحجز بنجاح!</h3>
                  <p className="text-gray-600 text-lg mb-10 leading-relaxed">شكراً لثقتك فينا يا {formData.name}. <br />فريقنا هيتواصل معاك فوراً لتأكيد التفاصيل.</p>
                  <div className="flex flex-col gap-4">
                    <a href={constructWhatsAppLink()} className="bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                      <span>واتساب لمتابعة الحجز</span>
                      <span>💬</span>
                    </a>
                    <a href="tel:+201033776986" className="text-blue-600 font-bold py-2 hover:underline">أو اتصل بنا فوراً: 201033776986+</a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

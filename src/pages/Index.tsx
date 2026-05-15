import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/bb377ea6-548c-48d0-8ce1-05c1a810a70b/files/8c300088-4eda-4fdf-8bdd-26f597368818.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/bb377ea6-548c-48d0-8ce1-05c1a810a70b/files/d589110c-dc0a-4c75-a7d4-28860bc9ea39.jpg";

const NAV_LINKS = [
  { href: "#about", label: "О фирме" },
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Briefcase", title: "Корпоративное право", desc: "Регистрация и реорганизация юридических лиц, разработка корпоративных документов, сопровождение M&A сделок." },
  { icon: "FileText", title: "Договорная работа", desc: "Составление, анализ и согласование договоров любой сложности. Защита интересов на всех этапах сделки." },
  { icon: "Scale", title: "Судебные споры", desc: "Представительство в арбитражных судах и судах общей юрисдикции. Подготовка процессуальных документов." },
  { icon: "Building2", title: "Недвижимость", desc: "Сопровождение сделок с недвижимостью, due diligence объектов, регистрация прав." },
  { icon: "Shield", title: "Защита бизнеса", desc: "Защита от рейдерских захватов, корпоративных конфликтов. Безопасность активов." },
  { icon: "Users", title: "Трудовое право", desc: "Кадровое делопроизводство, разработка локальных актов, сопровождение трудовых споров." },
];

const CASES = [
  {
    tag: "Корпоративное",
    title: "Защита прав акционеров в споре о контроле над компанией",
    result: "Суд встал на сторону клиента. Активы защищены.",
    sum: "380 млн ₽",
  },
  {
    tag: "Недвижимость",
    title: "Сопровождение сделки по покупке торгового центра",
    result: "Сделка закрыта в срок, все риски нивелированы.",
    sum: "1,2 млрд ₽",
  },
  {
    tag: "Судебный спор",
    title: "Взыскание задолженности с контрагента-банкрота",
    result: "Долг взыскан полностью через оспаривание сделок.",
    sum: "47 млн ₽",
  },
];

const TEAM = [
  { name: "Андрей Громов", role: "Управляющий партнёр", exp: "18 лет практики" },
  { name: "Виктория Валиева", role: "Партнёр, корпоративное право", exp: "12 лет практики" },
  { name: "Георгий Антонов", role: "Партнёр, судебные споры", exp: "15 лет практики" },
];

function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-avg-blue/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded px-1 py-0.5 flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/bb377ea6-548c-48d0-8ce1-05c1a810a70b/bucket/eefc0370-7397-4df5-b5c7-965438e41450.jpg"
              alt="AVG-Consult"
              className="h-14 w-auto object-contain"
            />
          </div>
          <span className={`font-cormorant font-bold text-xl tracking-wide transition-colors ${scrolled ? "text-avg-blue" : "text-white"}`}>
            AVG-Consult
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`nav-link font-golos text-sm font-medium transition-colors ${scrolled ? "text-avg-blue hover:text-avg-blue-light" : "text-white/90 hover:text-white"}`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contacts")}
            className="bg-avg-blue text-white font-golos text-sm font-medium px-5 py-2.5 rounded hover:bg-avg-blue-mid transition-colors"
          >
            Консультация
          </button>
        </div>

        <button className={`md:hidden ${scrolled ? "text-avg-blue" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-avg-blue/10 py-4 px-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-avg-blue font-golos text-sm font-medium text-left">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#contacts")} className="bg-avg-blue text-white font-golos text-sm font-medium px-5 py-2.5 rounded w-full">
            Консультация
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="AVG-Consult офис" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-avg-dark/90 via-avg-blue/80 to-avg-blue-mid/60" />
      </div>

      <div className="absolute inset-0 geo-pattern opacity-20" />

      <div className="absolute top-20 right-0 w-96 h-96 opacity-10">
        <div className="w-full h-full border border-white/30 rotate-45 translate-x-24" />
      </div>
      <div className="absolute bottom-20 right-20 w-48 h-48 opacity-10">
        <div className="w-full h-full border-2 border-white/20 rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-10 h-px bg-avg-blue-light" />
            <span className="text-avg-blue-light font-golos text-sm font-medium uppercase tracking-widest">
              Юридическая фирма
            </span>
          </div>

          <h1 className="font-cormorant font-bold text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Право<br />
            <span className="italic text-avg-blue-light">на вашей</span><br />
            стороне
          </h1>

          <p className="font-golos text-lg text-white/75 max-w-lg leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            Профессиональная юридическая помощь для бизнеса и частных лиц.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <button
              onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-avg-blue font-golos font-semibold px-8 py-4 rounded hover:bg-avg-blue-pale transition-all hover:shadow-lg text-sm"
            >
              Получить консультацию
            </button>
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/40 text-white font-golos font-medium px-8 py-4 rounded hover:bg-white/10 transition-all text-sm"
            >
              Наши услуги
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 max-w-lg animate-fade-up" style={{ animationDelay: "0.65s" }}>
          {[["15+", "лет опыта"], ["500+", "дел выиграно"], ["98%", "клиентов довольны"]].map(([num, label]) => (
            <div key={num} className="text-center">
              <div className="font-cormorant font-bold text-4xl text-white">{num}</div>
              <div className="font-golos text-xs text-white/60 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/50" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5 animate-on-scroll">
              <div className="w-8 h-px bg-avg-blue-light" />
              <span className="text-avg-blue-light font-golos text-sm font-medium uppercase tracking-widest">О фирме</span>
            </div>
            <h2 className="font-cormorant font-bold text-5xl md:text-6xl text-avg-blue leading-tight mb-6 animate-on-scroll">
              Надёжность,<br />
              <span className="italic">проверенная</span><br />
              временем
            </h2>
            <p className="font-golos text-avg-gray-mid leading-relaxed mb-6 animate-on-scroll">
              AVG-Consult основана в 2024 году одним из лучших практикующих юристов по трудовому праву в России, с опытом в международной юридической фирме. Мы специализируемся на сложных делах и задачах, где на кону, зачастую — судьба бизнеса.
            </p>
            <p className="font-golos text-avg-gray-mid leading-relaxed mb-8 animate-on-scroll">
              Наш подход — глубокое погружение в проблему клиента, превентивная работа с рисками и продуманная защита интересов в суде. Мы не беремся за дела, в которых не уверены на 100%.
            </p>
          </div>

          <div className="relative animate-on-scroll">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-avg-blue/15 rounded-lg" />
            <img src="https://cdn.poehali.dev/projects/bb377ea6-548c-48d0-8ce1-05c1a810a70b/bucket/e357009b-2ece-408e-b1e1-e7f56b6e5da3.JPG" alt="Основатель AVG-Consult" className="w-full h-[480px] object-cover object-top rounded-lg shadow-xl relative z-10" />
            <div className="absolute -bottom-6 -right-6 bg-avg-blue text-white p-6 rounded-lg z-20 shadow-xl">
              <div className="font-cormorant font-bold text-3xl">2024</div>
              <div className="font-golos text-xs text-white/80 mt-1">год основания</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {TEAM.map((m, i) => (
            <div key={m.name} className="animate-on-scroll border border-avg-blue/10 rounded-lg p-6 card-hover" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 geo-diagonal rounded-full flex items-center justify-center mb-4">
                <span className="font-cormorant font-bold text-white text-xl">{m.name[0]}</span>
              </div>
              <h3 className="font-cormorant font-bold text-xl text-avg-blue">{m.name}</h3>
              <p className="font-golos text-sm text-avg-blue-light font-medium mt-1">{m.role}</p>
              <p className="font-golos text-xs text-avg-gray-mid mt-2">{m.exp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 bg-avg-gray-light geo-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5 animate-on-scroll">
            <div className="w-8 h-px bg-avg-blue-light" />
            <span className="text-avg-blue-light font-golos text-sm font-medium uppercase tracking-widest">Услуги</span>
            <div className="w-8 h-px bg-avg-blue-light" />
          </div>
          <h2 className="font-cormorant font-bold text-5xl md:text-6xl text-avg-blue animate-on-scroll">
            Чем мы можем помочь
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="animate-on-scroll bg-white rounded-lg p-8 card-hover border border-transparent hover:border-avg-blue/10"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 geo-diagonal rounded-lg flex items-center justify-center mb-5">
                <Icon name={s.icon} size={22} className="text-white" />
              </div>
              <h3 className="font-cormorant font-bold text-2xl text-avg-blue mb-3">{s.title}</h3>
              <p className="font-golos text-sm text-avg-gray-mid leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-avg-blue-light">
                <span className="font-golos text-sm font-medium">Подробнее</span>
                <Icon name="ArrowRight" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="cases" className="py-28 bg-avg-blue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5 animate-on-scroll">
            <div className="w-8 h-px bg-avg-blue-light" />
            <span className="text-avg-blue-light font-golos text-sm font-medium uppercase tracking-widest">Кейсы</span>
          </div>
          <h2 className="font-cormorant font-bold text-5xl md:text-6xl text-white animate-on-scroll">
            Результаты<br />
            <span className="italic">говорят сами</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <div
              key={c.title}
              className="animate-on-scroll border border-white/15 rounded-lg p-8 hover:bg-white/5 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="inline-block bg-avg-blue-light/20 text-avg-blue-light font-golos text-xs font-medium px-3 py-1 rounded-full mb-5">
                {c.tag}
              </span>
              <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-4">{c.title}</h3>
              <p className="font-golos text-sm text-white/60 mb-6 leading-relaxed">{c.result}</p>
              <div className="border-t border-white/10 pt-5">
                <div className="font-golos text-xs text-white/40 mb-1">Сумма дела</div>
                <div className="font-cormorant font-bold text-2xl text-avg-blue-light">{c.sum}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <p className="font-golos text-white/50 text-sm">
            * Данные изменены в целях конфиденциальности. Реальные суммы и детали по запросу.
          </p>
        </div>
      </div>
    </section>
  );
}

function ConsultForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", message: "" });
  const [sent, setSent] = useState(false);

  const areas = ["Корпоративное право", "Судебные споры", "Недвижимость", "Договорная работа", "Трудовое право", "Другое"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 geo-diagonal rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={28} className="text-white" />
        </div>
        <h3 className="font-cormorant font-bold text-3xl text-avg-blue mb-3">Заявка отправлена</h3>
        <p className="font-golos text-avg-gray-mid">Мы свяжемся с вами в течение рабочего дня</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-golos text-sm font-medium text-avg-blue block mb-2">Ваше имя *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Иван Иванов"
            className="w-full border border-avg-blue/20 rounded px-4 py-3 font-golos text-sm text-avg-dark placeholder:text-avg-gray-mid focus:outline-none focus:border-avg-blue-light focus:ring-1 focus:ring-avg-blue-light transition-colors"
          />
        </div>
        <div>
          <label className="font-golos text-sm font-medium text-avg-blue block mb-2">Телефон *</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 (999) 000-00-00"
            className="w-full border border-avg-blue/20 rounded px-4 py-3 font-golos text-sm text-avg-dark placeholder:text-avg-gray-mid focus:outline-none focus:border-avg-blue-light focus:ring-1 focus:ring-avg-blue-light transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="font-golos text-sm font-medium text-avg-blue block mb-2">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ivan@company.ru"
          className="w-full border border-avg-blue/20 rounded px-4 py-3 font-golos text-sm text-avg-dark placeholder:text-avg-gray-mid focus:outline-none focus:border-avg-blue-light focus:ring-1 focus:ring-avg-blue-light transition-colors"
        />
      </div>

      <div>
        <label className="font-golos text-sm font-medium text-avg-blue block mb-2">Область права</label>
        <select
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className="w-full border border-avg-blue/20 rounded px-4 py-3 font-golos text-sm text-avg-dark focus:outline-none focus:border-avg-blue-light focus:ring-1 focus:ring-avg-blue-light transition-colors bg-white"
        >
          <option value="">Выберите направление</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div>
        <label className="font-golos text-sm font-medium text-avg-blue block mb-2">Опишите ситуацию</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Кратко опишите вашу ситуацию или вопрос..."
          className="w-full border border-avg-blue/20 rounded px-4 py-3 font-golos text-sm text-avg-dark placeholder:text-avg-gray-mid focus:outline-none focus:border-avg-blue-light focus:ring-1 focus:ring-avg-blue-light transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full geo-diagonal text-white font-golos font-semibold py-4 rounded hover:opacity-90 transition-opacity text-sm"
      >
        Записаться на консультацию
      </button>

      <p className="font-golos text-xs text-avg-gray-mid text-center">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-5 animate-on-scroll">
              <div className="w-8 h-px bg-avg-blue-light" />
              <span className="text-avg-blue-light font-golos text-sm font-medium uppercase tracking-widest">Контакты</span>
            </div>
            <h2 className="font-cormorant font-bold text-5xl md:text-6xl text-avg-blue leading-tight mb-6 animate-on-scroll">
              Запишитесь<br />
              <span className="italic">на консультацию</span>
            </h2>
            <p className="font-golos text-avg-gray-mid leading-relaxed mb-10 animate-on-scroll">
              Первая консультация поможет оценить вашу ситуацию и предложить оптимальный путь решения. Свяжитесь с нами удобным способом.
            </p>

            <div className="space-y-5 animate-on-scroll">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Тверская, 1, офис 505" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@avg-consult.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-avg-blue-pale rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={c.icon} size={18} className="text-avg-blue" />
                  </div>
                  <div>
                    <div className="font-golos text-xs text-avg-gray-mid font-medium">{c.label}</div>
                    <div className="font-golos text-sm text-avg-dark font-medium mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll bg-avg-gray-light rounded-xl p-8 border border-avg-blue/8">
            <h3 className="font-cormorant font-bold text-2xl text-avg-blue mb-6">Онлайн-заявка</h3>
            <ConsultForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-avg-dark py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded px-1 py-0.5">
            <img
              src="https://cdn.poehali.dev/projects/bb377ea6-548c-48d0-8ce1-05c1a810a70b/bucket/eefc0370-7397-4df5-b5c7-965438e41450.jpg"
              alt="AVG-Consult"
              className="h-10 w-auto object-contain"
            />
          </div>
          <span className="font-cormorant font-bold text-white text-lg">AVG-Consult</span>
        </div>
        <p className="font-golos text-xs text-white/40 text-center">
          © 2009–2026 AVG-Consult. Все права защищены.
        </p>
        <div className="flex gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
              className="font-golos text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Cases />
      <Contacts />
      <Footer />
    </div>
  );
}
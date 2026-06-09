import {
  Building2,
  Globe2,
  Handshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const Company = () => {
  const stats = [
    {
      icon: <Users size={30} />,
      value: "12 000",
      label: "Talents",
      text: "Talents au sein du groupe Mantu.",
    },
    {
      icon: <TrendingUp size={30} />,
      value: "+1Bn",
      label: "Revenu annuel",
      text: "Revenu annuel communiqué par Mantu.",
    },
    {
      icon: <Globe2 size={30} />,
      value: "+60",
      label: "Pays",
      text: "Présence internationale dans plus de 60 pays.",
    },
    {
      icon: <Building2 size={30} />,
      value: "11",
      label: "Marques",
      text: "Onze marques réunies autour d’une vision commune.",
    },
  ];

  const values = [
    {
      icon: <Sparkles size={28} />,
      title: "Challenge the status quo",
      text: "Mantu encourage ses équipes à penser grand, apprendre et dépasser les limites.",
    },
    {
      icon: <Handshake size={28} />,
      title: "Give it all together",
      text: "L’entreprise valorise l’engagement collectif, la collaboration et l’implication envers les clients.",
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Keep it grounded",
      text: "Mantu combine ambition, créativité, pragmatisme et sens pratique.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Trust comes first",
      text: "La confiance est au centre des relations, du travail et de la collaboration.",
    },
  ];

  const leaders = [
    {
      name: "Olivier Brourhant",
      role: "Founder and Executive Chairman",
      image: "/images/company/olivier.png",
    },
    {
      name: "Constance Nevoret",
      role: "Co-CEO of Mantu",
      image: "/images/company/constance.png",
    },
    {
      name: "Mark-Corentin Cot-Magnas",
      role: "Co-CEO of Mantu",
      image: "/images/company/mark.png",
    },
    {
      name: "Renaud Montagne",
      role: "CEO Amaris Consulting",
      image: "/images/company/renaud.png",
    },
  ];

  const offices = [
    {
      city: "Geneva",
      country: "Switzerland",
      image: "/images/company/geneva.png",
    },
    {
      city: "Barcelona",
      country: "Spain",
      image: "/images/company/barcelona.png",
    },
    {
      city: "Tunis",
      country: "Tunisia",
      image: "/images/company/tunis.png",
    },
    {
      city: "Ho Chi Minh City",
      country: "Vietnam",
      image: "/images/company/hochiminh.png",
    },
  ];

  const brands = [
    "Amaris Consulting",
    "LittleBig Connection",
    "Eleven VMS",
    "WEMEAN",
    "Valuement",
    "Portalia",
    "Revibe",
    "Arneo",
    "Novelab",
    "BAW",
    "Mantu",
  ];

  return (
    <div className="page mantu-page">
      <section className="mantu-hero">
        <div className="mantu-hero-content">
          <span className="mantu-chip">Who we are</span>

          <h1>We are Mantu</h1>

          <p>
            Mantu est un groupe international de conseil indépendant. Sa mission
            consiste à combiner des idées audacieuses et la technologie pour
            créer des solutions adaptées, capables d’accompagner durablement la
            transformation des organisations.
          </p>

          <div className="mantu-hero-actions">
            <a href="/powerbi">Accéder aux dashboards</a>
            <a href="#governance" className="outline">
              Voir la gouvernance
            </a>
          </div>
        </div>

        <div className="mantu-hero-card">
          <img src="/images/mantu-logo.png" alt="Mantu Logo" />
          <h3>Audacious ideas</h3>
          <p>Delivered beyond</p>
        </div>
      </section>

      <section className="mantu-section">
        <div className="section-title">
          <h2>Mantu in numbers</h2>
          <p>An independent global consulting group.</p>
        </div>

        <div className="mantu-stats-grid">
          {stats.map((item, index) => (
            <div className="mantu-stat-card" key={index}>
              <div className="mantu-stat-icon">{item.icon}</div>
              <h3>{item.value}</h3>
              <h4>{item.label}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mantu-section mantu-mission-grid">
        <div className="mantu-mission-card large">
          <span className="mantu-kicker">Mission</span>
          <h2>Tailor solutions that deliver beyond</h2>
          <p>
            Dans un monde où les entreprises doivent s’adapter rapidement,
            Mantu se positionne comme un partenaire capable d’identifier les
            opportunités et de concevoir des solutions sur mesure.
          </p>
          <p>
            Avec plusieurs marques et une présence internationale, Mantu combine
            expertise, technologie et audace pour accompagner les entreprises
            dans leur croissance.
          </p>
        </div>

        <div className="mantu-image-card">
          <img src="/images/company/mission.png" alt="Mission Mantu" />
        </div>
      </section>

      <section className="mantu-section">
        <div className="section-title">
          <h2>What we stand for</h2>
          <p>Les valeurs qui guident la manière d’agir de Mantu.</p>
        </div>

        <div className="mantu-values-grid">
          {values.map((item, index) => (
            <div className="mantu-value-card" key={index}>
              <div className="mantu-value-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mantu-section" id="governance">
        <div className="section-title">
          <h2>Governance</h2>
          <p>
            L’Executive Committee de Mantu porte la vision du groupe et son
            développement international.
          </p>
        </div>

        <div className="mantu-leaders-grid">
          {leaders.map((leader, index) => (
            <div className="mantu-leader-card" key={index}>
              <div className="mantu-leader-image">
                <img src={leader.image} alt={leader.name} />
              </div>

              <h3>{leader.name}</h3>
              <p>{leader.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mantu-section">
        <div className="section-title">
          <h2>Our offices</h2>
          <p>Quelques bureaux internationaux du groupe.</p>
        </div>

        <div className="mantu-offices-grid">
          {offices.map((office, index) => (
            <div className="mantu-office-card" key={index}>
              <div className="mantu-office-image">
                <img src={office.image} alt={office.city} />
              </div>

              <div className="office-location">
                <MapPin size={18} />
                <div>
                  <h3>{office.city}</h3>
                  <p>{office.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mantu-section">
        <div className="section-title">
          <h2>Our brands</h2>
          <p>Les marques qui connectent Mantu à travers le monde.</p>
        </div>

        <div className="mantu-brands-list">
          {brands.map((brand, index) => (
            <span key={index}>{brand}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Company;
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Flag, 
  Users, 
  Image as ImageIcon, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Edit3, 
  Activity, 
  Play, 
  Pause, 
  ChevronRight, 
  Instagram, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

// Icono personalizado SVG para TikTok
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.86.12V9.32a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.58a6.34 6.34 0 0010.86 4.46V12.1a8.16 8.16 0 005.73 2.14v-3.76a4.85 4.85 0 01-3-1.07v-.02z"/>
  </svg>
);

// Icono personalizado SVG para Discord
const DiscordIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Datos iniciales
const INITIAL_DRIVERS = [
  { id: 1, name: "L. Espíndola", role: "Team Principal / Piloto", sim: "iRacing / RBR", rating: "4.8k iR", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", car: "Toyota GR Yaris Rally1", wins: 34, podiums: 82, flag: "🇦🇷" },
  { id: 2, name: "M. Rodríguez", role: "Rally Specialist", sim: "Richard Burns Rally", rating: "5.1k iR", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", car: "Hyundai i20 N Rally1", wins: 28, podiums: 65, flag: "🇦🇷" },
  { id: 3, name: "P. Gómez", role: "GT3 Setup Engineer", sim: "Assetto Corsa Competizione", rating: "3.9k iR", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", car: "Porsche 911 GT3 R", wins: 19, podiums: 44, flag: "🇺🇾" },
  { id: 4, name: "C. Saldívar", role: "Piloto Endurance", sim: "iRacing", rating: "4.2k iR", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80", car: "Ferrari 296 GT3", wins: 15, podiums: 39, flag: "🇨🇱" },
];

const INITIAL_EVENTS = [
  { id: 1, name: "Rally de Cataluña - Riudecanyes", track: "Circuito RACC Rally1", date: "15 NOV 2026 - 20:00 ART", category: "WRC Rally1", status: "Inscripciones Abiertas", slots: "28/30", weather: "Despejado / 19°C" },
  { id: 2, name: "Gran Premio de Cataluña Simracing", track: "Circuit de Barcelona-Catalunya", date: "22 NOV 2026 - 21:00 ART", category: "GT3 Challenge", status: "Confirmado", slots: "24/30", weather: "Seco / 22°C" },
  { id: 3, name: "24 Horas de Spa Endurance", track: "Circuit de Spa-Francorchamps", date: "05 DIC 2026 - 15:00 ART", category: "Endurance Cup", status: "Próximamente", slots: "12/12", weather: "Lluvia Variable" }
];

const INITIAL_LIVE_TIMING = [
  { pos: 1, driver: "L. Espíndola", car: "Toyota GR Yaris WRC", lap: 14, best: "1:42.319", last: "1:42.501", gap: "Líder", s1: "28.12", s2: "41.05", s3: "33.14", status: "PISTA" },
  { pos: 2, driver: "M. Rodríguez", car: "Hyundai i20 Rally1", lap: 14, best: "1:42.610", last: "1:42.610", gap: "+0.291s", s1: "28.20", s2: "41.10", s3: "33.31", status: "PISTA" },
  { pos: 3, driver: "P. Gómez", car: "Ford Puma WRC", lap: 14, best: "1:43.004", last: "1:43.190", gap: "+1.218s", s1: "28.35", s2: "41.28", s3: "33.56", status: "PISTA" },
  { pos: 4, driver: "C. Saldívar", car: "Skoda Fabia RS Rally2", lap: 13, best: "1:43.850", last: "1:44.200", gap: "+1 Vuelta", s1: "28.60", s2: "41.60", s3: "34.00", status: "PIT" },
  { pos: 5, driver: "F. Nacho", car: "Citroen C3 Rally2", lap: 13, best: "1:44.110", last: "1:44.320", gap: "+1 Vuelta", s1: "28.75", s2: "41.80", s3: "34.12", status: "PISTA" }
];

const INITIAL_GALLERY = [
  { id: 1, title: "Rally Catalunya Roundabout Riudecanyes", tag: "Rally", url: "https://files.catbox.moe/29kogi.jpg" },
  { id: 2, title: "Test de Pretemporada Rally Fafe", tag: "Rally", url: "https://images.unsplash.com/photo-1541348263662-e082662d82da?w=800&auto=format&fit=crop&q=80" },
  { id: 3, title: "Setup Telemetría Cockpit Sim", tag: "Hardware", url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80" },
  { id: 4, title: "Podio 1-2 en Nürburgring Nordschleife", tag: "Endurance", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80" }
];

const INITIAL_HALL_OF_FAME = [
  { year: "2025", title: "Campeones WRC Virtual South America", driver: "L. Espíndola & M. Rodríguez", detail: "Dominio total con 8 victorias de 10 fechas disputadas en RBR." },
  { year: "2025", title: "Subcampeones 24h Nürburgring GT3", driver: "Espindola Competicion Crew", detail: "2,410 km recorridos en condiciones climáticas extremas." },
  { year: "2024", title: "Copa de Constructores SimRacing Rally", driver: "Espindola Competicion", detail: "Primer título de marcas de la escudería en simulación de rally profesional." }
];

export default function App() {
  // Pestaña activa por defecto: INICIO
  const [activeTab, setActiveTab] = useState('INICIO');
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  // Estado general de datos
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [liveTiming, setLiveTiming] = useState(INITIAL_LIVE_TIMING);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [hallOfFame] = useState(INITIAL_HALL_OF_FAME);
  const [isSimulatingTiming, setIsSimulatingTiming] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bannerAlert, setBannerAlert] = useState("EN VIVO: Transmisión Oficial de Espindola Competición en Twitch / Youtube");

  // Perfil del usuario
  const [userProfile, setUserProfile] = useState({
    name: "L.ESPINDOLA",
    role: "Team Principal",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  });

  // Formularios de administración
  const [newMember, setNewMember] = useState({ name: '', role: '', sim: '', rating: '', car: '', flag: '🇦🇷' });
  const [newEvent, setNewEvent] = useState({ name: '', track: '', date: '', category: '', slots: '20/20' });

  // Motor de Telemetría en vivo simulada
  useEffect(() => {
    let interval;
    if (isSimulatingTiming) {
      interval = setInterval(() => {
        setLiveTiming(prev => {
          return prev.map(item => {
            if (item.pos === 1) return item;
            const delta = (Math.random() * 0.12 - 0.06).toFixed(3);
            const currentGapNum = parseFloat(item.gap.replace(/[^0-9.]/g, '')) || 0.3;
            const newGap = `+${(Math.max(0.08, currentGapNum + parseFloat(delta))).toFixed(3)}s`;
            return {
              ...item,
              gap: newGap,
              s1: (28 + Math.random() * 0.4).toFixed(2),
              s2: (41 + Math.random() * 0.4).toFixed(2),
              s3: (33 + Math.random() * 0.4).toFixed(2),
            };
          });
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSimulatingTiming]);

  // Selección de pestaña con cierre automático de menús
  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    setIsNavDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name) return;
    const added = {
      ...newMember,
      id: Date.now(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      wins: 0,
      podiums: 1
    };
    setDrivers([...drivers, added]);
    setNewMember({ name: '', role: '', sim: '', rating: '', car: '', flag: '🇦🇷' });
  };

  const handleDeleteMember = (id) => {
    setDrivers(drivers.filter(d => d.id !== id));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.name) return;
    const eventObj = {
      ...newEvent,
      id: Date.now(),
      status: "Inscripciones Abiertas",
      weather: "Despejado / 20°C"
    };
    setEvents([...events, eventObj]);
    setNewEvent({ name: '', track: '', date: '', category: '', slots: '20/20' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative overflow-x-hidden select-none flex flex-col justify-between">
      
      {/* 
        FONDO CON LA IMAGEN EXACTA DEL TOYOTA RALLY EN RIUDECANYES 
        Y EFECTO BORROSO GAUSSIANO (FILTER BLUR)
      */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -inset-6 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('https://files.catbox.moe/29kogi.jpg')`,
            filter: 'blur(9px) brightness(0.5) contrast(1.1)',
            transform: 'scale(1.08)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
      </div>

      {/* BARRA SUPERIOR DE ALERTAS / TRANSMISIÓN */}
      {bannerAlert && (
        <div className="relative z-50 bg-black/70 backdrop-blur-md border-b border-white/10 text-cyan-300 text-xs py-1.5 px-4 flex justify-between items-center tracking-wide font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span>{bannerAlert}</span>
          </div>
          <button 
            onClick={() => setBannerAlert('')} 
            className="text-neutral-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* HEADER NAVBAR FIDELIDAD TOTAL A TU IMAGEN REPERENCIA */}
      <header className="relative z-40 w-full px-4 md:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        
        {/* LOGO ESPINDOLA COMPETICION */}
        <div 
          onClick={() => handleSelectTab('INICIO')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border border-white/40 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:border-cyan-400 transition">
            <svg className="w-5 h-5 text-white group-hover:text-cyan-400 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white italic font-mono uppercase">
              ESPINDOLA
            </span>
            <span className="text-[9px] tracking-[0.3em] text-neutral-300 font-bold uppercase">
              COMPETICION
            </span>
          </div>
        </div>

        {/* CAPSULA CENTRAL: MENU CON 3 LÍNEAS */}
        <div className="relative flex items-center">
          <nav className="bg-black/50 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 flex items-center gap-4 md:gap-6 shadow-2xl">
            {[
              { id: 'INICIO', label: 'INICIO' },
              { id: 'HISTORIA', label: 'HISTORIA' },
              { id: 'EVENTOS', label: 'EVENTOS' },
              { id: 'LIVETIMING', label: 'LIVETIMING' },
              { id: 'SALON DE LA FAMA', label: 'SALON DE LA FAMA' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => handleSelectTab(nav.id)}
                className={`text-xs md:text-sm font-black tracking-wider transition-all duration-200 uppercase whitespace-nowrap ${
                  activeTab === nav.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                    : 'text-white hover:text-cyan-300'
                }`}
              >
                {nav.label}
              </button>
            ))}

            {/* BOTÓN DE LAS 3 LÍNEAS DEL MENÚ CENTRAL */}
            <button
              onClick={() => {
                setIsNavDropdownOpen(!isNavDropdownOpen);
                setIsUserDropdownOpen(false);
              }}
              className="p-1 rounded-full text-white hover:bg-white/15 transition flex items-center justify-center ml-1"
              title="Más opciones"
            >
              <Menu className="w-5 h-5" />
            </button>
          </nav>

          {/* DESPLEGABLE CENTRAL: CALENDARIO, GALERIA, MIEMBROS */}
          {isNavDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 w-52 bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {[
                { id: 'CALENDARIO', label: 'CALENDARIO', icon: Calendar },
                { id: 'GALERIA', label: 'GALERIA', icon: ImageIcon },
                { id: 'MIEMBROS', label: 'MIEMBROS', icon: Users }
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full text-center px-4 py-2.5 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                      activeTab === item.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 opacity-70" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* CAPSULA DERECHA: USUARIO L.ESPINDOLA CON 3 LÍNEAS */}
        <div className="relative">
          <button
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
              setIsNavDropdownOpen(false);
            }}
            className="bg-black/50 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5 flex items-center gap-2 md:gap-3 hover:border-cyan-400 transition shadow-2xl"
          >
            <img
              src={userProfile.avatar}
              alt="Avatar Piloto"
              className="w-7 h-7 rounded-full object-cover border border-white/50"
            />
            <span className="text-xs md:text-sm font-black tracking-wider uppercase text-white font-mono">
              {userProfile.name}
            </span>
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* DESPLEGABLE DE PERFIL: MI PERFIL, CONFIGURACION, PANEL ADMIN, SALIR */}
          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 w-52 bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {[
                { id: 'MI PERFIL', label: 'MI PERFIL', icon: User },
                { id: 'CONFIGURACION', label: 'CONFIGURACION', icon: Settings },
                { id: 'ADMIN', label: 'PANEL ADMIN', icon: ShieldAlert, highlight: true },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full text-center px-4 py-2.5 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase transition-all flex items-center justify-start gap-3 ${
                      item.highlight 
                        ? 'text-cyan-400 hover:bg-cyan-950/50 border border-cyan-500/30 my-1'
                        : activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-neutral-200 hover:bg-white/10'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 opacity-80" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  setIsUserDropdownOpen(false);
                  setActiveTab('INICIO');
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-black tracking-widest text-red-400 hover:bg-red-500/10 transition flex items-center gap-3 uppercase"
              >
                <LogOut className="w-4 h-4" />
                <span>SALIR</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SEGÚN LA PESTAÑA */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6 mb-20 flex-1 flex flex-col justify-center">
        
        {/* ================= TAB 0: INICIO (TOTALMENTE LIMPIA) ================= */}
        {activeTab === 'INICIO' && (
          <div className="min-h-[50vh] flex items-center justify-center">
            {/* Pestaña de inicio completamente vacía a petición del usuario */}
          </div>
        )}

        {/* ================= TAB 1: HISTORIA ================= */}
        {activeTab === 'HISTORIA' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest mb-4">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>HISTORIA DE ESPINDOLA COMPETICION</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 text-white font-mono leading-none">
                  PASION Y TELEMETRIA REAL
                </h1>
                <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-6">
                  Fundados con la visión de dominar las competiciones de rally y resistencia en simracing sudamericano e internacional. Desarrollamos setups milimétricos y telemetría de alto rendimiento en iRacing y RBR.
                </p>
                <button 
                  onClick={() => handleSelectTab('EVENTOS')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs md:text-sm px-6 py-3 rounded-full uppercase tracking-wider transition shadow-lg flex items-center gap-2"
                >
                  <span>Ver Próximas Carreras</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: EVENTOS ================= */}
        {activeTab === 'EVENTOS' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tight uppercase font-mono">PRÓXIMOS EVENTOS</h2>
            <div className="grid gap-4">
              {events.map((evt) => (
                <div key={evt.id} className="bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-5 hover:border-cyan-400/40 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {evt.category}
                      </span>
                      <span className="text-xs text-neutral-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {evt.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{evt.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-neutral-300">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {evt.track}</span>
                      <span>Cupos: <strong className="text-cyan-300">{evt.slots}</strong></span>
                    </div>
                  </div>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition">
                    Inscribirme
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CALENDARIO ================= */}
        {activeTab === 'CALENDARIO' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-3xl p-6">
              <h2 className="text-2xl font-black italic tracking-tight uppercase font-mono mb-4">CALENDARIO TEMPORADA 2026</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { month: "NOV", day: "15", event: "Rally Cataluña Riudecanyes", status: "Confirmado" },
                  { month: "NOV", day: "22", event: "GP Cataluña GT3 Challenge", status: "Confirmado" },
                  { month: "DIC", day: "05", event: "24h Spa Francorchamps", status: "Abierto" }
                ].map((cal, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="bg-cyan-500/20 border border-cyan-400/40 rounded-xl p-3 text-center min-w-[60px]">
                      <span className="block text-[10px] font-bold text-cyan-300">{cal.month}</span>
                      <span className="block text-2xl font-black text-white">{cal.day}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{cal.event}</h4>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{cal.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LIVETIMING ================= */}
        {activeTab === 'LIVETIMING' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h2 className="text-lg font-black uppercase font-mono tracking-wide">LIVE TELEMETRY & TIMING</h2>
                  <p className="text-xs text-neutral-300">Rally Cataluña Riudecanyes - Toyota GR Yaris Rally1</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSimulatingTiming(!isSimulatingTiming)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase border border-cyan-400/40 bg-cyan-500/20 text-cyan-300 flex items-center gap-2"
              >
                {isSimulatingTiming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSimulatingTiming ? "Pausar" : "Reanudar"}</span>
              </button>
            </div>

            <div className="bg-black/70 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm font-mono">
                <thead>
                  <tr className="bg-white/10 text-neutral-300 border-b border-white/10 uppercase text-[11px]">
                    <th className="p-3 text-center">POS</th>
                    <th className="p-3">PILOTO</th>
                    <th className="p-3">AUTO</th>
                    <th className="p-3">MEJOR VUELTA</th>
                    <th className="p-3">DIFERENCIA</th>
                    <th className="p-3">S1</th>
                    <th className="p-3">S2</th>
                    <th className="p-3 text-center">ESTADO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {liveTiming.map((row) => (
                    <tr key={row.pos} className="hover:bg-white/5 transition">
                      <td className="p-3 text-center font-bold text-cyan-400">{row.pos}</td>
                      <td className="p-3 font-bold text-white">{row.driver}</td>
                      <td className="p-3 text-neutral-300">{row.car}</td>
                      <td className="p-3 text-cyan-300 font-bold">{row.best}</td>
                      <td className="p-3 text-neutral-200">{row.gap}</td>
                      <td className="p-3 text-neutral-400">{row.s1}s</td>
                      <td className="p-3 text-neutral-400">{row.s2}s</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'PIT' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SALON DE LA FAMA ================= */}
        {activeTab === 'SALON DE LA FAMA' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto mb-6">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h2 className="text-3xl font-black italic uppercase font-mono text-white">SALÓN DE LA FAMA</h2>
              <p className="text-xs text-neutral-300">Palmarés dorados de la escudería</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hallOfFame.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-b from-amber-500/10 via-black/60 to-black/80 backdrop-blur-md border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative">
                  <span className="absolute top-4 right-4 bg-amber-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono">
                    {item.year}
                  </span>
                  <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-amber-300 mb-3">{item.driver}</p>
                  <p className="text-xs text-neutral-300 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: GALERIA ================= */}
        {activeTab === 'GALERIA' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black italic uppercase font-mono">GALERÍA DE CAPTURAS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div 
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 aspect-video cursor-pointer"
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                    <span className="text-[10px] text-cyan-300 font-bold uppercase">{img.tag}</span>
                    <h4 className="text-xs font-bold text-white">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: MIEMBROS ================= */}
        {activeTab === 'MIEMBROS' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black italic uppercase font-mono">ROSTER DE PILOTOS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {drivers.map((drv) => (
                <div key={drv.id} className="bg-black/60 backdrop-blur-md border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={drv.avatar} alt={drv.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400" />
                    <div>
                      <h3 className="font-bold text-white text-sm">{drv.name} {drv.flag}</h3>
                      <p className="text-[11px] text-cyan-300">{drv.role}</p>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-300 bg-white/5 rounded-xl p-3 border border-white/5 font-mono space-y-1">
                    <div className="flex justify-between"><span>Sim:</span><span className="font-bold text-white">{drv.sim}</span></div>
                    <div className="flex justify-between"><span>Rating:</span><span className="font-bold text-cyan-400">{drv.rating}</span></div>
                    <div className="flex justify-between"><span>Auto:</span><span className="text-neutral-200">{drv.car}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 8: PANEL ADMIN ================= */}
        {activeTab === 'ADMIN' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto w-full">
            <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-black italic uppercase font-mono text-white">PANEL ADMINISTRADOR</h2>
              </div>
              <p className="text-xs text-neutral-300">Gestión de contenido en tiempo real para la página de Espindola Competición</p>
            </div>

            {/* EDITAR BANNER SUPERIOR */}
            <div className="bg-black/60 border border-white/15 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <h3 className="font-bold text-white text-sm">Banner de Anuncio Superior</h3>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={bannerAlert} 
                  onChange={(e) => setBannerAlert(e.target.value)}
                  placeholder="Escribe el texto de la alerta..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <button 
                  onClick={() => setBannerAlert('')}
                  className="bg-red-500/20 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold uppercase"
                >
                  Ocultar
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* FORMULARIO GESTIÓN PILOTOS */}
              <div className="bg-black/60 border border-white/15 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Añadir Nuevo Piloto</span>
                </h3>
                <form onSubmit={handleAddMember} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre del Piloto"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Rol (Ej: Piloto WRC)"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Auto Preferido"
                    value={newMember.car}
                    onChange={(e) => setNewMember({ ...newMember, car: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition">
                    Guardar Piloto
                  </button>
                </form>

                <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
                  {drivers.map((drv) => (
                    <div key={drv.id} className="flex justify-between items-center bg-white/5 p-2 rounded-xl text-xs">
                      <span className="font-bold text-white">{drv.name}</span>
                      <button onClick={() => handleDeleteMember(drv.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORMULARIO GESTIÓN EVENTOS */}
              <div className="bg-black/60 border border-white/15 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Crear Evento</span>
                </h3>
                <form onSubmit={handleAddEvent} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre del Evento"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Circuito / Especial"
                    value={newEvent.track}
                    onChange={(e) => setNewEvent({ ...newEvent, track: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Fecha y Hora"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition">
                    Publicar Evento
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 9: MI PERFIL Y CONFIGURACIÓN ================= */}
        {(activeTab === 'MI PERFIL' || activeTab === 'CONFIGURACION') && (
          <div className="max-w-md mx-auto space-y-6 animate-in fade-in duration-300 w-full">
            <div className="bg-black/70 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center shadow-2xl">
              <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400 object-cover" />
              <h2 className="text-2xl font-black text-white font-mono uppercase">{userProfile.name}</h2>
              <p className="text-xs text-cyan-400 mb-6">{userProfile.role}</p>

              <div className="space-y-4 text-left">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Nombre de Usuario</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL AMPLIACIÓN FOTOGRÁFICA */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
        >
          <img src={selectedImage} alt="Preview Captura" className="max-w-4xl max-h-[85vh] rounded-2xl border border-white/20 object-contain shadow-2xl" />
        </div>
      )}

      {/* FOOTER CON LOS AUSPICIANTES EXACTOS Y REDES SOCIALES */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-t border-white/15 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* PATROCINADORES OFICIALES EXACTOS */}
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto max-w-full text-neutral-300 font-mono text-[10px] tracking-wider uppercase whitespace-nowrap">
          <span className="flex items-center gap-1 hover:text-white transition font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" /> ESTANCIA DELESTE
          </span>
          <span className="hover:text-white transition font-bold">CORRES SIMRACING</span>
          <span className="hover:text-white transition font-bold">LUCAS HUTTER RACING FILMS</span>
          <span className="hover:text-white transition font-bold">SALDIVAR HIGH PERFORMANCE</span>
          <span className="hover:text-white transition font-bold">NACHO MOTORES</span>
          <span className="hover:text-white transition font-bold">LE GRAPHIC DESIGNER</span>
        </div>

        {/* REDES SOCIALES */}
        <div className="flex items-center gap-4 text-neutral-300">
          <a href="#instagram" title="Instagram" className="hover:text-cyan-400 transition">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#tiktok" title="TikTok" className="hover:text-cyan-400 transition">
            <TikTokIcon className="w-4 h-4" />
          </a>
          <a href="#discord" title="Discord" className="hover:text-cyan-400 transition">
            <DiscordIcon className="w-4 h-4" />
          </a>
        </div>
      </footer>

    </div>
  );
}
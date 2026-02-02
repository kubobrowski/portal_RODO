import React, { useState } from 'react';
import { 
  ShieldCheck, BookOpen, Search, ExternalLink, Lock, Shield, 
  Scale, Database, Fingerprint, FileText, Globe, AlertTriangle, 
  Eye, Info, AlertCircle, Map, CheckCircle, ChevronRight
} from 'lucide-react';

// --- KOMPONENTY POMOCNICZE ---

const ArticleCard = ({ icon: Icon, title, article, points, color, link }) => (
  <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} p-6 mb-4 hover:shadow-md transition-shadow flex flex-col h-full`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-gray-50 text-gray-700">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{article}</span>
      </div>
    </div>

    {link && (
      <div className="mb-4">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 group"
        >
          <BookOpen size={14} />
          Pełna treść (Dokument PDF/Źródło)
          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    )}

    <ul className="space-y-2 flex-grow">
      {points.map((point, index) => (
        <li key={index} className="flex gap-3 text-sm text-gray-600">
          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CountryCard = ({ c }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{c.flag}</span>
        <h3 className="font-bold text-slate-900">{c.name}</h3>
      </div>
      <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded uppercase text-slate-500">
        {c.code}
      </span>
    </div>
    
    <div className="mb-4">
      <a 
        href={c.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 group"
      >
        <BookOpen size={14} />
        {c.law}
        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>

    <ul className="space-y-2 mb-4 flex-grow">
      {c.points.map((p, j) => (
        <li key={j} className="text-xs text-slate-600 flex gap-2">
          <div className="h-1 w-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
          <span className="leading-tight">{p}</span>
        </li>
      ))}
    </ul>

    {c.warning && (
      <div className="mt-auto p-2 bg-amber-50 rounded border border-amber-100 flex gap-2 items-start">
        <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-700 leading-tight font-medium">{c.warning}</p>
      </div>
    )}
  </div>
);

// --- DANE RODO ---

const rodoArticles = [
  {
    title: "Podstawa Prawna Przetwarzania", 
    article: "Art. 6 RODO", 
    icon: Scale, 
    color: "border-blue-500",
    link: "https://gdpr.pl/baza-wiedzy/akty-prawne/interaktywny-tekst-gdpr/artykul-6-zgodnosc-przetwarzania-z-prawem",
    points: [
      "Uzasadniony interes (6.1.f): Najczęstsza podstawa w monitoringu mienia i osób.",
      "Obowiązek prawny (6.1.c): Konieczność dbania o bezpieczeństwo w transporcie.",
      "Pozwala na monitoring bez bezpośredniej zgody pracownika w określonych warunkach."
    ]
  },
  {
    title: "Zasady Przetwarzania Danych", 
    article: "Art. 5 RODO", 
    icon: Database, 
    color: "border-green-500",
    link: "https://gdpr.pl/baza-wiedzy/akty-prawne/interaktywny-tekst-gdpr/artykul-5-zasady-dotyczace-przetwarzania-danych-osobowych",
    points: [
      "Minimalizacja: Zbieranie tylko niezbędnych danych (np. brak audio).",
      "Ograniczenie celu: Monitoring wyłącznie dla bezpieczeństwa, nie inwigilacji.",
      "Prawidłowość i Poufność: Zabezpieczenie dostępu do nagrań wideo."
    ]
  },
  {
    title: "Szczególne Kategorie Danych", 
    article: "Art. 9 RODO", 
    icon: Fingerprint, 
    color: "border-red-500",
    link: "https://gdpr.pl/baza-wiedzy/akty-prawne/interaktywny-tekst-gdpr/artykul-9-przetwarzanie-szczegolnych-kategorii-danych-osobowych",
    points: [
      "Biometria: Dane pozwalające na jednoznaczną identyfikację osoby fizycznej.",
      "Wyzwanie AI: Systemy DMS analizujące zmęczenie a przetwarzanie biometryczne.",
      "Zasada: Zakaz przetwarzania, chyba że zachodzą ścisłe wyjątki."
    ]
  },
  {
    title: "Ocena Skutków (DPIA)", 
    article: "Art. 35 RODO", 
    icon: FileText, 
    color: "border-purple-500",
    link: "https://gdpr.pl/baza-wiedzy/akty-prawne/interaktywny-tekst-gdpr/artykul-35-ocena-skutkow-dla-ochrony-danych",
    points: [
      "Obowiązek DPIA: Przy systematycznym monitorowaniu na dużą skalę.",
      "Analiza ryzyka: Dokumentowanie środków zapobiegających wyciekom danych.",
      "Kluczowy dokument dla administratorów flot transportowych."
    ]
  },
  {
    title: "Przepisy Krajowe w Zatrudnieniu", 
    article: "Wytyczne EDPB 3/2019", 
    icon: Globe, 
    color: "border-yellow-500",
    link: "https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201903_video_devices_pl.pdf",
    points: [
      "Oficjalna wykładnia: Wytyczne w sprawie monitoringu wideo w UE.",
      "Interpretacja Art. 88: Jak państwa członkowskie mogą regulować pracę.",
      "Zasady przejrzystości i proporcjonalności na stanowisku pracy."
    ]
  }
];

// --- DANE KRAJOWE ---

const allCountries = [
  {
    name: "Polska", flag: "🇵🇱", code: "PL", law: "Kodeks Pracy Art. 22[2]",
    link: "https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/kodeks-pracy-16789274/art-22-2",
    points: [
      "Bezwzględny zakaz nagrywania dźwięku (audio) w ramach monitoringu wizyjnego.",
      "Obowiązek poinformowania pracowników o wprowadzeniu monitoringu na co najmniej 14 dni przed jego uruchomieniem.",
      "Nagrywanie audio w kabinie pojazdu uznawane jest za naruszenie dóbr osobistych."
    ]
  },
  {
    name: "Niemcy", flag: "🇩🇪", code: "DE", law: "BDSG § 26 / BetrVG",
    link: "https://www.gesetze-im-internet.de/bdsg_2018/__26.html",
    points: [
      "Kluczowa rola Rad Pracowniczych (Betriebsrat) – wymagana jest ich zgoda przed montażem systemów monitorujących.",
      "Zakaz prowadzenia stałej inwigilacji zachowań pracowników."
    ]
  },
  {
    name: "Hiszpania", flag: "🇪🇸", code: "ES", law: "LOPDGDD Art. 89",
    link: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a89",
    points: [
      "Ustawowe prawo pracownika do „odłączenia cyfrowego” (digital detachment).",
      "Obowiązek powiadomienia związków zawodowych o monitoringu.",
      "Wymóg instalacji wyłącznika kamer w strefach noclegowych kabin."
    ]
  },
  {
    name: "Włochy", flag: "🇮🇹", code: "IT", law: "Statuto dei Lavoratori Art. 4",
    link: "https://www.brocardi.it/statuto-lavoratori/titolo-i/art4.html",
    points: [
      "Konieczność uzyskania uprzedniej zgody Inspektoratu Pracy (INL).",
      "Surowe kary karne za prowadzenie monitoringu z pominięciem procedur.",
      "Zdalna kontrola dopuszczalna wyłącznie dla celów technicznych i produkcyjnych."
    ]
  },
  {
    name: "Francja", flag: "🇫🇷", code: "FR", law: "Code du Travail L1121-1",
    link: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900785",
    points: [
      "Obowiązkowa konsultacja z komitetem ekonomiczno-społecznym (CSE).",
      "Organ nadzorczy (CNIL) zakazuje wykorzystywania wideo-monitoringu do kontroli stylu jazdy."
    ]
  },
  {
    name: "Luksemburg", flag: "🇱🇺", code: "LU", law: "Art. L. 261-1 Code du Travail",
    link: "https://cnpd.public.lu/fr/dossiers-thematiques/surveillance/videosurveillance/article2611.html",
    points: [
      "Obowiązek powiadomienia krajowego organu ochrony danych (CNPD).",
      "Zakaz prowadzenia monitoringu ukierunkowanego na śledzenie pojedynczych osób."
    ]
  },
  {
    name: "Belgia", flag: "🇧🇪", code: "BE", law: "CAO nr 68",
    link: "https://www.cnt-nar.be/fr/conventions-collectives-de-travail/convention-collective-de-travail-n-68",
    points: [
      "Monitoring nie może być ciągły – dopuszczalny jest jedynie monitoring „intermittent” (przerywany).",
      "Wymagana zgoda Rady Zakładowej oraz przeprowadzenie testu proporcjonalności przed wdrożeniem."
    ]
  },
  {
    name: "Holandia", flag: "🇳🇱", code: "NL", law: "UAVG / Wytyczne AP",
    link: "https://wetten.overheid.nl/BWBR0040940/",
    points: [
      "Pracodawca musi dowieść, że nie istnieją alternatywne, mniej ingerujące w prywatność metody osiągnięcia celu.",
      "Wymagana zgoda Rady Pracowniczej (OR).",
      "Bardzo rygorystyczna ocena systemów AI analizujących skupienie pracownika."
    ]
  },
  {
    name: "Austria", flag: "🇦🇹", code: "AT", law: "DSG § 12 / ArbVG",
    link: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597",
    points: [
      "Monitoring musi służyć ochronie godności ludzkiej.",
      "Wymóg zawarcia pisemnej umowy zakładowej regulującej zasady kontroli."
    ]
  },
  {
    name: "Finlandia", flag: "🇫🇮", code: "FI", law: "Privacy in Working Life Act",
    link: "https://www.finlex.fi/fi/laki/ajantasa/2004/20040759",
    points: [
      "Całkowity zakaz instalowania kamer w sypialniach (kabinach) oraz strefach osobistych."
    ]
  },
  {
    name: "Szwecja", flag: "🇸🇪", code: "SE", law: "Kamerabevakningslag",
    link: "https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/kamerabevakningslag-20181200_sfs-2018-1200",
    points: [
      "Wymóg przeprowadzenia bardzo rygorystycznej oceny skutków dla ochrony danych (DPIA).",
      "Nagrywanie dźwięku (audio) jest traktowane jak podsłuch i podlega przepisom kodeksu karnego."
    ]
  },
  {
    name: "Dania", flag: "🇩🇰", code: "DK", law: "TV-overvågningsloven",
    link: "https://www.retsinformation.dk/eli/lft/2007/1/140",
    points: [
      "Obowiązek poinformowania o monitoringu z 14-dniowym wyprzedzeniem.",
      "Monitoring musi być uzasadniony „istotnym powodem”."
    ]
  },
  {
    name: "Litwa", flag: "🇱🇹", code: "LT", law: "ADTAĮ Art. 32",
    link: "https://e-seimas.lrs.lt/portal/legalAct/lt/TAD/TAIS.27702",
    points: [
      "Obowiązek prowadzenia wewnętrznego rejestru przez administratora danych.",
      "Wymóg stosowania bardzo wyraźnych i czytelnych piktogramów informacyjnych."
    ]
  },
  {
    name: "Estonia", flag: "🇪🇪", code: "EE", law: "IKS § 14",
    link: "https://www.riigiteataja.ee/en/eli/523012019001/status",
    points: [
      "Zakaz wglądu w obraz ze strefy nocnej pracownika.",
      "Wymagane odebranie od pracowników pisemnych oświadczeń o zapoznaniu się z zasadami."
    ]
  },
  {
    name: "Portugalia", flag: "🇵🇹", code: "PT", law: "Código do Trabalho Art. 20",
    link: "https://dre.pt/dre/legislacao-consolidada/lei/2009-34546475",
    points: [
      "Obowiązek zgłoszenia systemów do organu CNPD.",
      "Bezwzględny zakaz wykorzystywania monitoringu do kontroli tempa pracy.",
      "Dane mogą być zbierane wyłącznie dla celów bezpieczeństwa."
    ]
  },
  {
    name: "Grecja", flag: "🇬🇷", code: "GR", law: "HDPA Dir 1/2011",
    link: "https://www.dpa.gr/en/legal-framework/national-legislation",
    points: [
      "Monitoring twarzy dopuszczalny tylko w sytuacjach wysokiego ryzyka napadu.",
      "Kamera nie może być skierowana w sposób ciągły bezpośrednio na twarz pracownika."
    ]
  },
  {
    name: "Czechy", flag: "🇨🇿", code: "CZ", law: "Zákoník práce § 316",
    link: "https://www.zakonyprolidi.cz/cs/2006-262",
    points: [
      "Obowiązek bezpośredniego i indywidualnego powiadomienia np. kierowcy o kontroli.",
      "Monitoring musi być uznany za absolutnie niezbędny."
    ]
  },
  {
    name: "Słowacja", flag: "🇸🇰", code: "SK", law: "Zákoník pracy § 13",
    link: "https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2001/311/",
    points: [
      "Monitoring podlega regularnym kontrolom lokalnego Inspektoratu Pracy.",
      "Zakres ograniczony ściśle do ochrony mienia i bezpieczeństwa osób."
    ]
  }
];

// --- GŁÓWNA APLIKACJA ---

export default function App() {
  const [activeTab, setActiveTab] = useState('atlas');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = allCountries.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nawigacja Top */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600 w-8 h-8" />
              <span className="font-black text-xl tracking-tight hidden sm:inline uppercase">Monitorowanie UE</span>
            </div>
            
            <div className="flex gap-1">
              <button 
                onClick={() => setActiveTab('atlas')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'atlas' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Atlas Krajów
              </button>
              <button 
                onClick={() => setActiveTab('articles')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                RODO / EDPB
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black flex items-center justify-center md:justify-start gap-3">
                {activeTab === 'atlas' ? <Map className="text-blue-600" /> : <Shield className="text-blue-600" />}
                {activeTab === 'atlas' ? "Standardy Krajowe (18 Państw)" : "Wytyczne Ogólnoeuropejskie"}
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                {activeTab === 'atlas' 
                  ? "Szczegółowe wytyczne dla 18 rynków europejskich z odnośnikami do ustaw." 
                  : "Dostęp do artykułów RODO oraz oficjalnych wytycznych EDPB."}
              </p>
            </div>
            
            {activeTab === 'atlas' && (
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filtruj listę krajów..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Treść Główna */}
      <main className="max-w-7xl mx-auto p-4 py-8">
        {activeTab === 'articles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rodoArticles.map((art, idx) => <ArticleCard key={idx} {...art} />)}
            
            <div className="md:col-span-2 lg:col-span-3 mt-4 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 shadow-sm items-center">
              <Info className="text-blue-600 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-blue-900 text-lg">Zalecenie: Wytyczne EDPB 3/2019</h4>
                <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                  Podlinkowany dokument PDF to kluczowa interpretacja dla systemów DMS i monitoringu wideo. Definiuje on m.in. zasady "Privacy by Design" w kabinach pojazdów.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((c, i) => <CountryCard key={i} c={c} />)}
            </div>
            {filteredCountries.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-xl font-medium">Brak wyników dla szukanej frazy.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Stopka */}
      <section className="max-w-7xl mx-auto p-4 mb-24">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lock className="text-blue-400" /> Wymogi Projektowe (UE)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <CheckCircle className="text-blue-400 mb-2" size={24} />
                <p className="font-bold text-white text-xs uppercase tracking-widest mb-1">Local Edge AI</p>
                <p className="text-xs text-slate-400">Analiza danych bez wysyłania strumienia wideo do chmury.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <CheckCircle className="text-blue-400 mb-2" size={24} />
                <p className="font-bold text-white text-xs uppercase tracking-widest mb-1">Privacy Zones</p>
                <p className="text-xs text-slate-400">Maskowanie twarzy i automatyczne wyłączanie w czasie przerw.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <CheckCircle className="text-blue-400 mb-2" size={24} />
                <p className="font-bold text-white text-xs uppercase tracking-widest mb-1">No Audio Track</p>
                <p className="text-xs text-slate-400">Absolutny zakaz rejestracji głosu (wymóg krytyczny w PL i SE).</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <CheckCircle className="text-blue-400 mb-2" size={24} />
                <p className="font-bold text-white text-xs uppercase tracking-widest mb-1">Safety Label</p>
                <p className="text-xs text-slate-400">Czytelne oznaczenie kabiny zgodnie z wymogami prawnymi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nawigacja Mobilna */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-200 rounded-full p-2 flex gap-1 z-50">
        <button onClick={() => setActiveTab('atlas')} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'atlas' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500'}`}>Atlas</button>
        <button onClick={() => setActiveTab('articles')} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'articles' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500'}`}>Wytyczne</button>
      </div>
    </div>
  );
}
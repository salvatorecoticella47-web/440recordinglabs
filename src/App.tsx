import { Music, Phone, Mail, Clock, Star, Instagram, Youtube } from 'lucide-react';
import { useEffect, useRef, useMemo } from 'react';

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Palette di colori per ogni giorno della settimana
  const colorThemes = useMemo(() => [
    { hex: '#E30613', rgb: 'rgb(227, 6, 19)' }, // Lunedì - Rosso
    { hex: '#FFED00', rgb: 'rgb(255, 237, 0)' }, // Martedì - Giallo
    { hex: '#009640', rgb: 'rgb(0, 150, 64)' }, // Mercoledì - Verde
    { hex: '#312783', rgb: 'rgb(49, 39, 131)' }, // Giovedì - Blu scuro
    { hex: '#E6007E', rgb: 'rgb(230, 0, 126)' }, // Venerdì - Magenta
    { hex: '#00CFFF', rgb: 'rgb(0, 207, 255)' }, // Sabato - Ciano
    { hex: '#009FE3', rgb: 'rgb(0, 159, 227)' }, // Domenica - Blu
  ], []);

  // Calcola quale tema usare in base al giorno della settimana
  const currentTheme = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domenica, 1 = Lunedì, ..., 6 = Sabato
    // Riorganizza per avere Lunedì come giorno 0
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return colorThemes[adjustedDay];
  }, [colorThemes]);

  const getHoverBgColorClass = () => {
    const rgb = currentTheme.rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const darkerRgb = rgb.map(v => Math.max(0, v - 30));
    return `rgb(${darkerRgb.join(', ')})`;
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <nav className="fixed w-full bg-neutral-900/95 backdrop-blur-sm z-50 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/Immagine_WhatsApp_2025-12-01_ore_22.30.48_4c171728-removebg-preview.png" alt="440RecordingLab Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              <span className="text-lg sm:text-2xl font-bold text-white">440RecordingLab</span>
            </div>
            <a
              href="#contatti"
              className="text-white px-4 py-2 sm:px-6 text-sm sm:text-base rounded-full font-semibold transition-all transform hover:scale-105"
              style={{ backgroundColor: currentTheme.hex }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
            >
              Contattaci
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="text-white">Porta la tua musica</span> <span style={{ color: currentTheme.hex }}>a un livello superiore</span> <span className="text-white">con</span>{' '}
            <span style={{ color: currentTheme.hex }}>440RecordingLab</span>
          </h1>
          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-8 px-2">
            Mix e Mastering professionale, in presenza e online.
          </p>
          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Qualità audio impeccabile, esperienza decennale nel settore, con un fonico che sa cosa fa.
          </p>

          <div className="scroll-reveal opacity-0 scale-90 transition-all duration-1000 ease-out delay-300 bg-neutral-800 rounded-2xl overflow-hidden mb-6 sm:mb-8 max-w-4xl mx-auto border border-neutral-700 shadow-lg">
            <img
              src="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Studio di registrazione professionale con attrezzature di ultima generazione"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <p className="text-gray-400 italic text-sm sm:text-base p-4 sm:p-6 text-center">
              Studio di registrazione professionale con attrezzature di ultima generazione
            </p>
          </div>

          <a
            href="#contatti"
            className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-500 inline-block text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:scale-105 shadow-2xl"
            style={{ backgroundColor: currentTheme.hex }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
          >
            Prenota la tua sessione ora!
          </a>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-10 px-2">
            <span className="text-white">Perché scegliere</span> <span style={{ color: currentTheme.hex }}>440RecordingLab</span><br /><span className="text-white">per il tuo</span> <span style={{ color: currentTheme.hex }}>Mix & Mastering?</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="scroll-reveal opacity-0 -translate-x-8 transition-all duration-1000 ease-out bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md md:flex-1">
              <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-center" style={{ color: currentTheme.hex }}>68%</div>
              <p className="text-sm sm:text-base text-gray-300 text-justify">
                dei musicisti e produttori indipendenti tenta di fare mix e mastering da soli, ma solo il 10% ottiene risultati professionali.
              </p>
            </div>

            <div className="scroll-reveal opacity-0 scale-90 transition-all duration-1000 ease-out delay-200 bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md md:flex-1">
              <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-center" style={{ color: currentTheme.hex }}>100%</div>
              <p className="text-sm sm:text-base text-gray-300 text-justify">
                Un mix e mastering professionale può fare la differenza tra una traccia che suona piatta e una che cattura l'ascoltatore.
              </p>
            </div>

            <div className="scroll-reveal opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-300 bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md md:flex-1">
              <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-center" style={{ color: currentTheme.hex }}>+45%</div>
              <p className="text-sm sm:text-base text-gray-300 text-justify">
                I brani che hanno ricevuto un mastering professionale sono il 45% più ascoltati sulle piattaforme di streaming.
              </p>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400 bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-justify">
              Nonostante l'accesso a software e tutorial online, il mix e mastering fai-da-te non garantisce una qualità all'altezza delle tue aspettative. <span className="font-semibold" style={{ color: currentTheme.hex }}>440RecordingLab</span> offre un servizio completo che ti permette di ottenere il massimo dalla tua musica, sia con sessioni in presenza che online. Con un fonico di esperienza decennale nel settore, utilizziamo attrezzature professionali per garantirti il suono perfetto che farà spiccare la tua traccia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="scroll-reveal opacity-0 -translate-x-12 transition-all duration-1000 ease-out text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
                <span className="text-white">Salvatore</span> <span style={{ color: currentTheme.hex }}>Coticella</span>
              </h2>
              <h3 className="scroll-reveal opacity-0 -translate-x-12 transition-all duration-1000 ease-out delay-100 text-lg sm:text-xl md:text-2xl text-gray-400 mb-4 sm:mb-6">Fonico con 10 Anni di Esperienza</h3>

              <p className="scroll-reveal opacity-0 -translate-x-12 transition-all duration-1000 ease-out delay-200 text-base sm:text-lg text-gray-400 mb-4 sm:mb-6 leading-relaxed text-justify">
                Salvatore Coticella è il cuore pulsante di 440RecordingLab. Con oltre 10 anni di esperienza nel settore musicale, ha collaborato con artisti e band di vari generi, creando mix e mastering che fanno la differenza. La sua passione per il suono e la cura per ogni dettaglio lo hanno reso una figura di riferimento per chi cerca un audio di qualità superiore.
              </p>

              <div className="scroll-reveal opacity-0 -translate-x-12 transition-all duration-1000 ease-out delay-300 bg-neutral-800 border-l-4 p-4 sm:p-6 rounded-r-xl shadow-md" style={{ borderColor: currentTheme.hex }}>
                <p className="text-base sm:text-xl italic text-gray-400 mb-3 sm:mb-4">
                  "Ogni progetto è unico. Il mio obiettivo è far emergere il meglio di ogni traccia, garantendo una qualità sonora che parli da sé."
                </p>
                <p className="font-semibold text-sm sm:text-base" style={{ color: currentTheme.hex }}>– Salvatore Coticella, Fonico</p>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="scroll-reveal opacity-0 translate-x-12 rotate-3 transition-all duration-1000 ease-out">
                <img
                  src="/Immagine WhatsApp 2025-12-01 ore 22.02.42_60fb7b33.jpg"
                  alt="Salvatore Coticella - Fonico Professionista"
                  className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-2xl border-4 border-neutral-700 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 px-2">
            <span className="text-white">Ascolta i Nostri</span> <span style={{ color: currentTheme.hex }}>Lavori</span>
          </h2>
          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 text-base sm:text-lg text-gray-300 text-center mb-8 sm:mb-16 max-w-3xl mx-auto px-2">
            Scopri la qualità del nostro mix e mastering attraverso i progetti che abbiamo realizzato
          </p>

          <div className="text-center">
            <a
              href="https://open.spotify.com/playlist/5C5EBVgz1ZTAQHQfzZLpc1?si=95a165904a2843e8"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal opacity-0 scale-90 transition-all duration-1000 ease-out inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <Music className="w-6 h-6" />
              <span>Ascolta la Playlist Completa su Spotify</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-10 px-2">
            <span className="text-white">Cosa Dicono i Nostri</span> <span style={{ color: currentTheme.hex }}>Clienti</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md">
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentTheme.hex, fill: currentTheme.hex }} />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic text-justify">
                "Lavorare con Salvatore è stato un piacere. Il mio brano è diventato un altro livello! Suona potente e chiaro come non mai."
              </p>
              <p className="font-semibold text-sm sm:text-base" style={{ color: currentTheme.hex }}>– Marco Rossi, Musicista</p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md">
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentTheme.hex, fill: currentTheme.hex }} />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic text-justify">
                "Ho fatto mix e mastering online con 440RecordingLab e il risultato è incredibile. La qualità è superiore a qualsiasi cosa avessi ottenuto da solo."
              </p>
              <p className="font-semibold text-sm sm:text-base" style={{ color: currentTheme.hex }}>– Francesca Bellini, Produttrice</p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-300 bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md sm:col-span-2 lg:col-span-1">
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentTheme.hex, fill: currentTheme.hex }} />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 italic text-justify">
                "La mia traccia è diventata radiofonica grazie al lavoro di Salvatore. Il suo orecchio è insuperabile."
              </p>
              <p className="font-semibold text-sm sm:text-base" style={{ color: currentTheme.hex }}>– Davide Galli, Cantautore</p>
            </div>
          </div>

          <div className="text-center px-2">
            <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-400 text-lg sm:text-2xl text-gray-300 mb-4 sm:mb-6">
              Vuoi far parte della nostra storia?
            </p>
            <a
              href="#contatti"
              className="scroll-reveal opacity-0 scale-90 transition-all duration-1000 ease-out delay-500 inline-block text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-xl font-bold hover:scale-105"
              style={{ backgroundColor: currentTheme.hex }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
            >
              Prenota una sessione di mix e mastering e fai brillare la tua musica!
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="scroll-reveal opacity-0 scale-95 transition-all duration-1000 ease-out text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 px-2">
            <span className="text-white">Porta la Tua Musica al</span> <span style={{ color: currentTheme.hex }}>Successo!</span>
          </h2>
          <h3 className="scroll-reveal opacity-0 scale-95 transition-all duration-1000 ease-out delay-100 text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8 px-2">
            Prenota Ora il Tuo Mix & Mastering Professionale
          </h3>

          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto text-justify px-2">
            Non lasciare che il tuo progetto resti incompleto. Con 440RecordingLab, avrai il supporto di un fonico esperto che farà risplendere ogni nota, ogni sfumatura della tua musica. Che tu scelga il servizio in presenza o online, otterrai sempre un risultato impeccabile.
          </p>

          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
            Contattaci ora e prendi il tuo posto nella musica di qualità. Ogni traccia merita di essere ascoltata al meglio.
          </p>

          <a
            href="#contatti"
            className="scroll-reveal opacity-0 scale-90 transition-all duration-1000 ease-out delay-500 inline-block text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl font-bold hover:scale-105 shadow-2xl"
            style={{ backgroundColor: currentTheme.hex }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
          >
            Prenota la Tua Sessione
          </a>
        </div>
      </section>

      <section id="contatti" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-10 px-2">
            <span className="text-white">Contattaci</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="scroll-reveal opacity-0 -translate-x-12 transition-all duration-1000 ease-out delay-200">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" style={{ color: currentTheme.hex }} />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Telefono</h3>
                    <a href="tel:3315266290" className="text-gray-300 hover:opacity-80 text-base sm:text-lg break-all" style={{ color: 'rgb(209, 213, 219)' }} onMouseEnter={(e) => e.currentTarget.style.color = currentTheme.hex} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(209, 213, 219)'}>
                      3315266290
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" style={{ color: currentTheme.hex }} />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Email</h3>
                    <a href="mailto:info@440recordinglab.com" className="text-gray-300 hover:opacity-80 text-base sm:text-lg break-all" style={{ color: 'rgb(209, 213, 219)' }} onMouseEnter={(e) => e.currentTarget.style.color = currentTheme.hex} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(209, 213, 219)'}>
                      info@440recordinglab.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" style={{ color: currentTheme.hex }} />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">Orari di Apertura</h3>
                    <div className="text-gray-300 space-y-1 text-sm sm:text-base">
                      <p>Lunedì - Venerdì: 9:00 - 20:00</p>
                      <p>Sabato: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal opacity-0 translate-x-12 transition-all duration-1000 ease-out delay-300">
              <form className="bg-neutral-800 p-6 sm:p-8 rounded-xl border border-neutral-700 shadow-md">
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-white">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-neutral-700 rounded-lg focus:ring-2 focus:border-transparent outline-none text-white text-sm sm:text-base"
                    style={{ '--tw-ring-color': currentTheme.hex } as React.CSSProperties}
                    placeholder="Il tuo nome"
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-neutral-700 rounded-lg focus:ring-2 focus:border-transparent outline-none text-white text-sm sm:text-base"
                    style={{ '--tw-ring-color': currentTheme.hex } as React.CSSProperties}
                    placeholder="tua@email.com"
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-white">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-neutral-700 rounded-lg focus:ring-2 focus:border-transparent outline-none text-white text-sm sm:text-base"
                    style={{ '--tw-ring-color': currentTheme.hex } as React.CSSProperties}
                    placeholder="Il tuo numero"
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="service" className="block text-sm font-semibold mb-2 text-white">
                    Tipo di Servizio *
                  </label>
                  <select
                    id="service"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-neutral-700 rounded-lg focus:ring-2 focus:border-transparent outline-none text-white text-sm sm:text-base"
                    style={{ '--tw-ring-color': currentTheme.hex } as React.CSSProperties}
                  >
                    <option value="">Seleziona un servizio</option>
                    <option value="online">Mix & Mastering Online</option>
                    <option value="studio">Sessione in Studio</option>
                    <option value="both">Mix & Mastering + Registrazione</option>
                  </select>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-neutral-700 rounded-lg focus:ring-2 focus:border-transparent outline-none text-white text-sm sm:text-base"
                    style={{ '--tw-ring-color': currentTheme.hex } as React.CSSProperties}
                    placeholder="Raccontaci del tuo progetto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-all transform hover:scale-105"
                  style={{ backgroundColor: currentTheme.hex }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
                >
                  Invia Richiesta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 px-2">
            <span className="text-white">Seguici sui</span> <span style={{ color: currentTheme.hex }}>Social</span>
          </h2>
          <p className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 px-2">
            Resta aggiornato sui nostri progetti e scopri i dietro le quinte del nostro lavoro
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a
              href="https://www.instagram.com/440_recordinglab?igsh=MWYxNHkycG5jMWNlcA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal opacity-0 -translate-x-8 transition-all duration-1000 ease-out delay-200 group flex items-center space-x-3 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
              style={{ backgroundColor: currentTheme.hex }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getHoverBgColorClass()}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentTheme.hex}
            >
              <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.youtube.com/channel/UC3QY-yeKvdwZtW42kciZUOA"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 group flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
            >
              <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>YouTube</span>
            </a>

            <a
              href="https://open.spotify.com/playlist/5C5EBVgz1ZTAQHQfzZLpc1?si=95a165904a2843e8"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-400 group flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
            >
              <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Spotify</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 py-6 sm:py-8 px-4 border-t border-neutral-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; 2024 440RecordingLab. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

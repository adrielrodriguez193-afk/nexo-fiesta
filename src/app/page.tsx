"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────── NAVBAR ───────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#hero" },
    { label: "Lineup", href: "#lineup" },
    { label: "Galería", href: "#gallery" },
    { label: "Entradas", href: "#tickets" },
    { label: "Ubicación", href: "#location" },
    { label: "Nosotros", href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#830000]/30"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex items-center justify-between h-16 md:h-20" style={{ padding: "0 1.5rem" }}>
        <a href="#hero" className="font-horizon text-2xl md:text-3xl tracking-wider text-[#FFFDEF] hover:text-[#830000] transition-colors">
          NEXO
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-archivo text-xs uppercase tracking-[0.2em] text-[#D3D3D3] hover:text-[#830000] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#FFFDEF] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#FFFDEF] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#FFFDEF] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0E0E0E]/98 backdrop-blur-xl`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-archivo text-sm uppercase tracking-[0.2em] text-[#D3D3D3] hover:text-[#830000] transition-colors py-2 border-b border-[#830000]/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ───────────── DISCO BALL SVG ───────────── */
function DiscoBall({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ballGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#D3D3D3" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#888" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#444" stopOpacity="0.4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="100" cy="100" r="85" fill="url(#ballGrad)" filter="url(#glow)" />
      {/* Mirror tiles */}
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => {
          const angle = (col / 16) * Math.PI * 2;
          const yPos = 25 + (row / 12) * 150;
          const radius = Math.sin((row / 12) * Math.PI) * 80;
          const x = 100 + Math.cos(angle) * radius;
          const opacity = 0.15 + Math.random() * 0.4;
          return (
            <rect
              key={`${row}-${col}`}
              x={x - 4}
              y={yPos - 4}
              width="8"
              height="8"
              rx="1"
              fill={`rgba(255,255,255,${opacity})`}
              transform={`rotate(${(angle * 180) / Math.PI}, ${x}, ${yPos})`}
            />
          );
        })
      )}
      <line x1="100" y1="0" x2="100" y2="15" stroke="#D3D3D3" strokeWidth="2" />
    </svg>
  );
}

/* ───────────── COUNTDOWN ───────────── */
function Countdown({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "DÍAS", value: time.days },
    { label: "HORAS", value: time.hours },
    { label: "MIN", value: time.mins },
    { label: "SEG", value: time.secs },
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#830000]/30 border border-[#830000]/50 flex items-center justify-center backdrop-blur-sm">
            <span className="font-horizon text-2xl sm:text-3xl text-[#FFFDEF]" suppressHydrationWarning>
              {mounted ? String(u.value).padStart(2, "0") : "00"}
            </span>
          </div>
          <span className="font-archivo text-[10px] sm:text-xs tracking-[0.15em] text-[#D3D3D3]" style={{ marginTop: "0.75rem" }}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────────── HERO ───────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(ballRef.current, { scale: 0, rotation: -180, duration: 1.5, ease: "elastic.out(1, 0.5)" })
        .from(titleRef.current, { y: 80, opacity: 0, duration: 1 }, "-=0.8")
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(countdownRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(ctaRef.current, { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");

      // Parallax on ball
      gsap.to(ballRef.current, {
        y: 100,
        rotation: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Red gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#830000]/20 via-[#0E0E0E] to-[#0E0E0E]" />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#830000]/15 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 pt-20 sm:pt-24">
        <div ref={ballRef} className="float">
          <DiscoBall className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-2xl" />
        </div>

        <h1
          ref={titleRef}
          className="font-horizon text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-wider text-[#FFFDEF] leading-none"
        >
          NEXO
        </h1>

        <p
          ref={subtitleRef}
          className="font-archivo text-sm sm:text-lg md:text-xl tracking-[0.3em] uppercase text-[#D3D3D3]"
        >
          La fiesta que conecta todo
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 text-[#830000]">
          <span className="font-archivo text-base sm:text-lg tracking-wider">SÁB 16 MAYO 2026</span>
          <span className="hidden sm:block text-[#D3D3D3]/30">|</span>
          <span className="font-archivo text-base sm:text-lg tracking-wider">23:59 HS</span>
          <span className="hidden sm:block text-[#D3D3D3]/30">|</span>
          <span className="font-archivo text-base sm:text-lg tracking-wider">BUENOS AIRES</span>
        </div>

        <div ref={countdownRef}>
          <Countdown targetDate="2026-05-16T23:59:00" />
        </div>

        <a
          ref={ctaRef}
          href="#tickets"
          className="mt-4 px-10 py-4 bg-[#830000] text-[#FFFDEF] font-archivo text-sm sm:text-base uppercase tracking-[0.25em] rounded-full hover:bg-[#a01010] transition-all duration-300 pulse-glow hover:scale-105"
        >
          Conseguí tu entrada
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-archivo text-[10px] tracking-[0.3em] text-[#D3D3D3]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#830000] to-transparent" />
      </div>
    </section>
  );
}

/* ───────────── LINEUP ───────────── */
const DJS = [
  { name: "DJ ORION", role: "WARM UP", time: "00:00" },
  { name: "LUNA ROJA", role: "RESIDENT", time: "01:00" },
  { name: "VALENTINO", role: "HEADLINER", time: "02:00" },
  { name: "ZAFIRO", role: "B2B SET", time: "03:00" },
  { name: "NOCHE", role: "CLOSING", time: "04:00" },
];

function LineupSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lineup-title", {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".dj-card").forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="lineup" ref={sectionRef} className="relative py-32 sm:py-44 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 " style={{ marginBottom: "5rem" }}>
          <div className="w-12 h-px bg-[#830000]" />
          <h2 className="lineup-title font-horizon text-4xl sm:text-6xl md:text-7xl text-[#FFFDEF] tracking-wider">
            LINEUP
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {DJS.map((dj, i) => (
            <div
              key={dj.name}
              className="dj-card group flex items-center justify-between py-8 sm:py-10 border-b border-[#830000]/20 hover:border-[#830000] transition-all duration-500 cursor-pointer hover:pl-4"
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="font-archivo text-xs text-[#830000] w-14">{dj.time}</span>
                <div>
                  <h3 className="font-horizon text-2xl sm:text-4xl md:text-5xl text-[#FFFDEF] group-hover:text-[#830000] transition-colors duration-300">
                    {dj.name}
                  </h3>
                  <span className="font-archivo text-[10px] sm:text-xs tracking-[0.2em] text-[#D3D3D3]/60">
                    {dj.role}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-[#830000]/30 flex items-center justify-center group-hover:bg-[#830000] transition-all duration-300">
                <svg
                  className="w-3 h-3 text-[#830000] group-hover:text-[#FFFDEF] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── GALLERY ───────────── */
const GALLERY_IMAGES = [
  { src: "/gallery/1.JPG", alt: "Fiesta NEXO", span: "col-span-2 row-span-2", aspect: "" },
  { src: "/gallery/2.JPG", alt: "DJ Set", span: "", aspect: "" },
  { src: "/gallery/3.JPG", alt: "Crowd", span: "", aspect: "" },
  { src: "/gallery/4.JPG", alt: "Luces", span: "col-span-2 row-span-2", aspect: "" },
  { src: "/gallery/5.JPG", alt: "Disco ball", span: "", aspect: "" },
  { src: "/gallery/6.JPG", alt: "Noche", span: "", aspect: "" },
];

function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-title", {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative px-4 sm:px-8 lg:px-12" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-end gap-4 " style={{ marginBottom: "5rem" }}>
          <h2 className="gallery-title font-horizon text-4xl sm:text-6xl md:text-7xl text-[#FFFDEF] tracking-wider">
            GALERÍA
          </h2>
          <div className="w-12 h-px bg-[#830000]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`gallery-item ${img.span} relative overflow-hidden rounded-lg group cursor-pointer ${img.aspect || "aspect-square"}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ───────────── TICKETS ───────────── */
const TICKETS = [
  {
    tier: "EARLY BIRD",
    price: "$5.000",
    perks: ["Acceso general", "1 trago de bienvenida"],
    available: true,
    highlight: false,
  },
  {
    tier: "GENERAL",
    price: "$8.000",
    perks: ["Acceso general", "2 tragos incluidos", "Pulsera NEXO"],
    available: true,
    highlight: true,
  },
  {
    tier: "VIP",
    price: "$15.000",
    perks: ["Acceso VIP + lounge", "Barra libre hasta 02:00", "Meet & greet DJs", "Pulsera exclusiva"],
    available: true,
    highlight: false,
  },
];

function TicketsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ticket-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".ticket-title",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".ticket-card").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tickets" ref={sectionRef} className="relative noise-bg" style={{ paddingTop: "8rem", paddingBottom: "8rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#830000]/5 to-transparent" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="ticket-title text-center" style={{ marginBottom: "5rem" }}>
          <h2 className="font-horizon text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFDEF] tracking-wider mb-4">
            ENTRADAS
          </h2>
          <p className="font-archivo text-xs sm:text-sm tracking-[0.2em] text-[#D3D3D3]/60">
            ASEGURÁ TU LUGAR — CUPOS LIMITADOS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TICKETS.map((t) => (
            <div
              key={t.tier}
              className={`ticket-card relative flex flex-col rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
                t.highlight
                  ? "bg-[#830000]/15 border-[#830000] shadow-lg shadow-[#830000]/20"
                  : "bg-[#0E0E0E]/80 border-[#D3D3D3]/10 hover:border-[#830000]/50"
              }`}
              style={{ padding: "2.5rem 2rem" }}
            >
              {t.highlight && (
                <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#830000]" style={{ top: "-0.75rem", padding: "0.25rem 1.25rem", whiteSpace: "nowrap" }}>
                  <span className="font-archivo text-[10px] tracking-[0.2em] text-[#FFFDEF]">MÁS ELEGIDA</span>
                </div>
              )}

              <span className="font-archivo text-xs tracking-[0.25em] text-[#D3D3D3]/60">{t.tier}</span>
              <span className="font-horizon text-3xl sm:text-4xl text-[#FFFDEF]" style={{ marginTop: "1rem", marginBottom: "2rem" }}>{t.price}</span>

              <ul className="flex flex-col gap-4 flex-1" style={{ marginBottom: "2.5rem", paddingLeft: "0.5rem" }}>
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#830000] shrink-0" />
                    <span className="font-archivo text-sm text-[#D3D3D3]/80">{p}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-full font-archivo text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  t.highlight
                    ? "bg-[#830000] text-[#FFFDEF] hover:bg-[#a01010]"
                    : "border border-[#830000]/50 text-[#FFFDEF] hover:bg-[#830000] hover:border-[#830000]"
                }`}
                style={{ padding: "1rem 0" }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── LOCATION ───────────── */
function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="relative" style={{ paddingTop: "10rem", paddingBottom: "8rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4" style={{ marginBottom: "5rem" }}>
          <div className="w-12 h-px bg-[#830000]" />
          <h2 className="font-horizon text-4xl sm:text-6xl md:text-7xl text-[#FFFDEF] tracking-wider">
            UBICACIÓN
          </h2>
        </div>

        <div className="loc-content grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Map embed */}
          <div className="relative rounded-2xl overflow-hidden border border-[#830000]/20 aspect-video md:aspect-square">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.7!2d-58.4173!3d-34.6118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca8f0!2sPalermo%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación NEXO"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#830000]/20 rounded-2xl" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-archivo text-xs tracking-[0.25em] text-[#830000]">VENUE</span>
              <h3 className="font-horizon text-2xl sm:text-3xl text-[#FFFDEF] mt-2">CLUB NEXO</h3>
              <p className="font-archivo text-sm text-[#D3D3D3]/60 mt-1">
                Av. del Libertador 1234, Palermo
              </p>
            </div>

            <div className="w-full h-px bg-[#830000]/20" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-archivo text-[10px] tracking-[0.2em] text-[#D3D3D3]/40">FECHA</span>
                <p className="font-archivo text-sm text-[#FFFDEF] mt-1">Sábado 16 de Mayo</p>
              </div>
              <div>
                <span className="font-archivo text-[10px] tracking-[0.2em] text-[#D3D3D3]/40">HORARIO</span>
                <p className="font-archivo text-sm text-[#FFFDEF] mt-1">23:59 — 06:00</p>
              </div>
              <div>
                <span className="font-archivo text-[10px] tracking-[0.2em] text-[#D3D3D3]/40">DRESS CODE</span>
                <p className="font-archivo text-sm text-[#FFFDEF] mt-1">Smart Casual</p>
              </div>
              <div>
                <span className="font-archivo text-[10px] tracking-[0.2em] text-[#D3D3D3]/40">CAPACIDAD</span>
                <p className="font-archivo text-sm text-[#FFFDEF] mt-1">500 personas</p>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#830000]/50 rounded-full font-archivo text-xs uppercase tracking-[0.2em] text-[#FFFDEF] hover:bg-[#830000] transition-all duration-300 self-start"
              style={{ marginTop: "1.5rem", padding: "0.875rem 2rem" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── NOSOTROS / FOOTER ───────────── */
const TEAM = [
  { name: "ADRI", src: "/gallery/adri.JPG" },
  { name: "FACU", src: "/gallery/facu.JPG" },
  { name: "JUANI", src: "/gallery/juani.JPG" },
  { name: "MAGA", src: "/gallery/maga.jpeg" },
  { name: "SIENA", src: "/gallery/siena.JPG" },
  { name: "SURI", src: "/gallery/suri.JPG" },
  { name: "VICKY", src: "/gallery/vicky.JPG" },
];

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-inner", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative" style={{ paddingTop: "8rem", paddingBottom: "1.5rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#830000]/10 to-transparent" />

      <div className="relative z-10 contact-inner">
        <div className="text-center" style={{ marginBottom: "5rem" }}>
          <h2 className="font-horizon text-4xl sm:text-6xl md:text-7xl text-[#FFFDEF] tracking-wider mb-4">
            NOSOTROS
          </h2>
          <p className="font-archivo text-sm tracking-[0.15em] text-[#D3D3D3]/60">
            EL EQUIPO DETRÁS DE NEXO
          </p>
        </div>

        {/* Team grid */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10" style={{ marginBottom: "4rem" }}>
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-3" style={{ width: "140px" }}>
              <div className="relative rounded-full overflow-hidden border-2 border-[#830000]/30 hover:border-[#830000] transition-all duration-300 group" style={{ width: "140px", height: "140px" }}>
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-archivo text-xs tracking-[0.2em] text-[#D3D3D3]">{member.name}</span>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            { name: "Instagram", href: "https://instagram.com/nexofiesta", icon: "M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm4.5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm5.25-1.5a1 1 0 100 2 1 1 0 000-2z" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-[#830000]/30 rounded-full hover:bg-[#830000] hover:border-[#830000] transition-all duration-300 group"
              style={{ padding: "0.75rem 1.5rem" }}
            >
              <svg className="w-5 h-5 text-[#830000] group-hover:text-[#FFFDEF] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
              <span className="font-archivo text-xs tracking-[0.15em] text-[#D3D3D3] group-hover:text-[#FFFDEF] transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto border-t border-[#830000]/20 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ marginTop: "4rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <span className="font-horizon text-lg text-[#FFFDEF]/40 tracking-wider">NEXO</span>
        <span className="font-archivo text-[10px] tracking-[0.2em] text-[#D3D3D3]/30">
          © 2025 NEXO FIESTA — TODOS LOS DERECHOS RESERVADOS
        </span>
        <a
          href="https://instagram.com/nexofiesta"
          target="_blank"
          rel="noopener noreferrer"
          className="font-archivo text-[10px] tracking-[0.2em] text-[#830000] hover:text-[#a01010] transition-colors"
        >
          @NEXOFIESTA
        </a>
      </footer>
    </section>
  );
}

/* ───────────── MAIN PAGE ───────────── */
export default function Home() {
  return (
    <main className="disco-grid">
      <Navbar />
      <HeroSection />
      <LineupSection />
      <GallerySection />
      <TicketsSection />
      <LocationSection />
      <ContactSection />
    </main>
  );
}

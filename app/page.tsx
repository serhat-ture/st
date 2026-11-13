"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Gauge,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface NavItem {
  label: string;
  href: string;
}

interface TrustStandard {
  title: string;
  metric: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  clientType: string;
  summary: string;
  impact: string;
  scrimClass: string;
  previewVariant: "employment" | "nursery" | "sports";
}

/* -------------------------------------------------------------------------- */
/*                                Motion Curves                               */
/* -------------------------------------------------------------------------- */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE_OUT_EXPO,
    },
  },
};

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE_OUT_EXPO,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                 Static Data                                */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS: NavItem[] = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Standartlar", href: "#standartlar" },
  { label: "Vaka Çalışmaları", href: "#vaka-calismalari" },
  { label: "İletişim", href: "#iletisim" },
];

const TRUST_STANDARDS: TrustStandard[] = [
  {
    title: "Sıfır Kesinti",
    metric: "%99.99 SLA",
    description:
      "Tek nokta arızası (SPOF) barındırmayan dağıtık kenar düğümleri ile yoğun kamu duyurularında dahi kesintisiz erişim.",
    icon: Server,
  },
  {
    title: "KVKK Uyumu",
    metric: "6698 Uyumlu",
    description:
      "Gereksiz izleyici çerezler ve üçüncü parti veri sızıntıları olmadan, mevzuata tam uyumlu veri işleme sınırları.",
    icon: ShieldCheck,
  },
  {
    title: "%100 İzole Güvenlik",
    metric: "Sıfır DB Yüzeyi",
    description:
      "Veritabanı enjeksiyonu veya sunucu tarafı oturum zafiyetlerine kapalı, salt okunur derlenmiş güvenli mimari.",
    icon: Lock,
  },
  {
    title: "Yüksek Hızlı Sunucu Mimarisi",
    metric: "< 50ms TTFB",
    description:
      "Global CDN önbellekleme, optimize edilmiş varlık dağıtımı ve anlık ilk boyama süresi ile yüksek hız standardı.",
    icon: Zap,
  },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "belediye-istihdam",
    category: "İstihdam & Kariyer Mimarisi",
    title: "Belediye İstihdam Merkezi",
    clientType: "Büyükşehir Belediyesi İştiraki",
    summary:
      "İlçe genelindeki iş arayan vatandaşlar ile yerel sanayi kuruluşlarını buluşturan yüksek erişilebilirlikli kariyer vitrini.",
    impact: "100/100 Lighthouse Performans",
    scrimClass: "from-slate-950/90 via-slate-950/50 to-transparent",
    previewVariant: "employment",
  },
  {
    id: "kres-akademi-agi",
    category: "Eğitim & Kurumsal Yönetim",
    title: "Büyükşehir Kreş & Akademi Ağı",
    clientType: "Eğitim Hizmetleri Daire Başkanlığı",
    summary:
      "42 şubeli belediye kreş ve etüt merkezleri için kontenjan takibi, şube rehberi ve şeffaf ön kayıt bilgilendirme arayüzü.",
    impact: "0.4s İlk İçerik Boyaması",
    scrimClass: "from-slate-950/90 via-slate-900/50 to-transparent",
    previewVariant: "nursery",
  },
  {
    id: "spor-kompleksi-portali",
    category: "Spor Kulüpleri & Tesisler",
    title: "Ulusal Spor Kompleksi Portalı",
    clientType: "Belediye Spor Kulübü",
    summary:
      "Branş programları, saha doluluk duyuruları ve altyapı seçme takvimlerini tek çatı altında sunan ultra hızlı kurumsal platform.",
    impact: "%68 Daha Hızlı Mobil Deneyim",
    scrimClass: "from-blue-950/90 via-slate-950/50 to-transparent",
    previewVariant: "sports",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Magnetic Wrapper                              */
/* -------------------------------------------------------------------------- */

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

function MagneticWrapper({
  children,
  className,
  strength = 0.22,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                    Static Case Study Architectural Art                     */
/* -------------------------------------------------------------------------- */

function CaseStudyVisual({ variant }: { variant: CaseStudy["previewVariant"] }) {
  if (variant === "employment") {
    return (
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-label="Belediye İstihdam Merkezi arayüz mimarisi önizlemesi"
        className="h-full w-full object-cover"
      >
        <defs>
          <linearGradient id="emp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="url(#emp-bg)" />
        <g opacity="0.45" stroke="#CBD5E1" strokeWidth="1">
          <line x1="0" y1="84" x2="640" y2="84" />
          <line x1="0" y1="168" x2="640" y2="168" />
          <line x1="0" y1="252" x2="640" y2="252" />
          <line x1="0" y1="336" x2="640" y2="336" />
          <line x1="160" y1="0" x2="160" y2="420" />
          <line x1="320" y1="0" x2="320" y2="420" />
          <line x1="480" y1="0" x2="480" y2="420" />
        </g>
        <rect
          x="56"
          y="54"
          width="528"
          height="312"
          rx="16"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        <rect x="84" y="84" width="140" height="12" rx="6" fill="#0F172A" />
        <rect x="468" y="80" width="88" height="22" rx="11" fill="#1E3A8A" opacity="0.12" />
        <rect x="484" y="88" width="56" height="6" rx="3" fill="#1E3A8A" />
        <rect x="84" y="130" width="224" height="86" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="104" y="152" width="110" height="10" rx="5" fill="#334155" />
        <rect x="104" y="172" width="160" height="8" rx="4" fill="#94A3B8" />
        <rect x="104" y="190" width="76" height="8" rx="4" fill="#CBD5E1" />
        <rect x="332" y="130" width="224" height="86" rx="12" fill="#0F172A" />
        <rect x="352" y="152" width="96" height="10" rx="5" fill="#F8FAFC" />
        <rect x="352" y="172" width="164" height="8" rx="4" fill="#94A3B8" />
        <rect x="352" y="190" width="92" height="8" rx="4" fill="#3B82F6" />
        <rect x="84" y="236" width="472" height="96" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="108" y="264" width="128" height="10" rx="5" fill="#0F172A" />
        <rect x="108" y="286" width="240" height="8" rx="4" fill="#94A3B8" />
        <rect x="444" y="268" width="88" height="32" rx="8" fill="#0F172A" />
      </svg>
    );
  }

  if (variant === "nursery") {
    return (
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-label="Büyükşehir Kreş ve Akademi Ağı arayüz mimarisi önizlemesi"
        className="h-full w-full object-cover"
      >
        <defs>
          <linearGradient id="nur-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="url(#nur-bg)" />
        <circle cx="510" cy="95" r="140" fill="#1E3A8A" opacity="0.06" />
        <rect
          x="64"
          y="58"
          width="512"
          height="304"
          rx="18"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        <rect x="92" y="88" width="160" height="244" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="112" y="112" width="86" height="10" rx="5" fill="#0F172A" />
        <rect x="112" y="144" width="120" height="28" rx="8" fill="#0F172A" opacity="0.08" />
        <rect x="112" y="184" width="120" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="112" y="224" width="120" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="112" y="264" width="120" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="276" y="88" width="272" height="112" rx="12" fill="#0F172A" />
        <rect x="300" y="114" width="136" height="10" rx="5" fill="#FFFFFF" />
        <rect x="300" y="136" width="196" height="8" rx="4" fill="#94A3B8" />
        <rect x="300" y="156" width="90" height="18" rx="9" fill="#1E3A8A" />
        <rect x="276" y="218" width="128" height="114" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="420" y="218" width="128" height="114" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
        <rect x="296" y="244" width="70" height="8" rx="4" fill="#334155" />
        <rect x="296" y="266" width="88" height="28" rx="6" fill="#E2E8F0" />
        <rect x="440" y="244" width="70" height="8" rx="4" fill="#334155" />
        <rect x="440" y="266" width="88" height="28" rx="6" fill="#1E3A8A" opacity="0.16" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label="Ulusal Spor Kompleksi Portalı arayüz mimarisi önizlemesi"
      className="h-full w-full object-cover"
    >
      <defs>
        <linearGradient id="spo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#spo-bg)" />
      <rect
        x="56"
        y="56"
        width="528"
        height="308"
        rx="18"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />
      <rect x="84" y="86" width="472" height="58" rx="12" fill="#0F172A" />
      <rect x="108" y="109" width="144" height="12" rx="6" fill="#FFFFFF" />
      <rect x="456" y="104" width="76" height="22" rx="11" fill="#3B82F6" opacity="0.25" />
      <rect x="84" y="164" width="146" height="168" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="247" y="164" width="146" height="168" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="410" y="164" width="146" height="168" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
      <circle cx="120" cy="204" r="16" fill="#0F172A" opacity="0.08" />
      <rect x="104" y="238" width="96" height="10" rx="5" fill="#0F172A" />
      <rect x="104" y="258" width="104" height="8" rx="4" fill="#94A3B8" />
      <rect x="104" y="286" width="72" height="20" rx="6" fill="#0F172A" />
      <circle cx="283" cy="204" r="16" fill="#1E3A8A" opacity="0.14" />
      <rect x="267" y="238" width="96" height="10" rx="5" fill="#0F172A" />
      <rect x="267" y="258" width="104" height="8" rx="4" fill="#94A3B8" />
      <rect x="267" y="286" width="72" height="20" rx="6" fill="#1E3A8A" />
      <circle cx="446" cy="204" r="16" fill="#0F172A" opacity="0.08" />
      <rect x="430" y="238" width="96" height="10" rx="5" fill="#0F172A" />
      <rect x="430" y="258" width="104" height="8" rx="4" fill="#94A3B8" />
      <rect x="430" y="286" width="72" height="20" rx="6" fill="#0F172A" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Main Page                                  */
/* -------------------------------------------------------------------------- */

export default function NormTurkLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
        {/* Top sentinel for zero-overhead sticky header detection */}
        <div
          ref={topSentinelRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-6 w-full"
        />

        {/* ================================================================ */}
        {/* 1. GLASSMORPHIC NAVIGATION HEADER                                */}
        {/* ================================================================ */}
        <header
          className={cn(
            "sticky top-0 z-50 w-full transition-colors duration-300",
            isScrolled
              ? "border-b border-slate-200/60 bg-white/75 backdrop-blur-md shadow-[0_1px_24px_-12px_rgba(15,23,42,0.12)]"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
            <a
              href="#"
              className="group inline-flex items-baseline gap-0.5 rounded-sm text-xl font-semibold tracking-tighter text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
            >
              <span>Norm</span>
              <span className="font-bold text-slate-900">Türk</span>
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-900 transition-transform duration-300 group-hover:scale-125"
              />
            </a>

            <nav
              aria-label="Ana Navigasyon"
              className="hidden items-center gap-9 md:flex"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative py-1 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900 focus:outline-none focus-visible:text-slate-900"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              ))}
            </nav>

            <MagneticWrapper>
              <Button
                asChild
                size="sm"
                className="relative h-10 rounded-xl border border-slate-800/80 bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(30,58,138,0.45)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_0_32px_-4px_rgba(30,58,138,0.65)]"
              >
                <a
                  href="mailto:info@normturk.dev"
                  className="inline-flex items-center gap-2"
                >
                  <span>İletişime Geç</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-80"
                    aria-hidden={true}
                  />
                </a>
              </Button>
            </MagneticWrapper>
          </div>
        </header>

        <main>
          {/* ============================================================== */}
          {/* 2. HERO SECTION                                                */}
          {/* ============================================================== */}
          <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_55%,transparent_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-900/[0.07] via-slate-400/[0.06] to-transparent blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pb-36 md:pt-28">
              <motion.div
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl"
              >
                <motion.div
                  variants={heroItemVariants}
                  className="mb-8 inline-flex"
                >
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-900" />
                    Kamu, Eğitim ve Spor Kurumları İçin Kurumsal Web Mimarisi
                  </span>
                </motion.div>

                <motion.h1
                  variants={heroItemVariants}
                  className="text-5xl font-semibold leading-[1.03] tracking-tighter text-slate-900 sm:text-6xl md:text-8xl"
                >
                  Kurumlar İçin Yeni Nesil{" "}
                  <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 bg-clip-text text-transparent">
                    Dijital Standartlar.
                  </span>
                </motion.h1>

                <motion.p
                  variants={heroItemVariants}
                  className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl"
                >
                  Belediyeler, eğitim kurumları ve organizasyonlar için güvenli,
                  KVKK uyumlu, sıfır veritabanı riski taşıyan premium web
                  mimarileri tasarlıyor ve inşa ediyoruz.
                </motion.p>

                <motion.div
                  variants={heroItemVariants}
                  className="mt-11 flex flex-wrap items-center gap-4"
                >
                  <MagneticWrapper>
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-xl bg-slate-900 px-7 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(15,23,42,0.45)] transition-all duration-300 hover:bg-slate-800"
                    >
                      <a
                        href="mailto:info@normturk.dev?subject=NormT%C3%BCrk%20Kurumsal%20Mimari%20Talebi"
                        className="inline-flex items-center gap-2.5"
                      >
                        <span>Kurumsal Teklif Al</span>
                        <ArrowRight className="h-4 w-4" aria-hidden={true} />
                      </a>
                    </Button>
                  </MagneticWrapper>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-slate-200 bg-white/80 px-7 text-sm font-medium text-slate-700 backdrop-blur-sm transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <a href="#hizmetler">Mimariyi İncele</a>
                  </Button>
                </motion.div>

                <motion.div
                  variants={heroItemVariants}
                  className="mt-16 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-8 sm:grid-cols-4 md:mt-20"
                >
                  {[
                    { label: "Mimari Model", value: "Yeni Nesil Edge" },
                    { label: "Hedef Performans", value: "100 / 100 CWV" },
                    { label: "Mevzuat Uyum", value: "KVKK & WCAG" },
                    { label: "Saldırı Yüzeyi", value: "Veritabanısız" },
                  ].map((spec) => (
                    <div key={spec.label} className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. HİZMETLER — BENTO GRID TASARIMI                             */}
          {/* ============================================================== */}
          <section
            id="hizmetler"
            className="scroll-mt-20 bg-white py-24 md:py-32"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <motion.div
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-900">
                    Çözüm Mimarisi
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                    Kamu ölçeğinde netlik, mühendislik hassasiyeti.
                  </h2>
                </div>
                <p className="max-w-md text-base leading-relaxed text-slate-500">
                  Şişkin CMS altyapılarından arındırılmış, yalnızca kurumunuzun
                  gerçek ihtiyacına odaklanan modüler ve kalıcı web sistemleri.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                {/* Bento Card 1 */}
                <motion.article
                  variants={sectionRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/90 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-colors duration-300 hover:border-slate-300 md:col-span-7 md:p-10"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-900/[0.04] blur-2xl"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xs">
                      <Building2 className="h-5 w-5" aria-hidden={true} />
                    </div>
                    <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
                      Belediyeler & Resmi Kurumlar
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Kurumsal Platformlar
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                      Belediye ana portalları, iştirak vitrinleri ve resmi kurum
                      yayınları için WCAG erişilebilirlik standartlarına uyumlu,
                      yüksek trafikli anlarda dahi sarsılmayan kurumsal
                      platformlar.
                    </p>
                  </div>

                  <div className="relative mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                    {[
                      { title: "Erişilebilirlik", value: "WCAG 2.1 AA" },
                      { title: "Kenar Önbellek", value: "Global CDN" },
                      { title: "İçerik Yapısı", value: "Modüler Mimari" },
                    ].map((node) => (
                      <div
                        key={node.title}
                        className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                      >
                        <p className="text-[11px] text-slate-400">
                          {node.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-800">
                          {node.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.article>

                {/* Bento Card 2 */}
                <motion.article
                  variants={sectionRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/90 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-colors duration-300 hover:border-slate-300 md:col-span-5 md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xs">
                      <Briefcase className="h-5 w-5" aria-hidden={true} />
                    </div>
                    <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
                      Kariyer Ofisleri
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      İstihdam Portalları
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
                      Bölgesel istihdam ofisleri ve kamu kariyer merkezleri için
                      anlık filtrelenebilir pozisyon vitrinleri ve
                      sadeleştirilmiş vatandaş başvuru akışları.
                    </p>
                  </div>

                  <div className="mt-8 space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4">
                    {[
                      "Anlık İlan & Sektör Filtreleme",
                      "Mobil Öncelikli Başvuru Rehberi",
                      "Sıfır Sunucu Gecikmesi",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 text-blue-900"
                          aria-hidden={true}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>

                {/* Bento Card 3 */}
                <motion.article
                  variants={sectionRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/90 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-colors duration-300 hover:border-slate-300 md:col-span-5 md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xs">
                      <GraduationCap className="h-5 w-5" aria-hidden={true} />
                    </div>
                    <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
                      Kreş & Spor Kulüpleri
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Yönetim Sistemleri (Kreş / Spor)
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
                      Belediye kreşleri, eğitim akademileri ve spor tesisleri
                      için şube rehberleri, dönem takvimleri, branş programları
                      ve veli bilgilendirme arayüzleri.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      "Şube & Kontenjan Vitrinleri",
                      "Branş Takvimleri",
                      "Veli Rehber Modülü",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>

                {/* Bento Card 4 */}
                <motion.article
                  variants={sectionRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/90 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-colors duration-300 hover:border-slate-300 md:col-span-7 md:p-10"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-900/[0.05] blur-2xl"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xs">
                      <Gauge className="h-5 w-5" aria-hidden={true} />
                    </div>
                    <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
                      Core Web Vitals Mühendisliği
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Performans Optimizasyonu
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                      Mevcut ağır ve yavaş kurumsal sitelerin temiz, yüksek hızlı
                      web mimarisine dönüştürülmesi; sıfır düzen kayması (CLS),
                      milisaniye düzeyinde LCP ve maksimum SEO görünürlüğü.
                    </p>
                  </div>

                  <div className="relative mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:grid-cols-4">
                    {[
                      { metric: "Performans", score: "100" },
                      { metric: "Erişilebilirlik", score: "100" },
                      { metric: "En İyi Pratikler", score: "100" },
                      { metric: "SEO", score: "100" },
                    ].map((item) => (
                      <div key={item.metric} className="space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[11px] font-medium text-slate-500">
                            {item.metric}
                          </span>
                          <span className="text-sm font-bold tracking-tight text-slate-900">
                            {item.score}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-slate-900 to-blue-900" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 4. TEKNOLOJİK GÜVEN VE STANDARTLAR                             */}
          {/* ============================================================== */}
          <section
            id="standartlar"
            className="scroll-mt-20 border-y border-slate-200/80 bg-[#FAFAFA] py-20 md:py-28"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <motion.div
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-12 max-w-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Teknolojik Güven ve Standartlar
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  Kamu güvenliği tesadüfe bırakılmaz.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 divide-y divide-slate-200/80 rounded-3xl border border-slate-200/90 bg-white md:grid-cols-4 md:divide-x md:divide-y-0">
                {TRUST_STANDARDS.map((standard) => {
                  const Icon = standard.icon;
                  return (
                    <motion.div
                      key={standard.title}
                      variants={sectionRevealVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="flex flex-col justify-between p-8"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <Icon
                            className="h-5 w-5 text-slate-400"
                            aria-hidden={true}
                          />
                          <span className="text-xs font-semibold tracking-tight text-blue-900">
                            {standard.metric}
                          </span>
                        </div>
                        <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">
                          {standard.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                          {standard.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 5. VAKA ÇALIŞMALARI (MİNİMALİST VİTRİN)                        */}
          {/* ============================================================== */}
          <section
            id="vaka-calismalari"
            className="scroll-mt-20 bg-white py-24 md:py-32"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <motion.div
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-900">
                    Vaka Çalışmaları
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                    Seçili kurumsal mimariler.
                  </h2>
                </div>
                <p className="max-w-md text-base leading-relaxed text-slate-500">
                  Her biri yüksek erişilebilirlik, sıfır bakım yükü ve kurumsal
                  saygınlık hedeflenerek üretilmiş referans arayüzleri.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {CASE_STUDIES.map((study) => (
                  <motion.article
                    key={study.id}
                    variants={sectionRevealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="group flex flex-col"
                  >
                    <div
                      tabIndex={0}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
                    >
                      <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-focus-within:scale-105">
                        <CaseStudyVisual variant={study.previewVariant} />
                      </div>

                      <div
                        className={cn(
                          "absolute inset-0 flex flex-col justify-end bg-gradient-to-t p-6 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-within:opacity-100",
                          study.scrimClass
                        )}
                      >
                        <span className="translate-y-2 text-[11px] font-medium uppercase tracking-widest text-slate-300 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
                          {study.clientType}
                        </span>
                        <h3 className="mt-1 translate-y-3 text-xl font-semibold tracking-tight text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
                          {study.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-400">
                        {study.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {study.impact}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">
                      {study.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {study.summary}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ================================================================ */}
        {/* 6. STATİK FOOTER                                                 */}
        {/* ================================================================ */}
        <footer
          id="iletisim"
          className="scroll-mt-20 border-t border-slate-900 bg-slate-950 text-slate-300"
        >
          <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 md:px-10 md:pt-28">
            <div className="flex flex-col justify-between gap-12 border-b border-slate-800/80 pb-16 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  NormTürk Teknoloji Mimarisi
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  NormTürk: Dijitaldeki nirengi noktanız.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-sm">
                <a
                  href="mailto:info@normturk.dev"
                  className="inline-flex items-center gap-2.5 font-medium text-white transition-colors hover:text-blue-300"
                >
                  <Mail className="h-4 w-4 text-slate-400" aria-hidden={true} />
                  <span>info@normturk.dev</span>
                </a>
                <div className="inline-flex items-center gap-2.5 text-slate-400">
                  <MapPin
                    className="h-4 w-4 text-slate-500"
                    aria-hidden={true}
                  />
                  <span>Ankara, Türkiye</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 text-xs text-slate-500 sm:flex-row sm:items-center">
              <p>© 2026 NormTürk. Tüm hakları saklıdır.</p>
              <p>Yeni Nesil Kurumsal Web Mimarileri</p>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

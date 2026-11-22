"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
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
  Menu,
  Server,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DICTIONARY,
  type CaseStudyCopy,
  type Locale,
  type TrustStandardCopy,
} from "@/lib/i18n";

/* -------------------------------------------------------------------------- */
/*                                Motion Curves                               */
/* -------------------------------------------------------------------------- */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const heroHeadlineVariants: Variants = {
  hidden: { y: 16 },
  visible: {
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE_OUT_EXPO,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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

const TRUST_ICONS: Record<
  TrustStandardCopy["id"],
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  uptime: Server,
  privacy: ShieldCheck,
  security: Lock,
  speed: Zap,
};

/* -------------------------------------------------------------------------- */
/*                             Language Switcher                              */
/* -------------------------------------------------------------------------- */

function LanguageSwitcher({
  locale,
  label,
  onSelect,
  className,
}: {
  locale: Locale;
  label: string;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-xl border border-slate-200/90 bg-white/85 p-0.5 text-xs font-medium backdrop-blur-sm",
        className
      )}
    >
      <Link
        href="/"
        lang="tr"
        hrefLang="tr"
        aria-label="TR — Türkçe"
        aria-current={locale === "tr" ? "page" : undefined}
        onClick={onSelect}
        className={cn(
          "inline-flex min-h-8 items-center justify-center rounded-[10px] px-2.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
          locale === "tr"
            ? "bg-slate-900 text-white"
            : "text-slate-500 hover:text-slate-900"
        )}
      >
        TR
      </Link>
      <Link
        href="/en"
        lang="en"
        hrefLang="en"
        aria-label="EN — English"
        aria-current={locale === "en" ? "page" : undefined}
        onClick={onSelect}
        className={cn(
          "inline-flex min-h-8 items-center justify-center rounded-[10px] px-2.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
          locale === "en"
            ? "bg-slate-900 text-white"
            : "text-slate-500 hover:text-slate-900"
        )}
      >
        EN
      </Link>
    </nav>
  );
}

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
/*                       Case Study Editorial Photography                     */
/* -------------------------------------------------------------------------- */

const CASE_STUDY_IMAGES: Record<CaseStudyCopy["previewVariant"], string> = {
  employment: "/st/images/case-employment.webp",
  nursery: "/st/images/case-nursery.webp",
  sports: "/st/images/case-sports.webp",
};

function CaseStudyVisual({
  variant,
  ariaLabel,
}: {
  variant: CaseStudyCopy["previewVariant"];
  ariaLabel: string;
}) {
  return (
    <Image
      src={CASE_STUDY_IMAGES[variant]}
      alt={ariaLabel}
      width={960}
      height={720}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Landing Page                                */
/* -------------------------------------------------------------------------- */

export function LandingPage({ locale }: { locale: Locale }) {
  const copy = DICTIONARY[locale];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    mobileDrawerRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleScrollTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  const closeMobileMenu = (restoreFocus = false) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) {
      mobileMenuButtonRef.current?.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="relative min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white"
      >
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
            isScrolled || isMobileMenuOpen
              ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-md shadow-[0_1px_24px_-12px_rgba(15,23,42,0.12)]"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
            <a
              href="#top"
              onClick={handleScrollTop}
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
              aria-label={copy.header.navLabel}
              className="hidden items-center gap-9 md:flex"
            >
              {copy.header.navItems.map((item) => (
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

            <div className="flex items-center gap-2.5">
              <LanguageSwitcher
                locale={locale}
                label={copy.header.languageNavLabel}
              />

              <MagneticWrapper className="hidden sm:inline-block">
                <Button
                  asChild
                  size="sm"
                  className="relative h-10 rounded-xl border border-slate-800/80 bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(30,58,138,0.45)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_0_32px_-4px_rgba(30,58,138,0.65)]"
                >
                  <a
                    href="mailto:info@normturk.dev"
                    className="inline-flex items-center gap-2"
                  >
                    <span>{copy.header.ctaLabel}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-80"
                      aria-hidden={true}
                    />
                  </a>
                </Button>
              </MagneticWrapper>

              <button
                ref={mobileMenuButtonRef}
                type="button"
                aria-label={
                  isMobileMenuOpen
                    ? copy.header.closeMenuLabel
                    : copy.header.openMenuLabel
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden={true} />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden={true} />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Accessible Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                onClick={() => closeMobileMenu(true)}
                aria-hidden="true"
                className="fixed inset-0 top-16 z-40 bg-slate-950/25 backdrop-blur-xs md:hidden"
              />
              <motion.div
                key="mobile-drawer"
                id="mobile-nav-drawer"
                ref={mobileDrawerRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={copy.header.mobileDialogLabel}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="fixed inset-x-0 top-16 z-50 border-b border-slate-200 bg-white/95 px-6 pb-8 pt-4 shadow-xl backdrop-blur-md focus:outline-none md:hidden"
              >
                <nav
                  aria-label={copy.header.mobileNavLabel}
                  className="flex flex-col"
                >
                  {copy.header.navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => closeMobileMenu(false)}
                      className="flex items-center justify-between border-b border-slate-100 py-4 text-base font-medium text-slate-800 transition-colors hover:text-blue-900"
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        className="h-4 w-4 text-slate-400"
                        aria-hidden={true}
                      />
                    </a>
                  ))}
                </nav>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <LanguageSwitcher
                    locale={locale}
                    label={copy.header.languageNavLabel}
                    onSelect={() => closeMobileMenu(false)}
                  />
                  <Button
                    asChild
                    size="lg"
                    className="h-12 flex-1 rounded-xl bg-slate-900 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    <a
                      href="mailto:info@normturk.dev"
                      onClick={() => closeMobileMenu(false)}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      <span>{copy.header.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden={true} />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main inert={isMobileMenuOpen || undefined}>
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
                    {copy.hero.eyebrow}
                  </span>
                </motion.div>

                <motion.h1
                  variants={heroHeadlineVariants}
                  className="text-5xl font-semibold leading-[1.03] tracking-tighter text-slate-900 sm:text-6xl md:text-8xl"
                >
                  {copy.hero.headlineStart}{" "}
                  <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 bg-clip-text text-transparent">
                    {copy.hero.headlineAccent}
                  </span>
                </motion.h1>

                <motion.p
                  variants={heroItemVariants}
                  className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl"
                >
                  {copy.hero.subtitle}
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
                        href={`mailto:info@normturk.dev?subject=${copy.hero.primaryCtaSubject}`}
                        className="inline-flex items-center gap-2.5"
                      >
                        <span>{copy.hero.primaryCta}</span>
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
                    <a href="#hizmetler">{copy.hero.secondaryCta}</a>
                  </Button>
                </motion.div>

                <motion.div
                  variants={heroItemVariants}
                  className="mt-16 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-8 sm:grid-cols-4 md:mt-20"
                >
                  {copy.hero.specs.map((spec) => (
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
          {/* 3. HİZMETLER / SERVICES — BENTO GRID                           */}
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
                    {copy.services.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                    {copy.services.title}
                  </h2>
                </div>
                <p className="max-w-md text-base leading-relaxed text-slate-500">
                  {copy.services.subtitle}
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
                      {copy.services.card1.badge}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {copy.services.card1.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                      {copy.services.card1.description}
                    </p>
                  </div>

                  <div className="relative mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                    {copy.services.card1.nodes.map((node) => (
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
                      {copy.services.card2.badge}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {copy.services.card2.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
                      {copy.services.card2.description}
                    </p>
                  </div>

                  <div className="mt-8 space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4">
                    {copy.services.card2.features.map((feature) => (
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
                      {copy.services.card3.badge}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {copy.services.card3.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
                      {copy.services.card3.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {copy.services.card3.tags.map((tag) => (
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
                      {copy.services.card4.badge}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {copy.services.card4.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                      {copy.services.card4.description}
                    </p>
                  </div>

                  <div className="relative mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:grid-cols-4">
                    {copy.services.card4.metrics.map((item) => (
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
                  {copy.standards.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  {copy.standards.title}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 divide-y divide-slate-200/80 rounded-3xl border border-slate-200/90 bg-white md:grid-cols-4 md:divide-x md:divide-y-0">
                {copy.standards.items.map((standard) => {
                  const Icon = TRUST_ICONS[standard.id];
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
          {/* 5. VAKA ÇALIŞMALARI / CASE STUDIES                             */}
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
                    {copy.caseStudies.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                    {copy.caseStudies.title}
                  </h2>
                </div>
                <p className="max-w-md text-base leading-relaxed text-slate-500">
                  {copy.caseStudies.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {copy.caseStudies.items.map((study) => (
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
                        <CaseStudyVisual
                          variant={study.previewVariant}
                          ariaLabel={study.ariaLabel}
                        />
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
        {/* 6. FOOTER                                                        */}
        {/* ================================================================ */}
        <footer
          id="iletisim"
          inert={isMobileMenuOpen || undefined}
          className="scroll-mt-20 border-t border-slate-900 bg-slate-950 text-slate-300"
        >
          <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 md:px-10 md:pt-28">
            <div className="flex flex-col justify-between gap-12 border-b border-slate-800/80 pb-16 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {copy.footer.eyebrow}
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {copy.footer.tagline}
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
                  <span>{copy.footer.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 text-xs text-slate-500 sm:flex-row sm:items-center">
              <p>{copy.footer.copyright}</p>
              <p>{copy.footer.subline}</p>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}


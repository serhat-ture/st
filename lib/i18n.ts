export type Locale = "tr" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSpec {
  label: string;
  value: string;
}

export interface TrustStandardCopy {
  id: "uptime" | "privacy" | "security" | "speed";
  title: string;
  metric: string;
  description: string;
}

export interface CaseStudyCopy {
  id: string;
  category: string;
  title: string;
  clientType: string;
  summary: string;
  impact: string;
  scrimClass: string;
  previewVariant: "employment" | "nursery" | "sports";
  ariaLabel: string;
}

export interface SiteDictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  header: {
    navLabel: string;
    mobileNavLabel: string;
    mobileDialogLabel: string;
    languageNavLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    ctaLabel: string;
    navItems: NavItem[];
  };
  hero: {
    eyebrow: string;
    headlineStart: string;
    headlineAccent: string;
    subtitle: string;
    primaryCta: string;
    primaryCtaSubject: string;
    secondaryCta: string;
    specs: HeroSpec[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    card1: {
      badge: string;
      title: string;
      description: string;
      nodes: { title: string; value: string }[];
    };
    card2: {
      badge: string;
      title: string;
      description: string;
      features: string[];
    };
    card3: {
      badge: string;
      title: string;
      description: string;
      tags: string[];
    };
    card4: {
      badge: string;
      title: string;
      description: string;
      metrics: { metric: string; score: string }[];
    };
  };
  standards: {
    eyebrow: string;
    title: string;
    items: TrustStandardCopy[];
  };
  caseStudies: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CaseStudyCopy[];
  };
  footer: {
    eyebrow: string;
    tagline: string;
    location: string;
    copyright: string;
    subline: string;
  };
}

export const DICTIONARY: Record<Locale, SiteDictionary> = {
  tr: {
    meta: {
      title: "NormTürk — Kurumlar İçin Yeni Nesil Dijital Standartlar",
      description:
        "Belediyeler, resmi kurumlar, eğitim kurumları ve spor kulüpleri için güvenli, KVKK uyumlu, yüksek performanslı kurumsal web mimarileri.",
      ogLocale: "tr_TR",
    },
    header: {
      navLabel: "Ana",
      mobileNavLabel: "Mobil",
      mobileDialogLabel: "Mobil Menü",
      languageNavLabel: "Dil seçimi",
      openMenuLabel: "Menüyü Aç",
      closeMenuLabel: "Menüyü Kapat",
      ctaLabel: "İletişime Geç",
      navItems: [
        { label: "Hizmetler", href: "#hizmetler" },
        { label: "Standartlar", href: "#standartlar" },
        { label: "Vaka Çalışmaları", href: "#vaka-calismalari" },
        { label: "İletişim", href: "#iletisim" },
      ],
    },
    hero: {
      eyebrow: "Kamu, Eğitim ve Spor Kurumları İçin Kurumsal Web Mimarisi",
      headlineStart: "Kurumlar İçin Yeni Nesil",
      headlineAccent: "Dijital Standartlar.",
      subtitle:
        "Belediyeler, eğitim kurumları ve organizasyonlar için güvenli, KVKK uyumlu, sıfır veritabanı riski taşıyan premium web mimarileri tasarlıyor ve inşa ediyoruz.",
      primaryCta: "Kurumsal Teklif Al",
      primaryCtaSubject: "NormT%C3%BCrk%20Kurumsal%20Mimari%20Talebi",
      secondaryCta: "Mimariyi İncele",
      specs: [
        { label: "Mimari Model", value: "Yeni Nesil Edge" },
        { label: "Hedef Performans", value: "100 / 100 CWV" },
        { label: "Mevzuat Uyum", value: "KVKK & WCAG" },
        { label: "Saldırı Yüzeyi", value: "Veritabanısız" },
      ],
    },
    services: {
      eyebrow: "Çözüm Mimarisi",
      title: "Kamu ölçeğinde netlik, mühendislik hassasiyeti.",
      subtitle:
        "Şişkin CMS altyapılarından arındırılmış, yalnızca kurumunuzun gerçek ihtiyacına odaklanan modüler ve kalıcı web sistemleri.",
      card1: {
        badge: "Belediyeler & Resmi Kurumlar",
        title: "Kurumsal Platformlar",
        description:
          "Belediye ana portalları, iştirak vitrinleri ve resmi kurum yayınları için WCAG erişilebilirlik standartlarına uyumlu, yüksek trafikli anlarda dahi sarsılmayan kurumsal platformlar.",
        nodes: [
          { title: "Erişilebilirlik", value: "WCAG 2.1 AA" },
          { title: "Kenar Önbellek", value: "Global CDN" },
          { title: "İçerik Yapısı", value: "Modüler Mimari" },
        ],
      },
      card2: {
        badge: "Kariyer Ofisleri",
        title: "İstihdam Portalları",
        description:
          "Bölgesel istihdam ofisleri ve kamu kariyer merkezleri için anlık filtrelenebilir pozisyon vitrinleri ve sadeleştirilmiş vatandaş başvuru akışları.",
        features: [
          "Anlık İlan & Sektör Filtreleme",
          "Mobil Öncelikli Başvuru Rehberi",
          "Sıfır Sunucu Gecikmesi",
        ],
      },
      card3: {
        badge: "Kreş & Spor Kulüpleri",
        title: "Yönetim Sistemleri (Kreş / Spor)",
        description:
          "Belediye kreşleri, eğitim akademileri ve spor tesisleri için şube rehberleri, dönem takvimleri, branş programları ve veli bilgilendirme arayüzleri.",
        tags: [
          "Şube & Kontenjan Vitrinleri",
          "Branş Takvimleri",
          "Veli Rehber Modülü",
        ],
      },
      card4: {
        badge: "Core Web Vitals Mühendisliği",
        title: "Performans Optimizasyonu",
        description:
          "Mevcut ağır ve yavaş kurumsal sitelerin temiz, yüksek hızlı web mimarisine dönüştürülmesi; sıfır düzen kayması (CLS), milisaniye düzeyinde LCP ve maksimum SEO görünürlüğü.",
        metrics: [
          { metric: "Performans", score: "100" },
          { metric: "Erişilebilirlik", score: "100" },
          { metric: "En İyi Pratikler", score: "100" },
          { metric: "SEO", score: "100" },
        ],
      },
    },
    standards: {
      eyebrow: "Teknolojik Güven ve Standartlar",
      title: "Kamu güvenliği tesadüfe bırakılmaz.",
      items: [
        {
          id: "uptime",
          title: "Sıfır Kesinti",
          metric: "%99.99 SLA",
          description:
            "Tek nokta arızası (SPOF) barındırmayan dağıtık kenar düğümleri ile yoğun kamu duyurularında dahi kesintisiz erişim.",
        },
        {
          id: "privacy",
          title: "KVKK Uyumu",
          metric: "6698 Uyumlu",
          description:
            "Gereksiz izleyici çerezler ve üçüncü parti veri sızıntıları olmadan, mevzuata tam uyumlu veri işleme sınırları.",
        },
        {
          id: "security",
          title: "%100 İzole Güvenlik",
          metric: "Sıfır DB Yüzeyi",
          description:
            "Veritabanı enjeksiyonu veya sunucu tarafı oturum zafiyetlerine kapalı, salt okunur derlenmiş güvenli mimari.",
        },
        {
          id: "speed",
          title: "Yüksek Hızlı Sunucu Mimarisi",
          metric: "< 50ms TTFB",
          description:
            "Global CDN önbellekleme, optimize edilmiş varlık dağıtımı ve anlık ilk boyama süresi ile yüksek hız standardı.",
        },
      ],
    },
    caseStudies: {
      eyebrow: "Vaka Çalışmaları",
      title: "Seçili kurumsal mimariler.",
      subtitle:
        "Her biri yüksek erişilebilirlik, sıfır bakım yükü ve kurumsal saygınlık hedeflenerek üretilmiş referans arayüzleri.",
      items: [
        {
          id: "belediye-istihdam",
          category: "İstihdam & Kariyer Mimarisi",
          title: "Belediye İstihdam Merkezi",
          clientType: " Belediye İştiraki",
          summary:
            "İlçe genelindeki iş arayan vatandaşlar ile yerel sanayi kuruluşlarını buluşturan yüksek erişilebilirlikli kariyer vitrini.",
          impact: "100/100 Lighthouse Performans",
          scrimClass: "from-slate-950/90 via-slate-950/50 to-transparent",
          previewVariant: "employment",
          ariaLabel: "Belediye İstihdam Merkezi arayüz mimarisi önizlemesi",
        },
        {
          id: "kres-akademi-agi",
          category: "Eğitim & Kurumsal Yönetim",
          title: "Belediye Kreş & Akademi Ağı",
          clientType: "Eğitim Hizmetleri Daire Başkanlığı",
          summary:
            "Çok şubeli belediye kreş ve etüt merkezleri için kontenjan takibi, şube rehberi ve şeffaf ön kayıt bilgilendirme arayüzü.",
          impact: "0.4s İlk İçerik Boyaması",
          scrimClass: "from-slate-950/90 via-slate-900/50 to-transparent",
          previewVariant: "nursery",
          ariaLabel:
            " Kreş ve Akademi Ağı arayüz mimarisi önizlemesi",
        },
        {
          id: "spor-kompleksi-portali",
          category: "Spor Kulüpleri & Tesisler",
          title: "Ulusal Spor Kompleksi Portalı",
          clientType: " Spor Kulübü",
          summary:
            "Branş programları, saha doluluk duyuruları ve altyapı seçme takvimlerini tek çatı altında sunan ultra hızlı kurumsal platform.",
          impact: "%68 Daha Hızlı Mobil Deneyim",
          scrimClass: "from-blue-950/90 via-slate-950/50 to-transparent",
          previewVariant: "sports",
          ariaLabel:
            "Ulusal Spor Kompleksi Portalı arayüz mimarisi önizlemesi",
        },
      ],
    },
    footer: {
      eyebrow: "NormTürk Teknoloji Mimarisi",
      tagline: "NormTürk: Dijitaldeki nirengi noktanız.",
      location: "Ankara, Türkiye",
      copyright: "© 2026 NormTürk. Tüm hakları saklıdır.",
      subline: "Yeni Nesil Kurumsal Web Mimarileri",
    },
  },
  en: {
    meta: {
      title: "NormTürk — Next-Generation Digital Standards for Institutions",
      description:
        "Secure, GDPR & KVKK-compliant, high-performance enterprise web architectures built for municipalities, public bodies, educational institutions, and sports clubs.",
      ogLocale: "en_US",
    },
    header: {
      navLabel: "Primary",
      mobileNavLabel: "Mobile",
      mobileDialogLabel: "Mobile Menu",
      languageNavLabel: "Language selection",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      ctaLabel: "Get in Touch",
      navItems: [
        { label: "Services", href: "#hizmetler" },
        { label: "Standards", href: "#standartlar" },
        { label: "Case Studies", href: "#vaka-calismalari" },
        { label: "Contact", href: "#iletisim" },
      ],
    },
    hero: {
      eyebrow:
        "Enterprise Web Architecture for Public, Education & Sports Institutions",
      headlineStart: "Next-Generation Digital",
      headlineAccent: "Standards for Institutions.",
      subtitle:
        "We design and engineer secure, GDPR & KVKK-compliant, zero-database-risk premium web architectures for municipalities, educational institutions, and organizations.",
      primaryCta: "Request Proposal",
      primaryCtaSubject: "NormT%C3%BCrk%20Enterprise%20Architecture%20Inquiry",
      secondaryCta: "Explore Architecture",
      specs: [
        { label: "Architecture", value: "Next-Gen Edge" },
        { label: "Target Score", value: "100 / 100 CWV" },
        { label: "Compliance", value: "GDPR & WCAG" },
        { label: "Attack Surface", value: "Zero Database" },
      ],
    },
    services: {
      eyebrow: "Solution Architecture",
      title: "Public-scale clarity, engineering precision.",
      subtitle:
        "Modular, enduring web systems stripped of bloated CMS overhead and tailored exclusively to your institution's operational needs.",
      card1: {
        badge: "Municipalities & Public Bodies",
        title: "Enterprise Platforms",
        description:
          "WCAG-compliant flagship portals, municipal affiliate showcases, and official publications engineered to stay rock-solid even during peak public traffic.",
        nodes: [
          { title: "Accessibility", value: "WCAG 2.1 AA" },
          { title: "Edge Caching", value: "Global CDN" },
          { title: "Content Model", value: "Modular Build" },
        ],
      },
      card2: {
        badge: "Career Centers",
        title: "Employment Portals",
        description:
          "Instant-filterable job showcases and streamlined citizen application flows built for regional employment offices and public career hubs.",
        features: [
          "Instant Role & Sector Filtering",
          "Mobile-First Application Guide",
          "Zero Server Latency",
        ],
      },
      card3: {
        badge: "Daycare & Sports Clubs",
        title: "Management Systems (Daycare / Sports)",
        description:
          "Branch directories, term calendars, discipline schedules, and parent information interfaces tailored for municipal daycares, academies, and sports facilities.",
        tags: [
          "Branch & Quota Showcases",
          "Discipline Schedules",
          "Parent Guide Module",
        ],
      },
      card4: {
        badge: "Core Web Vitals Engineering",
        title: "Performance Optimization",
        description:
          "Transforming heavy legacy institutional websites into clean, high-velocity web architectures with zero layout shift (CLS), millisecond LCP, and maximum SEO visibility.",
        metrics: [
          { metric: "Performance", score: "100" },
          { metric: "Accessibility", score: "100" },
          { metric: "Best Practices", score: "100" },
          { metric: "SEO", score: "100" },
        ],
      },
    },
    standards: {
      eyebrow: "Technological Trust & Standards",
      title: "Public trust is never left to chance.",
      items: [
        {
          id: "uptime",
          title: "Zero Downtime",
          metric: "99.99% SLA",
          description:
            "Distributed edge nodes free of single points of failure (SPOF), ensuring uninterrupted access even during major public announcements.",
        },
        {
          id: "privacy",
          title: "GDPR & KVKK Ready",
          metric: "Full Compliance",
          description:
            "Strict data-minimization boundaries with zero intrusive tracking cookies or third-party data leakage.",
        },
        {
          id: "security",
          title: "100% Isolated Security",
          metric: "Zero DB Surface",
          description:
            "Pre-compiled read-only architecture immune to database injection and server-side session vulnerabilities.",
        },
        {
          id: "speed",
          title: "High-Speed Edge Architecture",
          metric: "< 50ms TTFB",
          description:
            "Global CDN caching, optimized asset delivery, and instant first-paint rendering as standard.",
        },
      ],
    },
    caseStudies: {
      eyebrow: "Case Studies",
      title: "Selected institutional architectures.",
      subtitle:
        "Reference interfaces engineered for high accessibility, zero maintenance burden, and institutional credibility.",
      items: [
        {
          id: "belediye-istihdam",
          category: "Employment & Career Architecture",
          title: "Municipal Employment Center",
          clientType: "Municipal Affiliate",
          summary:
            "A high-accessibility career showcase connecting local job seekers with regional industrial employers across the municipality.",
          impact: "100/100 Lighthouse Performance",
          scrimClass: "from-slate-950/90 via-slate-950/50 to-transparent",
          previewVariant: "employment",
          ariaLabel: "Municipal Employment Center interface architecture preview",
        },
        {
          id: "kres-akademi-agi",
          category: "Education & Institutional Management",
          title: "Municipal Daycare & Academy Network",
          clientType: "Department of Educational Services",
          summary:
            "Quota visibility, branch directory, and transparent pre-registration guidance across multi-branch municipal daycare and study centers.",
          impact: "0.4s First Contentful Paint",
          scrimClass: "from-slate-950/90 via-slate-900/50 to-transparent",
          previewVariant: "nursery",
          ariaLabel:
            "Daycare and Academy Network interface architecture preview",
        },
        {
          id: "spor-kompleksi-portali",
          category: "Sports Clubs & Facilities",
          title: "National Sports Complex Portal",
          clientType: "Sports Club",
          summary:
            "An ultra-fast institutional platform unifying branch schedules, court availability notices, and youth tryout calendars.",
          impact: "68% Faster Mobile Experience",
          scrimClass: "from-blue-950/90 via-slate-950/50 to-transparent",
          previewVariant: "sports",
          ariaLabel:
            "National Sports Complex Portal interface architecture preview",
        },
      ],
    },
    footer: {
      eyebrow: "NormTürk Technology Architecture",
      tagline: "NormTürk: Your digital benchmark.",
      location: "Ankara, Turkey",
      copyright: "© 2026 NormTürk. All rights reserved.",
      subline: "Next-Generation Enterprise Web Architectures",
    },
  },
};


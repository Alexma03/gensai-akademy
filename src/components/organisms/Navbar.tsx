import { useEffect, useRef, useState, type ReactNode } from 'react';
import { GENIOTIPO_TEST_URL } from '../../config/links';

interface NavbarProps {
  currentPath: string;
}

const sections = [
  {
    id: 'geniotipo',
    label: 'Geniotipo',
    items: [
      { label: 'Visión general', description: 'Qué es y cómo funciona', href: '/geniotipo' },
      { label: 'Para adolescentes', description: 'Talento y orientación', href: '/geniotipo-adolescentes' },
      { label: 'Para adultos', description: 'Claridad y dirección', href: '/geniotipo-adultos' },
    ],
  },
  {
    id: 'altas-capacidades',
    label: 'Altas capacidades',
    items: [
      { label: 'Para adolescentes', description: 'Acompañamiento a menores', href: '/altas-capacidades-familias' },
      { label: 'Para adultos', description: 'Coaching tras la identificación', href: '/altas-capacidades-adultos' },
    ],
  },
] as const;

const directItems = [
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Blog', href: '/blog' },
];

function SvgIcon({ children, className = 'size-5' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

function MenuIcon({ close }: { close: boolean }) {
  return close ? (
    <SvgIcon className="size-6"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></SvgIcon>
  ) : (
    <SvgIcon className="size-6"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></SvgIcon>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return <SvgIcon className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></SvgIcon>;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [overPhoto, setOverPhoto] = useState(false);

  useEffect(() => {
    const updateOverPhoto = () => {
      const hero = document.querySelector<HTMLElement>('.page-hero--photo');
      if (!hero) {
        setOverPhoto(false);
        return;
      }
      const navH = navRef.current?.offsetHeight ?? 0;
      const heroTop = hero.getBoundingClientRect().top;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOverPhoto(heroTop <= navH - 8 && heroBottom > 24);
    };
    const updateScrolled = () => {
      setScrolled(window.scrollY > 12);
      updateOverPhoto();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
        setMobileOpen(false);
        setOpenMenu(null);
        requestAnimationFrame(() => trigger?.focus());
      }
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    const syncNavHeight = () => {
      const nav = navRef.current;
      if (nav) document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight}px`);
    };

    updateScrolled();
    syncNavHeight();
    const heroEl = document.querySelector<HTMLElement>('.page-hero--photo');
    const heightObserver = new ResizeObserver(() => { syncNavHeight(); updateOverPhoto(); });
    if (navRef.current) heightObserver.observe(navRef.current);
    if (heroEl) heightObserver.observe(heroEl);
    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('resize', updateOverPhoto);
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('pointerdown', closeOnOutsideClick);

    return () => {
      heightObserver.disconnect();
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('resize', updateOverPhoto);
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => href !== '/' && currentPath.startsWith(href);
  const isSectionActive = (section: (typeof sections)[number]) => section.items.some((item) => currentPath === item.href);
  const compact = scrolled;
  const navMotion = 'duration-300 ease-gensai';
  const solidBg = compact || mobileOpen;
  const overPhotoLight = overPhoto && !solidBg;
  const linkClass = (active: boolean) => {
    const base = `inline-flex items-center gap-1 rounded-full font-medium tracking-[-0.01em] transition-[color,background-color,padding,font-size,min-height] ${navMotion} ${compact ? 'min-h-10 px-3 py-2 text-[13px] xl:px-3.5' : 'min-h-11 px-3.5 py-2.5 text-sm xl:px-4'}`;
    if (overPhotoLight) {
      return `${base} ${active ? 'bg-white/14 text-white' : 'text-white/95 hover:bg-white/10 hover:text-white'}`;
    }
    return `${base} ${active ? 'bg-brand-green/20 text-brand-green-accessible-deep' : 'text-brand-slate hover:bg-brand-green/20 hover:text-brand-ink'}`;
  };

  return (
    <nav ref={navRef} aria-label="Navegación principal" className={`fixed inset-x-0 top-0 z-50 border-b transition-[border-color,box-shadow,backdrop-filter,background-color] ${navMotion} ${solidBg ? 'border-brand-line bg-[#fdfefb]/95 shadow-nav backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className={`mx-auto flex w-[min(100%-2rem,80rem)] items-center justify-between transition-[padding] ${navMotion} ${compact ? 'py-1.5' : 'py-3 sm:py-3.5'}`}>
        <a href="/" aria-label="Mary Garzón y Gensai Akademy, inicio" className={`inline-flex items-center transition-[gap] ${navMotion} ${compact ? 'gap-3' : 'gap-4'}`}>
          <img src="/logo.jpeg" alt="" width="500" height="500" className={`object-contain transition-[width,height] ${navMotion} ${compact ? 'size-9 sm:size-10' : 'size-16 sm:size-[4.5rem]'}`} />
          <span className="hidden sm:block">
            <span className={`block font-serif font-medium tracking-[-0.01em] transition-[color,font-size,text-shadow] ${navMotion} ${overPhotoLight ? 'text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45),0_1px_2px_rgb(0_0_0/0.35)]' : 'text-brand-ink'} ${compact ? 'text-[15px]' : 'text-xl sm:text-2xl'}`}>Mary Garzón</span>
            <span className={`block font-semibold tracking-[0.08em] transition-[color,font-size,text-shadow] ${navMotion} ${overPhotoLight ? 'text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.4)]' : 'text-brand-green-accessible'} ${compact ? 'text-[10px]' : 'text-[13px] sm:text-sm'}`}>GENSAI AKADEMY</span>
          </span>
        </a>

        <div className={`hidden items-center lg:flex transition-[gap] ${navMotion} ${compact ? 'gap-1' : 'gap-1.5'}`}>
          {sections.map((section) => {
            const open = openMenu === section.id;
            const active = isSectionActive(section);
            return (
              <div key={section.id} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${section.id}-menu`}
                  onClick={() => setOpenMenu(open ? null : section.id)}
                  className={linkClass(active)}
                >
                  {section.label}
                  <ChevronIcon open={open} />
                </button>
                {open ? (
                  <div id={`${section.id}-menu`} className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                    <div className="rounded-2xl bg-white p-2 shadow-ambient">
                      {section.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          aria-current={currentPath === item.href ? 'page' : undefined}
                          className={`block rounded-xl px-4 py-3 transition-colors ${currentPath === item.href ? 'bg-brand-green/20' : 'hover:bg-brand-green/20'}`}
                        >
                          <span className="block text-sm font-semibold text-brand-ink">{item.label}</span>
                          <span className="mt-0.5 block text-xs text-brand-quiet">{item.description}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          {directItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={linkClass(isActive(item.href))}
            >
              {item.label}
            </a>
          ))}
          <a href={GENIOTIPO_TEST_URL} target="_blank" rel="noopener noreferrer" className={`ml-2 inline-flex items-center rounded-full bg-brand-green-accessible font-semibold text-white transition-[background-color,padding,font-size,min-height] ${navMotion} hover:bg-brand-green-accessible-deep ${compact ? 'min-h-10 px-5 py-2 text-[13px]' : 'min-h-11 px-6 py-2.5 text-sm'}`}>
            Test gratuito
          </a>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => {
            setMobileOpen((open) => !open);
            setOpenMenu(null);
          }}
          className={`grid size-10 place-items-center rounded-full transition-colors lg:hidden ${overPhotoLight ? 'text-white hover:bg-white/10' : 'text-brand-slate hover:bg-brand-green/20'}`}
        >
          <MenuIcon close={mobileOpen} />
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-brand-line bg-[#fdfefb] px-5 py-5 lg:hidden">
          <div className="mx-auto max-w-lg pb-8">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-brand-line py-4 first:pt-0">
                <p className="mb-1 text-sm font-semibold text-brand-green-accessible-deep">{section.label}</p>
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium ${currentPath === item.href ? 'bg-brand-green/20 text-brand-green-accessible-deep' : 'text-brand-ink'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
            {directItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-12 items-center border-b border-brand-line text-[15px] font-medium ${isActive(item.href) ? 'text-brand-green-accessible-deep' : 'text-brand-ink'}`}
              >
                {item.label}
              </a>
            ))}
            <a href={GENIOTIPO_TEST_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-green-accessible px-6 py-3 text-sm font-semibold text-white">
              Haz el test gratuito
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

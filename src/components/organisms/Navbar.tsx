import { useEffect, useState, type ReactNode } from 'react';
import { GENIOTIPO_TEST_URL } from '../../config/links';

interface NavbarProps {
  currentPath: string;
}

const items = [
  { label: 'Geniotipo', href: '/geniotipo' },
  { label: 'AACC familias', href: '/altas-capacidades-familias' },
  { label: 'AACC adultos', href: '/altas-capacidades-adultos' },
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

export default function Navbar({ currentPath }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('keydown', closeOnEscape);
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

  return (
    <nav aria-label="Navegación principal" className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || mobileOpen ? 'border-brand-line bg-[#fdfefb]/95 shadow-nav backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex w-[min(100%-2rem,80rem)] items-center justify-between py-1.5">
        <a href="/" aria-label="Mary Garzón y Gensai Akademy, inicio" className="inline-flex items-center gap-3">
          <img src="/logo.jpeg" alt="" width="500" height="500" className="size-9 object-contain sm:size-10" />
          <span className="hidden sm:block">
            <span className="block font-serif text-[15px] font-medium tracking-[-0.01em] text-brand-ink">Mary Garzón</span>
            <span className="block text-[10px] font-semibold tracking-[0.08em] text-brand-green-accessible">GENSAI AKADEMY</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`inline-flex min-h-10 items-center rounded-full px-3 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors xl:px-3.5 ${isActive(item.href) ? 'bg-brand-mist text-brand-green-accessible-deep' : 'text-brand-slate hover:bg-brand-mist hover:text-brand-ink'}`}
            >
              {item.label}
            </a>
          ))}
          <a href={GENIOTIPO_TEST_URL} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex min-h-10 items-center rounded-full bg-brand-green-accessible px-5 py-2 text-[13px] font-semibold text-white transition duration-200 hover:bg-brand-green-accessible-deep">
            Test gratuito
          </a>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMobileOpen((open) => !open)}
          className="grid size-10 place-items-center rounded-full text-brand-slate transition-colors hover:bg-brand-mist lg:hidden"
        >
          <MenuIcon close={mobileOpen} />
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-menu" className="fixed inset-x-0 top-[64px] h-[calc(100dvh-64px)] overflow-y-auto border-t border-brand-line bg-[#fdfefb] px-5 py-5 sm:top-[72px] sm:h-[calc(100dvh-72px)] lg:hidden">
          <div className="mx-auto max-w-lg pb-8">
            {items.map((item) => (
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

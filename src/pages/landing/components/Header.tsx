import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWhite from '../assets/Logo-white.svg';
import LogoBlack from '../assets/Logo-black.svg';

const SECTION_KEYS = [
  'home',
  'measurableValue',
  'services',
  'technology',
  'resources',
  'caseProjects',
  'supports',
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];
type HeaderProps = {
  onScrolled: (section: SectionKey) => void;
};

const navItems: { label: string; key: SectionKey }[] = [
  // { label: 'Home', key: 'home' },
  { label: 'Measurable Value', key: 'measurableValue' },
  { label: 'Services', key: 'services' },
  { label: 'Technology', key: 'technology' },
  { label: 'Resources', key: 'resources' },
  { label: 'Case Projects', key: 'caseProjects' },
  { label: 'Supports', key: 'supports' },
];

export function Header({ onScrolled }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full bg-[#020403] z-100
        ${
          scrolled
            ? 'bg-neutral-100 text-black shadow-[0_2px_5px_-1px_rgba(0,0,0,0.1)]'
            : 'bg-transparent text-white'
        }`}
    >
      {/* shadow-[3_10_20_#1BC1D726] x축_y축_블러_색상 */}
      <div
        className={`
          relative max-w-[1920px] mx-auto

        `}
      >
        {/* mx-auto 좌우 마진 자동 정렬*/}
        <div className="flex justify-between items-center max-w-[1400px] mx-auto py-3">
          <img
            src={scrolled ? LogoBlack : LogoWhite}
            alt="AISIMS 로고 흰색"
            onClick={() => onScrolled('home')}
            className="w-[130px] h-auto cursor-pointer"
          />

          <nav className="flex flex-row gap-17 text-base font-regular">
            {navItems.map((item, idx) => (
              <p
                key={idx}
                onClick={() => onScrolled(item.key)}
                className="hover:text-[#1BC1D7] cursor-pointer"
              >
                {item.label}
              </p>
            ))}
          </nav>

          <button
            onClick={() => window.open('http://158.247.252.50', '_blank')}
            className="
            flex items-center
            px-6 py-2.5
            text-base text-neutral-100
            bg-[#1BC1D7] rounded-lg 
            hover:bg-[#1BC1D7]/80 transition-colors
            hover:cursor-pointer
            "
          >
            Platform
          </button>
        </div>
      </div>
    </header>
  );
}

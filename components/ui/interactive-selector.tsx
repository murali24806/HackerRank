import React, { useState, useEffect } from 'react';
import { FaCode, FaLaptopCode, FaFire, FaShieldAlt, FaBrain } from 'react-icons/fa';

export interface EventOption {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  image: string;
  icon: React.ReactNode;
}

const defaultOptions: EventOption[] = [
  {
    id: "codesprint",
    title: "CodeSprint 2026",
    description: "Annual flagship competitive programming royale • ₹25,000 in prizes",
    date: "OCT 15",
    tag: "Flagship Contest",
    image: "/assets/images/event1.jpg",
    icon: <FaCode size={20} className="text-white" />
  },
  {
    id: "dsa-bootcamp",
    title: "DSA & System Design",
    description: "Trees, Graphs, DP & System Architectures for MAANG interviews",
    date: "OCT 22",
    tag: "Masterclass",
    image: "/assets/images/event2.jpg",
    icon: <FaLaptopCode size={20} className="text-white" />
  },
  {
    id: "hackthecampus",
    title: "HackTheCampus 36h",
    description: "36-hour overnight hackathon building AI & Web3 products",
    date: "NOV 05",
    tag: "Overnight Hackathon",
    image: "/assets/images/event3.jpg",
    icon: <FaFire size={20} className="text-white" />
  },
  {
    id: "cyber-ctf",
    title: "Campus CTF Arena",
    description: "Capture The Flag, endpoint vulnerability audit & bug bounty hunt",
    date: "NOV 19",
    tag: "Cybersecurity",
    image: "/assets/images/gallery4.jpg",
    icon: <FaShieldAlt size={20} className="text-white" />
  },
  {
    id: "ai-symposium",
    title: "AI & Neural Networks",
    description: "Deep learning fundamentals, LLM fine-tuning & agentic architectures",
    date: "DEC 03",
    tag: "Deep Tech",
    image: "/assets/images/gallery2.jpg",
    icon: <FaBrain size={20} className="text-white" />
  }
];

interface InteractiveSelectorProps {
  options?: EventOption[];
  onSelectEvent?: (event: EventOption) => void;
}

const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({
  options = defaultOptions,
  onSelectEvent
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Track responsive screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      if (onSelectEvent) {
        onSelectEvent(options[index]);
      }
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 120 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [options]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full font-sans text-white py-4 px-2 sm:px-4">
      {/* Options Accordion Container: Vertical on mobile, Horizontal on desktop */}
      <div 
        className="options flex flex-col md:flex-row w-full max-w-[1140px] h-[560px] md:h-[440px] mx-auto items-stretch overflow-hidden rounded-2xl border border-[rgba(0,234,100,0.2)] bg-[#0a0f18] shadow-2xl relative"
      >
        {options.map((option, index) => (
          <div
            key={option.id || index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer select-none
              border-b md:border-b-0 md:border-r border-[rgba(0,234,100,0.15)] last:border-b-0 md:last:border-r-0
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) 
                ? 'translate(0,0)' 
                : (isMobile ? 'translateY(-20px)' : 'translateX(-40px)'),
              minWidth: isMobile ? '100%' : '70px',
              minHeight: isMobile ? '60px' : 'auto',
              boxShadow: activeIndex === index
                ? 'inset 0 0 40px rgba(0, 234, 100, 0.25), 0 10px 40px rgba(0,0,0,0.7)'
                : 'none',
              flex: activeIndex === index 
                ? (isMobile ? '4 1 0%' : '6 1 0%') 
                : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              willChange: 'flex-grow, box-shadow, transform'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dark gradient backdrop */}
            <div
              className="shadow absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out"
              style={{
                background: activeIndex === index
                  ? 'linear-gradient(180deg, rgba(7, 10, 15, 0.2) 0%, rgba(7, 10, 15, 0.75) 55%, rgba(7, 10, 15, 0.98) 100%)'
                  : 'linear-gradient(180deg, rgba(7, 10, 15, 0.5) 0%, rgba(7, 10, 15, 0.85) 60%, rgba(7, 10, 15, 0.98) 100%)'
              }}
            />

            {/* Date Tag at top right */}
            <div 
              className={`
                absolute top-3 md:top-5 right-3 md:right-5 z-10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-[rgba(7,10,15,0.85)] border border-[#00ea64] backdrop-blur-md shadow-lg transition-all duration-300
                ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-70 scale-90'}
              `}
            >
              <span className="font-mono text-[11px] md:text-xs font-bold text-[#00ea64]">{option.date}</span>
            </div>

            {/* Bottom Label with Icon and Info */}
            <div className="label absolute left-0 right-0 bottom-3 md:bottom-5 flex items-center justify-start h-14 md:h-16 z-10 pointer-events-none px-3 md:px-5 gap-3 md:gap-4 w-full">
              <div
                className={`
                  icon min-w-[38px] max-w-[38px] h-[38px] md:min-w-[46px] md:max-w-[46px] md:h-[46px] flex items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-300 flex-shrink-0
                  ${activeIndex === index 
                    ? 'bg-[#00ea64] text-[#070a0f] border-[#00ea64] shadow-[0_0_20px_rgba(0,234,100,0.5)] scale-105' 
                    : 'bg-[rgba(14,21,33,0.85)] text-gray-300 border-[rgba(255,255,255,0.15)]'}
                `}
              >
                {option.icon}
              </div>
              <div className="info text-white overflow-hidden relative pr-2 md:pr-4">
                <div
                  className="main font-bold text-base md:text-xl leading-tight transition-all duration-700 ease-in-out whitespace-nowrap"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-xs md:text-sm text-[#8b9bb4] line-clamp-1 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;

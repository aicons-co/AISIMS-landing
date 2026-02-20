import heroIllust from '../assets/hero-illust.png';
import AIIcon from '../assets/AI-icon.png';

export function HeroSection() {
  return (
    <section className="bg-[#020403]">
      {/* relative: 내부 absolute 요소(이미지)의 기준점 */}
      <div className="relative flex items-center max-w-[1920px] h-[960px] mx-auto overflow-hidden">
        {/* w-full mx-auto: 1400px를 1920px의 정중앙에 위치시킴 */}
        <div className="w-full max-w-[1400px] mx-auto z-10">
          <div className="flex flex-col justify-start">
            <h1 className="mb-6 text-5xl text-neutral-100 font-bold leading-[120%]">
              <p className="flex">
                AISIMS<p className="text-xl mr-2">®</p>
                AI-powered Structural
              </p>
              Information Management System
            </h1>

            <p className="mb-12 text-lg text-neutral-500 leading-[150%]">
              Automating structural design parsing through BIM,
              <br />
              quantities, rebar optimization, drawings and construction planning
            </p>

            <div className="flex gap-[15px]">
              <button
                className="
                px-6 py-2.5
                text-base text-neutral-100
              bg-[#1BC1D7] rounded-lg
              hover:bg-[#1BC1D7]/80 transition-colors
                hover:cursor-pointer
                "
              >
                Get Demo
              </button>
              <button
                className="
                flex items-center
                px-6 py-2.5
                text-base text-[#1BC1D7]
                border border-[#1BC1D7] rounded-lg
                hover:text-[#1BC1D7]/80 hover:border-[#1BC1D7]/80
                transition-colors
                hover:cursor-pointer
                "
              >
                <img src={AIIcon} alt="" className="w-5 h-5 mr-1" />
                See Optimization Cases
              </button>
            </div>
          </div>
        </div>

        <img
          src={heroIllust}
          alt="hero section Illustration"
          className="
            absolute
            right-30
            bottom-0
            w-[845px]
            pointer-events-none
            z-0
            object-contain
          "
        />
      </div>
    </section>
  );
}

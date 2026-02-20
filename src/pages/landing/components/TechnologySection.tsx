import EllipseRight from '../assets/illust-ellipse-13.png';
import EllipseLeft from '../assets/illust-ellipse-14.png';
import DataParsingImg from '../assets/technology-img-data-parsing.png';
import BimGenerationImg from '../assets/technology-img-bim-generation.png';
import RebarOptimizationImg from '../assets/technology-img-rebar-optimization.png';
import DocumentGenerationImg from '../assets/technology-img-document-generation.png';
import ScmAutomationImg from '../assets/technology-img-scm-automation.png';
import RevisionManagementImg from '../assets/technology-img-revision-management.png';

export function TechnologySection() {
  const technologyCards = [
    {
      title: 'Data Parsing',
      items: [
        'Automatic extraction from structural design reports',
        'Nodes, members, sections, reinforcement, design results parsing',
      ],
      image: DataParsingImg,
    },
    {
      title: 'BIM Generation',
      items: [
        'Rule-based + AI-assisted BIM creation',
        'Auto member placement / Auto rebar placement',
        'Missing rebar detection & correction loop',
      ],
      image: BimGenerationImg,
    },
    {
      title: 'Rebar Optimization',
      items: [
        'Special Length Priority (SLP) algorithms',
        'Cutting pattern optimization',
        'Global optimization across entire buildings',
        'Lap splice & mechanical coupler integration',
      ],
      image: RebarOptimizationImg,
    },
    {
      title: 'Document Generation',
      items: [
        'Automated drawing generation',
        'Automated BOQ generation',
        'Automated BBS generation',
        'Automated schedules generation',
        'Revision-aware document updates',
      ],
      image: DocumentGenerationImg,
    },
    {
      title: 'SCM Automation',
      items: [
        'Rebar procurement logic',
        'JIT delivery planning',
        'Construction activity sequencing',
      ],
      image: ScmAutomationImg,
    },
    {
      title: 'Revision Management',
      items: [
        'Revision impact analysis',
        'Automatic update of BIM, quantities, documents',
        'Closed-loop feedback from construction stage',
      ],
      image: RevisionManagementImg,
    },
  ];

  return (
    <section className=" bg-[#05011D]">
      <div className="relative max-w-[1920px] mx-auto pt-32 pb-28">
        <img
          src={EllipseRight}
          className="absolute top-0 right-0 opacity-80 z-0"
        />
        <img
          src={EllipseLeft}
          className="absolute bottom-0 left-0 opacity-80 z-0"
        />

        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="mb-20 text-[40px] text-neutral-100 font-bold">
            Technology
          </h2>

          {/* 그리드 (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
            grid-cols-1(기본)은 1열 / md(화면≥md(768px))는 2열 / lg(화면≥lg(1024px))는 3열 배치 */}
          {/* box-shadow: 0 0 15px #1BC1D726; -> shadow-[3_10_20_#1BC1D726] x축_y축_블러_색상 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {technologyCards.map((card, index) => (
              <div
                key={index}
                className={`
                  flex flex-col
                  p-12.5
                  border border-[#333B68] rounded-[20px]
                  hover:border-[#1BC1D7]
                  hover:shadow-[0_0_20px_#1BC1D7]/15
                  hover:cursor-pointer
                  z-10
                `}
              >
                <h3 className="mb-7.5 text-[24px] text-neutral-100 font-bold">
                  {card.title}
                </h3>

                {/* 카드 내용(리스트) */}
                {/* space-y- 자식 요소들간 세로 간격 / leading 행간 */}
                <ul className="w-full text-left mb-7.5 space-y-2">
                  {card.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex text-base  text-neutral-300 leading-[150%]"
                    >
                      <span className="flex items-start">
                        <span className="mt-3 mr-2 w-1 h-1 bg-neutral-300 rounded-full shrink-0" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <img
                  src={card.image}
                  alt="technology card image"
                  className="w-full h-50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import KeyIcon from '../assets/case-project-icon-key.png';

export function CaseProjectSection() {
  //
  const caseProjectCards = [
    {
      title: 'Residential Buildings',
      attribute: 'Rebar-inclusive BIM & automation',
      items: [
        'Full rebar detailing BIM for columns, beams, slabs, and walls',
        'One-click Shop Drawings, BBS, and BOQ generation',
        'Up to 30% rebar cutting waste reduction via AI optimization',
      ],
      image: KeyIcon,
    },
    {
      title: 'Commercial Buildings',
      attribute: 'End-to-end QTO & design sync',
      items: [
        'Multi-story structural BIM modeling in hours, not months',
        '99.9% accurate automated quantity take-off',
        'Real-time design change sync across all documents',
      ],
      image: KeyIcon,
    },
    {
      title: 'Massive Diaphragm Wall',
      attribute: 'Heavy-rebar detailing & optimization',
      items: [
        'Dense rebar arrangement BIM for diaphragm walls',
        'Special-length rebar optimization for large members',
        'Coupler vs. lap splice analysis with CO₂ reporting',
      ],
      image: KeyIcon,
    },
    {
      title: 'Before / After Comparison',
      attribute: 'Measurable project transformation',
      items: [
        'BIM modeling: months → hours (90%+ time savings)',
        'Documents: manual rework → one-click automation',
        'Rebar waste: industry average → near-zero',
      ],
      image: KeyIcon,
    },
  ];

  return (
    <section className=" bg-neutral-100">
      <div className="relative max-w-[1920px] mx-auto pt-32 pb-28">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="mb-20 text-[40px] text-neutral-1000 font-bold">
            Case Projects
          </h2>

          {/* 그리드 (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
            grid-cols-1(기본)은 1열 / md(화면≥md(768px))는 2열 / lg(화면≥lg(1024px))는 3열 배치 */}
          {/* box-shadow: 0 0 15px #1BC1D726; -> shadow-[3_10_20_#1BC1D726] x축_y축_블러_색상 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {caseProjectCards.map((card, index) => (
              <div
                key={index}
                className={`
                  flex flex-col
                  p-12.5
                  bg-neutral-100
                  border border-neutral-400 rounded-[20px]
                  hover:border-secondary-secondary
                  hover:shadow-[3px_10px_20px_#9244FF]/15
                `}
              >
                <h3 className="text-[24px] text-neutral-1000 font-bold">
                  {card.title}
                </h3>

                {/* 타임라인 리스트 */}
                <div className="flex mt-5">
                  {/* 왼쪽 타임라인 (체크 아이콘 + 세로선) */}
                  <div className="flex flex-col items-center mr-3 shrink-0">
                    <img
                      src={card.image}
                      alt="check icon"
                      className="w-6 h-6 relative z-10"
                    />
                    <div
                      className="
                        flex-1 w-[3px] -mt-0.5
                        bg-linear-to-b from-secondary-secondary/50 to-transparent
                        rounded-full
                        "
                    />
                  </div>

                  {/* 오른쪽 불릿 리스트 */}
                  <ul className="w-full text-left space-y-1">
                    {card.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex text-base text-neutral-600 leading-7"
                      >
                        <span className="flex items-start">
                          <span className="mt-3 mr-2 w-1 h-1 bg-neutral-600 rounded-full shrink-0" />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

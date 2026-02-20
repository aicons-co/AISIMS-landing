import BIMIcon from '../assets/services-icon-structural-bim.png'
import DocAutoIcon from '../assets/services-icon-documents-automation.png'
import RebarOptIcon from '../assets/services-icon-documents-automation.png'
import QTOIcon from '../assets/services-icon-structural-qto.png'
import PlanningIcon from '../assets/services-icon-structural-planning.png'
import ClashDetectIcon from '../assets/services-icon-clash-detection.png'

const servicesCards = [
  {
    title: 'Structural BIM',
    items: [
      'Automated structural BIM generation (from design documents)',
      'Rebar-inclusive BIM (columns, beams, slabs, walls, diaphragm walls)',
      'IFC 4.3–compliant models',
    ],
    icon: BIMIcon,
    isActive: false,
  },
  {
    title: 'Automation',
    items: [
      '2D Detail Drawings',
      'Shop Drawings',
      'Bar Bending Schedule (BBS)',
      'Bar Cutting List (BCL)',
      'Bill of Quantities (BOQ)',
      'Construction Schedule',
    ],
    icon: DocAutoIcon,
    isActive: false,
  },
  {
    title: 'Rebar Optimization',
    items: [
      'Special-length rebar optimization',
      'Rebar usage reduction (% & ton)',
      'Rebar cutting waste (RCW) minimization',
      'Coupler vs lap splice optimization',
      'CO₂ reduction results',
    ],
    icon: RebarOptIcon,
    isActive: false,
  },
  {
    title: 'Structural QTO',
    items: [
      'Concrete quantities',
      'Rebar quantities (length & weight)',
      'Formwork quantities',
      'Structural steel quantities',
    ],
    icon: QTOIcon,
    isActive: false,
  },
  {
    title: 'Structural Planning',
    items: [
      'Structural work schedule',
      'SLP structural work planning',
      'Rebar procurement planning',
    ],
    icon: PlanningIcon,
    isActive: false,
  },
  {
    title: 'Clash Detection',
    items: [
      'Rebar–structure–MEP clash review',
      'BIM-based issue visualization',
      'Constructability improvement',
    ],
    icon: ClashDetectIcon,
    isActive: false,
  },
]

export function ServicesSection() {
  return (
    <section className=" bg-neutral-100">
      <div className="max-w-[1920px] mx-auto pt-32 pb-28">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-[40px] font-bold text-neutral-1000 mb-20">
            Services
          </h2>

          {/* 그리드 (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
            grid-cols-1(기본)은 1열 / md(화면≥md(768px))는 2열 / lg(화면≥lg(1024px))는 3열 배치 */}
          {/* box-shadow: 0 0 15px #1BC1D726; -> shadow-[3px_10px_20px_#1BC1D726] x축_y축_블러_색상 */}
          {/* transition-all duration-300 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesCards.map((card, index) => (
              <div
                key={index}
                className={`
                  flex flex-col items-center
                  px-[30px] pt-14.5 pb-12.5
                  rounded-[20px]
                  border border-neutral-400
                  hover:border-[#1BC1D7]
                  hover:shadow-[3px_10px_20px_#1BC1D7]/15
                  hover:cursor-pointer
                `}
              >
                <img
                  src={card.icon}
                  alt="services card icon"
                  className="w-16 h-16 mb-7.5"
                />

                <h3 className="text-[18px] font-bold text-neutral-1000 mb-5">
                  {card.title}
                </h3>

                {/* 카드 내용(리스트) */}
                {/* leading 행간 */}
                <ul className="w-full text-left space-y-3">
                  {card.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex text-[16px]  text-neutral-600 leading-[150%]"
                    >
                      <span className="flex items-start">
                        <span className="w-1 h-1 mt-3 mr-2  bg-neutral-600 rounded-full shrink-0" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

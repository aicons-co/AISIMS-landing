import { useState } from 'react'
import EllipseRight from '../assets/supports-illust-ellipse-13.png'
import EllipseLeft from '../assets/supports-illust-ellipse-14.png'
import TutorialImg from '../assets/supports-img-tutorial.png'
import OptimizationCasesImg from '../assets/supports-img-optimization-case.png'
import ArrowRightIcon from '../assets/supports-icon-arrow-right.png'
import ListArrowUpIcon from '../assets/supports-icon-list-arrow-up.png'
import ListArrowDownIcon from '../assets/supports-icon-list-arrow-down.png'

export function Supports() {
  const FAQCards = [
    {
      title: 'Tutorial',
      items: [
        'Step-by-step guides to get started with AISIMS platform and core features.',
      ],
      linkLabel: 'MORE',
      image: TutorialImg,
    },
    {
      title: 'Optimization Cases',
      items: [
        'Real-world examples of successful optimization projects and best practices.',
      ],
      linkLabel: 'View examples',
      image: OptimizationCasesImg,
    },
  ]

  const FAQData = [
    {
      title: 'What types of structural projects does AISIMS support?',
      items: [
        'AISIMS supports a wide range of structural projects including residential buildings, commercial buildings, and large-scale infrastructure such as diaphragm walls. The platform handles columns, beams, slabs, walls, and foundations with rebar-inclusive BIM modeling, all compliant with IFC 4.3 standards.',
      ],
      isOpen: false,
    },
    {
      title: 'How accurate is the automated quantity take-off (QTO)?',
      items: [
        'AISIMS achieves over 99.9% accuracy in quantity calculations through AI-based data extraction and a dual integrity verification system. This eliminates human errors inherent in manual data entry and ensures reliable cost estimation for concrete, rebar, formwork, and structural steel.',
      ],
      isOpen: false,
    },
    {
      title: 'Can AISIMS handle design changes during construction?',
      items: [
        'Yes. When design changes occur, AISIMS automatically updates all related data and documents — including 2D drawings, Shop Drawings, BBS, and BOQ — in real-time. This maintains perfect synchronization between the BIM model and all construction documents, preventing rework caused by outdated information.',
      ],
      isOpen: false,
    },
    {
      title:
        'How does the rebar optimization engine reduce costs and CO₂ emissions?',
      items: [
        'The AI optimization engine simulates tens of thousands of cutting combinations, targeting Near Zero Rebar Cutting Waste. It maximizes material utilization by recommending optimal special-length rebars and evaluating coupler vs. lap splice options, directly reducing both material costs and carbon emissions.',
      ],
      isOpen: false,
    },
    {
      title: 'What file formats does AISIMS accept and output?',
      items: [
        'AISIMS accepts 2D structural drawings in PDF and image formats, using AI parsing algorithms to extract structural data automatically. It outputs IFC 4.3–compliant BIM models, 2D detail drawings, Shop Drawings, Bar Bending Schedules (BBS), Bar Cutting Lists (BCL), and Bills of Quantities (BOQ).',
      ],
      isOpen: false,
    },
  ]

  const [FAQList, setFAQList] = useState(FAQData)
  const toggleFAQ = (index: number) => {
    setFAQList((prevState) =>
      prevState.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    )
  }

  return (
    <section className=" bg-[#05011D]">
      <div className="relative max-w-[1920px] mx-auto pt-32 pb-28">
        <img
          src={EllipseRight}
          className="absolute top-[-5%] right-0 opacity-80 z-0"
        />
        <img
          src={EllipseLeft}
          className="absolute top-70 left-0 opacity-80 z-0"
        />

        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="mb-20 text-[40px] text-neutral-100 font-bold">
            Supports
          </h2>

          {/* 그리드 (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
            grid-cols-1(기본)은 1열 / md(화면≥md(768px))는 2열 / lg(화면≥lg(1024px))는 3열 배치 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-30">
            {FAQCards.map((card, index) => (
              <div
                key={index}
                className={`
                  relative
                  flex flex-col
                  p-12.5
                  bg-neutral-100/10
                  border border-[#333B68] rounded-[20px]
                  hover:border-[#1BC1D7]
                  hover:shadow-[0_0_20px_#1BC1D7]/15
                  hover:cursor-pointer
                  z-10
                `}
              >
                <h3 className="mb-[5px] text-[32px] text-neutral-100 font-bold">
                  {card.title}
                </h3>

                {/* 카드 내용(리스트) */}
                {/* space-y- 자식 요소들간 세로 간격 / leading 행간 */}
                <div className="w-full text-left mb-30 space-y-2 z-10">
                  {card.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="flex text-[18px]  text-neutral-500 leading-[150%]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <p className="flex items-center text-xl text-[#1BC1D7]">
                  {card.linkLabel}
                  <img src={ArrowRightIcon} className="w-8 ml-[5px]" />
                </p>

                <img
                  src={card.image}
                  alt="supports card image"
                  className={`absolute bottom-0 right-0 h-auto z-0
                    ${
                      card.image === OptimizationCasesImg
                        ? 'w-140 mask-[radial-gradient(circle_at_right,white_50%,transparent_80%)]'
                        : 'w-120'
                    }
                    `}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-15">
            <div className="flex flex-col items-start w-full lg:w-2/5">
              <h3 className="mb-[5px] text-[32px] font-bold text-neutral-100">
                FAQ
              </h3>

              <p className="mb-10 text-[18px] text-neutral-500 leading-[150%]">
                Frequently asked questions and troubleshooting guides for common
                issues.
              </p>

              <p className="flex items-center text-xl text-[#1BC1D7] cursor-pointer z-10">
                See all FAQs
                <img src={ArrowRightIcon} className="w-8 ml-[5px]" />
              </p>
            </div>

            {/* FAQ 질문 리스트 */}
            <div className="w-full lg:w-3/5">
              <div className="flex flex-col">
                {FAQList.map((question, idx) => {
                  console.log('idx: ', idx)
                  const isOpen = question.isOpen

                  return (
                    <div key={idx} className="border-b border-neutral-600">
                      <button
                        onClick={() => toggleFAQ(idx)}
                        className={`
                          flex w-full py-6 text-left
                          hover:bg-neutral-100/10 transition-colors cursor-pointer
                        ${idx === 0 ? 'pt-0' : ''}
                          `}
                      >
                        {/* 왼쪽 바 */}
                        <div className="w-1 mr-4 my-1.5 bg-[#1BC1D7] rounded-full shrink-0 " />

                        {/* 질문 타이틀 및 화살표 아이콘 */}
                        <div className="flex justify-between items-start w-full pr-5">
                          <span className="pr-4 text-lg text-neutral-100 leading-[150%]">
                            {question.title}
                          </span>
                          {isOpen ? (
                            <img src={ListArrowUpIcon} className="w-6 h-6" />
                          ) : (
                            <img src={ListArrowDownIcon} className="w-6 h-6" />
                          )}
                        </div>
                      </button>

                      {/* 질문 내용 */}
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${isOpen ? 'pb-6 opacity-100' : 'opacity-0'}
                        `}
                      >
                        <div className="text-neutral-400 leading-[150%]">
                          {isOpen ? question.items : ''}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

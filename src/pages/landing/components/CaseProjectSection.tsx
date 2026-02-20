import KeyIcon from '../assets/case-project-icon-key.png'

export function CaseProjectSection() {
    //
    const caseProjectCards = [
        {
            title: 'Residential buildings',
            attribute: 'key attribute(디자인 시안 진행중)',
            items: ['(시안 진행중)', '(시안 진행중)', '(시안 진행중)'],
            image: KeyIcon,
        },
        {
            title: 'Commercial buildings',
            attribute: 'key attribute(시안 진행중)',
            items: ['(시안 진행중)', '(시안 진행중)', '(시안 진행중)'],
            image: KeyIcon,
        },
        {
            title: 'Massive diaphragm wall',
            attribute: 'key attribute(시안 진행중)',
            items: ['(시안 진행중)', '(시안 진행중)', '(시안 진행중)'],
            image: KeyIcon,
        },
        {
            title: 'Before/After comparison',
            attribute: 'key attribute(시안 진행중)',
            items: ['(시안 진행중)', '(시안 진행중)', '(시안 진행중)'],
            image: KeyIcon,
        },
    ]

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
                  hover:cursor-pointer
                `}
                            >
                                <h3 className="text-[24px] text-neutral-1000 font-bold">
                                    {card.title}
                                </h3>

                                {/* 카드 내용(리스트) */}
                                {/* space-y- 자식 요소들간 세로 간격 / leading 행간 */}
                                <ul className="w-full text-left space-y-1">
                                    {card.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex text-base  text-neutral-600 leading-7"
                                        >
                                            <span className="flex items-start">
                                                <span className="mt-3 mr-2 w-1 h-1 bg-neutral-600 rounded-full shrink-0" />
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

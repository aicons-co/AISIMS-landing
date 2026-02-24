import UsageIcon from '../assets/measurable-value-icon-usage.png';
import UsageImg from '../assets/measurable-value-img-usage.png';
import CuttingIcon from '../assets/measurable-value-icon-cutting.png';
import CuttingImg from '../assets/measurable-value-img-cutting.png';
import DocumentIcon from '../assets/measurable-value-icon-document.png';
import DocumentImg from '../assets/measurable-value-img-document.png';
import CO2Icon from '../assets/measurable-value-icon-CO2.png';
// import CO2Img from '../assets/measurable-value-img-CO2.png';
import CO2Img from '../assets/measurable-value-video-CO2.mp4';
import CostIcon from '../assets/measurable-value-icon-cost.png';
import CostImg from '../assets/measurable-value-img-cost.png';
import ProductivityIcon from '../assets/measurable-value-icon-productivity.png';
// import ProductivityImg from '../assets/measurable-value-img-productivity.png';
import ProductivityImg from '../assets/measurable-video-productivity.mp4';

export function MeasurableValueSection() {
  const measurableValueCards = [
    {
      title: 'Rebar usage',
      items: ['Rebar usage 10–18%↓'],
      image: UsageIcon,
      illust: UsageImg,
      highlightValue: '18',
      unit: '%',
    },
    {
      title: 'Rebar cutting waste',
      items: ['RCW↓ <1%'],
      image: CuttingIcon,
      illust: CuttingImg,
      highlightValue: '<1',
      unit: '%',
    },
    {
      title: 'Automated Documentation',
      items: ['90% Automation Coverage'],
      image: DocumentIcon,
      illust: DocumentImg,
      highlightValue: '90',
      unit: '%',
    },
    {
      title: 'CO₂ emissions',
      items: ['Reduction up to 15% ↓'],
      image: CO2Icon,
      illust: CO2Img,
      highlightValue: '15',
      unit: '%',
      isVideo: true,
    },
    {
      title: 'Construction Cost',
      items: ['Cost Reduction up to 30% ↓'],
      image: CostIcon,
      illust: CostImg,
      highlightValue: '30',
      unit: '%',
    },
    {
      title: 'Productivity',
      items: ['Increase up to 00%'],
      image: ProductivityIcon,
      illust: ProductivityImg,
      highlightValue: '00',
      unit: '%',
      isVideo: true,
    },
  ];

  return (
    <section className=" bg-[#F7F7F8]">
      <div className="relative max-w-[1920px] mx-auto pt-32 pb-28">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="mb-20 text-[40px] text-neutral-1000 font-semibold tracking-[-1%]">
            Measurable Value
          </h2>

          {/* 그리드 (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
            grid-cols-1(기본)은 1열 / md(화면≥md(768px))는 2열 / lg(화면≥lg(1024px))는 3열 배치 */}
          {/* box-shadow: 0 0 15px #1BC1D726; -> shadow-[3_10_20_#1BC1D726] x축_y축_블러_색상 */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {measurableValueCards.map((card, index) => (
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
              > */}
          {/* 📌 mb 조정 필요 */}
          {/* <div className="mb-">
                  <img
                    src={card.image}
                    alt="resources card icon"
                    className="w-16 h-16"
                  />
                  <h3 className="text-[20px] text-neutral-1000 font-bold">
                    {card.title}
                  </h3>
                </div> */}

          {/* 카드 내용(리스트) */}
          {/* space-y- 자식 요소들간 세로 간격 / leading 행간 */}
          {/* <ul className="w-full text-left space-y-1">
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
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {measurableValueCards.map((card, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-8 md:p-10
                rounded-[20px] overflow-hidden min-h-80"
              >
                {/* 1. 배경 이미지 (카드 크기에 맞게 꽉 채움) */}
                {/* <img
                  src={card.illust}
                  alt={`${card.title} background`}
                  className="absolute inset-0 w-full h-full
                  object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                /> */}
                {card.isVideo ? (
                  <video
                    src={card.illust}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="
                      absolute inset-0 w-full h-full
                      object-cover z-0 transition-transform duration-700
                      group-hover:scale-110
                    "
                  />
                ) : (
                  <img
                    src={card.illust}
                    alt={`${card.title} background`}
                    className="
                      absolute inset-0 w-full h-full
                      object-cover z-0 transition-transform duration-700
                      group-hover:scale-110
                    "
                  />
                )}

                {/* 2. 어두운 오버레이 (텍스트 가독성을 위한 그라데이션) */}
                <div
                  className="absolute inset-0
                  bg-linear-to-b from-black/60 via-black/40 to-black/80 z-10
                  transition-opacity duration-300 group-hover:opacity-90"
                />

                {/* 3. 카드 상단 컨텐츠 (아이콘, 타이틀, 설명) */}
                <div className="relative z-20 flex flex-col items-start mb-21">
                  {/* 아이콘에 반투명한 배경을 주어 이미지 2의 스타일 느낌 구현 */}
                  <div
                    className="flex items-center justify-center
                    w-16 h-16 mb-5 p-2 bg-white/10 backdrop-blur-sm rounded-xl"
                  >
                    <img
                      src={card.image}
                      alt={`${card.title} icon`}
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <h3 className="mb-2 text-[20px] text-white font-semibold">
                    {card.title}
                  </h3>

                  <ul className="w-full text-left space-y-1">
                    {card.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-300 font-regular"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. 카드 우측 하단 큰 숫자 (flex를 사용하여 하단 끝으로 밀어냄) */}
                <div className="relative z-20 flex justify-end items-baseline">
                  <span
                    className="
                      text-5xl md:text-6xl
                      font-semibold text-white tracking-tighter
                      "
                  >
                    {card.highlightValue}
                  </span>
                  <span className="ml-1 text-2xl md:text-3xl font-semibold text-white">
                    {card.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

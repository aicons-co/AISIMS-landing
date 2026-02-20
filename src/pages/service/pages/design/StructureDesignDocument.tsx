import { PDFViewer2D } from '../../components/PDFViewer2D'

type StoryZone = {
  story: string
  zone: string
  height: string
  area: string
}

type GridSpan = {
  direction: string
  grid: string
  span: string
  spacing: string
}

type MemberCount = {
  type: string
  count: number
  description: string
}

type DesignSummary = {
  member: string
  maxMoment: string
  maxShear: string
  maxAxial: string
  unit: string
}

type RebarQuantity = {
  member: string
  rebarType: string
  quantity: string
  unit: string
}

export function StructureDesignDocument() {
  // PDF 원문 파일 경로 (현재는 없음)
  const pdfUrl: string | null = null // 실제로는 '/path/to/structure-calculation.pdf' 같은 경로
  const hasPdf = false // PDF 파일 존재 여부

  // AISIMS 자동 요약정보 - 구조 모델 개요
  const modelOverview = {
    buildingName: 'A타워 신축',
    structureType: '철근콘크리트 구조',
    totalStories: '지하 2층, 지상 25층',
    totalHeight: '98.5',
    totalArea: '45,230',
    designCode: 'KDS 14 20 20',
    seismicZone: 'II',
  }

  // Story/Zone 구성
  const storyZones: StoryZone[] = [
    { story: 'B2', zone: '지하주차장', height: '3.5', area: '2,150' },
    { story: 'B1', zone: '지하주차장', height: '3.5', area: '2,150' },
    { story: '1F', zone: '로비/상업', height: '5.0', area: '1,850' },
    { story: '2F~24F', zone: '오피스', height: '3.6', area: '1,650' },
    { story: '25F', zone: '기계실', height: '4.5', area: '1,200' },
  ]

  // Grid/Span 구성
  const gridSpans: GridSpan[] = [
    { direction: 'X방향', grid: 'A~H', span: '8.0m', spacing: '8.0m' },
    { direction: 'Y방향', grid: '1~12', span: '7.5m', spacing: '7.5m' },
    { direction: '기둥간격', grid: '-', span: '8.0m × 7.5m', spacing: '-' },
  ]

  // 부재별 갯수
  const memberCounts: MemberCount[] = [
    { type: '기둥', count: 96, description: '지하 2층 ~ 지상 25층' },
    { type: '보', count: 384, description: '주보 및 보조보' },
    { type: '벽', count: 48, description: '내력벽 및 전단벽' },
    { type: '슬래브', count: 27, description: '바닥슬래브 및 지붕' },
    { type: '기초', count: 96, description: '독립기초 및 복합기초' },
    { type: 'D-Wall', count: 120, description: '지하연속벽' },
  ]

  // 주요 부재별 설계 결과 Summary
  const designSummaries: DesignSummary[] = [
    {
      member: '기둥',
      maxMoment: '1,250',
      maxShear: '850',
      maxAxial: '12,500',
      unit: 'kN·m / kN / kN',
    },
    {
      member: '보',
      maxMoment: '2,150',
      maxShear: '1,200',
      maxAxial: '-',
      unit: 'kN·m / kN / -',
    },
    {
      member: '벽',
      maxMoment: '3,500',
      maxShear: '2,800',
      maxAxial: '15,200',
      unit: 'kN·m / kN / kN',
    },
    {
      member: '슬래브',
      maxMoment: '85.5',
      maxShear: '125.0',
      maxAxial: '-',
      unit: 'kN·m/m / kN/m / -',
    },
    {
      member: '기초',
      maxMoment: '450',
      maxShear: '320',
      maxAxial: '15,500',
      unit: 'kN·m / kN / kN',
    },
  ]

  // 소요 철근량 (마이다스 설계 기준)
  const rebarQuantities: RebarQuantity[] = [
    { member: '기둥', rebarType: 'D25', quantity: '45.2', unit: 'ton' },
    { member: '기둥', rebarType: 'D22', quantity: '28.5', unit: 'ton' },
    { member: '보', rebarType: 'D25', quantity: '32.8', unit: 'ton' },
    { member: '보', rebarType: 'D19', quantity: '18.2', unit: 'ton' },
    { member: '벽', rebarType: 'D22', quantity: '22.5', unit: 'ton' },
    { member: '벽', rebarType: 'D16', quantity: '15.3', unit: 'ton' },
    { member: '슬래브', rebarType: 'D13', quantity: '42.5', unit: 'ton' },
    { member: '기초', rebarType: 'D25', quantity: '18.5', unit: 'ton' },
    { member: 'D-Wall', rebarType: 'D25', quantity: '35.2', unit: 'ton' },
    { member: 'D-Wall', rebarType: 'D19', quantity: '28.8', unit: 'ton' },
  ]

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">구조설계서</h2>

      {/* 1) 구조계산서 */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">1) 구조계산서</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            구조계산서 PDF 원문
          </p>
        </div>
        {hasPdf && pdfUrl ? (
          <div className="w-full h-[800px]">
            <PDFViewer2D
              pdfUrl={pdfUrl}
              pdfFileName="구조계산서.pdf"
              enableZoom={true}
              enableDownload={true}
            />
          </div>
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 border-dashed">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-neutral-400 dark:text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                보여줄 데이터가 없습니다
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                구조계산서 PDF 파일이 업로드되지 않았습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AISIMS 자동 요약정보 */}
      <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            2) AISIMS 자동 요약정보
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            구조 모델 자동 분석 및 요약 정보
          </p>
        </div>

        {/* 구조 모델 개요 */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">• 구조 모델 개요</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                건물명
              </div>
              <div className="font-semibold">{modelOverview.buildingName}</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                구조형식
              </div>
              <div className="font-semibold">{modelOverview.structureType}</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                층수
              </div>
              <div className="font-semibold">{modelOverview.totalStories}</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                전체 높이
              </div>
              <div className="font-semibold">{modelOverview.totalHeight} m</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                전체 면적
              </div>
              <div className="font-semibold">{modelOverview.totalArea} m²</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                설계기준
              </div>
              <div className="font-semibold">{modelOverview.designCode}</div>
            </div>
          </div>
        </div>

        {/* Story/Zone 구성 */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">• Story/Zone 구성</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    층
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    Zone
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    층고 (m)
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    면적 (m²)
                  </th>
                </tr>
              </thead>
              <tbody>
                {storyZones.map((zone, index) => (
                  <tr
                    key={index}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">
                      {zone.story}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {zone.zone}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {zone.height}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {zone.area}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grid/Span 구성 */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">• Grid/Span 구성</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    방향
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    Grid
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    Span
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    간격
                  </th>
                </tr>
              </thead>
              <tbody>
                {gridSpans.map((grid, index) => (
                  <tr
                    key={index}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">
                      {grid.direction}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {grid.grid}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {grid.span}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {grid.spacing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 주요 부재별 설계 결과 Summary */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">
            • 주요 부재별 설계 결과 Summary
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    부재
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    최대 모멘트
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    최대 전단력
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    최대 축력
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    단위
                  </th>
                </tr>
              </thead>
              <tbody>
                {designSummaries.map((summary, index) => (
                  <tr
                    key={index}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">
                      {summary.member}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {summary.maxMoment}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {summary.maxShear}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {summary.maxAxial}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs">
                      {summary.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 부재별 갯수 */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">
            • 기둥/보/벽/슬래브/기초/D-Wall 등 부재별 갯수
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberCounts.map((member, index) => (
              <div
                key={index}
                className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">{member.count}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    개
                  </span>
                </div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                  {member.type}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {member.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 소요 철근량 (마이다스 설계 기준) */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-4">
            • 소요 철근량 (마이다스 설계 기준)
          </h4>
          <div className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
            마이다스 산출 물량 표기
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    부재
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    철근 규격
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    소요량
                  </th>
                  <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700">
                    단위
                  </th>
                </tr>
              </thead>
              <tbody>
                {rebarQuantities.map((rebar, index) => (
                  <tr
                    key={index}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">
                      {rebar.member}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {rebar.rebarType}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                      {rebar.quantity}
                    </td>
                    <td className="p-2 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                      {rebar.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-100 dark:bg-neutral-800 font-semibold">
                  <td
                    colSpan={2}
                    className="p-2 border border-neutral-300 dark:border-neutral-700 text-right"
                  >
                    총계
                  </td>
                  <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                    {rebarQuantities
                      .reduce((sum, r) => sum + parseFloat(r.quantity), 0)
                      .toFixed(1)}
                  </td>
                  <td className="p-2 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                    ton
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

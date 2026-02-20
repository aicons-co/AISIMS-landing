import { useState } from 'react'
import { PDFViewer2D } from '../../components/PDFViewer2D'

type DesignCode = {
  name: string
  version: string
  provisions: {
    title: string
    summary: string
    aisimsFormula: string
    example?: string
  }[]
}

type ProjectSpec = {
  type: string
  name: string
  hasPdf: boolean
  pdfUrl?: string
}

type AISIMSRule = {
  category: string
  rules: {
    name: string
    description: string
    formula?: string
    examples?: string[]
  }[]
}

type RevisionImpact = {
  revision: string
  changedStandard: string
  affectedMembers: string[]
  affectedRebar: string[]
  impactAnalysis: string
}

export function StandardsSpecifications() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null)

  // A. 국제/국내 설계 규준
  const designCodes: DesignCode[] = [
    {
      name: 'ACI 318',
      version: '2019',
      provisions: [
        {
          title: 'Lap Length',
          summary: 'Lap splice 길이 계산 기준',
          aisimsFormula: 'Lap splice 길이 = 1.3 × ld × (As_req / As_prov)',
          example:
            'D25 철근: Lap splice 길이 = 1.3 × 1,200mm × (4,500 / 4,910) = 1,430mm',
        },
        {
          title: 'Development Length',
          summary: '정착 길이 계산 기준',
          aisimsFormula: 'ld = (fy × ψt × ψe × ψs) / (1.1 × √fck × cb)',
          example: 'D25 철근: ld = 1,200mm (기본값)',
        },
        {
          title: 'Hook Length',
          summary: '갈고리 길이 계산 기준',
          aisimsFormula: 'Hook Length = 12 × dia (표준 후크)',
          example: 'D25 철근: Hook Length = 12 × 25mm = 300mm',
        },
      ],
    },
    {
      name: 'Eurocode 2',
      version: '2004',
      provisions: [
        {
          title: 'Lap Length',
          summary: 'Lap splice 길이 계산 기준',
          aisimsFormula:
            'Lap splice 길이 = α1 × α2 × α3 × α5 × α6 × lb,req × (As_req / As_prov)',
          example: 'D25 철근: Lap splice 길이 = 1,500mm',
        },
        {
          title: 'Development Length',
          summary: '정착 길이 계산 기준',
          aisimsFormula: 'lb,req = (φ / 4) × (σsd / fbd)',
          example: 'D25 철근: lb,req = 1,200mm',
        },
      ],
    },
    {
      name: 'BS8110 / BS8666',
      version: '1997 / 2005',
      provisions: [
        {
          title: 'Lap Length',
          summary: 'Lap splice 길이 계산 기준',
          aisimsFormula:
            'Lap splice 길이 = 40 × dia (압축부), 50 × dia (인장부)',
          example: 'D25 철근: Lap splice 길이 = 50 × 25mm = 1,250mm (인장부)',
        },
      ],
    },
    {
      name: 'KDS 14 20xx RC 구조 기준',
      version: '2023',
      provisions: [
        {
          title: 'Lap Length',
          summary: 'Lap splice 길이 계산 기준',
          aisimsFormula: 'Lap splice 길이 = α × ld × (As_req / As_prov)',
          example:
            'D25 철근: Lap splice 길이 = 1.2 × 1,200mm × (4,500 / 4,910) = 1,320mm',
        },
        {
          title: 'Development Length',
          summary: '정착 길이 계산 기준',
          aisimsFormula: 'ld = (fy × α × β × γ) / (4 × fck^0.5)',
          example: 'D25 철근: ld = 1,200mm',
        },
        {
          title: 'Coupler 금지 구역',
          summary: 'Plastic Hinge Zone에서 Coupler 사용 금지',
          aisimsFormula:
            'Coupler 금지 구역: Plastic Hinge Zone (보 양단부, 기둥 상하단부)',
          example: '보 양단부 2h 구간, 기둥 상하단부 1.5h 구간',
        },
      ],
    },
    {
      name: '국내 특수 규정(지진/풍하중/현장 조건)',
      version: '2024',
      provisions: [
        {
          title: '지진하중 기준',
          summary: 'KDS 17 10 00 지진하중 기준 적용',
          aisimsFormula: '설계 지진하중 = Sd × W',
          example: '설계 지진하중 = 0.15g × 건물중량',
        },
        {
          title: '풍하중 기준',
          summary: 'KDS 42 10 22 풍하중 기준 적용',
          aisimsFormula: '설계 풍하중 = q × Cp × A',
          example: '설계 풍하중 = 0.7 kN/m²',
        },
      ],
    },
  ]

  // B. 프로젝트 시방서
  const projectSpecs: ProjectSpec[] = [
    { type: '발주처 시방서', name: '발주처 시방서.pdf', hasPdf: false },
    { type: '감리 지침', name: '감리 지침서.pdf', hasPdf: false },
    { type: '시공사 기준서', name: '시공사 기준서.pdf', hasPdf: false },
    {
      type: '철근가공 및 조달 기준',
      name: '철근가공 및 조달 기준서.pdf',
      hasPdf: false,
    },
  ]

  // C. AISIMS 내부 규준
  const aisimsRules: AISIMSRule[] = [
    {
      category: 'Rebar Cutting Rule',
      rules: [
        {
          name: '표준 절단 길이',
          description: '12m 이하 표준 길이 우선 사용',
          examples: ['10.5m', '10.8m', '11.0m', '11.5m', '12.0m'],
        },
        {
          name: 'Special-length 후보군',
          description: '최적화를 위한 Special-length 후보군',
          examples: [
            '10.5m',
            '10.8m',
            '11.0m',
            '11.2m',
            '11.5m',
            '11.8m',
            '12.0m',
          ],
        },
      ],
    },
    {
      category: 'Lap/Coupler Length 규칙',
      rules: [
        {
          name: 'Lap Length 계산',
          description: '설계 기준에 따른 Lap Length 자동 계산',
          formula: 'Lap Length = α × ld × (As_req / As_prov)',
        },
        {
          name: 'Coupler Length',
          description: '압착/인나사 Coupler 길이',
          formula: 'Coupler Length = 200mm (압착), 300mm (인나사)',
        },
        {
          name: 'Coupler 금지 구역',
          description: 'Plastic Hinge Zone에서 Coupler 사용 금지',
          formula: '금지 구역: 보 양단부 2h, 기둥 상하단부 1.5h',
        },
      ],
    },
    {
      category: 'Minimum Clear Cover 규칙',
      rules: [
        {
          name: '기본 피복두께',
          description: '설계 기준에 따른 최소 피복두께',
          formula: '기둥: 40mm, 보: 30mm, 슬래브: 20mm',
        },
      ],
    },
    {
      category: 'Development Length 수식',
      rules: [
        {
          name: 'Development Length 계산',
          description: '설계 기준에 따른 Development Length 계산',
          formula: 'ld = (fy × α × β × γ) / (4 × fck^0.5)',
        },
      ],
    },
    {
      category: 'Bar Mark 생성 규칙(ISO-19650 Naming)',
      rules: [
        {
          name: 'Bar Mark 형식',
          description: 'ISO-19650 표준에 따른 Bar Mark 명명 규칙',
          formula: 'BM-[부재ID]-[위치]-[직경]-[순번]',
          examples: ['BM-C001-T-D25-001', 'BM-B012-B-D22-002'],
        },
      ],
    },
    {
      category: 'Rebar Optimization 알고리즘 개요',
      rules: [
        {
          name: '최적화 목표',
          description: '철근 폐기물 최소화 및 Special-length 활용 극대화',
          formula: 'Minimize: Σ(폐기물 길이) + Σ(Special-length 비용)',
        },
        {
          name: '제약 조건',
          description: '설계 기준 준수 및 시공성 확보',
          formula: 'Lap Length ≥ 설계 기준값, Coupler 금지 구역 준수',
        },
      ],
    },
  ]

  // D. Revision 연동
  const revisionImpacts: RevisionImpact[] = [
    {
      revision: 'Rev 2.1',
      changedStandard: 'KDS 14 20xx RC 구조 기준',
      affectedMembers: ['C-001', 'C-002', 'B-012', 'B-015'],
      affectedRebar: ['BM-C001-T-D25-001', 'BM-B012-B-D22-002'],
      impactAnalysis:
        'Lap Length 기준 변경으로 인해 4개 부재의 배근 정보 수정 필요',
    },
    {
      revision: 'Rev 2.0',
      changedStandard: 'ACI 318',
      affectedMembers: ['W-031', 'S-201'],
      affectedRebar: ['BM-W031-H-D13-001'],
      impactAnalysis:
        'Development Length 기준 변경으로 인해 2개 부재의 배근 정보 수정 필요',
    },
  ]

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">규준 및 시방서</h2>

      {/* A. 국제/국내 설계 규준 */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          A. 국제/국내 설계 규준 (Design Codes)
        </h3>
        <div className="space-y-4">
          {designCodes.map((code, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {code.name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    버전: {code.version}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCode(
                      selectedCode === code.name ? null : code.name,
                    )
                  }
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                >
                  {selectedCode === code.name ? '접기' : '상세보기'}
                </button>
              </div>
              {selectedCode === code.name && (
                <div className="mt-4 space-y-3 pt-4 border-t border-neutral-300 dark:border-neutral-700">
                  {code.provisions.map((provision, pIndex) => (
                    <div
                      key={pIndex}
                      className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700"
                    >
                      <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        {provision.title}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        {provision.summary}
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 mb-2">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                          AISIMS 적용 수식:
                        </div>
                        <div className="text-sm font-mono text-blue-900 dark:text-blue-100">
                          {provision.aisimsFormula}
                        </div>
                      </div>
                      {provision.example && (
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                            예시:
                          </div>
                          <div className="text-sm text-green-900 dark:text-green-100">
                            {provision.example}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* B. 프로젝트 시방서 */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          B. 프로젝트 시방서(Project Specifications)
        </h3>
        <div className="space-y-4">
          {projectSpecs.map((spec, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {spec.type}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {spec.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedSpec(
                      selectedSpec === spec.type ? null : spec.type,
                    )
                  }
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                >
                  {selectedSpec === spec.type ? '닫기' : '보기'}
                </button>
              </div>
              {selectedSpec === spec.type && (
                <div className="mt-4">
                  {spec.hasPdf && spec.pdfUrl ? (
                    <div className="h-[600px]">
                      <PDFViewer2D
                        pdfUrl={spec.pdfUrl}
                        pdfFileName={spec.name}
                        enableZoom={true}
                        enableDownload={true}
                      />
                    </div>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 border-dashed">
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
                          {spec.name} 파일이 업로드되지 않았습니다.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* C. AISIMS 내부 규준 */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          C. AISIMS 내부 규준(AISIMS Codebook)
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          AISIMS가 자동 설계/배근/최적화에 사용하는 수식 및 기준. Client는 이
          메뉴를 통해 AISIMS 알고리즘의 근거와 준거 규준을 확인할 수 있음.
        </p>
        <div className="space-y-6">
          {aisimsRules.map((ruleCategory, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700"
            >
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                {ruleCategory.category}
              </h4>
              <div className="space-y-3">
                {ruleCategory.rules.map((rule, rIndex) => (
                  <div
                    key={rIndex}
                    className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      {rule.name}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {rule.description}
                    </div>
                    {rule.formula && (
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 mb-2">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                          수식:
                        </div>
                        <div className="text-sm font-mono text-blue-900 dark:text-blue-100">
                          {rule.formula}
                        </div>
                      </div>
                    )}
                    {rule.examples && rule.examples.length > 0 && (
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                          예시:
                        </div>
                        <div className="text-sm text-green-900 dark:text-green-100">
                          {rule.examples.map((ex, exIndex) => (
                            <span
                              key={exIndex}
                              className="inline-block mr-2 px-2 py-1 bg-white dark:bg-neutral-800 rounded"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* D. Revision 연동 */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">D. Revision 연동</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          규준 변경 → 어떤 부재/배근 정보에 영향이 있는지 자동 영향도 분석 제공
        </p>
        <div className="space-y-4">
          {revisionImpacts.map((impact, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded text-sm font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      {impact.revision}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {impact.changedStandard}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    {impact.impactAnalysis}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                    영향받는 부재
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {impact.affectedMembers.map((member, mIndex) => (
                      <span
                        key={mIndex}
                        className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                    영향받는 배근
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {impact.affectedRebar.map((rebar, rIndex) => (
                      <span
                        key={rIndex}
                        className="px-2 py-1 rounded text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700"
                      >
                        {rebar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

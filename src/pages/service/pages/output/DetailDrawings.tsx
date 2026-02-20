import { useState } from 'react'
import { PDFViewer2D } from '../../components/PDFViewer2D'
import { BimViewer3D } from '../../components/BimViewer3D'

type DrawingType = 'foundation' | 'column' | 'beam' | 'slab' | 'wall' | 'dwall'

type DetailRebarDrawing = {
  id: string
  type: DrawingType
  name: string
  level: string
  grid?: string
  axis?: string
  panel?: string
  hasDrawing: boolean
  drawingUrl?: string
}

type RevisionChange = {
  revision: string
  changeType: string
  affectedMembers: string[]
  changeDetails: string
  relatedIssue?: string
}

export function DetailDrawings() {
  const [selectedDrawing, setSelectedDrawing] =
    useState<DetailRebarDrawing | null>(null)
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const [selectedRevision, setSelectedRevision] = useState<string | null>(null)

  // ① 상세 배근도(Detail Rebar Drawings)
  const detailRebarDrawings: DetailRebarDrawing[] = [
    {
      id: 'DR-001',
      type: 'foundation',
      name: '기초 상세도',
      level: 'B1',
      grid: 'A-3',
      hasDrawing: true,
      drawingUrl: '/2D/sample.pdf',
    },
    {
      id: 'DR-002',
      type: 'column',
      name: '기둥 상세도',
      level: '3F',
      grid: 'A-3',
      axis: 'Axis-A',
      hasDrawing: true,
    },
    {
      id: 'DR-003',
      type: 'beam',
      name: '보 상세도',
      level: '3F',
      grid: 'A-3',
      axis: 'Axis-1',
      hasDrawing: true,
    },
    {
      id: 'DR-004',
      type: 'slab',
      name: '슬래브 상세도',
      level: '3F',
      grid: 'A-3',
      hasDrawing: true,
    },
    {
      id: 'DR-005',
      type: 'wall',
      name: '벽 상세도',
      level: '3F',
      grid: 'A-3',
      axis: 'Axis-A',
      hasDrawing: true,
    },
    {
      id: 'DR-006',
      type: 'dwall',
      name: 'D-Wall 상세도',
      level: 'B1',
      panel: 'Panel-01',
      hasDrawing: true,
    },
  ]

  // ③ Revision 상세 표시
  const revisionChanges: RevisionChange[] = [
    {
      revision: 'Rev 3.2',
      changeType: '배근 변경',
      affectedMembers: ['C-001', 'B-012'],
      changeDetails: '기둥 C-001: D25@8 → D25@7, 보 B-012: 상부 철근 증가',
      relatedIssue: 'Issue-2025-001',
    },
    {
      revision: 'Rev 2.1',
      changeType: '단면 변경',
      affectedMembers: ['W-031'],
      changeDetails: '벽 W-031: 두께 200mm → 250mm',
    },
  ]

  const getDrawingTypeLabel = (type: DrawingType) => {
    switch (type) {
      case 'foundation':
        return '기초'
      case 'column':
        return '기둥'
      case 'beam':
        return '보'
      case 'slab':
        return '슬래브'
      case 'wall':
        return '벽'
      case 'dwall':
        return 'D-Wall'
    }
  }

  const handleDownload = (
    format: 'PDF' | 'DWG' | 'PNG' | 'JPEG',
    size?: 'A1' | 'A3',
  ) => {
    // 실제로는 해당 형식으로 다운로드
    console.log(`Downloading as ${format}${size ? ` (${size})` : ''}`)
    alert(`${format}${size ? ` (${size})` : ''} 형식으로 다운로드합니다.`)
  }

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">실시도면</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 좌측: 도면 목록 */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-4">
              ① 상세 배근도(Detail Rebar Drawings)
            </h3>
            <div className="space-y-2">
              {detailRebarDrawings.map((drawing) => (
                <button
                  key={drawing.id}
                  type="button"
                  onClick={() => setSelectedDrawing(drawing)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedDrawing?.id === drawing.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-700'
                      : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                    {drawing.name}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    {getDrawingTypeLabel(drawing.type)} · {drawing.level}
                    {drawing.grid && ` · ${drawing.grid}`}
                    {drawing.axis && ` · ${drawing.axis}`}
                    {drawing.panel && ` · ${drawing.panel}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 도면 뷰어 및 정보 */}
        <div className="lg:col-span-3 space-y-6">
          {selectedDrawing ? (
            <>
              {/* 뷰 모드 선택 및 다운로드 옵션 */}
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      뷰 모드:
                    </label>
                    <button
                      type="button"
                      onClick={() => setViewMode('2d')}
                      className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                        viewMode === '2d'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      2D 뷰
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('3d')}
                      className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                        viewMode === '3d'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      3D Rebar View
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      다운로드:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDownload('PDF', 'A1')}
                      className="px-3 py-1.5 rounded text-sm bg-green-500 hover:bg-green-600 text-white transition-colors"
                    >
                      PDF (A1)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('PDF', 'A3')}
                      className="px-3 py-1.5 rounded text-sm bg-green-500 hover:bg-green-600 text-white transition-colors"
                    >
                      PDF (A3)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('DWG')}
                      className="px-3 py-1.5 rounded text-sm bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                    >
                      DWG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('PNG')}
                      className="px-3 py-1.5 rounded text-sm bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                    >
                      PNG
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('JPEG')}
                      className="px-3 py-1.5 rounded text-sm bg-pink-500 hover:bg-pink-600 text-white transition-colors"
                    >
                      JPEG
                    </button>
                  </div>
                </div>
              </div>

              {/* ② 2D/3D 상세 뷰 */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
                {viewMode === '2d' ? (
                  <div className="h-[700px]">
                    {selectedDrawing.hasDrawing &&
                    selectedDrawing.drawingUrl ? (
                      <PDFViewer2D
                        pdfUrl={selectedDrawing.drawingUrl}
                        pdfFileName={`${selectedDrawing.name}.pdf`}
                        enableZoom={true}
                        enableDownload={true}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
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
                            도면 파일이 생성되지 않았습니다.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-[700px]">
                    <BimViewer3D
                      onElementClick={(id) =>
                        console.log('Element clicked:', id)
                      }
                    />
                  </div>
                )}
              </div>

              {/* 도면 상세 정보 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">도면 정보</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      도면 ID
                    </div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {selectedDrawing.id}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      부재 종류
                    </div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {getDrawingTypeLabel(selectedDrawing.type)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      Level
                    </div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {selectedDrawing.level}
                    </div>
                  </div>
                  {selectedDrawing.grid && (
                    <div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        Grid
                      </div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedDrawing.grid}
                      </div>
                    </div>
                  )}
                  {selectedDrawing.axis && (
                    <div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        Axis
                      </div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedDrawing.axis}
                      </div>
                    </div>
                  )}
                  {selectedDrawing.panel && (
                    <div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        Panel
                      </div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {selectedDrawing.panel}
                      </div>
                    </div>
                  )}
                </div>
                {/* 상세 배근도 설명 */}
                <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="font-medium mb-2">포함 내용:</div>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>기초/기둥/보/슬래브/벽/D-Wall 단면 상세</li>
                      <li>
                        수직 부재의 입면 배근도 (기둥, 보, 벽: Axis별, D-Wall:
                        판넬별)
                      </li>
                      <li>Rebar spacing, cover, hook, lap 위치 표시</li>
                      <li>
                        벽·슬래브의 분배 철근 / 온도철근 표시 / 기타 보강근 표시
                      </li>
                      <li>D-Wall의 cage 상세도 및 joint 상세</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ③ Revision 상세 표시 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">
                  ③ Revision 상세 표시
                </h3>
                <div className="space-y-4">
                  {revisionChanges
                    .filter((rev) =>
                      rev.affectedMembers.some((m) =>
                        selectedDrawing.id.includes(m.split('-')[1]),
                      ),
                    )
                    .map((rev, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded text-sm font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              {rev.revision}
                            </span>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {rev.changeType}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRevision(
                                selectedRevision === rev.revision
                                  ? null
                                  : rev.revision,
                              )
                            }
                            className="px-3 py-1.5 rounded text-sm bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                          >
                            {selectedRevision === rev.revision
                              ? '접기'
                              : '이전 Revision 대비 변경사항'}
                          </button>
                        </div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                          {rev.changeDetails}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {rev.affectedMembers.map((member, mIndex) => (
                            <span
                              key={mIndex}
                              className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                        {rev.relatedIssue && (
                          <div className="mt-3 pt-3 border-t border-yellow-300 dark:border-yellow-700">
                            <div className="text-xs text-neutral-600 dark:text-neutral-400">
                              연결된 Issue:{' '}
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {rev.relatedIssue}
                              </span>
                            </div>
                          </div>
                        )}
                        {selectedRevision === rev.revision && (
                          <div className="mt-4 p-3 bg-white dark:bg-neutral-800 rounded border border-yellow-200 dark:border-yellow-800">
                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                              변경 전후 비교:
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <div className="text-neutral-500 dark:text-neutral-400 mb-1">
                                  변경 전
                                </div>
                                <div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                                  기둥 C-001: D25@8, 보 B-012: 상부 3-D25
                                </div>
                              </div>
                              <div>
                                <div className="text-neutral-500 dark:text-neutral-400 mb-1">
                                  변경 후
                                </div>
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                                  기둥 C-001: D25@7, 보 B-012: 상부 4-D25
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  {revisionChanges.filter((rev) =>
                    rev.affectedMembers.some((m) =>
                      selectedDrawing.id.includes(m.split('-')[1]),
                    ),
                  ).length === 0 && (
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        이 도면에 대한 Revision 변경사항이 없습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 text-center">
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
                도면을 선택하세요
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                좌측 목록에서 확인할 도면을 선택하세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

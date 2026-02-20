import { useState } from 'react'
import { BimViewer3D } from '../../components/BimViewer3D'

type MemberInfo = {
  memberId: string
  level: string
  grid: string
  memberType: '기둥' | '보' | '벽' | '슬래브' | 'D-Wall' | '기초'
  section: string
  length?: string
  thickness?: string
}

type MaterialInfo = {
  fck: string
  fy: string
  rebarDetails: {
    location: 'top' | 'bottom' | 'side' | 'stirrup'
    diameter: string
    spacing: string
    barMark: string
  }[]
}

type DesignInfo = {
  governingLoadComb: string
  nMax: string
  m3Max: string
  v2Max: string
  asReq: string
  asProv: string
  asProvWithLoss: string
  optimizedAs: string
}

type RevisionStatus = {
  revision: string
  changeType: string
  hasChanges: boolean
}

type RebarViewMode = {
  showRebarOnly: boolean
  showMainRebar: boolean
  showStirrup: boolean
  showCoupler: boolean
  showLapping: boolean
  showBarMark: boolean
}

type ClashStatus = {
  hasClash: boolean
  clashPoints: number
  status: '해결됨' | 'Pending' | '미배정'
}

export function BimViewer() {
  const [selectedMember, setSelectedMember] = useState<MemberInfo | null>({
    memberId: 'C-001',
    level: '3F',
    grid: 'A-3',
    memberType: '기둥',
    section: '600×600',
  })

  const [rebarViewMode, setRebarViewMode] = useState<RebarViewMode>({
    showRebarOnly: false,
    showMainRebar: true,
    showStirrup: true,
    showCoupler: true,
    showLapping: true,
    showBarMark: true,
  })

  const [showClashOverlay, setShowClashOverlay] = useState(false)

  // 샘플 데이터
  const materialInfo: MaterialInfo = {
    fck: 'C30/37',
    fy: 'SD400',
    rebarDetails: [
      { location: 'top', diameter: 'D25', spacing: '@200', barMark: 'BM-001' },
      {
        location: 'bottom',
        diameter: 'D25',
        spacing: '@200',
        barMark: 'BM-002',
      },
      { location: 'side', diameter: 'D22', spacing: '@250', barMark: 'BM-003' },
      {
        location: 'stirrup',
        diameter: 'D10',
        spacing: '@200',
        barMark: 'BM-004',
      },
    ],
  }

  const designInfo: DesignInfo = {
    governingLoadComb: '1.2DL + 1.6LL + 1.0EQ',
    nMax: '12,500',
    m3Max: '2,150',
    v2Max: '1,200',
    asReq: '4,500',
    asProv: '4,910',
    asProvWithLoss: '4,665',
    optimizedAs: '4,520',
  }

  const revisionStatus: RevisionStatus = {
    revision: 'Rev 3.2',
    changeType: '배근 변경',
    hasChanges: true,
  }

  const clashStatus: ClashStatus = {
    hasClash: true,
    clashPoints: 3,
    status: 'Pending',
  }

  const handleElementClick = (elementId: string) => {
    // 실제로는 BIM 모델에서 요소 정보를 가져옴
    setSelectedMember({
      memberId: elementId,
      level: '3F',
      grid: 'A-3',
      memberType: '기둥',
      section: '600×600',
    })
  }

  const handleExport = (format: 'IFC' | 'GLTF' | 'Snapshot') => {
    // 실제로는 해당 형식으로 내보내기
    console.log(`Exporting as ${format}`)
  }

  const handleShare = () => {
    // 실제로는 View 링크 생성 및 공유
    const viewLink = `${window.location.origin}/bim/view/${selectedMember?.memberId}`
    navigator.clipboard.writeText(viewLink)
    alert('View 링크가 클립보드에 복사되었습니다.')
  }

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">BIM Viewer</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 3D 뷰어 */}
        <div className="lg:col-span-2">
          {/* 3D 뷰어 컨트롤 */}
          <div className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Rebar View Mode 컨트롤 */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Rebar View Mode:
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setRebarViewMode({
                      ...rebarViewMode,
                      showRebarOnly: !rebarViewMode.showRebarOnly,
                    })
                  }
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                    rebarViewMode.showRebarOnly
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  Skeleton Mode
                </button>
              </div>
              {/* Clash Overlay 컨트롤 */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Clash Overlay:
                </label>
                <button
                  type="button"
                  onClick={() => setShowClashOverlay(!showClashOverlay)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                    showClashOverlay
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  {showClashOverlay ? 'ON' : 'OFF'}
                </button>
              </div>
              {/* 출력/공유 기능 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExport('Snapshot')}
                  className="px-3 py-1.5 rounded text-sm bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  3D Snapshot
                </button>
                <button
                  type="button"
                  onClick={() => handleExport('IFC')}
                  className="px-3 py-1.5 rounded text-sm bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  IFC Export
                </button>
                <button
                  type="button"
                  onClick={() => handleExport('GLTF')}
                  className="px-3 py-1.5 rounded text-sm bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  GLTF Export
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded text-sm bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  View 링크 공유
                </button>
              </div>
            </div>
            {/* Rebar View 세부 옵션 */}
            {rebarViewMode.showRebarOnly && (
              <div className="mt-4 pt-4 border-t border-neutral-300 dark:border-neutral-700">
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rebarViewMode.showMainRebar}
                      onChange={(e) =>
                        setRebarViewMode({
                          ...rebarViewMode,
                          showMainRebar: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    주근
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rebarViewMode.showStirrup}
                      onChange={(e) =>
                        setRebarViewMode({
                          ...rebarViewMode,
                          showStirrup: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    스터럽
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rebarViewMode.showCoupler}
                      onChange={(e) =>
                        setRebarViewMode({
                          ...rebarViewMode,
                          showCoupler: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    Coupler
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rebarViewMode.showLapping}
                      onChange={(e) =>
                        setRebarViewMode({
                          ...rebarViewMode,
                          showLapping: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    Lapping 위치
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rebarViewMode.showBarMark}
                      onChange={(e) =>
                        setRebarViewMode({
                          ...rebarViewMode,
                          showBarMark: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    Bar Mark
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 3D 뷰어 */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
            <div className="h-[700px]">
              <BimViewer3D onElementClick={handleElementClick} />
            </div>
            {showClashOverlay && clashStatus.hasClash && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-300 dark:border-red-700">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="font-medium">
                    Clash 감지: {clashStatus.clashPoints}개 포인트 (
                    {clashStatus.status})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 우측: 부재 정보 패널 */}
        <div className="space-y-6">
          {selectedMember && (
            <>
              {/* 1) 기본 정보 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">1) 기본 정보</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Member ID
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedMember.memberId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Level / Grid 위치
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedMember.level} / {selectedMember.grid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      부재 종류
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedMember.memberType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      단면 정보
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedMember.section}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2) 재료 정보 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">2) 재료 정보</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      fck (콘크리트)
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {materialInfo.fck}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      fy (철근)
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {materialInfo.fy}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      철근 직경, 간격, 위치 (Bar Mark 정보)
                    </div>
                    <div className="space-y-2">
                      {materialInfo.rebarDetails.map((rebar, index) => (
                        <div
                          key={index}
                          className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded text-sm"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {rebar.location === 'top'
                                ? '상부'
                                : rebar.location === 'bottom'
                                  ? '하부'
                                  : rebar.location === 'side'
                                    ? '측면'
                                    : '스터럽'}
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {rebar.diameter} {rebar.spacing}
                            </span>
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Bar Mark: {rebar.barMark}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3) 설계 정보 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">
                  3) 설계 정보(Design Results 연동)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      M3_max
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {designInfo.m3Max} kN·m
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      V2_max
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {designInfo.v2Max} kN
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      요구 철근량 As_req
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {designInfo.asReq} mm²
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      제공 철근량 As_prov
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {designInfo.asProv} mm²
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      제공 철근량 (손율 반영)
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {designInfo.asProvWithLoss} mm²
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      최적화 철근량 (by AISIMS)
                    </span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400">
                      {designInfo.optimizedAs} mm²
                    </span>
                  </div>
                </div>
              </div>

              {/* 4) Revision 상태 표시 */}
              {revisionStatus.hasChanges && (
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
                  <h3 className="text-lg font-semibold mb-4">
                    4) Revision 상태 표시
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white dark:bg-neutral-800 rounded border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                        이 부재는{' '}
                        <span className="font-semibold">
                          {revisionStatus.revision}
                        </span>
                        에서 수정됨
                      </p>
                      <button
                        type="button"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        이전 Revision과의 차이 보기 ({revisionStatus.changeType}
                        )
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* C. 배근(철근) 확인 모드 정보 */}
              <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                <h3 className="text-lg font-semibold mb-4">
                  C. 배근(철근) 확인 모드
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      BIM Rebar ↔ reinforcement.csv 비교 Summary
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      • 일치: 95%
                      <br />• 불일치: 5% (3개 항목)
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <div className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                      ✓ Special-length 적용 상태
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      • 적용된 Special-length: 12개
                      <br />
                      • 미적용: 0개
                      <br />• 상태: 정상
                    </div>
                  </div>
                </div>
              </div>

              {/* D. Clash 상태 시각화 */}
              {showClashOverlay && (
                <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold mb-4">
                    D. Clash 상태 시각화
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                      <div className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                        Clash 발생 포인트: {clashStatus.clashPoints}개
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        • MEP/Structure 색상으로 표시
                        <br />• 상태: {clashStatus.status}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

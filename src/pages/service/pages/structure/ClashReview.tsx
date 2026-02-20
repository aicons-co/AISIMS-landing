import { useState, useMemo } from 'react'
import { ClashViewer3D } from '../../components/ClashViewer3D'

type ClashItem = {
  id: string
  relatedMembers: string
  location: {
    level: string
    grid: string
    coordinates: [number, number, number]
  }
  severity: 'Critical' | 'Major' | 'Minor'
  clashType: 'Hard Clash' | 'Soft Clash' | 'Clearance'
  detectedDate: string
  relatedTeam: '구조' | '기계' | '전기' | '배관'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  distance: number
  clearance?: number
  routingOption?: string
  importance: 'A' | 'B' | 'C'
  discipline: 'Structure' | 'Rebar' | 'MEP' | 'Architectural'
}

type ClashResolution = {
  step: number
  stepName: string
  status: 'pending' | 'in-progress' | 'completed'
  date?: string
  assignee?: string
  note?: string
}

type AISuggestion = {
  type: string
  description: string
}

export function ClashReview() {
  const [selectedClashId, setSelectedClashId] = useState<string | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDiscipline, setFilterDiscipline] = useState<string>('all')
  const [filterImportance] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // 샘플 Clash 데이터
  const [clashes, setClashes] = useState<ClashItem[]>([
    {
      id: 'CLASH-2025-001',
      relatedMembers: 'Beam B101, Duct M-23',
      location: { level: '3F', grid: 'A-3', coordinates: [0.3, 2.0, 0] },
      severity: 'Critical',
      clashType: 'Hard Clash',
      detectedDate: '2025-08-15',
      relatedTeam: '구조',
      status: 'Open',
      distance: -12.5,
      clearance: 0,
      routingOption: 'Pipe Routing Option A',
      importance: 'A',
      discipline: 'Structure',
    },
    {
      id: 'CLASH-2025-002',
      relatedMembers: 'Column C-205, Pipe P-45',
      location: { level: '2F', grid: 'B-5', coordinates: [2.1, 3.5, 0] },
      severity: 'Major',
      clashType: 'Soft Clash',
      detectedDate: '2025-08-20',
      relatedTeam: '배관',
      status: 'In Progress',
      distance: 5.2,
      clearance: 50,
      importance: 'B',
      discipline: 'MEP',
    },
    {
      id: 'CLASH-2025-003',
      relatedMembers: 'Wall W-031, Duct D-12',
      location: { level: '1F', grid: 'C-2', coordinates: [6.0, 1.8, 0] },
      severity: 'Minor',
      clashType: 'Clearance',
      detectedDate: '2025-08-25',
      relatedTeam: '기계',
      status: 'Resolved',
      distance: 15.8,
      clearance: 100,
      importance: 'C',
      discipline: 'MEP',
    },
    {
      id: 'CLASH-2025-004',
      relatedMembers: 'Rebar R-501, Pipe P-23',
      location: { level: 'B1', grid: 'D-4', coordinates: [4.5, -1.2, 0] },
      severity: 'Critical',
      clashType: 'Hard Clash',
      detectedDate: '2025-09-01',
      relatedTeam: '구조',
      status: 'Open',
      distance: -8.3,
      clearance: 0,
      importance: 'A',
      discipline: 'Rebar',
    },
  ])

  const selectedClash = selectedClashId
    ? clashes.find((c) => c.id === selectedClashId)
    : null

  // A. Clash Summary Dashboard 계산
  const summary = useMemo(() => {
    const total = clashes.length
    const byImportance = {
      A: clashes.filter((c) => c.importance === 'A').length,
      B: clashes.filter((c) => c.importance === 'B').length,
      C: clashes.filter((c) => c.importance === 'C').length,
    }
    const byDiscipline = {
      Structure: clashes.filter((c) => c.discipline === 'Structure').length,
      Rebar: clashes.filter((c) => c.discipline === 'Rebar').length,
      MEP: clashes.filter((c) => c.discipline === 'MEP').length,
      Architectural: clashes.filter((c) => c.discipline === 'Architectural')
        .length,
    }
    const resolved = clashes.filter(
      (c) => c.status === 'Resolved' || c.status === 'Closed',
    ).length
    const resolutionRate =
      total > 0 ? ((resolved / total) * 100).toFixed(1) : '0.0'

    return { total, byImportance, byDiscipline, resolutionRate }
  }, [clashes])

  // 필터링된 Clash 목록
  const filteredClashes = useMemo(() => {
    return clashes.filter((clash) => {
      if (filterSeverity !== 'all' && clash.severity !== filterSeverity)
        return false
      if (filterType !== 'all' && clash.clashType !== filterType) return false
      if (filterStatus !== 'all' && clash.status !== filterStatus) return false
      if (filterDiscipline !== 'all' && clash.discipline !== filterDiscipline)
        return false
      if (filterImportance !== 'all' && clash.importance !== filterImportance)
        return false
      if (
        searchTerm &&
        !clash.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !clash.relatedMembers.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false
      return true
    })
  }, [
    clashes,
    filterSeverity,
    filterType,
    filterStatus,
    filterDiscipline,
    filterImportance,
    searchTerm,
  ])

  // D. Clash Resolution Workflow 데이터
  const resolutionWorkflow: ClashResolution[] = selectedClash
    ? [
        {
          step: 1,
          stepName: 'Clash 등록 → 자동 알림 발송 (MEP·구조팀)',
          status: 'completed',
          date: selectedClash.detectedDate,
          assignee: '시스템',
        },
        {
          step: 2,
          stepName: '원인 분석(AISIMS 자동 제안)',
          status: selectedClash.status === 'Open' ? 'in-progress' : 'completed',
          date: selectedClash.status !== 'Open' ? '2025-09-02' : undefined,
          assignee: 'AISIMS',
        },
        {
          step: 3,
          stepName: '해결안 제출',
          status:
            selectedClash.status === 'In Progress'
              ? 'in-progress'
              : selectedClash.status === 'Resolved'
                ? 'completed'
                : 'pending',
          date: selectedClash.status === 'Resolved' ? '2025-09-05' : undefined,
          assignee: selectedClash.relatedTeam,
        },
        {
          step: 4,
          stepName: '재검토(Re-Check)',
          status: selectedClash.status === 'Resolved' ? 'completed' : 'pending',
          date: selectedClash.status === 'Resolved' ? '2025-09-06' : undefined,
        },
        {
          step: 5,
          stepName: '확정(Resolved)',
          status:
            selectedClash.status === 'Resolved' ||
            selectedClash.status === 'Closed'
              ? 'completed'
              : 'pending',
          date: selectedClash.status === 'Resolved' ? '2025-09-07' : undefined,
        },
        {
          step: 6,
          stepName: 'Revision History 자동 기록',
          status:
            selectedClash.status === 'Resolved' ||
            selectedClash.status === 'Closed'
              ? 'completed'
              : 'pending',
          date: selectedClash.status === 'Resolved' ? '2025-09-07' : undefined,
        },
      ]
    : []

  // AISIMS 자동 제안
  const aiSuggestions: AISuggestion[] = selectedClash
    ? [
        {
          type: 'Pipe 반경 조정',
          description: 'Pipe 반경 조정 15mm 필요',
        },
        {
          type: 'Beam 철근 간섭',
          description: 'Beam B203 철근 간섭: Coupler 위치 변경 필요',
        },
      ]
    : []

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
      case 'Major':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700'
      case 'Minor':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
      case 'In Progress':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
      case 'Resolved':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700'
      case 'Closed':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700'
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
    }
  }

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
      case 'pending':
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
    }
  }

  const handleStatusChange = (
    clashId: string,
    newStatus: ClashItem['status'],
  ) => {
    setClashes((prev) =>
      prev.map((c) => (c.id === clashId ? { ...c, status: newStatus } : c)),
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* A. Clash Summary Dashboard */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">
          A. Clash Summary Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
              총 Clash 수
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {summary.total}
            </div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
              중요도 Level A
            </div>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {summary.byImportance.A}
            </div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">
              중요도 Level B
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {summary.byImportance.B}
            </div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">
              중요도 Level C
            </div>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
              {summary.byImportance.C}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
              Structure
            </div>
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {summary.byDiscipline.Structure}
            </div>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
              Rebar
            </div>
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {summary.byDiscipline.Rebar}
            </div>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
              MEP
            </div>
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {summary.byDiscipline.MEP}
            </div>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
              Architectural
            </div>
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {summary.byDiscipline.Architectural}
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
              해결률
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {summary.resolutionRate}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* B. Clash 목록표 */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-4">
              B. Clash 목록표 (Clash Table)
            </h3>
            {/* 필터 */}
            <div className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="검색 (Clash ID, 부재명)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-2 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-xs"
                >
                  <option value="all">모든 심각도</option>
                  <option value="Critical">Critical</option>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-xs"
                >
                  <option value="all">모든 상태</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-2 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-xs"
                >
                  <option value="all">모든 타입</option>
                  <option value="Hard Clash">Hard Clash</option>
                  <option value="Soft Clash">Soft Clash</option>
                  <option value="Clearance">Clearance</option>
                </select>
                <select
                  value={filterDiscipline}
                  onChange={(e) => setFilterDiscipline(e.target.value)}
                  className="px-2 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-xs"
                >
                  <option value="all">모든 Discipline</option>
                  <option value="Structure">Structure</option>
                  <option value="Rebar">Rebar</option>
                  <option value="MEP">MEP</option>
                  <option value="Architectural">Architectural</option>
                </select>
              </div>
            </div>
            {/* Clash 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800">
                    <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      Clash ID
                    </th>
                    <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      심각도
                    </th>
                    <th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClashes.map((clash) => (
                    <tr
                      key={clash.id}
                      onClick={() =>
                        setSelectedClashId(
                          clash.id === selectedClashId ? null : clash.id,
                        )
                      }
                      className={`cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
                        selectedClashId === clash.id
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : ''
                      }`}
                    >
                      <td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">
                        {clash.id}
                      </td>
                      <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                        <span
                          className={`px-2 py-1 rounded text-xs border ${getSeverityColor(clash.severity)}`}
                        >
                          {clash.severity}
                        </span>
                      </td>
                      <td className="p-2 border border-neutral-300 dark:border-neutral-700">
                        <span
                          className={`px-2 py-1 rounded text-xs border ${getStatusColor(clash.status)}`}
                        >
                          {clash.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* C. Clash 3D Review Panel 및 D, E */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3D Viewer */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
            <div className="h-[500px]">
              <ClashViewer3D
                clashes={filteredClashes.map((c) => ({
                  id: c.id,
                  type:
                    c.clashType === 'Soft Clash' || c.clashType === 'Clearance'
                      ? 'Soft Clearance'
                      : 'Hard Clash',
                  elementA: c.relatedMembers.split(',')[0].trim(),
                  elementB: c.relatedMembers.split(',')[1]?.trim() || '',
                  severity:
                    c.severity === 'Critical'
                      ? 'High'
                      : c.severity === 'Major'
                        ? 'Medium'
                        : 'Low',
                  location: c.location.coordinates,
                  distance: c.distance,
                  status:
                    c.status === 'Open'
                      ? '미처리'
                      : c.status === 'In Progress'
                        ? '처리중'
                        : '해결됨',
                }))}
                selectedClashId={selectedClashId}
                onClashSelect={setSelectedClashId}
                showSectionPlane={false}
                sectionPlanePosition={0}
              />
            </div>
          </div>

          {/* C. Clash 3D Review Panel */}
          {selectedClash && (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4">
                C. Clash 3D Review Panel
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Clash ID
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      관련 부재
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
                      {selectedClash.relatedMembers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      위치
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.location.level} /{' '}
                      {selectedClash.location.grid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      좌표
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs font-mono">
                      [
                      {selectedClash.location.coordinates
                        .map((v) => v.toFixed(1))
                        .join(', ')}
                      ]
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      심각도
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs border ${getSeverityColor(selectedClash.severity)}`}
                    >
                      {selectedClash.severity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Clash 타입
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.clashType}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      최초 탐지일
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.detectedDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      관련 팀
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.relatedTeam}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      상태
                    </span>
                    <select
                      value={selectedClash.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedClash.id,
                          e.target.value as ClashItem['status'],
                        )
                      }
                      className={`px-2 py-1 rounded text-xs border ${getStatusColor(selectedClash.status)} bg-transparent`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      충돌 거리
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {selectedClash.distance.toFixed(1)} mm
                    </span>
                  </div>
                  {selectedClash.clearance !== undefined && (
                    <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        간극(Clearance)
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {selectedClash.clearance} mm
                      </span>
                    </div>
                  )}
                  {selectedClash.routingOption && (
                    <div className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        Clash 경로
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
                        {selectedClash.routingOption}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      // 해당 Clash 포인트로 자동 Zoom
                      console.log('Zoom to clash:', selectedClash.id)
                    }}
                    className="w-full px-4 py-2 rounded text-sm bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  >
                    해당 Clash 포인트로 자동 Zoom
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* D. Clash Resolution Workflow */}
          {selectedClash && (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4">
                D. Clash Resolution Workflow
              </h3>
              <div className="space-y-4">
                {/* 2. 원인 분석(AISIMS 자동 제안) */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
                    2. 원인 분석(AISIMS 자동 제안)
                  </div>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white dark:bg-neutral-800 rounded text-sm"
                      >
                        <div className="font-medium text-neutral-900 dark:text-neutral-100">
                          {suggestion.type}
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-400">
                          {suggestion.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Workflow 단계 */}
                <div className="space-y-3">
                  {resolutionWorkflow.map((step) => (
                    <div
                      key={step.step}
                      className={`p-3 rounded-lg border ${
                        step.status === 'completed'
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : step.status === 'in-progress'
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                            : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                            {step.step}
                          </span>
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {step.stepName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {step.date && (
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {step.date}
                            </span>
                          )}
                          {step.assignee && (
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              ({step.assignee})
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded text-xs ${getWorkflowStatusColor(step.status)}`}
                          >
                            {step.status === 'completed'
                              ? '완료'
                              : step.status === 'in-progress'
                                ? '진행중'
                                : '대기'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* E. 현장 Issue 연계 */}
          {selectedClash && (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4">E. 현장 Issue 연계</h3>
              <div className="space-y-3">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    Clash 중 현장 설치 단계에서 발견된 이슈 자동 연결
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-500">
                    Issue → Revision 승인 → BIM 업데이트 순환 구조 지원
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                    연결된 현장 Issue
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {selectedClash.status === 'Open' ||
                    selectedClash.status === 'In Progress'
                      ? '현장에서 발견된 이슈와 자동 연결됨'
                      : '연결된 이슈 없음'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

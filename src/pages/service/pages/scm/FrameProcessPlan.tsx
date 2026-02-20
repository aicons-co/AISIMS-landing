import { useState, useMemo } from 'react'
import { GanttChart } from '../../components/GanttChart'
import type { GanttTask, GanttLink } from '../../components/GanttChart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type Milestone = {
  id: string
  level: string
  zone?: string
  name: string
  plannedDate: string
  actualDate?: string
  status: 'planned' | 'in-progress' | 'completed' | 'delayed'
}

type ProgressTrack = {
  date: string
  pv: number // Planned Value (예정)
  av: number // Actual Value (실제)
  ev: number // Earned Value (기성)
}

type ProcessAlert = {
  id: string
  type: 'delay' | 'risk' | 'warning'
  message: string
  level: string
  delayDays?: number
  severity: 'high' | 'medium' | 'low'
}

type TaskProgress = {
  id: string
  name: string
  level: string
  zone?: string
  completionRate: number // %
  status: 'on-time' | 'delayed' | 'at-risk'
  delayDays?: number
  photos?: string[]
  videos?: string[]
}

type RiskFactor = {
  id: string
  type:
    | 'material-shortage'
    | 'delivery-delay'
    | 'clash-unresolved'
    | 'weather'
    | 'other'
  description: string
  severity: 'high' | 'medium' | 'low'
  affectedTasks: string[]
  impact: string
}

type DelayImpact = {
  taskId: string
  taskName: string
  impactDays: number
  affectedTasks: string[]
}

export function FrameProcessPlan() {
  const [selectedView, setSelectedView] = useState<'level' | 'zone'>('level')

  // A. 공정 계획 Dashboard
  const projectStart = '2025-03-01'
  const projectEnd = '2025-08-31'
  const projectDuration = 184 // days

  const milestones: Milestone[] = [
    {
      id: 'M1',
      level: 'B2',
      name: '기초 완료',
      plannedDate: '2025-03-15',
      actualDate: '2025-03-14',
      status: 'completed',
    },
    {
      id: 'M2',
      level: '1F',
      zone: 'Core Zone',
      name: '1F Core Zone 완료',
      plannedDate: '2025-04-10',
      status: 'in-progress',
    },
    {
      id: 'M3',
      level: '1F',
      zone: 'Tower Zone',
      name: '1F Tower Zone 완료',
      plannedDate: '2025-04-20',
      status: 'planned',
    },
    {
      id: 'M4',
      level: '3F',
      name: '3F 골조 완료',
      plannedDate: '2025-05-30',
      status: 'planned',
    },
    {
      id: 'M5',
      level: 'RF',
      name: '최상층 완료',
      plannedDate: '2025-07-15',
      status: 'planned',
    },
  ]

  // 3-Track Curve (PV, AV, EV)
  const progressTrackData: ProgressTrack[] = [
    { date: '2025-03-01', pv: 0, av: 0, ev: 0 },
    { date: '2025-03-15', pv: 15, av: 14, ev: 15 },
    { date: '2025-04-01', pv: 30, av: 28, ev: 29 },
    { date: '2025-04-15', pv: 45, av: 42, ev: 43 },
    { date: '2025-05-01', pv: 60, av: 55, ev: 57 },
    { date: '2025-05-15', pv: 75, av: 68, ev: 70 },
  ]

  // Delay Index (SPI, CPI)
  const spi = 0.95 // Schedule Performance Index (EV/PV)
  const cpi = 0.98 // Cost Performance Index (EV/AC)

  // 공정 알림 카드
  const processAlerts: ProcessAlert[] = [
    {
      id: 'A1',
      type: 'delay',
      message: '5F 보 설치 지연',
      level: '5F',
      delayDays: 2,
      severity: 'medium',
    },
    {
      id: 'A2',
      type: 'risk',
      message: '자재 부족: D25 철근',
      level: '3F',
      severity: 'high',
    },
    {
      id: 'A3',
      type: 'warning',
      message: 'Clash 미해결: 3F Core Zone',
      level: '3F',
      severity: 'medium',
    },
  ]

  // B. Gantt Chart 데이터
  const { tasks, links } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const addDays = (date: Date, days: number) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    const tasks: GanttTask[] = [
      {
        id: 1,
        text: '🏗️ 골조 공사',
        start: today,
        end: addDays(today, 184),
        progress: 38,
        type: 'summary',
        open: true,
      },
      // 3F Core Zone 예시
      {
        id: 2,
        text: '3F Core Zone',
        start: addDays(today, 60),
        end: addDays(today, 75),
        progress: 45,
        type: 'summary',
        parent: 1,
        open: true,
      },
      {
        id: 3,
        text: '3F Core Zone - Column 철근',
        start: addDays(today, 60),
        end: addDays(today, 63),
        progress: 80,
        type: 'task',
        parent: 2,
      },
      {
        id: 4,
        text: '3F Core Zone - Column 거푸집',
        start: addDays(today, 63),
        end: addDays(today, 65),
        progress: 60,
        type: 'task',
        parent: 2,
      },
      {
        id: 5,
        text: '3F Core Zone - Column 타설',
        start: addDays(today, 65),
        end: addDays(today, 66),
        progress: 0,
        type: 'task',
        parent: 2,
      },
      {
        id: 6,
        text: '3F Core Zone - Column 양생',
        start: addDays(today, 66),
        end: addDays(today, 70),
        progress: 0,
        type: 'task',
        parent: 2,
      },
      {
        id: 7,
        text: '3F Core Zone - Beam 철근',
        start: addDays(today, 68),
        end: addDays(today, 71),
        progress: 30,
        type: 'task',
        parent: 2,
      },
      {
        id: 8,
        text: '3F Core Zone - Beam 거푸집',
        start: addDays(today, 71),
        end: addDays(today, 73),
        progress: 0,
        type: 'task',
        parent: 2,
      },
      {
        id: 9,
        text: '3F Core Zone - Beam 타설',
        start: addDays(today, 73),
        end: addDays(today, 74),
        progress: 0,
        type: 'task',
        parent: 2,
      },
      {
        id: 10,
        text: '3F Core Zone - Slab 철근',
        start: addDays(today, 72),
        end: addDays(today, 75),
        progress: 0,
        type: 'task',
        parent: 2,
      },
    ]

    const links: GanttLink[] = [
      { id: 1, source: 3, target: 4, type: 0 }, // Column 철근 → 거푸집
      { id: 2, source: 4, target: 5, type: 0 }, // Column 거푸집 → 타설
      { id: 3, source: 5, target: 6, type: 0 }, // Column 타설 → 양생
      { id: 4, source: 6, target: 7, type: 0 }, // Column 양생 → Beam 철근
      { id: 5, source: 7, target: 8, type: 0 }, // Beam 철근 → 거푸집
      { id: 6, source: 8, target: 9, type: 0 }, // Beam 거푸집 → 타설
      { id: 7, source: 9, target: 10, type: 0 }, // Beam 타설 → Slab 철근
    ]

    return { tasks, links }
  }, [])

  // C. Simulation: Casting Sequence
  const castingSequence = [
    {
      phase: 'Phase 1',
      members: 'Column C101-C105',
      concreteVolume: 25.5,
      interval: 'Day 1-3',
    },
    {
      phase: 'Phase 2',
      members: 'Beam B201-B205',
      concreteVolume: 18.2,
      interval: 'Day 4-6',
    },
    {
      phase: 'Phase 3',
      members: 'Slab S301',
      concreteVolume: 45.8,
      interval: 'Day 7-9',
    },
  ]

  // D. Progress Tracking
  const taskProgress: TaskProgress[] = [
    {
      id: 'T1',
      name: '3F Core Zone - Column 철근',
      level: '3F',
      zone: 'Core Zone',
      completionRate: 80,
      status: 'on-time',
    },
    {
      id: 'T2',
      name: '3F Core Zone - Column 거푸집',
      level: '3F',
      zone: 'Core Zone',
      completionRate: 60,
      status: 'on-time',
    },
    {
      id: 'T3',
      name: '5F Tower Zone - Beam 철근',
      level: '5F',
      zone: 'Tower Zone',
      completionRate: 45,
      status: 'delayed',
      delayDays: 2,
    },
    {
      id: 'T4',
      name: '4F Core Zone - Slab 타설',
      level: '4F',
      zone: 'Core Zone',
      completionRate: 0,
      status: 'at-risk',
    },
  ]

  // E. Risk / Delay Management
  const riskFactors: RiskFactor[] = [
    {
      id: 'R1',
      type: 'material-shortage',
      description: '자재 부족: D25 철근',
      severity: 'high',
      affectedTasks: [
        '3F Core Zone - Column 철근',
        '3F Tower Zone - Beam 철근',
      ],
      impact: '3F 공정 3일 지연 예상',
    },
    {
      id: 'R2',
      type: 'delivery-delay',
      description: '납품 지연: 거푸집 자재',
      severity: 'medium',
      affectedTasks: ['3F Core Zone - Column 거푸집'],
      impact: '1일 지연 예상',
    },
    {
      id: 'R3',
      type: 'clash-unresolved',
      description: 'Clash 미해결: 3F Core Zone',
      severity: 'high',
      affectedTasks: ['3F Core Zone - Beam 철근'],
      impact: '설치 불가, Clash 해결 필요',
    },
  ]

  const delayImpacts: DelayImpact[] = [
    {
      taskId: 'T3',
      taskName: '5F Tower Zone - Beam 철근',
      impactDays: 2,
      affectedTasks: [
        '5F Tower Zone - Beam 거푸집',
        '5F Tower Zone - Beam 타설',
        '5F Tower Zone - Slab 철근',
      ],
    },
  ]

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">골조 공정 계획</h2>

      {/* A. 공정 계획 Dashboard */}
      <div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">A. 공정 계획 Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
              전체 공정 기간
            </div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
              {projectStart} ~ {projectEnd}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {projectDuration}일
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
              SPI (Schedule Performance Index)
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {spi.toFixed(2)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              {spi < 1 ? '지연' : '정상'}
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
              CPI (Cost Performance Index)
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {cpi.toFixed(2)}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              {cpi < 1 ? '초과' : '정상'}
            </div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">
              전체 진행률
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              38%
            </div>
          </div>
        </div>

        {/* 층·Zone 별 주요 Milestone */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">
            층·Zone 별 주요 Milestone
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    Milestone
                  </th>
                  <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    Level
                  </th>
                  <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    Zone
                  </th>
                  <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    예정일
                  </th>
                  <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    실제일
                  </th>
                  <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((milestone) => (
                  <tr
                    key={milestone.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">
                      {milestone.name}
                    </td>
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                      {milestone.level}
                    </td>
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                      {milestone.zone || '-'}
                    </td>
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                      {milestone.plannedDate}
                    </td>
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                      {milestone.actualDate || '-'}
                    </td>
                    <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          milestone.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : milestone.status === 'in-progress'
                              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : milestone.status === 'delayed'
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                        }`}
                      >
                        {milestone.status === 'completed'
                          ? '완료'
                          : milestone.status === 'in-progress'
                            ? '진행중'
                            : milestone.status === 'delayed'
                              ? '지연'
                              : '예정'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3-Track Curve */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">
            예정(PV) vs 실제(AV) vs 기성(EV) 3-Track Curve
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressTrackData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-neutral-700"
                />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  className="dark:stroke-neutral-400"
                />
                <YAxis
                  stroke="#6b7280"
                  className="dark:stroke-neutral-400"
                  label={{
                    value: '진행률 (%)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="예정 (PV)"
                />
                <Line
                  type="monotone"
                  dataKey="av"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="실제 (AV)"
                />
                <Line
                  type="monotone"
                  dataKey="ev"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="기성 (EV)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 공정 알림 카드 */}
        <div>
          <h4 className="text-md font-medium mb-3">공정 알림</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {processAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 ${
                  alert.severity === 'high'
                    ? 'bg-red-50 dark:bg-red-900/10 border-red-400 dark:border-red-700'
                    : alert.severity === 'medium'
                      ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-400 dark:border-yellow-700'
                      : 'bg-blue-50 dark:bg-blue-900/10 border-blue-400 dark:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.type === 'delay'
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : alert.type === 'risk'
                          ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                    }`}
                  >
                    {alert.type === 'delay'
                      ? '지연'
                      : alert.type === 'risk'
                        ? '위험'
                        : '경고'}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {alert.level}
                  </span>
                </div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {alert.message}
                </div>
                {alert.delayDays && (
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    +{alert.delayDays}일
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B. Gantt Chart */}
      <div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">
          B. Gantt Chart (층·Zone 단위)
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Slab / Beam / Column / Wall / D-Wall 별 일정 자동 생성 · Task 간 선후
          종속관계 표시 · 공정단계: 철근 → 거푸집 → 타설 → 양생 → 해체 ·
          Critical Path(주공정) 강조 표시
        </p>
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            뷰:
          </label>
          <button
            type="button"
            onClick={() => setSelectedView('level')}
            className={`px-4 py-2 rounded text-sm border transition-colors ${
              selectedView === 'level'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
            }`}
          >
            Level별
          </button>
          <button
            type="button"
            onClick={() => setSelectedView('zone')}
            className={`px-4 py-2 rounded text-sm border transition-colors ${
              selectedView === 'zone'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
            }`}
          >
            Zone별
          </button>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 p-4 overflow-x-auto">
          <div style={{ minWidth: '800px' }}>
            <GanttChart tasks={tasks} links={links} />
          </div>
        </div>
      </div>

      {/* C. Simulation: Casting Sequence */}
      <div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">
          C. Simulation: Casting Sequence 자동 시뮬레이션
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Column–Beam–Slab 순서 기반 · 설치 간격 기준(지면 강도, 타워크레인 회전
          제한 등) · 예상 타설량(Concrete Volume) 자동 계산 · 3D Phase
          Animation(BIM Viewer와 연동)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {castingSequence.map((phase, index) => (
            <div
              key={index}
              className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700"
            >
              <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                {phase.phase}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                {phase.members}
              </div>
              <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                타설량: {formatNumber(phase.concreteVolume, 1)} m³
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {phase.interval}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            window.location.href = '/opt/bim?simulation=true'
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        >
          3D Phase Animation 보기 (BIM Viewer)
        </button>
      </div>

      {/* D. Progress Tracking */}
      <div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">
          D. Progress Tracking (현황 관리)
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Task별 완료율(%) · 지연 항목 자동 하이라이트 · 현장 사진·동영상 첨부 ·
          설치 완료 보고서(PDF) 자동 생성
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-800">
                <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  Task
                </th>
                <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  Level
                </th>
                <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  Zone
                </th>
                <th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  완료율 (%)
                </th>
                <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  상태
                </th>
                <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  지연일
                </th>
                <th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                  작업
                </th>
              </tr>
            </thead>
            <tbody>
              {taskProgress.map((task) => (
                <tr
                  key={task.id}
                  className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
                    task.status === 'delayed'
                      ? 'bg-red-50 dark:bg-red-900/10'
                      : task.status === 'at-risk'
                        ? 'bg-yellow-50 dark:bg-yellow-900/10'
                        : ''
                  }`}
                >
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">
                    {task.name}
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                    {task.level}
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                    {task.zone || '-'}
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${task.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{task.completionRate}%</span>
                    </div>
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        task.status === 'on-time'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : task.status === 'delayed'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                      }`}
                    >
                      {task.status === 'on-time'
                        ? '정상'
                        : task.status === 'delayed'
                          ? '지연'
                          : '위험'}
                    </span>
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                    {task.delayDays ? `+${task.delayDays}일` : '-'}
                  </td>
                  <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
                    <button
                      type="button"
                      className="px-3 py-1 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                      onClick={() =>
                        alert('사진/동영상 첨부 및 PDF 보고서 생성')
                      }
                    >
                      관리
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* E. Risk / Delay Management */}
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">
          E. Risk / Delay Management
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          위험요인(자재 부족·납품지연·Clash 미해결 등) 자동 인식 · Delay 발생 시
          영향도 분석(상위 3개 공정 영향) · 자동 재배치(Reschedule) 제안
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 위험요인 */}
          <div>
            <h4 className="text-md font-medium mb-3">위험요인 자동 인식</h4>
            <div className="space-y-3">
              {riskFactors.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-4 rounded-lg border-2 ${
                    risk.severity === 'high'
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-400 dark:border-red-700'
                      : risk.severity === 'medium'
                        ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-400 dark:border-yellow-700'
                        : 'bg-blue-50 dark:bg-blue-900/10 border-blue-400 dark:border-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        risk.severity === 'high'
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : risk.severity === 'medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {risk.severity === 'high'
                        ? '높음'
                        : risk.severity === 'medium'
                          ? '중간'
                          : '낮음'}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    {risk.description}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                    영향: {risk.impact}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    영향받는 Task: {risk.affectedTasks.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delay 영향도 분석 */}
          <div>
            <h4 className="text-md font-medium mb-3">
              Delay 영향도 분석 (상위 3개 공정 영향)
            </h4>
            <div className="space-y-3">
              {delayImpacts.map((impact) => (
                <div
                  key={impact.taskId}
                  className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border-2 border-orange-400 dark:border-orange-700"
                >
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    {impact.taskName}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                    지연: +{impact.impactDays}일
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    영향받는 Task: {impact.affectedTasks.join(', ')}
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                    onClick={() =>
                      alert('자동 재배치(Reschedule) 제안을 생성합니다.')
                    }
                  >
                    자동 재배치 제안
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

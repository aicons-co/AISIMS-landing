import { useState, useMemo } from 'react'
import { GanttChart } from '../../components/GanttChart'
import type { GanttTask, GanttLink } from '../../components/GanttChart'

type TabType = 'process' | 'order' | 'delivery' | 'installation'

type RebarOrder = {
  id: string
  spec: string
  recommendedQuantity: number
  recommendedDate: string
  currentStock: number
  reason: string
}

type ProcessingStatus = {
  id: string
  item: string
  spec: string
  orderQuantity: number
  processingStatus: '대기' | '가공중' | '완료'
  deliveryStatus: '대기' | '운송중' | '도착'
  expectedDate: string
  actualDate?: string
}

type InstallationProgress = {
  id: string
  location: string
  item: string
  plannedDate: string
  progress: number
  status: '대기' | '진행중' | '완료'
  feedback?: string
}

export function SCMManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('process')

  // 골조 공정 계획 - Gantt Chart 데이터
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
        end: addDays(today, 60),
        progress: 45,
        type: 'summary',
        open: true,
      },
      {
        id: 2,
        text: '기초 공사',
        start: today,
        end: addDays(today, 10),
        progress: 100,
        parent: 1,
        type: 'task',
      },
      {
        id: 3,
        text: '1층 골조',
        start: addDays(today, 10),
        end: addDays(today, 20),
        progress: 80,
        parent: 1,
        type: 'task',
      },
      {
        id: 4,
        text: '2층 골조',
        start: addDays(today, 20),
        end: addDays(today, 30),
        progress: 50,
        parent: 1,
        type: 'task',
      },
      {
        id: 5,
        text: '3층 골조',
        start: addDays(today, 30),
        end: addDays(today, 40),
        progress: 20,
        parent: 1,
        type: 'task',
      },
      {
        id: 6,
        text: '4-8층 골조',
        start: addDays(today, 40),
        end: addDays(today, 60),
        progress: 0,
        parent: 1,
        type: 'task',
      },
    ]

    const links: GanttLink[] = [
      { id: 1, source: 2, target: 3, type: 0 },
      { id: 2, source: 3, target: 4, type: 0 },
      { id: 3, source: 4, target: 5, type: 0 },
      { id: 4, source: 5, target: 6, type: 0 },
    ]

    return { tasks, links }
  }, [])

  // 철근 주문 계획
  const rebarOrders: RebarOrder[] = [
    {
      id: 'ro1',
      spec: 'D13',
      recommendedQuantity: 25.5,
      recommendedDate: '2025-01-20',
      currentStock: 5.2,
      reason: '1층 골조 공사 시작 예정일 기준 2주 전 발주 권장',
    },
    {
      id: 'ro2',
      spec: 'D16',
      recommendedQuantity: 42.3,
      recommendedDate: '2025-01-25',
      currentStock: 8.5,
      reason: '2층 골조 공사 시작 예정일 기준 2주 전 발주 권장',
    },
    {
      id: 'ro3',
      spec: 'D19',
      recommendedQuantity: 18.7,
      recommendedDate: '2025-02-01',
      currentStock: 3.2,
      reason: '3층 골조 공사 시작 예정일 기준 2주 전 발주 권장',
    },
    {
      id: 'ro4',
      spec: 'D22',
      recommendedQuantity: 12.5,
      recommendedDate: '2025-02-10',
      currentStock: 2.1,
      reason: '4층 이상 골조 공사 시작 예정일 기준 2주 전 발주 권장',
    },
  ]

  // 가공/납품 현황
  const processingStatuses: ProcessingStatus[] = [
    {
      id: 'ps1',
      item: '1층 기둥 철근',
      spec: 'D16',
      orderQuantity: 15.5,
      processingStatus: '완료',
      deliveryStatus: '도착',
      expectedDate: '2025-01-15',
      actualDate: '2025-01-14',
    },
    {
      id: 'ps2',
      item: '1층 보 철근',
      spec: 'D13',
      orderQuantity: 12.3,
      processingStatus: '완료',
      deliveryStatus: '운송중',
      expectedDate: '2025-01-18',
    },
    {
      id: 'ps3',
      item: '2층 기둥 철근',
      spec: 'D16',
      orderQuantity: 18.2,
      processingStatus: '가공중',
      deliveryStatus: '대기',
      expectedDate: '2025-01-25',
    },
    {
      id: 'ps4',
      item: '2층 보 철근',
      spec: 'D13',
      orderQuantity: 14.8,
      processingStatus: '대기',
      deliveryStatus: '대기',
      expectedDate: '2025-01-28',
    },
  ]

  // 현장 설치 진행 현황
  const [installationProgresses, setInstallationProgresses] = useState<
    InstallationProgress[]
  >([
    {
      id: 'ip1',
      location: '1층 A축',
      item: '기둥 설치',
      plannedDate: '2025-01-15',
      progress: 100,
      status: '완료',
      feedback: '설치 완료, 품질 검사 통과',
    },
    {
      id: 'ip2',
      location: '1층 B축',
      item: '기둥 설치',
      plannedDate: '2025-01-16',
      progress: 85,
      status: '진행중',
      feedback: '진행 중, 예상 완료일: 2025-01-17',
    },
    {
      id: 'ip3',
      location: '1층 전체',
      item: '보 설치',
      plannedDate: '2025-01-18',
      progress: 60,
      status: '진행중',
    },
    {
      id: 'ip4',
      location: '1층 전체',
      item: '슬래브 타설',
      plannedDate: '2025-01-20',
      progress: 0,
      status: '대기',
    },
    {
      id: 'ip5',
      location: '2층 A축',
      item: '기둥 설치',
      plannedDate: '2025-01-22',
      progress: 0,
      status: '대기',
    },
  ])

  const updateProgress = (id: string, progress: number, feedback?: string) => {
    setInstallationProgresses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            progress: Math.max(0, Math.min(100, progress)),
            status:
              progress === 100 ? '완료' : progress > 0 ? '진행중' : '대기',
            feedback: feedback || item.feedback,
          }
        }
        return item
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료':
      case '도착':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700'
      case '진행중':
      case '가공중':
      case '운송중':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
      case '대기':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700'
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
    }
  }

  return (
    <section className="w-full">
      <h2>공정/SCM 관리</h2>

      {/* 탭 메뉴 */}
      <div className="flex gap-2 mt-6 border-b border-neutral-300 dark:border-neutral-700">
        <button
          type="button"
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'process'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          골조 공정 계획
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('order')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'order'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          철근 주문 계획
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('delivery')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'delivery'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          가공 / 납품 현황
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('installation')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'installation'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          현장 설치 진행 현황
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="mt-6">
        {/* 골조 공정 계획 */}
        {activeTab === 'process' && (
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">골조 공정 계획</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                공정 진행 표 (Gantt Chart) 확인
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 p-4 overflow-x-auto">
              <div style={{ minWidth: '800px' }}>
                <GanttChart tasks={tasks} links={links} />
              </div>
            </div>
          </div>
        )}

        {/* 철근 주문 계획 */}
        {activeTab === 'order' && (
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">철근 주문 계획</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                최적 발주 수량·시기 자동 추천
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800">
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      철근 규격
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      현재 재고
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      권장 발주량
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      권장 발주일
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      추천 이유
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rebarOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">
                        {order.spec}
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {order.currentStock} ton
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {order.recommendedQuantity} ton
                        </span>
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          {order.recommendedDate}
                        </span>
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-400">
                        {order.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 가공 / 납품 현황 */}
        {activeTab === 'delivery' && (
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">가공 / 납품 현황</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                제작·운송 진행 상태 추적
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800">
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      항목
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      규격
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      주문량
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      가공 상태
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      납품 상태
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      예상 도착일
                    </th>
                    <th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
                      실제 도착일
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processingStatuses.map((status) => (
                    <tr
                      key={status.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {status.item}
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {status.spec}
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {status.orderQuantity} ton
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status.processingStatus)}`}
                        >
                          {status.processingStatus}
                        </span>
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status.deliveryStatus)}`}
                        >
                          {status.deliveryStatus}
                        </span>
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {status.expectedDate}
                      </td>
                      <td className="p-3 border border-neutral-300 dark:border-neutral-700">
                        {status.actualDate || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 현장 설치 진행 현황 */}
        {activeTab === 'installation' && (
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                현장 설치 진행 현황
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                실시간 공사 진척률 및 피드백 입력
              </p>
            </div>
            <div className="space-y-4">
              {installationProgresses.map((progress) => (
                <div
                  key={progress.id}
                  className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {progress.location} - {progress.item}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(progress.status)}`}
                        >
                          {progress.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        <span>계획일: {progress.plannedDate}</span>
                        <span>진척률: {progress.progress}%</span>
                      </div>
                      {/* 진척률 바 */}
                      <div className="mb-3">
                        <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              progress.progress === 100
                                ? 'bg-green-500'
                                : progress.progress > 0
                                  ? 'bg-blue-500'
                                  : 'bg-neutral-300 dark:bg-neutral-600'
                            }`}
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                      </div>
                      {/* 피드백 입력 */}
                      <div className="mt-3">
                        <textarea
                          value={progress.feedback || ''}
                          onChange={(e) =>
                            updateProgress(
                              progress.id,
                              progress.progress,
                              e.target.value,
                            )
                          }
                          placeholder="피드백을 입력하세요..."
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                          rows={2}
                        />
                      </div>
                      {/* 진척률 조정 */}
                      <div className="mt-3 flex items-center gap-3">
                        <label className="text-sm text-neutral-600 dark:text-neutral-400">
                          진척률 조정:
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress.progress}
                          onChange={(e) =>
                            updateProgress(
                              progress.id,
                              parseInt(e.target.value),
                            )
                          }
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 min-w-[50px]">
                          {progress.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

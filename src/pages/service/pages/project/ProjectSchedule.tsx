import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { GanttChart } from '../../components/GanttChart'
import type { GanttTask, GanttLink } from '../../components/GanttChart'

export function ProjectSchedule() {
  const { id } = useParams()

  console.log('ProjectSchedule 렌더링됨, ID:', id)

  // 샘플 데이터 생성
  const { tasks, links } = useMemo(() => {
    const today = new Date()
    const addDays = (date: Date, days: number) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    const tasks: GanttTask[] = [
      {
        id: 1,
        text: '🏗️ 프로젝트 기획',
        start: today,
        end: addDays(today, 7),
        progress: 100,
        type: 'summary',
        open: true,
      },
      {
        id: 2,
        text: '요구사항 분석',
        start: today,
        end: addDays(today, 3),
        progress: 100,
        parent: 1,
        type: 'task',
      },
      {
        id: 3,
        text: '기술 검토',
        start: addDays(today, 3),
        end: addDays(today, 7),
        progress: 80,
        parent: 1,
        type: 'task',
      },
      {
        id: 4,
        text: '🎨 설계 및 개발',
        start: addDays(today, 7),
        end: addDays(today, 30),
        progress: 60,
        type: 'summary',
        open: true,
      },
      {
        id: 5,
        text: 'UI/UX 디자인',
        start: addDays(today, 7),
        end: addDays(today, 14),
        progress: 70,
        parent: 4,
        type: 'task',
      },
      {
        id: 6,
        text: '프론트엔드 개발',
        start: addDays(today, 14),
        end: addDays(today, 25),
        progress: 50,
        parent: 4,
        type: 'task',
      },
      {
        id: 7,
        text: '백엔드 개발',
        start: addDays(today, 14),
        end: addDays(today, 28),
        progress: 40,
        parent: 4,
        type: 'task',
      },
      {
        id: 8,
        text: '✅ 테스트 및 배포',
        start: addDays(today, 28),
        end: addDays(today, 35),
        progress: 20,
        type: 'summary',
        open: true,
      },
      {
        id: 9,
        text: '통합 테스트',
        start: addDays(today, 28),
        end: addDays(today, 32),
        progress: 30,
        parent: 8,
        type: 'task',
      },
      {
        id: 10,
        text: '배포',
        start: addDays(today, 33),
        end: addDays(today, 35),
        progress: 0,
        parent: 8,
        type: 'task',
      },
      {
        id: 11,
        text: '🎯 마일스톤: 프로젝트 완료',
        start: addDays(today, 35),
        end: addDays(today, 35),
        progress: 0,
        type: 'milestone',
      },
    ]

    const links: GanttLink[] = [
      { id: 1, source: 2, target: 3, type: 0 },
      { id: 2, source: 3, target: 5, type: 0 },
      { id: 3, source: 5, target: 6, type: 0 },
      { id: 4, source: 6, target: 9, type: 0 },
      { id: 5, source: 7, target: 9, type: 0 },
      { id: 6, source: 9, target: 10, type: 0 },
      { id: 7, source: 10, target: 11, type: 0 },
    ]

    return { tasks, links }
  }, [])

  return (
    <section className="w-full max-w-full mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">프로젝트 일정 관리</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          프로젝트 ID: {id}
        </p>
      </div>

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <span className="text-xl">📊</span>
          프로젝트 개요
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">전체 작업:</span> {tasks.length}개
          </div>
          <div>
            <span className="font-medium">의존성 관계:</span> {links.length}개
          </div>
          <div>
            <span className="font-medium">평균 진행률:</span>{' '}
            {Math.round(
              tasks.reduce((sum, task) => sum + (task.progress || 0), 0) /
                tasks.length,
            )}
            %
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold text-lg">간트 차트</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            작업을 드래그하여 일정을 조정하거나, 클릭하여 상세 정보를 확인할 수
            있습니다.
          </p>
        </div>
        <div className="p-4">
          <GanttChart tasks={tasks} links={links} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span>📋</span> 작업 유형별 통계
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>프로젝트 그룹:</span>
              <span className="font-medium">
                {tasks.filter((t) => t.type === 'summary').length}개
              </span>
            </div>
            <div className="flex justify-between">
              <span>일반 작업:</span>
              <span className="font-medium">
                {tasks.filter((t) => t.type === 'task').length}개
              </span>
            </div>
            <div className="flex justify-between">
              <span>마일스톤:</span>
              <span className="font-medium">
                {tasks.filter((t) => t.type === 'milestone').length}개
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span>🎯</span> 진행 상황
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>완료된 작업:</span>
              <span className="font-medium">
                {
                  tasks.filter(
                    (t) => (t.progress ?? 0) > 0 && (t.progress ?? 0) < 100,
                  ).length
                }
                개
              </span>
            </div>
            <div className="flex justify-between">
              <span>진행 중:</span>
              <span className="font-medium">
                {
                  tasks.filter(
                    (t) => (t.progress ?? 0) > 0 && (t.progress ?? 0) < 100,
                  ).length
                }
                개
              </span>
            </div>
            <div className="flex justify-between">
              <span>시작 전:</span>
              <span className="font-medium">
                {tasks.filter((t) => (t.progress ?? 0) === 0).length}개
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

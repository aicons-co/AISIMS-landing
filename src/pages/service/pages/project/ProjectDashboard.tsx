import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GanttChart } from '../../components/GanttChart'
import type {
  GanttTask,
  GanttLink,
  GanttScale,
} from '../../components/GanttChart'

type Revision = { id: string; name: string; date: string }

type ChangeLog = {
  id: string
  date: string
  type: '설계 변경 요청서' | '승인서' | '회의록' | '공사변경통보서' | '기타'
  title: string
  author: string
  status: '대기' | '승인' | '반려' | '완료'
  fileName: string
  fileUrl?: string
}

type Member = {
  id: string
  name: string
  role: 'VIEWER' | 'EDITOR' | 'ADMIN'
  email?: string
  department?: string
  profilePhoto?: string
}

export function ProjectDashboard() {
  const { id } = useParams()
  const [selectedRevision, setSelectedRevision] = useState<string>('r1')

  // 샘플 리비전 데이터
  const revisions: Revision[] = useMemo(
    () => [
      { id: 'r1', name: 'BIM Rev A', date: '2025-09-01' },
      { id: 'r2', name: 'BIM Rev B', date: '2025-10-15' },
      { id: 'r3', name: 'BIM Rev C', date: '2025-11-20' },
    ],
    [],
  )

  // Basic Gantt 차트 데이터 생성 (SVAR Gantt Basic 예제 참고)
  const { tasks, links, scales } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // const addDays = (date: Date, days: number) => {
    // 	const result = new Date(date);
    // 	result.setDate(result.getDate() + days);
    // 	return result;
    // };

    // SVAR Gantt Basic 예제 형식에 맞춘 간단한 데이터
    const tasks: GanttTask[] = [
      {
        id: 1,
        open: true,
        start: new Date(2023, 11, 6),
        duration: 8,
        text: 'React Gantt Widget',
        progress: 60,
        type: 'summary',
      },
      {
        id: 2,
        parent: 1,
        start: new Date(2023, 11, 6),
        duration: 4,
        text: 'Lib-Gantt',
        progress: 80,
      },
      {
        id: 3,
        parent: 1,
        start: new Date(2023, 11, 11),
        duration: 4,
        text: 'UI Layer',
        progress: 30,
      },
      {
        id: 4,
        start: new Date(2023, 11, 12),
        duration: 8,
        text: 'Documentation',
        progress: 10,
        type: 'summary',
      },
      {
        id: 5,
        parent: 4,
        start: new Date(2023, 11, 10),
        duration: 1,
        text: 'Overview',
        progress: 30,
      },
      {
        id: 6,
        parent: 4,
        start: new Date(2023, 12, 11),
        duration: 8,
        text: 'API reference',
        progress: 0,
      },
    ]

    // const types = ['e2s', 's2s', 'e2e', 's2e'];
    const links: GanttLink[] = [
      { id: 1, source: 3, target: 4, type: 0 },
      { id: 2, source: 1, target: 2, type: 0 },
      { id: 21, source: 8, target: 1, type: 1 },
      { id: 22, source: 1, target: 6, type: 1 },
    ]

    const scales: GanttScale[] = [
      { unit: 'month', step: 1, format: 'MMMM yyy' },
      { unit: 'day', step: 1, format: 'd' },
    ]

    return { tasks, links, scales }
  }, [])

  // 프로젝트 멤버 데이터
  const members: Member[] = useMemo(
    () => [
      {
        id: 'm1',
        name: '김개발',
        role: 'ADMIN',
        email: 'kim.dev@example.com',
        department: '개발팀',
        profilePhoto: undefined,
      },
      {
        id: 'm2',
        name: '박설계',
        role: 'EDITOR',
        email: 'park.design@example.com',
        department: '설계팀',
        profilePhoto: undefined,
      },
      {
        id: 'm3',
        name: '이검토',
        role: 'VIEWER',
        email: 'lee.review@example.com',
        department: '검토팀',
        profilePhoto: undefined,
      },
      {
        id: 'm4',
        name: '최관리',
        role: 'ADMIN',
        email: 'choi.admin@example.com',
        department: '관리팀',
        profilePhoto: undefined,
      },
      {
        id: 'm5',
        name: '정기술',
        role: 'EDITOR',
        email: 'jung.tech@example.com',
        department: '기술팀',
        profilePhoto: undefined,
      },
    ],
    [],
  )

  // 역할 한글명 변환
  const getRoleLabel = (role: Member['role']) => {
    switch (role) {
      case 'ADMIN':
        return '관리자'
      case 'EDITOR':
        return '편집자'
      case 'VIEWER':
        return '조회자'
      default:
        return role
    }
  }

  // 역할 색상
  const getRoleColor = (role: Member['role']) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
      case 'EDITOR':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
      case 'VIEWER':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
    }
  }

  // 변경 로그 데이터
  const changeLogs: ChangeLog[] = useMemo(
    () => [
      {
        id: 'cl1',
        date: '2025-11-15',
        type: '설계 변경 요청서',
        title: '1층 구조 변경 요청',
        author: '김설계',
        status: '승인',
        fileName: '설계변경요청서_20251115.pdf',
      },
      {
        id: 'cl2',
        date: '2025-11-10',
        type: '승인서',
        title: '재료 변경 승인',
        author: '이승인',
        status: '완료',
        fileName: '재료변경승인서_20251110.pdf',
      },
      {
        id: 'cl3',
        date: '2025-11-08',
        type: '회의록',
        title: '설계 검토 회의록',
        author: '박회의',
        status: '완료',
        fileName: '설계검토회의록_20251108.pdf',
      },
      {
        id: 'cl4',
        date: '2025-11-05',
        type: '공사변경통보서',
        title: '공사 일정 변경 통보',
        author: '최공사',
        status: '승인',
        fileName: '공사일정변경통보서_20251105.pdf',
      },
      {
        id: 'cl5',
        date: '2025-11-01',
        type: '설계 변경 요청서',
        title: '창호 규격 변경 요청',
        author: '정설계',
        status: '대기',
        fileName: '창호규격변경요청서_20251101.pdf',
      },
    ],
    [],
  )

  // 다운로드 함수
  const handleDownload = (log: ChangeLog) => {
    // 실제 구현 시에는 서버에서 파일을 다운로드하거나
    // 생성된 파일을 다운로드하는 로직이 필요합니다
    // 여기서는 샘플로 Blob을 생성하여 다운로드합니다
    const content = `문서 유형: ${log.type}\n제목: ${log.title}\n작성자: ${log.author}\n날짜: ${log.date}\n상태: ${log.status}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = log.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section style={{ width: '100%', maxWidth: '100%', textAlign: 'left' }}>
      <h2>프로젝트 대시보드</h2>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}
      >
        <p style={{ margin: 0 }}>프로젝트 ID: {id}</p>
        <p style={{ margin: 0 }}>리비전:</p>
        <select
          value={selectedRevision}
          onChange={(e) => setSelectedRevision(e.target.value)}
          className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
          style={{ minWidth: '200px' }}
        >
          {revisions.map((rev) => (
            <option key={rev.id} value={rev.id}>
              {rev.name} · {rev.date}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to={`/projects/${id}/edit`}>
          <button type="button">정보수정</button>
        </Link>
        <Link to={`/projects/${id}/members`}>
          <button type="button">멤버관리</button>
        </Link>
        <Link to={`/projects/${id}/quantities`}>
          <button type="button">물량 내역 관리</button>
        </Link>
        <Link to={`/projects/${id}/revisions`}>
          <button type="button">리비전 비교</button>
        </Link>
        <Link to={`/projects/${id}/schedule`}>
          <button type="button">일정 (Gantt)</button>
        </Link>
      </div>
      <div style={{ marginTop: 16 }}>
        <div
          style={{ border: '1px solid #3a3a3a', borderRadius: 8, padding: 12 }}
        >
          <strong>요약 위젯</strong>
          <ul style={{ marginTop: 8 }}>
            <li>진척률: 42%</li>
            <li>이슈: 3건</li>
            <li>최근 업데이트: 어제</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-semibold text-lg">
              프로젝트 일정 (Gantt 차트)
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              작업을 드래그하여 일정을 조정하거나, 클릭하여 상세 정보를 확인할
              수 있습니다.
            </p>
          </div>
          <div style={{ padding: '16px', overflow: 'auto', width: '100%' }}>
            <GanttChart tasks={tasks} links={links} scales={scales} />
          </div>
        </div>
      </div>

      {/* 프로젝트 멤버 리스트 섹션 */}
      <div style={{ marginTop: 24 }}>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">프로젝트 멤버</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  프로젝트에 참여하고 있는 멤버 목록입니다.
                </p>
              </div>
              <Link
                to={`/projects/${id}/members`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
                title="멤버 추가"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {/* 프로필 사진 */}
                    <div className="flex-shrink-0">
                      {member.profilePhoto ? (
                        <img
                          src={member.profilePhoto}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-600"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border-2 border-neutral-300 dark:border-neutral-600">
                          <span className="text-neutral-500 dark:text-neutral-400 text-lg font-semibold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-base truncate">
                          {member.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${getRoleColor(member.role)}`}
                        >
                          {getRoleLabel(member.role)}
                        </span>
                      </div>
                      {member.department && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 truncate">
                          {member.department}
                        </p>
                      )}
                      {member.email && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 변경 로그 섹션 */}
      <div style={{ marginTop: 24 }}>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-semibold text-lg">변경 로그</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              설계 변경 요청서, 승인서 등의 문서 로그입니다.
            </p>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-700">
                  <th className="text-left p-3 text-sm font-semibold">날짜</th>
                  <th className="text-left p-3 text-sm font-semibold">
                    문서 유형
                  </th>
                  <th className="text-left p-3 text-sm font-semibold">제목</th>
                  <th className="text-left p-3 text-sm font-semibold">
                    작성자
                  </th>
                  <th className="text-left p-3 text-sm font-semibold">상태</th>
                  <th className="text-left p-3 text-sm font-semibold">
                    다운로드
                  </th>
                </tr>
              </thead>
              <tbody>
                {changeLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-3 text-sm">{log.date}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          log.type === '설계 변경 요청서'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                            : log.type === '승인서'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                              : log.type === '회의록'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm font-medium">{log.title}</td>
                    <td className="p-3 text-sm">{log.author}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          log.status === '승인' || log.status === '완료'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                            : log.status === '대기'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleDownload(log)}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        📥 다운로드
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

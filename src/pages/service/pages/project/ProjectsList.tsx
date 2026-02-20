import { useMemo, useState } from 'react'
import { projects } from '../../utils/projectData'
import axios from 'axios'
import { useAuthStore } from '../../store/authStore'

// 일정 진척도 그래프 컴포넌트
function ProgressGraph({
  progress,
  optimizationStage,
}: {
  progress: number
  optimizationStage: string
}) {
  const percentage = Math.min(100, Math.max(0, progress))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        minWidth: 120,
      }}
    >
      <div
        className="text-xs text-neutral-500 dark:text-neutral-400"
        style={{ marginBottom: 4 }}
      >
        최적화 진행상황
      </div>
      <div
        className="text-sm font-bold text-neutral-900 dark:text-neutral-100"
        style={{ marginBottom: 8 }}
      >
        {optimizationStage}
      </div>
      <div
        className="text-xs text-neutral-500 dark:text-neutral-400"
        style={{ marginBottom: 4 }}
      >
        일정 진척도
      </div>
      <div
        className="bg-neutral-300 dark:bg-neutral-700"
        style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor:
              percentage >= 80
                ? '#10b981'
                : percentage >= 50
                ? '#f59e0b'
                : '#ef4444',
            borderRadius: 3,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

export function ProjectsList() {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        [p.name, p.client, p.site, p.code, p.pm].some((v) =>
          v.toLowerCase().includes(query.toLowerCase())
        )
      ),
    [projects, query]
  )

  // 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProjects = filtered.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로 이동
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setCurrentPage(1)
  }

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 페이징 번호 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // 총 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지 기준으로 앞뒤 2개씩 표시
      if (currentPage <= 3) {
        // 앞부분
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 뒷부분
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 중간
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  // 임시: 내 정보 조회 불러오기
  const serverUrl = import.meta.env.VITE_API_SERVER
  const [userInfo, setUserInfo] = useState()

  const onUserInfo = async () => {
    const accessToken = useAuthStore.getState().accessToken
    console.log('accessToken: ', accessToken)
    //
    try {
      const response = await axios.get(`${serverUrl}/api/v1/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log('내 정보 조회 response: ', response)
      setUserInfo(response.data.data)
    } catch {
      //
    }
  }

  return (
    <section style={{ width: '100%', maxWidth: '100%', textAlign: 'left' }}>
      <button
        onClick={onUserInfo}
        className="bg-amber-300 hover:cursor-pointer hover:bg-amber-500"
      >
        내 정보 조회
        {userInfo && `이름: ${userInfo.name}`}
      </button>
      <h2>프로젝트 목록</h2>
      <div className="row" style={{ marginTop: 12 }}>
        <input
          type="text"
          placeholder="프로젝트 검색 (이름/발주처/현장/코드/PM)"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // 검색 실행 (이미 query 상태로 필터링됨)
              setCurrentPage(1)
            }
          }}
          style={{ flex: 1 }}
          className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
        />
        <button
          type="button"
          onClick={() => {
            // 검색 실행 (이미 query 상태로 필터링됨)
            setCurrentPage(1)
          }}
        >
          검색
        </button>
      </div>

      <div
        style={{
          maxHeight: '600px',
          overflowY: 'auto',
          marginTop: 16,
          paddingRight: 4,
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {paginatedProjects.map((p) => (
            <li
              key={p.id}
              style={{
                border: '1px solid #3a3a3a',
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    flex: 1,
                  }}
                >
                  <strong>{p.name}</strong>
                  <span>
                    발주처: {p.client} · 현장: {p.site} · 기간: {p.period}
                  </span>
                  <span>
                    코드: {p.code} · PM: {p.pm}
                  </span>
                  <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-semibold">최근 공지:</span>{' '}
                      {p.recentNotices}개
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-semibold">피드백:</span> 대기{' '}
                      {p.feedbackStatus.pending} · 처리중{' '}
                      {p.feedbackStatus.inProgress} · 완료{' '}
                      {p.feedbackStatus.completed}
                    </div>
                  </div>
                </div>
                <ProgressGraph
                  progress={p.progress}
                  optimizationStage={p.optimizationStage}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 페이징 컨트롤 */}
      {totalPages > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid #3a3a3a',
          }}
        >
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              border: '1px solid #3a3a3a',
              borderRadius: 6,
              background: currentPage === 1 ? '#2a2a2a' : 'transparent',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            이전
          </button>

          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                style={{ padding: '0 8px', color: '#888' }}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page as number)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #3a3a3a',
                  borderRadius: 6,
                  background: currentPage === page ? '#3a3a3a' : 'transparent',
                  cursor: 'pointer',
                  minWidth: 40,
                  fontWeight: currentPage === page ? 'bold' : 'normal',
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              border: '1px solid #3a3a3a',
              borderRadius: 6,
              background:
                currentPage === totalPages ? '#2a2a2a' : 'transparent',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            다음
          </button>
        </div>
      )}
    </section>
  )
}

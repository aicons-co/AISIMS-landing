import { Suspense, useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export default function AppLayout() {
  const location = useLocation()
  // 초기 화면 크기 확인
  const getInitialIsMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 1024
  }

  // 모바일에서는 기본적으로 접혀있고, 데스크톱에서는 기본적으로 펼쳐져 있음
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    getInitialIsMobile()
  )
  const [isMobile, setIsMobile] = useState(getInitialIsMobile())

  // 화면 크기 감지 - 모바일로 전환되면 사이드바를 접음
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarCollapsed(true)
      } else if (!mobile && isSidebarCollapsed && isMobile) {
        // 데스크톱으로 전환되면 사이드바를 펼침
        setIsSidebarCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarCollapsed, isMobile])

  // 인증 페이지에서는 사이드바 숨김
  const isAuthPage =
    location.pathname.startsWith('/auth/') || location.pathname === '/'
  const showSidebar = !isAuthPage

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Header
        onMenuClick={
          showSidebar
            ? () => setIsSidebarCollapsed(!isSidebarCollapsed)
            : undefined
        }
      />

      <div className="flex">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobile={isMobile}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div
          className={`flex-1 transition-all duration-300 pt-16 ${
            showSidebar
              ? isSidebarCollapsed
                ? isMobile
                  ? 'ml-0'
                  : 'lg:ml-16'
                : 'lg:ml-64 ml-0'
              : 'ml-0'
          }`}
        >
          <main className="px-4 pb-12 pt-6 min-h-[calc(100vh-4rem)]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                  로딩 중...
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

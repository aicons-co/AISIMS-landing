import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { getProjectById } from '../utils/projectData'
import packageJson from '../../../../package.json'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  // 현재 프로젝트 정보 가져오기
  const currentProject = useMemo(() => {
    // URL에서 프로젝트 ID 추출 (다양한 경로 패턴 지원)
    const projectId = id || location.pathname.match(/\/projects\/([^/]+)/)?.[1]
    const project = projectId ? getProjectById(projectId) : undefined
    // 프로젝트가 없으면 샘플 프로젝트 표시
    return project || { id: 'sample', name: 'A타워 신축' }
  }, [id, location.pathname])

  // 앱 버전 (package.json에서 가져오기)
  const appVersion = packageJson.version

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  // 외부 클릭 시 설정 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSettings])

  return (
    <header className="fixed top-0 left-0 right-0 z-30 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo 및 프로젝트 정보 */}
          <div className="flex items-center gap-4">
            {/* Logo - 데스크톱에서 사이드바가 접혀있을 때만 표시 */}
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/projects" className="flex items-center gap-2">
                <img
                  src="/AISIMS-Logo.png"
                  alt="AISIMS MVP"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            {/* 프로젝트명 및 버전 표시 */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {currentProject.name}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  v{appVersion}
                </span>
              </div>
            </div>
          </div>
          {/* Mobile menu button */}
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label="메뉴"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          {/* Right side: Auth status and controls */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title={
                theme === 'light' ? '다크모드로 전환' : '라이트모드로 전환'
              }
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm transition-colors"
              title={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* User info / Login */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Profile */}
                <Link
                  to="/auth/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border border-neutral-300 dark:border-neutral-600">
                      <span className="text-neutral-600 dark:text-neutral-400 text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hidden sm:inline">
                    {user.name}
                  </span>
                </Link>
                {/* Settings */}
                <div className="relative" ref={settingsRef}>
                  <button
                    type="button"
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors"
                  >
                    설정
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-lg z-50">
                      <div className="p-4">
                        <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                          설정
                        </h3>
                        <div className="space-y-4">
                          {/* 테마 설정 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              테마
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={toggleTheme}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  theme === 'light'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                라이트
                              </button>
                              <button
                                type="button"
                                onClick={toggleTheme}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                다크
                              </button>
                            </div>
                          </div>

                          {/* 언어 설정 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              언어
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={toggleLanguage}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  language === 'ko'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                한국어
                              </button>
                              <button
                                type="button"
                                onClick={toggleLanguage}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  language === 'en'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                English
                              </button>
                            </div>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 기본 단위계 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              기본 단위계
                            </label>
                            <select className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm">
                              <option value="metric">미터법 (m, kg, N)</option>
                              <option value="imperial">
                                야드파운드법 (ft, lb, lbf)
                              </option>
                            </select>
                          </div>

                          {/* 코드 기준 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              코드 기준
                            </label>
                            <select className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm">
                              <option value="KDS">KDS (한국설계기준)</option>
                              <option value="ACI">
                                ACI (미국 콘크리트 협회)
                              </option>
                              <option value="Eurocode">
                                Eurocode (유럽설계기준)
                              </option>
                            </select>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 알림 설정 */}
                          <div>
                            <label className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                              <span>이메일 알림</span>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600"
                                defaultChecked
                              />
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                              <span>최적화 완료 알림</span>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600"
                                defaultChecked
                              />
                            </label>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 기타 설정 */}
                          <div className="space-y-2">
                            <Link
                              to="/auth/profile"
                              onClick={() => setShowSettings(false)}
                              className="block px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm text-center transition-colors"
                            >
                              프로필 설정
                            </Link>
                            <button
                              type="button"
                              className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm transition-colors"
                            >
                              데이터 백업
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm"
                >
                  로그인
                </Link>
                <div className="relative" ref={settingsRef}>
                  <button
                    type="button"
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors"
                  >
                    설정
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-lg z-50">
                      <div className="p-4">
                        <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                          설정
                        </h3>
                        <div className="space-y-4">
                          {/* 테마 설정 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              테마
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={toggleTheme}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  theme === 'light'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                라이트
                              </button>
                              <button
                                type="button"
                                onClick={toggleTheme}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                다크
                              </button>
                            </div>
                          </div>

                          {/* 언어 설정 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              언어
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={toggleLanguage}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  language === 'ko'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                한국어
                              </button>
                              <button
                                type="button"
                                onClick={toggleLanguage}
                                className={`flex-1 px-3 py-2 rounded border text-sm transition-colors ${
                                  language === 'en'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                              >
                                English
                              </button>
                            </div>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 기본 단위계 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              기본 단위계
                            </label>
                            <select className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm">
                              <option value="metric">미터법 (m, kg, N)</option>
                              <option value="imperial">
                                야드파운드법 (ft, lb, lbf)
                              </option>
                            </select>
                          </div>

                          {/* 코드 기준 */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              코드 기준
                            </label>
                            <select className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm">
                              <option value="KDS">KDS (한국설계기준)</option>
                              <option value="ACI">
                                ACI (미국 콘크리트 협회)
                              </option>
                              <option value="Eurocode">
                                Eurocode (유럽설계기준)
                              </option>
                            </select>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 알림 설정 */}
                          <div>
                            <label className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                              <span>이메일 알림</span>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600"
                                defaultChecked
                              />
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                              <span>최적화 완료 알림</span>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600"
                                defaultChecked
                              />
                            </label>
                          </div>

                          {/* 구분선 */}
                          <div className="border-t border-neutral-200 dark:border-neutral-700"></div>

                          {/* 기타 설정 */}
                          <div className="space-y-2">
                            <Link
                              to="/auth/profile"
                              onClick={() => setShowSettings(false)}
                              className="block px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm text-center transition-colors"
                            >
                              프로필 설정
                            </Link>
                            <button
                              type="button"
                              className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm transition-colors"
                            >
                              데이터 백업
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { ClashReview } from '../structure/ClashReview'

type TabType = 'clash'

export function DesignDocuments() {
  const [activeTab, setActiveTab] = useState<TabType>('clash')

  return (
    <section className="w-full">
      <h2>시공정보</h2>

      {/* 탭 메뉴 */}
      <div className="flex gap-2 mt-6 border-b border-neutral-300 dark:border-neutral-700">
        <button
          type="button"
          onClick={() => setActiveTab('clash')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'clash'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Clash 검토
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="mt-6">
        {/* Clash 검토 */}
        {activeTab === 'clash' && (
          <div className="w-full">
            <ClashReview />
          </div>
        )}
      </div>
    </section>
  )
}

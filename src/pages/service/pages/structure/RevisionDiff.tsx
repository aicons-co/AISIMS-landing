import { useState, useMemo } from 'react'
import { RevisionDiffViewer3D } from '../../components/RevisionDiffViewer3D'
import { JsonDiff } from '../../components/JsonDiff'

type Revision = {
  id: string
  rev: string
  createdAt: string
  author: string
  changeNote: string
  hash: string
}

type RevisionDiffProps = {
  rev1: Revision
  rev2: Revision
  onBack: () => void
}

type ElementChange = {
  id: string
  type: 'added' | 'deleted' | 'modified'
  element: any
  oldElement?: any
  changes?: Record<string, { old: any; new: any }>
}

export function RevisionDiff({ rev1, rev2, onBack }: RevisionDiffProps) {
  const [showOnlyChanges, setShowOnlyChanges] = useState(true)
  const [activeTab, setActiveTab] = useState<'3d' | 'json'>('3d')

  // 샘플 JSON 데이터 (실제로는 API에서 가져옴)
  const rev1Data: { elements: Record<string, any> } = {
    elements: {
      beam_101: {
        id: 'beam_101',
        type: 'Beam',
        props: {
          length: 3000,
          material: 'C30',
          position: { x: 0, y: 2000, z: 3500 },
        },
      },
      column_5: {
        id: 'column_5',
        type: 'Column',
        props: {
          height: 3600,
          material: 'C27',
          position: { x: 0, y: 0, z: 0 },
        },
      },
      slab_1: {
        id: 'slab_1',
        type: 'Slab',
        props: {
          thickness: 180,
          material: 'C24',
          position: { x: 0, y: 3600, z: 0 },
        },
      },
    },
  }

  const rev2Data: { elements: Record<string, any> } = {
    elements: {
      beam_101: {
        id: 'beam_101',
        type: 'Beam',
        props: {
          length: 3200, // 변경됨
          material: 'C35', // 변경됨
          position: { x: 0, y: 2000, z: 3500 },
        },
      },
      // column_5 삭제됨
      slab_1: {
        id: 'slab_1',
        type: 'Slab',
        props: {
          thickness: 200, // 변경됨
          material: 'C24',
          position: { x: 0, y: 3600, z: 0 },
        },
      },
      slab_2: {
        // 새로 추가됨
        id: 'slab_2',
        type: 'Slab',
        props: {
          thickness: 180,
          material: 'C24',
          position: { x: 4200, y: 3600, z: 0 },
        },
      },
    },
  }

  // Diff 계산
  const diffResult = useMemo(() => {
    const changes: ElementChange[] = []
    const rev1Elements = rev1Data.elements
    const rev2Elements = rev2Data.elements

    // 추가된 요소
    Object.keys(rev2Elements).forEach((key) => {
      if (!rev1Elements[key]) {
        changes.push({
          id: key,
          type: 'added',
          element: rev2Elements[key],
        })
      }
    })

    // 삭제된 요소
    Object.keys(rev1Elements).forEach((key) => {
      if (!rev2Elements[key]) {
        changes.push({
          id: key,
          type: 'deleted',
          element: rev1Elements[key],
          oldElement: rev1Elements[key],
        })
      }
    })

    // 변경된 요소
    Object.keys(rev1Elements).forEach((key) => {
      if (rev2Elements[key]) {
        const oldElem = rev1Elements[key]
        const newElem = rev2Elements[key]
        const propChanges: Record<string, { old: any; new: any }> = {}

        // 속성 비교
        Object.keys(oldElem.props || {}).forEach((propKey) => {
          if (
            JSON.stringify(oldElem.props[propKey]) !==
            JSON.stringify(newElem.props[propKey])
          ) {
            propChanges[`props.${propKey}`] = {
              old: oldElem.props[propKey],
              new: newElem.props[propKey],
            }
          }
        })

        if (Object.keys(propChanges).length > 0) {
          changes.push({
            id: key,
            type: 'modified',
            element: newElem,
            oldElement: oldElem,
            changes: propChanges,
          })
        }
      }
    })

    return changes
  }, [])

  const summary = useMemo(() => {
    return {
      added: diffResult.filter((c) => c.type === 'added').length,
      deleted: diffResult.filter((c) => c.type === 'deleted').length,
      modified: diffResult.filter((c) => c.type === 'modified').length,
    }
  }, [diffResult])

  return (
    <div className="w-full space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-2 bg-neutral-500 hover:bg-neutral-600 text-white text-sm rounded transition-colors"
          >
            ← 목록으로
          </button>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-sm">
              <option>{rev1.rev}</option>
            </select>
            <span className="text-neutral-600 dark:text-neutral-400">vs</span>
            <select className="px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-700 text-sm">
              <option>{rev2.rev}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-green-600 dark:text-green-400 font-semibold">
              추가 {summary.added}
            </span>
            {' / '}
            <span className="text-red-600 dark:text-red-400 font-semibold">
              삭제 {summary.deleted}
            </span>
            {' / '}
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
              변경 {summary.modified}
            </span>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlyChanges}
              onChange={(e) => setShowOnlyChanges(e.target.checked)}
              className="w-4 h-4"
            />
            변경 요소만 보기
          </label>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-2 border-b border-neutral-300 dark:border-neutral-700">
        <button
          type="button"
          onClick={() => setActiveTab('3d')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === '3d'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          3D 비교
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('json')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'json'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          JSON Diff
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 메인 뷰어 */}
        <div className="col-span-8 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
          {activeTab === '3d' ? (
            <div className="h-[600px]">
              <RevisionDiffViewer3D
                changes={diffResult}
                showOnlyChanges={showOnlyChanges}
              />
            </div>
          ) : (
            <div className="h-[600px] overflow-auto p-4">
              <JsonDiff oldData={rev1Data} newData={rev2Data} />
            </div>
          )}
        </div>

        {/* Diff 리스트 */}
        <div className="col-span-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="font-semibold">변경 사항 목록</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 p-4">
              {diffResult.map((change) => (
                <div
                  key={change.id}
                  className={`p-3 rounded border ${
                    change.type === 'added'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                      : change.type === 'deleted'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        change.type === 'added'
                          ? 'bg-green-500'
                          : change.type === 'deleted'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                      }`}
                    />
                    <span className="font-medium text-sm">{change.id}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      (
                      {change.type === 'added'
                        ? '추가'
                        : change.type === 'deleted'
                          ? '삭제'
                          : '변경'}
                      )
                    </span>
                  </div>
                  {change.type === 'modified' && change.changes && (
                    <div className="text-xs space-y-1 mt-2">
                      {Object.entries(change.changes).map(([key, value]) => (
                        <div key={key} className="pl-4">
                          <span className="font-medium">{key}:</span>{' '}
                          <span className="text-red-600 dark:text-red-400">
                            {JSON.stringify(value.old)}
                          </span>{' '}
                          →{' '}
                          <span className="text-green-600 dark:text-green-400">
                            {JSON.stringify(value.new)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>추가된 요소</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded opacity-50" />
            <span>삭제된 요소</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span>변경된 요소</span>
          </div>
        </div>
      </div>
    </div>
  )
}

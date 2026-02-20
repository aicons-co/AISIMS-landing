import { useState } from 'react';
import { RevisionDiff } from './RevisionDiff';

type Revision = {
	id: string;
	rev: string;
	createdAt: string;
	author: string;
	changeNote: string;
	hash: string;
	snapshot?: string;
	version?: string;
	date?: string;
	description?: string;
	changes?: string[];
};

export function RevisionHistory() {
	const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);
	const [showDiff, setShowDiff] = useState(false);

	// 샘플 리비전 데이터
	const revisions: Revision[] = [
		{
			id: 'rev_001',
			rev: 'Rev. 1.0',
			version: 'Rev. 1.0',
			createdAt: '2025-01-01T09:00:00',
			date: '2025-01-01',
			author: '김설계',
			changeNote: '초기 설계안',
			description: '초기 설계안',
			hash: 'sha256:abc123...',
			changes: ['초기 구조 설계 완료', 'BIM 모델 생성'],
		},
		{
			id: 'rev_002',
			rev: 'Rev. 1.1',
			version: 'Rev. 1.1',
			createdAt: '2025-01-05T14:30:00',
			date: '2025-01-05',
			author: '이설계',
			changeNote: '기초 설계 변경',
			description: '기초 설계 변경',
			hash: 'sha256:def456...',
			changes: ['기초 슬래브 두께 증가 (400mm → 500mm)', '기초 콘크리트 강도 변경 (C30/37 → C35/45)'],
		},
		{
			id: 'rev_003',
			rev: 'Rev. 1.2',
			version: 'Rev. 1.2',
			createdAt: '2025-01-10T11:20:00',
			date: '2025-01-10',
			author: '박설계',
			changeNote: '1층 구조 설계 수정',
			description: '1층 구조 설계 수정',
			hash: 'sha256:ghi789...',
			changes: ['1층 기둥 단면 변경 (600x600 → 550x550)', '슬래브 두께 조정 (250mm → 300mm)', '철근 배근 간격 수정'],
		},
		{
			id: 'rev_004',
			rev: 'Rev. 2.0',
			version: 'Rev. 2.0',
			createdAt: '2025-01-15T16:45:00',
			date: '2025-01-15',
			author: '최설계',
			changeNote: '최적화 결과 반영',
			description: '최적화 결과 반영',
			hash: 'sha256:jkl012...',
			changes: ['최적화 결과 반영', '구조 설계 최종 검토 완료'],
		},
	];

	const handleRevisionToggle = (revId: string) => {
		setSelectedRevisions((prev) => {
			if (prev.includes(revId)) {
				return prev.filter((id) => id !== revId);
			} else if (prev.length < 2) {
				return [...prev, revId];
			} else {
				// 최대 2개까지만 선택
				return [prev[1], revId];
			}
		});
	};

	const handleCompare = () => {
		if (selectedRevisions.length === 2) {
			setShowDiff(true);
		}
	};

	const handleBackToList = () => {
		setShowDiff(false);
		setSelectedRevisions([]);
	};

	if (showDiff && selectedRevisions.length === 2) {
		const rev1 = revisions.find((r) => r.id === selectedRevisions[0]);
		const rev2 = revisions.find((r) => r.id === selectedRevisions[1]);
		if (rev1 && rev2) {
			return <RevisionDiff rev1={rev1} rev2={rev2} onBack={handleBackToList} />;
		}
	}

	return (
		<div className="w-full space-y-6">
			{/* 헤더 */}
			<div className="flex items-center justify-between p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<div>
					<h3 className="text-lg font-semibold mb-2">Revision 이력</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						프로젝트 변경 이력을 확인하고 리비전을 비교할 수 있습니다.
					</p>
				</div>
				<div className="flex items-center gap-3">
					{selectedRevisions.length > 0 && (
						<span className="text-sm text-neutral-600 dark:text-neutral-400">
							{selectedRevisions.length}개 선택됨
						</span>
					)}
					<button
						type="button"
						onClick={handleCompare}
						disabled={selectedRevisions.length !== 2}
						className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
					>
						비교하기
					</button>
				</div>
			</div>

			{/* 리비전 리스트 */}
			<div className="space-y-4">
				{revisions.map((revision) => {
					const isSelected = selectedRevisions.includes(revision.id);
					return (
						<div
							key={revision.id}
							onClick={() => handleRevisionToggle(revision.id)}
							className={`p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-pointer ${
								isSelected
									? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
									: ''
							}`}
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="px-3 py-1 rounded text-sm font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
											{revision.version || revision.rev}
										</span>
										<h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
											{revision.description || revision.changeNote}
										</h4>
										{isSelected && (
											<div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-auto">
												<span className="text-white text-xs">✓</span>
											</div>
										)}
									</div>
									<div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
										<span>작성자: {revision.author}</span>
										<span>작성일: {revision.date || new Date(revision.createdAt).toLocaleDateString('ko-KR')}</span>
									</div>
									{revision.changes && revision.changes.length > 0 && (
										<div className="mt-3">
											<div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">주요 변경사항:</div>
											<ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
												{revision.changes.map((change, index) => (
													<li key={index}>{change}</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}


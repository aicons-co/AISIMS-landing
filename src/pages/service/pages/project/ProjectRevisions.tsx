import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { VirtualDiffViewer } from 'virtual-react-json-diff';

type Rev = {
	id: string;
	name: string;
	date: string;
	data: object; // 각 리비전의 JSON 데이터
};

// 샘플 리비전 데이터 생성 함수
const generateRevisionData = (revisionId: string): object => {
	const baseData = {
		project: {
			name: '빌딩 프로젝트',
			version: revisionId,
			lastModified: new Date().toISOString(),
		},
		elements: [
			{ id: 'E001', type: 'Wall', material: 'Concrete', thickness: 200 },
			{ id: 'E002', type: 'Column', material: 'Steel', height: 3000 },
			{ id: 'E003', type: 'Beam', material: 'Steel', length: 5000 },
		],
		metadata: {
			author: 'Architect Team',
			status: 'In Progress',
		},
	};

	// 리비전별로 데이터 변경
	if (revisionId === 'r1') {
		return baseData;
	} else if (revisionId === 'r2') {
		return {
			...baseData,
			project: {
				...baseData.project,
				version: revisionId,
			},
			elements: [
				...baseData.elements,
				{ id: 'E004', type: 'Slab', material: 'Concrete', thickness: 150 }, // 추가
			],
			metadata: {
				...baseData.metadata,
				status: 'Approved', // 변경
			},
		};
	} else if (revisionId === 'r3') {
		return {
			...baseData,
			project: {
				...baseData.project,
				version: revisionId,
			},
			elements: [
				{ id: 'E001', type: 'Wall', material: 'Concrete', thickness: 250 }, // 변경 (thickness)
				{ id: 'E002', type: 'Column', material: 'Steel', height: 3500 }, // 변경 (height)
				{ id: 'E003', type: 'Beam', material: 'Steel', length: 5000 },
				{ id: 'E004', type: 'Slab', material: 'Concrete', thickness: 150 },
				{ id: 'E005', type: 'Door', material: 'Wood', width: 900 }, // 추가
			],
			metadata: {
				...baseData.metadata,
				status: 'Completed',
				reviewer: 'Quality Team', // 추가
			},
		};
	}

	return baseData;
};

export function ProjectRevisions() {
	const { id } = useParams();
	const [revisions] = useState<Rev[]>([
		{ id: 'r1', name: 'BIM Rev A', date: '2025-09-01', data: generateRevisionData('r1') },
		{ id: 'r2', name: 'BIM Rev B', date: '2025-10-15', data: generateRevisionData('r2') },
		{ id: 'r3', name: 'BIM Rev C', date: '2025-11-20', data: generateRevisionData('r3') },
	]);
	const [selectedLeft, setSelectedLeft] = useState<string>('r1');
	const [selectedRight, setSelectedRight] = useState<string>('r2');

	const leftRevision = useMemo(() => revisions.find((r) => r.id === selectedLeft), [revisions, selectedLeft]);
	const rightRevision = useMemo(() => revisions.find((r) => r.id === selectedRight), [revisions, selectedRight]);

	const leftData = leftRevision?.data || {};
	const rightData = rightRevision?.data || {};

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
				리비전 비교 · {id}
			</h2>

			{/* 리비전 선택 */}
			<div className="mb-6 flex gap-4 items-center justify-center">
				<div className="flex-1">
					<select
						value={selectedLeft}
						onChange={(e) => setSelectedLeft(e.target.value)}
						className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{revisions.map((rev) => (
							<option key={rev.id} value={rev.id}>
								{rev.name} · {rev.date}
							</option>
						))}
					</select>
				</div>
				<div>
					<button
						type="button"
						disabled={!selectedLeft || !selectedRight || selectedLeft === selectedRight}
						className="px-6 py-2 h-[42px] bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
					>
						비교
					</button>
				</div>
				<div className="flex-1">
					<select
						value={selectedRight}
						onChange={(e) => setSelectedRight(e.target.value)}
						className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{revisions.map((rev) => (
							<option key={rev.id} value={rev.id}>
								{rev.name} · {rev.date}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* 비교 결과 */}
			<div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
				<h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">비교 결과</h3>
				<div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
					{selectedLeft && selectedRight && selectedLeft !== selectedRight ? (
						<VirtualDiffViewer
							oldValue={leftData}
							newValue={rightData}
							height={600}
							leftTitle={`${leftRevision?.name} (${leftRevision?.date})`}
							rightTitle={`${rightRevision?.name} (${rightRevision?.date})`}
							showLineCount={true}
							className="diff-viewer-container"
						/>
					) : (
						<div className="h-[600px] flex items-center justify-center text-neutral-500 dark:text-neutral-400">
							다른 두 리비전을 선택해주세요.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}


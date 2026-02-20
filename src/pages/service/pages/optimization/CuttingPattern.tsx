import { useState } from 'react';

type CuttingPattern = {
	id: string;
	diameter: string;
	originalLength: number; // m
	cutLength: number; // m
	quantity: number; // 본
	waste: number; // m
	wasteRate: number; // %
	cuttingSequence: string[];
};

type Bundle = {
	id: string;
	barMark: string;
	diameter: string;
	length: number; // m
	quantity: number; // 본
	bundleSize: number; // 묶음당 개수
	totalBundles: number;
	cuttingSequence: number; // 자동 제안된 순서
	lotNo: string; // 자동 생성
};

type InstallationDifficulty = {
	barMark: string;
	couplerPosition: {
		status: 'valid' | 'warning' | 'error';
		message: string;
	};
	lapOverlap: {
		hasOverlap: boolean;
		overlapLength?: number; // m
		message: string;
	};
	clashInterference: {
		hasClash: boolean;
		clashId?: string;
		message: string;
	};
	overallDifficulty: 'low' | 'medium' | 'high';
};

export function CuttingPattern() {
	const [selectedBarMark, setSelectedBarMark] = useState<string | null>(null);

	// A. 최적 Cutting 패턴 테이블
	const cuttingPatterns: CuttingPattern[] = [
		{
			id: 'CP-001',
			diameter: 'D25',
			originalLength: 11.0,
			cutLength: 10.8,
			quantity: 125,
			waste: 0.2,
			wasteRate: 1.8,
			cuttingSequence: ['10.8m × 125본'],
		},
		{
			id: 'CP-002',
			diameter: 'D22',
			originalLength: 11.0,
			cutLength: 8.5,
			quantity: 85,
			waste: 2.5,
			wasteRate: 22.7,
			cuttingSequence: ['8.5m × 85본', '잔재: 2.5m × 85본'],
		},
		{
			id: 'CP-003',
			diameter: 'D19',
			originalLength: 10.8,
			cutLength: 7.2,
			quantity: 120,
			waste: 3.6,
			wasteRate: 33.3,
			cuttingSequence: ['7.2m × 120본', '잔재: 3.6m × 120본'],
		},
		{
			id: 'CP-004',
			diameter: 'D16',
			originalLength: 11.0,
			cutLength: 5.5,
			quantity: 200,
			waste: 5.5,
			wasteRate: 50.0,
			cuttingSequence: ['5.5m × 200본', '잔재: 5.5m × 200본 (재활용 가능)'],
		},
	];

	// B. 공장 가공용 Bundle List
	const bundles: Bundle[] = [
		{
			id: 'B-001',
			barMark: 'BM-001',
			diameter: 'D25',
			length: 10.8,
			quantity: 125,
			bundleSize: 25,
			totalBundles: 5,
			cuttingSequence: 1,
			lotNo: 'LOT-2025-001-001',
		},
		{
			id: 'B-002',
			barMark: 'BM-002',
			diameter: 'D22',
			length: 8.5,
			quantity: 85,
			bundleSize: 20,
			totalBundles: 5,
			cuttingSequence: 2,
			lotNo: 'LOT-2025-001-002',
		},
		{
			id: 'B-003',
			barMark: 'BM-003',
			diameter: 'D19',
			length: 7.2,
			quantity: 120,
			bundleSize: 30,
			totalBundles: 4,
			cuttingSequence: 3,
			lotNo: 'LOT-2025-001-003',
		},
		{
			id: 'B-004',
			barMark: 'BM-004',
			diameter: 'D16',
			length: 5.5,
			quantity: 200,
			bundleSize: 25,
			totalBundles: 8,
			cuttingSequence: 4,
			lotNo: 'LOT-2025-001-004',
		},
		{
			id: 'B-005',
			barMark: 'BM-005',
			diameter: 'D25',
			length: 10.8,
			quantity: 100,
			bundleSize: 25,
			totalBundles: 4,
			cuttingSequence: 5,
			lotNo: 'LOT-2025-001-005',
		},
	];

	// C. 현장 설치 난이도 검증
	const installationDifficulties: InstallationDifficulty[] = [
		{
			barMark: 'BM-001',
			couplerPosition: {
				status: 'valid',
				message: 'Coupler 위치 정상 (간격 50cm 이상)',
			},
			lapOverlap: {
				hasOverlap: false,
				message: 'Lap 구간 중첩 없음',
			},
			clashInterference: {
				hasClash: false,
				message: '설치공간 간섭 없음',
			},
			overallDifficulty: 'low',
		},
		{
			barMark: 'BM-002',
			couplerPosition: {
				status: 'warning',
				message: 'Coupler 위치 주의 (간격 30cm, 최소 50cm 권장)',
			},
			lapOverlap: {
				hasOverlap: true,
				overlapLength: 0.5,
				message: 'Lap 구간 중첩 발생 (0.5m)',
			},
			clashInterference: {
				hasClash: false,
				message: '설치공간 간섭 없음',
			},
			overallDifficulty: 'medium',
		},
		{
			barMark: 'BM-003',
			couplerPosition: {
				status: 'error',
				message: 'Coupler 위치 오류 (간격 20cm, 최소 50cm 필요)',
			},
			lapOverlap: {
				hasOverlap: true,
				overlapLength: 1.2,
				message: 'Lap 구간 중첩 발생 (1.2m)',
			},
			clashInterference: {
				hasClash: true,
				clashId: 'CLASH-2025-001',
				message: '설치공간 간섭 발생 (Clash Review 연계)',
			},
			overallDifficulty: 'high',
		},
		{
			barMark: 'BM-004',
			couplerPosition: {
				status: 'valid',
				message: 'Coupler 위치 정상',
			},
			lapOverlap: {
				hasOverlap: false,
				message: 'Lap 구간 중첩 없음',
			},
			clashInterference: {
				hasClash: true,
				clashId: 'CLASH-2025-002',
				message: '설치공간 간섭 발생 (Clash Review 연계)',
			},
			overallDifficulty: 'medium',
		},
	];

	const handleExport = (format: 'CSV' | 'PDF' | 'Image') => {
		console.log(`Exporting as ${format}`);
		alert(`${format} 형식으로 내보내기합니다.`);
	};

	const getDifficultyColor = (difficulty: 'low' | 'medium' | 'high') => {
		switch (difficulty) {
			case 'low':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case 'medium':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'high':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
		}
	};

	const getStatusColor = (status: 'valid' | 'warning' | 'error') => {
		switch (status) {
			case 'valid':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case 'warning':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'error':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
		}
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">Cutting Pattern</h2>

			{/* A. 최적 Cutting 패턴 테이블 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. 최적 Cutting 패턴 테이블</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">원재료 길이 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">절단 길이 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">수량 (본)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">잔재 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">손실률 (%)</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Cutting Sequence</th>
							</tr>
						</thead>
						<tbody>
							{cuttingPatterns.map((pattern) => (
								<tr key={pattern.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{pattern.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{pattern.diameter}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{pattern.originalLength.toFixed(1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium text-blue-600 dark:text-blue-400">
										{pattern.cutLength.toFixed(1)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{pattern.quantity}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{pattern.waste.toFixed(1)}</td>
									<td
										className={`p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium ${
											pattern.wasteRate > 30 ? 'text-red-600 dark:text-red-400' : pattern.wasteRate > 20 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
										}`}
									>
										{pattern.wasteRate.toFixed(1)}%
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
										{pattern.cuttingSequence.join(', ')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* B. 공장 가공용 Bundle List */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. 공장 가공용 Bundle List</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Bar Mark별 분류 · Cutting Sequence 자동 제안 · 동일 길이 철근 묶음(Bundle) 정보 · Lot No. 자동 생성
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Bar Mark</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">길이 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">수량 (본)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Bundle 크기</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 Bundle 수</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Cutting Sequence</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Lot No.</th>
							</tr>
						</thead>
						<tbody>
							{bundles.map((bundle) => (
								<tr key={bundle.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{bundle.barMark}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{bundle.diameter}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{bundle.length.toFixed(1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{bundle.quantity}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{bundle.bundleSize}본/묶음</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">{bundle.totalBundles}개</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-mono">
											#{bundle.cuttingSequence}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono text-xs">{bundle.lotNo}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* C. 현장 설치 난이도 검증 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. 현장 설치 난이도 검증</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Coupler 위치 검증 · Lap 구간 중첩 여부 표시 · 설치공간 간섭 여부(Clash Review 연계)
				</p>
				<div className="space-y-4">
					{installationDifficulties.map((difficulty, index) => (
						<div
							key={index}
							className={`p-4 rounded-lg border-2 ${
								difficulty.overallDifficulty === 'high'
									? 'bg-red-50 dark:bg-red-900/10 border-red-400 dark:border-red-700'
									: difficulty.overallDifficulty === 'medium'
										? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-400 dark:border-yellow-700'
										: 'bg-green-50 dark:bg-green-900/10 border-green-400 dark:border-green-700'
							}`}
						>
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<span className="px-3 py-1 rounded font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
										{difficulty.barMark}
									</span>
									<span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty.overallDifficulty)}`}>
										{difficulty.overallDifficulty === 'high' ? '높음' : difficulty.overallDifficulty === 'medium' ? '중간' : '낮음'}
									</span>
								</div>
								<button
									type="button"
									onClick={() => setSelectedBarMark(selectedBarMark === difficulty.barMark ? null : difficulty.barMark)}
									className="px-3 py-1.5 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
								>
									{selectedBarMark === difficulty.barMark ? '접기' : '상세 보기'}
								</button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								{/* Coupler 위치 검증 */}
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Coupler 위치</div>
									<div className={`px-2 py-1 rounded text-xs font-medium inline-block ${getStatusColor(difficulty.couplerPosition.status)}`}>
										{difficulty.couplerPosition.status === 'valid' ? '정상' : difficulty.couplerPosition.status === 'warning' ? '주의' : '오류'}
									</div>
									<div className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">{difficulty.couplerPosition.message}</div>
								</div>
								{/* Lap 구간 중첩 */}
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Lap 구간</div>
									<div
										className={`px-2 py-1 rounded text-xs font-medium inline-block ${
											difficulty.lapOverlap.hasOverlap
												? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
												: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
										}`}
									>
										{difficulty.lapOverlap.hasOverlap ? '중첩 발생' : '정상'}
									</div>
									<div className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
										{difficulty.lapOverlap.message}
										{difficulty.lapOverlap.overlapLength && ` (${difficulty.lapOverlap.overlapLength}m)`}
									</div>
								</div>
								{/* 설치공간 간섭 */}
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">설치공간 간섭</div>
									<div
										className={`px-2 py-1 rounded text-xs font-medium inline-block ${
											difficulty.clashInterference.hasClash
												? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
												: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
										}`}
									>
										{difficulty.clashInterference.hasClash ? '간섭 발생' : '정상'}
									</div>
									<div className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
										{difficulty.clashInterference.message}
										{difficulty.clashInterference.clashId && (
											<button
												type="button"
												onClick={() => {
													window.location.href = '/bim/clash?clashId=' + difficulty.clashInterference.clashId;
												}}
												className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
											>
												(Clash Review)
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* D. Export 기능 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">D. Export 기능</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Factory ERP 연동 CSV · Bar Mark 도면 자동 생성(PDF) · Cutting Pattern 2D 스케치 이미지
				</p>
				<div className="flex flex-wrap gap-3">
					<button
						type="button"
						onClick={() => handleExport('CSV')}
						className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Factory ERP 연동 CSV
					</button>
					<button
						type="button"
						onClick={() => handleExport('PDF')}
						className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Bar Mark 도면 자동 생성 (PDF)
					</button>
					<button
						type="button"
						onClick={() => handleExport('Image')}
						className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						Cutting Pattern 2D 스케치 이미지
					</button>
				</div>
			</div>
		</section>
	);
}

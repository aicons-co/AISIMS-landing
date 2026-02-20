import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type MemberTypeProgress = {
	memberType: 'Column' | 'Beam' | 'Slab' | 'Wall' | 'D-Wall';
	total: number;
	completed: number;
	completionRate: number; // %
};

type LevelHeatmap = {
	level: string;
	column: number; // %
	beam: number; // %
	slab: number; // %
	wall: number; // %
	dwall: number; // %
};

type DelayItem = {
	id: string;
	member: string;
	delayDays: number;
	message: string;
};

type BarMarkInstallation = {
	barMark: string;
	diameter: string;
	installedQuantity: number; // ton
	installedLength: number; // m
	installedWeight: number; // kg
	date: string;
};

type FourTrackComparison = {
	date: string;
	order: number; // ton
	processing: number; // ton
	delivery: number; // ton
	installation: number; // ton
};

type BIMVerification = {
	barMark: string;
	bimQuantity: number; // ton
	actualQuantity: number; // ton
	match: boolean;
	missingRebar?: boolean;
	couplerPosition?: {
		status: 'valid' | 'warning' | 'error';
		message: string;
	};
	couplerQuantity?: {
		planned: number;
		actual: number;
		match: boolean;
	};
	clashStatus?: {
		hasClash: boolean;
		clashId?: string;
		message: string;
	};
};

type ProgressAmount = {
	date: string;
	installedQuantity: number; // ton
	unitPrice: number; // 원/ton
	amount: number; // 원
	cumulativeAmount: number; // 원
};

type QualityCheck = {
	id: string;
	location: string;
	barMark: string;
	spacing: {
		planned: number; // mm
		actual: number; // mm
		compliance: boolean;
	};
	cover: {
		planned: number; // mm
		actual: number; // mm
		compliance: boolean;
	};
	hookLap: {
		compliance: boolean;
		issues: string[];
	};
	defects: string[];
};

export function InstallationProgress() {
	// A. 설치 진척률(Installation Progress)
	const overallCompletionRate = 68.5; // %

	const memberTypeProgress: MemberTypeProgress[] = [
		{ memberType: 'Column', total: 125, completed: 95, completionRate: 76.0 },
		{ memberType: 'Beam', total: 185, completed: 125, completionRate: 67.6 },
		{ memberType: 'Slab', total: 98, completed: 65, completionRate: 66.3 },
		{ memberType: 'Wall', total: 75, completed: 45, completionRate: 60.0 },
		{ memberType: 'D-Wall', total: 45, completed: 28, completionRate: 62.2 },
	];

	const levelHeatmap: LevelHeatmap[] = [
		{ level: 'B2', column: 100, beam: 100, slab: 100, wall: 100, dwall: 100 },
		{ level: 'B1', column: 100, beam: 100, slab: 95, wall: 90, dwall: 100 },
		{ level: '1F', column: 95, beam: 85, slab: 80, wall: 75, dwall: 0 },
		{ level: '2F', column: 90, beam: 75, slab: 70, wall: 65, dwall: 0 },
		{ level: '3F', column: 80, beam: 60, slab: 50, wall: 45, dwall: 0 },
		{ level: '4F', column: 65, beam: 45, slab: 30, wall: 25, dwall: 0 },
		{ level: '5F', column: 40, beam: 25, slab: 15, wall: 10, dwall: 0 },
		{ level: 'RF', column: 0, beam: 0, slab: 0, wall: 0, dwall: 0 },
	];

	const delayItems: DelayItem[] = [
		{ id: 'D1', member: 'Beam B402', delayDays: 2, message: 'Beam B402 설치지연 2일' },
		{ id: 'D2', member: 'Column C205', delayDays: 1, message: 'Column C205 설치지연 1일' },
		{ id: 'D3', member: 'Slab S301', delayDays: 3, message: 'Slab S301 설치지연 3일' },
	];

	// B. 철근 설치량 자동 산출
	const barMarkInstallations: BarMarkInstallation[] = [
		{ barMark: 'BM-001', diameter: 'D25', installedQuantity: 25.5, installedLength: 1250.5, installedWeight: 25500, date: '2025-03-15' },
		{ barMark: 'BM-002', diameter: 'D22', installedQuantity: 18.2, installedLength: 850.2, installedWeight: 18200, date: '2025-03-16' },
		{ barMark: 'BM-003', diameter: 'D19', installedQuantity: 12.3, installedLength: 680.5, installedWeight: 12300, date: '2025-03-17' },
		{ barMark: 'BM-004', diameter: 'D16', installedQuantity: 15.8, installedLength: 950.8, installedWeight: 15800, date: '2025-03-18' },
		{ barMark: 'BM-005', diameter: 'D13', installedQuantity: 8.5, installedLength: 520.5, installedWeight: 8500, date: '2025-03-19' },
	];

	const dailyInstallation = [
		{ date: '2025-03-15', installed: 25.5, planned: 28.0 },
		{ date: '2025-03-16', installed: 18.2, planned: 20.0 },
		{ date: '2025-03-17', installed: 12.3, planned: 15.0 },
		{ date: '2025-03-18', installed: 15.8, planned: 18.0 },
		{ date: '2025-03-19', installed: 8.5, planned: 12.0 },
	];

	const fourTrackComparison: FourTrackComparison[] = [
		{ date: '2025-03-01', order: 125.5, processing: 0, delivery: 0, installation: 0 },
		{ date: '2025-03-08', order: 250.5, processing: 125.5, delivery: 0, installation: 0 },
		{ date: '2025-03-15', order: 350.5, processing: 250.5, delivery: 125.5, installation: 25.5 },
		{ date: '2025-03-22', order: 450.5, processing: 350.5, delivery: 250.5, installation: 80.0 },
		{ date: '2025-03-29', order: 550.5, processing: 450.5, delivery: 350.5, installation: 150.0 },
	];

	// C. BIM 기반 현장 설치 검증
	const bimVerifications: BIMVerification[] = [
		{
			barMark: 'BM-001',
			bimQuantity: 25.5,
			actualQuantity: 25.5,
			match: true,
			missingRebar: false,
			couplerPosition: { status: 'valid', message: 'Coupler 위치 정상' },
			couplerQuantity: { planned: 125, actual: 125, match: true },
			clashStatus: { hasClash: false, message: 'Clash 없음' },
		},
		{
			barMark: 'BM-002',
			bimQuantity: 18.2,
			actualQuantity: 17.8,
			match: false,
			missingRebar: true,
			couplerPosition: { status: 'warning', message: 'Coupler 위치 주의 (간격 30cm)' },
			couplerQuantity: { planned: 95, actual: 92, match: false },
			clashStatus: { hasClash: false, message: 'Clash 없음' },
		},
		{
			barMark: 'BM-003',
			bimQuantity: 12.3,
			actualQuantity: 12.3,
			match: true,
			missingRebar: false,
			couplerPosition: { status: 'valid', message: 'Coupler 위치 정상' },
			couplerQuantity: { planned: 65, actual: 65, match: true },
			clashStatus: { hasClash: true, clashId: 'CLASH-2025-001', message: 'Clash 미해결' },
		},
	];

	// D. 기성(Progress Amount) 산출 연동
	const progressAmounts: ProgressAmount[] = [
		{ date: '2025-03-15', installedQuantity: 25.5, unitPrice: 850000, amount: 21675000, cumulativeAmount: 21675000 },
		{ date: '2025-03-16', installedQuantity: 18.2, unitPrice: 850000, amount: 15470000, cumulativeAmount: 37145000 },
		{ date: '2025-03-17', installedQuantity: 12.3, unitPrice: 850000, amount: 10455000, cumulativeAmount: 47600000 },
		{ date: '2025-03-18', installedQuantity: 15.8, unitPrice: 850000, amount: 13430000, cumulativeAmount: 61030000 },
		{ date: '2025-03-19', installedQuantity: 8.5, unitPrice: 850000, amount: 7225000, cumulativeAmount: 68255000 },
	];

	// E. 품질 검토(Quality Check)
	const qualityChecks: QualityCheck[] = [
		{
			id: 'QC-001',
			location: '3F Core Zone',
			barMark: 'BM-001',
			spacing: { planned: 200, actual: 195, compliance: true },
			cover: { planned: 40, actual: 42, compliance: true },
			hookLap: { compliance: true, issues: [] },
			defects: [],
		},
		{
			id: 'QC-002',
			location: '3F Tower Zone',
			barMark: 'BM-002',
			spacing: { planned: 200, actual: 220, compliance: false },
			cover: { planned: 40, actual: 35, compliance: false },
			hookLap: { compliance: false, issues: ['Hook 각도 부족', 'Lap 길이 부족'] },
			defects: ['Spacing 초과', 'Cover 부족'],
		},
		{
			id: 'QC-003',
			location: '4F Core Zone',
			barMark: 'BM-003',
			spacing: { planned: 200, actual: 205, compliance: true },
			cover: { planned: 40, actual: 38, compliance: true },
			hookLap: { compliance: true, issues: [] },
			defects: [],
		},
	];

	const formatNumber = (num: number, decimals: number = 1) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const getHeatmapColor = (value: number) => {
		if (value === 0) return 'bg-neutral-200 dark:bg-neutral-700';
		if (value < 30) return 'bg-red-200 dark:bg-red-900/30';
		if (value < 60) return 'bg-yellow-200 dark:bg-yellow-900/30';
		if (value < 90) return 'bg-blue-200 dark:bg-blue-900/30';
		return 'bg-green-200 dark:bg-green-900/30';
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">현장 설치 진행 상황</h2>

			{/* A. 설치 진척률(Installation Progress) */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. 설치 진척률(Installation Progress)</h3>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">전체 설치 완료율</div>
						<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{overallCompletionRate.toFixed(1)}%</div>
					</div>
				</div>

				{/* Column / Beam / Slab / Wall / D-Wall 설치상태 그래프 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Column / Beam / Slab / Wall / D-Wall 설치상태</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={memberTypeProgress}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="memberType" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '완료율 (%)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Bar dataKey="completionRate" fill="#3b82f6" name="완료율 (%)" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* 층별 설치 Heatmap */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">층별 설치 Heatmap</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Column</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Beam</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Slab</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Wall</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">D-Wall</th>
								</tr>
							</thead>
							<tbody>
								{levelHeatmap.map((level) => (
									<tr key={level.level} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{level.level}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getHeatmapColor(level.column)}`}>
												{level.column}%
											</div>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getHeatmapColor(level.beam)}`}>
												{level.beam}%
											</div>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getHeatmapColor(level.slab)}`}>
												{level.slab}%
											</div>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getHeatmapColor(level.wall)}`}>
												{level.wall}%
											</div>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getHeatmapColor(level.dwall)}`}>
												{level.dwall}%
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Delay 항목 */}
				{delayItems.length > 0 && (
					<div>
						<h4 className="text-md font-medium mb-3">Delay 항목</h4>
						<div className="space-y-2">
							{delayItems.map((delay) => (
								<div key={delay.id} className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
									<div className="text-sm font-medium text-red-800 dark:text-red-200">{delay.message}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* B. 철근 설치량 자동 산출 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. 철근 설치량 자동 산출</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					각 Bar Mark별 설치량(kg/m/ton) · 일단위 설치량 → 공정 대비 설치량 비교 · "설치 vs 발주 vs 가공 vs 납품" 4-Track 비교 (AISIMS 파서에서 계산된 length_mm × n_bars 로 자동 연산)
				</p>

				{/* Bar Mark별 설치량 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Bar Mark별 설치량</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Bar Mark</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">설치량 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">설치 길이 (m)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">설치 중량 (kg)</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">설치일</th>
								</tr>
							</thead>
							<tbody>
								{barMarkInstallations.map((item) => (
									<tr key={item.barMark} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{item.barMark}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{item.diameter}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(item.installedQuantity, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(item.installedLength, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{item.installedWeight.toLocaleString()}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.date}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 일단위 설치량 → 공정 대비 설치량 비교 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">일단위 설치량 → 공정 대비 설치량 비교</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={dailyInstallation}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '설치량 (ton)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Legend />
								<Bar dataKey="installed" fill="#10b981" name="실제 설치량" />
								<Bar dataKey="planned" fill="#3b82f6" name="계획 설치량" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* 4-Track 비교 */}
				<div>
					<h4 className="text-md font-medium mb-3">설치 vs 발주 vs 가공 vs 납품 4-Track 비교</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={fourTrackComparison}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '물량 (ton)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="order" stroke="#3b82f6" strokeWidth={2} name="발주" />
								<Line type="monotone" dataKey="processing" stroke="#f59e0b" strokeWidth={2} name="가공" />
								<Line type="monotone" dataKey="delivery" stroke="#8b5cf6" strokeWidth={2} name="납품" />
								<Line type="monotone" dataKey="installation" stroke="#10b981" strokeWidth={2} name="설치" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* C. BIM 기반 현장 설치 검증 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. BIM 기반 현장 설치 검증</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					BIM Rebar Model과 실제 설치 데이터 비교 · 누락 철근 자동 탐지 (Missing rebar detection) · Coupler 위치/수량 검증 · Clash 미해결 상태 표시
				</p>
				<div className="space-y-4">
					{bimVerifications.map((verification) => (
						<div
							key={verification.barMark}
							className={`p-4 rounded-lg border-2 ${
								!verification.match || verification.missingRebar || verification.clashStatus?.hasClash
									? 'bg-red-50 dark:bg-red-900/10 border-red-400 dark:border-red-700'
									: 'bg-green-50 dark:bg-green-900/10 border-green-400 dark:border-green-700'
							}`}
						>
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<span className="px-3 py-1 rounded font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
										{verification.barMark}
									</span>
									{verification.missingRebar && (
										<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium">
											누락 철근 탐지
										</span>
									)}
									{verification.clashStatus?.hasClash && (
										<span className="px-2 py-1 rounded text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 font-medium">
											Clash 미해결
										</span>
									)}
								</div>
								<span
									className={`px-2 py-1 rounded text-xs ${
										verification.match
											? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
											: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
									}`}
								>
									{verification.match ? '일치' : '불일치'}
								</span>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">BIM vs 실제</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300">
										BIM: {formatNumber(verification.bimQuantity, 1)} ton / 실제: {formatNumber(verification.actualQuantity, 1)} ton
									</div>
								</div>
								{verification.couplerPosition && (
									<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Coupler 위치</div>
										<div
											className={`text-xs px-2 py-1 rounded inline-block ${
												verification.couplerPosition.status === 'valid'
													? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
													: verification.couplerPosition.status === 'warning'
														? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
														: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
											}`}
										>
											{verification.couplerPosition.message}
										</div>
									</div>
								)}
								{verification.couplerQuantity && (
									<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Coupler 수량</div>
										<div className="text-sm text-neutral-700 dark:text-neutral-300">
											계획: {verification.couplerQuantity.planned}개 / 실제: {verification.couplerQuantity.actual}개
											{!verification.couplerQuantity.match && (
												<span className="ml-2 text-xs text-red-600 dark:text-red-400">불일치</span>
											)}
										</div>
									</div>
								)}
							</div>
							{verification.clashStatus?.hasClash && (
								<div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded border border-orange-200 dark:border-orange-800">
									<div className="text-xs text-orange-700 dark:text-orange-300">
										{verification.clashStatus.message}
										{verification.clashStatus.clashId && (
											<button
												type="button"
												onClick={() => {
													window.location.href = '/bim/clash?clashId=' + verification.clashStatus?.clashId;
												}}
												className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
											>
												(Clash Review)
											</button>
										)}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* D. 기성(Progress Amount) 산출 연동 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">D. 기성(Progress Amount) 산출 연동</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					설치량(ton) → 내역서(BOQ) 기성 단가 × 설치량 → 기성 금액 · 기성 누적 그래프 · 기성 보고서 자동 생성(PDF)
				</p>
				<div className="mb-6 overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">일자</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">설치량 (ton)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기성 단가 (원/ton)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기성 금액 (원)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">누적 금액 (원)</th>
							</tr>
						</thead>
						<tbody>
							{progressAmounts.map((amount) => (
								<tr key={amount.date} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{amount.date}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(amount.installedQuantity, 1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{amount.unitPrice.toLocaleString()}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">{amount.amount.toLocaleString()}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-bold text-blue-600 dark:text-blue-400">
										{amount.cumulativeAmount.toLocaleString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mb-4">
					<h4 className="text-md font-medium mb-3">기성 누적 그래프</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={progressAmounts}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '기성 금액 (원)', angle: -90, position: 'insideLeft' }} />
								<Tooltip formatter={(value: number) => value.toLocaleString() + '원'} />
								<Line type="monotone" dataKey="cumulativeAmount" stroke="#10b981" strokeWidth={2} name="누적 기성 금액" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
				<button
					type="button"
					onClick={() => alert('기성 보고서 PDF 생성')}
					className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center gap-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					기성 보고서 자동 생성 (PDF)
				</button>
			</div>

			{/* E. 품질 검토(Quality Check) */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">E. 품질 검토(Quality Check)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Spacing 검사 · Cover 검사 · Hook/Lap 규정 준수 여부 · Defect Report 생성
				</p>
				<div className="space-y-4">
					{qualityChecks.map((check) => (
						<div
							key={check.id}
							className={`p-4 rounded-lg border-2 ${
								check.defects.length > 0 || !check.spacing.compliance || !check.cover.compliance || !check.hookLap.compliance
									? 'bg-red-50 dark:bg-red-900/10 border-red-400 dark:border-red-700'
									: 'bg-green-50 dark:bg-green-900/10 border-green-400 dark:border-green-700'
							}`}
						>
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<span className="px-3 py-1 rounded font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
										{check.location}
									</span>
									<span className="font-medium text-neutral-900 dark:text-neutral-100">{check.barMark}</span>
								</div>
								{check.defects.length > 0 && (
									<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium">
										Defect {check.defects.length}건
									</span>
								)}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Spacing 검사</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
										계획: {check.spacing.planned}mm / 실제: {check.spacing.actual}mm
									</div>
									<span
										className={`px-2 py-1 rounded text-xs ${
											check.spacing.compliance
												? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
												: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
										}`}
									>
										{check.spacing.compliance ? '준수' : '미준수'}
									</span>
								</div>
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Cover 검사</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
										계획: {check.cover.planned}mm / 실제: {check.cover.actual}mm
									</div>
									<span
										className={`px-2 py-1 rounded text-xs ${
											check.cover.compliance
												? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
												: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
										}`}
									>
										{check.cover.compliance ? '준수' : '미준수'}
									</span>
								</div>
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Hook/Lap 규정 준수</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
										{check.hookLap.compliance ? '준수' : '미준수'}
									</div>
									{check.hookLap.issues.length > 0 && (
										<div className="text-xs text-red-600 dark:text-red-400 mt-1">
											이슈: {check.hookLap.issues.join(', ')}
										</div>
									)}
								</div>
							</div>
							{check.defects.length > 0 && (
								<div className="p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-800">
									<div className="text-xs font-medium text-red-800 dark:text-red-200 mb-1">Defect 목록:</div>
									<ul className="list-disc list-inside text-xs text-red-700 dark:text-red-300 space-y-1">
										{check.defects.map((defect, index) => (
											<li key={index}>{defect}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => alert('Defect Report 생성')}
					className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors flex items-center gap-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Defect Report 생성
				</button>
			</div>
		</section>
	);
}

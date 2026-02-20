import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DiameterProgress = {
	diameter: string;
	totalQuantity: number; // ton
	processedQuantity: number; // ton
	completionRate: number; // %
};

type BarMarkProgress = {
	barMark: string;
	diameter: string;
	lotNo: string;
	status: '대기' | '가공중' | '완료';
	completionRate: number; // %
	expectedDate: string;
};

type CuttingPatternCheck = {
	barMark: string;
	plannedLength: number; // m
	actualLength: number; // m
	offcut: number; // m
	rcw: number; // %
	match: boolean;
	error?: string;
};

type ShippingStatus = {
	id: string;
	diameter: string;
	lotNo: string;
	shippedQuantity: number; // ton
	shippedDate: string;
	distance: number; // km
	eta: string; // 도착예정시간
	actualArrival?: string;
	status: 'on-time' | 'delayed';
	delayHours?: number;
};

type DailyDelivery = {
	date: string;
	barMarks: {
		barMark: string;
		quantity: number; // ton
		location: string; // Laydown Area 좌표
		status: 'received' | 'missing' | 'excess';
	}[];
	totalQuantity: number; // ton
};

type SupplierEvaluation = {
	supplier: string;
	onTimeDeliveryRate: number; // %
	qualityIssues: number;
	actualRCW: number; // %
	rcwData: {
		date: string;
		rcw: number; // %
	}[];
};

export function ProcessingDeliveryStatus() {
	const [selectedSupplier, setSelectedSupplier] = useState<string>('supplier-a');

	// A. 가공 진행률(Fabrication Progress)
	const overallCompletionRate = 68.5; // %

	const diameterProgress: DiameterProgress[] = [
		{ diameter: 'D13', totalQuantity: 125.5, processedQuantity: 95.2, completionRate: 75.9 },
		{ diameter: 'D16', totalQuantity: 185.8, processedQuantity: 125.3, completionRate: 67.4 },
		{ diameter: 'D19', totalQuantity: 98.2, processedQuantity: 68.5, completionRate: 69.8 },
		{ diameter: 'D22', totalQuantity: 75.5, processedQuantity: 45.2, completionRate: 59.9 },
		{ diameter: 'D25', totalQuantity: 65.3, processedQuantity: 42.8, completionRate: 65.5 },
		{ diameter: 'D28', totalQuantity: 45.2, processedQuantity: 28.5, completionRate: 63.1 },
		{ diameter: 'D32', totalQuantity: 28.5, processedQuantity: 15.2, completionRate: 53.3 },
		{ diameter: 'D35', totalQuantity: 15.8, processedQuantity: 8.5, completionRate: 53.8 },
		{ diameter: 'D40', totalQuantity: 8.2, processedQuantity: 3.2, completionRate: 39.0 },
	];

	const barMarkProgress: BarMarkProgress[] = [
		{ barMark: 'BM-001', diameter: 'D25', lotNo: 'LOT-2025-001', status: '완료', completionRate: 100, expectedDate: '2025-03-15' },
		{ barMark: 'BM-002', diameter: 'D22', lotNo: 'LOT-2025-002', status: '가공중', completionRate: 65, expectedDate: '2025-03-20' },
		{ barMark: 'BM-003', diameter: 'D19', lotNo: 'LOT-2025-003', status: '가공중', completionRate: 45, expectedDate: '2025-03-25' },
		{ barMark: 'BM-004', diameter: 'D16', lotNo: 'LOT-2025-004', status: '대기', completionRate: 0, expectedDate: '2025-03-30' },
		{ barMark: 'BM-005', diameter: 'D13', lotNo: 'LOT-2025-005', status: '완료', completionRate: 100, expectedDate: '2025-03-18' },
	];

	// B. Cutting Pattern 반영 여부
	const cuttingPatternChecks: CuttingPatternCheck[] = [
		{ barMark: 'BM-001', plannedLength: 10.8, actualLength: 10.8, offcut: 0.2, rcw: 0.6, match: true },
		{ barMark: 'BM-002', plannedLength: 11.0, actualLength: 11.0, offcut: 0.5, rcw: 0.8, match: true },
		{ barMark: 'BM-003', plannedLength: 10.5, actualLength: 10.3, offcut: 0.7, rcw: 1.2, match: false, error: '길이 불일치: -0.2m' },
		{ barMark: 'BM-004', plannedLength: 8.5, actualLength: 8.5, offcut: 2.5, rcw: 22.7, match: true },
		{ barMark: 'BM-005', plannedLength: 7.2, actualLength: 7.5, offcut: 3.3, rcw: 33.3, match: false, error: '길이 불일치: +0.3m' },
	];

	// C. 출하(Shipping) 상태
	const shippingStatuses: ShippingStatus[] = [
		{
			id: 'SH-001',
			diameter: 'D25',
			lotNo: 'Lot-231',
			shippedQuantity: 45.2,
			shippedDate: '2025-03-15',
			distance: 125,
			eta: '2025-03-15 14:00',
			actualArrival: '2025-03-15 13:45',
			status: 'on-time',
		},
		{
			id: 'SH-002',
			diameter: 'D22',
			lotNo: 'Lot-232',
			shippedQuantity: 38.5,
			shippedDate: '2025-03-18',
			distance: 150,
			eta: '2025-03-18 16:00',
			status: 'on-time',
		},
		{
			id: 'SH-003',
			diameter: 'D25',
			lotNo: 'Lot-231',
			shippedQuantity: 28.5,
			shippedDate: '2025-03-20',
			distance: 125,
			eta: '2025-03-20 14:00',
			status: 'delayed',
			delayHours: 4,
		},
	];

	// D. 현장 납품(Delivery) 상태
	const dailyDeliveries: DailyDelivery[] = [
		{
			date: '2025-03-15',
			barMarks: [
				{ barMark: 'BM-001', quantity: 25.5, location: 'A-3 (X: 120m, Y: 85m)', status: 'received' },
				{ barMark: 'BM-002', quantity: 18.2, location: 'A-4 (X: 150m, Y: 85m)', status: 'received' },
				{ barMark: 'BM-003', quantity: 12.3, location: 'B-2 (X: 200m, Y: 120m)', status: 'missing' },
			],
			totalQuantity: 56.0,
		},
		{
			date: '2025-03-16',
			barMarks: [
				{ barMark: 'BM-004', quantity: 15.8, location: 'A-5 (X: 180m, Y: 85m)', status: 'received' },
				{ barMark: 'BM-005', quantity: 22.5, location: 'B-3 (X: 220m, Y: 120m)', status: 'excess' },
			],
			totalQuantity: 38.3,
		},
	];

	// E. 공급사(가공소) 평가
	const supplierEvaluations: SupplierEvaluation[] = [
		{
			supplier: '공급사 A',
			onTimeDeliveryRate: 92.5,
			qualityIssues: 2,
			actualRCW: 2.1,
			rcwData: [
				{ date: '2025-03-01', rcw: 2.0 },
				{ date: '2025-03-08', rcw: 2.1 },
				{ date: '2025-03-15', rcw: 2.2 },
				{ date: '2025-03-22', rcw: 2.1 },
			],
		},
		{
			supplier: '공급사 B',
			onTimeDeliveryRate: 88.3,
			qualityIssues: 5,
			actualRCW: 2.8,
			rcwData: [
				{ date: '2025-03-01', rcw: 2.5 },
				{ date: '2025-03-08', rcw: 2.7 },
				{ date: '2025-03-15', rcw: 2.9 },
				{ date: '2025-03-22', rcw: 2.8 },
			],
		},
		{
			supplier: '공급사 C',
			onTimeDeliveryRate: 95.2,
			qualityIssues: 1,
			actualRCW: 1.9,
			rcwData: [
				{ date: '2025-03-01', rcw: 1.8 },
				{ date: '2025-03-08', rcw: 1.9 },
				{ date: '2025-03-15', rcw: 2.0 },
				{ date: '2025-03-22', rcw: 1.9 },
			],
		},
	];

	const currentSupplier = supplierEvaluations.find((s) => s.supplier === selectedSupplier);

	const formatNumber = (num: number, decimals: number = 1) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">가공/납품 현황</h2>

			{/* A. 가공 진행률(Fabrication Progress) */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. 가공 진행률(Fabrication Progress)</h3>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">가공 완료율</div>
						<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{overallCompletionRate.toFixed(1)}%</div>
					</div>
				</div>

				{/* 직경별(D13~D40) 가공 현황 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">직경별(D13~D40) 가공 현황</h4>
					<div className="h-[300px] mb-4">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={diameterProgress}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="diameter" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '가공량 (ton)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Bar dataKey="processedQuantity" fill="#3b82f6" name="가공량 (ton)" />
								<Bar dataKey="totalQuantity" fill="#e5e7eb" name="전체량 (ton)" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">전체량 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">가공량 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">완료율 (%)</th>
								</tr>
							</thead>
							<tbody>
								{diameterProgress.map((item) => (
									<tr key={item.diameter} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{item.diameter}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(item.totalQuantity, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(item.processedQuantity, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											<div className="flex items-center justify-end gap-2">
												<div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
													<div
														className="bg-blue-500 h-2 rounded-full"
														style={{ width: `${item.completionRate}%` }}
													></div>
												</div>
												<span className="text-sm">{item.completionRate.toFixed(1)}%</span>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Bar Mark 별 진행 상태 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Bar Mark 별 진행 상태</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Bar Mark</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">가공 Lot 번호</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">완료율 (%)</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">예정일</th>
								</tr>
							</thead>
							<tbody>
								{barMarkProgress.map((item) => (
									<tr key={item.barMark} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{item.barMark}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{item.diameter}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono text-xs">{item.lotNo}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<span
												className={`px-2 py-1 rounded text-xs ${
													item.status === '완료'
														? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
														: item.status === '가공중'
															? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
															: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
												}`}
											>
												{item.status}
											</span>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											<div className="flex items-center justify-end gap-2">
												<div className="w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
													<div
														className="bg-blue-500 h-2 rounded-full"
														style={{ width: `${item.completionRate}%` }}
													></div>
												</div>
												<span className="text-sm">{item.completionRate}%</span>
											</div>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.expectedDate}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* B. Cutting Pattern 반영 여부 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. Cutting Pattern 반영 여부</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					실제 가공 길이가 AISIMS Cutting Pattern과 일치 여부 자동 검사 · 잔재(Offcut) 길이·RCW 실측 표시 · 가공 오류(길이 불일치) 자동 감지
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Bar Mark</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">계획 길이 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">실제 길이 (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">잔재(Offcut) (m)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">RCW 실측 (%)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">일치 여부</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">오류</th>
							</tr>
						</thead>
						<tbody>
							{cuttingPatternChecks.map((check) => (
								<tr
									key={check.barMark}
									className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
										!check.match ? 'bg-red-50 dark:bg-red-900/10' : ''
									}`}
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{check.barMark}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{check.plannedLength.toFixed(1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{check.actualLength.toFixed(1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{check.offcut.toFixed(1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{check.rcw.toFixed(1)}%</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										{check.match ? (
											<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">일치</span>
										) : (
											<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">불일치</span>
										)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs text-red-600 dark:text-red-400">
										{check.error || '-'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* C. 출하(Shipping) 상태 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. 출하(Shipping) 상태</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					출하량(ton) / 출하일 / 출하 Lot · 운송거리·도착예정시간(ETA) · Late Delivery Alarm
				</p>
				{/* Late Delivery Alarm */}
				{shippingStatuses.filter((s) => s.status === 'delayed').length > 0 && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-400 dark:border-red-700">
						<div className="flex items-center gap-2 mb-2">
							<svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span className="font-semibold text-red-800 dark:text-red-200">Late Delivery Alarm</span>
						</div>
						{shippingStatuses
							.filter((s) => s.status === 'delayed')
							.map((ship) => (
								<div key={ship.id} className="text-sm text-red-700 dark:text-red-300 mb-1">
									{ship.diameter} 철근 {ship.lotNo} 도착지연: +{ship.delayHours}시간 예상
								</div>
							))}
					</div>
				)}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">출하 Lot</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">출하량 (ton)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">출하일</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">운송거리 (km)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">도착예정시간 (ETA)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">실제 도착</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
							</tr>
						</thead>
						<tbody>
							{shippingStatuses.map((ship) => (
								<tr
									key={ship.id}
									className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
										ship.status === 'delayed' ? 'bg-red-50 dark:bg-red-900/10' : ''
									}`}
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{ship.diameter}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{ship.lotNo}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(ship.shippedQuantity, 1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{ship.shippedDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{ship.distance} km</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center text-xs">{ship.eta}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center text-xs">{ship.actualArrival || '-'}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										{ship.status === 'delayed' ? (
											<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
												지연 +{ship.delayHours}시간
											</span>
										) : (
											<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">정상</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* D. 현장 납품(Delivery) 상태 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">D. 현장 납품(Delivery) 상태</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					도착량(ton) · 일일 수령 리스트(Bar Mark 기준) · 보관 위치(현장 Laydown Area 좌표) · Missing/Excess 자동 체크
				</p>
				<div className="space-y-4">
					{dailyDeliveries.map((delivery) => (
						<div key={delivery.date} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<div className="flex items-center justify-between mb-3">
								<div className="font-medium text-neutral-900 dark:text-neutral-100">{delivery.date}</div>
								<div className="text-sm text-neutral-600 dark:text-neutral-400">총 도착량: {formatNumber(delivery.totalQuantity, 1)} ton</div>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm">
									<thead>
										<tr className="bg-neutral-100 dark:bg-neutral-800">
											<th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">Bar Mark</th>
											<th className="text-right p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">도착량 (ton)</th>
											<th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">보관 위치</th>
											<th className="text-center p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
										</tr>
									</thead>
									<tbody>
										{delivery.barMarks.map((item) => (
											<tr
												key={item.barMark}
												className={`hover:bg-neutral-100 dark:hover:bg-neutral-800/50 ${
													item.status === 'missing' ? 'bg-red-50 dark:bg-red-900/10' : item.status === 'excess' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
												}`}
											>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">{item.barMark}</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(item.quantity, 1)}</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-xs">{item.location}</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-center">
													{item.status === 'received' ? (
														<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">수령완료</span>
													) : item.status === 'missing' ? (
														<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">Missing</span>
													) : (
														<span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">Excess</span>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* E. 공급사(가공소) 평가 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">E. 공급사(가공소) 평가</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					납기준수율(On-time Delivery) · 품질불량 이력 · 실제 RCW(가공소 기준) 데이터 통계 → 발주사(Client)는 공급사 선택의 참고지표로 활용
				</p>
				<div className="mb-4 flex items-center gap-4">
					<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">공급사 선택:</label>
					<select
						value={selectedSupplier}
						onChange={(e) => setSelectedSupplier(e.target.value)}
						className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
					>
						{supplierEvaluations.map((supplier) => (
							<option key={supplier.supplier} value={supplier.supplier}>
								{supplier.supplier}
							</option>
						))}
					</select>
				</div>
				{currentSupplier && (
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
								<div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">납기준수율</div>
								<div className="text-2xl font-bold text-green-900 dark:text-green-100">{currentSupplier.onTimeDeliveryRate.toFixed(1)}%</div>
							</div>
							<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
								<div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">품질불량 이력</div>
								<div className="text-2xl font-bold text-red-900 dark:text-red-100">{currentSupplier.qualityIssues}건</div>
							</div>
							<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
								<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">실제 RCW 평균</div>
								<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currentSupplier.actualRCW.toFixed(1)}%</div>
							</div>
						</div>
						<div>
							<h4 className="text-md font-medium mb-3">실제 RCW(가공소 기준) 데이터 통계</h4>
							<div className="h-[250px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={currentSupplier.rcwData}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
										<XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-neutral-400" />
										<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: 'RCW (%)', angle: -90, position: 'insideLeft' }} />
										<Tooltip />
										<Bar dataKey="rcw" fill="#3b82f6" name="RCW (%)" />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

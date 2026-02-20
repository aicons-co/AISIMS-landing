import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type SpecialLengthOrder = {
	length: number; // m
	diameter: string;
	quantity: number; // ton
	manufacturer: string;
	meetsMinTonnage: boolean;
};

type DiameterDistribution = {
	diameter: string;
	quantity: number; // ton
};

type OrderCandidate = {
	id: string;
	type: 'lap' | 'coupler';
	diameter: string;
	totalQuantity: number; // ton
	couplerQuantity?: number; // 개
	lapLength?: number; // m
	cost: number; // 원
	rcw: number; // %
	recommendation: string;
};

type JITOrder = {
	id: string;
	level: string;
	memberType: string;
	diameter: string;
	requiredQuantity: number; // ton
	requiredDate: string; // 다음 7일 내 필요일
	orderDate: string;
	leadTime: number; // 일
	deliveryDate: string;
	status: 'on-time' | 'at-risk' | 'delayed';
	delayDays?: number;
	alarmMessage?: string;
};

type OrderPackage = {
	id: string;
	type: 'bar-mark' | 'cut-length' | 'lot';
	name: string;
	barMarks?: string[];
	cutLength?: number; // m
	lotNo?: string;
	quantity: number; // ton
	supplier: string;
	distribution: {
		supplierA: number;
		supplierB: number;
		supplierC: number;
	};
};

type OrderChange = {
	id: string;
	revision: string;
	diameter: string;
	length?: number; // m
	previousQuantity: number; // ton
	newQuantity: number; // ton
	deltaQuantity: number; // ton
	status: 'shortage' | 'excess' | 'match';
	supplierDiscussion: string;
	changeType: 'new' | 'modify' | 'cancel';
	changeDate: string;
	changeHistory: string[];
};

export function RebarOrderPlan() {
	const [selectedCandidate, setSelectedCandidate] = useState<'lap' | 'coupler'>('lap');

	// A. Special-length 발주 계획(연동)
	const specialLengthOrders: SpecialLengthOrder[] = [
		{ length: 10.8, diameter: 'D25', quantity: 45.2, manufacturer: '제조사 A', meetsMinTonnage: true },
		{ length: 11.0, diameter: 'D22', quantity: 38.5, manufacturer: '제조사 B', meetsMinTonnage: true },
		{ length: 10.5, diameter: 'D19', quantity: 22.3, manufacturer: '제조사 C', meetsMinTonnage: true },
		{ length: 11.7, diameter: 'D16', quantity: 18.5, manufacturer: '제조사 A', meetsMinTonnage: true },
		{ length: 10.8, diameter: 'D13', quantity: 12.2, manufacturer: '제조사 B', meetsMinTonnage: true },
	];

	const diameterDistribution: DiameterDistribution[] = [
		{ diameter: 'D13', quantity: 125.5 },
		{ diameter: 'D16', quantity: 185.8 },
		{ diameter: 'D19', quantity: 98.2 },
		{ diameter: 'D22', quantity: 75.5 },
		{ diameter: 'D25', quantity: 65.3 },
		{ diameter: 'D28', quantity: 45.2 },
		{ diameter: 'D32', quantity: 28.5 },
		{ diameter: 'D35', quantity: 15.8 },
		{ diameter: 'D40', quantity: 8.2 },
	];

	const orderCandidates: OrderCandidate[] = [
		{
			id: 'OC-001',
			type: 'lap',
			diameter: 'D25',
			totalQuantity: 125.5,
			lapLength: 1.2,
			cost: 86012500,
			rcw: 3.2,
			recommendation: 'Lap 중심 설계, RCW 높음',
		},
		{
			id: 'OC-002',
			type: 'coupler',
			diameter: 'D25',
			totalQuantity: 125.5,
			couplerQuantity: 1250,
			cost: 92512500,
			rcw: 1.8,
			recommendation: 'Coupler 중심 설계, RCW 낮음, 비용 증가',
		},
	];

	// B. 공정 기반 JIT(Just-In-Time) 발주
	const jitOrders: JITOrder[] = [
		{
			id: 'JIT-001',
			level: '3F',
			memberType: 'Column',
			diameter: 'D25',
			requiredQuantity: 25.5,
			requiredDate: '2025-03-18',
			orderDate: '2025-03-01',
			leadTime: 14,
			deliveryDate: '2025-03-15',
			status: 'on-time',
		},
		{
			id: 'JIT-002',
			level: '5F',
			memberType: 'Beam',
			diameter: 'D22',
			requiredQuantity: 18.2,
			requiredDate: '2025-03-25',
			orderDate: '2025-03-10',
			leadTime: 12,
			deliveryDate: '2025-03-22',
			status: 'on-time',
		},
		{
			id: 'JIT-003',
			level: '8F',
			memberType: 'Slab',
			diameter: 'D16',
			requiredQuantity: 35.5,
			requiredDate: '2025-04-05',
			orderDate: '2025-03-28',
			leadTime: 7,
			deliveryDate: '2025-04-04',
			status: 'at-risk',
			delayDays: 1,
			alarmMessage: '8F Slab 철근 발주 지연 예상 – 3일 지연 위험',
		},
		{
			id: 'JIT-004',
			level: '4F',
			memberType: 'Wall',
			diameter: 'D19',
			requiredQuantity: 22.3,
			requiredDate: '2025-03-30',
			orderDate: '2025-03-15',
			leadTime: 12,
			deliveryDate: '2025-03-27',
			status: 'on-time',
		},
	];

	// 다음 7일 필요한 철근량
	const next7DaysRequirement = jitOrders
		.filter((order) => {
			const requiredDate = new Date(order.requiredDate);
			const today = new Date();
			const diffDays = Math.ceil((requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
			return diffDays >= 0 && diffDays <= 7;
		})
		.reduce((sum, order) => sum + order.requiredQuantity, 0);

	// C. 발주 패키지 자동 생성
	const orderPackages: OrderPackage[] = [
		{
			id: 'PKG-001',
			type: 'bar-mark',
			name: 'Bar Mark 묶음 #1',
			barMarks: ['BM-001', 'BM-002', 'BM-003'],
			quantity: 45.2,
			supplier: '공급사 A',
			distribution: { supplierA: 45.2, supplierB: 0, supplierC: 0 },
		},
		{
			id: 'PKG-002',
			type: 'cut-length',
			name: 'Cut Length 패턴 묶음',
			cutLength: 10.8,
			quantity: 68.5,
			supplier: '공급사 B',
			distribution: { supplierA: 0, supplierB: 68.5, supplierC: 0 },
		},
		{
			id: 'PKG-003',
			type: 'lot',
			name: 'Lot 기반 발주',
			lotNo: 'LOT-2025-001',
			quantity: 125.5,
			supplier: '공급사 C',
			distribution: { supplierA: 40.0, supplierB: 45.5, supplierC: 40.0 },
		},
	];

	// D. 발주 변경 관리
	const orderChanges: OrderChange[] = [
		{
			id: 'CHG-001',
			revision: 'Rev 3.2',
			diameter: 'D25',
			length: 10.8,
			previousQuantity: 120.5,
			newQuantity: 125.5,
			deltaQuantity: 5.0,
			status: 'shortage',
			supplierDiscussion: '2025-03-10: 공급사 A와 협의 완료, 추가 발주 가능',
			changeType: 'modify',
			changeDate: '2025-03-10',
			changeHistory: ['2025-03-10: Rev 3.2 반영, 수량 증가 5.0ton', '2025-03-10: 공급사 협의 완료'],
		},
		{
			id: 'CHG-002',
			revision: 'Rev 2.1',
			diameter: 'D22',
			previousQuantity: 80.5,
			newQuantity: 75.5,
			deltaQuantity: -5.0,
			status: 'excess',
			supplierDiscussion: '2025-03-05: 공급사 B와 협의, 취소 가능 (위약금 없음)',
			changeType: 'modify',
			changeDate: '2025-03-05',
			changeHistory: ['2025-03-05: Rev 2.1 반영, 수량 감소 5.0ton', '2025-03-05: 공급사 협의 완료'],
		},
		{
			id: 'CHG-003',
			revision: 'Rev 3.0',
			diameter: 'D19',
			length: 10.5,
			previousQuantity: 0,
			newQuantity: 22.3,
			deltaQuantity: 22.3,
			status: 'shortage',
			supplierDiscussion: '2025-03-12: 신규 발주, 공급사 C 주문 가능',
			changeType: 'new',
			changeDate: '2025-03-12',
			changeHistory: ['2025-03-12: Rev 3.0 반영, 신규 발주 22.3ton'],
		},
	];

	const formatNumber = (num: number, decimals: number = 1) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">철근 주문 계획</h2>

			{/* A. Special-length 발주 계획(연동) */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. Special-length 발주 계획(연동)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					최적화된 Special-length 별 발주량(ton) · 직경별(D13~D40) 발주 분포 · 제조사별 주문 가능 길이 + 최소 발주 톤수 조건 반영 · 주문 후보안 ① Lap 중심 / ② Coupler 중심 비교
				</p>

				{/* 직경별 발주 분포 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">직경별(D13~D40) 발주 분포</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={diameterDistribution}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="diameter" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '발주량 (ton)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Bar dataKey="quantity" fill="#3b82f6" name="발주량 (ton)" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Special-length 별 발주량 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">최적화된 Special-length 별 발주량</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">길이 (m)</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">발주량 (ton)</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">제조사</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최소 톤수 조건</th>
								</tr>
							</thead>
							<tbody>
								{specialLengthOrders.map((order, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{order.length}m</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{order.diameter}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(order.quantity, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{order.manufacturer}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											{order.meetsMinTonnage ? (
												<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">충족</span>
											) : (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">미충족</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 주문 후보안 비교 */}
				<div>
					<h4 className="text-md font-medium mb-3">주문 후보안 비교</h4>
					<div className="mb-4 flex items-center gap-4">
						<button
							type="button"
							onClick={() => setSelectedCandidate('lap')}
							className={`px-4 py-2 rounded text-sm border transition-colors ${
								selectedCandidate === 'lap'
									? 'bg-blue-500 text-white border-blue-500'
									: 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
							}`}
						>
							① Lap 중심
						</button>
						<button
							type="button"
							onClick={() => setSelectedCandidate('coupler')}
							className={`px-4 py-2 rounded text-sm border transition-colors ${
								selectedCandidate === 'coupler'
									? 'bg-blue-500 text-white border-blue-500'
									: 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
							}`}
						>
							② Coupler 중심
						</button>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">후보안</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 발주량 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비용 (원)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">RCW (%)</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">추천 사항</th>
								</tr>
							</thead>
							<tbody>
								{orderCandidates
									.filter((candidate) => candidate.type === selectedCandidate)
									.map((candidate) => (
										<tr key={candidate.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">
												{candidate.type === 'lap' ? '① Lap 중심' : '② Coupler 중심'}
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{candidate.diameter}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(candidate.totalQuantity, 1)}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{candidate.cost.toLocaleString()}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{candidate.rcw.toFixed(1)}%</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
												{candidate.recommendation}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* B. 공정 기반 JIT(Just-In-Time) 발주 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. 공정 기반 JIT(Just-In-Time) 발주</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					골조 공정계획 Gantt Chart와 연동 · "다음 7일 필요한 철근량 자동 산출" · 주문 지연 발생 시 자동 Alarm
				</p>
				<div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">다음 7일 필요한 철근량</div>
					<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(next7DaysRequirement, 1)} ton</div>
				</div>
				{/* Alarm 표시 */}
				{jitOrders.filter((order) => order.status === 'at-risk' || order.status === 'delayed').length > 0 && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-400 dark:border-red-700">
						<div className="flex items-center gap-2 mb-2">
							<svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span className="font-semibold text-red-800 dark:text-red-200">주문 지연 알림</span>
						</div>
						{jitOrders
							.filter((order) => order.status === 'at-risk' || order.status === 'delayed')
							.map((order) => (
								<div key={order.id} className="text-sm text-red-700 dark:text-red-300 mb-1">
									{order.alarmMessage || `${order.level} ${order.memberType} 철근 발주 지연 예상`}
								</div>
							))}
					</div>
				)}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">부재</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">필요량 (ton)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">필요일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">발주일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">납품일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
							</tr>
						</thead>
						<tbody>
							{jitOrders.map((order) => (
								<tr
									key={order.id}
									className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
										order.status === 'delayed' ? 'bg-red-50 dark:bg-red-900/10' : order.status === 'at-risk' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
									}`}
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{order.level}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{order.memberType}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{order.diameter}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(order.requiredQuantity, 1)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{order.requiredDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{order.orderDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{order.deliveryDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										{order.status === 'delayed' ? (
											<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
												지연 {order.delayDays}일
											</span>
										) : order.status === 'at-risk' ? (
											<span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
												위험 {order.delayDays}일
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

			{/* C. 발주 패키지 자동 생성 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. 발주 패키지 자동 생성</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Bar Mark 단위 묶음 · Cut Length 패턴별 묶음 · Lot 기반 발주량 계산 · 공급사 A/B/C별 발주량 자동 배분
				</p>
				<div className="space-y-4">
					{orderPackages.map((pkg) => (
						<div key={pkg.id} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<div className="flex items-center justify-between mb-3">
								<div>
									<div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">{pkg.name}</div>
									<div className="text-xs text-neutral-600 dark:text-neutral-400">
										{pkg.type === 'bar-mark' && `Bar Marks: ${pkg.barMarks?.join(', ')}`}
										{pkg.type === 'cut-length' && `Cut Length: ${pkg.cutLength}m`}
										{pkg.type === 'lot' && `Lot No: ${pkg.lotNo}`}
									</div>
								</div>
								<div className="text-right">
									<div className="text-sm text-neutral-600 dark:text-neutral-400">총 발주량</div>
									<div className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatNumber(pkg.quantity, 1)} ton</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">공급사 A</div>
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{pkg.distribution.supplierA > 0 ? formatNumber(pkg.distribution.supplierA, 1) + ' ton' : '-'}
									</div>
								</div>
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">공급사 B</div>
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{pkg.distribution.supplierB > 0 ? formatNumber(pkg.distribution.supplierB, 1) + ' ton' : '-'}
									</div>
								</div>
								<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">공급사 C</div>
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{pkg.distribution.supplierC > 0 ? formatNumber(pkg.distribution.supplierC, 1) + ' ton' : '-'}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* D. 발주 변경 관리 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">D. 발주 변경 관리</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Revision 발생 시 · 필요 발주량 변화(ΔQty) · 기발주량 대비 부족/과다 · 공급사와 협의 기록 · 주문 취소/변경 이력 관리
				</p>
				<div className="space-y-4">
					{orderChanges.map((change) => (
						<div key={change.id} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-mono">
										{change.revision}
									</span>
									<span className="font-medium text-neutral-900 dark:text-neutral-100">{change.diameter}</span>
									{change.length && <span className="text-sm text-neutral-600 dark:text-neutral-400">{change.length}m</span>}
									<span
										className={`px-2 py-1 rounded text-xs ${
											change.changeType === 'new'
												? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
												: change.changeType === 'modify'
													? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
													: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
										}`}
									>
										{change.changeType === 'new' ? '신규' : change.changeType === 'modify' ? '변경' : '취소'}
									</span>
								</div>
								<div className="text-xs text-neutral-500 dark:text-neutral-400">{change.changeDate}</div>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
								<div>
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">기발주량</div>
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{formatNumber(change.previousQuantity, 1)} ton</div>
								</div>
								<div>
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">신규 발주량</div>
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{formatNumber(change.newQuantity, 1)} ton</div>
								</div>
								<div>
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">변화량 (ΔQty)</div>
									<div
										className={`text-sm font-medium ${
											change.deltaQuantity > 0
												? 'text-red-600 dark:text-red-400'
												: change.deltaQuantity < 0
													? 'text-blue-600 dark:text-blue-400'
													: 'text-neutral-900 dark:text-neutral-100'
										}`}
									>
										{change.deltaQuantity > 0 ? '+' : ''}
										{formatNumber(change.deltaQuantity, 1)} ton
									</div>
								</div>
								<div>
									<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">기발주량 대비</div>
									<div
										className={`text-sm font-medium ${
											change.status === 'shortage'
												? 'text-red-600 dark:text-red-400'
												: change.status === 'excess'
													? 'text-blue-600 dark:text-blue-400'
													: 'text-green-600 dark:text-green-400'
										}`}
									>
										{change.status === 'shortage' ? '부족' : change.status === 'excess' ? '과다' : '일치'}
									</div>
								</div>
							</div>
							<div className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 mb-2">
								<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">공급사와 협의 기록</div>
								<div className="text-sm text-neutral-700 dark:text-neutral-300">{change.supplierDiscussion}</div>
							</div>
							<div className="text-xs text-neutral-500 dark:text-neutral-400">
								<div className="font-medium mb-1">변경 이력:</div>
								<ul className="list-disc list-inside space-y-1">
									{change.changeHistory.map((history, index) => (
										<li key={index}>{history}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

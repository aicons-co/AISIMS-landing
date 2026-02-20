import { useState } from 'react';

type Manufacturer = {
	id: string;
	name: string;
	availableLengths: number[]; // m 단위, 1cm/10cm 단위
	minTonnage: number; // 최소 출하 톤수
	minLeadTime: number; // 최소 lead time (일)
};

type LengthOptimization = {
	diameter: string;
	totalLength: number; // L_total (m)
	bestCombination: {
		length: number;
		quantity: number; // ton
		waste: number; // 잔재 (m)
	}[];
	rcw: number; // RCW 값
	co2: number; // CO₂ 배출량 (ton-CO₂e)
	cost: number; // 비용 (원)
	optimizationCriteria: 'RCW' | 'CO2' | 'Cost';
};

type ProcurementPlan = {
	id: string;
	diameter: string;
	length: number;
	supplier: string;
	quantity: number; // ton
	orderDate: string;
	leadTime: number; // 일
	deliveryDate: string;
	processDate: string; // 공정표 기반 필요일
	status: 'planned' | 'ordered' | 'delayed';
	delayDays?: number;
};

export function SpecialLengthPlan() {
	const [selectedManufacturer, setSelectedManufacturer] = useState<string>('mfr-001');
	const [newLength, setNewLength] = useState<string>('');
	const [optimizationCriteria, setOptimizationCriteria] = useState<'RCW' | 'CO2' | 'Cost'>('RCW');

	// A. Special-length 후보군 관리
	const manufacturers: Manufacturer[] = [
		{
			id: 'mfr-001',
			name: '제조사 A',
			availableLengths: [10.5, 10.8, 11.0, 11.7, 12.0],
			minTonnage: 5.0,
			minLeadTime: 14,
		},
		{
			id: 'mfr-002',
			name: '제조사 B',
			availableLengths: [10.0, 10.5, 11.0, 11.5, 12.0],
			minTonnage: 3.0,
			minLeadTime: 10,
		},
		{
			id: 'mfr-003',
			name: '제조사 C',
			availableLengths: [10.8, 11.0, 11.2, 11.8, 12.0],
			minTonnage: 4.0,
			minLeadTime: 12,
		},
	];

	const currentManufacturer = manufacturers.find((m) => m.id === selectedManufacturer);

	// 내부 규준
	const internalRules = {
		minLength: 6.0, // 6m 미만 사용 금지
		maxLength: 12.0, // 12m 이상 제한
	};

	// B. Global Length Optimization
	const lengthOptimizations: LengthOptimization[] = [
		{
			diameter: 'D13',
			totalLength: 1250.5,
			bestCombination: [
				{ length: 10.8, quantity: 45.2, waste: 0.6 },
				{ length: 11.0, quantity: 38.5, waste: 0.4 },
				{ length: 10.5, quantity: 22.3, waste: 0.3 },
			],
			rcw: 1.3,
			co2: 125.5,
			cost: 30962500,
			optimizationCriteria: 'RCW',
		},
		{
			diameter: 'D16',
			totalLength: 1850.8,
			bestCombination: [
				{ length: 11.0, quantity: 68.5, waste: 0.5 },
				{ length: 10.8, quantity: 55.2, waste: 0.6 },
				{ length: 11.7, quantity: 42.3, waste: 0.3 },
			],
			rcw: 1.4,
			co2: 185.8,
			cost: 126765000,
			optimizationCriteria: 'Cost',
		},
		{
			diameter: 'D19',
			totalLength: 980.2,
			bestCombination: [
				{ length: 10.8, quantity: 35.5, waste: 0.6 },
				{ length: 11.0, quantity: 28.2, waste: 0.4 },
			],
			rcw: 1.0,
			co2: 98.2,
			cost: 78560000,
			optimizationCriteria: 'CO2',
		},
		{
			diameter: 'D22',
			totalLength: 750.5,
			bestCombination: [
				{ length: 11.0, quantity: 28.5, waste: 0.5 },
				{ length: 10.8, quantity: 22.3, waste: 0.6 },
			],
			rcw: 1.1,
			co2: 75.5,
			cost: 19513000,
			optimizationCriteria: 'RCW',
		},
		{
			diameter: 'D25',
			totalLength: 650.3,
			bestCombination: [
				{ length: 11.7, quantity: 25.2, waste: 0.3 },
				{ length: 11.0, quantity: 18.5, waste: 0.5 },
			],
			rcw: 0.8,
			co2: 65.3,
			cost: 17258250,
			optimizationCriteria: 'RCW',
		},
	];

	// C. 발주계획(Procurement Plan)
	const procurementPlans: ProcurementPlan[] = [
		{
			id: 'PP-001',
			diameter: 'D13',
			length: 10.8,
			supplier: '공급사 A',
			quantity: 45.2,
			orderDate: '2025-03-01',
			leadTime: 14,
			deliveryDate: '2025-03-15',
			processDate: '2025-03-18',
			status: 'planned',
		},
		{
			id: 'PP-002',
			diameter: 'D16',
			length: 11.0,
			supplier: '공급사 B',
			quantity: 68.5,
			orderDate: '2025-03-05',
			leadTime: 10,
			deliveryDate: '2025-03-15',
			processDate: '2025-03-20',
			status: 'ordered',
		},
		{
			id: 'PP-003',
			diameter: 'D19',
			length: 10.8,
			supplier: '공급사 C',
			quantity: 35.5,
			orderDate: '2025-03-10',
			leadTime: 12,
			deliveryDate: '2025-03-22',
			processDate: '2025-03-25',
			status: 'delayed',
			delayDays: 3,
		},
		{
			id: 'PP-004',
			diameter: 'D22',
			length: 11.0,
			supplier: '공급사 A',
			quantity: 28.5,
			orderDate: '2025-03-12',
			leadTime: 14,
			deliveryDate: '2025-03-26',
			processDate: '2025-03-28',
			status: 'planned',
		},
	];

	const handleAddLength = () => {
		const length = parseFloat(newLength);
		if (isNaN(length)) {
			alert('올바른 길이를 입력하세요.');
			return;
		}
		if (length < internalRules.minLength) {
			alert(`6m 미만은 사용할 수 없습니다. (입력: ${length}m)`);
			return;
		}
		if (length > internalRules.maxLength) {
			alert(`12m 이상은 제한됩니다. (입력: ${length}m)`);
			return;
		}
		// 실제로는 제조사에 길이 추가
		console.log(`Adding length ${length}m to manufacturer ${selectedManufacturer}`);
		setNewLength('');
		alert(`${length}m 길이가 추가되었습니다.`);
	};

	const formatNumber = (num: number, decimals: number = 2) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">Special-length 계획</h2>

			{/* A. Special-length 후보군 관리 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. Special-length 후보군 관리 (Length Set Selection)</h3>
				<div className="space-y-4">
					{/* 제조사 선택 */}
					<div>
						<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">제조사 선택</label>
						<select
							value={selectedManufacturer}
							onChange={(e) => setSelectedManufacturer(e.target.value)}
							className="w-full md:w-auto px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
						>
							{manufacturers.map((mfr) => (
								<option key={mfr.id} value={mfr.id}>
									{mfr.name}
								</option>
							))}
						</select>
					</div>

					{/* 제조사별 주문 가능 길이 */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
								제조사별 주문 가능 길이 (1cm/10cm 단위 검토)
							</label>
							<div className="flex items-center gap-2">
								<input
									type="number"
									step="0.1"
									min={internalRules.minLength}
									max={internalRules.maxLength}
									value={newLength}
									onChange={(e) => setNewLength(e.target.value)}
									placeholder="예: 10.5"
									className="px-3 py-1.5 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm w-32"
								/>
								<button
									type="button"
									onClick={handleAddLength}
									className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
								>
									추가
								</button>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{currentManufacturer?.availableLengths.map((length, index) => (
								<span
									key={index}
									className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-700 dark:text-blue-300"
								>
									{length}m
								</span>
							))}
						</div>
					</div>

					{/* 내부 규준 */}
					<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
						<div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">내부 규준에 따른 사용 제한</div>
						<ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
							<li>6m 미만 사용 금지</li>
							<li>12m 이상 제한</li>
						</ul>
					</div>

					{/* 제조사별 제약 조건 */}
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">제조사</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최소 출하 톤수</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최소 Lead Time (일)</th>
								</tr>
							</thead>
							<tbody>
								{manufacturers.map((mfr) => (
									<tr key={mfr.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{mfr.name}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{mfr.minTonnage.toFixed(1)} ton</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{mfr.minLeadTime} 일</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* B. Global Length Optimization */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. Global Length Optimization</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					각 Diameter(D13~D35)별 전체 건물 철근을 대상으로 · L_total(전체 철근 길이) 계산 · best length 분할 조합 선정 · 각 길이별 수요량 산정 (ton 단위) · RCW 최소화 조건 · CO₂ 최소화 조건 · 비용 최소화 조건
				</p>
				<div className="mb-4 flex items-center gap-4">
					<label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">최적화 기준:</label>
					<select
						value={optimizationCriteria}
						onChange={(e) => setOptimizationCriteria(e.target.value as 'RCW' | 'CO2' | 'Cost')}
						className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
					>
						<option value="RCW">RCW 최소화</option>
						<option value="CO2">CO₂ 최소화</option>
						<option value="Cost">비용 최소화</option>
					</select>
				</div>
				<div className="space-y-4">
					{lengthOptimizations.map((opt, index) => (
						<div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<span className="px-3 py-1 rounded font-mono text-lg font-bold bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
										{opt.diameter}
									</span>
									<span className="text-sm text-neutral-600 dark:text-neutral-400">
										L_total: <span className="font-medium text-neutral-900 dark:text-neutral-100">{formatNumber(opt.totalLength, 1)}m</span>
									</span>
									<span
										className={`px-2 py-1 rounded text-xs ${
											opt.optimizationCriteria === 'RCW'
												? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
												: opt.optimizationCriteria === 'CO2'
													? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
													: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
										}`}
									>
										{opt.optimizationCriteria === 'RCW' ? 'RCW 최소화' : opt.optimizationCriteria === 'CO2' ? 'CO₂ 최소화' : '비용 최소화'}
									</span>
								</div>
								<div className="text-xs text-neutral-500 dark:text-neutral-400">
									RCW: {opt.rcw.toFixed(1)}% · CO₂: {formatNumber(opt.co2, 1)} ton-CO₂e · 비용: {opt.cost.toLocaleString()}원
								</div>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm">
									<thead>
										<tr className="bg-neutral-100 dark:bg-neutral-800">
											<th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">길이 (m)</th>
											<th className="text-right p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">수요량 (ton)</th>
											<th className="text-right p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">잔재 (m)</th>
											<th className="text-left p-2 border border-neutral-300 dark:border-neutral-700 font-semibold">분할 조합</th>
										</tr>
									</thead>
									<tbody>
										{opt.bestCombination.map((combo, comboIndex) => (
											<tr key={comboIndex} className="hover:bg-neutral-100 dark:hover:bg-neutral-800/50">
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 font-medium">{combo.length}m</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(combo.quantity, 3)}</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-right">{combo.waste.toFixed(1)}m</td>
												<td className="p-2 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
													{combo.length}m × {Math.ceil(combo.quantity / (combo.length * 0.00617))}본
													{comboIndex < opt.bestCombination.length - 1 && ' + '}
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

			{/* C. 발주계획(Procurement Plan) 자동 생성 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. 발주계획(Procurement Plan) 자동 생성: 공정표 연동</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					공급사 A/B/C 별 발주물량 배분 · 발주 리드타임 설정 · "공정표 기반 JIT(Just-In-Time)" 배치 · 발주 지연 시 Alarm 표시
				</p>
				{/* Delay Alarm */}
				{procurementPlans.filter((p) => p.status === 'delayed').length > 0 && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded border-2 border-red-400 dark:border-red-700">
						<div className="flex items-center gap-2 mb-2">
							<svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span className="font-semibold text-red-800 dark:text-red-200">발주 지연 알림</span>
						</div>
						<div className="text-sm text-red-700 dark:text-red-300">
							{procurementPlans.filter((p) => p.status === 'delayed').length}건의 발주가 지연되었습니다.
						</div>
					</div>
				)}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diameter</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">길이 (m)</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">공급사</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">물량 (ton)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">발주일</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Lead Time (일)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">납품일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">공정 필요일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
							</tr>
						</thead>
						<tbody>
							{procurementPlans.map((plan) => (
								<tr
									key={plan.id}
									className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
										plan.status === 'delayed' ? 'bg-red-50 dark:bg-red-900/10' : ''
									}`}
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{plan.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono">{plan.diameter}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{plan.length}m</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{plan.supplier}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(plan.quantity, 3)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{plan.orderDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{plan.leadTime} 일</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{plan.deliveryDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											JIT: {plan.processDate}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										{plan.status === 'delayed' ? (
											<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium">
												지연 {plan.delayDays}일
											</span>
										) : plan.status === 'ordered' ? (
											<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
												발주완료
											</span>
										) : (
											<span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
												계획
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
					<div className="text-sm text-blue-800 dark:text-blue-200">
						<strong>JIT (Just-In-Time) 배치:</strong> 공정표 기반으로 필요한 시점에 맞춰 자동으로 발주 일정을 조정합니다.
					</div>
				</div>
			</div>
		</section>
	);
}

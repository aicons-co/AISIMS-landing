import { useState } from 'react';

type ResourceType = 'rebar' | 'concrete' | 'formwork' | 'steel' | 'other';

type ResourceItem = {
	id: string;
	name: string;
	unit: string;
	quantity: number;
	unitPrice: number;
	totalAmount: number;
	calculationBasis?: string;
};

type LevelCost = {
	level: string;
	concrete: { quantity: number; amount: number };
	rebar: { quantity: number; amount: number };
	formwork: { quantity: number; amount: number };
	steel: { quantity: number; amount: number };
	other: { quantity: number; amount: number };
	totalAmount: number;
	zone?: string;
};

type ZoneCost = {
	zone: string;
	concrete: { quantity: number; amount: number };
	rebar: { quantity: number; amount: number };
	formwork: { quantity: number; amount: number };
	steel: { quantity: number; amount: number };
	totalAmount: number;
};

type RevisionChange = {
	revision: string;
	resourceType: ResourceType;
	itemName: string;
	beforeQuantity: number;
	afterQuantity: number;
	beforeAmount: number;
	afterAmount: number;
	costDelta: number;
};

type DelayAlarm = {
	type: 'order' | 'process';
	description: string;
	severity: 'high' | 'medium' | 'low';
	date: string;
	status: 'active' | 'resolved';
};

export function Specification() {
	const [selectedResource, setSelectedResource] = useState<ResourceType>('rebar');

	// ① 자원별 내역
	const resourceItems: Record<ResourceType, ResourceItem[]> = {
		rebar: [
			{
				id: 'RB-001',
				name: 'D25 철근',
				unit: 'ton',
				quantity: 125.850,
				unitPrice: 850000,
				totalAmount: 106972500,
				calculationBasis: 'n_bars: 1,250 × 길이: 8.5m × 단면적: 0.00491m² × 밀도: 7,850kg/m³',
			},
			{
				id: 'RB-002',
				name: 'D22 철근',
				unit: 'ton',
				quantity: 98.420,
				unitPrice: 820000,
				totalAmount: 80704400,
				calculationBasis: 'n_bars: 980 × 길이: 7.2m × 단면적: 0.00380m² × 밀도: 7,850kg/m³',
			},
			{
				id: 'RB-003',
				name: 'D19 철근',
				unit: 'ton',
				quantity: 75.320,
				unitPrice: 800000,
				totalAmount: 60256000,
				calculationBasis: 'n_bars: 1,200 × 길이: 6.0m × 단면적: 0.00284m² × 밀도: 7,850kg/m³',
			},
		],
		concrete: [
			{
				id: 'CON-001',
				name: 'fck 24 콘크리트',
				unit: 'm³',
				quantity: 1250.500,
				unitPrice: 85000,
				totalAmount: 106292500,
				calculationBasis: 'BIM 모델 기반 Volume: 1,250.5 m³',
			},
			{
				id: 'CON-002',
				name: 'fck 30 콘크리트',
				unit: 'm³',
				quantity: 850.300,
				unitPrice: 95000,
				totalAmount: 80778500,
				calculationBasis: 'BIM 모델 기반 Volume: 850.3 m³',
			},
		],
		formwork: [
			{
				id: 'FW-001',
				name: '슬래브 거푸집',
				unit: 'm²',
				quantity: 2850.500,
				unitPrice: 12000,
				totalAmount: 34206000,
				calculationBasis: '슬래브 form area 자동 산출: 2,850.5 m²',
			},
			{
				id: 'FW-002',
				name: '벽 거푸집',
				unit: 'm²',
				quantity: 1850.200,
				unitPrice: 15000,
				totalAmount: 27753000,
				calculationBasis: '벽 form area 자동 산출: 1,850.2 m²',
			},
			{
				id: 'FW-003',
				name: '기둥 거푸집',
				unit: 'm²',
				quantity: 1250.800,
				unitPrice: 18000,
				totalAmount: 22514400,
				calculationBasis: '기둥 form area 자동 산출: 1,250.8 m²',
			},
			{
				id: 'FW-004',
				name: '보 거푸집',
				unit: 'm²',
				quantity: 980.400,
				unitPrice: 16000,
				totalAmount: 15686400,
				calculationBasis: '보 form area 자동 산출: 980.4 m²',
			},
		],
		steel: [
			{
				id: 'ST-001',
				name: 'H-400×400×13×21',
				unit: 'ton',
				quantity: 125.500,
				unitPrice: 1200000,
				totalAmount: 150600000,
				calculationBasis: '단면별 톤수: 125.5 ton',
			},
			{
				id: 'ST-002',
				name: 'H-350×350×12×19',
				unit: 'ton',
				quantity: 85.300,
				unitPrice: 1150000,
				totalAmount: 98095000,
				calculationBasis: '단면별 톤수: 85.3 ton',
			},
		],
		other: [
			{
				id: 'OT-001',
				name: 'Coupler',
				unit: '개',
				quantity: 12500,
				unitPrice: 8500,
				totalAmount: 106250000,
			},
			{
				id: 'OT-002',
				name: 'Anchor',
				unit: '개',
				quantity: 8500,
				unitPrice: 12000,
				totalAmount: 102000000,
			},
		],
	};

	// ② 건물별/층별/Zone별 내역
	const levelCosts: LevelCost[] = [
		{
			level: 'B2',
			concrete: { quantity: 125.500, amount: 10667500 },
			rebar: { quantity: 12.850, amount: 10922500 },
			formwork: { quantity: 285.500, amount: 3426000 },
			steel: { quantity: 12.500, amount: 15000000 },
			other: { quantity: 1250, amount: 10625000 },
			totalAmount: 50241000,
			zone: 'Core Zone',
		},
		{
			level: 'B1',
			concrete: { quantity: 118.300, amount: 10055500 },
			rebar: { quantity: 11.920, amount: 10132000 },
			formwork: { quantity: 268.300, amount: 3219600 },
			steel: { quantity: 11.800, amount: 14160000 },
			other: { quantity: 1180, amount: 10030000 },
			totalAmount: 47588100,
			zone: 'Core Zone',
		},
		{
			level: '1F',
			concrete: { quantity: 145.800, amount: 12393000 },
			rebar: { quantity: 15.250, amount: 12962500 },
			formwork: { quantity: 325.800, amount: 3909600 },
			steel: { quantity: 14.500, amount: 17400000 },
			other: { quantity: 1450, amount: 12325000 },
			totalAmount: 56081100,
			zone: 'Tower Zone',
		},
		{
			level: '2F',
			concrete: { quantity: 132.500, amount: 11262500 },
			rebar: { quantity: 13.850, amount: 11772500 },
			formwork: { quantity: 295.500, amount: 3546000 },
			steel: { quantity: 13.200, amount: 15840000 },
			other: { quantity: 1320, amount: 11220000 },
			totalAmount: 53986500,
			zone: 'Tower Zone',
		},
		{
			level: '3F',
			concrete: { quantity: 128.900, amount: 10956500 },
			rebar: { quantity: 13.420, amount: 11407000 },
			formwork: { quantity: 287.900, amount: 3454800 },
			steel: { quantity: 12.800, amount: 15360000 },
			other: { quantity: 1280, amount: 10880000 },
			totalAmount: 52058300,
			zone: 'Tower Zone',
		},
		{
			level: 'RF',
			concrete: { quantity: 95.200, amount: 8092000 },
			rebar: { quantity: 9.850, amount: 8372500 },
			formwork: { quantity: 212.500, amount: 2550000 },
			steel: { quantity: 9.500, amount: 11400000 },
			other: { quantity: 950, amount: 8075000 },
			totalAmount: 38447500,
			zone: 'Tower Zone',
		},
	];

	const zoneCosts: ZoneCost[] = [
		{
			zone: 'Core Zone',
			concrete: { quantity: 243.800, amount: 20723000 },
			rebar: { quantity: 24.770, amount: 21054500 },
			formwork: { quantity: 553.800, amount: 6645600 },
			steel: { quantity: 24.300, amount: 29160000 },
			totalAmount: 77583100,
		},
		{
			zone: 'Tower Zone',
			concrete: { quantity: 502.400, amount: 42704000 },
			rebar: { quantity: 52.370, amount: 44514500 },
			formwork: { quantity: 1121.700, amount: 13460400 },
			steel: { quantity: 50.000, amount: 60000000 },
			totalAmount: 160778900,
		},
	];

	// ③ Revision 반영 자동내역
	const revisionChanges: RevisionChange[] = [
		{
			revision: 'Rev 3.2',
			resourceType: 'rebar',
			itemName: 'D25 철근',
			beforeQuantity: 120.500,
			afterQuantity: 125.850,
			beforeAmount: 102425000,
			afterAmount: 106972500,
			costDelta: 4547500,
		},
		{
			revision: 'Rev 3.2',
			resourceType: 'concrete',
			itemName: 'fck 24 콘크리트',
			beforeQuantity: 1240.200,
			afterQuantity: 1250.500,
			beforeAmount: 105417000,
			afterAmount: 106292500,
			costDelta: 875500,
		},
		{
			revision: 'Rev 2.1',
			resourceType: 'formwork',
			itemName: '슬래브 거푸집',
			beforeQuantity: 2800.000,
			afterQuantity: 2850.500,
			beforeAmount: 33600000,
			afterAmount: 34206000,
			costDelta: 606000,
		},
	];

	// ④ Delay Alarm 연동
	const delayAlarms: DelayAlarm[] = [
		{
			type: 'order',
			description: '발주 지연 → 내역서 차질: D25 철근 발주 예정일 2025-03-02, 현재 미발주',
			severity: 'high',
			date: '2025-03-05',
			status: 'active',
		},
		{
			type: 'process',
			description: '공정 지연 → 기성 반영 지연: 3F 콘크리트 타설 지연으로 기성 반영 불가',
			severity: 'medium',
			date: '2025-03-10',
			status: 'active',
		},
		{
			type: 'order',
			description: '발주 지연 → 내역서 차질: 거푸집 자재 발주 지연',
			severity: 'medium',
			date: '2025-03-08',
			status: 'resolved',
		},
	];

	const formatNumber = (num: number, decimals: number = 0) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const getResourceLabel = (type: ResourceType) => {
		switch (type) {
			case 'rebar':
				return '철근';
			case 'concrete':
				return '콘크리트';
			case 'formwork':
				return '거푸집';
			case 'steel':
				return '철골';
			case 'other':
				return '기타';
		}
	};

	const handleDownload = (format: 'Excel' | 'PDF' | 'CSV') => {
		console.log(`Downloading as ${format}`);
		alert(`${format} 형식으로 다운로드합니다.`);
	};

	const currentResourceItems = resourceItems[selectedResource];
	const totalAmount = currentResourceItems.reduce((sum, item) => sum + item.totalAmount, 0);

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">내역서</h2>

			{/* ① 자원별 내역 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">① 자원별 내역 (Rebar/Concrete/Formwork/Steel/...)</h3>
				<div className="mb-4 flex flex-wrap gap-2">
					{(['rebar', 'concrete', 'formwork', 'steel', 'other'] as ResourceType[]).map((type) => (
						<button
							key={type}
							type="button"
							onClick={() => setSelectedResource(type)}
							className={`px-4 py-2 rounded text-sm border transition-colors ${
								selectedResource === type
									? 'bg-blue-500 text-white border-blue-500'
									: 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-600'
							}`}
						>
							{getResourceLabel(type)}
						</button>
					))}
				</div>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">항목 ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">항목명</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">수량</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">단가 (원)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액 (원)</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">산출 근거</th>
							</tr>
						</thead>
						<tbody>
							{currentResourceItems.map((item) => (
								<tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{item.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{item.name}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{formatNumber(item.quantity, 3)} {item.unit}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{item.unitPrice.toLocaleString()}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">
										{item.totalAmount.toLocaleString()}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
										{item.calculationBasis || '-'}
									</td>
								</tr>
							))}
							<tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
								<td colSpan={4} className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
									합계
								</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
									{totalAmount.toLocaleString()} 원
								</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* ② 건물별/층별/Zone별 내역 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">② 건물별/층별/Zone별 내역</h3>
				<div className="mb-4">
					<h4 className="text-md font-medium mb-3">층별 비용 (B1~RF)</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Zone</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">콘크리트 (m³)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">거푸집 (m²)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철골 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기타 (개)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 금액 (원)</th>
								</tr>
							</thead>
							<tbody>
								{levelCosts.map((level, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{level.level}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{level.zone || '-'}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(level.concrete.quantity, 3)} m³
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(level.rebar.quantity, 3)} ton
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(level.formwork.quantity, 2)} m²
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(level.steel.quantity, 3)} ton
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{level.other.quantity.toLocaleString()} 개
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">
											{level.totalAmount.toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="mt-6">
					<h4 className="text-md font-medium mb-3">Zone별 비교 (Core Zone / Tower Zone)</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Zone</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">콘크리트 (m³)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">거푸집 (m²)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철골 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 금액 (원)</th>
								</tr>
							</thead>
							<tbody>
								{zoneCosts.map((zone, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{zone.zone}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(zone.concrete.quantity, 3)} m³
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(zone.rebar.quantity, 3)} ton
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(zone.formwork.quantity, 2)} m²
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{formatNumber(zone.steel.quantity, 3)} ton
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">
											{zone.totalAmount.toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* ③ Revision 반영 자동내역 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">③ Revision 반영 자동내역</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Revision</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">자원</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">항목명</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 전 수량</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 후 수량</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 전 금액 (원)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 후 금액 (원)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Cost Delta (원)</th>
							</tr>
						</thead>
						<tbody>
							{revisionChanges.map((change, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{change.revision}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{getResourceLabel(change.resourceType)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{change.itemName}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{formatNumber(change.beforeQuantity, 3)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{formatNumber(change.afterQuantity, 3)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{change.beforeAmount.toLocaleString()}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
										{change.afterAmount.toLocaleString()}
									</td>
									<td
										className={`p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium ${
											change.costDelta > 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
										}`}
									>
										{change.costDelta > 0 ? '+' : ''}
										{change.costDelta.toLocaleString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* ④ Delay Alarm 연동 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">④ Delay Alarm 연동</h3>
				<div className="space-y-3">
					{delayAlarms.map((alarm, index) => (
						<div
							key={index}
							className={`p-4 rounded-lg border-2 ${
								alarm.severity === 'high'
									? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700'
									: alarm.severity === 'medium'
										? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-700'
										: 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-700'
							}`}
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												alarm.type === 'order'
													? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
													: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
											}`}
										>
											{alarm.type === 'order' ? '발주 지연' : '공정 지연'}
										</span>
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												alarm.severity === 'high'
													? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
													: alarm.severity === 'medium'
														? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
														: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
											}`}
										>
											{alarm.severity === 'high' ? '높음' : alarm.severity === 'medium' ? '중간' : '낮음'}
										</span>
										{alarm.status === 'resolved' && (
											<span className="px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
												해결됨
											</span>
										)}
									</div>
									<p className="text-sm text-neutral-700 dark:text-neutral-300">{alarm.description}</p>
									<p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">일시: {alarm.date}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ⑤ 다운로드 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">⑤ 다운로드</h3>
				<div className="flex flex-wrap gap-3">
					<button
						type="button"
						onClick={() => handleDownload('Excel')}
						className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Excel BOQ 템플릿
					</button>
					<button
						type="button"
						onClick={() => handleDownload('PDF')}
						className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						PDF 발주용 내역서
					</button>
					<button
						type="button"
						onClick={() => handleDownload('CSV')}
						className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						ERP 연동 CSV
					</button>
				</div>
			</div>
		</section>
	);
}

import { useState } from 'react';

type TabType = 'concrete' | 'rebar' | 'steel' | 'formwork' | 'other';

type MemberQuantity = {
	memberId: string;
	concrete?: number;
	rebar?: number;
	coupler?: number;
	formwork?: number;
	steel?: number;
	other?: { name: string; quantity: number };
};

type LevelQuantity = {
	level: string;
	concrete?: number;
	rebar?: number;
	zone?: string;
	castingSequence?: string;
};

type ProcessQuantity = {
	item: string;
	totalQuantity: number;
	installedQuantity: number;
	progress: number;
	status: '정상' | '지체' | '부족';
	alarm?: string;
};

type OrderStatus = {
	stage: string;
	planned: string;
	actual: string;
	status: '완료' | '지체' | '진행중' | '예정';
};

type RevisionQuantity = {
	revision: string;
	concrete?: number;
	rebar?: number;
	coupler?: number;
	formwork?: number;
	steel?: number;
	other?: number;
	amount?: number;
};


// 공통 물량 정보 컴포넌트
function QuantityContent({ tabType }: { tabType: TabType }) {
	// 1) 부재별 물량 (BIM 기반 산출)
	const memberQuantities: MemberQuantity[] = [
		{
			memberId: 'C-001',
			concrete: 1.296,
			rebar: 0.125,
			coupler: 8,
			formwork: 14.4,
			steel: 0,
			other: { name: 'Anchor', quantity: 4 },
		},
		{
			memberId: 'B-012',
			concrete: 0.756,
			rebar: 0.085,
			coupler: 6,
			formwork: 8.4,
			steel: 0,
		},
		{
			memberId: 'S-201',
			concrete: 0.972,
			rebar: 0.065,
			formwork: 5.4,
		},
		{
			memberId: 'W-031',
			concrete: 2.160,
			rebar: 0.145,
			formwork: 12.0,
		},
		{
			memberId: 'F-005',
			concrete: 2.000,
			rebar: 0.180,
			coupler: 12,
			formwork: 8.0,
		},
	];

	// 2) 층별 물량 Summary
	const levelQuantities: LevelQuantity[] = [
		{ level: 'B2', concrete: 125.500, rebar: 12.850, zone: 'Zone-A', castingSequence: 'Seq-1' },
		{ level: 'B1', concrete: 118.300, rebar: 11.920, zone: 'Zone-A', castingSequence: 'Seq-1' },
		{ level: '1F', concrete: 145.800, rebar: 15.250, zone: 'Zone-B', castingSequence: 'Seq-2' },
		{ level: '2F', concrete: 132.500, rebar: 13.850, zone: 'Zone-B', castingSequence: 'Seq-2' },
		{ level: '3F', concrete: 128.900, rebar: 13.420, zone: 'Zone-C', castingSequence: 'Seq-3' },
	];

	// 3) 공정 기반 물량
	const processQuantities: ProcessQuantity[] = [
		{
			item: '설치 진행률',
			totalQuantity: 100,
			installedQuantity: 65,
			progress: 65,
			status: '정상',
		},
		{
			item: '철근 설치량',
			totalQuantity: 125.500,
			installedQuantity: 81.575,
			progress: 65,
			status: '정상',
		},
		{
			item: '콘크리트 타설량',
			totalQuantity: 1250.000,
			installedQuantity: 812.500,
			progress: 65,
			status: '정상',
		},
		{
			item: '철골 설치량',
			totalQuantity: 45.250,
			installedQuantity: 22.625,
			progress: 50,
			status: '지체',
			alarm: '공정표 대비 지체: 15%',
		},
		{
			item: '거푸집 준비',
			totalQuantity: 8500.00,
			installedQuantity: 5100.00,
			progress: 60,
			status: '부족',
			alarm: '거푸집 준비 부족: 3,400 m²',
		},
	];

	// 4) 발주 연동(SCM)
	const orderStatuses: OrderStatus[] = [
		{ stage: '주문', planned: '2026-03-02', actual: '2026-03-02', status: '완료' },
		{ stage: '공장납품', planned: '2026-03-07', actual: '2026-03-10', status: '지체' },
		{ stage: '가공', planned: '2026-03-10', actual: '-', status: '진행중' },
		{ stage: '현장납품', planned: '2026-03-15', actual: '-', status: '예정' },
		{ stage: '설치', planned: '2026-03-20', actual: '-', status: '예정' },
	];

	// 5) Revision 연동
	const revisionQuantities: RevisionQuantity[] = [
		{ revision: '원안', concrete: 1200.000, rebar: 120.500, coupler: 850, formwork: 8000.00, steel: 40.000, amount: 1250000000 },
		{ revision: 'Rev 1.0', concrete: 1225.500, rebar: 123.850, coupler: 880, formwork: 8200.00, steel: 42.500, amount: 1285000000 },
		{ revision: 'Rev 2.0', concrete: 1250.000, rebar: 125.500, coupler: 900, formwork: 8500.00, steel: 45.250, amount: 1320000000 },
		{ revision: 'Rev 2.1', concrete: 1255.300, rebar: 126.200, coupler: 910, formwork: 8550.00, steel: 45.500, amount: 1332000000 },
		{ revision: 'Rev 2.2', concrete: 1260.500, rebar: 127.000, coupler: 920, formwork: 8600.00, steel: 46.000, amount: 1345000000 },
	];

	const formatNumber = (value: number | undefined, decimals: number = 3): string => {
		if (value === undefined) return '-';
		return value.toFixed(decimals);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case '완료':
			case '정상':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700';
			case '지체':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700';
			case '진행중':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700';
			case '부족':
				return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700';
			default:
				return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700';
		}
	};

	// 탭별 데이터 필터링
	const getTabData = () => {
		switch (tabType) {
			case 'concrete':
				return {
					unit: 'm³',
					decimals: 3,
					memberColumns: ['Member ID', '콘크리트(m³)'],
					levelColumns: ['Level/층', '콘크리트(m³)', 'Zone', 'Casting Sequence'],
				};
			case 'rebar':
				return {
					unit: 'ton',
					decimals: 3,
					memberColumns: ['Member ID', '철근(ton)'],
					levelColumns: ['Level/층', '철근(ton)', 'Zone', 'Casting Sequence'],
				};
			case 'steel':
				return {
					unit: 'ton',
					decimals: 3,
					memberColumns: ['Member ID', '철골(ton)'],
					levelColumns: ['Level/층', '철골(ton)', 'Zone', 'Casting Sequence'],
				};
			case 'formwork':
				return {
					unit: 'm²',
					decimals: 2,
					memberColumns: ['Member ID', '거푸집(m²)'],
					levelColumns: ['Level/층', '거푸집(m²)', 'Zone', 'Casting Sequence'],
				};
			case 'other':
				return {
					unit: 'ea',
					decimals: 0,
					memberColumns: ['Member ID', '기타(개)'],
					levelColumns: ['Level/층', '기타(개)', 'Zone', 'Casting Sequence'],
				};
		}
	};

	const tabData = getTabData();

	return (
		<div className="space-y-8">
			{/* 1) 부재별 물량 (BIM 기반 산출) */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">1) 부재별 물량 (BIM 기반 산출)</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								{tabData.memberColumns.map((col, idx) => (
									<th key={idx} className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
										{col}
									</th>
								))}
								{tabType === 'concrete' && (
									<>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근(ton)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">커플러(개)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">거푸집(m²)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철골(kg)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기타</th>
									</>
								)}
							</tr>
						</thead>
						<tbody>
							{memberQuantities.map((member, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{member.memberId}</td>
									{tabType === 'concrete' && (
										<>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(member.concrete, 3)} m³
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(member.rebar, 3)} ton
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{member.coupler || '-'} 개
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(member.formwork, 2)} m²
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(member.steel, 3)} kg
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{member.other ? `${member.other.name}: ${member.other.quantity}개` : '-'}
											</td>
										</>
									)}
									{tabType === 'rebar' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{formatNumber(member.rebar, 3)} ton
										</td>
									)}
									{tabType === 'steel' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{formatNumber(member.steel, 3)} ton
										</td>
									)}
									{tabType === 'formwork' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{formatNumber(member.formwork, 2)} m²
										</td>
									)}
									{tabType === 'other' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{member.other ? `${member.other.name}: ${member.other.quantity}개` : '-'}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* 2) 층별 물량 Summary */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">2) 층별 물량 Summary</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Level/층별 소요량 및 Casting Sequence 연동: Zone별 물량 표기
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level/층</th>
								{tabType === 'concrete' && (
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">콘크리트(m³)</th>
								)}
								{tabType === 'rebar' && (
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근(ton)</th>
								)}
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Zone</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Casting Sequence</th>
							</tr>
						</thead>
						<tbody>
							{levelQuantities.map((level, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{level.level}</td>
									{tabType === 'concrete' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{formatNumber(level.concrete, 3)} m³
										</td>
									)}
									{tabType === 'rebar' && (
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{formatNumber(level.rebar, 3)} ton
										</td>
									)}
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{level.zone}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{level.castingSequence}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* 3) 공정 기반 물량(기성 연동) */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">3) 공정 기반 물량(기성 연동)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					공정표-내역서-BIM 연동 및 Delay Alarm: 공정표와 연동
				</p>
				<div className="space-y-4">
					{processQuantities.map((process, index) => (
						<div
							key={index}
							className={`p-4 rounded-lg border ${
								process.status === '지체' || process.status === '부족'
									? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
									: 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
							}`}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="font-medium text-neutral-900 dark:text-neutral-100">{process.item}</span>
								<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(process.status)}`}>
									{process.status}
								</span>
							</div>
							<div className="flex items-center gap-4 text-sm">
								<span className="text-neutral-600 dark:text-neutral-400">
									총 물량: {formatNumber(process.totalQuantity, tabData.decimals)} {tabData.unit}
								</span>
								<span className="text-neutral-600 dark:text-neutral-400">
									설치량: {formatNumber(process.installedQuantity, tabData.decimals)} {tabData.unit}
								</span>
								<span className="text-neutral-600 dark:text-neutral-400">진행률: {process.progress}%</span>
								{process.alarm && (
									<span className="text-red-600 dark:text-red-400 font-medium">⚠ {process.alarm}</span>
								)}
							</div>
							<div className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
								<div
									className={`h-2 rounded-full ${
										process.status === '지체' || process.status === '부족'
											? 'bg-red-500'
											: process.progress >= 80
												? 'bg-green-500'
												: 'bg-blue-500'
									}`}
									style={{ width: `${process.progress}%` }}
								></div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 4) 발주 연동(SCM) */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">4) 발주 연동(SCM)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Special-length 철근 주문량 및 철근 주문·가공·납품·설치 기준 물량 대비 현황: 공정표-SCM 연동
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">예정</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">실시</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">현황</th>
							</tr>
						</thead>
						<tbody>
							{orderStatuses.map((order, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{order.stage}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{order.planned}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{order.actual || '-'}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">
										<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* 5) Revision 연동 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">5) Revision 연동</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Revision 전후 물량 비교: Revision별 물량 변화표 표기
				</p>
				{tabType === 'concrete' ? (
					<>
						{/* 전체 물량 비교표 */}
						<div className="mb-6 overflow-x-auto">
							<table className="w-full border-collapse text-sm">
								<thead>
									<tr className="bg-neutral-100 dark:bg-neutral-800">
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">콘크리트(m³)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근(ton)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">커플러(개)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">거푸집(m²)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철골(kg)</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기타</th>
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액(원)</th>
									</tr>
								</thead>
								<tbody>
									{revisionQuantities.map((rev, index) => (
										<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{rev.revision}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(rev.concrete, 3)} m³
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(rev.rebar, 3)} ton
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">{rev.coupler} 개</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(rev.formwork, 2)} m²
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{formatNumber(rev.steel, 3)} kg
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">-</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700">
												{rev.amount ? rev.amount.toLocaleString() : '-'} 원
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* 콘크리트 상세 비교표 */}
						<div className="mb-6">
							<h4 className="text-md font-semibold mb-3">콘크리트</h4>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm">
									<thead>
										<tr className="bg-neutral-100 dark:bg-neutral-800">
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">콘크리트(m³)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">물량(m³)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액(원)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">물량차이(m³)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액차이(원)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비고</th>
										</tr>
									</thead>
									<tbody>
										{revisionQuantities.map((rev, index) => {
											const prevRev = index > 0 ? revisionQuantities[index - 1] : null;
											const quantityDiff = prevRev ? (rev.concrete || 0) - (prevRev.concrete || 0) : 0;
											const amountDiff = prevRev ? (rev.amount || 0) - (prevRev.amount || 0) : 0;
											return (
												<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
													<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{rev.revision}</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{formatNumber(rev.concrete, 3)} m³
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{formatNumber(rev.concrete, 3)} m³
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{rev.amount ? rev.amount.toLocaleString() : '-'} 원
													</td>
													<td className={`p-3 border border-neutral-300 dark:border-neutral-700 ${
														quantityDiff > 0 ? 'text-red-600 dark:text-red-400' : quantityDiff < 0 ? 'text-blue-600 dark:text-blue-400' : ''
													}`}>
														{index > 0 ? (quantityDiff > 0 ? '+' : '') + formatNumber(quantityDiff, 3) : '-'} m³
													</td>
													<td className={`p-3 border border-neutral-300 dark:border-neutral-700 ${
														amountDiff > 0 ? 'text-red-600 dark:text-red-400' : amountDiff < 0 ? 'text-blue-600 dark:text-blue-400' : ''
													}`}>
														{index > 0 ? (amountDiff > 0 ? '+' : '') + amountDiff.toLocaleString() : '-'} 원
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">-</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						{/* 철근 상세 비교표 */}
						<div>
							<h4 className="text-md font-semibold mb-3">철근</h4>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm">
									<thead>
										<tr className="bg-neutral-100 dark:bg-neutral-800">
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근(ton)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">물량(ton)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액(원)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">물량차이(ton)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액차이(원)</th>
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비고</th>
										</tr>
									</thead>
									<tbody>
										{revisionQuantities.map((rev, index) => {
											const prevRev = index > 0 ? revisionQuantities[index - 1] : null;
											const quantityDiff = prevRev ? (rev.rebar || 0) - (prevRev.rebar || 0) : 0;
											const amountDiff = prevRev ? (rev.amount || 0) - (prevRev.amount || 0) : 0;
											return (
												<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
													<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{rev.revision}</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{formatNumber(rev.rebar, 3)} ton
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{formatNumber(rev.rebar, 3)} ton
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														{rev.amount ? rev.amount.toLocaleString() : '-'} 원
													</td>
													<td className={`p-3 border border-neutral-300 dark:border-neutral-700 ${
														quantityDiff > 0 ? 'text-red-600 dark:text-red-400' : quantityDiff < 0 ? 'text-blue-600 dark:text-blue-400' : ''
													}`}>
														{index > 0 ? (quantityDiff > 0 ? '+' : '') + formatNumber(quantityDiff, 3) : '-'} ton
													</td>
													<td className={`p-3 border border-neutral-300 dark:border-neutral-700 ${
														amountDiff > 0 ? 'text-red-600 dark:text-red-400' : amountDiff < 0 ? 'text-blue-600 dark:text-blue-400' : ''
													}`}>
														{index > 0 ? (amountDiff > 0 ? '+' : '') + amountDiff.toLocaleString() : '-'} 원
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">-</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
										{tabType === 'rebar' ? '철근(ton)' : tabType === 'steel' ? '철골(ton)' : tabType === 'formwork' ? '거푸집(m²)' : '기타(개)'}
									</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">금액(원)</th>
								</tr>
							</thead>
							<tbody>
								{revisionQuantities.map((rev, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{rev.revision}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{tabType === 'rebar' && formatNumber(rev.rebar, 3) + ' ton'}
											{tabType === 'steel' && formatNumber(rev.steel, 3) + ' ton'}
											{tabType === 'formwork' && formatNumber(rev.formwork, 2) + ' m²'}
											{tabType === 'other' && (rev.coupler || 0) + ' 개'}
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{rev.amount ? rev.amount.toLocaleString() : '-'} 원
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export function QuantityInfo() {
	const [activeTab, setActiveTab] = useState<TabType>('concrete');

	const tabs = [
		{ id: 'concrete' as TabType, label: '콘크리트 물량' },
		{ id: 'rebar' as TabType, label: '철근 물량' },
		{ id: 'steel' as TabType, label: '철골 물량' },
		{ id: 'formwork' as TabType, label: '거푸집 물량' },
		{ id: 'other' as TabType, label: '기타' },
	];

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">물량정보</h2>

			{/* 탭 메뉴 */}
			<div className="flex gap-2 mt-6 border-b border-neutral-300 dark:border-neutral-700 overflow-x-auto">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						onClick={() => setActiveTab(tab.id)}
						className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
							activeTab === tab.id
								? 'border-blue-500 text-blue-600 dark:text-blue-400'
								: 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* 탭 콘텐츠 */}
			<div className="mt-6">
				<QuantityContent tabType={activeTab} />
			</div>
		</section>
	);
}

import { useState } from 'react';

type TabType = 'footing' | 'column' | 'beam' | 'slab' | 'wall' | 'dwall';

type MemberBasicInfo = {
	memberId: string;
	type: string;
	level: string;
	grid: string;
	section: string;
	material: {
		fck?: string;
		fy?: string;
	};
};

type DesignResult = {
	nMax: string;
	v2Max: string;
	v3Max: string;
	m2Max: string;
	m3Max: string;
	asReq: string;
	asProv: string;
	governingLoadComb: string;
};

type RebarDetail = {
	location: string;
	diameter: string;
	count: string;
	arrangement: string;
	stirrups?: string;
	tie?: string;
	coupler?: string;
	lapSplice?: {
		location: string;
		length: string;
		standard: string;
	};
};

type RevisionInfo = {
	revision: string;
	changeDate: string;
	beforeValue: string;
	afterValue: string;
	changeType: string;
};

// 공통 부재 정보 컴포넌트
function MemberContent({ memberType }: { memberType: string }) {
	// 샘플 데이터
	const basicInfo: MemberBasicInfo = {
		memberId: `${memberType.toUpperCase()}-001`,
		type: memberType,
		level: '3F',
		grid: 'A-3',
		section: '600×600',
		material: {
			fck: 'C30/37',
			fy: 'SD400',
		},
	};

	const designResult: DesignResult = {
		nMax: '12,500',
		v2Max: '850',
		v3Max: '1,200',
		m2Max: '1,250',
		m3Max: '2,150',
		asReq: '4,500',
		asProv: '4,910',
		governingLoadComb: '1.2DL + 1.6LL + 1.0EQ',
	};

	const rebarDetails: RebarDetail[] = [
		{
			location: '상부 주근',
			diameter: 'D25',
			count: '8',
			arrangement: '양단부 집중 배치',
			lapSplice: {
				location: '중간부',
				length: '1,200',
				standard: 'KDS 14 20 20',
			},
		},
		{
			location: '하부 주근',
			diameter: 'D25',
			count: '8',
			arrangement: '전구간 균등 배치',
			lapSplice: {
				location: '중간부',
				length: '1,200',
				standard: 'KDS 14 20 20',
			},
		},
		{
			location: '측면 주근',
			diameter: 'D22',
			count: '4',
			arrangement: '양측면 배치',
		},
		{
			location: 'Stirrups',
			diameter: 'D10',
			count: '-',
			arrangement: '@200',
		},
		{
			location: 'Tie',
			diameter: 'D10',
			count: '-',
			arrangement: '@200',
		},
	];

	const revisions: RevisionInfo[] = [
		{
			revision: 'Rev B',
			changeDate: '2025-10-15',
			beforeValue: '600×600',
			afterValue: '700×700',
			changeType: '단면 변경',
		},
		{
			revision: 'Rev A',
			changeDate: '2025-09-01',
			beforeValue: 'D22@8',
			afterValue: 'D25@8',
			changeType: '철근량 증가',
		},
	];

	return (
		<div className="space-y-8">
			{/* 1) 부재 기본 정보 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">1) 부재 기본 정보</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-3">
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">Member ID</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">{basicInfo.memberId}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">부재 종류(Type)</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">{basicInfo.type}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">위치(Level, Grid)</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">
								{basicInfo.level}, {basicInfo.grid}
							</span>
						</div>
					</div>
					<div className="space-y-3">
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">단면 정보</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">{basicInfo.section}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">재료강도 (콘크리트 fck)</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">{basicInfo.material.fck}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<span className="text-sm text-neutral-600 dark:text-neutral-400">재료강도 (철근 fy)</span>
							<span className="font-semibold text-neutral-900 dark:text-neutral-100">{basicInfo.material.fy}</span>
						</div>
					</div>
				</div>
			</div>

			{/* 2) 설계 결과 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">2) 설계 결과(Design Results)</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">항목</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">값</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">단위</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">N_max</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.nMax}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">kN</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">V2_max</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.v2Max}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">kN</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">V3_max</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.v3Max}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">kN</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">M2_max</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.m2Max}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">kN·m</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">M3_max</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.m3Max}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">kN·m</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">요구 철근량 As_req</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.asReq}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">mm²</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">제공 철근량 As_prov</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{designResult.asProv}</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">mm²</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">Governing load combinations</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium" colSpan={2}>
									{designResult.governingLoadComb}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* 3) 철근 배근 정보 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">3) 철근 배근 정보(Rebar Details)</h3>
				<div className="space-y-4">
					{rebarDetails.map((rebar, index) => (
						<div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
								<div>
									<span className="text-xs text-neutral-500 dark:text-neutral-400">위치</span>
									<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.location}</div>
								</div>
								<div>
									<span className="text-xs text-neutral-500 dark:text-neutral-400">직경</span>
									<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.diameter}</div>
								</div>
								<div>
									<span className="text-xs text-neutral-500 dark:text-neutral-400">개수</span>
									<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.count}</div>
								</div>
								<div>
									<span className="text-xs text-neutral-500 dark:text-neutral-400">배치 위치</span>
									<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.arrangement}</div>
								</div>
							</div>
							{rebar.lapSplice && (
								<div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<span className="text-xs text-neutral-500 dark:text-neutral-400">Lap splice 위치</span>
											<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.lapSplice.location}</div>
										</div>
										<div>
											<span className="text-xs text-neutral-500 dark:text-neutral-400">Lap splice 길이</span>
											<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.lapSplice.length} mm</div>
										</div>
										<div>
											<span className="text-xs text-neutral-500 dark:text-neutral-400">설계 기준</span>
											<div className="font-medium text-neutral-900 dark:text-neutral-100">{rebar.lapSplice.standard}</div>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* 4) BIM Snapshot */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">4) 해당 부재의 BIM Snapshot (2D/3D)</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-sm font-medium mb-2">단면 view</div>
						<div className="w-full h-64 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
							<div className="text-center">
								<svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<div className="text-xs">단면 이미지</div>
							</div>
						</div>
					</div>
					<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-sm font-medium mb-2">배근 view</div>
						<div className="w-full h-64 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
							<div className="text-center">
								<svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<div className="text-xs">배근 이미지</div>
							</div>
						</div>
					</div>
					<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-sm font-medium mb-2">Clash 상태</div>
						<div className="w-full h-64 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
							<div className="text-center">
								<div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
									<svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<div className="text-sm font-medium text-green-600 dark:text-green-400">Clash 없음</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 5) Revision 연동 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">5) Revision 연동</h3>
				<div className="mb-4">
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						해당 부재가 어떤 Revision에서 변경되었는지 및 변경 전후 설계값 비교표
					</p>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Revision</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경일</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 전</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 후</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 유형</th>
							</tr>
						</thead>
						<tbody>
							{revisions.map((rev, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{rev.revision}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{rev.changeDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{rev.beforeValue}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium text-blue-600 dark:text-blue-400">
										{rev.afterValue}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{rev.changeType}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export function Members() {
	const [activeTab, setActiveTab] = useState<TabType>('footing');

	const tabs = [
		{ id: 'footing' as TabType, label: '기초 (Footing / Mat Foundation / Pile Cap)' },
		{ id: 'column' as TabType, label: '기둥 (Columns)' },
		{ id: 'beam' as TabType, label: '보 (Beams)' },
		{ id: 'slab' as TabType, label: '슬라브 (Slabs)' },
		{ id: 'wall' as TabType, label: '벽체 (Walls)' },
		{ id: 'dwall' as TabType, label: 'D-Wall (Diaphragm Walls)' },
	];

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">부재정보</h2>

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
				<MemberContent memberType={activeTab} />
			</div>
		</section>
	);
}

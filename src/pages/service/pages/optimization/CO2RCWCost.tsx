import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type MemberCO2 = {
	memberType: string;
	before: number; // ton-CO₂e
	after: number; // ton-CO₂e
	reduction: number; // ton-CO₂e
};

type LevelCO2 = {
	level: string;
	before: number; // ton-CO₂e
	after: number; // ton-CO₂e
	reduction: number; // ton-CO₂e
};

type ManufacturerCarbonFactor = {
	manufacturer: string;
	carbonFactor: number; // kg-CO₂e/ton
	rebarQuantity: number; // ton
	totalCO2: number; // ton-CO₂e
};

type OffcutDistribution = {
	lengthRange: string; // m
	count: number;
	percentage: number;
};

type SpecialLengthCombination = {
	specialLength: string; // m
	cutCombination: string;
	offcut: string; // m
	rcw: string; // %
	applicableMembers: string;
};

type RCWReductionFactor = {
	factor: string;
	contribution: number; // %
	description: string;
};

type CostImpact = {
	scenario: string;
	cost: number; // 원
	delayDays?: number;
};

export function CO2RCWCost() {
	const [selectedView, setSelectedView] = useState<'member' | 'level'>('member');

	// A. CO₂ Emission 분석
	const co2Before = 1250.5; // ton-CO₂e
	const co2After = 1165.2; // ton-CO₂e
	const co2Reduction = co2Before - co2After; // 85.3 ton-CO₂e

	const memberCO2Data: MemberCO2[] = [
		{ memberType: '기둥', before: 350.2, after: 325.5, reduction: 24.7 },
		{ memberType: '보', before: 420.8, after: 395.2, reduction: 25.6 },
		{ memberType: '슬래브', before: 280.5, after: 265.3, reduction: 15.2 },
		{ memberType: '벽', before: 150.0, after: 140.2, reduction: 9.8 },
		{ memberType: '기초', before: 49.0, after: 39.0, reduction: 10.0 },
	];

	const levelCO2Data: LevelCO2[] = [
		{ level: 'B2', before: 125.5, after: 118.2, reduction: 7.3 },
		{ level: 'B1', before: 118.3, after: 110.5, reduction: 7.8 },
		{ level: '1F', before: 145.8, after: 135.2, reduction: 10.6 },
		{ level: '2F', before: 132.5, after: 123.8, reduction: 8.7 },
		{ level: '3F', before: 128.9, after: 120.5, reduction: 8.4 },
		{ level: 'RF', before: 95.2, after: 88.5, reduction: 6.7 },
	];

	const manufacturerCarbonFactors: ManufacturerCarbonFactor[] = [
		{ manufacturer: '제조사 A', carbonFactor: 1.85, rebarQuantity: 250.5, totalCO2: 463.4 },
		{ manufacturer: '제조사 B', carbonFactor: 1.92, rebarQuantity: 180.3, totalCO2: 346.2 },
		{ manufacturer: '제조사 C', carbonFactor: 1.78, rebarQuantity: 150.2, totalCO2: 267.4 },
	];

	const co2ProjectionData = [
		{ month: '1월', co2: 1250.5 },
		{ month: '2월', co2: 1180.2 },
		{ month: '3월', co2: 1165.2 },
		{ month: '4월', co2: 1150.0 },
		{ month: '5월', co2: 1135.5 },
		{ month: '6월', co2: 1120.0 },
	];

	// B. RCW(절단손실) 분석
	const rcwBefore = 8.5; // %
	const rcwAfter = 2.3; // %
	const specialLengthApplicationRate = 85.5; // %

	const offcutDistribution: OffcutDistribution[] = [
		{ lengthRange: '0-0.5m', count: 1250, percentage: 45.2 },
		{ lengthRange: '0.5-1.0m', count: 850, percentage: 30.8 },
		{ lengthRange: '1.0-1.5m', count: 450, percentage: 16.3 },
		{ lengthRange: '1.5-2.0m', count: 150, percentage: 5.4 },
		{ lengthRange: '2.0m 이상', count: 60, percentage: 2.2 },
	];

	const specialLengthCombinations: SpecialLengthCombination[] = [
		{ specialLength: '10.8m', cutCombination: '6.3m + 4.5m', offcut: '0.2m', rcw: '0.6%', applicableMembers: 'C101/C102/B402' },
		{ specialLength: '11.0m', cutCombination: '5.4m + 5.1m', offcut: '0.5m', rcw: '0.8%', applicableMembers: 'B502' },
		{ specialLength: '10.5m', cutCombination: '7.2m + 3.0m', offcut: '0.3m', rcw: '0.5%', applicableMembers: 'S201/S202' },
		{ specialLength: '11.7m', cutCombination: '8.5m + 3.0m', offcut: '0.2m', rcw: '0.4%', applicableMembers: 'C203/C204' },
	];

	const diameterRCWDeviation = [
		{ diameter: 'D13', rcw: 1.8 },
		{ diameter: 'D16', rcw: 2.1 },
		{ diameter: 'D19', rcw: 2.5 },
		{ diameter: 'D22', rcw: 2.8 },
		{ diameter: 'D25', rcw: 3.2 },
		{ diameter: 'D28', rcw: 3.5 },
		{ diameter: 'D32', rcw: 4.0 },
		{ diameter: 'D35', rcw: 4.5 },
	];

	const rcwReductionFactors: RCWReductionFactor[] = [
		{ factor: 'Coupler 사용', contribution: 35.5, description: 'Lap splice 대신 Coupler 사용으로 절단 길이 최적화' },
		{ factor: 'Lap 위치 조정', contribution: 28.2, description: 'Lap 위치를 최적화하여 재료 활용도 향상' },
		{ factor: 'Rebar grouping (Global Optimization)', contribution: 36.3, description: '전체 건물 단위로 철근 그룹핑하여 Special-length 적용' },
	];

	// C. Cost 절감 분석
	const costBefore = 356250000; // 원
	const costAfter = 332125000; // 원
	const costReduction = costBefore - costAfter; // 24,125,000원
	const costReductionRate = ((costReduction / costBefore) * 100).toFixed(1); // %
	const roi = ((costReduction / 5000000) * 100).toFixed(1); // % (초기 투자 500만원 가정)

	const revisionCostReduction = [
		{ revision: 'Rev 1.0', costReduction: 0 },
		{ revision: 'Rev 2.0', costReduction: 8500000 },
		{ revision: 'Rev 2.1', costReduction: 12500000 },
		{ revision: 'Rev 3.0', costReduction: 18000000 },
		{ revision: 'Rev 3.2', costReduction: 24125000 },
	];

	const costImpactScenarios: CostImpact[] = [
		{ scenario: '정상 발주/설치', cost: costAfter, delayDays: 0 },
		{ scenario: '발주 지연 7일', cost: costAfter + 3500000, delayDays: 7 },
		{ scenario: '발주 지연 14일', cost: costAfter + 7200000, delayDays: 14 },
		{ scenario: '설치 지연 7일', cost: costAfter + 2800000, delayDays: 7 },
		{ scenario: '설치 지연 14일', cost: costAfter + 5800000, delayDays: 14 },
		{ scenario: '발주+설치 지연 14일', cost: costAfter + 12000000, delayDays: 14 },
	];

	// D. 결론 Summary Card
	const summary = {
		reductionRate: '6.7%',
		costReduction: '24,125,000',
		environmentalContribution: '85.3 ton-CO₂e',
		orderRiskReduction: 'Y',
		installationImprovement: 'Y',
	};

	const formatNumber = (num: number, decimals: number = 1) => {
		return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">CO₂/RCW/Cost</h2>

			{/* A. CO₂ Emission 분석 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. CO₂ Emission 분석</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
						<div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">기존 설계 기준 CO₂ 배출량</div>
						<div className="text-2xl font-bold text-red-900 dark:text-red-100">{formatNumber(co2Before, 1)} ton-CO₂e</div>
					</div>
					<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
						<div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">최적화 후 CO₂ 배출량</div>
						<div className="text-2xl font-bold text-green-900 dark:text-green-100">{formatNumber(co2After, 1)} ton-CO₂e</div>
					</div>
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">절감량</div>
						<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatNumber(co2Reduction, 1)} ton-CO₂e</div>
					</div>
				</div>

				{/* 부재별/층별 CO₂ 기여도 */}
				<div className="mb-6">
					<div className="flex items-center gap-4 mb-4">
						<button
							type="button"
							onClick={() => setSelectedView('member')}
							className={`px-4 py-2 rounded text-sm border transition-colors ${
								selectedView === 'member'
									? 'bg-blue-500 text-white border-blue-500'
									: 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
							}`}
						>
							부재별
						</button>
						<button
							type="button"
							onClick={() => setSelectedView('level')}
							className={`px-4 py-2 rounded text-sm border transition-colors ${
								selectedView === 'level'
									? 'bg-blue-500 text-white border-blue-500'
									: 'bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600'
							}`}
						>
							층별
						</button>
					</div>
					<div className="h-[400px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={selectedView === 'member' ? memberCO2Data : levelCO2Data}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey={selectedView === 'member' ? 'memberType' : 'level'} stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: 'CO₂ (ton-CO₂e)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Legend />
								<Bar dataKey="before" fill="#ef4444" name="기존" />
								<Bar dataKey="after" fill="#10b981" name="최적화 후" />
								<Bar dataKey="reduction" fill="#3b82f6" name="절감량" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Rebar 제조사별 탄소계수 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Rebar 제조사별 "탄소계수(Carbon Factor)" 적용</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">제조사</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">탄소계수 (kg-CO₂e/ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근 물량 (ton)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 CO₂ (ton-CO₂e)</th>
								</tr>
							</thead>
							<tbody>
								{manufacturerCarbonFactors.map((mfr, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{mfr.manufacturer}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{mfr.carbonFactor.toFixed(2)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{formatNumber(mfr.rebarQuantity, 1)}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">{formatNumber(mfr.totalCO2, 1)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 프로젝트 전체 CO₂ 예측 그래프 */}
				<div>
					<h4 className="text-md font-medium mb-3">프로젝트 전체 CO₂ 예측 그래프</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={co2ProjectionData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: 'CO₂ (ton-CO₂e)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="co2" stroke="#3b82f6" strokeWidth={2} name="CO₂ 배출량" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* B. RCW(절단손실) 분석 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. RCW(절단손실) 분석</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
						<div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">기존 RCW</div>
						<div className="text-2xl font-bold text-red-900 dark:text-red-100">{rcwBefore.toFixed(1)}%</div>
					</div>
					<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
						<div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">최적화 RCW</div>
						<div className="text-2xl font-bold text-green-900 dark:text-green-100">{rcwAfter.toFixed(1)}%</div>
					</div>
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Special-length 적용률</div>
						<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{specialLengthApplicationRate.toFixed(1)}%</div>
					</div>
				</div>

				{/* Offcut 길이 분포 히스토그램 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Offcut 길이 분포 히스토그램</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={offcutDistribution}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="lengthRange" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '개수', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Bar dataKey="count" fill="#3b82f6" name="개수" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Special Length Cut Combination */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">Special Length Cut Combination</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Special Length</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Cut Combination</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">잔재(Offcut)</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">RCW</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">적용 Member</th>
								</tr>
							</thead>
							<tbody>
								{specialLengthCombinations.map((combo, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{combo.specialLength}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{combo.cutCombination}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{combo.offcut}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{combo.rcw}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{combo.applicableMembers}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 철근 직경별 RCW 편차 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">철근 직경별 RCW 편차</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={diameterRCWDeviation}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="diameter" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: 'RCW (%)', angle: -90, position: 'insideLeft' }} />
								<Tooltip />
								<Bar dataKey="rcw" fill="#f59e0b" name="RCW (%)" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* RCW 저감 기여 요인 분석 */}
				<div>
					<h4 className="text-md font-medium mb-3">RCW 저감 기여 요인 분석</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{rcwReductionFactors.map((factor, index) => (
							<div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
								<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">{factor.factor}</div>
								<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{factor.contribution.toFixed(1)}%</div>
								<div className="text-xs text-neutral-600 dark:text-neutral-400">{factor.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* C. Cost 절감 분석 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. Cost 절감 분석</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
						<div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">기존 비용</div>
						<div className="text-2xl font-bold text-red-900 dark:text-red-100">{costBefore.toLocaleString()}원</div>
					</div>
					<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
						<div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">최적화 비용</div>
						<div className="text-2xl font-bold text-green-900 dark:text-green-100">{costAfter.toLocaleString()}원</div>
					</div>
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">절감 금액</div>
						<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{costReduction.toLocaleString()}원</div>
						<div className="text-sm text-blue-600 dark:text-blue-400 mt-1">({costReductionRate}% 절감)</div>
					</div>
				</div>

				{/* ROI 계산 */}
				<div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
					<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">ROI (Return on Investment)</div>
					<div className="text-2xl font-bold text-green-600 dark:text-green-400">{roi}%</div>
					<div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">초기 투자 500만원 기준</div>
				</div>

				{/* 설계변경/Revision 대응 비용 절감 효과 */}
				<div className="mb-6">
					<h4 className="text-md font-medium mb-3">설계변경/Revision 대응 비용 절감 효과</h4>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={revisionCostReduction}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
								<XAxis dataKey="revision" stroke="#6b7280" className="dark:stroke-neutral-400" />
								<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '비용 절감 (원)', angle: -90, position: 'insideLeft' }} />
								<Tooltip formatter={(value: number) => value.toLocaleString() + '원'} />
								<Line type="monotone" dataKey="costReduction" stroke="#10b981" strokeWidth={2} name="비용 절감" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* 발주 지연/설치 지연에 따른 비용 영향 모델링 */}
				<div>
					<h4 className="text-md font-medium mb-3">발주 지연/설치 지연에 따른 비용 영향 모델링</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">시나리오</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">지연 일수</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">추가 비용 (원)</th>
									<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">총 비용 (원)</th>
								</tr>
							</thead>
							<tbody>
								{costImpactScenarios.map((scenario, index) => (
									<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{scenario.scenario}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{scenario.delayDays || 0}일</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
											{scenario.delayDays ? (scenario.cost - costAfter).toLocaleString() : '-'}
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium">{scenario.cost.toLocaleString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* D. 결론 Summary Card */}
			<div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
				<h3 className="text-lg font-semibold mb-4">D. 결론 Summary Card</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					<div className="p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">절감율</div>
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{summary.reductionRate}</div>
					</div>
					<div className="p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">절감 금액</div>
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">{summary.costReduction.toLocaleString()}원</div>
					</div>
					<div className="p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">환경 기여도</div>
						<div className="text-xl font-bold text-purple-600 dark:text-purple-400">{summary.environmentalContribution}</div>
					</div>
					<div className="p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">발주 위험 감소</div>
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">{summary.orderRiskReduction}</div>
					</div>
					<div className="p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">설치성 개선</div>
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">{summary.installationImprovement}</div>
					</div>
				</div>
			</div>
		</section>
	);
}

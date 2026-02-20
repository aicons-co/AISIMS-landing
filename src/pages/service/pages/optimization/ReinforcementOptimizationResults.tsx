import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function ReinforcementOptimizationResults() {
	const trendData = [
		{ iteration: '1차', reduction: 2.0 },
		{ iteration: '2차', reduction: 4.0 },
		{ iteration: '3차', reduction: 5.5 },
		{ iteration: '4차', reduction: 6.2 },
		{ iteration: '5차', reduction: 6.7 },
	];

	const comparisonData = [
		{ 
			name: '철근소용물량', 
			기존: 520.0, 
			'AISIMS 최적화': 485.0,
			unit: '톤'
		},
		{ 
			name: '철근주문용물량', 
			기존: 520.0, 
			'AISIMS 최적화': 485.0,
			unit: '톤'
		},
		{ 
			name: '예상손율', 
			기존: 520.0, 
			'AISIMS 최적화': 485.0,
			unit: '톤'
		},
		{ 
			name: 'CO2 배출량', 
			기존: 520.0, 
			'AISIMS 최적화': 485.0,
			unit: 'ton-CO₂e'
		},
	];

	return (
		<section className="w-full max-w-6xl mx-auto px-4 py-6">
			<div className="mb-6">
				<h2 className="text-2xl font-bold mb-2">최적화 결과(Reports)</h2>
			</div>

			{/* 철근 최적화 Report */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">철근 최적화 Report</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">구분</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기존</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">AISIMS 최적화</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">절감효과</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비용절감(원)</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">철근소용물량</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">520.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">485.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">6.7% 절감</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">23,975,000원</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">철근주문용물량</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">520.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">485.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">6.7% 절감</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">23,975,000원</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">예상손율</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">520.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">485.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">6.7% 절감</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">23,975,000원</td>
							</tr>
							<tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">사용량기준환상 CO2 배출량</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">520.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">485.0톤</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">6.7% 절감</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700">23,975,000원</td>
							</tr>
							<tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
								<td className="p-3 border border-neutral-300 dark:border-neutral-700" colSpan={4}>
									비용절감 합계
								</td>
								<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-blue-600 dark:text-blue-400">
									95,900,000원
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
					<div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
						<div>CO₂ 배출량: 1.9 ton-CO₂e, 철근단가: 685,000 원/톤, 탄소거래세: 18,000원/ton-CO₂e</div>
						<div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
							참고로 위 가정은 수시로 변경됨.
						</div>
					</div>
				</div>
			</div>

			{/* 절감효과 그래프 */}
			<div className="mt-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">절감효과 시각화</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* 절감 효과 비교 그래프 */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<h4 className="text-sm font-semibold">절감 효과 비교</h4>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-neutral-400 dark:bg-neutral-600 rounded"></div>
									<span className="text-xs text-neutral-700 dark:text-neutral-300">기존</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-blue-500 dark:bg-blue-600 rounded"></div>
									<span className="text-xs text-neutral-700 dark:text-neutral-300">AISIMS 최적화</span>
								</div>
							</div>
						</div>
						<div className="h-[480px] bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 p-4">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart 
									data={comparisonData} 
									margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
									<XAxis 
										dataKey="name" 
										stroke="#6b7280"
										className="dark:stroke-neutral-400"
										tick={{ fill: '#6b7280', fontSize: 11 }}
										angle={-45}
										textAnchor="end"
										height={50}
									/>
									<YAxis 
										stroke="#6b7280"
										className="dark:stroke-neutral-400"
										tick={{ fill: '#6b7280', fontSize: 12 }}
										label={{ value: '양 (톤/ton-CO₂e)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
										domain={[0, 600]}
									/>
									<Tooltip 
										contentStyle={{ 
											backgroundColor: 'white', 
											border: '1px solid #e5e7eb',
											borderRadius: '6px',
											color: '#374151'
										}}
										formatter={(value: number, name: string, props: any) => {
											const unit = props.payload.unit || '';
											return [`${value}${unit}`, name];
										}}
									/>
									<Bar 
										dataKey="기존" 
										fill="#9ca3af" 
										radius={[4, 4, 0, 0]}
									/>
									<Bar 
										dataKey="AISIMS 최적화" 
										fill="#3b82f6" 
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* 저감 트랜드 */}
					<div>
						<h4 className="text-sm font-semibold mb-3">저감 트랜드</h4>
						<div className="h-[480px] bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 p-4">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
									<XAxis 
										dataKey="iteration" 
										stroke="#6b7280"
										className="dark:stroke-neutral-400"
										tick={{ fill: '#6b7280', fontSize: 12 }}
										label={{ value: '최적화 반복 횟수', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
									/>
									<YAxis 
										stroke="#6b7280"
										className="dark:stroke-neutral-400"
										tick={{ fill: '#6b7280', fontSize: 12 }}
										label={{ value: '절감율 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
										domain={[0, 10]}
									/>
									<Tooltip 
										contentStyle={{ 
											backgroundColor: 'white', 
											border: '1px solid #e5e7eb',
											borderRadius: '6px',
											color: '#374151'
										}}
										labelStyle={{ color: '#6b7280', fontSize: 12 }}
									/>
									<Line 
										type="monotone" 
										dataKey="reduction" 
										stroke="#10b981" 
										strokeWidth={2}
										dot={{ fill: '#10b981', r: 4 }}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>

			{/* B. 부재별 최적화 결과 (Member-Level Optimization) */}
			<div className="mt-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. 부재별 최적화 결과 (Member-Level Optimization)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					각 기둥/보/슬래브/D-Wall 단위로 결과 제공 · Revision 변경 시 자동 업데이트 · BIM Viewer에서 "Before/After Rebar 비교" 버튼 제공
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">부재 ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">부재 종류</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기존 철근량 (ton)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최적화 철근량 (ton)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">절감률 (%)</th>
								<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비용 절감 (원)</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Revision</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">비교 보기</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ id: 'C-001', type: '기둥', level: '3F', before: 0.125, after: 0.118, reduction: 5.6, cost: 4795000, revision: 'Rev 3.2' },
								{ id: 'B-012', type: '보', level: '3F', before: 0.085, after: 0.080, reduction: 5.9, cost: 3425000, revision: 'Rev 3.2' },
								{ id: 'S-201', type: '슬래브', level: '3F', before: 0.065, after: 0.062, reduction: 4.6, cost: 2055000, revision: 'Rev 2.1' },
								{ id: 'W-031', type: '벽', level: '3F', before: 0.145, after: 0.138, reduction: 4.8, cost: 4795000, revision: 'Rev 2.1' },
								{ id: 'DW-005', type: 'D-Wall', level: 'B1', before: 0.180, after: 0.170, reduction: 5.6, cost: 6850000, revision: 'Rev 3.0' },
							].map((member, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{member.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{member.type}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{member.level}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{member.before.toFixed(3)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium text-blue-600 dark:text-blue-400">
										{member.after.toFixed(3)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium text-green-600 dark:text-green-400">
										{member.reduction.toFixed(1)}%
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{member.cost.toLocaleString()}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											{member.revision}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<button
											type="button"
											className="px-3 py-1.5 rounded text-xs bg-green-500 hover:bg-green-600 text-white transition-colors"
											onClick={() => {
												// BIM Viewer로 이동하여 Before/After 비교
												window.location.href = '/opt/bim?member=' + member.id + '&compare=true';
											}}
										>
											Before/After 비교
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* C. Zone/층(Level)별 최적화 결과 */}
			<div className="mt-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">C. Zone/층(Level)별 최적화 결과</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					예: Core Zone vs Tower Zone, 4F vs 5F 비교 · Zone별 철근 절감효과 차이 · 층별 RCW 패턴 · Coupler 집중 구간
				</p>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Zone별 비교 */}
					<div>
						<h4 className="text-md font-medium mb-3">Zone별 철근 절감효과</h4>
						<div className="overflow-x-auto">
							<table className="w-full border-collapse text-sm">
								<thead>
									<tr className="bg-neutral-100 dark:bg-neutral-800">
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Zone</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">기존 철근량 (ton)</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최적화 철근량 (ton)</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">절감률 (%)</th>
									</tr>
								</thead>
								<tbody>
									{[
										{ zone: 'Core Zone', before: 24.770, after: 23.250, reduction: 6.1 },
										{ zone: 'Tower Zone', before: 52.370, after: 48.850, reduction: 6.7 },
									].map((zone, index) => (
										<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{zone.zone}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{zone.before.toFixed(3)}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium text-blue-600 dark:text-blue-400">
												{zone.after.toFixed(3)}
											</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right font-medium text-green-600 dark:text-green-400">
												{zone.reduction.toFixed(1)}%
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* 층별 비교 */}
					<div>
						<h4 className="text-md font-medium mb-3">층별 RCW 패턴</h4>
						<div className="overflow-x-auto">
							<table className="w-full border-collapse text-sm">
								<thead>
									<tr className="bg-neutral-100 dark:bg-neutral-800">
										<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Level</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">철근량 (ton)</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Coupler (개)</th>
										<th className="text-right p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">RCW 패턴</th>
									</tr>
								</thead>
								<tbody>
									{[
										{ level: '4F', rebar: 12.850, coupler: 1250, pattern: 'Standard' },
										{ level: '5F', rebar: 13.420, coupler: 1320, pattern: 'High Density' },
										{ level: 'RF', rebar: 9.850, coupler: 950, pattern: 'Standard' },
									].map((level, index) => (
										<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{level.level}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{level.rebar.toFixed(3)}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">{level.coupler.toLocaleString()}</td>
											<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-right">
												<span
													className={`px-2 py-1 rounded text-xs ${
														level.pattern === 'High Density'
															? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
															: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
													}`}
												>
													{level.pattern}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Coupler 집중 구간 */}
				<div className="mt-6">
					<h4 className="text-md font-medium mb-3">Coupler 집중 구간</h4>
					<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{[
								{ zone: 'Core Zone', level: '3F-5F', coupler: 2850, density: '높음' },
								{ zone: 'Tower Zone', level: '4F-6F', coupler: 3200, density: '매우 높음' },
								{ zone: 'Tower Zone', level: 'RF', coupler: 950, density: '보통' },
							].map((section, index) => (
								<div key={index} className="p-3 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">{section.zone}</div>
									<div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{section.level}</div>
									<div className="flex items-center justify-between">
										<span className="text-sm text-neutral-700 dark:text-neutral-300">Coupler: {section.coupler.toLocaleString()}개</span>
										<span
											className={`px-2 py-1 rounded text-xs ${
												section.density === '매우 높음'
													? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
													: section.density === '높음'
														? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
														: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
											}`}
										>
											{section.density}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

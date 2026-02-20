import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function OptimizationFlow() {
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

			{/* AI 분석 로그 */}
			<div className="mt-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">AI 분석 로그</h3>
				<div className="space-y-3 max-h-96 overflow-y-auto">
					{[
						{ time: '2025-01-15 10:23:15', level: 'INFO', message: 'AI 모델 초기화 완료. 구조 분석 알고리즘 로드됨.' },
						{ time: '2025-01-15 10:23:18', level: 'INFO', message: 'BIM 모델 파싱 시작. 총 125개 구조 요소 감지됨.' },
						{ time: '2025-01-15 10:23:25', level: 'ANALYSIS', message: '초기 설계 해석 완료. 안전계수 평균 1.85 (목표: ≥1.5) 확인.' },
						{ time: '2025-01-15 10:23:32', level: 'OPTIMIZATION', message: '1차 최적화 시작. 철근 배근 패턴 분석 중...' },
						{ time: '2025-01-15 10:23:45', level: 'OPTIMIZATION', message: '1차 최적화 완료. 비용: 1,250만원 → 1,180만원 (5.6% 절감)' },
						{ time: '2025-01-15 10:23:52', level: 'AI', message: 'AI 추천: D13 철근을 D16으로 변경 시 추가 3.2% 절감 가능. 안전성 검토 필요.' },
						{ time: '2025-01-15 10:24:05', level: 'OPTIMIZATION', message: '2차 최적화 시작. AI 추천 사항 반영 중...' },
						{ time: '2025-01-15 10:24:18', level: 'ANALYSIS', message: '안전성 재검토 완료. 모든 요소 안전계수 ≥1.5 유지 확인.' },
						{ time: '2025-01-15 10:24:25', level: 'OPTIMIZATION', message: '2차 최적화 완료. 비용: 1,180만원 → 1,150만원 (2.5% 추가 절감)' },
						{ time: '2025-01-15 10:24:32', level: 'AI', message: 'AI 패턴 분석: 유사 프로젝트 15건 분석 결과, 추가 2-3% 절감 여지 확인.' },
						{ time: '2025-01-15 10:24:45', level: 'OPTIMIZATION', message: '3차 최적화 시작. 패턴 기반 최적화 적용 중...' },
						{ time: '2025-01-15 10:25:02', level: 'OPTIMIZATION', message: '3차 최적화 완료. 비용: 1,150만원 → 1,120만원 (2.6% 추가 절감)' },
						{ time: '2025-01-15 10:25:08', level: 'AI', message: '최적화 수렴 확인. 추가 반복 시 개선 효과 미미 (0.1% 이하) 판단.' },
						{ time: '2025-01-15 10:25:15', level: 'COMPLETE', message: '최적화 프로세스 완료. 총 28.5% 비용 절감, 21.8% 철근량 절감 달성.' },
					].map((log, index) => (
						<div
							key={index}
							className={`p-3 rounded border text-sm ${
								log.level === 'INFO'
									? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
									: log.level === 'ANALYSIS'
									? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200'
									: log.level === 'OPTIMIZATION'
									? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
									: log.level === 'AI'
									? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
									: 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
							}`}
						>
							<div className="flex items-start gap-3">
								<span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 min-w-[140px]">{log.time}</span>
								<span className={`px-2 py-0.5 rounded text-xs font-semibold ${
									log.level === 'INFO'
										? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
										: log.level === 'ANALYSIS'
										? 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300'
										: log.level === 'OPTIMIZATION'
										? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
										: log.level === 'AI'
										? 'bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300'
										: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
								}`}>
									{log.level}
								</span>
								<span className="flex-1">{log.message}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type ProjectType = '아파트' | '복합건물' | '플랜트' | '교량' | '기타';

type CaseStudy = {
	id: string;
	projectName: string;
	client: string;
	projectType: ProjectType;
	date: string;
	// 철근 절감
	rebarReduction: {
		before: number; // ton
		after: number; // ton
		reductionRate: number; // %
		reductionAmount: number; // ton
	};
	// CO₂ 절감
	co2Reduction: {
		before: number; // ton-CO₂e
		after: number; // ton-CO₂e
		reductionAmount: number; // ton-CO₂e
	};
	// RCW 감소
	rcwReduction: {
		before: number; // %
		after: number; // %
		reductionRate: number; // %
	};
	// Coupler/Lap 선택 최적화
	couplerLapOptimization: {
		couplerUsage: {
			before: number; // 개
			after: number; // 개
			change: number; // 개
		};
		lapUsage: {
			before: number; // 개
			after: number; // 개
			change: number; // 개
		};
		costSavings: number; // 원
	};
	// Special-length 발주 최적화
	specialLengthOptimization: {
		before: {
			standardLengths: number; // 개
			specialLengths: number; // 개
			waste: number; // %
		};
		after: {
			standardLengths: number; // 개
			specialLengths: number; // 개
			waste: number; // %
		};
		orderSavings: number; // 원
	};
	// 비용 절감
	costReduction: number; // 원
	// PDF 다운로드
	pdfUrl?: string;
};

export function CaseStudies() {
	const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | 'all'>('all');
	const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

	const caseStudies: CaseStudy[] = [
		{
			id: 'c1',
			projectName: '서울 강남 오피스 빌딩',
			client: 'A건설',
			projectType: '복합건물',
			date: '2024-12',
			rebarReduction: {
				before: 1250.5,
				after: 1144.2,
				reductionRate: 8.5,
				reductionAmount: 106.3,
			},
			co2Reduction: {
				before: 125.5,
				after: 116.5,
				reductionAmount: 9.0,
			},
			rcwReduction: {
				before: 8.5,
				after: 3.2,
				reductionRate: 5.3,
			},
			couplerLapOptimization: {
				couplerUsage: {
					before: 850,
					after: 1200,
					change: 350,
				},
				lapUsage: {
					before: 1200,
					after: 450,
					change: -750,
				},
				costSavings: 12500000,
			},
			specialLengthOptimization: {
				before: {
					standardLengths: 5000,
					specialLengths: 0,
					waste: 8.5,
				},
				after: {
					standardLengths: 2000,
					specialLengths: 3000,
					waste: 3.2,
				},
				orderSavings: 8500000,
			},
			costReduction: 32500000,
			pdfUrl: 'https://example.com/pdfs/case-study-01.pdf',
		},
		{
			id: 'c2',
			projectName: '부산 해운대 아파트',
			client: 'B건설',
			projectType: '아파트',
			date: '2024-11',
			rebarReduction: {
				before: 980.2,
				after: 914.5,
				reductionRate: 6.7,
				reductionAmount: 65.7,
			},
			co2Reduction: {
				before: 98.0,
				after: 91.4,
				reductionAmount: 6.6,
			},
			rcwReduction: {
				before: 7.8,
				after: 2.9,
				reductionRate: 4.9,
			},
			couplerLapOptimization: {
				couplerUsage: {
					before: 650,
					after: 950,
					change: 300,
				},
				lapUsage: {
					before: 950,
					after: 300,
					change: -650,
				},
				costSavings: 9800000,
			},
			specialLengthOptimization: {
				before: {
					standardLengths: 4000,
					specialLengths: 0,
					waste: 7.8,
				},
				after: {
					standardLengths: 1500,
					specialLengths: 2500,
					waste: 2.9,
				},
				orderSavings: 6200000,
			},
			costReduction: 24000000,
			pdfUrl: 'https://example.com/pdfs/case-study-02.pdf',
		},
		{
			id: 'c3',
			projectName: '인천 공항 화물터미널',
			client: 'C건설',
			projectType: '플랜트',
			date: '2024-10',
			rebarReduction: {
				before: 2150.8,
				after: 1952.9,
				reductionRate: 9.2,
				reductionAmount: 197.9,
			},
			co2Reduction: {
				before: 215.1,
				after: 195.3,
				reductionAmount: 19.8,
			},
			rcwReduction: {
				before: 9.2,
				after: 3.5,
				reductionRate: 5.7,
			},
			couplerLapOptimization: {
				couplerUsage: {
					before: 1200,
					after: 1800,
					change: 600,
				},
				lapUsage: {
					before: 1800,
					after: 600,
					change: -1200,
				},
				costSavings: 18500000,
			},
			specialLengthOptimization: {
				before: {
					standardLengths: 8000,
					specialLengths: 0,
					waste: 9.2,
				},
				after: {
					standardLengths: 3000,
					specialLengths: 5000,
					waste: 3.5,
				},
				orderSavings: 12500000,
			},
			costReduction: 38700000,
			pdfUrl: 'https://example.com/pdfs/case-study-03.pdf',
		},
		{
			id: 'c4',
			projectName: '한강대교 확장 공사',
			client: 'D건설',
			projectType: '교량',
			date: '2024-09',
			rebarReduction: {
				before: 1850.3,
				after: 1715.3,
				reductionRate: 7.3,
				reductionAmount: 135.0,
			},
			co2Reduction: {
				before: 185.0,
				after: 171.5,
				reductionAmount: 13.5,
			},
			rcwReduction: {
				before: 8.0,
				after: 3.0,
				reductionRate: 5.0,
			},
			couplerLapOptimization: {
				couplerUsage: {
					before: 1000,
					after: 1500,
					change: 500,
				},
				lapUsage: {
					before: 1500,
					after: 500,
					change: -1000,
				},
				costSavings: 15200000,
			},
			specialLengthOptimization: {
				before: {
					standardLengths: 6000,
					specialLengths: 0,
					waste: 8.0,
				},
				after: {
					standardLengths: 2500,
					specialLengths: 3500,
					waste: 3.0,
				},
				orderSavings: 9800000,
			},
			costReduction: 28200000,
			pdfUrl: 'https://example.com/pdfs/case-study-04.pdf',
		},
	];

	const filteredCaseStudies = selectedProjectType === 'all' ? caseStudies : caseStudies.filter((cs) => cs.projectType === selectedProjectType);

	// 프로젝트 규모별 비교 데이터
	const projectTypeComparison = [
		{
			projectType: '아파트',
			avgRebarReduction: 6.7,
			avgCo2Reduction: 6.6,
			avgRCWReduction: 4.9,
			avgCostReduction: 24000000,
			count: 1,
		},
		{
			projectType: '복합건물',
			avgRebarReduction: 8.5,
			avgCo2Reduction: 9.0,
			avgRCWReduction: 5.3,
			avgCostReduction: 32500000,
			count: 1,
		},
		{
			projectType: '플랜트',
			avgRebarReduction: 9.2,
			avgCo2Reduction: 19.8,
			avgRCWReduction: 5.7,
			avgCostReduction: 38700000,
			count: 1,
		},
		{
			projectType: '교량',
			avgRebarReduction: 7.3,
			avgCo2Reduction: 13.5,
			avgRCWReduction: 5.0,
			avgCostReduction: 28200000,
			count: 1,
		},
	];

	const formatNumber = (num: number) => {
		return num.toLocaleString();
	};

	const handleDownloadPDF = (caseStudy: CaseStudy) => {
		if (caseStudy.pdfUrl) {
			alert(`"${caseStudy.projectName}" AISIMS 도입 효과 요약 PDF 다운로드가 시작됩니다.`);
			// window.open(caseStudy.pdfUrl, '_blank');
		} else {
			alert('PDF 파일이 준비되지 않았습니다.');
		}
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">최적화 성과 사례</h2>

			{/* 프로젝트 규모별 사례 비교 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">프로젝트 규모별 사례 비교</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					아파트, 복합건물, 플랜트, 교량 등 프로젝트 유형별 평균 최적화 성과를 비교합니다.
				</p>
				<div className="h-[400px] mb-4">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={projectTypeComparison}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
							<XAxis dataKey="projectType" stroke="#6b7280" className="dark:stroke-neutral-400" />
							<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: '절감률 (%)', angle: -90, position: 'insideLeft' }} />
							<Tooltip />
							<Legend />
							<Bar dataKey="avgRebarReduction" fill="#3b82f6" name="철근 절감률 (%)" />
							<Bar dataKey="avgRCWReduction" fill="#10b981" name="RCW 감소율 (%)" />
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="h-[400px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={projectTypeComparison}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
							<XAxis dataKey="projectType" stroke="#6b7280" className="dark:stroke-neutral-400" />
							<YAxis stroke="#6b7280" className="dark:stroke-neutral-400" label={{ value: 'CO₂ 절감 (ton-CO₂e)', angle: -90, position: 'insideLeft' }} />
							<Tooltip />
							<Bar dataKey="avgCo2Reduction" fill="#f59e0b" name="CO₂ 절감 (ton-CO₂e)" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* 프로젝트 타입 필터 */}
			<div className="mb-6 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setSelectedProjectType('all')}
					className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
						selectedProjectType === 'all'
							? 'bg-blue-500 text-white'
							: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
					}`}
				>
					전체
				</button>
				{['아파트', '복합건물', '플랜트', '교량'].map((type) => (
					<button
						key={type}
						type="button"
						onClick={() => setSelectedProjectType(type as ProjectType)}
						className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
							selectedProjectType === type
								? 'bg-blue-500 text-white'
								: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
						}`}
					>
						{type}
					</button>
				))}
			</div>

			{/* 실제 프로젝트 기반 사례 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredCaseStudies.map((caseStudy) => (
					<div
						key={caseStudy.id}
						className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow bg-white dark:bg-neutral-800 cursor-pointer"
						onClick={() => setSelectedCase(caseStudy)}
					>
						<div className="mb-3">
							<div className="flex items-center justify-between mb-1">
								<h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{caseStudy.projectName}</h4>
								<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
									{caseStudy.projectType}
								</span>
							</div>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								{caseStudy.client} · {caseStudy.date}
							</p>
						</div>
						<div className="space-y-2 mb-3">
							<div className="flex items-center justify-between text-sm">
								<span className="text-neutral-600 dark:text-neutral-400">철근 절감률</span>
								<span className="font-semibold text-green-600 dark:text-green-400">
									{caseStudy.rebarReduction.reductionRate}%
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-neutral-600 dark:text-neutral-400">CO₂ 절감</span>
								<span className="font-semibold text-orange-600 dark:text-orange-400">
									{caseStudy.co2Reduction.reductionAmount} ton-CO₂e
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-neutral-600 dark:text-neutral-400">RCW 감소</span>
								<span className="font-semibold text-blue-600 dark:text-blue-400">
									{caseStudy.rcwReduction.reductionRate}%p
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-neutral-600 dark:text-neutral-400">비용 절감</span>
								<span className="font-semibold text-purple-600 dark:text-purple-400">
									{formatNumber(caseStudy.costReduction)}원
								</span>
							</div>
						</div>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handleDownloadPDF(caseStudy);
							}}
							className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
						>
							AISIMS 도입 효과 PDF 다운로드
						</button>
					</div>
				))}
			</div>

			{/* 상세 사례 모달 */}
			{selectedCase && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedCase(null)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
										{selectedCase.projectName}
									</h3>
									<div className="flex items-center gap-2">
										<span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											{selectedCase.projectType}
										</span>
										<span className="text-sm text-neutral-600 dark:text-neutral-400">
											{selectedCase.client} · {selectedCase.date}
										</span>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setSelectedCase(null)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* 철근 절감 사례 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">실제 프로젝트 기반 철근 절감 사례</h4>
								<div className="grid grid-cols-2 gap-4 mb-3">
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">기존 철근량</div>
										<div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
											{formatNumber(selectedCase.rebarReduction.before)} ton
										</div>
									</div>
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">최적화 후 철근량</div>
										<div className="text-lg font-bold text-green-600 dark:text-green-400">
											{formatNumber(selectedCase.rebarReduction.after)} ton
										</div>
									</div>
								</div>
								<div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
									<div className="text-sm text-green-800 dark:text-green-200">
										절감량: {formatNumber(selectedCase.rebarReduction.reductionAmount)} ton ({selectedCase.rebarReduction.reductionRate}%)
									</div>
								</div>
							</div>

							{/* CO₂ 절감 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">CO₂ 절감(ton-CO₂e)</h4>
								<div className="grid grid-cols-2 gap-4 mb-3">
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">기존 CO₂ 배출량</div>
										<div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
											{formatNumber(selectedCase.co2Reduction.before)} ton-CO₂e
										</div>
									</div>
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">최적화 후 CO₂ 배출량</div>
										<div className="text-lg font-bold text-orange-600 dark:text-orange-400">
											{formatNumber(selectedCase.co2Reduction.after)} ton-CO₂e
										</div>
									</div>
								</div>
								<div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
									<div className="text-sm text-orange-800 dark:text-orange-200">
										CO₂ 절감량: {formatNumber(selectedCase.co2Reduction.reductionAmount)} ton-CO₂e
									</div>
								</div>
							</div>

							{/* RCW 감소 사례 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">RCW 감소 사례</h4>
								<div className="grid grid-cols-2 gap-4 mb-3">
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">기존 RCW</div>
										<div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
											{selectedCase.rcwReduction.before}%
										</div>
									</div>
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">최적화 후 RCW</div>
										<div className="text-lg font-bold text-blue-600 dark:text-blue-400">
											{selectedCase.rcwReduction.after}%
										</div>
									</div>
								</div>
								<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
									<div className="text-sm text-blue-800 dark:text-blue-200">
										RCW 감소율: {selectedCase.rcwReduction.reductionRate}%p
									</div>
								</div>
							</div>

							{/* Coupler/Lap 선택 최적화 결과 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Coupler/Lap 선택 최적화 결과</h4>
								<div className="grid grid-cols-2 gap-4 mb-3">
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Coupler 사용량</div>
										<div className="text-sm text-neutral-900 dark:text-neutral-100 mb-1">
											기존: {formatNumber(selectedCase.couplerLapOptimization.couplerUsage.before)}개
										</div>
										<div className="text-sm text-green-600 dark:text-green-400 font-medium">
											최적화: {formatNumber(selectedCase.couplerLapOptimization.couplerUsage.after)}개 (+{formatNumber(selectedCase.couplerLapOptimization.couplerUsage.change)}개)
										</div>
									</div>
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Lap 사용량</div>
										<div className="text-sm text-neutral-900 dark:text-neutral-100 mb-1">
											기존: {formatNumber(selectedCase.couplerLapOptimization.lapUsage.before)}개
										</div>
										<div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
											최적화: {formatNumber(selectedCase.couplerLapOptimization.lapUsage.after)}개 ({formatNumber(selectedCase.couplerLapOptimization.lapUsage.change)}개)
										</div>
									</div>
								</div>
								<div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
									<div className="text-sm text-purple-800 dark:text-purple-200">
										비용 절감: {formatNumber(selectedCase.couplerLapOptimization.costSavings)}원
									</div>
								</div>
							</div>

							{/* Special-length 발주 최적화 사례 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Special-length 발주 최적화 사례</h4>
								<div className="grid grid-cols-2 gap-4 mb-3">
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">기존</div>
										<div className="text-xs text-neutral-700 dark:text-neutral-300 mb-1">
											표준 길이: {formatNumber(selectedCase.specialLengthOptimization.before.standardLengths)}개
										</div>
										<div className="text-xs text-neutral-700 dark:text-neutral-300 mb-1">
											Special 길이: {formatNumber(selectedCase.specialLengthOptimization.before.specialLengths)}개
										</div>
										<div className="text-xs text-red-600 dark:text-red-400 font-medium">
											손실률: {selectedCase.specialLengthOptimization.before.waste}%
										</div>
									</div>
									<div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
										<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">최적화 후</div>
										<div className="text-xs text-neutral-700 dark:text-neutral-300 mb-1">
											표준 길이: {formatNumber(selectedCase.specialLengthOptimization.after.standardLengths)}개
										</div>
										<div className="text-xs text-neutral-700 dark:text-neutral-300 mb-1">
											Special 길이: {formatNumber(selectedCase.specialLengthOptimization.after.specialLengths)}개
										</div>
										<div className="text-xs text-green-600 dark:text-green-400 font-medium">
											손실률: {selectedCase.specialLengthOptimization.after.waste}%
										</div>
									</div>
								</div>
								<div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
									<div className="text-sm text-green-800 dark:text-green-200">
										발주 비용 절감: {formatNumber(selectedCase.specialLengthOptimization.orderSavings)}원
									</div>
								</div>
							</div>

							{/* AISIMS 도입 효과 요약 PDF */}
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => handleDownloadPDF(selectedCase)}
									className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors flex items-center gap-2"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									AISIMS 도입 효과 요약 PDF 다운로드
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

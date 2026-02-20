import { useState } from 'react';

type TutorialCategory = 'overview' | 'menu' | 'bim' | 'optimization' | 'scm' | 'collaboration';

type TutorialItem = {
	id: string;
	title: string;
	category: TutorialCategory;
	type: 'video' | 'pdf' | 'image' | 'step-by-step';
	url?: string;
	description: string;
	steps?: string[];
	downloadUrl?: string;
};

export function Tutorial() {
	const [selectedCategory, setSelectedCategory] = useState<TutorialCategory | 'all'>('all');

	// YouTube VIDEO_ID 추출 함수
	const getYouTubeVideoId = (url: string): string | null => {
		const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
		return match ? match[1] : null;
	};

	// YouTube 썸네일 URL 생성
	const getYouTubeThumbnail = (url: string): string => {
		const videoId = getYouTubeVideoId(url);
		if (!videoId) return '';
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	};

	const tutorials: TutorialItem[] = [
		{
			id: 't1',
			title: 'AISIMS 전체 개요 (Architecture 설명 영상)',
			category: 'overview',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=d9uTH4ip_0w',
			description: 'AISIMS 시스템의 전체 아키텍처와 주요 기능을 소개하는 영상입니다.',
			downloadUrl: 'https://example.com/videos/aisims-overview.mp4',
		},
		{
			id: 't2',
			title: '설계정보 메뉴 사용방법',
			category: 'menu',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=8jPQyjjsBzM',
			description: '설계정보 메뉴의 구조설계서, 부재정보, Revision 이력, 물량정보 사용법을 설명합니다.',
			downloadUrl: 'https://example.com/videos/design-info-guide.mp4',
		},
		{
			id: 't3',
			title: '출력도서 메뉴 Step-by-Step 가이드',
			category: 'menu',
			type: 'step-by-step',
			description: '실시도면, BBS, BCL, 내역서 생성 및 다운로드 방법을 단계별로 안내합니다.',
			steps: [
				'1. 출력도서 메뉴 접근',
				'2. 원하는 도서 유형 선택 (실시도면/BBS/BCL/내역서)',
				'3. 프로젝트 및 Revision 선택',
				'4. 생성 옵션 설정',
				'5. 도서 생성 및 다운로드',
			],
			downloadUrl: 'https://example.com/pdfs/output-documents-guide.pdf',
		},
		{
			id: 't4',
			title: 'BIM Viewer 사용 튜토리얼',
			category: 'bim',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=XqZsoesa55w',
			description: 'BIM Viewer의 기본 조작법, 부재 정보 확인, 배근 모드, Clash 시각화 기능을 설명합니다.',
			downloadUrl: 'https://example.com/videos/bim-viewer-tutorial.mp4',
		},
		{
			id: 't5',
			title: 'BIM Viewer 고급 기능 가이드',
			category: 'bim',
			type: 'pdf',
			description: 'BIM Viewer의 고급 기능(Special-length 확인, Revision 비교, Markup 등) 사용법을 설명합니다.',
			downloadUrl: 'https://example.com/pdfs/bim-viewer-advanced.pdf',
		},
		{
			id: 't6',
			title: '최적화 Center 사용법',
			category: 'optimization',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=abc123def456',
			description: '철근 최적화 결과 확인, Special-length 계획, Cutting Pattern, CO₂/RCW/Cost 분석 방법을 안내합니다.',
			downloadUrl: 'https://example.com/videos/optimization-center-guide.mp4',
		},
		{
			id: 't7',
			title: '최적화 프로세스 Step-by-Step',
			category: 'optimization',
			type: 'step-by-step',
			description: '철근 최적화 프로세스를 처음부터 끝까지 단계별로 안내합니다.',
			steps: [
				'1. 최적화 Center 접근',
				'2. 최적화 대상 선택 (부재/Zone/Level)',
				'3. 최적화 조건 설정 (RCW/CO₂/Cost)',
				'4. 최적화 실행',
				'5. 결과 확인 및 비교',
				'6. Revision 승인 요청',
			],
			downloadUrl: 'https://example.com/pdfs/optimization-process.pdf',
		},
		{
			id: 't8',
			title: 'SCM/공정 사용법',
			category: 'scm',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=xyz789ghi012',
			description: '골조 공정 계획, 철근 주문 계획, 가공/납품 현황, 현장 설치 진행 상황 관리 방법을 설명합니다.',
			downloadUrl: 'https://example.com/videos/scm-process-guide.mp4',
		},
		{
			id: 't9',
			title: '공정 계획 Gantt Chart 사용법',
			category: 'scm',
			type: 'pdf',
			description: 'Gantt Chart를 이용한 공정 계획 작성 및 관리 방법을 설명합니다.',
			downloadUrl: 'https://example.com/pdfs/gantt-chart-guide.pdf',
		},
		{
			id: 't10',
			title: '현장요청/Revision 승인 프로세스 안내',
			category: 'collaboration',
			type: 'video',
			url: 'https://www.youtube.com/watch?v=jkl345mno678',
			description: '현장요청 등록부터 Revision 승인까지의 전체 프로세스를 설명합니다.',
			downloadUrl: 'https://example.com/videos/revision-approval-process.mp4',
		},
		{
			id: 't11',
			title: '협업 프로세스 Step-by-Step',
			category: 'collaboration',
			type: 'step-by-step',
			description: '현장요청, 문제 협의, Revision 승인 프로세스를 단계별로 안내합니다.',
			steps: [
				'1. 현장요청 등록 (요청 종류, 중요도 설정)',
				'2. 담당자 배정 및 검토',
				'3. BIM 연동 및 영향 분석',
				'4. Revision 요청 생성',
				'5. 승인자 검토 및 승인/반려',
				'6. 승인 후 자동 처리 (도서 업데이트 등)',
			],
			downloadUrl: 'https://example.com/pdfs/collaboration-process.pdf',
		},
		{
			id: 't12',
			title: 'AISIMS 시스템 아키텍처 다이어그램',
			category: 'overview',
			type: 'image',
			url: 'https://example.com/images/aisims-architecture.png',
			description: 'AISIMS 시스템의 전체 아키텍처를 시각적으로 설명하는 다이어그램입니다.',
			downloadUrl: 'https://example.com/images/aisims-architecture.png',
		},
	];

	const categories = [
		{ id: 'all' as const, label: '전체' },
		{ id: 'overview' as const, label: 'AISIMS 개요' },
		{ id: 'menu' as const, label: '메뉴별 사용법' },
		{ id: 'bim' as const, label: 'BIM Viewer' },
		{ id: 'optimization' as const, label: '최적화 Center' },
		{ id: 'scm' as const, label: 'SCM/공정' },
		{ id: 'collaboration' as const, label: '협업 프로세스' },
	];

	const filteredTutorials = selectedCategory === 'all' ? tutorials : tutorials.filter((t) => t.category === selectedCategory);

	const handleDownload = (item: TutorialItem) => {
		if (item.downloadUrl) {
			// 실제 구현 시에는 다운로드 처리
			alert(`${item.title} 다운로드가 시작됩니다.`);
			// window.open(item.downloadUrl, '_blank');
		} else {
			alert('다운로드 파일이 준비되지 않았습니다.');
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case 'video':
				return '영상';
			case 'pdf':
				return 'PDF';
			case 'image':
				return '이미지';
			case 'step-by-step':
				return 'Step-by-Step';
			default:
				return type;
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'video':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
			case 'pdf':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
			case 'image':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
			case 'step-by-step':
				return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">튜토리얼</h2>

			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<div className="mb-4">
					<h3 className="text-lg font-semibold mb-2">튜토리얼</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						AISIMS 전체 개요 · 메뉴별 사용방법 영상 및 Step-by-Step 예시 · BIM Viewer 사용 튜토리얼 · 최적화 Center 사용법 · SCM/공정 사용법 · 현장요청/Revision 승인 프로세스 안내 · PDF·영상·이미지 모두 다운로드 가능
					</p>
				</div>

				{/* 카테고리 필터 */}
				<div className="mb-6 flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.id}
							type="button"
							onClick={() => setSelectedCategory(category.id)}
							className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
								selectedCategory === category.id
									? 'bg-blue-500 text-white'
									: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
							}`}
						>
							{category.label}
						</button>
					))}
				</div>

				{/* 튜토리얼 목록 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredTutorials.map((tutorial) => (
						<div
							key={tutorial.id}
							className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow bg-white dark:bg-neutral-800"
						>
							<div className="flex items-start justify-between mb-2">
								<h4 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1">{tutorial.title}</h4>
								<span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${getTypeColor(tutorial.type)}`}>
									{getTypeLabel(tutorial.type)}
								</span>
							</div>
							<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{tutorial.description}</p>

							{/* 영상 타입 */}
							{tutorial.type === 'video' && tutorial.url && (
								<div className="mb-3">
									<div className="relative group rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900">
										<img
											src={getYouTubeThumbnail(tutorial.url)}
											alt={tutorial.title}
											className="w-full h-48 object-cover transition-transform group-hover:scale-105"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												const videoId = getYouTubeVideoId(tutorial.url!);
												if (videoId) {
													target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
												}
											}}
										/>
										<a
											href={tutorial.url}
											target="_blank"
											rel="noopener noreferrer"
											className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
										>
											<div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
												<svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z" />
												</svg>
											</div>
										</a>
									</div>
								</div>
							)}

							{/* Step-by-Step 타입 */}
							{tutorial.type === 'step-by-step' && tutorial.steps && (
								<div className="mb-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">단계별 가이드:</div>
									<ul className="space-y-1">
										{tutorial.steps.map((step, index) => (
											<li key={index} className="text-xs text-neutral-600 dark:text-neutral-400">
												{step}
											</li>
										))}
									</ul>
								</div>
							)}

							{/* 이미지 타입 */}
							{tutorial.type === 'image' && tutorial.url && (
								<div className="mb-3">
									<img
										src={tutorial.url}
										alt={tutorial.title}
										className="w-full h-48 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E이미지 로드 실패%3C/text%3E%3C/svg%3E';
										}}
									/>
								</div>
							)}

							{/* 다운로드 버튼 */}
							<div className="flex gap-2">
								{tutorial.type === 'video' && tutorial.url && (
									<a
										href={tutorial.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors text-center"
									>
										영상 보기
									</a>
								)}
								{tutorial.downloadUrl && (
									<button
										type="button"
										onClick={() => handleDownload(tutorial)}
										className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors flex items-center gap-1"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										다운로드
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

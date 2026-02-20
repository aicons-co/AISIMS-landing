export type Project = {
	id: string;
	name: string;
	client: string;
	site: string;
	period: string;
	code: string;
	pm: string;
	progress: number;
	optimizationStage: '설계' | 'BIM 생성' | '철근 최적화' | '문서작성' | 'SCM';
	recentNotices: number;
	feedbackStatus: {
		pending: number;
		inProgress: number;
		completed: number;
	};
};

// 프로젝트 데이터 (실제로는 API에서 가져올 수 있음)
export const projects: Project[] = [
	{ id: 'p1', name: 'A타워 신축', client: 'ACON', site: '서울', period: '2025-01 ~ 2025-12', code: 'ATWR', pm: '김PM', progress: 65, optimizationStage: '철근 최적화', recentNotices: 3, feedbackStatus: { pending: 2, inProgress: 1, completed: 5 } },
	{ id: 'p2', name: 'B물류센터', client: 'BLogi', site: '인천', period: '2025-03 ~ 2026-03', code: 'BLOG', pm: '박PM', progress: 42, optimizationStage: 'BIM 생성', recentNotices: 1, feedbackStatus: { pending: 0, inProgress: 2, completed: 3 } },
	{ id: 'p3', name: 'C아파트 신축', client: 'CDev', site: '부산', period: '2025-02 ~ 2026-02', code: 'CAPT', pm: '이PM', progress: 78, optimizationStage: '문서작성', recentNotices: 5, feedbackStatus: { pending: 1, inProgress: 0, completed: 8 } },
	{ id: 'p4', name: 'D오피스텔', client: 'DOffice', site: '대전', period: '2025-04 ~ 2026-04', code: 'DOFF', pm: '최PM', progress: 35, optimizationStage: '설계', recentNotices: 0, feedbackStatus: { pending: 3, inProgress: 1, completed: 1 } },
	{ id: 'p5', name: 'E쇼핑몰', client: 'EShop', site: '광주', period: '2025-05 ~ 2026-05', code: 'ESHP', pm: '정PM', progress: 90, optimizationStage: 'SCM', recentNotices: 2, feedbackStatus: { pending: 0, inProgress: 0, completed: 12 } },
	{ id: 'p6', name: 'F병원 증축', client: 'FHosp', site: '대구', period: '2025-06 ~ 2026-06', code: 'FHSP', pm: '강PM', progress: 55, optimizationStage: '철근 최적화', recentNotices: 4, feedbackStatus: { pending: 1, inProgress: 3, completed: 4 } },
	{ id: 'p7', name: 'G학교 신축', client: 'GSchool', site: '울산', period: '2025-07 ~ 2026-07', code: 'GSCH', pm: '윤PM', progress: 25, optimizationStage: '설계', recentNotices: 1, feedbackStatus: { pending: 2, inProgress: 0, completed: 2 } },
	{ id: 'p8', name: 'H호텔 리모델링', client: 'HHotel', site: '제주', period: '2025-08 ~ 2026-08', code: 'HHTL', pm: '장PM', progress: 68, optimizationStage: '문서작성', recentNotices: 3, feedbackStatus: { pending: 0, inProgress: 2, completed: 6 } },
	{ id: 'p9', name: 'I공장 신축', client: 'IFact', site: '창원', period: '2025-09 ~ 2026-09', code: 'IFCT', pm: '임PM', progress: 48, optimizationStage: 'BIM 생성', recentNotices: 2, feedbackStatus: { pending: 1, inProgress: 1, completed: 3 } },
	{ id: 'p10', name: 'J레지던스', client: 'JRes', site: '수원', period: '2025-10 ~ 2026-10', code: 'JRES', pm: '한PM', progress: 72, optimizationStage: '철근 최적화', recentNotices: 6, feedbackStatus: { pending: 2, inProgress: 1, completed: 7 } },
	{ id: 'p11', name: 'K빌딩 신축', client: 'KBuild', site: '성남', period: '2025-11 ~ 2026-11', code: 'KBLD', pm: '조PM', progress: 30, optimizationStage: '설계', recentNotices: 0, feedbackStatus: { pending: 4, inProgress: 0, completed: 0 } },
	{ id: 'p12', name: 'L상가 복합', client: 'LShop', site: '고양', period: '2025-12 ~ 2026-12', code: 'LSHP', pm: '오PM', progress: 85, optimizationStage: 'SCM', recentNotices: 4, feedbackStatus: { pending: 0, inProgress: 1, completed: 10 } },
];

export function getProjectById(id: string | undefined): Project | undefined {
	if (!id) return undefined;
	return projects.find((p) => p.id === id);
}


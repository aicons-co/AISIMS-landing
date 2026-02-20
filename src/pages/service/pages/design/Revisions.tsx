type RevisionTimeline = {
	revision: string;
	requestDate: string;
	requester: string;
	approver: string;
	approvalDate: string;
	deploymentDate: string;
	status: '요청' | '승인중' | '승인완료' | '배포완료';
	description: string;
};

type DocumentRevision = {
	documentType: string;
	latestRevision: string;
	changeDate: string;
	approvalStatus: '승인완료' | '검토중' | '대기' | '반려';
};

type MemberRevision = {
	memberId: string;
	memberType: string;
	revision: string;
	changeType: '단면 변경' | '철근 변경' | '위치 변경' | 'Clash 해결 변경';
	changeDetails: string;
	impactAnalysis: {
		bbs: boolean;
		bcl: boolean;
		boq: boolean;
		order: boolean;
		process: boolean;
	};
};

type RevisionAlert = {
	id: string;
	type: '변경사항' | 'Site 변경' | 'Verbal Instruction';
	revision: string;
	document: string;
	alertTime: string;
	status: '읽지않음' | '읽음';
	message: string;
};

export function Revisions() {

	// 1) Revision Timeline
	const revisionTimeline: RevisionTimeline[] = [
		{
			revision: 'R2.0',
			requestDate: '2025-08-05',
			requester: '김설계',
			approver: '이감리',
			approvalDate: '2025-08-10',
			deploymentDate: '2025-08-11',
			status: '배포완료',
			description: '최적화 결과 반영 및 구조 설계 최종 검토',
		},
		{
			revision: 'R1.3',
			requestDate: '2025-09-01',
			requester: '박설계',
			approver: '이감리',
			approvalDate: '-',
			deploymentDate: '-',
			status: '승인중',
			description: '상세도면 수정사항 반영',
		},
		{
			revision: 'R1.2',
			requestDate: '2025-07-20',
			requester: '최설계',
			approver: '이감리',
			approvalDate: '2025-07-25',
			deploymentDate: '2025-07-26',
			status: '배포완료',
			description: '1층 구조 설계 수정',
		},
		{
			revision: 'R1.1',
			requestDate: '2025-06-15',
			requester: '김설계',
			approver: '이감리',
			approvalDate: '2025-06-18',
			deploymentDate: '2025-06-19',
			status: '배포완료',
			description: '기초 설계 변경',
		},
		{
			revision: 'R1.0',
			requestDate: '2025-05-01',
			requester: '김설계',
			approver: '이감리',
			approvalDate: '2025-05-05',
			deploymentDate: '2025-05-06',
			status: '배포완료',
			description: '초기 설계안',
		},
	];

	// 2) 도서별 Revision Status
	const documentRevisions: DocumentRevision[] = [
		{ documentType: 'BIM', latestRevision: 'R2.0', changeDate: '2025-08-11', approvalStatus: '승인완료' },
		{ documentType: '구조설계서', latestRevision: 'R2.0', changeDate: '2025-08-11', approvalStatus: '승인완료' },
		{ documentType: '상세도면', latestRevision: 'R1.3', changeDate: '2025-09-02', approvalStatus: '검토중' },
		{ documentType: 'Shop Drawing', latestRevision: 'R1.2', changeDate: '2025-07-26', approvalStatus: '승인완료' },
		{ documentType: 'BBS', latestRevision: 'R2.0', changeDate: '2025-08-11', approvalStatus: '승인완료' },
		{ documentType: '내역서', latestRevision: 'R2.0', changeDate: '2025-08-11', approvalStatus: '승인완료' },
	];

	// 3) 부재별 Revision 정보
	const memberRevisions: MemberRevision[] = [
		{
			memberId: 'C-001',
			memberType: '기둥',
			revision: 'R2.0',
			changeType: '단면 변경',
			changeDetails: '600×600 → 700×700',
			impactAnalysis: {
				bbs: true,
				bcl: true,
				boq: true,
				order: true,
				process: false,
			},
		},
		{
			memberId: 'B-012',
			memberType: '보',
			revision: 'R1.3',
			changeType: '철근 변경',
			changeDetails: 'D22@8 → D25@8 (Dia/수량 변경)',
			impactAnalysis: {
				bbs: true,
				bcl: true,
				boq: true,
				order: true,
				process: true,
			},
		},
		{
			memberId: 'W-031',
			memberType: '벽',
			revision: 'R1.2',
			changeType: '위치 변경',
			changeDetails: 'Level: 2F → 3F, Grid: A-3 → B-3',
			impactAnalysis: {
				bbs: false,
				bcl: true,
				boq: false,
				order: false,
				process: true,
			},
		},
		{
			memberId: 'F-005',
			memberType: '기초',
			revision: 'R2.0',
			changeType: 'Clash 해결 변경',
			changeDetails: '배관과의 Clash 해결을 위한 위치 조정',
			impactAnalysis: {
				bbs: true,
				bcl: true,
				boq: true,
				order: true,
				process: true,
			},
		},
	];

	// 4) Revision 알림
	const revisionAlerts: RevisionAlert[] = [
		{
			id: 'alert-001',
			type: '변경사항',
			revision: 'R2.0',
			document: '구조설계서',
			alertTime: '2025-08-11 14:30',
			status: '읽지않음',
			message: '구조설계서 R2.0이 배포되었습니다.',
		},
		{
			id: 'alert-002',
			type: 'Site 변경',
			revision: 'R1.3',
			document: '상세도면',
			alertTime: '2025-09-02 09:15',
			status: '읽지않음',
			message: '현장에서 상세도면 R1.3 변경 요청이 발생했습니다.',
		},
		{
			id: 'alert-003',
			type: 'Verbal Instruction',
			revision: '-',
			document: 'BIM',
			alertTime: '2025-09-03 11:20',
			status: '읽음',
			message: '현장 구두 지시사항: 3층 기둥 위치 조정 필요',
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case '배포완료':
			case '승인완료':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700';
			case '승인중':
			case '검토중':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700';
			case '대기':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700';
			case '반려':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700';
			default:
				return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700';
		}
	};

	const getAlertTypeColor = (type: string) => {
		switch (type) {
			case '변경사항':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
			case 'Site 변경':
				return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400';
			case 'Verbal Instruction':
				return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
			default:
				return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400';
		}
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">Revision 이력</h2>

			{/* 1) Revision Timeline */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
				<h3 className="text-lg font-semibold mb-4">1) Revision Timeline</h3>
				<div className="space-y-4">
					{revisionTimeline.map((rev, index) => (
						<div
							key={index}
							className="relative pl-8 pb-6 border-l-2 border-neutral-300 dark:border-neutral-700 last:border-l-0 last:pb-0"
						>
							<div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="px-3 py-1 rounded text-sm font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
											{rev.revision}
										</span>
										<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(rev.status)}`}>
											{rev.status}
										</span>
									</div>
									<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{rev.description}</p>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
										<div className="flex items-center gap-2">
											<span className="text-neutral-500 dark:text-neutral-400">변경 요청자:</span>
											<span className="font-medium">{rev.requester}</span>
											<span className="text-neutral-400 dark:text-neutral-500">({rev.requestDate})</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-neutral-500 dark:text-neutral-400">승인자:</span>
											<span className="font-medium">{rev.approver}</span>
											{rev.approvalDate !== '-' && (
												<span className="text-neutral-400 dark:text-neutral-500">({rev.approvalDate})</span>
											)}
										</div>
										<div className="flex items-center gap-2">
											<span className="text-neutral-500 dark:text-neutral-400">배포 일시:</span>
											<span className="font-medium">{rev.deploymentDate !== '-' ? rev.deploymentDate : '미배포'}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 2) 도서별 Revision Status */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
				<h3 className="text-lg font-semibold mb-4">2) 도서별 Revision Status</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">문서 종류</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">최신 Revision</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경일시</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">승인여부</th>
							</tr>
						</thead>
						<tbody>
							{documentRevisions.map((doc, index) => (
								<tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{doc.documentType}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">
										<span className="px-2 py-1 rounded text-xs font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											{doc.latestRevision}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{doc.changeDate}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">
										<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(doc.approvalStatus)}`}>
											{doc.approvalStatus}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* 3) 부재별 Revision 정보 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-8">
				<h3 className="text-lg font-semibold mb-4">3) 부재별 Revision 정보</h3>
				<div className="mb-4">
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						변경된 부재 목록 자동 하이라이트 및 AI 기반 "변경 영향도 분석"
					</p>
				</div>
				<div className="space-y-4">
					{memberRevisions.map((member, index) => (
						<div
							key={index}
							className="p-4 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10"
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="px-3 py-1 rounded text-sm font-semibold bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100">
											{member.memberId} ({member.memberType})
										</span>
										<span className="px-2 py-1 rounded text-xs font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											{member.revision}
										</span>
										<span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
											{member.changeType}
										</span>
									</div>
									<p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{member.changeDetails}</p>
									<div className="mt-3">
										<div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
											AI 기반 변경 영향도 분석:
										</div>
										<div className="flex flex-wrap gap-2">
											{member.impactAnalysis.bbs && (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">
													BBS 영향
												</span>
											)}
											{member.impactAnalysis.bcl && (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">
													BCL 영향
												</span>
											)}
											{member.impactAnalysis.boq && (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">
													BOQ 영향
												</span>
											)}
											{member.impactAnalysis.order && (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">
													발주 영향
												</span>
											)}
											{member.impactAnalysis.process && (
												<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">
													공정 영향
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 4) Revision 알림 기능 */}
			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">4) Revision 알림 기능</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Client가 현장에서 실시간으로 변경 사항 체크 가능 및 설치 중 Site에서 변경 발생 시 Alarm
				</p>
				<div className="space-y-3">
					{revisionAlerts.map((alert) => (
						<div
							key={alert.id}
							className={`p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 ${
								alert.status === '읽지않음' ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-300 dark:border-blue-700' : ''
							}`}
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className={`px-2 py-1 rounded text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
											{alert.type}
										</span>
										{alert.revision !== '-' && (
											<span className="px-2 py-1 rounded text-xs font-mono bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
												{alert.revision}
											</span>
										)}
										<span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{alert.document}</span>
										{alert.status === '읽지않음' && (
											<span className="w-2 h-2 bg-red-500 rounded-full"></span>
										)}
									</div>
									<p className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">{alert.message}</p>
									<p className="text-xs text-neutral-500 dark:text-neutral-400">{alert.alertTime}</p>
								</div>
								<div className="ml-4">
									<span
										className={`px-2 py-1 rounded text-xs ${
											alert.status === '읽지않음'
												? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
												: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
										}`}
									>
										{alert.status}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

import { useState } from 'react';

type Discipline = 'Structure' | 'MEP' | 'Architectural' | 'Rebar';

type Severity = 'Critical' | 'Major' | 'Minor';

type IssueStatus = 'Open' | 'In-progress' | 'Resolved' | 'Closed';

type Issue = {
	id: string;
	location: string; // Level/Grid/Member
	discipline: Discipline;
	hasClash: boolean;
	clashId?: string;
	severity: Severity;
	status: IssueStatus;
	description: string;
	createdDate: string;
	diagnosis?: {
		solution: string;
		recommendation: string;
	};
	participants: {
		name: string;
		role: string;
		comment: string;
		date: string;
	}[];
	resolution?: {
		result: string;
		dueDate: string;
		delayDays?: number;
		attachments?: string[];
	};
	revisionLink?: string;
};

export function IssueDiscussion() {
	const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
	const [newComment, setNewComment] = useState('');

	const [issues, setIssues] = useState<Issue[]>([
		{
			id: 'ISS-001',
			location: '3F / Grid A-3 / Beam B402',
			discipline: 'Structure',
			hasClash: true,
			clashId: 'CLASH-2025-001',
			severity: 'Critical',
			status: 'In-progress',
			description: 'Beam B402와 Duct M-23 간 배근 간섭 발생',
			createdDate: '2025-03-15 10:30',
			diagnosis: {
				solution: 'Coupler 위치 이동 필요',
				recommendation: 'Beam B402의 Coupler를 50cm 상향 이동하여 Duct와 간섭 해결',
			},
			participants: [
				{ name: '김설계', role: '설계팀', comment: 'Coupler 위치 변경 가능, 구조 검토 필요', date: '2025-03-15 11:00' },
				{ name: '이MEP', role: 'MEP팀', comment: 'Duct 경로 변경 검토 중', date: '2025-03-15 14:00' },
			],
			resolution: {
				result: 'Coupler 위치 변경으로 해결 예정',
				dueDate: '2025-03-20',
				delayDays: 0,
			},
		},
		{
			id: 'ISS-002',
			location: '4F / Grid B-5 / Column C205',
			discipline: 'Rebar',
			hasClash: false,
			severity: 'Major',
			status: 'Open',
			description: 'Lap 길이 부족, 설계 기준 미달',
			createdDate: '2025-03-16 09:15',
			diagnosis: {
				solution: 'Lap 길이 부족',
				recommendation: 'Lap 길이를 40d에서 50d로 증가 필요',
			},
			participants: [],
		},
		{
			id: 'ISS-003',
			location: '5F / Grid C-2 / Slab S301',
			discipline: 'MEP',
			hasClash: true,
			clashId: 'CLASH-2025-002',
			severity: 'Major',
			status: 'Resolved',
			description: '타 Duct 우회 필요',
			createdDate: '2025-03-14 16:20',
			diagnosis: {
				solution: '타 Duct 우회 필요',
				recommendation: 'Duct 경로를 우회하여 설치',
			},
			participants: [
				{ name: '박MEP', role: 'MEP팀', comment: 'Duct 경로 변경 완료', date: '2025-03-15 10:00' },
			],
			resolution: {
				result: 'Duct 경로 변경으로 해결 완료',
				dueDate: '2025-03-15',
				attachments: ['duct-routing.pdf'],
			},
			revisionLink: '/collaboration/revision-approval',
		},
		{
			id: 'ISS-004',
			location: '2F / Grid A-1 / Wall W101',
			discipline: 'Structure',
			hasClash: false,
			severity: 'Minor',
			status: 'Closed',
			description: '벽체 철근 배근 간격 조정',
			createdDate: '2025-03-10 11:30',
			participants: [
				{ name: '최설계', role: '설계팀', comment: '배근 간격 조정 완료', date: '2025-03-11 09:00' },
			],
			resolution: {
				result: '배근 간격 조정 완료',
				dueDate: '2025-03-11',
			},
			revisionLink: '/collaboration/revision-approval',
		},
	]);

	const getSeverityColor = (severity: Severity) => {
		switch (severity) {
			case 'Critical':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
			case 'Major':
				return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700';
			case 'Minor':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700';
		}
	};

	const getStatusColor = (status: IssueStatus) => {
		switch (status) {
			case 'Closed':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case 'Resolved':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
			case 'In-progress':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'Open':
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const handleCommentSubmit = (issueId: string) => {
		if (!newComment.trim()) {
			alert('댓글을 입력해주세요.');
			return;
		}

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const date = `${year}-${month}-${day} ${hour}:${minute}`;

		setIssues((prev) =>
			prev.map((issue) =>
				issue.id === issueId
					? {
							...issue,
							participants: [
								...issue.participants,
								{ name: '현재 사용자', role: '참여자', comment: newComment, date: date },
							],
						}
					: issue
			)
		);
		setNewComment('');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">문제 협의</h2>

			{/* A. Issue 관리 테이블 */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. Issue 관리 테이블</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Issue ID · 발생 위치(Level/Grid/Member) · 관련 discipline(Structure/MEP/Architectural 등) · Clash 여부 · 심각도(Critical/Major/Minor) · 상태 (Open / In-progress / Resolved / Closed)
				</p>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Issue ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">발생 위치</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Discipline</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Clash</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">심각도</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">작업</th>
							</tr>
						</thead>
						<tbody>
							{issues.map((issue) => (
								<tr
									key={issue.id}
									onClick={() => setSelectedIssue(issue)}
									className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono text-xs">{issue.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{issue.location}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700">{issue.discipline}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										{issue.hasClash ? (
											<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
												있음
											</span>
										) : (
											<span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
												없음
											</span>
										)}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className={`px-2 py-1 rounded text-xs border ${getSeverityColor(issue.severity)}`}>
											{issue.severity}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className={`px-2 py-1 rounded text-xs ${getStatusColor(issue.status)}`}>{issue.status}</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												setSelectedIssue(issue);
											}}
											className="px-2 py-1 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
										>
											상세
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Issue 상세보기 모달 */}
			{selectedIssue && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedIssue(null)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{selectedIssue.id}</h3>
									<div className="flex items-center gap-2">
										<span className={`px-2 py-1 rounded text-xs border ${getSeverityColor(selectedIssue.severity)}`}>
											{selectedIssue.severity}
										</span>
										<span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedIssue.status)}`}>{selectedIssue.status}</span>
										<span className="text-xs text-neutral-500 dark:text-neutral-400">{selectedIssue.discipline}</span>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setSelectedIssue(null)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* 기본 정보 */}
							<div className="mb-4 pb-4 border-b border-neutral-300 dark:border-neutral-700">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="text-neutral-600 dark:text-neutral-400">발생 위치: </span>
										<span className="font-medium">{selectedIssue.location}</span>
									</div>
									<div>
										<span className="text-neutral-600 dark:text-neutral-400">생성일: </span>
										<span className="font-medium">{selectedIssue.createdDate}</span>
									</div>
								</div>
								<div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{selectedIssue.description}</div>
							</div>

							{/* B. BIM 기반 진단(Automatic Diagnosis) */}
							{selectedIssue.diagnosis && (
								<div className="mb-4">
									<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">B. BIM 기반 진단(Automatic Diagnosis)</h4>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
										<div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">AISIMS 자동 분석 추천 해결안</div>
										<div className="text-sm text-blue-800 dark:text-blue-200 mb-1">
											<strong>해결안:</strong> {selectedIssue.diagnosis.solution}
										</div>
										<div className="text-sm text-blue-800 dark:text-blue-200">
											<strong>추천사항:</strong> {selectedIssue.diagnosis.recommendation}
										</div>
										<div className="mt-3">
											<button
												type="button"
												onClick={() => {
													window.location.href = `/opt/bim?issueId=${selectedIssue.id}&clashId=${selectedIssue.clashId || ''}`;
												}}
												className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
											>
												3D Viewer에서 Issue 마킹 (Markup 기능)
											</button>
										</div>
									</div>
								</div>
							)}

							{/* C. 협의 기록(Log) */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">C. 협의 기록(Log)</h4>
								<div className="space-y-3 mb-4">
									{selectedIssue.participants.map((participant, index) => (
										<div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
											<div className="flex items-center gap-2 mb-1">
												<span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{participant.name}</span>
												<span className="text-xs text-neutral-500 dark:text-neutral-400">({participant.role})</span>
												<span className="text-xs text-neutral-500 dark:text-neutral-400">{participant.date}</span>
											</div>
											<div className="text-sm text-neutral-700 dark:text-neutral-300">{participant.comment}</div>
										</div>
									))}
								</div>
								<div className="flex gap-2">
									<textarea
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										rows={3}
										className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 resize-none"
										placeholder="협의 의견을 입력하세요"
									/>
									<button
										type="button"
										onClick={() => handleCommentSubmit(selectedIssue.id)}
										className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
									>
										등록
									</button>
								</div>
								{selectedIssue.resolution && (
									<div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
										<div className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">협의 결과</div>
										<div className="text-sm text-green-800 dark:text-green-200 mb-1">{selectedIssue.resolution.result}</div>
										<div className="text-xs text-green-700 dark:text-green-300">
											해결 기한: {selectedIssue.resolution.dueDate}
											{selectedIssue.resolution.delayDays && selectedIssue.resolution.delayDays > 0 && (
												<span className="ml-2 text-red-600 dark:text-red-400">(지연 {selectedIssue.resolution.delayDays}일)</span>
											)}
										</div>
										{selectedIssue.resolution.attachments && selectedIssue.resolution.attachments.length > 0 && (
											<div className="mt-2 text-xs text-green-700 dark:text-green-300">
												추가 자료: {selectedIssue.resolution.attachments.join(', ')}
											</div>
										)}
									</div>
								)}
							</div>

							{/* D. Revision 연동 */}
							{selectedIssue.revisionLink ? (
								<div className="mb-4">
									<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">D. Revision 연동</h4>
									<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
										<div className="text-sm text-green-800 dark:text-green-200 mb-2">문제 해결 → 자동 Revision 요청 생성 완료</div>
										<button
											type="button"
											onClick={() => {
												window.location.href = selectedIssue.revisionLink || '/collaboration/revision-approval';
											}}
											className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
										>
											Revision 승인 메뉴로 이동
										</button>
									</div>
								</div>
							) : selectedIssue.status === 'Resolved' && (
								<div className="mb-4">
									<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">D. Revision 연동</h4>
									<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
										<button
											type="button"
											onClick={() => {
												alert('Revision 요청 생성');
												setSelectedIssue({ ...selectedIssue, revisionLink: '/collaboration/revision-approval' });
											}}
											className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm transition-colors"
										>
											Revision 요청 생성
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

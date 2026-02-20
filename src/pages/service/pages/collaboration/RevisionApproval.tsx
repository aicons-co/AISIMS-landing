import { useState } from 'react';

type DocumentType = '실시도면' | 'SD' | 'BBS' | 'BCL' | 'BOQ';

type RevisionRequest = {
	id: string;
	revision: string; // R3.1 등
	changedDocuments: DocumentType[];
	changeItems: {
		type: string;
		before: string;
		after: string;
		highlight: boolean;
	}[];
	changeReason: string;
	impactAnalysis: {
		quantity: string;
		process: string;
		cost: string;
	};
	status: '대기' | '승인' | '반려' | '재요청';
	submitDate: string;
	submitter: string;
	approvals: {
		role: '발주처' | '감리';
		approver?: string;
		status: '대기' | '승인' | '반려';
		date?: string;
		comment?: string;
		signature?: string; // 전자서명 또는 승인 로그
	}[];
	auditLog: {
		action: '승인' | '반려' | '재요청';
		approver: string;
		date: string;
		comment?: string;
	}[];
};

export function RevisionApproval() {
	const [selectedRevision, setSelectedRevision] = useState<RevisionRequest | null>(null);

	const [revisions, setRevisions] = useState<RevisionRequest[]>([
		{
			id: 'REV-001',
			revision: 'R3.1',
			changedDocuments: ['실시도면', 'BBS', 'BCL', 'BOQ'],
			changeItems: [
				{ type: '철근량', before: 'D25@8', after: 'D25@7', highlight: true },
				{ type: '부재 크기', before: '600×600', after: '550×550', highlight: true },
				{ type: 'Coupler', before: 'Type A', after: 'Type B', highlight: false },
			],
			changeReason: '시공성 개선 및 자재 최적화',
			impactAnalysis: {
				quantity: '철근량 -5.0ton, Coupler 수량 변경',
				process: '공정 영향 없음',
				cost: '비용 절감 2,500,000원',
			},
			status: '대기',
			submitDate: '2025-03-15',
			submitter: '박설계',
			approvals: [
				{ role: '발주처', status: '대기' },
				{ role: '감리', status: '대기' },
			],
			auditLog: [],
		},
		{
			id: 'REV-002',
			revision: 'R2.1',
			changedDocuments: ['실시도면', 'SD', 'BBS'],
			changeItems: [
				{ type: '슬래브 두께', before: '250mm', after: '300mm', highlight: true },
				{ type: '철근 배근', before: 'D10@200', after: 'D10@150', highlight: true },
			],
			changeReason: '하중 증가에 따른 설계 변경',
			impactAnalysis: {
				quantity: '콘크리트 +15.5m³, 철근 +2.3ton',
				process: '공정 지연 2일 예상',
				cost: '비용 증가 3,200,000원',
			},
			status: '승인',
			submitDate: '2025-03-10',
			submitter: '이설계',
			approvals: [
				{ role: '발주처', approver: '김발주', status: '승인', date: '2025-03-11 10:00', signature: '전자서명' },
				{ role: '감리', approver: '박감리', status: '승인', date: '2025-03-11 14:00', signature: '전자서명' },
			],
			auditLog: [
				{ action: '승인', approver: '김발주', date: '2025-03-11 10:00' },
				{ action: '승인', approver: '박감리', date: '2025-03-11 14:00' },
			],
		},
		{
			id: 'REV-003',
			revision: 'R1.2',
			changedDocuments: ['실시도면'],
			changeItems: [
				{ type: '기둥 단면', before: '600×600', after: '550×550', highlight: true },
			],
			changeReason: '설계 오류 수정',
			impactAnalysis: {
				quantity: '콘크리트 -2.5m³, 철근 -0.8ton',
				process: '공정 영향 없음',
				cost: '비용 절감 850,000원',
			},
			status: '반려',
			submitDate: '2025-03-05',
			submitter: '최설계',
			approvals: [
				{ role: '발주처', status: '대기' },
				{ role: '감리', approver: '이감리', status: '반려', date: '2025-03-06', comment: '안전계수 기준 미달' },
			],
			auditLog: [
				{ action: '반려', approver: '이감리', date: '2025-03-06', comment: '안전계수 기준 미달' },
			],
		},
	]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case '승인':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
			case '대기':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
			case '반려':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
			case '재요청':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700';
		}
	};

	const handleApprove = (revisionId: string, role: '발주처' | '감리', action: '승인' | '반려' | '재요청') => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const date = `${year}-${month}-${day} ${hour}:${minute}`;

		setRevisions((prev) =>
			prev.map((rev) => {
				if (rev.id === revisionId) {
					const updatedApprovals = rev.approvals.map((app) =>
						app.role === role
							? {
									...app,
									status: (action === '재요청' ? '대기' : action) as '대기' | '승인' | '반려',
									approver: '현재 사용자',
									date: date,
									signature: '전자서명',
								}
							: app
					);
					const allApproved = updatedApprovals.every((app) => app.status === '승인');
					const anyRejected = updatedApprovals.some((app) => app.status === '반려');

					return {
						...rev,
						approvals: updatedApprovals,
						status: allApproved ? '승인' : anyRejected ? '반려' : rev.status,
						auditLog: [
							...rev.auditLog,
							{ action: action === '재요청' ? '재요청' : action, approver: '현재 사용자', date: date },
						],
					};
				}
				return rev;
			})
		);
		alert(`${action} 처리되었습니다.`);
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">Revision 승인</h2>

			{/* A. Revision Request List */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">A. Revision Request List</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					Revision 번호(R3.1 등) · 변경된 도서(실시도면/SD/BBS/BCL/BOQ) · 변경 항목(diff highlight auto) · 변경 사유 및 영향 분석(물량/공정/비용)
				</p>
				<div className="space-y-4">
					{revisions.map((revision) => (
						<div
							key={revision.id}
							onClick={() => setSelectedRevision(revision)}
							className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-pointer"
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="px-3 py-1 rounded font-mono text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
											{revision.revision}
										</span>
										<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(revision.status)}`}>
											{revision.status}
										</span>
									</div>
									<div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
										변경된 도서: {revision.changedDocuments.join(', ')}
									</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">{revision.changeReason}</div>
									<div className="text-xs text-neutral-500 dark:text-neutral-400">
										제출자: {revision.submitter} · 제출일: {revision.submitDate}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Revision 상세보기 모달 */}
			{selectedRevision && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedRevision(null)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
										Revision {selectedRevision.revision}
									</h3>
									<div className="flex items-center gap-2">
										<span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedRevision.status)}`}>
											{selectedRevision.status}
										</span>
										<span className="text-sm text-neutral-600 dark:text-neutral-400">
											변경된 도서: {selectedRevision.changedDocuments.join(', ')}
										</span>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setSelectedRevision(null)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* 변경 항목 (diff highlight) */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">변경 항목</h4>
								<div className="overflow-x-auto">
									<table className="w-full border-collapse text-sm">
										<thead>
											<tr className="bg-neutral-100 dark:bg-neutral-800">
												<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">항목</th>
												<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 전</th>
												<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">변경 후</th>
											</tr>
										</thead>
										<tbody>
											{selectedRevision.changeItems.map((item, index) => (
												<tr
													key={index}
													className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
														item.highlight ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
													}`}
												>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{item.type}</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														<span className="line-through text-red-600 dark:text-red-400">{item.before}</span>
													</td>
													<td className="p-3 border border-neutral-300 dark:border-neutral-700">
														<span className="text-green-600 dark:text-green-400 font-medium">{item.after}</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* 변경 사유 및 영향 분석 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">변경 사유 및 영향 분석</h4>
								<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 mb-3">
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">변경 사유</div>
									<div className="text-sm text-neutral-700 dark:text-neutral-300">{selectedRevision.changeReason}</div>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
										<div className="text-xs text-blue-600 dark:text-blue-400 mb-1">물량 영향</div>
										<div className="text-sm font-medium text-blue-900 dark:text-blue-100">{selectedRevision.impactAnalysis.quantity}</div>
									</div>
									<div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
										<div className="text-xs text-purple-600 dark:text-purple-400 mb-1">공정 영향</div>
										<div className="text-sm font-medium text-purple-900 dark:text-purple-100">{selectedRevision.impactAnalysis.process}</div>
									</div>
									<div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
										<div className="text-xs text-green-600 dark:text-green-400 mb-1">비용 영향</div>
										<div className="text-sm font-medium text-green-900 dark:text-green-100">{selectedRevision.impactAnalysis.cost}</div>
									</div>
								</div>
							</div>

							{/* B. BIM 연동된 Revision Preview */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">B. BIM 연동된 Revision Preview</h4>
								<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
									<div className="text-sm text-blue-800 dark:text-blue-200 mb-3">
										Before/After 비교 · 변경된 부재 및 철근 Highlight · 변경된 Cutting Pattern / 발주물량 자동 표시
									</div>
									<button
										type="button"
										onClick={() => {
											window.location.href = `/opt/bim?revision=${selectedRevision.revision}&preview=true`;
										}}
										className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
									>
										BIM Viewer에서 Before/After 비교
									</button>
								</div>
							</div>

							{/* C. 승인 프로세스 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">C. 승인 프로세스</h4>
								<div className="grid grid-cols-2 gap-4">
									{selectedRevision.approvals.map((approval) => (
										<div
											key={approval.role}
											className={`p-4 rounded-lg border-2 ${
												approval.status === '승인'
													? 'border-green-500 bg-green-50 dark:bg-green-900/10'
													: approval.status === '반려'
														? 'border-red-500 bg-red-50 dark:bg-red-900/10'
														: 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
											}`}
										>
											<div className="flex items-center justify-between mb-3">
												<span className="font-semibold text-neutral-900 dark:text-neutral-100">{approval.role}</span>
												<span
													className={`px-2 py-1 rounded text-xs font-medium ${
														approval.status === '승인'
															? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
															: approval.status === '반려'
																? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
																: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
													}`}
												>
													{approval.status}
												</span>
											</div>
											{approval.approver && (
												<div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">결재자: {approval.approver}</div>
											)}
											{approval.date && (
												<div className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">{approval.date}</div>
											)}
											{approval.signature && (
												<div className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">서명: {approval.signature}</div>
											)}
											{approval.comment && (
												<div className="mt-2 p-2 bg-white dark:bg-neutral-800 rounded text-xs text-neutral-700 dark:text-neutral-300">
													의견: {approval.comment}
												</div>
											)}
											{approval.status === '대기' && (
												<div className="mt-3 flex gap-2">
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															handleApprove(selectedRevision.id, approval.role, '승인');
														}}
														className="px-3 py-1.5 rounded text-xs bg-green-500 hover:bg-green-600 text-white transition-colors"
													>
														승인
													</button>
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															handleApprove(selectedRevision.id, approval.role, '반려');
														}}
														className="px-3 py-1.5 rounded text-xs bg-red-500 hover:bg-red-600 text-white transition-colors"
													>
														반려
													</button>
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															handleApprove(selectedRevision.id, approval.role, '재요청');
														}}
														className="px-3 py-1.5 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
													>
														재요청
													</button>
												</div>
											)}
										</div>
									))}
								</div>
								{selectedRevision.status === '승인' && (
									<div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
										<div className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">승인 후 자동 처리:</div>
										<ul className="text-xs text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
											<li>도서 업데이트</li>
											<li>물량·BBS·BCL 자동 재생성</li>
											<li>발주/공정/SCM 연계 데이터 업데이트</li>
											<li>Revision History 갱신</li>
										</ul>
									</div>
								)}
							</div>

							{/* D. 감사(Audit) 관리 */}
							<div>
								<h4 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">D. 감사(Audit) 관리</h4>
								<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
									<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">승인/반려 이력</div>
									<div className="space-y-2">
										{selectedRevision.auditLog.map((log, index) => (
											<div key={index} className="p-2 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
												<div className="flex items-center gap-2 mb-1">
													<span
														className={`px-2 py-1 rounded text-xs ${
															log.action === '승인'
																? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
																: log.action === '반려'
																	? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
																	: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
														}`}
													>
														{log.action}
													</span>
													<span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">{log.approver}</span>
													<span className="text-xs text-neutral-500 dark:text-neutral-400">{log.date}</span>
												</div>
												{log.comment && (
													<div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{log.comment}</div>
												)}
											</div>
										))}
									</div>
									<button
										type="button"
										onClick={() => alert('PDF 승인서 생성')}
										className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
									>
										PDF 승인서 자동 생성
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

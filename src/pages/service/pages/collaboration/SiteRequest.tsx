import { useState } from 'react';

type RequestType = 'design-change' | 'constructability' | 'material-change' | 'urgent-issue';

type SiteRequest = {
	id: string;
	type: RequestType;
	title: string;
	description: string;
	priority: 1 | 2 | 3; // Level 1~3
	requester: string;
	affiliation: string;
	requestDate: string;
	status: '등록됨' | '검토 중' | '회신' | '완료';
	assignee?: string;
	assigneeTeam?: '설계팀' | 'MEP' | '시공팀' | '기타';
	dueDate?: string;
	delayDays?: number;
	attachments?: string[];
	relatedMembers?: string[];
	clashIds?: string[];
	impactAnalysis?: {
		quantity: string;
		order: string;
		process: string;
	};
	revisionLink?: string;
};

export function SiteRequest() {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<SiteRequest | null>(null);
	const [createForm, setCreateForm] = useState({
		type: 'design-change' as RequestType,
		title: '',
		description: '',
		priority: 2 as 1 | 2 | 3,
		attachments: [] as string[],
	});

	const [requests, setRequests] = useState<SiteRequest[]>([
		{
			id: 'SR-001',
			type: 'design-change',
			title: '3F 기둥 철근량 변경 요청',
			description: '3F 기둥 C-101의 철근량을 D25@8에서 D25@7로 변경 요청',
			priority: 2,
			requester: '김현장',
			affiliation: '시공팀',
			requestDate: '2025-03-15 10:30',
			status: '검토 중',
			assignee: '박설계',
			assigneeTeam: '설계팀',
			dueDate: '2025-03-20',
			relatedMembers: ['C-101'],
			impactAnalysis: {
				quantity: '철근량 -0.5ton',
				order: '발주량 조정 필요',
				process: '공정 영향 없음',
			},
		},
		{
			id: 'SR-002',
			type: 'constructability',
			title: 'Beam B402 배근 간섭 해결 요청',
			description: 'Beam B402와 Duct M-23 간 배근 간섭 발생, 설치 공간 부족',
			priority: 1,
			requester: '이시공',
			affiliation: '시공팀',
			requestDate: '2025-03-16 14:20',
			status: '등록됨',
			assignee: '최MEP',
			assigneeTeam: 'MEP',
			dueDate: '2025-03-18',
			relatedMembers: ['B-402'],
			clashIds: ['CLASH-2025-001'],
			impactAnalysis: {
				quantity: '변경 없음',
				order: '변경 없음',
				process: '설치 지연 2일 예상',
			},
		},
		{
			id: 'SR-003',
			type: 'material-change',
			title: 'Coupler Type 변경 요청',
			description: 'D25 철근 Coupler를 Type A에서 Type B로 변경 요청',
			priority: 2,
			requester: '정자재',
			affiliation: '자재팀',
			requestDate: '2025-03-17 09:15',
			status: '회신',
			assignee: '강설계',
			assigneeTeam: '설계팀',
			dueDate: '2025-03-22',
			relatedMembers: ['C-101', 'C-102', 'B-201'],
			impactAnalysis: {
				quantity: 'Coupler 수량 변경',
				order: '발주 변경 필요',
				process: '납품 지연 가능',
			},
		},
		{
			id: 'SR-004',
			type: 'urgent-issue',
			title: '긴급: 5F Slab 타설 지연',
			description: '5F Slab 타설 예정일 대비 3일 지연, 긴급 조치 필요',
			priority: 1,
			requester: '윤현장',
			affiliation: '시공팀',
			requestDate: '2025-03-18 16:45',
			status: '검토 중',
			assignee: '임시공',
			assigneeTeam: '시공팀',
			dueDate: '2025-03-19',
			delayDays: 1,
			relatedMembers: ['S-501'],
			impactAnalysis: {
				quantity: '변경 없음',
				order: '변경 없음',
				process: '공정 지연 3일',
			},
		},
	]);

	const getTypeLabel = (type: RequestType) => {
		switch (type) {
			case 'design-change':
				return '설계 변경 요청';
			case 'constructability':
				return '시공성 개선 요청';
			case 'material-change':
				return '자재 변경 요청';
			case 'urgent-issue':
				return '긴급 Issue 요청';
		}
	};

	const getPriorityColor = (priority: number) => {
		switch (priority) {
			case 1:
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
			case 2:
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
			case 3:
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700';
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case '완료':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case '회신':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
			case '검토 중':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case '등록됨':
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const handleCreateSubmit = () => {
		if (!createForm.title.trim() || !createForm.description.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const requestDate = `${year}-${month}-${day} ${hour}:${minute}`;

		const newRequest: SiteRequest = {
			id: `SR-${Date.now()}`,
			type: createForm.type,
			title: createForm.title,
			description: createForm.description,
			priority: createForm.priority,
			requester: '현재 사용자',
			affiliation: '시공팀',
			requestDate: requestDate,
			status: '등록됨',
		};

		setRequests((prev) => [newRequest, ...prev]);
		setCreateForm({ type: 'design-change', title: '', description: '', priority: 2, attachments: [] });
		setShowCreateModal(false);
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">현장요청</h2>

			{/* A. 요청 등록(Create Request) */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold mb-2">A. 요청 등록(Create Request)</h3>
						<p className="text-sm text-neutral-600 dark:text-neutral-400">
							요청 종류 · 첨부 파일: 현장 사진, 도면, BIM Snapshot · 요청 중요도(Level 1~3) · 요청자/소속/날짜 자동 기록
						</p>
					</div>
					<button
						type="button"
						onClick={() => setShowCreateModal(true)}
						className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
					>
						요청 등록
					</button>
				</div>
			</div>

			{/* B. 요청 상태(Status Tracking) */}
			<div className="mb-6 p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">B. 요청 상태(Status Tracking)</h3>
				<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
					등록됨 → 검토 중 → 회신 → 완료 · 담당자 배정(설계팀/MEP/시공팀 등) · 예상 처리 기한(Due Date) 자동 설정 · 지연 알림(Alarm)
				</p>
				{/* Delay Alarm */}
				{requests.filter((r) => r.delayDays && r.delayDays > 0).length > 0 && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-400 dark:border-red-700">
						<div className="flex items-center gap-2 mb-2">
							<svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span className="font-semibold text-red-800 dark:text-red-200">지연 알림</span>
						</div>
						{requests
							.filter((r) => r.delayDays && r.delayDays > 0)
							.map((r) => (
								<div key={r.id} className="text-sm text-red-700 dark:text-red-300 mb-1">
									{r.title}: {r.delayDays}일 지연
								</div>
							))}
					</div>
				)}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-800">
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">요청 ID</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">요청 종류</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">제목</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">중요도</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">요청자</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
								<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">담당자</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">예상 처리일</th>
								<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">작업</th>
							</tr>
						</thead>
						<tbody>
							{requests.map((request) => (
								<tr
									key={request.id}
									onClick={() => setSelectedRequest(request)}
									className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer ${
										request.delayDays && request.delayDays > 0 ? 'bg-red-50 dark:bg-red-900/10' : ''
									}`}
								>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-mono text-xs">{request.id}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{getTypeLabel(request.type)}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{request.title}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(request.priority)}`}>
											Level {request.priority}
										</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">
										{request.requester} ({request.affiliation})
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<span className={`px-2 py-1 rounded text-xs ${getStatusColor(request.status)}`}>{request.status}</span>
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">
										{request.assignee ? `${request.assignee} (${request.assigneeTeam})` : '-'}
									</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center text-xs">{request.dueDate || '-'}</td>
									<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												setSelectedRequest(request);
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

			{/* 요청 등록 모달 */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">요청 등록</h3>
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">요청 종류</label>
									<select
										value={createForm.type}
										onChange={(e) => setCreateForm({ ...createForm, type: e.target.value as RequestType })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value="design-change">설계 변경 요청(철근량 변경, 부재 크기 변경)</option>
										<option value="constructability">시공성 개선 요청(배근 간섭, 설치 공간 부족 등)</option>
										<option value="material-change">자재 변경 요청(Steel Grade, Coupler Type 등)</option>
										<option value="urgent-issue">긴급 Issue 요청</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">제목</label>
									<input
										type="text"
										value={createForm.title}
										onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
										placeholder="요청 제목을 입력하세요"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">내용</label>
									<textarea
										value={createForm.description}
										onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
										rows={8}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 resize-none"
										placeholder="요청 내용을 입력하세요"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">요청 중요도</label>
									<select
										value={createForm.priority}
										onChange={(e) => setCreateForm({ ...createForm, priority: parseInt(e.target.value) as 1 | 2 | 3 })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value={1}>Level 1 (높음)</option>
										<option value={2}>Level 2 (중간)</option>
										<option value={3}>Level 3 (낮음)</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">첨부 파일</label>
									<div className="border border-neutral-300 dark:border-neutral-600 rounded p-4 bg-neutral-50 dark:bg-neutral-900">
										<div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">현장 사진, 도면, BIM Snapshot 첨부</div>
										<button
											type="button"
											className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
											onClick={() => alert('파일 첨부 기능')}
										>
											파일 선택
										</button>
									</div>
								</div>
								<div className="flex justify-end gap-2 pt-4">
									<button
										type="button"
										onClick={() => setShowCreateModal(false)}
										className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
									>
										취소
									</button>
									<button
										type="button"
										onClick={handleCreateSubmit}
										className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
									>
										등록
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 요청 상세보기 모달 */}
			{selectedRequest && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedRequest(null)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{selectedRequest.title}</h3>
									<div className="flex items-center gap-2">
										<span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(selectedRequest.priority)}`}>
											Level {selectedRequest.priority}
										</span>
										<span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedRequest.status)}`}>{selectedRequest.status}</span>
										<span className="text-xs text-neutral-500 dark:text-neutral-400">{getTypeLabel(selectedRequest.type)}</span>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setSelectedRequest(null)}
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
										<span className="text-neutral-600 dark:text-neutral-400">요청자: </span>
										<span className="font-medium">{selectedRequest.requester} ({selectedRequest.affiliation})</span>
									</div>
									<div>
										<span className="text-neutral-600 dark:text-neutral-400">요청일: </span>
										<span className="font-medium">{selectedRequest.requestDate}</span>
									</div>
									{selectedRequest.assignee && (
										<div>
											<span className="text-neutral-600 dark:text-neutral-400">담당자: </span>
											<span className="font-medium">{selectedRequest.assignee} ({selectedRequest.assigneeTeam})</span>
										</div>
									)}
									{selectedRequest.dueDate && (
										<div>
											<span className="text-neutral-600 dark:text-neutral-400">예상 처리일: </span>
											<span className="font-medium">{selectedRequest.dueDate}</span>
										</div>
									)}
								</div>
							</div>

							{/* 요청 내용 */}
							<div className="mb-4">
								<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">요청 내용</h4>
								<div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
									<p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{selectedRequest.description}</p>
								</div>
							</div>

							{/* C. BIM 연동 */}
							{selectedRequest.relatedMembers && selectedRequest.relatedMembers.length > 0 && (
								<div className="mb-4">
									<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">C. BIM 연동</h4>
									<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
										<div className="text-sm text-blue-800 dark:text-blue-200 mb-2">관련 Member ID: {selectedRequest.relatedMembers.join(', ')}</div>
										{selectedRequest.clashIds && selectedRequest.clashIds.length > 0 && (
											<div className="text-sm text-blue-800 dark:text-blue-200 mb-2">
												Clash 구간: {selectedRequest.clashIds.join(', ')}
											</div>
										)}
										<button
											type="button"
											onClick={() => {
												window.location.href = `/opt/bim?members=${selectedRequest.relatedMembers?.join(',')}&clashIds=${selectedRequest.clashIds?.join(',')}`;
											}}
											className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
										>
											BIM Viewer에서 확인 (요청 부위 자동 Zoom)
										</button>
									</div>
								</div>
							)}

							{/* D. Revision 영향 분석 */}
							{selectedRequest.impactAnalysis && (
								<div className="mb-4">
									<h4 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">D. Revision 영향 분석</h4>
									<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
										<div className="grid grid-cols-3 gap-4 text-sm">
											<div>
												<div className="text-neutral-600 dark:text-neutral-400 mb-1">물량 영향</div>
												<div className="font-medium text-neutral-900 dark:text-neutral-100">{selectedRequest.impactAnalysis.quantity}</div>
											</div>
											<div>
												<div className="text-neutral-600 dark:text-neutral-400 mb-1">발주 영향</div>
												<div className="font-medium text-neutral-900 dark:text-neutral-100">{selectedRequest.impactAnalysis.order}</div>
											</div>
											<div>
												<div className="text-neutral-600 dark:text-neutral-400 mb-1">공정 영향</div>
												<div className="font-medium text-neutral-900 dark:text-neutral-100">{selectedRequest.impactAnalysis.process}</div>
											</div>
										</div>
										{selectedRequest.revisionLink ? (
											<div className="mt-3">
												<button
													type="button"
													onClick={() => {
														window.location.href = selectedRequest.revisionLink || '/collaboration/revision-approval';
													}}
													className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
												>
													Revision 승인 메뉴로 이동
												</button>
											</div>
										) : (
											<div className="mt-3">
												<button
													type="button"
													onClick={() => {
														alert('Revision 요청 생성');
														setSelectedRequest({ ...selectedRequest, revisionLink: '/collaboration/revision-approval' });
													}}
													className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
												>
													Revision 승인 요청 생성
												</button>
											</div>
										)}
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

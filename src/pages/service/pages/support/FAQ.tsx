import { useState } from 'react';

type FAQCategory = 'design-rebar' | 'process-scm' | 'order-bbs-bcl' | 'bim-viewer' | 'revision';

type FAQItem = {
	id: string;
	category: FAQCategory;
	question: string;
	answer: string;
};

type TicketStatus = 'Opened' | 'Assigned' | 'In Progress' | 'Resolved';

type SupportTicket = {
	id: string;
	title: string;
	category: string;
	status: TicketStatus;
	createdDate: string;
	assignedTo?: string;
	resolvedDate?: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High' | 'Urgent';
	isPartnerChannel?: boolean; // 가공소/협력사 전용 채널
};

type TechDoc = {
	id: string;
	title: string;
	type: 'pdf' | 'api' | 'format' | 'algorithm';
	description: string;
	downloadUrl?: string;
	isRestricted?: boolean; // 내부 공개 범위 제한
};

export function FAQ() {
	const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
	const [activeTab, setActiveTab] = useState<'faq' | 'ticket' | 'docs'>('faq');
	const [showTicketModal, setShowTicketModal] = useState(false);
	const [ticketForm, setTicketForm] = useState({
		title: '',
		category: 'technical',
		description: '',
		priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Urgent',
		isPartnerChannel: false,
	});

	const [tickets, setTickets] = useState<SupportTicket[]>([
		{
			id: 'T-001',
			title: 'BIM Viewer에서 부재 정보가 표시되지 않음',
			category: '기술 문의',
			status: 'In Progress',
			createdDate: '2025-03-18 10:30',
			assignedTo: '김지원',
			description: 'BIM Viewer에서 특정 부재를 클릭했을 때 정보가 표시되지 않는 문제가 발생했습니다.',
			priority: 'High',
		},
		{
			id: 'T-002',
			title: 'BBS 출력 형식 문의',
			category: '기능 문의',
			status: 'Assigned',
			createdDate: '2025-03-17 14:20',
			assignedTo: '이지원',
			description: 'BBS 출력 시 특정 형식으로 변경하고 싶습니다.',
			priority: 'Medium',
		},
		{
			id: 'T-003',
			title: '가공소 전용 지원 채널 문의',
			category: '기타',
			status: 'Resolved',
			createdDate: '2025-03-15 09:00',
			assignedTo: '박지원',
			resolvedDate: '2025-03-16 16:00',
			description: '가공소 전용 지원 채널 이용 방법을 문의합니다.',
			priority: 'Low',
			isPartnerChannel: true,
		},
	]);

	const faqs: FAQItem[] = [
		// 설계·배근 관련
		{
			id: 'f1',
			category: 'design-rebar',
			question: '설계 결과에서 철근량이 예상과 다르게 나옵니다.',
			answer: '설계 결과는 구조 해석 결과를 기반으로 산출됩니다. 부재별 설계 결과에서 요구 철근량(As_req)과 제공 철근량(As_prov)을 확인하시고, 설계 기준(KDS 등)을 확인해주세요. 문제가 지속되면 기술지원팀에 문의해주세요.',
		},
		{
			id: 'f2',
			category: 'design-rebar',
			question: '배근 정보에서 Coupler와 Lap의 선택 기준은 무엇인가요?',
			answer: 'AISIMS는 RCW 최소화, 비용 최적화, CO₂ 절감을 종합적으로 고려하여 Coupler와 Lap을 자동으로 선택합니다. Special-length 최적화와 연계하여 최적의 조합을 제안합니다.',
		},
		{
			id: 'f3',
			category: 'design-rebar',
			question: '부재별 설계 결과를 Excel로 내보낼 수 있나요?',
			answer: '네, 부재정보 페이지에서 각 탭의 데이터를 Excel 형식으로 내보낼 수 있습니다. "내보내기" 버튼을 클릭하여 다운로드하세요.',
		},
		// 공정·SCM 관련
		{
			id: 'f4',
			category: 'process-scm',
			question: '공정 계획 Gantt Chart에서 작업을 추가/수정할 수 있나요?',
			answer: '네, Gantt Chart에서 작업을 드래그하여 일정을 조정하거나, 작업을 더블클릭하여 상세 정보를 수정할 수 있습니다. 변경사항은 자동으로 저장됩니다.',
		},
		{
			id: 'f5',
			category: 'process-scm',
			question: 'JIT 발주 시스템은 어떻게 작동하나요?',
			answer: 'JIT(Just-In-Time) 발주는 골조 공정계획과 연동하여 다음 7일간 필요한 철근량을 자동으로 산출하고, 발주 시점을 최적화합니다. 공정 지연 시 자동으로 알림이 발송됩니다.',
		},
		{
			id: 'f6',
			category: 'process-scm',
			question: '가공/납품 현황에서 실제 RCW 데이터를 입력할 수 있나요?',
			answer: '네, 가공소에서 실제 가공 데이터를 입력하면 AISIMS Cutting Pattern과 자동으로 비교하여 RCW를 계산합니다. 가공 오류도 자동으로 감지됩니다.',
		},
		// 발주·BBS/BCL 관련
		{
			id: 'f7',
			category: 'order-bbs-bcl',
			question: 'BBS와 BCL의 차이는 무엇인가요?',
			answer: 'BBS(Bar Bending Schedule)는 철근 배근표로, 각 Bar Mark별 철근 정보를 제공합니다. BCL(Bar Cutting List)은 절단 리스트로, 가공소에서 사용하는 절단 정보를 제공합니다.',
		},
		{
			id: 'f8',
			category: 'order-bbs-bcl',
			question: 'BBS 출력 형식을 변경할 수 있나요?',
			answer: '네, BBS 페이지에서 출력 옵션을 설정할 수 있습니다. Excel, PDF, CSV 형식으로 내보낼 수 있으며, 표 형식과 항목을 커스터마이징할 수 있습니다.',
		},
		{
			id: 'f9',
			category: 'order-bbs-bcl',
			question: '발주 계획에서 Special-length 발주량을 수정할 수 있나요?',
			answer: '네, 철근 주문 계획 페이지에서 Special-length 발주량을 수정할 수 있습니다. 수정 시 물량 및 비용 영향이 자동으로 계산됩니다.',
		},
		// BIM Viewer FAQ
		{
			id: 'f10',
			category: 'bim-viewer',
			question: 'BIM Viewer에서 부재를 선택하는 방법은?',
			answer: 'BIM Viewer에서 부재를 클릭하면 해당 부재의 상세 정보가 오른쪽 패널에 표시됩니다. 여러 부재를 선택하려면 Ctrl 키를 누른 채 클릭하세요.',
		},
		{
			id: 'f11',
			category: 'bim-viewer',
			question: '배근(철근) 확인 모드에서 Special-length 적용 상태를 확인하는 방법은?',
			answer: 'BIM Viewer의 "배근(철근) 확인 모드"에서 "Special-length 적용 상태 확인" 옵션을 활성화하면, Special-length가 적용된 철근이 색상으로 구분되어 표시됩니다.',
		},
		{
			id: 'f12',
			category: 'bim-viewer',
			question: 'Clash 상태를 BIM Viewer에서 확인할 수 있나요?',
			answer: '네, BIM Viewer에서 "Clash 상태 시각화" 옵션을 활성화하면 Clash 발생 포인트가 색상으로 표시됩니다. Clash 검토 메뉴와 연동되어 있습니다.',
		},
		// Revision 관리 FAQ
		{
			id: 'f13',
			category: 'revision',
			question: 'Revision 승인 프로세스는 어떻게 진행되나요?',
			answer: 'Revision 승인은 발주처와 감리의 승인이 필요합니다. 승인 후 자동으로 도서 업데이트, 물량·BBS·BCL 재생성, 발주/공정/SCM 데이터 업데이트가 진행됩니다.',
		},
		{
			id: 'f14',
			category: 'revision',
			question: 'Revision 이력에서 변경된 부재를 확인하는 방법은?',
			answer: 'Revision 이력 페이지의 "부재별 Revision 정보" 섹션에서 변경된 부재가 자동으로 하이라이트됩니다. 변경 항목(단면, 철근, 위치 등)도 표시됩니다.',
		},
		{
			id: 'f15',
			category: 'revision',
			question: 'Revision 알림을 받지 못했습니다.',
			answer: 'Revision 알림은 실시간으로 발송됩니다. 알림 수신 설정을 확인하시고, "Revision 알림 기능" 섹션에서 알림 상태를 확인해주세요. 문제가 지속되면 기술지원팀에 문의해주세요.',
		},
	];

	const techDocs: TechDoc[] = [
		{
			id: 'doc1',
			title: 'AISIMS Quick Guide',
			type: 'pdf',
			description: 'AISIMS 시스템의 빠른 시작 가이드입니다. 주요 기능과 사용법을 간단히 설명합니다.',
			downloadUrl: 'https://example.com/docs/aisims-quick-guide.pdf',
		},
		{
			id: 'doc2',
			title: 'API 인터페이스 매뉴얼 (개발자용)',
			type: 'api',
			description: 'AISIMS API를 사용하여 시스템과 연동하는 방법을 설명합니다. RESTful API 엔드포인트와 인증 방법을 포함합니다.',
			downloadUrl: 'https://example.com/docs/aisims-api-manual.pdf',
		},
		{
			id: 'doc3',
			title: '데이터 포맷 설명서 (CSV/JSON/IFC)',
			type: 'format',
			description: 'AISIMS에서 사용하는 데이터 포맷(CSV, JSON, IFC)의 구조와 스키마를 설명합니다.',
			downloadUrl: 'https://example.com/docs/data-format-guide.pdf',
		},
		{
			id: 'doc4',
			title: 'AISIMS 알고리즘 규준 문서',
			type: 'algorithm',
			description: 'AISIMS 최적화 알고리즘의 규준과 기준을 설명합니다. 내부 공개 범위로 제한됩니다.',
			downloadUrl: 'https://example.com/docs/aisims-algorithm-standards.pdf',
			isRestricted: true,
		},
	];

	const categories = [
		{ id: 'design-rebar' as FAQCategory, label: '설계·배근 관련' },
		{ id: 'process-scm' as FAQCategory, label: '공정·SCM 관련' },
		{ id: 'order-bbs-bcl' as FAQCategory, label: '발주·BBS/BCL 관련' },
		{ id: 'bim-viewer' as FAQCategory, label: 'BIM Viewer' },
		{ id: 'revision' as FAQCategory, label: 'Revision 관리' },
	];

	const toggleFAQ = (id: string) => {
		setExpandedFAQs((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	const getStatusColor = (status: TicketStatus) => {
		switch (status) {
			case 'Resolved':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case 'In Progress':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
			case 'Assigned':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'Opened':
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'Urgent':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
			case 'High':
				return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300';
			case 'Medium':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'Low':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const handleTicketSubmit = () => {
		if (!ticketForm.title.trim() || !ticketForm.description.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');
		const minute = String(now.getMinutes()).padStart(2, '0');
		const createdDate = `${year}-${month}-${day} ${hour}:${minute}`;

		const newTicket: SupportTicket = {
			id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
			title: ticketForm.title,
			category: ticketForm.category,
			status: 'Opened',
			createdDate: createdDate,
			description: ticketForm.description,
			priority: ticketForm.priority,
			isPartnerChannel: ticketForm.isPartnerChannel,
		};

		setTickets((prev) => [newTicket, ...prev]);
		setTicketForm({ title: '', category: 'technical', description: '', priority: 'Medium', isPartnerChannel: false });
		setShowTicketModal(false);
		alert('기술지원 티켓이 생성되었습니다.');
	};

	const handleDownload = (doc: TechDoc) => {
		if (doc.downloadUrl) {
			if (doc.isRestricted) {
				const confirmAccess = confirm('이 문서는 내부 공개 범위로 제한됩니다. 다운로드하시겠습니까?');
				if (!confirmAccess) return;
			}
			alert(`${doc.title} 다운로드가 시작됩니다.`);
			// window.open(doc.downloadUrl, '_blank');
		} else {
			alert('다운로드 파일이 준비되지 않았습니다.');
		}
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">FAQ / 문의하기 / 기술지원</h2>

			{/* 탭 메뉴 */}
			<div className="mb-6 flex gap-2 border-b border-neutral-300 dark:border-neutral-700">
				<button
					type="button"
					onClick={() => setActiveTab('faq')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'faq'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					A. FAQ
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('ticket')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'ticket'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					B. 문의하기 (Support Ticket)
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('docs')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'docs'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					C. 기술지원 문서
				</button>
			</div>

			{/* A. FAQ */}
			{activeTab === 'faq' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<h3 className="text-lg font-semibold mb-4">A. FAQ</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						설계·배근 관련 자주 묻는 질문 · 공정·SCM 관련 FAQ · 발주·BBS/BCL 관련 FAQ · BIM Viewer FAQ · Revision 관리 FAQ
					</p>
					<div className="space-y-6">
						{categories.map((category) => {
							const categoryFAQs = faqs.filter((f) => f.category === category.id);
							if (categoryFAQs.length === 0) return null;
							return (
								<div key={category.id}>
									<h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">{category.label}</h4>
									<div className="space-y-2">
										{categoryFAQs.map((faq) => (
											<div
												key={faq.id}
												className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden"
											>
												<button
													type="button"
													onClick={() => toggleFAQ(faq.id)}
													className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
												>
													<span className="font-medium text-neutral-900 dark:text-neutral-100">{faq.question}</span>
													<span className="text-neutral-500 dark:text-neutral-400 ml-4">
														{expandedFAQs.has(faq.id) ? '▲' : '▼'}
													</span>
												</button>
												{expandedFAQs.has(faq.id) && (
													<div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-700">
														<p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">{faq.answer}</p>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* B. 문의하기 (Support Ticket) */}
			{activeTab === 'ticket' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold mb-2">B. 문의하기 (Support Ticket)</h3>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								기술지원 티켓 생성 · 진행상황(Opened → Assigned → In Progress → Resolved) · 가공소/협력사 전용 지원 채널 제공(옵션)
							</p>
						</div>
						<button
							type="button"
							onClick={() => setShowTicketModal(true)}
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
						>
							티켓 생성
						</button>
					</div>
					<div className="space-y-3">
						{tickets.map((ticket) => (
							<div
								key={ticket.id}
								className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span className="font-medium text-neutral-900 dark:text-neutral-100">{ticket.title}</span>
											<span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
											<span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
											{ticket.isPartnerChannel && (
												<span className="px-2 py-1 rounded text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
													가공소/협력사 전용
												</span>
											)}
										</div>
										<div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{ticket.description}</div>
										<div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
											<span>카테고리: {ticket.category}</span>
											<span>생성일: {ticket.createdDate}</span>
											{ticket.assignedTo && <span>담당자: {ticket.assignedTo}</span>}
											{ticket.resolvedDate && <span>해결일: {ticket.resolvedDate}</span>}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* C. 기술지원 문서 */}
			{activeTab === 'docs' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<h3 className="text-lg font-semibold mb-4">C. 기술지원 문서</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						Quick Guide PDF · API 인터페이스 매뉴얼(개발자용) · 데이터 포맷(CSV/JSON/IFC) 설명서 · AISIMS 알고리즘 규준 문서(내부 공개 범위 제한)
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{techDocs.map((doc) => (
							<div
								key={doc.id}
								className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start justify-between mb-2">
									<h4 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1">{doc.title}</h4>
									{doc.isRestricted && (
										<span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 ml-2">
											제한됨
										</span>
									)}
								</div>
								<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{doc.description}</p>
								<button
									type="button"
									onClick={() => handleDownload(doc)}
									className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors flex items-center justify-center gap-2"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									다운로드
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* 티켓 생성 모달 */}
			{showTicketModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTicketModal(false)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-2xl w-full mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">기술지원 티켓 생성</h3>
								<button
									type="button"
									onClick={() => setShowTicketModal(false)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">제목</label>
									<input
										type="text"
										value={ticketForm.title}
										onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
										placeholder="문의 제목을 입력하세요"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">카테고리</label>
									<select
										value={ticketForm.category}
										onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value="technical">기술 문의</option>
										<option value="feature">기능 문의</option>
										<option value="bug">버그 신고</option>
										<option value="other">기타</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">우선순위</label>
									<select
										value={ticketForm.priority}
										onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value="Low">Low</option>
										<option value="Medium">Medium</option>
										<option value="High">High</option>
										<option value="Urgent">Urgent</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">내용</label>
									<textarea
										value={ticketForm.description}
										onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
										rows={6}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 resize-none"
										placeholder="문의 내용을 입력하세요"
									/>
								</div>
								<div>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={ticketForm.isPartnerChannel}
											onChange={(e) => setTicketForm({ ...ticketForm, isPartnerChannel: e.target.checked })}
											className="w-4 h-4"
										/>
										<span className="text-sm text-neutral-700 dark:text-neutral-300">가공소/협력사 전용 지원 채널 사용</span>
									</label>
								</div>
								<div className="flex justify-end gap-2 pt-4">
									<button
										type="button"
										onClick={() => setShowTicketModal(false)}
										className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
									>
										취소
									</button>
									<button
										type="button"
										onClick={handleTicketSubmit}
										className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
									>
										티켓 생성
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

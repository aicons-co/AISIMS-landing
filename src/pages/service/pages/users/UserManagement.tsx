import { useState } from 'react';

type UserType = '발주처' | '감리' | '시공사' | '협력사' | '공급사' | '설계사';

type Role = 'Viewer' | 'Reviewer' | 'Editor' | 'Approver' | 'Administrator';

type User = {
	id: string;
	name: string;
	email: string;
	userType: UserType;
	role: Role;
	company: string;
	department?: string;
	projects: string[];
	inviteStatus: '초대됨' | '활성' | '비활성';
	inviteDate?: string;
	lastLogin?: string;
};

type MenuPermission = {
	menu: string;
	path: string;
	allowedRoles: Role[];
	allowedUserTypes?: UserType[];
};

type AccessControl = {
	userId: string;
	menuPermissions: {
		[menuPath: string]: boolean;
	};
	fileDownload: boolean;
	bimViewerAdvanced: boolean;
};

type AuditLog = {
	id: string;
	userId: string;
	userName: string;
	action: '로그인' | '로그아웃' | '도서 다운로드' | 'Revision 승인' | 'Revision 반려' | 'Issue 등록' | 'Issue 해결' | '권한 변경' | '기타';
	target?: string;
	details?: string;
	timestamp: string;
	ipAddress?: string;
	securityCheck?: '정상' | '의심' | '위험';
};

type Organization = {
	id: string;
	name: string;
	type: UserType;
	contractUnit: string;
	projects: string[];
	permissions: {
		projectId: string;
		accessLevel: 'Full' | 'Limited' | 'View Only';
	}[];
};

export function UserManagement() {
	const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'audit' | 'organizations'>('users');
	const [showInviteModal, setShowInviteModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const [users, setUsers] = useState<User[]>([
		{
			id: 'U001',
			name: '김발주',
			email: 'kim.client@company.com',
			userType: '발주처',
			role: 'Approver',
			company: 'ABC건설',
			department: '발주팀',
			projects: ['프로젝트 A', '프로젝트 B'],
			inviteStatus: '활성',
			inviteDate: '2025-01-15',
			lastLogin: '2025-03-18 14:30',
		},
		{
			id: 'U002',
			name: '박감리',
			email: 'park.supervisor@company.com',
			userType: '감리',
			role: 'Reviewer',
			company: 'DEF감리',
			department: '감리팀',
			projects: ['프로젝트 A'],
			inviteStatus: '활성',
			inviteDate: '2025-01-20',
			lastLogin: '2025-03-18 10:15',
		},
		{
			id: 'U003',
			name: '이시공',
			email: 'lee.construction@company.com',
			userType: '시공사',
			role: 'Editor',
			company: 'GHI건설',
			department: '시공팀',
			projects: ['프로젝트 A'],
			inviteStatus: '활성',
			inviteDate: '2025-02-01',
			lastLogin: '2025-03-18 09:00',
		},
		{
			id: 'U004',
			name: '최협력',
			email: 'choi.partner@company.com',
			userType: '협력사',
			role: 'Viewer',
			company: 'JKL협력',
			projects: ['프로젝트 A'],
			inviteStatus: '초대됨',
			inviteDate: '2025-03-15',
		},
		{
			id: 'U005',
			name: '정공급',
			email: 'jung.supplier@company.com',
			userType: '공급사',
			role: 'Viewer',
			company: 'MNO공급',
			projects: ['프로젝트 A'],
			inviteStatus: '활성',
			inviteDate: '2025-02-10',
			lastLogin: '2025-03-17 16:20',
		},
		{
			id: 'U006',
			name: '강설계',
			email: 'kang.design@company.com',
			userType: '설계사',
			role: 'Editor',
			company: 'PQR설계',
			department: '설계팀',
			projects: ['프로젝트 A', '프로젝트 B'],
			inviteStatus: '활성',
			inviteDate: '2025-01-10',
			lastLogin: '2025-03-18 11:45',
		},
	]);

	const [menuPermissions] = useState<MenuPermission[]>([
		{ menu: 'Revision 승인', path: '/collaboration/revision-approval', allowedRoles: ['Approver', 'Administrator'] },
		{ menu: 'BBS', path: '/output/bbs', allowedRoles: ['Editor', 'Reviewer', 'Administrator'], allowedUserTypes: ['시공사', '협력사'] },
		{ menu: 'BCL', path: '/output/bcl', allowedRoles: ['Editor', 'Reviewer', 'Administrator'], allowedUserTypes: ['시공사', '협력사'] },
		{ menu: 'BIM Viewer', path: '/opt/bim', allowedRoles: ['Viewer', 'Reviewer', 'Editor', 'Approver', 'Administrator'] },
		{ menu: '사용자 관리', path: '/users', allowedRoles: ['Administrator'] },
	]);

	const [accessControls, setAccessControls] = useState<AccessControl[]>([
		{
			userId: 'U001',
			menuPermissions: {
				'/collaboration/revision-approval': true,
				'/output/bbs': false,
				'/output/bcl': false,
				'/opt/bim': true,
			},
			fileDownload: true,
			bimViewerAdvanced: true,
		},
		{
			userId: 'U003',
			menuPermissions: {
				'/collaboration/revision-approval': false,
				'/output/bbs': true,
				'/output/bcl': true,
				'/opt/bim': true,
			},
			fileDownload: true,
			bimViewerAdvanced: false,
		},
	]);

	const [auditLogs] = useState<AuditLog[]>([
		{
			id: 'A001',
			userId: 'U001',
			userName: '김발주',
			action: '로그인',
			timestamp: '2025-03-18 14:30:00',
			ipAddress: '192.168.1.100',
			securityCheck: '정상',
		},
		{
			id: 'A002',
			userId: 'U001',
			userName: '김발주',
			action: 'Revision 승인',
			target: 'R3.1',
			details: 'Revision R3.1 승인 처리',
			timestamp: '2025-03-18 15:00:00',
			securityCheck: '정상',
		},
		{
			id: 'A003',
			userId: 'U003',
			userName: '이시공',
			action: '도서 다운로드',
			target: 'BBS-2025-03-18.pdf',
			timestamp: '2025-03-18 09:30:00',
			securityCheck: '정상',
		},
		{
			id: 'A004',
			userId: 'U002',
			userName: '박감리',
			action: 'Issue 등록',
			target: 'ISS-001',
			details: 'Beam B402 배근 간섭 Issue 등록',
			timestamp: '2025-03-18 10:15:00',
			securityCheck: '정상',
		},
		{
			id: 'A005',
			userId: 'U006',
			userName: '강설계',
			action: 'Issue 해결',
			target: 'ISS-001',
			details: 'Issue 해결 완료',
			timestamp: '2025-03-18 11:00:00',
			securityCheck: '정상',
		},
		{
			id: 'A006',
			userId: 'U001',
			userName: '김발주',
			action: '로그아웃',
			timestamp: '2025-03-18 17:00:00',
			ipAddress: '192.168.1.100',
			securityCheck: '정상',
		},
	]);

	const [organizations] = useState<Organization[]>([
		{
			id: 'ORG-001',
			name: 'ABC건설',
			type: '발주처',
			contractUnit: '계약 A',
			projects: ['프로젝트 A', '프로젝트 B'],
			permissions: [
				{ projectId: '프로젝트 A', accessLevel: 'Full' },
				{ projectId: '프로젝트 B', accessLevel: 'Full' },
			],
		},
		{
			id: 'ORG-002',
			name: 'GHI건설',
			type: '시공사',
			contractUnit: '계약 B',
			projects: ['프로젝트 A'],
			permissions: [{ projectId: '프로젝트 A', accessLevel: 'Limited' }],
		},
		{
			id: 'ORG-003',
			name: 'JKL협력',
			type: '협력사',
			contractUnit: '계약 C',
			projects: ['프로젝트 A'],
			permissions: [{ projectId: '프로젝트 A', accessLevel: 'View Only' }],
		},
	]);

	const [inviteForm, setInviteForm] = useState({
		name: '',
		email: '',
		userType: '발주처' as UserType,
		role: 'Viewer' as Role,
		company: '',
		projects: [] as string[],
	});

	const getRoleColor = (role: Role) => {
		switch (role) {
			case 'Administrator':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
			case 'Approver':
				return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
			case 'Editor':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
			case 'Reviewer':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case 'Viewer':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const getUserTypeColor = (userType: UserType) => {
		switch (userType) {
			case '발주처':
				return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300';
			case '감리':
				return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
			case '시공사':
				return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
			case '협력사':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			case '공급사':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case '설계사':
				return 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const getSecurityCheckColor = (check?: string) => {
		switch (check) {
			case '위험':
				return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
			case '의심':
				return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
			case '정상':
				return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
			default:
				return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
		}
	};

	const handleInvite = () => {
		if (!inviteForm.name || !inviteForm.email || !inviteForm.company) {
			alert('필수 정보를 입력해주세요.');
			return;
		}

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const inviteDate = `${year}-${month}-${day}`;

		const newUser: User = {
			id: `U${String(users.length + 1).padStart(3, '0')}`,
			name: inviteForm.name,
			email: inviteForm.email,
			userType: inviteForm.userType,
			role: inviteForm.role,
			company: inviteForm.company,
			projects: inviteForm.projects,
			inviteStatus: '초대됨',
			inviteDate: inviteDate,
		};

		setUsers((prev) => [...prev, newUser]);
		setInviteForm({ name: '', email: '', userType: '발주처', role: 'Viewer', company: '', projects: [] });
		setShowInviteModal(false);
		alert('사용자 초대가 완료되었습니다.');
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">사용자 관리</h2>

			{/* 탭 메뉴 */}
			<div className="mb-6 flex gap-2 border-b border-neutral-300 dark:border-neutral-700">
				<button
					type="button"
					onClick={() => setActiveTab('users')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'users'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					A. 사용자/Role 등록
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('permissions')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'permissions'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					B. 접근 권한 관리
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('audit')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'audit'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					C. Audit Log
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('organizations')}
					className={`px-4 py-2 font-medium transition-colors ${
						activeTab === 'organizations'
							? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
							: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
					}`}
				>
					D. 조직/회사 관리
				</button>
			</div>

			{/* A. 사용자/Role 등록 */}
			{activeTab === 'users' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold mb-2">A. 사용자/Role 등록</h3>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								사용자 유형: 발주처 / 감리 / 시공사 / 협력사 / 공급사 / 설계사 · Role: Viewer / Reviewer / Editor / Approver / Administrator · 사용자 초대(Invite), 프로젝트 배정
							</p>
						</div>
						<button
							type="button"
							onClick={() => setShowInviteModal(true)}
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
						>
							사용자 초대
						</button>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">이름</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">이메일</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">사용자 유형</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Role</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">회사</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">프로젝트</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상태</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">마지막 로그인</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">작업</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{user.name}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{user.email}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<span className={`px-2 py-1 rounded text-xs ${getUserTypeColor(user.userType)}`}>{user.userType}</span>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<span className={`px-2 py-1 rounded text-xs ${getRoleColor(user.role)}`}>{user.role}</span>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">{user.company}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">
											{user.projects.join(', ')}
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<span
												className={`px-2 py-1 rounded text-xs ${
													user.inviteStatus === '활성'
														? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
														: user.inviteStatus === '초대됨'
															? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
															: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400'
												}`}
											>
												{user.inviteStatus}
											</span>
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{user.lastLogin || '-'}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											<button
												type="button"
												onClick={() => {
													setSelectedUser(user);
													setActiveTab('permissions');
												}}
												className="px-2 py-1 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors"
											>
												권한 설정
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* B. 접근 권한 관리 */}
			{activeTab === 'permissions' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<h3 className="text-lg font-semibold mb-4">B. 접근 권한 관리(Access Control)</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						메뉴 단위 권한 설정 · 예: Revision 승인 → Approver만 · BBS/BCL → 시공/가공자만 · 파일 다운로드 제한 · BIM Viewer 고급기능 제한 가능
					</p>
					<div className="space-y-4">
						{menuPermissions.map((menu) => (
							<div key={menu.path} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
								<div className="flex items-center justify-between mb-2">
									<div>
										<div className="font-medium text-neutral-900 dark:text-neutral-100">{menu.menu}</div>
										<div className="text-xs text-neutral-500 dark:text-neutral-400">{menu.path}</div>
									</div>
								</div>
								<div className="mt-2">
									<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">허용된 Role:</div>
									<div className="flex flex-wrap gap-2">
										{menu.allowedRoles.map((role) => (
											<span key={role} className={`px-2 py-1 rounded text-xs ${getRoleColor(role)}`}>
												{role}
											</span>
										))}
									</div>
									{menu.allowedUserTypes && menu.allowedUserTypes.length > 0 && (
										<>
											<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 mt-2">허용된 사용자 유형:</div>
											<div className="flex flex-wrap gap-2">
												{menu.allowedUserTypes.map((userType) => (
													<span key={userType} className={`px-2 py-1 rounded text-xs ${getUserTypeColor(userType)}`}>
														{userType}
													</span>
												))}
											</div>
										</>
									)}
								</div>
							</div>
						))}
					</div>
					{selectedUser && (
						<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
							<div className="font-medium text-blue-900 dark:text-blue-100 mb-3">
								{selectedUser.name} ({selectedUser.email}) 권한 설정
							</div>
							{accessControls
								.filter((ac) => ac.userId === selectedUser.id)
								.map((ac) => (
									<div key={ac.userId} className="space-y-3">
										<div className="flex items-center gap-4">
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={ac.fileDownload}
													onChange={(e) => {
														setAccessControls((prev) =>
															prev.map((item) =>
																item.userId === ac.userId ? { ...item, fileDownload: e.target.checked } : item
															)
														);
													}}
													className="w-4 h-4"
												/>
												<span className="text-sm text-neutral-700 dark:text-neutral-300">파일 다운로드 허용</span>
											</label>
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={ac.bimViewerAdvanced}
													onChange={(e) => {
														setAccessControls((prev) =>
															prev.map((item) =>
																item.userId === ac.userId ? { ...item, bimViewerAdvanced: e.target.checked } : item
															)
														);
													}}
													className="w-4 h-4"
												/>
												<span className="text-sm text-neutral-700 dark:text-neutral-300">BIM Viewer 고급기능 허용</span>
											</label>
										</div>
									</div>
								))}
						</div>
					)}
				</div>
			)}

			{/* C. Audit Log */}
			{activeTab === 'audit' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold mb-2">C. Audit Log</h3>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								사용자 활동 추적 · 로그인/로그아웃 · 도서 다운로드 기록 · Revision 승인 기록 · Issue 등록/해결 기록 · 보안 검사 기능
							</p>
						</div>
						<button
							type="button"
							onClick={() => alert('보안 검사 실행')}
							className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
						>
							보안 검사 실행
						</button>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-neutral-100 dark:bg-neutral-800">
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">시간</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">사용자</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">액션</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">대상</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">상세</th>
									<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">IP 주소</th>
									<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">보안 검사</th>
								</tr>
							</thead>
							<tbody>
								{auditLogs.map((log) => (
									<tr key={log.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{log.timestamp}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700">
											{log.userName} ({log.userId})
										</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 font-medium">{log.action}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{log.target || '-'}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{log.details || '-'}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-xs">{log.ipAddress || '-'}</td>
										<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">
											{log.securityCheck && (
												<span className={`px-2 py-1 rounded text-xs ${getSecurityCheckColor(log.securityCheck)}`}>
													{log.securityCheck}
												</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* D. 조직/회사 관리 */}
			{activeTab === 'organizations' && (
				<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
					<h3 className="text-lg font-semibold mb-4">D. 조직/회사 관리</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
						소속사 등록 · 계약 단위 권한 관리 · 프로젝트 간 권한 연계
					</p>
					<div className="space-y-4">
						{organizations.map((org) => (
							<div key={org.id} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700">
								<div className="flex items-center justify-between mb-3">
									<div>
										<div className="font-medium text-neutral-900 dark:text-neutral-100">{org.name}</div>
										<div className="text-sm text-neutral-600 dark:text-neutral-400">
											<span className={`px-2 py-1 rounded text-xs ${getUserTypeColor(org.type)}`}>{org.type}</span>
											<span className="ml-2">계약 단위: {org.contractUnit}</span>
										</div>
									</div>
								</div>
								<div className="mt-3">
									<div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">프로젝트 권한:</div>
									<div className="space-y-2">
										{org.permissions.map((perm, index) => (
											<div key={index} className="flex items-center gap-3 p-2 bg-white dark:bg-neutral-800 rounded">
												<span className="text-sm text-neutral-700 dark:text-neutral-300">{perm.projectId}</span>
												<span
													className={`px-2 py-1 rounded text-xs ${
														perm.accessLevel === 'Full'
															? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
															: perm.accessLevel === 'Limited'
																? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
																: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
													}`}
												>
													{perm.accessLevel}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* 사용자 초대 모달 */}
			{showInviteModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowInviteModal(false)}>
					<div
						className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-xl max-w-2xl w-full mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">사용자 초대</h3>
								<button
									type="button"
									onClick={() => setShowInviteModal(false)}
									className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">이름</label>
									<input
										type="text"
										value={inviteForm.name}
										onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">이메일</label>
									<input
										type="email"
										value={inviteForm.email}
										onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">사용자 유형</label>
									<select
										value={inviteForm.userType}
										onChange={(e) => setInviteForm({ ...inviteForm, userType: e.target.value as UserType })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value="발주처">발주처</option>
										<option value="감리">감리</option>
										<option value="시공사">시공사</option>
										<option value="협력사">협력사</option>
										<option value="공급사">공급사</option>
										<option value="설계사">설계사</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Role</label>
									<select
										value={inviteForm.role}
										onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as Role })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									>
										<option value="Viewer">Viewer</option>
										<option value="Reviewer">Reviewer</option>
										<option value="Editor">Editor</option>
										<option value="Approver">Approver</option>
										<option value="Administrator">Administrator</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">회사</label>
									<input
										type="text"
										value={inviteForm.company}
										onChange={(e) => setInviteForm({ ...inviteForm, company: e.target.value })}
										className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
									/>
								</div>
								<div className="flex justify-end gap-2 pt-4">
									<button
										type="button"
										onClick={() => setShowInviteModal(false)}
										className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
									>
										취소
									</button>
									<button
										type="button"
										onClick={handleInvite}
										className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
									>
										초대
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

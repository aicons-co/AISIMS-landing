import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface MenuItem {
	label: string;
	path?: string;
	children?: MenuItem[];
}

interface SidebarProps {
	isCollapsed: boolean;
	onToggleCollapse: () => void;
	isMobile?: boolean;
}

const menuItems: MenuItem[] = [
	{
		label: '대시보드',
		path: '/projects',
	},
	{
		label: '설계정보',
		children: [
			{ label: '구조설계서', path: '/design/structure-document' },
			{ label: '부재정보', path: '/design/members' },
			{ label: 'Revision 이력', path: '/design/revisions' },
			{ label: '물량 정보', path: '/design/quantity-info' },
		],
	},
	{
		label: 'BIM/3D Viewer',
		children: [
			{ label: 'BIM Viewer', path: '/bim' },
			{ label: 'Clash 검토', path: '/bim/clash' },
			{ label: '규준/시방서', path: '/bim/standards' }, // 수정전: 규준 및 시방서
		],
	},
	{
		label: '출력도서',
		children: [
			{ label: '실시도면', path: '/output/detail-drawings' },
			{ label: '시공도(SD)', path: '/output/construction-drawings' },
			{ label: 'BBS', path: '/output/bbs' },
			{ label: 'BCL', path: '/output/bcl' },
			{ label: '내역서', path: '/output/specification' },
		],
	},
	{
		label: '최적화 Center',
		children: [
			{ label: '철근 최적화 결과', path: '/opt/reinforcement-results' },
			{ label: 'Special-length 계획', path: '/opt/special-length' },
			{ label: 'Cutting Pattern', path: '/opt/cutting-pattern' },
			{ label: 'CO₂/RCW/Cost', path: '/opt/co2-rcw-cost' },
		],
	},
	{
		label: 'SCM/공정',
		children: [
			{ label: '골조 공정 계획', path: '/scm/frame-process' },
			{ label: '철근 주문 계획', path: '/scm/rebar-order' },
			{ label: '가공/납품 현황', path: '/scm/processing-delivery' },
			{ label: '설치 현황', path: '/scm/installation-progress' }, // 수정전: 현장 설치 진행 상황
		],
	},
	{
		label: '변경/협업',
		children: [
			{ label: '현장 요청', path: '/collaboration/site-request' },
			{ label: '문제 협의', path: '/collaboration/issue-discussion' },
			{ label: 'Revision 승인', path: '/collaboration/revision-approval' },
		],
	},
	{
		label: '사용자 관리',
		path: '/users',
	},
	{
		label: '지원 센터',
		children: [
			{ label: 'Tutorial', path: '/support/tutorial' }, // 수정전: 시스템 소개 및 튜토리얼
			{ label: '최적화 사례', path: '/support/case-studies' }, // 수정전: 최적화 성과 사례
			{ label: 'FAQ/문의', path: '/support/faq' }, // 수정전: FAQ / 문의하기 / 기술지원
		],
	},
];

export function Sidebar({ isCollapsed, onToggleCollapse, isMobile = false }: SidebarProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		navigate(path);
	};

	const toggleExpand = (label: string) => {
		setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]));
	};

	const isActive = (path?: string) => {
		if (!path) return false;
		return location.pathname === path || location.pathname.startsWith(path + '/');
	};

	const isParentActive = (item: MenuItem) => {
		if (item.path) {
			return isActive(item.path);
		}
		if (item.children) {
			return item.children.some((child) => child.path && isActive(child.path));
		}
		return false;
	};

	return (
		<>
			{/* Mobile overlay */}
			{!isCollapsed && (
				<div
					className="fixed inset-0 bg-black/50 z-30 lg:hidden"
					onClick={onToggleCollapse}
					aria-hidden="true"
				/>
			)}
		<aside
			className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 shadow-sm transition-all duration-300 z-40 ${
				isCollapsed 
					? isMobile 
						? 'w-64 -translate-x-full' 
						: 'w-16 translate-x-0'
					: 'w-64 translate-x-0'
			}`}
		>
			{/* Toggle button */}
			<div className="flex items-center justify-end h-12 px-4 border-b border-neutral-200 dark:border-neutral-700">
				<button
					type="button"
					onClick={onToggleCollapse}
					className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
					aria-label={isCollapsed ? '메뉴 펼치기' : '메뉴 접기'}
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{isCollapsed ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						) : (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						)}
					</svg>
				</button>
			</div>

			{/* Menu items */}
			<nav className="overflow-y-auto h-[calc(100vh-7rem)] py-4">
				<ul className="space-y-1 px-2">
					{menuItems.map((item) => {
						if (item.children) {
							const isExpanded = expandedItems.includes(item.label);
							const isItemActive = isParentActive(item);

							return (
								<li key={item.label}>
									<button
										type="button"
										onClick={() => toggleExpand(item.label)}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
											isItemActive
												? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
												: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
										} ${isCollapsed ? 'justify-center' : ''}`}
									>
										{!isCollapsed && <span>{item.label}</span>}
										{!isCollapsed && (
											<svg
												className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										)}
									</button>
									{!isCollapsed && isExpanded && (
										<ul className="mt-1 ml-4 space-y-1">
											{item.children.map((child) => (
												<li key={child.label}>
													<Link
														to={child.path || '#'}
														onClick={(e) => child.path && handleLinkClick(e, child.path)}
														className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
															isActive(child.path)
																? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
																: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
														}`}
													>
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									)}
								</li>
							);
						}

						return (
							<li key={item.label}>
								<Link
									to={item.path || '#'}
									onClick={(e) => item.path && handleLinkClick(e, item.path)}
									className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
										isActive(item.path)
											? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
											: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
									} ${isCollapsed ? 'justify-center' : ''}`}
									title={isCollapsed ? item.label : undefined}
								>
									{isCollapsed ? (
										<span className="text-lg">{item.label.charAt(0)}</span>
									) : (
										<span>{item.label}</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
		</>
	);
}


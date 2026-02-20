import { useMemo } from 'react';

type Log = { id: string; user: string; action: string; at: string };

export function AuditLogs() {
	const logs = useMemo<Log[]>(
		() => [
			{ id: 'lg1', user: 'admin', action: '프로젝트 생성', at: '2025-10-20 09:10' },
			{ id: 'lg2', user: 'pm_kim', action: '단가 수정', at: '2025-10-21 14:22' },
			{ id: 'lg3', user: 'eng_lee', action: '하중케이스 추가', at: '2025-10-22 11:03' },
		],
		[]
	);

	return (
		<section className="auth-section">
			<h2>감사로그 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">시간</th>
						<th className="text-left">사용자</th>
						<th className="text-left">행동</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((l) => (
						<tr key={l.id}>
							<td>{l.at}</td>
							<td>{l.user}</td>
							<td>{l.action}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


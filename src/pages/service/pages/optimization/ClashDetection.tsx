import { useState } from 'react';

type Clash = { id: string; location: string; severity: 'LOW' | 'MEDIUM' | 'HIGH' };

export function ClashDetection() {
	const [clashes] = useState<Clash[]>([
		{ id: 'c1', location: 'B2 MEP-PIPE vs 구조보', severity: 'HIGH' },
		{ id: 'c2', location: '1F DUCT vs 천장', severity: 'MEDIUM' },
		{ id: 'c3', location: '3F 전기트레이 vs 파티션', severity: 'LOW' },
	]);

	const exportReport = () => {
		// Placeholder: generate and download report
		// eslint-disable-next-line no-alert
		alert('자동 충돌 리포트를 생성했습니다. (프로토타입)');
	};

	return (
		<section className="auth-section">
			<h2>충돌검토 (Clash)</h2>
			<div className="mt-3">
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="text-left">ID</th>
							<th className="text-left">위치</th>
							<th className="text-left">심각도</th>
						</tr>
					</thead>
					<tbody>
						{clashes.map((c) => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.location}</td>
								<td>{c.severity}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="mt-3">
					<button type="button" onClick={exportReport}>
						자동 충돌 리포트 생성
					</button>
				</div>
			</div>
		</section>
	);
}


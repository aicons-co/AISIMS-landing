import { useState } from 'react';

type LC = { id: string; name: string; factor: number; type: 'Dead' | 'Live' | 'Wind' | 'EQ' };

export function LoadCases() {
	const [rows, setRows] = useState<LC[]>([
		{ id: 'l1', name: 'D', factor: 1.0, type: 'Dead' },
		{ id: 'l2', name: 'L', factor: 1.0, type: 'Live' },
		{ id: 'l3', name: 'W', factor: 1.2, type: 'Wind' },
	]);
	const update = (id: string, key: keyof LC, val: string | number) =>
		setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: typeof r[key] === 'number' ? Number(val) : val } : r)));

	return (
		<section className="auth-section">
			<h2>하중케이스 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">이름</th>
						<th className="text-left">계수</th>
						<th className="text-left">유형</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.id}>
							<td>
								<input type="text" value={r.name} onChange={(e) => update(r.id, 'name', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.factor} onChange={(e) => update(r.id, 'factor', e.target.value)} />
							</td>
							<td>
								<select value={r.type} onChange={(e) => update(r.id, 'type', e.target.value)}>
									<option value="Dead">Dead</option>
									<option value="Live">Live</option>
									<option value="Wind">Wind</option>
									<option value="EQ">EQ</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


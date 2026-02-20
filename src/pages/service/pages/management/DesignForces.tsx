import { useState } from 'react';

type ForceRow = { id: string; combo: string; N: number; V: number; M: number; T: number };

export function DesignForces() {
	const [rows, setRows] = useState<ForceRow[]>([
		{ id: 'f1', combo: 'D+L', N: 120, V: 35, M: 80, T: 0 },
		{ id: 'f2', combo: 'D+W', N: 150, V: 48, M: 110, T: 0 },
	]);

	const update = (id: string, key: keyof ForceRow, val: string | number) =>
		setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: typeof r[key] === 'number' ? Number(val) : val } : r)));

	return (
		<section className="auth-section">
			<h2>설계력 데이터 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">조합</th>
						<th className="text-left">N</th>
						<th className="text-left">V</th>
						<th className="text-left">M</th>
						<th className="text-left">T</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.id}>
							<td>
								<input type="text" value={r.combo} onChange={(e) => update(r.id, 'combo', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.N} onChange={(e) => update(r.id, 'N', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.V} onChange={(e) => update(r.id, 'V', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.M} onChange={(e) => update(r.id, 'M', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.T} onChange={(e) => update(r.id, 'T', e.target.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


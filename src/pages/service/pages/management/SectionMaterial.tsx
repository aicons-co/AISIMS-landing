import { useState } from 'react';

type Section = { id: string; name: string; steel: string; strength: string; density: string };

export function SectionMaterial() {
	const [rows, setRows] = useState<Section[]>([
		{ id: 's1', name: 'STD-Column-400', steel: 'SD400', strength: '400MPa', density: '7.85' },
		{ id: 's2', name: 'STD-Beam-300', steel: 'SD500', strength: '500MPa', density: '7.85' },
	]);
	const update = (id: string, key: keyof Section, val: string) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: val } : r)));

	return (
		<section className="auth-section">
			<h2>단면 및 재료정보 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">단면명</th>
						<th className="text-left">재질</th>
						<th className="text-left">강도</th>
						<th className="text-left">밀도</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.id}>
							<td>
								<input type="text" value={r.name} onChange={(e) => update(r.id, 'name', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.steel} onChange={(e) => update(r.id, 'steel', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.strength} onChange={(e) => update(r.id, 'strength', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.density} onChange={(e) => update(r.id, 'density', e.target.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


import { useState } from 'react';

type MapRow = { id: string; designId: string; modelId: string; note?: string };

export function IdMapping() {
	const [rows, setRows] = useState<MapRow[]>([
		{ id: 'm1', designId: 'COL-001', modelId: 'GUID-AAA', note: '코어부' },
		{ id: 'm2', designId: 'BEAM-201', modelId: 'GUID-BBB' },
	]);

	const update = (id: string, key: keyof MapRow, val: string) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: val } : r)));

	return (
		<section className="auth-section">
			<h2>ID 매핑 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">설계 ID</th>
						<th className="text-left">모델 ID</th>
						<th className="text-left">비고</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.id}>
							<td>
								<input type="text" value={r.designId} onChange={(e) => update(r.id, 'designId', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.modelId} onChange={(e) => update(r.id, 'modelId', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.note ?? ''} onChange={(e) => update(r.id, 'note', e.target.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


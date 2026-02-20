import { useState } from 'react';

type Rebar = { id: string; shape: string; length: number; grade: string; cut: string };

export function RebarInfo() {
	const [items, setItems] = useState<Rebar[]>([
		{ id: 'r1', shape: 'U형', length: 1200, grade: 'SD400', cut: '45°' },
		{ id: 'r2', shape: 'L형', length: 800, grade: 'SD500', cut: '90°' },
	]);

	const update = (id: string, key: keyof Rebar, value: string | number) => setItems((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

	return (
		<section className="auth-section">
			<h2>철근정보관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">형상</th>
						<th className="text-left">길이(mm)</th>
						<th className="text-left">규격</th>
						<th className="text-left">절단</th>
					</tr>
				</thead>
				<tbody>
					{items.map((r) => (
						<tr key={r.id}>
							<td>
								<input type="text" value={r.shape} onChange={(e) => update(r.id, 'shape', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.length} onChange={(e) => update(r.id, 'length', Number(e.target.value))} />
							</td>
							<td>
								<input type="text" value={r.grade} onChange={(e) => update(r.id, 'grade', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.cut} onChange={(e) => update(r.id, 'cut', e.target.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


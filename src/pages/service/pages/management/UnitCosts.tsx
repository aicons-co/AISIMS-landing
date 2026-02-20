import { useState } from 'react';

type Cost = { id: string; name: string; unit: string; price: number; type: '재료' | '인건비' };

export function UnitCosts() {
	const [rows, setRows] = useState<Cost[]>([
		{ id: 'c1', name: '콘크리트', unit: '㎥', price: 95000, type: '재료' },
		{ id: 'c2', name: '철근', unit: 'ton', price: 780000, type: '재료' },
		{ id: 'c3', name: '철근공', unit: 'hr', price: 20000, type: '인건비' },
	]);
	const update = (id: string, key: keyof Cost, val: string | number) =>
		setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: typeof r[key] === 'number' ? Number(val) : val } : r)));

	return (
		<section className="auth-section">
			<h2>단가 데이터 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">항목</th>
						<th className="text-left">단위</th>
						<th className="text-left">단가</th>
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
								<input type="text" value={r.unit} onChange={(e) => update(r.id, 'unit', e.target.value)} />
							</td>
							<td>
								<input type="number" value={r.price} onChange={(e) => update(r.id, 'price', e.target.value)} />
							</td>
							<td>
								<select value={r.type} onChange={(e) => update(r.id, 'type', e.target.value)}>
									<option value="재료">재료</option>
									<option value="인건비">인건비</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


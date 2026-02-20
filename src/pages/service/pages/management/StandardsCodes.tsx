import { useState } from 'react';

type CodeItem = { id: string; standard: 'KDS' | 'ACI' | 'Eurocode'; title: string; version: string };

export function StandardsCodes() {
	const [rows, setRows] = useState<CodeItem[]>([
		{ id: 'sc1', standard: 'KDS', title: 'KDS 14 20 00', version: '2023' },
		{ id: 'sc2', standard: 'ACI', title: 'ACI 318', version: '2019' },
	]);

	const update = (id: string, key: keyof CodeItem, val: string) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: val } : r)));

	return (
		<section className="auth-section">
			<h2>표준코드 관리</h2>
			<table className="w-full mt-3 border-collapse">
				<thead>
					<tr>
						<th className="text-left">표준</th>
						<th className="text-left">코드</th>
						<th className="text-left">버전</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.id}>
							<td>
								<select value={r.standard} onChange={(e) => update(r.id, 'standard', e.target.value)}>
									<option value="KDS">KDS</option>
									<option value="ACI">ACI</option>
									<option value="Eurocode">Eurocode</option>
								</select>
							</td>
							<td>
								<input type="text" value={r.title} onChange={(e) => update(r.id, 'title', e.target.value)} />
							</td>
							<td>
								<input type="text" value={r.version} onChange={(e) => update(r.id, 'version', e.target.value)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


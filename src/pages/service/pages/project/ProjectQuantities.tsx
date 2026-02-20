import { useState } from 'react';
import { useParams } from 'react-router-dom';

type QuantityItem = { id: string; name: string; unit: string; qty: number };

export function ProjectQuantities() {
	const { id } = useParams();
	const [items, setItems] = useState<QuantityItem[]>([
		{ id: 'q1', name: '콘크리트', unit: '㎥', qty: 1200 },
		{ id: 'q2', name: '철근', unit: 'ton', qty: 150 },
	]);

	const updateQty = (qid: string, qty: number) => setItems((prev) => prev.map((i) => (i.id === qid ? { ...i, qty } : i)));

	return (
		<section className="auth-section">
			<h2>물량 내역 관리 · {id}</h2>
			<table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ textAlign: 'left' }}>항목</th>
						<th style={{ textAlign: 'left' }}>단위</th>
						<th style={{ textAlign: 'left' }}>수량</th>
					</tr>
				</thead>
				<tbody>
					{items.map((i) => (
						<tr key={i.id}>
							<td>{i.name}</td>
							<td>{i.unit}</td>
							<td>
								<input type="number" value={i.qty} onChange={(e) => updateQty(i.id, Number(e.target.value))} style={{ width: 120 }} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}


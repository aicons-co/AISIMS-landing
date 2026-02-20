import { useState } from 'react';

type Doc = { id: string; name: string; type: '도서' | '공정' | '일정'; date: string };

export function DesignDocs() {
	const [docs, setDocs] = useState<Doc[]>([
		{ id: 'd1', name: '구조 일반도', type: '도서', date: '2025-10-12' },
		{ id: 'd2', name: '공정 WBS v1', type: '공정', date: '2025-10-08' },
	]);
	const remove = (id: string) => setDocs((prev) => prev.filter((d) => d.id !== id));

	return (
		<section className="auth-section">
			<h2>설계도서관리</h2>
			<div className="mt-3">
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="text-left">이름</th>
							<th className="text-left">유형</th>
							<th className="text-left">등록일</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{docs.map((d) => (
							<tr key={d.id}>
								<td>{d.name}</td>
								<td>{d.type}</td>
								<td>{d.date}</td>
								<td>
									<button type="button" onClick={() => remove(d.id)}>
										삭제
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}


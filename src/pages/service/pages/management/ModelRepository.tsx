import { useMemo, useState } from 'react';

type RepoItem = { id: string; name: string; version: string; updatedAt: string };

export function ModelRepository() {
	const [query, setQuery] = useState('');
	const data = useMemo<RepoItem[]>(
		() => [
			{ id: 'm1', name: 'Main Tower IFC', version: '1.2.0', updatedAt: '2025-10-20' },
			{ id: 'm2', name: 'Annex MEP', version: '0.9.1', updatedAt: '2025-10-10' },
		],
		[]
	);
	const filtered = useMemo(() => data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase())), [data, query]);

	return (
		<section className="auth-section">
			<h2>모델정보관리 (BIM 저장소)</h2>
			<div className="mt-3 flex gap-2">
				<input className="flex-1" type="text" placeholder="모델 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
				<button type="button">신규 추가</button>
			</div>
			<ul className="mt-4 flex flex-col gap-2">
				{filtered.map((i) => (
					<li key={i.id} className="border border-neutral-300 dark:border-neutral-700 rounded p-3 flex justify-between">
						<span>
							{i.name} · v{i.version}
						</span>
						<span className="opacity-75 text-sm">업데이트: {i.updatedAt}</span>
					</li>
				))}
			</ul>
		</section>
	);
}


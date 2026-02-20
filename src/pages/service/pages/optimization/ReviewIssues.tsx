import { useState } from 'react';

type Issue = { id: string; title: string; status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' };

export function ReviewIssues() {
	const [issues, setIssues] = useState<Issue[]>([
		{ id: 'i1', title: '코어부 철근 과다 산출 검토', status: 'OPEN' },
		{ id: 'i2', title: 'MEP 라우팅 최적화 재시도', status: 'IN_PROGRESS' },
	]);
	const [newTitle, setNewTitle] = useState('');

	const addIssue = () => {
		if (!newTitle.trim()) return;
		setIssues((prev) => [...prev, { id: `i${prev.length + 1}`, title: newTitle.trim(), status: 'OPEN' }]);
		setNewTitle('');
	};

	const updateStatus = (id: string, status: Issue['status']) => setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

	return (
		<section className="auth-section">
			<h2>리뷰 · 이슈 트래킹</h2>
			<div className="mt-3 flex gap-2">
				<input className="flex-1" type="text" placeholder="이슈 제목" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
				<button type="button" onClick={addIssue}>
					추가
				</button>
			</div>
			<ul className="mt-4 flex flex-col gap-2">
				{issues.map((i) => (
					<li key={i.id} className="border border-neutral-300 dark:border-neutral-700 rounded p-3 flex justify-between items-center">
						<span>{i.title}</span>
						<select value={i.status} onChange={(e) => updateStatus(i.id, e.target.value as Issue['status'])}>
							<option value="OPEN">OPEN</option>
							<option value="IN_PROGRESS">IN_PROGRESS</option>
							<option value="RESOLVED">RESOLVED</option>
						</select>
					</li>
				))}
			</ul>
		</section>
	);
}


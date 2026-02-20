import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

type Member = {
	id: string;
	name: string;
	email: string;
	department: string;
	profilePhoto?: string;
	role: 'VIEWER' | 'EDITOR' | 'ADMIN';
};

export function ProjectMembers() {
	const { id } = useParams();
	const [members, setMembers] = useState<Member[]>([
		{ id: 'm1', name: '김개발', email: 'kim.dev@aisims.com', department: '개발팀', profilePhoto: undefined, role: 'ADMIN' },
		{ id: 'm2', name: '박설계', email: 'park.design@aisims.com', department: '설계팀', profilePhoto: undefined, role: 'EDITOR' },
		{ id: 'm3', name: '이검토', email: 'lee.review@aisims.com', department: '검토팀', profilePhoto: undefined, role: 'VIEWER' },
	]);
	const [newName, setNewName] = useState('');
	const roles = useMemo(() => ['VIEWER', 'EDITOR', 'ADMIN'] as const, []);

	const addMember = () => {
		if (!newName.trim()) return;
		setMembers((prev) => [
			...prev,
			{ id: `m${prev.length + 1}`, name: newName.trim(), email: '', department: '', profilePhoto: undefined, role: 'VIEWER' },
		]);
		setNewName('');
	};

	const removeMember = (mid: string) => setMembers((prev) => prev.filter((m) => m.id !== mid));
	const updateRole = (mid: string, role: Member['role']) => setMembers((prev) => prev.map((m) => (m.id === mid ? { ...m, role } : m)));

	return (
		<section className="max-w-6xl mx-auto">
			<h2>멤버관리 · {id}</h2>
			<div className="row" style={{ marginTop: 12 }}>
				<input type="text" placeholder="" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ flex: 1 }} />
				<button type="button" onClick={addMember}>
					추가
				</button>
			</div>
			<div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
				{members.map((m) => (
					<div
						key={m.id}
						className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-full"
					>
						<div className="flex items-center gap-6 mb-4">
							{/* 프로필 사진 */}
							<div className="flex-shrink-0">
								{m.profilePhoto ? (
									<img
										src={m.profilePhoto}
										alt={m.name}
										className="w-24 h-24 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-600"
									/>
								) : (
									<div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center border-2 border-neutral-300 dark:border-neutral-600">
										<span className="text-neutral-500 dark:text-neutral-400 text-3xl font-semibold">
											{m.name.charAt(0)}
										</span>
									</div>
								)}
							</div>
							{/* 멤버 정보 */}
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">{m.name}</h3>
								<p className="text-base text-neutral-600 dark:text-neutral-400 mb-1">{m.department || '부서 미지정'}</p>
								<p className="text-base text-neutral-500 dark:text-neutral-500">{m.email || '이메일 없음'}</p>
							</div>
						</div>
						{/* 역할 및 삭제 버튼 */}
						<div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
							<select
								value={m.role}
								onChange={(e) => updateRole(m.id, e.target.value as Member['role'])}
								className="px-4 py-2 text-base border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
							>
								{roles.map((r) => (
									<option key={r} value={r}>
										{r}
									</option>
								))}
							</select>
							<button
								type="button"
								onClick={() => removeMember(m.id)}
								className="px-4 py-2 text-base bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
							>
								삭제
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}


import { useEffect, useState } from 'react';

export function OptimizationProgress() {
	const [progress, setProgress] = useState(0);
	const [phase, setPhase] = useState<'준비' | '최적화중' | '결과생성'>('준비');

	useEffect(() => {
		const id = setInterval(() => {
			setProgress((p) => {
				const np = Math.min(100, p + 10);
				if (np >= 30 && np < 90) setPhase('최적화중');
				if (np >= 90) setPhase('결과생성');
				return np;
			});
		}, 500);
		return () => clearInterval(id);
	}, []);

	return (
		<section className="auth-section">
			<h2>최적화 진행</h2>
			<div className="mt-3 text-sm">
				현재 단계: <strong>{phase}</strong>
			</div>
			<div className="mt-2 w-full max-w-xl">
				<div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded">
					<div className="h-3 bg-blue-500 rounded" style={{ width: `${progress}%` }} />
				</div>
				<div className="mt-1 text-xs opacity-80">{progress}%</div>
			</div>
			<div className="mt-4 border rounded p-3 border-neutral-300 dark:border-neutral-700">
				<strong>최적화 조건</strong>
				<ul className="mt-2 list-disc ms-5 text-sm">
					<li>제약: 구조 안전계수 ≥ 1.5</li>
					<li>목표: 공사비 최소화</li>
					<li>완화 가능: 자재 규격 ±5%</li>
				</ul>
			</div>
		</section>
	);
}


export function ResultsOverview() {
	return (
		<section className="auth-section">
			<h2>전체 결과 보기</h2>
			<div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
				<div className="border border-neutral-300 dark:border-neutral-700 rounded p-3">
					<strong>비용 요약</strong>
					<ul className="mt-2 text-sm">
						<li>총 공사비: 100.0억</li>
						<li>절감액: 7.5억</li>
					</ul>
				</div>
				<div className="border border-neutral-300 dark:border-neutral-700 rounded p-3">
					<strong>물량 요약</strong>
					<ul className="mt-2 text-sm">
						<li>콘크리트: 1,200㎥</li>
						<li>철근: 150 ton</li>
					</ul>
				</div>
				<div className="border border-neutral-300 dark:border-neutral-700 rounded p-3">
					<strong>품질/안전</strong>
					<ul className="mt-2 text-sm">
						<li>안전계수: 1.62</li>
						<li>기준 만족</li>
					</ul>
				</div>
				<div className="border border-neutral-300 dark:border-neutral-700 rounded p-3">
					<strong>스케줄</strong>
					<ul className="mt-2 text-sm">
						<li>예상 기간: 12개월</li>
						<li>지연 리스크: 낮음</li>
					</ul>
				</div>
			</div>
		</section>
	);
}


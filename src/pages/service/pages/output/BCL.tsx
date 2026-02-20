export function BCL() {
	const bclData = {
		title: 'REBAR CUTTING LIST / BAR BENDING SCHEDULE',
		unit: 'm',
		sections: [
			{
				category: 'Suspended Slab',
				items: [
					{ mark: 'Cont. Top& Bottom  Bars A', cutsPerPc: 2, pcs: 25, dia: 10, length: 10.5, weight: 161.7, diff: 7.7 },
					{ mark: 'Cont. Top& Bottom  Bars B', cutsPerPc: 2, pcs: 25, dia: 12, length: 10.5, weight: 233.55, diff: 16.646 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 2, pcs: 25, dia: 16, length: 10.5, weight: 414.96, diff: 27.696 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 1, pcs: 25, dia: 16, length: 6.32, weight: 156.933, diff: 2.914 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 1, pcs: 25, dia: 20, length: 11.85, weight: 365.287, diff: 24.692 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 1, pcs: 25, dia: 20, length: 1.25, weight: 38.534, diff: 13.509 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 3, pcs: 5, dia: 25, length: 4.5, weight: 52.165, diff: 6.459 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 1, pcs: 5, dia: 25, length: 2.3, weight: 13.327, diff: 0.118 },
					{ mark: 'Extra Top Bars 4', cutsPerPc: 3, pcs: 5, dia: 28, length: 4.5, weight: 65.309, diff: 14.849 },
					{ mark: 'Extra Top Bars 4', cutsPerPc: 1, pcs: 5, dia: 28, length: 3, weight: 21.771, diff: 5.361 },
				],
			},
			{
				category: 'Slab On Grade',
				items: [
					{ mark: 'Cont. Top& Bottom  Bars A', cutsPerPc: 2, pcs: 31, dia: 10, length: 10.5, weight: 200.532, diff: 6.532 },
					{ mark: 'Cont. Top& Bottom  Bars B', cutsPerPc: 2, pcs: 31, dia: 12, length: 10.5, weight: 289.201, diff: 14.724 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 2, pcs: 31, dia: 16, length: 10.5, weight: 514.109, diff: 19.299 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 1, pcs: 31, dia: 16, length: 6.32, weight: 194.61, diff: 3.395 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 1, pcs: 31, dia: 20, length: 11.85, weight: 452.37, diff: 8.235 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 1, pcs: 31, dia: 20, length: 1.25, weight: 47.741, diff: 2.171 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 3, pcs: 6, dia: 25, length: 4.5, weight: 62.598, diff: 0.273 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 1, pcs: 6, dia: 25, length: 2.3, weight: 15.993, diff: 0.753 },
					{ mark: 'Extra Top Bars 4', cutsPerPc: 3, pcs: 6, dia: 28, length: 4.5, weight: 78.371, diff: 1.941 },
					{ mark: 'Extra Top Bars 4', cutsPerPc: 1, pcs: 6, dia: 28, length: 3, weight: 26.125, diff: 0.125 },
				],
			},
			{
				category: 'Walls',
				items: [
					{ mark: 'Inner RSB Layer', cutsPerPc: 2, pcs: 52, dia: 16, length: 10.5, weight: 288.588, diff: 10.848 },
					{ mark: 'Inner RSB Layer', cutsPerPc: 2, pcs: 52, dia: 16, length: 3.44, weight: 161.455, diff: 1.325 },
					{ mark: 'Outer RSB Layer', cutsPerPc: 2, pcs: 52, dia: 16, length: 10.5, weight: 288.588, diff: 10.848 },
					{ mark: 'Outer RSB Layer', cutsPerPc: 2, pcs: 52, dia: 16, length: 3.63, weight: 170.256, diff: 0.696 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 20, dia: 10, length: 10.5, weight: 51.744, diff: 0.288 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 2.225, weight: 25.43, diff: 0.76 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 2.075, weight: 23.733, diff: 0.567 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 4.5, weight: 51.444, diff: 2.832 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 5.55, weight: 63.566, diff: 5.276 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 3.77, weight: 43.628, diff: 1.338 },
					{ mark: 'Hor. Outer RSB', cutsPerPc: 2, pcs: 20, dia: 10, length: 11.8, weight: 58.152, diff: 0.432 },
					{ mark: 'Hor. Outer RSB', cutsPerPc: 2, pcs: 15, dia: 10, length: 5.95, weight: 26.387, diff: 1.487 },
					{ mark: 'Hor. Outer RSB', cutsPerPc: 2, pcs: 30, dia: 10, length: 4.7, weight: 53.838, diff: 3.528 },
				],
			},
			{
				category: 'Columns',
				items: [
					{ mark: 'Vertical RSB', cutsPerPc: 4, pcs: 24, dia: 25, length: 5.4, weight: 314.34, diff: 17.685 },
					{ mark: 'Vertical RSB', cutsPerPc: 4, pcs: 24, dia: 25, length: 6, weight: 349.26, diff: 17.145 },
					{ mark: 'Hor. RSB', cutsPerPc: 2, pcs: 16, dia: 16, length: 5, weight: 62.798, diff: 0.163 },
					{ mark: 'Hor. RSB', cutsPerPc: 2, pcs: 8, dia: 16, length: 3.825, weight: 24.099, diff: 0.169 },
					{ mark: 'Hor. RSB', cutsPerPc: 2, pcs: 4, dia: 16, length: 3.925, weight: 12.201, diff: 0.151 },
					{ mark: 'Hor. RSB', cutsPerPc: 2, pcs: 4, dia: 16, length: 3.7, weight: 11.526, diff: 0.294 },
				],
			},
			{
				category: 'Beams',
				items: [
					{ mark: 'Vert. Inner RSB', cutsPerPc: 2, pcs: 4, dia: 10, length: 6.46, weight: 10.269, diff: 0.349 },
					{ mark: 'Vert. Inner RSB', cutsPerPc: 2, pcs: 2, dia: 10, length: 6.01, weight: 4.782, diff: 0.082 },
					{ mark: 'Vert. Outer RSB', cutsPerPc: 2, pcs: 4, dia: 10, length: 6.46, weight: 10.269, diff: 0.349 },
					{ mark: 'Vert. Outer RSB', cutsPerPc: 2, pcs: 2, dia: 10, length: 6.01, weight: 4.782, diff: 0.082 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 20, dia: 10, length: 5.26, weight: 48.622, diff: 3.142 },
					{ mark: 'Hor. Inner RSB', cutsPerPc: 2, pcs: 10, dia: 10, length: 2.63, weight: 12.939, diff: 0.279 },
					{ mark: 'Hor. Outer RSB', cutsPerPc: 2, pcs: 20, dia: 10, length: 5.26, weight: 48.622, diff: 3.142 },
					{ mark: 'Hor. Outer RSB', cutsPerPc: 2, pcs: 10, dia: 10, length: 2.63, weight: 12.939, diff: 0.279 },
				],
			},
			{
				category: 'Footings',
				items: [
					{ mark: 'Cont. Top & Bottom', cutsPerPc: 2, pcs: 20, dia: 10, length: 10.5, weight: 51.744, diff: 0.288 },
					{ mark: 'Cont. Top & Bottom', cutsPerPc: 2, pcs: 8, dia: 10, length: 8.8, weight: 17.36, diff: 1.2 },
					{ mark: 'Vert. RSB Layer A', cutsPerPc: 2, pcs: 20, dia: 16, length: 10.5, weight: 201.787, diff: 4.958 },
					{ mark: 'Vert. RSB Layer A', cutsPerPc: 2, pcs: 20, dia: 16, length: 4.95, weight: 95.074, diff: 4.024 },
					{ mark: 'Vert. RSB Layer B', cutsPerPc: 2, pcs: 16, dia: 16, length: 10.5, weight: 161.43, diff: 6.329 },
					{ mark: 'Vert. RSB Layer B', cutsPerPc: 2, pcs: 16, dia: 16, length: 5.5, weight: 90.043, diff: 1.547 },
					{ mark: 'Hor. Outer Layer', cutsPerPc: 2, pcs: 16, dia: 10, length: 5.2, weight: 25.648, diff: 0.608 },
					{ mark: 'Hor. Outer Layer', cutsPerPc: 2, pcs: 16, dia: 10, length: 3.7, weight: 18.256, diff: 0.064 },
					{ mark: 'Hor. Inner Layer', cutsPerPc: 2, pcs: 16, dia: 10, length: 5.2, weight: 25.648, diff: 0.608 },
					{ mark: 'Hor. Inner Layer', cutsPerPc: 2, pcs: 16, dia: 10, length: 3.7, weight: 18.256, diff: 0.064 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 4, pcs: 8, dia: 16, length: 6, weight: 63.88, diff: 0.44 },
					{ mark: 'Extra Top Bars 1', cutsPerPc: 4, pcs: 8, dia: 16, length: 3, weight: 31.94, diff: 3.39 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 4, pcs: 8, dia: 12, length: 5.95, weight: 31.167, diff: 0.927 },
					{ mark: 'Extra Top Bars 2', cutsPerPc: 4, pcs: 8, dia: 12, length: 3, weight: 15.712, diff: 1.112 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 5, pcs: 5, dia: 25, length: 9, weight: 217.857, diff: 17.143 },
					{ mark: 'Extra Top Bars 3', cutsPerPc: 5, pcs: 5, dia: 25, length: 12, weight: 231.24, diff: 9.635 },
					{ mark: 'Extra Top Bars 4', cutsPerPc: 2, pcs: 25, dia: 28, length: 6, weight: 724.95, diff: 0 },
				],
			},
		],
	};

	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold mb-6">BCL</h2>

			<div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
				<h3 className="text-lg font-semibold mb-4">BCL (Bar Cutting List)</h3>
				<div className="space-y-6">
					<div className="text-center mb-4">
						<h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{bclData.title}</h4>
						<p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">단위: {bclData.unit}</p>
					</div>
					{bclData.sections.map((section, sectionIndex) => (
						<div key={sectionIndex} className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
							<div className="bg-neutral-100 dark:bg-neutral-900 px-4 py-3 border-b border-neutral-300 dark:border-neutral-700">
								<h5 className="font-semibold text-neutral-900 dark:text-neutral-100">{section.category}</h5>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm">
									<thead>
										<tr className="bg-neutral-50 dark:bg-neutral-800">
											<th className="text-left p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Mark</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Cuts/Pc</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Pcs</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Dia (mm)</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">
												Length ({bclData.unit})
											</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Weight (kg)</th>
											<th className="text-center p-3 border border-neutral-300 dark:border-neutral-700 font-semibold">Diff (kg)</th>
										</tr>
									</thead>
									<tbody>
										{section.items.map((item, itemIndex) => (
											<tr key={itemIndex} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
												<td className="p-3 border border-neutral-300 dark:border-neutral-700">{item.mark}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.cutsPerPc}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.pcs}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.dia}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.length}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.weight.toFixed(3)}</td>
												<td className="p-3 border border-neutral-300 dark:border-neutral-700 text-center">{item.diff.toFixed(3)}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}



import { useState, useMemo } from 'react';

export interface BBSRow {
	group: string; // Straight Bar, 2nd REBAR CAGE, Spacers, Connection Couplers 등
	barMark: string; // A1, 2A1, B1, G1, SW1 ...
	grade: string; // H
	sizeMm: number; // 40, 25, 13 ...
	quantity: number; // 수량
	lengthMm: number; // 각 Bar 길이(mm)
	kgPerM: number; // Kg/m
	totalKg: number; // Total(kg)
	remark?: string; // w/ Crank, For Skinwall 등(있는 경우만)
}

export const bbsData: BBSRow[] = [
	{ group: 'Straight Bar - 1st REBAR CAGE', barMark: 'A1', grade: 'H', sizeMm: 40, quantity: 21, lengthMm: 6674, kgPerM: 9.864, totalKg: 1382.479 },
	{ group: 'Straight Bar - 1st REBAR CAGE', barMark: '2A1', grade: 'H', sizeMm: 40, quantity: 20, lengthMm: 6549, kgPerM: 9.864, totalKg: 1291.987 },
	{ group: 'Straight Bar - 1st REBAR CAGE', barMark: 'B1', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 5290, kgPerM: 9.864, totalKg: 2139.403 },
	{ group: 'Straight Bar - 1st REBAR CAGE', barMark: 'D1', grade: 'H', sizeMm: 25, quantity: 21, lengthMm: 6384, kgPerM: 3.854, totalKg: 516.683 },
	{ group: 'Straight Bar - 1st REBAR CAGE', barMark: '2D1', grade: 'H', sizeMm: 25, quantity: 20, lengthMm: 6259, kgPerM: 3.854, totalKg: 482.444 },

	{ group: '2nd REBAR CAGE', barMark: 'A2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '2nd REBAR CAGE', barMark: 'B2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '2nd REBAR CAGE', barMark: 'C2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 8500, kgPerM: 9.864, totalKg: 3437.604 },
	{ group: '2nd REBAR CAGE', barMark: 'D2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 11350, kgPerM: 9.864, totalKg: 4590.212, remark: 'w/ Crank' },
	{ group: '2nd REBAR CAGE', barMark: 'E2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10050, kgPerM: 9.864, totalKg: 4064.461 },
	{ group: '2nd REBAR CAGE', barMark: 'F2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10550, kgPerM: 9.864, totalKg: 4266.673 },
	{ group: '2nd REBAR CAGE', barMark: 'J2', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10550, kgPerM: 9.864, totalKg: 4266.673 },

	{ group: '3rd REBAR CAGE', barMark: 'A3', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 8190, kgPerM: 9.864, totalKg: 3312.233, remark: 'w/ Crank' },
	{ group: '3rd REBAR CAGE', barMark: 'B3', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 8190, kgPerM: 9.864, totalKg: 3312.233, remark: 'w/ Crank' },
	{ group: '3rd REBAR CAGE', barMark: 'C3', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 5950, kgPerM: 3.854, totalKg: 940.183 },
	{ group: '3rd REBAR CAGE', barMark: 'D3', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 8190, kgPerM: 9.864, totalKg: 3312.233, remark: 'w/ Crank' },
	{ group: '3rd REBAR CAGE', barMark: 'E3', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 6190, kgPerM: 9.864, totalKg: 2503.385, remark: 'w/ Crank' },

	{ group: '4th REBAR CAGE', barMark: 'A4', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10480, kgPerM: 9.864, totalKg: 4238.364, remark: 'w/ Crank' },
	{ group: '4th REBAR CAGE', barMark: 'B4', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10480, kgPerM: 9.864, totalKg: 4238.364, remark: 'w/ Crank' },
	{ group: '4th REBAR CAGE', barMark: 'C4', grade: 'H', sizeMm: 32, quantity: 41, lengthMm: 9300, kgPerM: 6.313, totalKg: 2407.147, remark: 'w/ Crank' },
	{ group: '4th REBAR CAGE', barMark: 'D4', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10480, kgPerM: 9.864, totalKg: 4238.364, remark: 'w/ Crank' },

	{ group: '5th REBAR CAGE', barMark: 'A5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 4500, kgPerM: 9.864, totalKg: 1819.908, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'A5a', grade: 'H', sizeMm: 32, quantity: 41, lengthMm: 5665, kgPerM: 6.313, totalKg: 1466.289, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'B5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 4500, kgPerM: 9.864, totalKg: 1819.908, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'D5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 9075, kgPerM: 9.864, totalKg: 3670.148, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'E5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 9075, kgPerM: 9.864, totalKg: 3670.148, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'F5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 9075, kgPerM: 9.864, totalKg: 3670.148, remark: 'w/ Crank' },
	{ group: '5th REBAR CAGE', barMark: 'J5', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 9500, kgPerM: 9.864, totalKg: 3842.028 },

	{ group: '6th REBAR CAGE', barMark: 'A6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '6th REBAR CAGE', barMark: 'B6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088 },
	{ group: '6th REBAR CAGE', barMark: 'D6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '6th REBAR CAGE', barMark: 'E6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '6th REBAR CAGE', barMark: 'F6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 12000, kgPerM: 9.864, totalKg: 4853.088, remark: 'w/ Crank' },
	{ group: '6th REBAR CAGE', barMark: 'J6', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 6835, kgPerM: 9.864, totalKg: 2764.238 },

	{ group: '7th REBAR CAGE', barMark: 'A7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10605, kgPerM: 9.864, totalKg: 4288.917, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'B7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 10605, kgPerM: 9.864, totalKg: 4288.917, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'D7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 7705, kgPerM: 9.864, totalKg: 3116.087, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'D7a', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 4200, kgPerM: 3.854, totalKg: 663.659, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'E7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 7905, kgPerM: 9.864, totalKg: 3196.972, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'F7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 6405, kgPerM: 9.864, totalKg: 2590.336, remark: 'w/ Crank' },
	{ group: '7th REBAR CAGE', barMark: 'J7', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 6405, kgPerM: 9.864, totalKg: 2590.336, remark: 'w/ Crank' },

	{ group: '8th REBAR CAGE', barMark: 'A8', grade: 'H', sizeMm: 40, quantity: 41, lengthMm: 5840, kgPerM: 9.864, totalKg: 2361.836, remark: 'w/ Crank' },
	{ group: '8th REBAR CAGE', barMark: 'A8a', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 6650, kgPerM: 3.854, totalKg: 1050.793, remark: 'w/ Crank' },
	{ group: '8th REBAR CAGE', barMark: 'D8', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 10250, kgPerM: 3.854, totalKg: 1619.644, remark: 'w/ Crank' },

	{ group: '9th REBAR CAGE', barMark: 'A9', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 12000, kgPerM: 3.854, totalKg: 1896.168, remark: 'w/ Crank' },
	{ group: '9th REBAR CAGE', barMark: 'D9', grade: 'H', sizeMm: 25, quantity: 41, lengthMm: 12000, kgPerM: 3.854, totalKg: 1896.168, remark: 'w/ Crank' },

	{ group: 'Spacers', barMark: 'S1', grade: 'H', sizeMm: 40, quantity: 58, lengthMm: 2570, kgPerM: 9.864, totalKg: 1470.328 },
	{ group: 'Spacers', barMark: 'S2', grade: 'H', sizeMm: 40, quantity: 58, lengthMm: 2465, kgPerM: 9.864, totalKg: 1410.256 },

	{ group: 'Links - Ex-Link', barMark: 'L1', grade: 'H', sizeMm: 20, quantity: 376, lengthMm: 5800, kgPerM: 2.47, totalKg: 5386.576 },
	{ group: 'Links - Ex-Link', barMark: 'L1a', grade: 'H', sizeMm: 20, quantity: 376, lengthMm: 4480, kgPerM: 2.47, totalKg: 4160.666 },
	{ group: 'Links - Ex-Link', barMark: 'L1b', grade: 'H', sizeMm: 20, quantity: 754, lengthMm: 4550, kgPerM: 2.47, totalKg: 8473.829 },

	{ group: 'C-Link', barMark: 'L2', grade: 'H', sizeMm: 13, quantity: 3630, lengthMm: 1704, kgPerM: 1.04, totalKg: 6432.941 },
	{ group: 'C-Link', barMark: 'L2a', grade: 'H', sizeMm: 16, quantity: 6020, lengthMm: 1729, kgPerM: 1.58, totalKg: 16445.556 },
	{ group: 'C-Link', barMark: 'L2b', grade: 'H', sizeMm: 16, quantity: 160, lengthMm: 2453, kgPerM: 1.58, totalKg: 620.118 },

	{ group: 'Stiffener', barMark: 'L3', grade: 'H', sizeMm: 25, quantity: 60, lengthMm: 2505, kgPerM: 3.854, totalKg: 579.256 },

	{ group: 'Connection Couplers', barMark: 'G1', grade: 'H', sizeMm: 40, quantity: 97, lengthMm: 1587, kgPerM: 9.864, totalKg: 1518.454, remark: 'See Reinf. Details STC' },
	{ group: 'Connection Couplers', barMark: 'G1a', grade: 'H', sizeMm: 40, quantity: 68, lengthMm: 1587, kgPerM: 9.864, totalKg: 1064.483 },
	{ group: 'Connection Couplers', barMark: 'G1c', grade: 'H', sizeMm: 40, quantity: 180, lengthMm: 1587, kgPerM: 9.864, totalKg: 2817.75 },
	{ group: 'Connection Couplers', barMark: 'G1d', grade: 'H', sizeMm: 40, quantity: 71, lengthMm: 1587, kgPerM: 9.864, totalKg: 1111.446 },
	{ group: 'Connection Couplers', barMark: 'G1e', grade: 'H', sizeMm: 40, quantity: 71, lengthMm: 1587, kgPerM: 9.864, totalKg: 1111.446 },
	{ group: 'Connection Couplers', barMark: 'G1f', grade: 'H', sizeMm: 40, quantity: 88, lengthMm: 1587, kgPerM: 9.864, totalKg: 1377.567 },

	{ group: 'Connection Couplers', barMark: 'G2', grade: 'H', sizeMm: 40, quantity: 22, lengthMm: 1587, kgPerM: 9.864, totalKg: 344.392 },
	{ group: 'Connection Couplers', barMark: 'G2a', grade: 'H', sizeMm: 40, quantity: 15, lengthMm: 1587, kgPerM: 9.864, totalKg: 234.813 },
	{ group: 'Connection Couplers', barMark: 'G2c', grade: 'H', sizeMm: 40, quantity: 39, lengthMm: 1587, kgPerM: 9.864, totalKg: 610.513 },
	{ group: 'Connection Couplers', barMark: 'G2d', grade: 'H', sizeMm: 40, quantity: 16, lengthMm: 1587, kgPerM: 9.864, totalKg: 250.467 },
	{ group: 'Connection Couplers', barMark: 'G2e', grade: 'H', sizeMm: 40, quantity: 16, lengthMm: 1587, kgPerM: 9.864, totalKg: 250.467 },
	{ group: 'Connection Couplers', barMark: 'G2f', grade: 'H', sizeMm: 40, quantity: 16, lengthMm: 1587, kgPerM: 9.864, totalKg: 250.467 },

	{ group: 'Connection Couplers', barMark: 'G3d', grade: 'H', sizeMm: 32, quantity: 52, lengthMm: 1195, kgPerM: 6.313, totalKg: 392.29 },
	{ group: 'Connection Couplers', barMark: 'G4d', grade: 'H', sizeMm: 32, quantity: 14, lengthMm: 1195, kgPerM: 6.313, totalKg: 105.616 },
	{ group: 'Connection Couplers', barMark: 'G5', grade: 'H', sizeMm: 25, quantity: 40, lengthMm: 957, kgPerM: 3.854, totalKg: 147.531 },
	{ group: 'Connection Couplers', barMark: 'G6', grade: 'H', sizeMm: 25, quantity: 8, lengthMm: 957, kgPerM: 3.854, totalKg: 29.506 },
	{ group: 'Connection Couplers', barMark: 'G7', grade: 'H', sizeMm: 20, quantity: 2, lengthMm: 786, kgPerM: 2.47, totalKg: 3.883 },

	{ group: 'Dowel Bars', barMark: 'SW1', grade: 'H', sizeMm: 13, quantity: 1488, lengthMm: 1125, kgPerM: 1.04, totalKg: 1740.96, remark: 'For Skinwall' },
	{ group: 'Dowel Bars', barMark: 'SW2', grade: 'H', sizeMm: 13, quantity: 372, lengthMm: 1125, kgPerM: 1.04, totalKg: 435.24 },

	{ group: 'Fixing Rebars', barMark: 'FR1', grade: 'H', sizeMm: 20, quantity: 19, lengthMm: 1170, kgPerM: 2.47, totalKg: 54.908, remark: 'For Coupler Bars' },
	{ group: 'Fixing Rebars', barMark: 'FR2', grade: 'H', sizeMm: 20, quantity: 19, lengthMm: 1290, kgPerM: 2.47, totalKg: 60.54 },
	{ group: 'Fixing Rebars', barMark: 'FR3', grade: 'H', sizeMm: 20, quantity: 21, lengthMm: 1175, kgPerM: 2.47, totalKg: 60.947 },
	{ group: 'Fixing Rebars', barMark: 'FR4', grade: 'H', sizeMm: 20, quantity: 30, lengthMm: 1135, kgPerM: 2.47, totalKg: 84.104 },

	{ group: 'Lifting - Hanging bar', barMark: 'H1', grade: 'H', sizeMm: 40, quantity: 32, lengthMm: 2570, kgPerM: 9.864, totalKg: 811.215, remark: 'For 1 Layer Main Bar' },
	{ group: 'Lifting - Support Bars', barMark: 'SB1', grade: 'H', sizeMm: 25, quantity: 36, lengthMm: 1320, kgPerM: 3.854, totalKg: 183.142, remark: 'For Handling' },

	{ group: 'Lifting - Suspension Hook', barMark: 'U1', grade: 'H', sizeMm: 32, quantity: 16, lengthMm: 5780, kgPerM: 6.313, totalKg: 583.826 },
	{ group: 'Lifting - Lifting Hook', barMark: 'U1a', grade: 'H', sizeMm: 32, quantity: 16, lengthMm: 1700, kgPerM: 6.313, totalKg: 171.714 },
];

export function BBSViewer() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedGroup, setSelectedGroup] = useState<string>('all');

	// 그룹 목록 추출
	const groups = useMemo(() => {
		const uniqueGroups = Array.from(new Set(bbsData.map((row) => row.group)));
		return uniqueGroups;
	}, []);

	// 필터링된 데이터
	const filteredData = useMemo(() => {
		let filtered = bbsData;

		// 그룹 필터
		if (selectedGroup !== 'all') {
			filtered = filtered.filter((row) => row.group === selectedGroup);
		}

		// 검색 필터
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(row) =>
					row.barMark.toLowerCase().includes(term) ||
					row.group.toLowerCase().includes(term) ||
					row.remark?.toLowerCase().includes(term)
			);
		}

		return filtered;
	}, [searchTerm, selectedGroup]);

	// 그룹별 합계 계산
	const groupTotals = useMemo(() => {
		const totals: Record<string, { quantity: number; totalKg: number }> = {};

		filteredData.forEach((row) => {
			if (!totals[row.group]) {
				totals[row.group] = { quantity: 0, totalKg: 0 };
			}
			totals[row.group].quantity += row.quantity;
			totals[row.group].totalKg += row.totalKg;
		});

		return totals;
	}, [filteredData]);

	// 전체 합계
	const grandTotal = useMemo(() => {
		return filteredData.reduce(
			(acc, row) => ({
				quantity: acc.quantity + row.quantity,
				totalKg: acc.totalKg + row.totalKg,
			}),
			{ quantity: 0, totalKg: 0 }
		);
	}, [filteredData]);

	// 그룹별로 데이터 그룹화
	const groupedData = useMemo(() => {
		const grouped: Record<string, BBSRow[]> = {};

		filteredData.forEach((row) => {
			if (!grouped[row.group]) {
				grouped[row.group] = [];
			}
			grouped[row.group].push(row);
		});

		return grouped;
	}, [filteredData]);

	// 숫자 포맷팅
	const formatNumber = (num: number, decimals: number = 0) => {
		return new Intl.NumberFormat('ko-KR', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		}).format(num);
	};

	return (
		<div className="w-full space-y-6">
			{/* 헤더 및 필터 */}
			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Bar Bending Schedule (BBS)</h3>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">철근 배근표</p>
				</div>
				<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
					{/* 그룹 필터 */}
					<select
						value={selectedGroup}
						onChange={(e) => setSelectedGroup(e.target.value)}
						className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
					>
						<option value="all">전체 그룹</option>
						{groups.map((group) => (
							<option key={group} value={group}>
								{group}
							</option>
						))}
					</select>

					{/* 검색 */}
					<input
						type="text"
						placeholder="Bar Mark, 그룹, 비고 검색..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[200px]"
					/>
				</div>
			</div>

			{/* 통계 요약 */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm text-blue-600 dark:text-blue-400 font-medium">총 항목 수</div>
					<div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{formatNumber(filteredData.length)}</div>
				</div>
				<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
					<div className="text-sm text-green-600 dark:text-green-400 font-medium">총 수량</div>
					<div className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">{formatNumber(grandTotal.quantity)}</div>
				</div>
				<div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
					<div className="text-sm text-purple-600 dark:text-purple-400 font-medium">총 중량 (kg)</div>
					<div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">{formatNumber(grandTotal.totalKg, 2)}</div>
				</div>
			</div>

			{/* BBS 테이블 */}
			<div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-700">
								<th className="text-left p-3 font-semibold text-neutral-900 dark:text-neutral-100 sticky left-0 bg-neutral-100 dark:bg-neutral-900 z-10">
									그룹
								</th>
								<th className="text-left p-3 font-semibold text-neutral-900 dark:text-neutral-100">Bar Mark</th>
								<th className="text-center p-3 font-semibold text-neutral-900 dark:text-neutral-100">Grade</th>
								<th className="text-center p-3 font-semibold text-neutral-900 dark:text-neutral-100">Size (mm)</th>
								<th className="text-center p-3 font-semibold text-neutral-900 dark:text-neutral-100">수량</th>
								<th className="text-right p-3 font-semibold text-neutral-900 dark:text-neutral-100">길이 (mm)</th>
								<th className="text-right p-3 font-semibold text-neutral-900 dark:text-neutral-100">Kg/m</th>
								<th className="text-right p-3 font-semibold text-neutral-900 dark:text-neutral-100">Total (kg)</th>
								<th className="text-left p-3 font-semibold text-neutral-900 dark:text-neutral-100">비고</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(groupedData).map(([group, rows]) => (
								<>
									{rows.map((row, idx) => (
										<tr
											key={`${row.barMark}-${idx}`}
											className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
										>
											<td className="p-3 text-neutral-700 dark:text-neutral-300 sticky left-0 bg-white dark:bg-neutral-800 z-10">
												{idx === 0 ? group : ''}
											</td>
											<td className="p-3 font-medium text-neutral-900 dark:text-neutral-100">{row.barMark}</td>
											<td className="p-3 text-center text-neutral-700 dark:text-neutral-300">{row.grade}</td>
											<td className="p-3 text-center text-neutral-700 dark:text-neutral-300">{row.sizeMm}</td>
											<td className="p-3 text-center text-neutral-700 dark:text-neutral-300">{formatNumber(row.quantity)}</td>
											<td className="p-3 text-right text-neutral-700 dark:text-neutral-300">{formatNumber(row.lengthMm)}</td>
											<td className="p-3 text-right text-neutral-700 dark:text-neutral-300">{formatNumber(row.kgPerM, 3)}</td>
											<td className="p-3 text-right font-semibold text-neutral-900 dark:text-neutral-100">
												{formatNumber(row.totalKg, 3)}
											</td>
											<td className="p-3 text-neutral-600 dark:text-neutral-400 text-xs">{row.remark || '-'}</td>
										</tr>
									))}
									{/* 그룹별 합계 행 */}
									<tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b-2 border-neutral-300 dark:border-neutral-600 font-semibold">
										<td className="p-3 text-neutral-900 dark:text-neutral-100 sticky left-0 bg-neutral-50 dark:bg-neutral-900/50 z-10">
											합계 ({group})
										</td>
										<td className="p-3" colSpan={3}></td>
										<td className="p-3 text-center text-neutral-900 dark:text-neutral-100">
											{formatNumber(groupTotals[group]?.quantity || 0)}
										</td>
										<td className="p-3" colSpan={2}></td>
										<td className="p-3 text-right text-blue-600 dark:text-blue-400">
											{formatNumber(groupTotals[group]?.totalKg || 0, 3)}
										</td>
										<td className="p-3"></td>
									</tr>
								</>
							))}
						</tbody>
						{/* 전체 합계 */}
						<tfoot>
							<tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-500 dark:border-blue-600 font-bold">
								<td className="p-4 text-blue-900 dark:text-blue-100 sticky left-0 bg-blue-50 dark:bg-blue-900/20 z-10">전체 합계</td>
								<td className="p-4" colSpan={3}></td>
								<td className="p-4 text-center text-blue-900 dark:text-blue-100">{formatNumber(grandTotal.quantity)}</td>
								<td className="p-4" colSpan={2}></td>
								<td className="p-4 text-right text-blue-900 dark:text-blue-100 text-lg">{formatNumber(grandTotal.totalKg, 3)}</td>
								<td className="p-4"></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			{/* 데이터가 없을 때 */}
			{filteredData.length === 0 && (
				<div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
					검색 조건에 맞는 데이터가 없습니다.
				</div>
			)}
		</div>
	);
}


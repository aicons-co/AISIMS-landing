import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DataGrid from 'react-data-grid';
import type { Column } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

export type BimElementData = {
	id: string;
	type: string;
	name: string;
	material: string;
	dimensions: {
		width: number;
		height: number;
		depth: number;
		unit: string;
	};
	position: {
		x: number;
		y: number;
		z: number;
	};
	volume?: number;
	area?: number;
	floor?: string;
};

type DataViewerProps = {
	data: BimElementData[];
	title?: string;
};

export function DataViewer({ data, title = 'BIM 데이터' }: DataViewerProps) {
	const [viewMode, setViewMode] = useState<'json' | 'csv'>('csv');
	const [searchTerm, setSearchTerm] = useState('');

	// Filter data based on search
	const filteredData = data.filter(
		(item) =>
			item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Convert to CSV string
	const convertToCSV = (data: BimElementData[]) => {
		const headers = ['ID', 'Type', 'Name', 'Material', 'Width', 'Height', 'Depth', 'Unit', 'Position X', 'Position Y', 'Position Z', 'Volume', 'Area', 'Floor'];

		const rows = data.map((item) => [
			item.id,
			item.type,
			item.name,
			item.material,
			item.dimensions.width,
			item.dimensions.height,
			item.dimensions.depth,
			item.dimensions.unit,
			item.position.x,
			item.position.y,
			item.position.z,
			item.volume || '',
			item.area || '',
			item.floor || '',
		]);

		return [headers, ...rows].map((row) => row.join(',')).join('\n');
	};

	// Convert to DataGrid format
	const csvGridData = useMemo(() => {
		const headers = ['ID', 'Type', 'Name', 'Material', 'Width', 'Height', 'Depth', 'Unit', 'Position X', 'Position Y', 'Position Z', 'Volume', 'Area', 'Floor'];

		const columns: Column<Record<string, string | number>>[] = headers.map((header) => ({
			key: header.toLowerCase().replace(/\s+/g, '_'),
			name: header,
			resizable: true,
			sortable: true,
			width: header === 'ID' ? 120 : header === 'Name' ? 150 : 100,
		}));

		const rows: Record<string, string | number>[] = filteredData.map((item) => {
			const row: Record<string, string | number> = {};
			row['id'] = item.id;
			row['type'] = item.type;
			row['name'] = item.name;
			row['material'] = item.material;
			row['width'] = item.dimensions.width;
			row['height'] = item.dimensions.height;
			row['depth'] = item.dimensions.depth;
			row['unit'] = item.dimensions.unit;
			row['position_x'] = item.position.x;
			row['position_y'] = item.position.y;
			row['position_z'] = item.position.z;
			row['volume'] = item.volume || '';
			row['area'] = item.area || '';
			row['floor'] = item.floor || '';
			return row;
		});

		return { columns, rows };
	}, [filteredData]);

	// Download CSV
	const downloadCSV = () => {
		const csv = convertToCSV(filteredData);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'bim_data.csv');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Download JSON
	const downloadJSON = () => {
		const json = JSON.stringify(filteredData, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'bim_data.json');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Generate GUID for IFC
	const generateGuid = (): string => {
		return `'${'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		})}'`;
	};

	// Convert to IFC format
	const convertToIFC = (data: BimElementData[]): string => {
		// IFC 파일 헤더
		const today = new Date().toISOString().split('T')[0];
		const header = `ISO-10303-21;
HEADER;
FILE_DESCRIPTION(('ViewDefinition [CoordinationView]'),'2;1');
FILE_NAME('exported_model.ifc','${today}',('AISIMS-MVP'),('AISIMS-MVP Client'),'IFC4','IFC4');
FILE_SCHEMA(('IFC4'));
ENDSEC;
DATA;
`;

		// IFC 엔티티 생성
		let entityCounter = 1;
		const ifcEntities: string[] = [];

		// 단위 정의
		const lengthUnit = entityCounter++;
		const areaUnit = entityCounter++;
		const volumeUnit = entityCounter++;
		ifcEntities.push(`#${lengthUnit}=IFCSIUNIT(*,.LENGTHUNIT.,.MILLI.,.METRE.);`);
		ifcEntities.push(`#${areaUnit}=IFCSIUNIT(*,.AREAUNIT.,.MILLI.,.SQUARE_METRE.);`);
		ifcEntities.push(`#${volumeUnit}=IFCSIUNIT(*,.VOLUMEUNIT.,.MILLI.,.CUBIC_METRE.);`);

		// 기본 프로젝트 설정
		const projectId = entityCounter++;
		ifcEntities.push(`#${projectId}=IFCPROJECT('${generateGuid()}',#${entityCounter++},'Default Project','',$,$,$,$,(#${projectId}),$);`);
		const ownerHistoryId = entityCounter++;
		ifcEntities.push(`#${ownerHistoryId}=IFCOWNERHISTORY(#${entityCounter++},#${entityCounter++},$,.ADDED.,$,$,$,${Date.now() / 1000});`);
		const personId = entityCounter++;
		ifcEntities.push(`#${personId}=IFCPERSON($,'AISIMS-MVP',$,$,$,$,$,$);`);
		const organizationId = entityCounter++;
		ifcEntities.push(`#${organizationId}=IFCORGANIZATION($,'AISIMS-MVP Client','AISIMS-MVP',$,$);`);

		// 각 BIM 요소를 IFC 엔티티로 변환
		data.forEach((item) => {
			const guid = generateGuid();
			const name = item.name.replace(/'/g, "''");
			const type = item.type.toUpperCase();

			// 위치 정보 (미터를 밀리미터로 변환)
			const x = item.position.x * 1000;
			const y = item.position.y * 1000;
			const z = item.position.z * 1000;

			// 위치 엔티티
			const pointId = entityCounter++;
			const axisId = entityCounter++;
			const placementId = entityCounter++;
			ifcEntities.push(`#${pointId}=IFCCARTESIANPOINT((${x},${y},${z}));`);
			ifcEntities.push(`#${axisId}=IFCAXIS2PLACEMENT3D(#${pointId},$,$);`);
			ifcEntities.push(`#${placementId}=IFCLOCALPLACEMENT($,#${axisId},$);`);

			// 건물 요소 프록시 생성
			const elementId = entityCounter++;
			ifcEntities.push(`#${elementId}=IFCBUILDINGELEMENTPROXY(#${ownerHistoryId},${guid},$,'${name}',$,'${type}',$,#${placementId},$,$);`);
		});

		// 푸터
		const footer = `ENDSEC;
END-ISO-10303-21;
`;

		return header + ifcEntities.join('\n') + '\n' + footer;
	};

	// Download IFC
	const downloadIFC = () => {
		const ifc = convertToIFC(filteredData);
		const blob = new Blob([ifc], { type: 'text/plain' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'bim_data.ifc');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Copy to clipboard
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		alert('클립보드에 복사되었습니다!');
	};

	return (
		<div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
			{/* Header */}
			<div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold text-lg">{title}</h3>
					<span className="text-sm text-neutral-600 dark:text-neutral-400">{filteredData.length}개 항목</span>
				</div>

				{/* Controls */}
				<div className="flex flex-wrap items-center gap-3">
					{/* View Mode Selector */}
					<div className="flex gap-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg p-1">
						<button
							type="button"
							onClick={() => setViewMode('csv')}
							className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
								viewMode === 'csv' ? 'bg-white dark:bg-neutral-800 shadow' : 'hover:bg-neutral-300 dark:hover:bg-neutral-600'
							}`}
						>
							CSV
						</button>
						<button
							type="button"
							onClick={() => setViewMode('json')}
							className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
								viewMode === 'json' ? 'bg-white dark:bg-neutral-800 shadow' : 'hover:bg-neutral-300 dark:hover:bg-neutral-600'
							}`}
						>
							JSON
						</button>
					</div>

					{/* Search */}
					<input
						type="text"
						placeholder="검색..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm"
					/>

					{/* Download Buttons */}
					<button type="button" onClick={downloadJSON} className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
						📥 JSON 다운로드
					</button>
					<button type="button" onClick={downloadCSV} className="px-3 py-1.5 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
						📥 CSV 다운로드
					</button>
					<button type="button" onClick={downloadIFC} className="px-3 py-1.5 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
						📥 IFC Export
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="p-4 max-h-[600px] overflow-auto">
				{viewMode === 'csv' && (
					<div className="relative">
						<button
							type="button"
							onClick={() => copyToClipboard(convertToCSV(filteredData))}
							className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-neutral-700 text-white rounded text-xs hover:bg-neutral-600"
						>
							📋 복사
						</button>
						<div className="border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden">
							<DataGrid
								columns={csvGridData.columns}
								rows={csvGridData.rows}
								defaultColumnOptions={{
									resizable: true,
									sortable: true,
								}}
								className="rdg-light fill-grid"
								style={{ height: '600px', width: '100%' }}
							/>
						</div>
					</div>
				)}

				{viewMode === 'json' && (
					<div className="relative">
						<button
							type="button"
							onClick={() => copyToClipboard(JSON.stringify(filteredData, null, 2))}
							className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-neutral-700 text-white rounded text-xs hover:bg-neutral-600"
						>
							📋 복사
						</button>
						<div className="rounded overflow-hidden">
							<SyntaxHighlighter
								language="json"
								style={vscDarkPlus}
								customStyle={{
									margin: 0,
									borderRadius: '0.5rem',
									fontSize: '0.875rem',
									lineHeight: '1.5',
								}}
								showLineNumbers
								wrapLines
							>
								{JSON.stringify(filteredData, null, 2)}
							</SyntaxHighlighter>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

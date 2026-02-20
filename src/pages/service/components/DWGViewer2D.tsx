import { useRef, useEffect, useState } from 'react';

type DWGViewer2DProps = {
	dwgFileName: string;
	enableZoom?: boolean;
	enablePan?: boolean;
};

export function DWGViewer2D({ dwgFileName, enableZoom = true, enablePan = true }: DWGViewer2DProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	// 샘플 2D 도면 그리기
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// 캔버스 크기 설정
		const container = containerRef.current;
		if (container) {
			canvas.width = container.clientWidth;
			canvas.height = container.clientHeight;
		}

		// 배경
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 그리드 그리기
		ctx.strokeStyle = '#e5e7eb';
		ctx.lineWidth = 1;
		const gridSize = 20;
		for (let x = 0; x < canvas.width; x += gridSize) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}
		for (let y = 0; y < canvas.height; y += gridSize) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}

		// 샘플 구조 도면 그리기 (Civil 예제)
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// 좌표계 원점 표시
		ctx.strokeStyle = '#3b82f6';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(centerX - 50, centerY);
		ctx.lineTo(centerX + 50, centerY);
		ctx.moveTo(centerX, centerY - 50);
		ctx.lineTo(centerX, centerY + 50);
		ctx.stroke();

		// 원점 마커
		ctx.fillStyle = '#3b82f6';
		ctx.beginPath();
		ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
		ctx.fill();

		// 기초 구조 (사각형)
		ctx.strokeStyle = '#059669';
		ctx.lineWidth = 3;
		ctx.strokeRect(centerX - 200, centerY - 150, 400, 300);

		// 기둥 위치 표시
		ctx.fillStyle = '#dc2626';
		const columns = [
			{ x: centerX - 150, y: centerY - 100 },
			{ x: centerX + 150, y: centerY - 100 },
			{ x: centerX - 150, y: centerY + 100 },
			{ x: centerX + 150, y: centerY + 100 },
		];
		columns.forEach((col) => {
			ctx.beginPath();
			ctx.arc(col.x, col.y, 15, 0, Math.PI * 2);
			ctx.fill();
		});

		// 보 (Beam) 그리기
		ctx.strokeStyle = '#ea580c';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(centerX - 150, centerY - 100);
		ctx.lineTo(centerX + 150, centerY - 100);
		ctx.moveTo(centerX - 150, centerY + 100);
		ctx.lineTo(centerX + 150, centerY + 100);
		ctx.moveTo(centerX - 150, centerY - 100);
		ctx.lineTo(centerX - 150, centerY + 100);
		ctx.moveTo(centerX + 150, centerY - 100);
		ctx.lineTo(centerX + 150, centerY + 100);
		ctx.stroke();

		// 슬래브 영역 표시
		ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
		ctx.fillRect(centerX - 150, centerY - 100, 300, 200);

		// 치수선 그리기
		ctx.strokeStyle = '#6b7280';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);

		// 수평 치수선
		ctx.beginPath();
		ctx.moveTo(centerX - 200, centerY - 200);
		ctx.lineTo(centerX + 200, centerY - 200);
		ctx.stroke();

		// 수직 치수선
		ctx.beginPath();
		ctx.moveTo(centerX - 250, centerY - 150);
		ctx.lineTo(centerX - 250, centerY + 150);
		ctx.stroke();

		ctx.setLineDash([]);

		// 치수 텍스트
		ctx.fillStyle = '#374151';
		ctx.font = '12px Arial';
		ctx.fillText('400', centerX - 50, centerY - 210);
		ctx.fillText('300', centerX - 270, centerY);

		// 레이블
		ctx.fillStyle = '#1f2937';
		ctx.font = 'bold 14px Arial';
		ctx.fillText('Civil Example - Imperial', centerX - 100, centerY - 250);
		ctx.font = '12px Arial';
		ctx.fillText('Foundation', centerX - 50, centerY - 120);
		ctx.fillText('Column', centerX - 180, centerY - 80);
		ctx.fillText('Beam', centerX - 50, centerY - 50);
		ctx.fillText('Slab', centerX - 50, centerY);

		// 스케일 표시
		ctx.fillStyle = '#6b7280';
		ctx.font = '10px Arial';
		ctx.fillText('Scale: 1:100', centerX + 200, centerY + 200);
	}, []);

	// 줌 인/아웃
	const handleZoom = (delta: number) => {
		if (!enableZoom) return;
		setScale((prev) => {
			const newScale = Math.max(0.1, Math.min(5, prev + delta));
			return newScale;
		});
	};

	// 마우스 휠 줌
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !enableZoom) return;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			handleZoom(delta);
		};

		container.addEventListener('wheel', handleWheel, { passive: false });
		return () => container.removeEventListener('wheel', handleWheel);
	}, [enableZoom]);

	// 드래그 시작
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!enablePan) return;
		setIsDragging(true);
		setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
	};

	// 드래그 중
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !enablePan) return;
		setPosition({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});
	};

	// 드래그 종료
	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// 리셋
	const handleReset = () => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
	};

	return (
		<div className="relative w-full h-full bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 overflow-hidden">
			{/* 컨트롤 패널 */}
			<div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
				{enableZoom && (
					<>
						<button
							type="button"
							onClick={() => handleZoom(0.1)}
							className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
							title="확대"
						>
							➕
						</button>
						<button
							type="button"
							onClick={() => handleZoom(-0.1)}
							className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
							title="축소"
						>
							➖
						</button>
					</>
				)}
				<button
					type="button"
					onClick={handleReset}
					className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
					title="리셋"
				>
					🔄
				</button>
			</div>

			{/* 줌 레벨 표시 */}
			{enableZoom && (
				<div className="absolute top-4 left-4 z-10 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-sm">
					{Math.round(scale * 100)}%
				</div>
			)}

			{/* 파일명 표시 */}
			<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-sm font-medium">
				{dwgFileName}
			</div>

			{/* 캔버스 컨테이너 */}
			<div
				ref={containerRef}
				className="w-full h-full relative cursor-move overflow-hidden"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				<canvas
					ref={canvasRef}
					className="absolute"
					style={{
						transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
						transformOrigin: 'center center',
						transition: isDragging ? 'none' : 'transform 0.1s ease-out',
					}}
				/>
			</div>

			{/* 도움말 */}
			<div className="absolute bottom-4 left-4 z-10 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-xs text-neutral-600 dark:text-neutral-400">
				{enableZoom && <div>휠: 줌 인/아웃</div>}
				{enablePan && <div>드래그: 이동</div>}
			</div>
		</div>
	);
}


import { useState, useRef, useEffect } from 'react';

type ImageViewer2DProps = {
	imageUrl: string;
	alt?: string;
	enableZoom?: boolean;
	enablePan?: boolean;
};

export function ImageViewer2D({ imageUrl, alt = '2D 도면', enableZoom = true, enablePan = true }: ImageViewer2DProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	// 이미지 로드 핸들러
	const handleImageLoad = () => {
		setImageLoaded(true);
		setImageError(false);
		// 이미지 크기에 맞게 초기 스케일 조정
		if (imageRef.current && containerRef.current) {
			const img = imageRef.current;
			const container = containerRef.current;
			const scaleX = container.clientWidth / img.naturalWidth;
			const scaleY = container.clientHeight / img.naturalHeight;
			const initialScale = Math.min(scaleX, scaleY, 1) * 0.9; // 90%로 시작
			setScale(initialScale);
			setPosition({ x: 0, y: 0 });
		}
	};

	const handleImageError = () => {
		setImageError(true);
		setImageLoaded(false);
	};

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
		if (imageRef.current && containerRef.current) {
			const img = imageRef.current;
			const container = containerRef.current;
			const scaleX = container.clientWidth / img.naturalWidth;
			const scaleY = container.clientHeight / img.naturalHeight;
			const initialScale = Math.min(scaleX, scaleY, 1) * 0.9;
			setScale(initialScale);
		}
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

			{/* 이미지 컨테이너 */}
			<div
				ref={containerRef}
				className="w-full h-full relative cursor-move"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				{imageError ? (
					<div className="absolute inset-0 flex flex-col items-center justify-center p-8">
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-red-600 dark:text-red-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">이미지를 불러올 수 없습니다</p>
							<p className="text-xs text-neutral-500 dark:text-neutral-400">
								이미지 파일이 존재하지 않거나 접근할 수 없습니다.
							</p>
						</div>
					</div>
				) : (
					<div
						className="absolute inset-0 flex items-center justify-center"
						style={{
							transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
							transition: isDragging ? 'none' : 'transform 0.1s ease-out',
						}}
					>
						<img
							ref={imageRef}
							src={imageUrl}
							alt={alt}
							onLoad={handleImageLoad}
							onError={handleImageError}
							className="max-w-none select-none"
							style={{
								display: imageLoaded ? 'block' : 'none',
							}}
						/>
						{!imageLoaded && !imageError && (
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
									<p className="text-sm text-neutral-500 dark:text-neutral-400">이미지 로딩 중...</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* 도움말 */}
			<div className="absolute bottom-4 left-4 z-10 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-xs text-neutral-600 dark:text-neutral-400">
				{enableZoom && <div>휠: 줌 인/아웃</div>}
				{enablePan && <div>드래그: 이동</div>}
			</div>
		</div>
	);
}


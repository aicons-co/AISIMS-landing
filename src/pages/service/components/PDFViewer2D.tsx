import { useState, useRef, useEffect } from 'react';

type PDFViewer2DProps = {
	pdfUrl: string;
	pdfFileName: string;
	enableZoom?: boolean;
	enableDownload?: boolean;
};

export function PDFViewer2D({
	pdfUrl,
	pdfFileName,
	enableZoom = true,
	enableDownload = true,
}: PDFViewer2DProps) {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	// PDF 로드 완료 핸들러
	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		const handleLoad = () => {
			setIsLoading(false);
			setError(false);
		};

		const handleError = () => {
			setIsLoading(false);
			setError(true);
		};

		iframe.addEventListener('load', handleLoad);
		iframe.addEventListener('error', handleError);

		return () => {
			iframe.removeEventListener('load', handleLoad);
			iframe.removeEventListener('error', handleError);
		};
	}, []);

	// 줌 인/아웃
	const handleZoom = (delta: number) => {
		if (!enableZoom) return;
		setScale((prev) => {
			const newScale = Math.max(0.5, Math.min(3, prev + delta));
			return newScale;
		});
	};

	// 마우스 휠 줌
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !enableZoom) return;

		const handleWheel = (e: WheelEvent) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				const delta = e.deltaY > 0 ? -0.1 : 0.1;
				handleZoom(delta);
			}
		};

		container.addEventListener('wheel', handleWheel, { passive: false });
		return () => container.removeEventListener('wheel', handleWheel);
	}, [enableZoom]);

	// 리셋
	const handleReset = () => {
		setScale(1);
	};

	// PDF 다운로드
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = pdfUrl;
		link.download = pdfFileName;
		link.click();
	};

	// 전체 화면
	const handleFullscreen = () => {
		const container = containerRef.current;
		if (!container) return;

		if (!document.fullscreenElement) {
			container.requestFullscreen().catch((err) => {
				console.error('전체 화면 모드 진입 실패:', err);
			});
		} else {
			document.exitFullscreen();
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700 overflow-hidden"
		>
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
				{enableDownload && (
					<button
						type="button"
						onClick={handleDownload}
						className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
						title="다운로드"
					>
						📥
					</button>
				)}
				<button
					type="button"
					onClick={handleFullscreen}
					className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
					title="전체 화면"
				>
					⛶
				</button>
			</div>

			{/* 줌 레벨 표시 */}
			{enableZoom && (
				<div className="absolute top-4 left-4 z-10 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-sm">
					{Math.round(scale * 100)}%
				</div>
			)}

			{/* 파일명 표시 */}
			<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-sm font-medium max-w-md truncate">
				{pdfFileName}
			</div>

			{/* PDF 뷰어 */}
			<div className="w-full h-full relative">
				{error ? (
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
							<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
								PDF를 불러올 수 없습니다
							</p>
							<p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
								파일이 존재하지 않거나 접근할 수 없습니다.
							</p>
							{enableDownload && (
								<button
									type="button"
									onClick={handleDownload}
									className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
								>
									PDF 다운로드 시도
								</button>
							)}
						</div>
					</div>
				) : (
					<>
						{isLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 z-20">
								<div className="text-center">
									<div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
									<p className="text-sm text-neutral-500 dark:text-neutral-400">PDF 로딩 중...</p>
								</div>
							</div>
						)}
						<iframe
							ref={iframeRef}
							src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&zoom=${Math.round(scale * 100)}`}
							className="w-full h-full border-0"
							style={{
								transform: `scale(${scale})`,
								transformOrigin: 'top left',
								width: `${100 / scale}%`,
								height: `${100 / scale}%`,
							}}
							title={pdfFileName}
						/>
					</>
				)}
			</div>

			{/* 도움말 */}
			<div className="absolute bottom-4 left-4 z-10 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-lg text-xs text-neutral-600 dark:text-neutral-400">
				{enableZoom && <div>Ctrl + 휠: 줌 인/아웃</div>}
				<div>PDF 내장 컨트롤 사용 가능</div>
			</div>
		</div>
	);
}


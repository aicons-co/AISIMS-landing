import { useState, useRef } from 'react';
import type { DragEvent } from 'react';

export type UploadedFile = {
	file: File;
	name: string;
	size: number;
	sizeFormatted: string;
	uploadedAt: Date;
};

type IfcFileUploaderProps = {
	onFileSelect?: (file: UploadedFile) => void;
	onUploadComplete?: (file: UploadedFile) => void;
	maxSizeMB?: number;
};

export function IfcFileUploader({ onFileSelect, onUploadComplete, maxSizeMB = 500 }: IfcFileUploaderProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};

	const validateFile = (file: File): string | null => {
		// Check file extension
		if (!file.name.toLowerCase().endsWith('.ifc')) {
			return 'IFC 파일만 업로드 가능합니다.';
		}

		// Check file size
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		if (file.size > maxSizeBytes) {
			return `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`;
		}

		return null;
	};

	const handleFile = (file: File) => {
		setError(null);

		// Validate file
		const validationError = validateFile(file);
		if (validationError) {
			setError(validationError);
			return;
		}

		const uploadedFileData: UploadedFile = {
			file,
			name: file.name,
			size: file.size,
			sizeFormatted: formatFileSize(file.size),
			uploadedAt: new Date(),
		};

		setUploadedFile(uploadedFileData);
		if (onFileSelect) {
			onFileSelect(uploadedFileData);
		}

		// Simulate upload progress
		setIsUploading(true);
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);
					if (onUploadComplete) {
						onUploadComplete(uploadedFileData);
					}
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			handleFile(files[0]);
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			handleFile(files[0]);
		}
	};

	const handleRemoveFile = () => {
		setUploadedFile(null);
		setUploadProgress(0);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleBrowseClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="w-full">
			<input ref={fileInputRef} type="file" accept=".ifc" onChange={handleFileInputChange} className="hidden" />

			{!uploadedFile ? (
				<div
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
						isDragging
							? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
							: 'border-neutral-300 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-600'
					}`}
					onClick={handleBrowseClick}
				>
					<div className="flex flex-col items-center gap-4">
						<div className="text-6xl">📁</div>
						<div>
							<p className="text-lg font-semibold mb-2">{isDragging ? 'IFC 파일을 여기에 놓으세요' : 'IFC 파일을 드래그하거나 클릭하여 업로드'}</p>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">최대 파일 크기: {maxSizeMB}MB</p>
						</div>
						<button
							type="button"
							className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							onClick={(e) => {
								e.stopPropagation();
								handleBrowseClick();
							}}
						>
							파일 선택
						</button>
					</div>
				</div>
			) : (
				<div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-6">
					<div className="flex items-start gap-4">
						<div className="text-5xl">📄</div>
						<div className="flex-1">
							<div className="flex items-start justify-between mb-2">
								<div>
									<h3 className="font-semibold text-lg">{uploadedFile.name}</h3>
									<p className="text-sm text-neutral-600 dark:text-neutral-400">
										{uploadedFile.sizeFormatted} • 업로드: {uploadedFile.uploadedAt.toLocaleTimeString()}
									</p>
								</div>
								<button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-600 transition-colors" title="파일 제거">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{isUploading && (
								<div className="mt-4">
									<div className="flex justify-between text-sm mb-2">
										<span>업로드 중...</span>
										<span>{uploadProgress}%</span>
									</div>
									<div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
										<div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
									</div>
								</div>
							)}

							{!isUploading && uploadProgress === 100 && (
								<div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span className="font-medium">업로드 완료</span>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{error && (
				<div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<div className="flex items-start gap-2">
						<svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="text-red-600 dark:text-red-400">{error}</p>
					</div>
				</div>
			)}
		</div>
	);
}

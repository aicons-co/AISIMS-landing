import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// 3D 라이브러리들을 별도 청크로 분리
					'three': ['three', '@react-three/fiber', '@react-three/drei'],
					// 차트 라이브러리들을 별도 청크로 분리
					'charts': ['recharts', 'echarts', 'echarts-for-react'],
					// Gantt 차트 라이브러리
					'gantt': ['@svar-ui/react-gantt'],
					// React Router
					'router': ['react-router-dom'],
					// 기타 큰 라이브러리들
					'vendor': ['axios', 'react-hook-form', '@tanstack/react-query'],
				},
			},
		},
		chunkSizeWarningLimit: 800, // 경고 임계값을 800KB로 조정 (압축 후 크기를 고려)
	},
});

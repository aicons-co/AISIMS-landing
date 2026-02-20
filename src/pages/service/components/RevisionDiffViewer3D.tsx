import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type ElementChange = {
	id: string;
	type: 'added' | 'deleted' | 'modified';
	element: any;
	oldElement?: any;
};

type RevisionDiffViewer3DProps = {
	changes: ElementChange[];
	showOnlyChanges: boolean;
};

export function RevisionDiffViewer3D({ changes, showOnlyChanges }: RevisionDiffViewer3DProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const width = container.clientWidth;
		const height = container.clientHeight;

		// Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf0f0f0);

		// Camera
		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
		camera.position.set(30, 30, 30);
		camera.lookAt(0, 0, 0);

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;
		container.appendChild(renderer.domElement);

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		// Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
		directionalLight.position.set(20, 20, 20);
		directionalLight.castShadow = true;
		scene.add(directionalLight);

		// Grid Helper
		const gridHelper = new THREE.GridHelper(100, 20);
		scene.add(gridHelper);

		// Axes Helper
		const axesHelper = new THREE.AxesHelper(10);
		scene.add(axesHelper);

		// 샘플 요소 생성 (실제로는 changes 데이터에서 생성)
		const elements: THREE.Mesh[] = [];

		// 변경사항에 따라 요소 생성
		changes.forEach((change) => {
			let material: THREE.MeshStandardMaterial;
			let geometry: THREE.BoxGeometry;

			if (change.type === 'added') {
				// 추가된 요소 - 녹색
				material = new THREE.MeshStandardMaterial({
					color: 0x00ff00,
					emissive: 0x00ff00,
					emissiveIntensity: 0.3,
				});
			} else if (change.type === 'deleted') {
				// 삭제된 요소 - 빨간색 (반투명)
				material = new THREE.MeshStandardMaterial({
					color: 0xff0000,
					emissive: 0xff0000,
					emissiveIntensity: 0.3,
					opacity: 0.5,
					transparent: true,
				});
			} else {
				// 변경된 요소 - 노란색
				material = new THREE.MeshStandardMaterial({
					color: 0xffff00,
					emissive: 0xffff00,
					emissiveIntensity: 0.3,
				});
			}

			// 요소 타입에 따라 geometry 생성
			if (change.element?.type === 'Beam' || change.id.includes('beam')) {
				geometry = new THREE.BoxGeometry(4.2, 0.3, 0.6);
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(
					change.element?.position?.x || 2.1,
					change.element?.position?.y || 3.6,
					change.element?.position?.z || 0
				);
				mesh.userData = { changeId: change.id, changeType: change.type };
				scene.add(mesh);
				elements.push(mesh);
			} else if (change.element?.type === 'Column' || change.id.includes('column')) {
				geometry = new THREE.BoxGeometry(0.6, 3.6, 0.6);
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(
					change.element?.position?.x || 0,
					change.element?.position?.y || 1.8,
					change.element?.position?.z || 0
				);
				mesh.userData = { changeId: change.id, changeType: change.type };
				scene.add(mesh);
				elements.push(mesh);
			} else if (change.element?.type === 'Slab' || change.id.includes('slab')) {
				geometry = new THREE.BoxGeometry(4.2, 0.18, 4.2);
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(
					change.element?.position?.x || 2.1,
					change.element?.position?.y || 3.6,
					change.element?.position?.z || 0
				);
				mesh.userData = { changeId: change.id, changeType: change.type };
				scene.add(mesh);
				elements.push(mesh);
			}
		});

		// 변경되지 않은 요소 (showOnlyChanges가 false일 때)
		if (!showOnlyChanges) {
			// 기본 구조 요소들
			const defaultColumnGeometry = new THREE.BoxGeometry(0.6, 3.6, 0.6);
			const defaultColumnMaterial = new THREE.MeshStandardMaterial({
				color: 0x4a90e2,
				opacity: 0.3,
				transparent: true,
			});

			const column1 = new THREE.Mesh(defaultColumnGeometry, defaultColumnMaterial);
			column1.position.set(0, 1.8, 0);
			scene.add(column1);
			elements.push(column1);

			const column2 = new THREE.Mesh(defaultColumnGeometry, defaultColumnMaterial);
			column2.position.set(6, 1.8, 0);
			scene.add(column2);
			elements.push(column2);
		}

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Resize handler
		const handleResize = () => {
			if (!containerRef.current) return;
			const newWidth = containerRef.current.clientWidth;
			const newHeight = containerRef.current.clientHeight;
			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, [changes, showOnlyChanges]);

	return <div ref={containerRef} className="w-full h-full" />;
}


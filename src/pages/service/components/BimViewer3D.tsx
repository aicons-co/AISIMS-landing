import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type BimViewer3DProps = {
	onElementClick?: (elementId: string) => void;
};

export function BimViewer3D({ onElementClick }: BimViewer3DProps) {
	void onElementClick;

	const containerRef = useRef<HTMLDivElement>(null);
	const [showGrid, setShowGrid] = useState(true);
	const [showAxes, setShowAxes] = useState(true);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		controls: OrbitControls;
		gridHelper?: THREE.GridHelper;
		axesHelper?: THREE.AxesHelper;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const width = container.clientWidth;
		const height = container.clientHeight;

		// Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xe0f2fe);
		scene.fog = new THREE.Fog(0xe0f2fe, 20, 100);

		// Camera
		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
		camera.position.set(15, 12, 15);
		camera.lookAt(0, 0, 0);

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		container.appendChild(renderer.domElement);

		// Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight1.position.set(10, 10, 5);
		directionalLight1.castShadow = true;
		directionalLight1.shadow.camera.left = -20;
		directionalLight1.shadow.camera.right = 20;
		directionalLight1.shadow.camera.top = 20;
		directionalLight1.shadow.camera.bottom = -20;
		scene.add(directionalLight1);

		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
		directionalLight2.position.set(-10, 10, -5);
		scene.add(directionalLight2);

		const pointLight = new THREE.PointLight(0xffffff, 0.5);
		pointLight.position.set(0, 10, 0);
		scene.add(pointLight);

		// Grid Helper
		const gridHelper = new THREE.GridHelper(20, 20, 0x374151, 0x6b7280);
		scene.add(gridHelper);

		// Axes Helper
		const axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.minDistance = 5;
		controls.maxDistance = 50;
		controls.maxPolarAngle = Math.PI / 2;

		// Building Structure
		const buildingGroup = new THREE.Group();

		// Foundation
		const foundationGeometry = new THREE.BoxGeometry(10, 0.5, 10);
		const foundationMaterial = new THREE.MeshStandardMaterial({ color: 0x78716c });
		const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
		foundation.position.set(0, 0.25, 0);
		foundation.castShadow = true;
		foundation.receiveShadow = true;
		buildingGroup.add(foundation);

		// 1st Floor Columns
		const columnGeometry = new THREE.BoxGeometry(0.6, 3, 0.6);
		const columnMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });

		const columnPositions = [
			[-3, 2, -3],
			[-3, 2, 3],
			[3, 2, -3],
			[3, 2, 3],
		];

		columnPositions.forEach((pos) => {
			const column = new THREE.Mesh(columnGeometry, columnMaterial);
			column.position.set(pos[0], pos[1], pos[2]);
			column.castShadow = true;
			column.receiveShadow = true;
			buildingGroup.add(column);
		});

		// 1st Floor Slab
		const slabGeometry = new THREE.BoxGeometry(9, 0.3, 9);
		const slabMaterial = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
		const slab1 = new THREE.Mesh(slabGeometry, slabMaterial);
		slab1.position.set(0, 3.5, 0);
		slab1.castShadow = true;
		slab1.receiveShadow = true;
		buildingGroup.add(slab1);

		// 2nd Floor Columns
		columnPositions.forEach((pos) => {
			const column = new THREE.Mesh(columnGeometry, columnMaterial);
			column.position.set(pos[0], pos[1] + 3, pos[2]);
			column.castShadow = true;
			column.receiveShadow = true;
			buildingGroup.add(column);
		});

		// 2nd Floor Slab
		const slab2 = new THREE.Mesh(slabGeometry, slabMaterial);
		slab2.position.set(0, 6.5, 0);
		slab2.castShadow = true;
		slab2.receiveShadow = true;
		buildingGroup.add(slab2);

		// Roof
		const roofGeometry = new THREE.BoxGeometry(10, 0.2, 10);
		const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
		const roof = new THREE.Mesh(roofGeometry, roofMaterial);
		roof.position.set(0, 7.5, 0);
		roof.castShadow = true;
		roof.receiveShadow = true;
		buildingGroup.add(roof);

		// Walls
		const wallMaterial = new THREE.MeshStandardMaterial({
			color: 0x9ca3af,
			transparent: true,
			opacity: 0.3,
		});

		const wallGeometry1 = new THREE.BoxGeometry(9, 3, 0.2);
		const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial);
		wall1.position.set(0, 2, -4.5);
		buildingGroup.add(wall1);

		const wall2 = new THREE.Mesh(wallGeometry1, wallMaterial);
		wall2.position.set(0, 2, 4.5);
		buildingGroup.add(wall2);

		const wallGeometry2 = new THREE.BoxGeometry(0.2, 3, 9);
		const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
		wall3.position.set(-4.5, 2, 0);
		buildingGroup.add(wall3);

		const wall4 = new THREE.Mesh(wallGeometry2, wallMaterial);
		wall4.position.set(4.5, 2, 0);
		buildingGroup.add(wall4);

		scene.add(buildingGroup);

		// Animation
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);
			controls.update();

			// Gentle rotation animation
			buildingGroup.rotation.y = Math.sin(Date.now() * 0.0002) * 0.05;

			renderer.render(scene, camera);
		};
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			controls,
			gridHelper,
			axesHelper,
		};

		// Handle resize
		const handleResize = () => {
			if (!containerRef.current) return;
			const width = containerRef.current.clientWidth;
			const height = containerRef.current.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
			controls.dispose();
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	// Update grid visibility
	useEffect(() => {
		if (sceneRef.current?.gridHelper) {
			sceneRef.current.gridHelper.visible = showGrid;
		}
	}, [showGrid]);

	// Update axes visibility
	useEffect(() => {
		if (sceneRef.current?.axesHelper) {
			sceneRef.current.axesHelper.visible = showAxes;
		}
	}, [showAxes]);

	return (
		<div className="w-full h-full relative">
			{/* Control Panel */}
			<div className="absolute top-4 right-4 z-10 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 border border-neutral-200 dark:border-neutral-700">
				<h3 className="font-semibold mb-3 text-sm">뷰어 설정</h3>
				<div className="space-y-2 text-sm">
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="rounded" />
						<span>그리드 표시</span>
					</label>
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" checked={showAxes} onChange={(e) => setShowAxes(e.target.checked)} className="rounded" />
						<span>축 표시</span>
					</label>
				</div>
			</div>

			{/* Legend Panel */}
			<div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 border border-neutral-200 dark:border-neutral-700">
				<div className="text-xs space-y-1">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-stone-500 rounded"></div>
						<span>기초 (Foundation)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-blue-500 rounded"></div>
						<span>기둥 (Columns)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-orange-500 rounded"></div>
						<span>슬라브 (Slabs)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-red-600 rounded"></div>
						<span>지붕 (Roof)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-gray-400 rounded opacity-30"></div>
						<span>벽체 (Walls)</span>
					</div>
				</div>
				<div className="mt-3 pt-3 border-t border-neutral-300 dark:border-neutral-600 text-xs text-neutral-600 dark:text-neutral-400">
					<p>마우스 드래그: 회전</p>
					<p>휠: 줌</p>
					<p>우클릭 드래그: 이동</p>
				</div>
			</div>

			{/* Canvas Container */}
			<div ref={containerRef} className="w-full h-full" />
		</div>
	);
}

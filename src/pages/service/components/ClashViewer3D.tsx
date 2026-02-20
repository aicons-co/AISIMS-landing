import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type ClashItem = {
	id: string;
	type: 'Hard Clash' | 'Soft Clearance';
	elementA: string;
	elementB: string;
	severity: 'High' | 'Medium' | 'Low';
	location: [number, number, number];
	distance: number;
	status: '미처리' | '처리중' | '해결됨';
	revisionStatus?: '신규' | '해결됨' | '지속';
};

type ClashViewer3DProps = {
	clashes: ClashItem[];
	selectedClashId: string | null;
	onClashSelect: (clashId: string | null) => void;
	showSectionPlane: boolean;
	sectionPlanePosition: number;
};

export function ClashViewer3D({
	clashes,
	selectedClashId,
	onClashSelect,
	showSectionPlane,
	sectionPlanePosition,
}: ClashViewer3DProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		controls: OrbitControls;
		clashSpheres: THREE.Mesh[];
		highlightedElements: THREE.Mesh[];
		sectionPlane?: THREE.Plane;
		clippingPlane?: THREE.PlaneHelper;
	} | null>(null);

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

		// 샘플 구조 요소 생성 (기둥, 보 등)
		const elements: THREE.Mesh[] = [];

		// 기둥들
		const columnGeometry = new THREE.BoxGeometry(0.6, 3.6, 0.6);
		const columnMaterial = new THREE.MeshStandardMaterial({ color: 0x4a90e2 });
		const column1 = new THREE.Mesh(columnGeometry, columnMaterial);
		column1.position.set(0, 1.8, 0);
		column1.userData = { id: 'Column_102', type: 'Column' };
		scene.add(column1);
		elements.push(column1);

		const column2 = new THREE.Mesh(columnGeometry, columnMaterial);
		column2.position.set(6, 1.8, 0);
		column2.userData = { id: 'Column_103', type: 'Column' };
		scene.add(column2);
		elements.push(column2);

		// 보
		const beamGeometry = new THREE.BoxGeometry(4.2, 0.3, 0.6);
		const beamMaterial = new THREE.MeshStandardMaterial({ color: 0xe67e22 });
		const beam = new THREE.Mesh(beamGeometry, beamMaterial);
		beam.position.set(2.1, 3.6, 0);
		beam.userData = { id: 'Beam_201', type: 'Beam' };
		scene.add(beam);
		elements.push(beam);

		// 덕트 (충돌 요소)
		const ductGeometry = new THREE.BoxGeometry(0.5, 0.5, 2);
		const ductMaterial = new THREE.MeshStandardMaterial({ color: 0x95a5a6 });
		const duct = new THREE.Mesh(ductGeometry, ductMaterial);
		duct.position.set(0.3, 2, 0);
		duct.userData = { id: 'Duct_12', type: 'Duct' };
		scene.add(duct);
		elements.push(duct);

		// Section Plane
		const sectionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), sectionPlanePosition);
		let clippingPlane: THREE.PlaneHelper | undefined;

		// 충돌 지점 표시
		const clashSpheres: THREE.Mesh[] = [];
		const highlightedElements: THREE.Mesh[] = [];

		const updateClashes = () => {
			// 기존 충돌 스피어 제거
			clashSpheres.forEach((sphere) => scene.remove(sphere));
			clashSpheres.length = 0;

			// 기존 하이라이트 제거
			highlightedElements.forEach((elem) => {
				if (elem.material instanceof THREE.MeshStandardMaterial) {
					elem.material.emissive.setHex(0x000000);
					elem.material.opacity = 1;
				}
			});
			highlightedElements.length = 0;

			clashes.forEach((clash) => {
				// 충돌 지점 스피어
				const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
				let sphereColor = 0xff0000; // 기본 빨강
				if (clash.revisionStatus === '해결됨') sphereColor = 0x00ff00; // 초록
				else if (clash.revisionStatus === '지속') sphereColor = 0xff8800; // 주황
				else if (clash.severity === 'High') sphereColor = 0xff0000;
				else if (clash.severity === 'Medium') sphereColor = 0xff8800;
				else sphereColor = 0xffff00;

				const sphereMaterial = new THREE.MeshStandardMaterial({
					color: sphereColor,
					emissive: sphereColor,
					emissiveIntensity: 0.5,
				});
				const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
				sphere.position.set(clash.location[0], clash.location[1], clash.location[2]);
				sphere.userData = { clashId: clash.id };
				scene.add(sphere);
				clashSpheres.push(sphere);

				// 충돌 요소 하이라이트
				const elemA = elements.find((e) => e.userData.id === clash.elementA);
				const elemB = elements.find((e) => e.userData.id === clash.elementB);

				if (elemA && elemA.material instanceof THREE.MeshStandardMaterial) {
					elemA.material.emissive.setHex(0xff0000);
					elemA.material.emissiveIntensity = 0.3;
					highlightedElements.push(elemA);
				}

				if (elemB && elemB.material instanceof THREE.MeshStandardMaterial) {
					elemB.material.emissive.setHex(0x0000ff);
					elemB.material.emissiveIntensity = 0.3;
					highlightedElements.push(elemB);
				}

				// 나머지 요소 투명도 처리
				elements.forEach((elem) => {
					if (
						elem !== elemA &&
						elem !== elemB &&
						elem.material instanceof THREE.MeshStandardMaterial
					) {
						elem.material.opacity = 0.3;
						elem.material.transparent = true;
					}
				});
			});

			// 선택된 충돌 강조
			if (selectedClashId) {
				const selectedClash = clashes.find((c) => c.id === selectedClashId);
				if (selectedClash) {
					const selectedSphere = clashSpheres.find(
						(s) => s.userData.clashId === selectedClashId
					);
					if (selectedSphere && selectedSphere.material instanceof THREE.MeshStandardMaterial) {
						selectedSphere.material.emissiveIntensity = 1.0;
						selectedSphere.scale.set(1.5, 1.5, 1.5);

						// 카메라 포커스
						camera.position.set(
							selectedClash.location[0] + 5,
							selectedClash.location[1] + 5,
							selectedClash.location[2] + 5
						);
						camera.lookAt(
							selectedClash.location[0],
							selectedClash.location[1],
							selectedClash.location[2]
						);
						controls.target.set(
							selectedClash.location[0],
							selectedClash.location[1],
							selectedClash.location[2]
						);
					}
				}
			}
		};

		// Section Plane 업데이트
		const updateSectionPlane = () => {
			if (clippingPlane) {
				scene.remove(clippingPlane);
			}

			if (showSectionPlane) {
				sectionPlane.constant = sectionPlanePosition;
				clippingPlane = new THREE.PlaneHelper(sectionPlane, 20, 0xff0000);
				scene.add(clippingPlane);

				// Clipping 적용
				renderer.localClippingEnabled = true;
				elements.forEach((elem) => {
					if (elem.material instanceof THREE.MeshStandardMaterial) {
						elem.material.clippingPlanes = [sectionPlane];
					}
				});
			} else {
				renderer.localClippingEnabled = false;
				elements.forEach((elem) => {
					if (elem.material instanceof THREE.MeshStandardMaterial) {
						elem.material.clippingPlanes = [];
					}
				});
			}
		};

		// 마우스 클릭 이벤트
		const onMouseClick = (event: MouseEvent) => {
			const rect = renderer.domElement.getBoundingClientRect();
			const mouse = new THREE.Vector2();
			mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			const raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObjects(clashSpheres);
			if (intersects.length > 0) {
				const clashId = intersects[0].object.userData.clashId;
				onClashSelect(clashId);
			} else {
				onClashSelect(null);
			}
		};

		renderer.domElement.addEventListener('click', onMouseClick);

		// 초기 충돌 표시
		updateClashes();
		updateSectionPlane();

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

		sceneRef.current = {
			scene,
			camera,
			renderer,
			controls,
			clashSpheres,
			highlightedElements,
			sectionPlane,
			clippingPlane,
		};

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.domElement.removeEventListener('click', onMouseClick);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clashes, selectedClashId, showSectionPlane, sectionPlanePosition]);

	return <div ref={containerRef} className="w-full h-full" />;
}


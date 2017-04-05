var scene, camera, renderer, material, controls;
var pyramidGeometry;
var THREE;

init();
animate();
addPyramids();
render();

function addPyramids () {
	var xDistance = 50;
	var zDistance = 30;
	pyramidGeometry = new THREE.CylinderGeometry(0, 0.8, 2, 4, false);
	for (var t = 0; t < pyramidGeometry.faces.length; t++) {
		pyramidGeometry.faces[0].color = new THREE.Color(0x3bc6b6);
		pyramidGeometry.faces[1].color = new THREE.Color(0x3bc6b6);
		pyramidGeometry.faces[2].color = new THREE.Color(0xff5ba5);
		pyramidGeometry.faces[3].color = new THREE.Color(0xff5ba5);
		pyramidGeometry.faces[4].color = new THREE.Color(0x9957cd);
		pyramidGeometry.faces[5].color = new THREE.Color(0x9957cd);
		pyramidGeometry.faces[6].color = new THREE.Color(0x9957cd);
		pyramidGeometry.faces[7].color = new THREE.Color(0x9957cd);
	}

	material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide });

	var xOffset = -80;

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			var mesh = new THREE.Mesh(pyramidGeometry, material);
			mesh.position.x = (xDistance * i) + xOffset;
			mesh.position.z = (zDistance * j);
			scene.add(mesh);
		}
	}

}

function init () {

	renderer = new THREE.WebGLRenderer({ alpha: true });
	// renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// Add renderer to page
	document.body.appendChild(renderer.domElement);

	// Create camera.
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 100;

	// Add controls
	// controls = new THREE.TrackballControls(camera);
	// controls.addEventListener('change', render);

	// Create scene.
	scene = new THREE.Scene();

	// Create ambient light and add to scene.
	var light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);

	// Create directional light and add to scene.
	var directionalLight = new THREE.DirectionalLight(0xfffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);

	// Add listener for window resize.
	window.addEventListener('resize', onWindowResize, false);
}

function animate () {

	requestAnimationFrame(animate);
	// controls.update();

}

function render () {
	renderer.render(scene, camera);
}

function onWindowResize () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// controls.handleResize();
}

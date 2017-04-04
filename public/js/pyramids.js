var scene, camera, renderer;
var pyramidGeometry, material, mesh;

init();
animate();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 0, 10);
	camera.lookAt(scene.position);
	scene.add(camera);

	pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);
	for(let i = 0; i < pyramidGeometry.faces.length; i++){
		if(pyramidGeometry.faces[i] instanceof THREE.Face4){
			pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
			if((i % 2) == 0){
				pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
				pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
				} else {
				pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
				pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
				}
			pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
			} else {
			pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
			pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
			pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
		}
	}

	material = new THREE.MeshBasicMaterial( { vertexColors:THREE.VertexColors, side:THREE.DoubleSide });

	mesh = new THREE.Mesh( pyramidGeometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

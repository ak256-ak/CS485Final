/* Global variables.  */
var scene, camera, renderer;

/* Constants.  */
var scr = /* Screen dimensions.  */
{
	w: window.innerWidth,
	h: window.innerHeight
}

var gAccel = -9.81; /* g = 9.81 m/s^2.  */

//var particleCount = 4096; /* Falling particles.  */
var particleCount = 9096; /* Falling particles.  */
var lowerParticleCount = 100; /* Particles at the base of the waterfall.  */

/* Data structs.  */
var waterfall =
{
	w: scr.w / 4, /* Real width.  */
	h: scr.h / 4, /* Upper start point.  */
	startX: scr.w / 4, /* Lateral right start point.  */
	l: -(scr.h / 5) /* Lower maximum (stop) point.  */
}

var globlPart = /* Falling particles coordinate proprieties.  */
{
	pXVar: waterfall.w,
	pXMean: - (scr.w / 8),

	pYVar: 4000,
	pYMean: - 10,

	pZVar: - 50,
	pZMean: - 100,

	initVel: 0.5,
	visible: false
};

var wall = /* Waterfall wall.  */
{
	h: scr.h / 2,
	pZ: globlPart.pZMean - (scr.w / 1.9)
};

var lowerGloblPart =
{
	pXVar: waterfall.w,
	pXMean: - (scr.w / 8),

	pYVar: 0,
	pYMean: waterfall.l * 1.18,

	pZVar: - 50,
	pZMean: - 75,

	initVel: 80,
	deaccel: - 0.5
};

var riverOutput = /* Two rectangles drawn at the end of the river.  */
{
	dimY: 20,
	dimZ: -lowerGloblPart.pZVar,
	startX: globlPart.pXVar + globlPart.pXMean + 2
};
var riverOutputStruct =
{
	X0: riverOutput.startX,
	Y0: waterfall.h - riverOutput.dimY,
	Z0: globlPart.pZMean,

	X1: riverOutput.startX,
	Y1: waterfall.h,
	Z1: globlPart.pZMean,

	X2: riverOutput.startX,
	Y2: waterfall.h - riverOutput.dimY,
	Z2: globlPart.pZMean - riverOutput.dimZ
};

var trees =
{
	scaleX: 64, /* Trees are 64*64.  */
	scaleY: 64,

	posXRight: riverOutput.startX + 50,
	posYRight: waterfall.h + 32, /* + 32 = 64 / 2.  */
	posZRight: globlPart.pZMean - 100
}

var treeTrunkStruct =
{
	radius: 20,
	height: 100,

	posX: riverOutput.startX + 200,
	posY: (waterfall.l * 1.2) + 2.5,
	posZ: 300,

	rotX: -90,
	rotZ: 90
}


/* Other structs */
var particles = []; /* Falling particles.  */

var lowerParticles = []; /* Lower water particles.  */

var particleSys;
var lowerParticleSys;

var time = []; /* Clock for main waterfall particles.  */
var lowerTime = []; /* Clock for main waterfall particles.  */

var cameraControls; /* Used to control camerda from mouse */
var clock = new THREE.Clock (); /* Clock for camera controls.  */


/* Function that calls all the other functions.  */
function main() 
{

	init (); /* Define main structures.  */

	createEnvironment (); /* Create objects.  */

	defineParticles (); /* Create particles.  */
 
        render (); /* Start rendering.  */

}

/* Function used to initialize all the core elements like scene, camera, 
   light and fog.  */
// function init () 
// {

// 	scene = new THREE.Scene();
// 	camera =  new THREE.PerspectiveCamera (45, scr.w / scr.h, 0.1, 10000);

//         renderer = new THREE.WebGLRenderer ({ antialias: true });
//         renderer.gammaInput = true;
//         renderer.gammaOutput = true;
//         renderer.setClearColor (new THREE.Color (0xffffff, 1.0));
// 	renderer.setSize (scr.w, scr.h);

	

// 	/* Camera positioning and pointing it to the center of the scene.  */
// 	camera.position.x = -waterfall.startX * 2;
// 	camera.position.y = waterfall.h * 4;
// 	camera.position.z = waterfall.h * 4;
// 	/* Look at the center of the scene.  */
// 	camera.lookAt (0, 0, 0);

//         /* Add the output of the renderer to the html element.  */
//         document.getElementById("WebGL-output").appendChild 
// 						(renderer.domElement);

//         /* Camera mouse controls.  */
//         cameraControls = new THREE.OrbitAndPanControls (camera, 
// 							renderer.domElement);
//         cameraControls.target.set (0,0,0);

// 	/* Sun light.  */
// 	var sunLight = new THREE.DirectionalLight (0x0f0f0f, 100.0);
// 	sunLight.position.set (-riverOutput.startX, 64000,
// 				riverOutput.dimZ + 20).normalize();
// 	scene.add (sunLight);

// 	/* Fog. */
// 	scene.fog = new THREE.FogExp2( 0x2f2f2f, 0.00050 );

//         window.addEventListener ('resize', onWindowResize, false);

// }

// /* Function used to call other functions that create all objects except the 
//    particles.  */

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, scr.w / scr.h, 0.1, 10000);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.setSize(scr.w, scr.h);
  
	camera.position.x = -waterfall.startX * 2;
	camera.position.y = waterfall.h * 4;
	camera.position.z = waterfall.h * 4;
	camera.lookAt(0, 0, 0);
  
	THREE.ImageUtils.crossOrigin = 'anonymous'; 

	// Load the waterfall texture
	//const waterfallTexture = THREE.ImageUtils.loadTexture('pictures/waterfall.jpg'); //connects the picture
  
	// Create a material using the waterfall texture
	//const waterfallMaterial = new THREE.MeshBasicMaterial({ map: waterfallTexture });
  
	// Create a plane geometry to represent the waterfall
	//const waterfallGeometry = new THREE.PlaneGeometry(100, 100);
	
	// Create a mesh using the waterfall geometry and material
	//const waterfallMesh = new THREE.Mesh(waterfallGeometry, waterfallMaterial);
	//waterfallMesh.position = (0, 200, 200);
  
	// Add the mesh to the scene
	//scene.add(waterfallMesh);
  
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);
  
	var sunLight = new THREE.DirectionalLight(0x0f0f0f, 70.0); //100.0 to 70 to get the correct fog color 
	sunLight.position.set(-riverOutput.startX, 64000, riverOutput.dimZ + 20).normalize();
	scene.add(sunLight);
	scene.fog = new THREE.FogExp2(0x2f2f2f, 0.001); // changing density
	//scene.fog = new THREE.FogExp2(0x2f2f2f, 0.00050); //density 

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
  }


  //scene.fog = new THREE.FogExp2(0xCCE0FF, 0.00050);//  blue with a slight grayish tint.
    //scene.fog = new THREE.FogExp2(0x2f2f2f, 0.00005);
    //scene.fog = new THREE.FogExp2(0xffffff, 0.00050);//makes it white 
	//scene.fog = new THREE.FogExp2(0x2f2f2f, 0.00050); //orig
	//scene.fog = new THREE.FogExp2(0x000000, 0.0005);// add later if needed 
	//scene.fog = new THREE.FogExp2(0x2f2f2f, 0.001); // density for fog 
	//scene.fog = new THREE.FogExp2(0x2f2f2f, 0.01);
    //scene.fog = new THREE.FogExp2(0x2f2f2f, 0.00025);
  
function createEnvironment ()
{

	/* Use screen width and height as variables to create
           some objects.  */
	createWaterfallWall (scr.w, waterfall.h * 2, scr.w, wall.pZ);
	createTrees ();
	createTreeTrunk ();
	initTween ();
	createLake (- ((scr.w) * 2), (scr.w * 2), 0, waterfall.l * 1.2, 0,
		    -90);
	createRiverOutput ();
	createRiver (riverOutput.startX * 2, 0, scr.w, waterfall.h + 2, 
		     wall.pZ);
	createSkyBox ();

}

//fun to creat a box for waterfall
function createWaterfallWall (dimX, dimY, dimZ, posZ)
{
var lWall, lWallGeometry, lWallMaterial, lWallTex;


	lWallGeometry = new THREE.BoxGeometry (dimX, dimY, dimZ);
	lWallMaterial = new THREE.MeshPhongMaterial ({ color: 0x654321  });

	lWall = new THREE.Mesh (lWallGeometry, lWallMaterial);

	lWall.position.z = posZ;

	scene.add (lWall);

}


// // Load fence texture
// var fenceTexture = THREE.ImageUtils.loadTexture("textures/fence.jpg", undefined, function() {
// 	// This function is called when the texture is loaded
// 	// Create plane geometry for fence
// 	var fenceGeometry = new THREE.PlaneGeometry(100, 20);
// 	var fenceMaterial = new THREE.MeshBasicMaterial({ map: fenceTexture, side: THREE.DoubleSide });
// 	var fence = new THREE.Mesh(fenceGeometry, fenceMaterial);
  
// 	// Set position and rotation of fence
// 	fence.position.set(0, 10, -500);
// 	fence.rotation.set(0, Math.PI / 2, 0);
  
// 	// Add fence to scene
// 	scene.add(fence);
//   }, function() {
// 	// This function is called if there is an error loading the texture
// 	console.log("Error loading fence texture");
//   });
  
//   // Handle errors
//   if (!fenceTexture) {
// 	console.log("Error loading fence texture");
//   } else {
// 	// Texture is still loading, so add placeholder fence until texture is ready
// 	var placeholderFenceGeometry = new THREE.BoxGeometry(10, 10, 10);
// 	var placeholderFenceMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 	var placeholderFence = new THREE.Mesh(placeholderFenceGeometry, placeholderFenceMaterial);
// 	placeholderFence.position.set(0, 10, -500);
// 	scene.add(placeholderFence);
//   }
  


// /* Creates some trees on the top of the box.  */
function createTrees ()
{

	var i, tree;6

	
	var treeTexture = THREE.ImageUtils.loadTexture ("textures/bushess.png");


	var treeMaterial = new THREE.SpriteMaterial ({ map: treeTexture, 
 						       useScreenCoordinates: 
						       false });
	for (i = 0; trees.posZRight - (i * 100) > -scr.w; i++)
	{
// 		/* Right bushes.  */
	tree = new THREE.Sprite (treeMaterial); //using sprite so the bushes will always face the camera.
						 
// 		/* z distance between each tree is 100.  */
               	tree.position.set (trees.posXRight , trees.posYRight, 
				   trees.posZRight - (i * 100));
                tree.scale.set (trees.scaleX, trees.scaleY, 1.0);
       	        scene.add (tree);

//		/* Left bush.  */
		tree = new THREE.Sprite (treeMaterial);
             	tree.position.set (-trees.posXRight , trees.posYRight, 
			   trees.posZRight - (i * 100));
                tree.scale.set (trees.scaleX, trees.scaleY, 1.0);
      	        scene.add (tree);
	}

 }

/* Function that creates the mesh of the floating tree trunk in the lake.  */
function createTreeTrunk ()
{

	var treeTrunkGeometry, treeTrunkMaterial, treeTrunkTex;


	treeTrunkGeometry = new THREE.CylinderGeometry (treeTrunkStruct.radius,
							treeTrunkStruct.radius,
							treeTrunkStruct.height,
							100, 100, false);
	treeTrunkTex = applyTex ("textures/treeTrunkTex.jpg", 1, 1);
	treeTrunkMaterial = new THREE.MeshBasicMaterial ({ map: treeTrunkTex });
	treeTrunk = new THREE.Mesh (treeTrunkGeometry, treeTrunkMaterial);

	
	 treeTrunk.position.x = treeTrunkStruct.posX;
	 treeTrunk.position.y = treeTrunkStruct.posY;
	 treeTrunk.position.z = treeTrunkStruct.posZ;
	
	treeTrunk.rotation.x = (treeTrunkStruct.rotX * Math.PI) / 180.0;
	treeTrunk.rotation.z = (treeTrunkStruct.rotZ * Math.PI) / 180.0;

	treeTrunk.visible = false;

	//scene.add (treeTrunk);

}

// /* Creates lake using color and texture.  */
// function createLake (dimX, dimY, posX, posY, posZ, rotX)
// {
	
// 	var lLake, lLakeGeometry, lLakeMaterial, lLakeTex;

	
// 	lLakeGeometry = new THREE.PlaneGeometry (dimX, dimY);
	
// 	lLakeTex = applyTex ("textures/waterr.jpg", 100, 100)// to a new base 
	

// 	lLakeMaterial = new THREE.MeshBasicMaterial ({ color: 0x0077be,  side: THREE.DoubleSide, map: lLakeTex });

// 	lLake = new THREE.Mesh (lLakeGeometry, lLakeMaterial);
	
// 	lLake.position.x = posX;
// 	lLake.position.y = posY;
// 	lLake.position.z = posZ;

// 	lLake.rotation.x = (rotX * Math.PI) / 180.0;


// 	scene.add (lLake);

// }
function createLake(dimX, dimY, posX, posY, posZ, rotX) {
	var lLake, lLakeGeometry, lLakeMaterial, lLakeTex;
  
	lLakeGeometry = new THREE.PlaneGeometry(dimX, dimY);
	lLakeTex = new THREE.TextureLoader().load("textures/waterr.jpg"); // load from texture
  
	lLakeMaterial = new THREE.MeshBasicMaterial({
	  color: 0x1a5a99,
	  side: THREE.DoubleSide,
	  map: lLakeTex
	});
  
	lLake = new THREE.Mesh(lLakeGeometry, lLakeMaterial);
	lLake.position.x = posX;
	lLake.position.y = posY;
	lLake.position.z = posZ;
  
	lLake.rotation.x = (rotX * Math.PI) / 180.0; // rotation X aixs 
  
	scene.add(lLake);
  }
  




	//0x0077be  ,  0x1a5a99
	// use the RGB value or hex code for the color
	//lLakeTex = applyTex ("textures/water.jpg", 50, 50);// try changing this
	//lLakeMaterial = new THREE.MeshBasicMaterial ({ color:0x00005f,  side: THREE.DoubleSide,map:lLakeTex }); too dark 
	//lLakeMaterial = new THREE.MeshBasicMaterial ({ color:0xADD8E6,  side: THREE.DoubleSide,map:lLakeTex }); too light
	//lLakeMaterial = new THREE.MeshBasicMaterial ({ color: 0x87CEEB, side: THREE.DoubleSide, map: lLakeTex }); nope 
	// lLakeMaterial = new THREE.MeshBasicMaterial ({ color: 0x0077be,  side: THREE.DoubleSide, map: lLakeTex });
	// //0x0077be  ,  0x1a5a99
	// // use the RGB value or hex code for the color

// 	lLake = new THREE.Mesh (lLakeGeometry, lLakeMaterial);
	
// 	lLake.position.x = posX;
// 	lLake.position.y = posY;
// 	lLake.position.z = posZ;

// 	lLake.rotation.x = (rotX * Math.PI) / 180.0;


// 	scene.add (lLake);

// }



function createRiverOutput ()
{

	var A ,B, riverOutputMaterial, mesh;


	riverOutputMaterial = new THREE.MeshPhongMaterial ({ color: 0x2f2f2f,
							     side: THREE.
							     DoubleSide });

	//right a and b 
	A = new THREE.Geometry();
	A.vertices.push (new THREE.Vector3 (riverOutputStruct.X0, 
					    riverOutputStruct.Y0, 
					    riverOutputStruct.Z0));
	A.vertices.push (new THREE.Vector3 (riverOutputStruct.X1, 
					    riverOutputStruct.Y1, 
					    riverOutputStruct.Z1));
	A.vertices.push (new THREE.Vector3 (riverOutputStruct.X2, 
					    riverOutputStruct.Y2, 
					    riverOutputStruct.Z2));
	A.faces.push (new THREE.Face3 (0, 1, 2));
	mesh = new THREE.Mesh (A, riverOutputMaterial);
	scene.add (mesh);

	B = new THREE.Geometry();
	B.vertices.push (new THREE.Vector3 (riverOutputStruct.X0, 
					    riverOutputStruct.Y1,
					    riverOutputStruct.Z2));
	B.vertices.push (new THREE.Vector3 (riverOutputStruct.X1, 
					    riverOutputStruct.Y2,
					    riverOutputStruct.Z2));
	B.vertices.push (new THREE.Vector3 (riverOutputStruct.X2, 
					    riverOutputStruct.Y1,
					    riverOutputStruct.Z1));
	B.faces.push (new THREE.Face3 (0, 1, 2));
	mesh = new THREE.Mesh (B, riverOutputMaterial);
	scene.add (mesh);

	//left a and b 
	A = new THREE.Geometry();
	A.vertices.push (new THREE.Vector3 (-riverOutputStruct.X0, 
					    riverOutputStruct.Y0,
					    riverOutputStruct.Z0));
	A.vertices.push (new THREE.Vector3 (-riverOutputStruct.X1, 
					    riverOutputStruct.Y1, 
					    riverOutputStruct.Z1));
	A.vertices.push (new THREE.Vector3 (-riverOutputStruct.X2, 
					    riverOutputStruct.Y2,
					    riverOutputStruct.Z2));
	A.faces.push (new THREE.Face3 (0, 1, 2));
	mesh = new THREE.Mesh (A, riverOutputMaterial);
	scene.add (mesh);

	B = new THREE.Geometry();
	B.vertices.push (new THREE.Vector3 (-riverOutputStruct.X0, 
					    riverOutputStruct.Y1,
					    riverOutputStruct.Z2));
	B.vertices.push (new THREE.Vector3 (-riverOutputStruct.X1, 
					    riverOutputStruct.Y2, 
					    riverOutputStruct.Z2));
	B.vertices.push (new THREE.Vector3 (-riverOutputStruct.X2, 
					    riverOutputStruct.Y1,
					    riverOutputStruct.Z1));
	B.faces.push (new THREE.Face3 (0, 1, 2));
	mesh = new THREE.Mesh (B, riverOutputMaterial);
	scene.add (mesh);

}

/* Creates river with water texture on top of the box.  */
function createRiver (dimX, dimY, dimZ, posY, posZ)
{

	var lRiver, lRiverGeometry, lRiverMaterial, lRiverTex;


	lRiverGeometry = new THREE.BoxGeometry (dimX, dimY, dimZ);
	lRiverTex = applyTex ("textures/lakewater.jpg", 4, 8); //changed (4,8) to (8,8)

	lRiverMaterial = new THREE.MeshBasicMaterial ({ map:lRiverTex });
	//lRiverMaterial = new THREE.MeshPhongMaterial ({ map: lRiverTex });

	lRiver = new THREE.Mesh (lRiverGeometry, lRiverMaterial);

	lRiver.position.y = posY;
	lRiver.position.z = posZ;

	scene.add (lRiver);
	
}

/* Function that creates the skybox with 512*512 size pictures.  */
function createSkyBox ()
{

	var path, urls, textureCube, shader, skyMaterial, sky;


	path = "textures/";
	urls = [ path + "zpos.png", path + "zpos.png", path + "zpos.png",
		 path + "zpos.png", path + "zpos.png", path + "zpos.png" ];

        textureCube = THREE.ImageUtils.loadTextureCube (urls);
        textureCube.format = THREE.RGBFormat;

	shader = THREE.ShaderLib.cube;
	shader.uniforms.tCube.value = textureCube;

	skyMaterial = new THREE.ShaderMaterial
	({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	/*  Define the skybox: it's a cube 4096*4096*4096.  */
	sky = new THREE.Mesh (new THREE.BoxGeometry (4096, 4096, 4096),
						     skyMaterial);
	scene.add (sky);

}

/* Function that creates both the falling particles and also the particles at
   the base of the waterfall.  */
function defineParticles ()
{

	var particleTex, p, pGeometry;

// create a new geometry for the particles
	pGeometry = new THREE.Geometry();
	particleTex = applyTex ("textures/drop2.png", 1, 1);
        pMaterial = new THREE.PointCloudMaterial
	({
		color: 0x3399ff, /* Blue-like colour.  */
		map: particleTex, /* Texture.  */
		size: 10,
		sizeAttenuation: true,
		fog: true,
		transparent: true, /* Alpha channel = 0; propriety inherited
				      from Material.  */
	});

	/* Creates falling particles.  */
        for (p = 0; p < particleCount; p++)
	{
                /* Initial position and velocity added to pGeometry.  */
                particles[p] =
		{
			position: new THREE.Vector3 (
				  (Math.random() * globlPart.pXVar) +
				  globlPart.pXMean,
				  (Math.random() * globlPart.pYVar) +
				  globlPart.pYMean,
				  (Math.random() * globlPart.pZVar) +
				  globlPart.pZMean),
			velocity: new THREE.Vector3 (
				   0,
				   0.5,
				   (Math.random() * globlPart.initVel) +
				   globlPart.initVel)
		};
                pGeometry.vertices.push (particles[p].position);

		/* Start the particle clock.  */
		time[p] = new THREE.Clock ();
		time[p].start ();
        }

        particleSys = new THREE.PointCloud (pGeometry ,pMaterial);
		particleSys.sortParticles = true;
		particleSys.visible = false; /* Inherited from Object3D.  */
		scene.add (particleSys);

	/* Create lower particles.
	   See previous comments.  */
	pGeometry = new THREE.Geometry();
	particleTex = applyTex ("textures/fogdrop.png", 1, 1);
        pMaterial = new THREE.PointCloudMaterial
	({
		color: 0xffffff,
		map: particleTex,
		size: 10,
		sizeAttenuation: true,
		fog: true,
		transparent: true,
	});

        for (p = 0; p < lowerParticleCount; p++)
	{
		lowerParticles[p] =
		{
			position: new THREE.Vector3 (
				  (Math.random() * lowerGloblPart.pXVar) +
				  lowerGloblPart.pXMean,
				  lowerGloblPart.pYMean,
				  (Math.random() * lowerGloblPart.pZVar) +
				  lowerGloblPart.pZMean),
			velocity: new THREE.Vector3 (
				  lowerGloblPart.initVel,
				  0.5,
				  (Math.random() * lowerGloblPart.initVel) +
				  lowerGloblPart.initVel)
		};
                pGeometry.vertices.push (lowerParticles[p].position);

		lowerTime[p] = new THREE.Clock ();
		lowerTime[p].start ();
	}

        lowerParticleSys = new THREE.PointCloud (pGeometry ,pMaterial);
	lowerParticleSys.sortParticles = true;
	lowerParticleSys.visible = false;

	scene.add (lowerParticleSys);

}

/* Rendering loop.  */
function render ()
{

	/* Update particles.  */
	particleMgr ();

	/* Update camera which depends from mouse controls.  */
        var delta = clock.getDelta();
        cameraControls.update (delta);

	/* Update tree trunk. */
	TWEEN.update();

        /* If the waterfall particles are not yet visible...  */
        if (particleSys.visible == true && treeTrunk.visible == false)
                treeTrunk.visible = true;

	/* Render scene.  */
	renderer.render (scene, camera);
        /* Next rendering request, i.e. loop.  */
	requestAnimationFrame (render);

}

/* Particle manager function, called by renderer.  */
function particleMgr ()
{

	fallingParticlesMgr ();
	lowerParticlesMgr ();

}

/* Function that manages particles falling from the waterfall.  */
function fallingParticlesMgr ()
{

	/* Get the number of particles.  */
	var pCount = particleCount;
	while (pCount--) /* Loop all particles. */
	{
		/* Get the current particle.  */
		var particle = particles[pCount];
		/* Calculate elapsed time and use modulus operator to
		   solve animation problems.  */
		var elapsed = (time[pCount].getElapsedTime ()) % 20;
		/* Check if we need to reset particle position.  */
		if (particle.position.y < waterfall.l - Math.random() * 190) /* - height */ //added 190 math random to avoid chunks 
		{
			/* Check if the particles can be made visible.  */
			if (particleSys.visible == false && pCount == 1)
				particleSys.visible = true;

			/* Particle clock reset.  */
			time[pCount] = new THREE.Clock ();
			time[pCount].start ();

			/* Assign random positions for x and z (in a fixed 
			   range), but not for y which has fixed values.  */
			particle.position.x = (Math.random()
					       * globlPart.pXVar)
					      + globlPart.pXMean;
			particle.velocity.x = 0;

			particle.position.y = waterfall.h;
			particle.velocity.y = globlPart.initVel;

			particle.position.z = (Math.random()
					       * globlPart.pZVar)
					      + globlPart.pZMean;
			particle.velocity.z = (Math.random()
					       * globlPart.initVel)
					      + globlPart.initVel;
		}
		else
		{
			/* vy = g * t (where t is the leapsed time.)  */
       	                particle.velocity.y = gAccel * elapsed;
			/* y = 1/2 * g * t^2 (uniform acceleration.)  */
			particle.position.y += (1/2) * particle.velocity.y
					       * elapsed;

			/* vz = v0 (where z corresponds to x.)  */
			particle.velocity.z += 0;
			/* z = v0 * t  */
			particle.position.z += particle.velocity.z * elapsed;
		}
		/* Reassign particle to main particles array  */
		particles[pCount] = particle;

	}

}

function lowerParticlesMgr ()
{

	var pCount = lowerParticleCount;
	while (pCount--)
	{
		if (particleSys.visible == true && pCount == 1)
			lowerParticleSys.visible = true;

		/* Get the current particle.  */
		var particle = lowerParticles[pCount];
		/* Calculate elapsed time.  */
		var elapsed = (lowerTime[pCount].getElapsedTime ()) % 20;

		/* Check if we need to reset particle x position.  */
		if (particle.position.x < -(waterfall.startX * 2)
		    || particle.position.x > waterfall.startX * 2)
		{
				/* clock reset */
				lowerTime[pCount] = new THREE.Clock ();
				lowerTime[pCount].start ();

				particle.position.x = (Math.random()
						       * lowerGloblPart.pXVar) 
						      + lowerGloblPart.pXMean;
				particle.velocity.x = lowerGloblPart.initVel;

		}
		/* Check if we need to reset z position.  */
		if (particle.position.z < lowerGloblPart.pZMean
		    || particle.position.z > 2*-lowerGloblPart.pZMean)
		{
			/* Clock reset.  */
			lowerTime[pCount] = new THREE.Clock ();
			lowerTime[pCount].start ();

			particle.position.z = (Math.random() *
					       (lowerGloblPart.pZVar - 10)
					       * 4)
					       + lowerGloblPart.pZMean + 100;
			particle.velocity.z = lowerGloblPart.initVel / 2;
		}

		/* particle.velocity.x has been changed to particle.position.x 
		   in the first round bracket.  */
		particle.position.x = particle.position.x 
				      + (particle.position.x * elapsed)
				      + ((1 / 2) * lowerGloblPart.deaccel 
				      * elapsed * elapsed); /* Using speed 
							       attenuation
							       (deaccel).  */
		particle.position.z = particle.position.z
				      + (particle.position.z * elapsed);

		/* Reassign particle to main particles array  */
		lowerParticles[pCount] = particle;
	}

}

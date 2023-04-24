/* Function used to handle window resize.  */
function onWindowResize ()
{

        var canvasWidth = window.innerWidth;
        var canvasHeight = window.innerHeight;

        renderer.setSize (canvasWidth, canvasHeight);

        camera.aspect = canvasWidth/ canvasHeight;
        camera.updateProjectionMatrix ();

}

/* Function that applies a texture specified by "location" to meshes, using
   "wrappingX" and "wrappingY" parameters.  */
function applyTex (location, wrappingX, wrappingY)
{

        var texName;


        texName = THREE.ImageUtils.loadTexture (location);
        texName.wrapS = texName.wrapT = THREE.RepeatWrapping;
        texName.repeat.set (wrappingX, wrappingY);

        return texName;

}

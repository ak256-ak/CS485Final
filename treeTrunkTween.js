// /* This variable is declared here (and not in main.js) to avoid problems 
//    inside initTween function.  */
// var treeTrunk;

// /* Function that animates the tree trunk using TWEEN.js library.  */
// function initTween ()
// {

// 	/* Initial position.  */
// 	var source =
// 	{
// 		x: treeTrunkStruct.posX,
// 		y: treeTrunkStruct.posY,
// 		z: treeTrunkStruct.posZ
// 	};

// 	/* Final position.  */
// 	var target =
// 	{
// 		x: treeTrunkStruct.posZ,
// 		y: treeTrunkStruct.posY-10,
// 		z: treeTrunkStruct.posZ
// 	};


// 	TWEEN.removeAll();

// 	var tween1 = new TWEEN.Tween (source)
// 		.to (target, 1200) /* Animation lasts 1200 ms.  */
// 		.repeat (Infinity) /* Animation never stops.  */
// 		.yoyo (true) /* Yoyo effect.  */
// 		/* Animation interpolating function.  */
// 		.easing (TWEEN.Easing.Elastic.InOut)
// 		.onUpdate (function () /* Tween update function.  */
// 		{
// 			/* Reassign old position at the end of each loop.  */
// 			treeTrunk.position.y = source.y;
// 			/* Give a rotation effect to the trunk.  */
// 			treeTrunk.rotation.x += 0.1;
// 		})

// 	tween1.start (); /* Animation loop.  */

// }
var treeTrunkStruct = { /* properties and values */ };

/* This variable is declared here (and not in main.js) to avoid problems 
   inside initTween function.  */
   var treeTrunk;

   /* Function that animates the tree trunk using TWEEN.js library.  */
   function initTween ()
   {
   
	   /* Initial position.  */
	   var source =
	   {
		   x: treeTrunkStruct.posX,
		   y: treeTrunkStruct.posY,
		   z: treeTrunkStruct.posZ
	   };
   
	   /* Final position.  */
	   var target =
	   {
		   x: treeTrunkStruct.posZ,
		   y: treeTrunkStruct.posY-10,
		   z: treeTrunkStruct.posZ
	   };
   
   
	   TWEEN.removeAll();
   
	   var tween1 = new TWEEN.Tween (source)
		   .to (target, 1200) /* Animation lasts 1200 ms.  */
		   .repeat (Infinity) /* Animation never stops.  */
		   .yoyo (true) /* Yoyo effect.  */
		   /* Animation interpolating function.  */
		   .easing (TWEEN.Easing.Elastic.InOut)
		   .onUpdate (function () /* Tween update function.  */
		   {
			   /* Reassign old position at the end of each loop.  */
			   treeTrunk.position.y = source.y;
			   /* Give a rotation effect to the trunk.  */
			   treeTrunk.rotation.x += 0.1;
		   });
   
	   tween1.start (); /* Animation loop.  */
   
	   return tween1; // Return the tween for further use
   }
   
   var tween = initTween(); // Call the initTween function and get the returned tween
   
   // Example of how to stop the tween after some time
   setTimeout(function() {
	 tween.stop(); // Stop the tween after 5000ms
   }, 5000);
   
   scene.remove(treeTrunk);

$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

     /*drawGrid();*/

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
          createPlatform(300,620,60,10); // jump 1
          createPlatform(500,590,60,10);// 2
          createPlatform(650,520,60,10);//3
          createPlatform(400, 440, 20, 10);// collectable pf
         
          createPlatform(705, 500, 10, 30);//stairs
         createPlatform(710, 500, 50, 10);
         createPlatform(750, 480, 10, 30);
         createPlatform(750, 480, 800, 10);
         createPlatform(1299, 440,10, 50 );
         createPlatform(1100,330, 100, 10);// lv 2 jump 1
         createPlatform(1000,260, 100, 10);
         createPlatform(200,150, 800, 10);

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
         
    createCollectable("flower", 300, 510, 0.2, 1);
    createCollectable("flower",390, 395, 0.2,1);
    createCollectable("flower", 1325, 400, 0.2, 1);
    createCollectable("flower", 1025, 200, 0.2, 1);
    createCollectable("flower", 300, 100, 0.2, 1);
    
    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)
      createCannon("right", 800, 1000, 40,20);
      createCannon("top", 1400, 800, 40, 20);
      createCannon("left", 170, 1200, 40, 20);

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});

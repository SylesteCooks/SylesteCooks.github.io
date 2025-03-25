var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
      
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
            
            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'blue');// draws a rectanlge, sets the parameters to canvas width/height, sets the color as yellow, then stores that information
            background.addChild(backgroundFill);// add the background fill variable to the background
            
            // TODO 2: - Add a moon and starfield
            for(var i = 0; i < 100; i++) {
                var circle = draw.circle(5, "yellow", "yellow", 2);// create a circle with a specified radius, border color, fill color, alpha, and stores it in the variable "circle"
                circle.x = canvasWidth * Math.random();// sets random x position within canvas width
                circle.y = groundY * Math.random();//sets random y position within groundY range
                background.addChild(circle);// adds the star to the background container
            }
            
            var moon = draw.bitmap("img/moon.png"); //creates a bitmap object using the moon image and stores it in the moon variable
            moon.x = canvas.width-500; // sets the moon x position to 300
            moon.y = canvas.height-900; // sets the moon y position to 2000
            moon.scaleX = 0.5; // scales to moons width 
            moon.scaleY = 0.5;// scales the moons height
            background.addChild(moon); //add the moon to the background container

           
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; i++) {
                var buildingColors = ["red", 'green', "pink", 'yellow', 'purple'];// creates an array and assigns diffrent colors to change the color of the building
                var buildingHeight = 300 * Math.random(0,100);// giving the building a height
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);//draws a rectangle with a width of 75, buildingHeight is the height, buildingColor is the fill color, black is the outline, and 1 is the outline width. 
                building.x = 200 * i;//multiply 200 by the current i value and store it as the x position for the building
                building.y = groundY - buildingHeight;// takes the groundY subtracts the building height and stores that as the Y value
                background.addChild(building);// adds our building to the background container 
                buildings.push(building);//adds the building the the background array for further manipulation
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");// creates a bitmap for the tree image and stores it in the variable tree
            tree.x = canvasWidth ;// place the tree off screen to the right
            tree.y = groundY - 225;// places the tree abve the ground, adjusted for tree height
            background.addChild(tree);// add the tree to the background container
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= 5;//moves the tree to the left by subtracting 5 from its current x position
            if (tree.x < -400) {
                tree.x = canvasWidth;
              }
            
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++) {
                    var building = buildings[i];
                    building.x -= 2;
                    if (building.x < -200){
                        building.x = canvasWidth;
                    }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

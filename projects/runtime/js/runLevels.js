var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacles (x, y, hitSize, damage, image){
      var hitZoneSize = hitSize;//define the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage;//defines the amount of damage obstacle causes and assign it to variable
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle hitzone using the size and dama   ge as parameters and assigns it to a variable 
      obstacleHitZone.x = x;// sets the x cordinate of the obstacle
      obstacleHitZone.y = y;//sets the y positon of the obstacle
      game.addGameItem(obstacleHitZone);//adds the obstacle hitzone to the game
      var obstacleImage = draw.bitmap(image);//draws the obstacle image bitmap and store it in obstacleImage
      obstacleHitZone.addChild(obstacleImage);//attaches the images to the obstacle hitzone
      obstacleImage.x = -25;//position the image in the hitzone by moving x values left 25 pixels
      obstacleImage.y = -25;//posiition the image on the hozone by moving the y up 25 pixels
    }
    

    function createEnemy (x, y){
      var enemy = game.createGameItem("enemy", 25);// creates enemy game item and adds it to the game
      var redSquare = draw.rect(50, 50, "red");//creates a red square and stores it in the varibale redSquare
      redSquare.x = -25;//offsets the image from the hitzone by -25 pixels
      redSquare.y = -25;//offsets the imgage from the hitzone by -25 pixels
      enemy.addChild(redSquare);// adds the red square as achild to the enemy variable
      enemy.x = x;// x position of enemy
      enemy.y =y;// y position of enemy
      game.addGameItem(enemy);// adds the enemy to the game
      enemy.velocityX -= 3;// controls how fast the enemy moves on the x axis
      enemy.rotationalVelocity = 3;// sets the rotational velcity of the enemy
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)// subtracts 10 health from hallebots HUD
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(100);// increases score when Halle shoots the enemy
        enemy.fadeOut();// enemy fades out when Halle shoots enemy
        //shrink()// causes the enemy to shrinks when Halle shoots
        //flyTo(x,y)// enemy moves to x and y positon when Halle shoots it
      }
    }


    function createReward (x, y, speed, health){
      var reward = game.createGameItem("reward", 25);// creates reward game item and adds it to the game
      var blueSquare = draw.rect(50, 50, "blue");//creates a blue square and stores it in the varibale blueSquare
      blueSquare.x = -25;//offsets the image from the hitzone by -25 pixels
      blueSquare.y = -25;//offsets the imgage from the hitzone by -25 pixels
      reward.addChild(blueSquare);// adds the blue square as achild to the enemy variable
      reward.x = x;// x position of reward
      reward.y =y;// y position of reward
      game.addGameItem(reward);// adds the reward to the game
      reward.velocityX -= speed;// controls how fast the reward moves on the x axis
      reward.rotationalVelocity = 3;// sets the rotational velcity of the reward
      reward.onPlayerCollision = function () {
        game.increaseScore(50);// increases score when Halle shoots the enemy
        game.changeIntegrity(health)// changes health health from hallebots HUD
        reward.shrink()// causes the reward to shrinks when Halle shoots
      };
    }

    
    
    function createLevel (x, y, speed, health){
      var level = game.createGameItem("level", 25);// creates level game item and adds it to the game
      var yellowSquare = draw.rect(50, 50, "yellow");//creates a yellow square and stores it in the varibale yellowSquare
      yellowSquare.x = -25;//offsets the image from the hitzone by -25 pixels
      yellowSquare.y = -25;//offsets the imgage from the hitzone by -25 pixels
      level.addChild(yellowSquare);// adds the yellow square as achild to the enemy variable
      level.x = x;// x position of level
      level.y =y;// y position of level
      game.addGameItem(level);// adds the level to the game
      level.velocityX -= speed;// controls how fast the level moves on the x axis
      level.rotationalVelocity = 3;// sets the rotational velcity of the level
      level.onPlayerCollision = function () {
        level.shrink()// causes the level to shrinks when Halle shoots
        startLevel();
        game.changeIntegrity(health)// changes health health from hallebots HUD
      };
    }

     


    function startLevel() {
      // TODO 13 goes below here
        var level = levelData[currentLevel];//fetches the current level from the levelData array and stores it in the level variable
        var levelObjects = level.gameItems//retrienve the array of game items and stores it in levelObject

        for(var i =0; i < levelObjects.length; i++){
            var element = levelObjects[i];

           if (element.type === "sawblade"){// check the type key-value of the gameItems object to determine which objects to manifest
            createObstacles(element.x, element.y, element.hitSize, element.damage, element.image);// if the condition is true it will call the revelent function
        }
        if (element.type === "enemy"){// check the type key-value of the gameItems object to determine which objects to manifest
          createEnemy(element.x, element.y, element.speed, element.health);// if the condition is true it will call the revelent function
      }
      if (element.type === "level"){// check the type key-value of the gameItems object to determine which objects to manifest
        createLevel(element.x, element.y, element.speed, element.health);// if the condition is true it will call the revelent function
    }
    if (element.type === "reward"){// check the type key-value of the gameItems object to determine which objects to manifest
      createReward(element.x, element.y, element.speed, element.health);// if the condition is true it will call the revelent function
  }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

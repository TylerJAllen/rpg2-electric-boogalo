//------------------Business Logic------------------//
//song array
//songs[0] - forget about dre
//songs[1] - one night
var songs = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/269583066&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/290593608&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"];

//healing option to add health to a weak character
var formaldehyde = {
  healthUp: 100,
};
//Player Constructor
function Player(name) {
  this.name = name;
  this.life = 100;
  this.physical = 10;
  this.magic = 8;
  this.item = [formaldehyde];
}

//array containing enemy names
var enemies = ["ally", "angel cat", "deer", "lobstrosity", "steampunk mongoose", "turkerus"];
//array containing corresponding enemy image locations
var enemyImages = ["ally(-)_burned.png", "angel-cat_burned.png", "deer-ally_burned.png", "lobstrosity_burned.png", "steampunk-mongoose_burned.png", "turkerus_burned.png"];
// //array containing corresponding enemy items
// var enemyItems = ["crabItem", "mongooseItem", "squirrelItem", "chickenItem", "turkeyItem"];
// //array containing corresponding enemy attacks
// var enemyAttacks = ["crabAttack", "mongooseAttack", "squirrelAttack", "chickenAttack", "turkeyAttack"];

//constructor for enemy
function Enemy(input) {
this.name = enemies[input];
this.life = 100;
this.physical = Math.floor(Math.random()*5 + 8);
this.magic = Math.floor(Math.random()*5 + 8);
// this.item = enemyItems[input];
// this.attack = enemyAttacks[input];
this.image = enemyImages[input];
}


//Player Attack Prototype
Player.prototype.playerAttack = function(input) {
  var roll = [0, 5, 10];
  var rollNumber = Math.floor(Math.random()*2);
  input.life -= (this.physical + roll[rollNumber]);
}

//Enemy Attack Prototype
Enemy.prototype.enemyAttack = function(input) {
  var roll = [0, 5, 10];
  var rollNumber = Math.floor(Math.random()*2);
  input.life -= (this.physical + roll[rollNumber]);
}
//Cast Prototype
Player.prototype.cast = function(life, magic) {

  this.life -= this.life - this.magic;
}
  //heal prototype that heals character
Player.prototype.heal = function() {
  if (this.life < 100) {
    this.life = 100;
  }
}
//Array that allows access to Castle after defeating all locations
var castleCounter = 0;
// alert("fire5");
var Boss = {
  name: "Vlad",
  life: 100,
  physical : Math.floor(Math.random()*4 + 8),
  magic : Math.floor(Math.random()*4 + 8),
  image : "boss_burned.png"
};

 //------------------User Interface Logic------------------//
$(function(){
  $("body").append('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[1] + '"></iframe>');
    $("#raiseCol").fadeIn(6000);
    $("#bardTale").fadeIn(6000);

  $("#gameStart").click(function(event) {
    event.preventDefault();
    $("#titleScreenContainer").hide();
    $("#startContainer").show();
  });

  $("#startButton").click(function(event){
    event.preventDefault();
    $("#startContainer").hide();
    $("#characterContainer").show();
  });

  //click button takes user to map
  $("#formCharacter").submit(function(event){
    event.preventDefault();
    $("body").append('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[0] + '"></iframe>');
    $("#characterContainer").hide();
    $("#mapContainer").show();
    $("#dre").show();
    var characterChoice = $("input:radio:checked").val();
    var userPlayer = new Player(characterChoice);
    $(".userPlayerName").text(userPlayer.name);

//--------Locations----------//
    //Ghost House Location
    $("#ghostHouse").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#hauntedContainer").show();
      $("#attackHaunted").show();
      $(".escape").show();
      $("#hauntedTitle").show();

      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }
      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#hauntedEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        $("#hauntedName").text(newEnemy.name);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#hauntedEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');

      }

      //Attack Sequence
      $("#attackHaunted").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life < 100 && newEnemy.life >= 90) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 90 && newEnemy.life >= 80) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 80 && newEnemy.life >= 70) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 70 && newEnemy.life >= 60) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 60 && newEnemy.life >= 50) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 50 && newEnemy.life >= 40) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 40 && newEnemy.life >= 30) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 30 && newEnemy.life >= 20) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 20 && newEnemy.life >= 10) {
          $("#hauntedBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 10 && newEnemy.life <= 0) {
          $("#hauntedBar").animate({width: "0px"}, "fast");
        }
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);

            if (userPlayer.life < 100 && userPlayer.life >= 90) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 90 && userPlayer.life >= 80) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 80 && userPlayer.life >= 70) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 70 && userPlayer.life >= 60) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 60 && userPlayer.life >= 50) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 50 && userPlayer.life >= 40) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 40 && userPlayer.life >= 30) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 30 && userPlayer.life >= 20) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 20 && userPlayer.life >= 10) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 10 && userPlayer.life <= 0) {
              $(".healthBarUser").animate({width: "0px"}, "fast");
            }

          }, 1500);

          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");

            // location.reload();
          }
        }
        else {
          alert("congrats on killing something.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackHaunted").hide();
          castleCounter += 1;
        }
      });

    });
    //Village Location
    $("#village").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#villageContainer").show();
      $("#attackVillage").show();
      $(".escape").show();
      $("#villageTitle").show();
      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#villageEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        $("#villageName").text(newEnemy.name);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#villageEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackVillage").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life < 100 && newEnemy.life >= 90) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 90 && newEnemy.life >= 80) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 80 && newEnemy.life >= 70) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 70 && newEnemy.life >= 60) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 60 && newEnemy.life >= 50) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 50 && newEnemy.life >= 40) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 40 && newEnemy.life >= 30) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 30 && newEnemy.life >= 20) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 20 && newEnemy.life >= 10) {
          $("#villageBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 10 && newEnemy.life <= 0) {
          $("#villageBar").animate({width: "0px"}, "fast");
        }
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);

            if (userPlayer.life < 100 && userPlayer.life >= 90) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 90 && userPlayer.life >= 80) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 80 && userPlayer.life >= 70) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 70 && userPlayer.life >= 60) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 60 && userPlayer.life >= 50) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 50 && userPlayer.life >= 40) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 40 && userPlayer.life >= 30) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 30 && userPlayer.life >= 20) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 20 && userPlayer.life >= 10) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 10 && userPlayer.life <= 0) {
              $(".healthBarUser").animate({width: "0px"}, "fast");
            }
          }, 1500);

          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");

            // location.reload();
          }
        }
        else {
          alert("Dang, you won. It was a rather weak opponent so you shouldn't feel too proud of yourself.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackVillage").hide();
          castleCounter += 1;
        }
      });

    });
    //Swamp Location
    $("#houseOverWater").click(function() {
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#attackSwamp").show();
      $(".escape").show();
      $("#swampContainer").show();
      $("#swampTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      else if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      else if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      else if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#swampEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        $("#swampName").text(newEnemy.name);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#swampEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackSwamp").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life < 100 && newEnemy.life >= 90) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 90 && newEnemy.life >= 80) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 80 && newEnemy.life >= 70) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 70 && newEnemy.life >= 60) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 60 && newEnemy.life >= 50) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 50 && newEnemy.life >= 40) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 40 && newEnemy.life >= 30) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 30 && newEnemy.life >= 20) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 20 && newEnemy.life >= 10) {
          $("#swampBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 10 && newEnemy.life <= 0) {
          $("#swampBar").animate({width: "0px"}, "fast");
        }
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);

            if (userPlayer.life < 100 && userPlayer.life >= 90) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 90 && userPlayer.life >= 80) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 80 && userPlayer.life >= 70) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 70 && userPlayer.life >= 60) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 60 && userPlayer.life >= 50) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 50 && userPlayer.life >= 40) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 40 && userPlayer.life >= 30) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 30 && userPlayer.life >= 20) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 20 && userPlayer.life >= 10) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 10 && userPlayer.life <= 0) {
              $(".healthBarUser").animate({width: "0px"}, "fast");
            }

          }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("You actually did something for once in your life.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackSwamp").hide();
          castleCounter += 1;
        }
      });

    });
    //Boat Location
    $("#boat").click(function(event) {
        $("#mapContainer").hide();
        $("#locationContainer").show();
        $("#boatContainer").show();
        $(".escape").show();
        $("#boatTitle").show();

        if(userPlayer.name === "Tinks") {
          $(".Tinks").show();
        }
        else if(userPlayer.name === "Tex") {
          $(".Tex").show();
        }
        else if(userPlayer.name === "Ned") {
          $(".Ned").show();
        }
        else if(userPlayer.name === "Stunner") {
          $(".Stunner").show();
        }

    });
    //Tower Location
    $("#tower").click(function(event) {
      event.preventDefault();
      $("#towerButton").hide();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#towerContainer").show();
      $("#attackTower").show();
      $(".escape").show();
      $("#towerTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#towerEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        $("#towerName").text(newEnemy.name);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#towerEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackTower").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life < 100 && newEnemy.life >= 90) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 90 && newEnemy.life >= 80) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 80 && newEnemy.life >= 70) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 70 && newEnemy.life >= 60) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 60 && newEnemy.life >= 50) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 50 && newEnemy.life >= 40) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 40 && newEnemy.life >= 30) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 30 && newEnemy.life >= 20) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 20 && newEnemy.life >= 10) {
          $("#towerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 10 && newEnemy.life <= 0) {
          $("#towerBar").animate({width: "0px"}, "fast");
        }
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
          console.log("Enemy Attack - Player:",userPlayer);
          console.log("Enemy Attack - Enemey:",newEnemy);

          if (userPlayer.life < 100 && userPlayer.life >= 90) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 90 && userPlayer.life >= 80) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 80 && userPlayer.life >= 70) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 70 && userPlayer.life >= 60) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 60 && userPlayer.life >= 50) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 50 && userPlayer.life >= 40) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 40 && userPlayer.life >= 30) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 30 && userPlayer.life >= 20) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 20 && userPlayer.life >= 10) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 10 && userPlayer.life <= 0) {
            $(".healthBarUser").animate({width: "0px"}, "fast");
          }

          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!!");
            // location.reload();
          }
          }, 1500);
        }
        else {
          alert("Wow. You killed something. Good job, I guess.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackTower").hide();
          castleCounter += 1;
        }
      });

    });
    //UFO Location
    $("#ufo").click(function(event) {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#trailerContainer").show();
      $("#attackTrailer").show();
      $(".escape").show();
      $("#trailerTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
      if ($("#trailerEnemyAppear").children().length < 1) {
        //store random number between 0 and the current length of the enemies array to select an enemy character
        var position = Math.floor(Math.random()*enemies.length);
        //create constructor for randomly selected enemy character
        var newEnemy = new Enemy(position);
        $("#trailerName").text(newEnemy.name);
        //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
        enemies.splice(position, 1);
        enemyImages.splice(position, 1);
        $("#trailerEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
      }

      //Attack Sequence
      $("#attackTrailer").on("click", function() {
        userPlayer.playerAttack(newEnemy);
        console.log("Player Attack - Player:",userPlayer);
        console.log("Player Attack - Enemey:",newEnemy);
        if (newEnemy.life < 100 && newEnemy.life >= 90) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 90 && newEnemy.life >= 80) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 80 && newEnemy.life >= 70) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 70 && newEnemy.life >= 60) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 60 && newEnemy.life >= 50) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 50 && newEnemy.life >= 40) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 40 && newEnemy.life >= 30) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 30 && newEnemy.life >= 20) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 20 && newEnemy.life >= 10) {
          $("#trailerBar").animate({width: "-=10px"}, "fast");
        }
        if (newEnemy.life < 10 && newEnemy.life <= 0) {
          $("#trailerBar").animate({width: "0px"}, "fast");
        }
        if (newEnemy.life > 0) {
          setTimeout(function() {
            newEnemy.enemyAttack(userPlayer);
          console.log("Enemy Attack - Player:",userPlayer);
          console.log("Enemy Attack - Enemey:",newEnemy);

          if (userPlayer.life < 100 && userPlayer.life >= 90) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 90 && userPlayer.life >= 80) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 80 && userPlayer.life >= 70) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 70 && userPlayer.life >= 60) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 60 && userPlayer.life >= 50) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 50 && userPlayer.life >= 40) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 40 && userPlayer.life >= 30) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 30 && userPlayer.life >= 20) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 20 && userPlayer.life >= 10) {
            $(".healthBarUser").animate({width: "-=10px"}, "fast");
          }
          if (userPlayer.life < 10 && userPlayer.life <= 0) {
            $(".healthBarUser").animate({width: "0px"}, "fast");
          }
          }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }

        }
        else {
          alert("OMG! Look what you've done! What a terrible person you are!");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackTrailer").hide();
          castleCounter += 1;
        }
      });

    });
    //Castle Location
    $("#oceanCastle").click(function() {
      event.preventDefault();
      $("#mapContainer").hide();
      $("#locationContainer").show();
      $("#castleContainer").show();
      $(".escape").show();
      $("#castleTitle").show();

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      if (castleCounter === 5) {
        $("#attackCastle").show();
        //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
        if ($("#castleEnemyAppear").children().length < 1) {
          //store random number between 0 and the current length of the enemies array to select an enemy character
          var position = Math.floor(Math.random()*enemies.length);
          //create constructor for randomly selected enemy character
          var newEnemy = new Enemy(position);
          $("#castleName").text(newEnemy.name);
          //remove randomly selected enemy and corresonding image from arrays to prevent being selected again
          enemies.splice(position, 1);
          enemyImages.splice(position, 1);
          $("#castleEnemyAppear").append('<img class="enemyStyle" src="images/' + newEnemy.image + '" alt=""/>');
        }

        //Attack Sequence
        $("#attackCastle").on("click", function() {
          userPlayer.playerAttack(newEnemy);
          console.log("Player Attack - Player:",userPlayer);
          console.log("Player Attack - Enemey:",newEnemy);
          if (newEnemy.life < 100 && newEnemy.life >= 90) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 90 && newEnemy.life >= 80) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 80 && newEnemy.life >= 70) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 70 && newEnemy.life >= 60) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 60 && newEnemy.life >= 50) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 50 && newEnemy.life >= 40) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 40 && newEnemy.life >= 30) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 30 && newEnemy.life >= 20) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 20 && newEnemy.life >= 10) {
            $("#castleBar").animate({width: "-=10px"}, "fast");
          }
          if (newEnemy.life < 10 && newEnemy.life <= 0) {
            $("#castleBar").animate({width: "0px"}, "fast");
          }
          if (newEnemy.life > 0) {
            setTimeout(function() {
              newEnemy.enemyAttack(userPlayer);

            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",newEnemy);

            if (userPlayer.life < 100 && userPlayer.life >= 90) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 90 && userPlayer.life >= 80) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 80 && userPlayer.life >= 70) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 70 && userPlayer.life >= 60) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 60 && userPlayer.life >= 50) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 50 && userPlayer.life >= 40) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 40 && userPlayer.life >= 30) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 30 && userPlayer.life >= 20) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 20 && userPlayer.life >= 10) {
              $(".healthBarUser").animate({width: "-=10px"}, "fast");
            }
            if (userPlayer.life < 10 && userPlayer.life <= 0) {
              $(".healthBarUser").animate({width: "0px"}, "fast");
            }
            }, 1500);
          if (userPlayer.life <= 0) {
            alert("you died lol what a loser!!");
            // location.reload();
          }
        }
        else {
          alert("Wow. You killed someone's pet. Hope you feel good about yourself.");
          setTimeout(function(){userPlayer.heal();}, 2000);
          $("#attackCastle").hide();
          castleCounter += 1;
          $("#throneRoom").show();
        }
      });
    }
    });

    //throne room Button
    $("#throneRoom").click(function(event) {
      event.preventDefault();
      $("#castleContainer").hide();
      $("#throneContainer").show();
      $("#throneRoom").hide();
      $(".escape").show();
      $(".locTitle").hide();
      $("#throneTitle").show();
      $(".healthBarUser").animate({width: "100px"}, "fast");
      $("#throneName").text(Boss.name);

      if(userPlayer.name === "Tinks") {
        $(".Tinks").show();
      }
      if(userPlayer.name === "Tex") {
        $(".Tex").show();
      }
      if(userPlayer.name === "Ned") {
        $(".Ned").show();
      }
      if(userPlayer.name === "Stunner") {
        $(".Stunner").show();
      }

      if (castleCounter === 6) {
        $("#attackThrone").show();
        //if-statement that generates a random enemy on first visit to location and prevents generating another random enemy on subsequent visits
        if ($("#throneRoomEnemyAppear").children().length < 1) {
          $("#throneRoomEnemyAppear").append('<img class="bossStyle" src="images/' + Boss.image + '" alt=""/>');
        }

        //Attack Sequence
        $("#attackThrone").on("click", function() {
          userPlayer.playerAttack(Boss);
          console.log("Player Attack - Player:",userPlayer);
          console.log("Player Attack - Enemey:",Boss);
          if (Boss.life < 100 && Boss.life >= 90) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 90 && Boss.life >= 80) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 80 && Boss.life >= 70) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 70 && Boss.life >= 60) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 60 && Boss.life >= 50) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 50 && Boss.life >= 40) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 40 && Boss.life >= 30) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 30 && Boss.life >= 20) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 20 && Boss.life >= 10) {
            $("#throneBar").animate({width: "-=10px"}, "fast");
          }
          if (Boss.life < 10 && Boss.life <= 0) {
            $("#throneBar").animate({width: "0px"}, "fast");
          }
          if (Boss.life > 0) {
            setTimeout(function() {
              Boss.enemyAttack(userPlayer);
              if (userPlayer.life < 100 && userPlayer.life >= 90) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 90 && userPlayer.life >= 80) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 80 && userPlayer.life >= 70) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 70 && userPlayer.life >= 60) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 60 && userPlayer.life >= 50) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 50 && userPlayer.life >= 40) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 40 && userPlayer.life >= 30) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 30 && userPlayer.life >= 20) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 20 && userPlayer.life >= 10) {
                $(".healthBarUser").animate({width: "-=10px"}, "fast");
              }
              if (userPlayer.life < 10 && userPlayer.life <= 0) {
                $(".healthBarUser").animate({width: "0px"}, "fast");
              }
            }, 1500);
            console.log("Enemy Attack - Player:",userPlayer);
            console.log("Enemy Attack - Enemey:",Boss);
            if (userPlayer.life <= 0) {
              alert("you died lol");
              // location.reload();
            }
          }
          else {
            $("body").prepend('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[1] + '"></iframe>');
            $("#throneContainer").hide();
            $(".locTitle").hide();
            $(".attack").hide();
            $(".escape").hide();
            $("#winContainer").show();
            $("#prince").show();
          }
        });
      }

    });
    //escape to Map Button
    $(".escape").click(function(event) {
      event.preventDefault();
      $(".healthBarUser").animate({width: "100px"}, "fast");
      $(".healthBarEnemy").animate({width: "+=100px;"}, "fast");
      $("body").prepend('<iframe width="0px;" height="0px;" scrolling="no" frameborder="no" src="' + songs[0] + '"></iframe>');
      $(".locationHide").hide();
      $("#locationContainer").hide();
      $("#mapContainer").show();
      $(".locTitle").hide();
      $(".attack").hide();

    });

  });
});
// alert("fire10");

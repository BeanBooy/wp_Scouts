
var left = false,
    right = false,
    character = document.getElementById('character'),
    screenWidth = document.getElementById('gameScreen').clientWidth,
    gameScene = document.getElementById("gameScreen");

var characterPos = Math.round(document.getElementById('character').getBoundingClientRect().left),
    initCharacterPos = characterPos;

var gameSceneOffset = 0,
    gameSceneWidth = getCurrentSceneWidth(),
    gameSceneMaxOffset = ((getCurrentSceneWidth() - screenWidth) / 2) - 10; // -10 for cleaner edges

var dynamicCenterPoint = characterPos;

console.log(screenWidth, getCurrentSceneWidth());

///////////////////// GENERATE SCENE WIDTH /////////////////////

while (screenWidth > getCurrentSceneWidth()) {
  var imgLeft = document.createElement('img'),
      imgRight = document.createElement('img');
  imgLeft.src = "assets/empty.png";
  imgRight.src = "assets/empty.png";
  gameScene.appendChild(imgLeft);
  gameScene.insertBefore(imgRight, gameScene.children[0]);
}

function getCurrentSceneWidth() {
  var width = 0;
  for (const child of gameScene.children) {
    if(child != character) {
      width = width + child.clientWidth;
    }
  }
  return width;
}

///////////////////// KEY CONTROLL /////////////////////

document.addEventListener('keydown', press);
document.addEventListener('keyup', release);

function press(e) {
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = true;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = true;
  }
}

function release(e) {
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
    left = false;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = false;
  }
}

///////////////////// GAME LOOP /////////////////////

function gameLoop() {

  if(left && characterPos + gameSceneOffset > 40) {
    if(gameSceneWidth > screenWidth && // gameScene is wider than screen
        gameSceneOffset < gameSceneMaxOffset && // scene is inside of possible scolling range
        characterPos < initCharacterPos - gameSceneOffset) { // character is on the left half of the screen

      gameSceneOffset = gameSceneOffset + 5;
    }
    characterPos = +characterPos - 5;
    character.classList.add('c_facingLeft');
    character.classList.remove('c_facingRight');
  }

  if (right && characterPos < screenWidth - gameSceneOffset - character.clientWidth - 40) {
    if(gameSceneWidth > screenWidth && // gameScene is wider than screen
        -gameSceneOffset < gameSceneMaxOffset && // scene is inside of possible scolling range
        characterPos > initCharacterPos - gameSceneOffset) { // character is on the right half of the screen

      gameSceneOffset = gameSceneOffset - 5;
    }
    characterPos = +characterPos + 5;
    character.classList.add('c_facingRight');
    character.classList.remove('c_facingLeft');
  }

  character.style.left = characterPos + 'px';
  gameScene.style.marginLeft = gameSceneOffset + 'px';
  //console.log(gameSceneOffset);

  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);

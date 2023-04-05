
var left = false,
    right = false,
    x = Math.round(document.getElementById('character').getBoundingClientRect().left),
    character = document.getElementById('character'),
    screenWidth = document.getElementById('gameScreen').clientWidth,
    gameScene = document.getElementById("gameScreen");



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

  if(left && x > 40) {
    x = +x - 5;
    character.classList.add('c_facingLeft');
    character.classList.remove('c_facingRight');
  }
  if (right && x < screenWidth - character.clientWidth - 40) {
    x = +x + 5;
    character.classList.add('c_facingRight');
    character.classList.remove('c_facingLeft');
  }

  character.style.left = x + 'px';

  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);

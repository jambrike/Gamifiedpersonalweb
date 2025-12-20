const player = document.getElementById("player");
const gameArea = document.getElementById("panelarea");
const pBOX = document.getElementById("block1")
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3")
const block4=document.getElementById("block4")

let playerx = 500; let playery = 200;
const speed = 10;
const acceleration =1.2;
const friction=0.92;
let playervex=0; let playervey =0;

//make it knwo when im pressing the buttons
const arrows = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};


function clamp(value, min, max){
  if(value < min) return min;
  if(value > max) return max;
  return value;
}
//chill js making it load
function render(){
  player.style.left = playerx + "px";  player.style.top = playery + "px";
}
function handleKeyDown(event){
  if (arrows.hasOwnProperty(event.key)) {
    arrows[event.key] = true;
    event.preventDefault();
  }
}
function handleKeyUp(event){
  if (arrows.hasOwnProperty(event.key)) {
    arrows[event.key] = false;
    event.preventDefault();
  }
}
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("blur", function(){ for (let k in arrows) arrows[k] = false; });
//so like make physics loop itself not just on key press obv
function loopphysics(){
  if (arrows.ArrowUp) playervey -= acceleration;
  if (arrows.ArrowDown) playervey += acceleration;
  if (arrows.ArrowRight) playervex += acceleration;
  if (arrows.ArrowLeft) playervex -= acceleration;

  const maxSpeed = 20;
  playervex = clamp(playervex, -maxSpeed, maxSpeed);
  playervey = clamp(playervey, -maxSpeed, maxSpeed);

  playerx += playervex;
  playery += playervey;

  playervex *= friction;
  playervey *= friction;

  const areawidth = gameArea.clientWidth;
  const areaheight = gameArea.clientHeight;
  const PW = player.offsetWidth;
  const PH = player.offsetHeight;

  if (playerx < 0) { playerx = 0; playervex *= -0.5; }
  if (playery < 0) { playery = 0; playervey *= -0.5; }
  if (playerx > areawidth - PW) { playerx = areawidth - PW; playervex *= -0.5; }
  if (playery > areaheight - PH) { playery = areaheight - PH; playervey *= -0.5; }
}
//collision function
function checkcollision(){
   const pRect = player.getBoundingClientRect();
 const powerupRect = pBOX.getBoundingClientRect();

        const puOverlap = !(pRect.right < powerupRect.left || 
                          pRect.left > powerupRect.right || 
                          pRect.bottom < powerupRect.top || 
                          pRect.top > powerupRect.bottom);
        if (puOverlap) {
          window.location.href = "profile.html"; }
const block2Rect = block2.getBoundingClientRect();

        const b2Overlap = !(pRect.right < block2Rect.left || 
                          pRect.left > block2Rect.right || 
                          pRect.bottom < block2Rect.top || 
                          pRect.top > block2Rect.bottom);
        if (b2Overlap) { window.location.href = "wrong.html"; }
const block3Rect = block3.getBoundingClientRect();
const b3Overlap = !(pRect.right<block3Rect.left||
  pRect.left>block3Rect.right|| pRect.bottom<block3Rect.top||
  pRect.top>block3Rect.bottom);
  if (b3Overlap){window.location.href = "wrong.html";}

  const block4Rect = block4.getBoundingClientRect();
const b4Overlap = !(pRect.right<block4Rect.left||
  pRect.left>block4Rect.right|| pRect.bottom<block4Rect.top||
  pRect.top>block4Rect.bottom);
  if (b4Overlap){window.location.href = "wrong.html";}}
render();
requestAnimationFrame(function gameLoop(){
  loopphysics();
  render();
  checkcollision();
  requestAnimationFrame(gameLoop);
});

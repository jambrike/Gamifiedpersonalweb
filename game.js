const player = document.getElementById("player");
const gameArea = document.getElementById("panelarea");

let playerx = 500; let playery = 200;
const speed = 10;

function clamp(value, min, max){
  if(value < min) return min;
  if(value > max) return max;
  return value;
}
//chill js making it load
function render(){
  player.style.left = playerx + "px";  player.style.top = playery + "px";
}

document.addEventListener("keydown", function(event){
  if(event.key === "ArrowUp") playery -= speed;
  if(event.key === "ArrowDown") playery += speed;
  if(event.key === "ArrowRight") playerx += speed;
  if(event.key === "ArrowLeft") playerx -= speed;

  const areawidth = gameArea.clientWidth;
  const areaheight = gameArea.clientHeight;
  //gotta have this to make it not go outtabounds
  const PW = player.offsetWidth;
  const PH = player.offsetHeight;
  playerx = clamp(playerx, 0, areawidth - PW);
  playery = clamp(playery, 0, areaheight - PH);

  event.preventDefault();
  render();
});

render();

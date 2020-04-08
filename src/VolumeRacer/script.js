const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -200;


let frontWheel = new Image();
frontWheel.src = "whiels.png";
frontWheel.rotation = 0;
frontWheel.pos = 0;
frontWheel.vel = 0;

let drivingIndex = 0;

let backWheel = new Image();
backWheel.src = "whiels.png";
backWheel.rotation = 0;
let car = new Image();
car.src = "waggie.png";

car.addEventListener('load',()=>{
  frontWheel.pos = 0;
});

addEventListener('keydown',(evt)=>{
  switch (evt.key) {
    case "ArrowRight":
      frontWheel.vel += 1;
      break;
    default:

  }
})
function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);
  context.drawImage(car,frontWheel.pos-754,200);

  frontWheel.vel = (getVolume() || 0) * 10;

  frontWheel.rotation += frontWheel.vel/80;
  frontWheel.pos += frontWheel.vel;

  context.save();
  context.translate(frontWheel.pos-650,500);
  context.rotate(frontWheel.rotation);
  context.drawImage(frontWheel,-frontWheel.width/2,-frontWheel.height/2);
  context.restore();

  context.save();
  context.translate(frontWheel.pos-335,500);
  context.rotate(frontWheel.rotation);
  context.drawImage(backWheel,-backWheel.width/2,-backWheel.height/2);
  context.restore();

  if(frontWheel.pos > canvas.width){
    location.href = 'index.html#popup1';
    frontWheel.pos = 0;
    frontWheel.vel = 0;
  }

}

function Reset(){
  location.href = 'index.html';
  frontWheel.pos = 0;
  counter = 5;
}

function Start(){
  drivingIndex = 1;
  if(drivingIndex == 1){
    setup();
  }
}

var counter = 5;

function setup(){

  if(drivingIndex == 1){
    var timer = select('#timer');
  timer.html(counter);

  setInterval(timeIt, 1000);

  function timeIt(){
    counter--;
    timer.html(counter);
    if(counter <= 0){
      timer.html("GO");
      counter = 0;
      animate();
      clearInterval();
    }
  }
}
}
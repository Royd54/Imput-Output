const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -200;


let frontWheel = new Image();
frontWheel.src = "whiels.png";
frontWheel.rotation = 0;
frontWheel.pos = 500;
frontWheel.vel = 0;

var lastHighest = 0;
var stopped = false;
var active = true;

let drivingIndex = 0;

let backWheel = new Image();
backWheel.src = "whiels.png";
backWheel.rotation = 0;
let car = new Image();
car.src = "waggie.png";

car.addEventListener('load',()=>{
  frontWheel.pos = 500;
  context.drawImage(car,frontWheel.pos-754,200);

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

  if(stopped == false){
    frontWheel.vel += getVolume() / 800;
  }


  frontWheel.rotation += frontWheel.vel / 80;
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

  if(frontWheel.pos > canvas.width + 350){
    if(active == true){
      location.href = 'index.html#popup1';
    }
    active = false;
    frontWheel.vel = 0;
    stopped = true;
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

  function startTimer() {
    if(active){
      var timer = document.getElementById("raceTimer").innerHTML;
      var arr = timer.split(":");
      var hour = arr[0];
      var min = arr[1];
      var sec = arr[2];

      if(sec == 59){
        if(min == 59){
          hour++;
          min = 0;
          if(hour < 10) hour = "0" + hour;
        }else{
          min++;
        }
        if(min < 10) min = "0" + min;
        sec = 0;
      }else{
        sec++;
        if(sec < 10) sec = "0" + sec;
      }

      document.getElementById("raceTimer").innerHTML = hour + ":" + min + ":" + sec;
      setTimeout(startTimer, 1000);
    }
}

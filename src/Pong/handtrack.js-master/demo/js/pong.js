const video = document.getElementById("myvideo");
const handimg = document.getElementById("handimage");
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
// let trackButton = document.getElementById("trackbutton");
// let nextImageButton = document.getElementById("nextimagebutton");
let updateNote = document.getElementById("updatenote");

// select canvas element
//const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.6,    // confidence threshold for predictions.
}


let imgindex = 1
let isVideo = false;
let model = null;

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
      console.log("video started", status);
      if (status) {
          updateNote.innerText = "Video started. Now tracking"
          isVideo = true
          runDetection()
      } else {
          updateNote.innerText = "Please enable video"
      }
  });
}
      startVideo();



// unnecesary code
// nextImageButton.addEventListener("click", function(){
//   nextImage();
// });

// unnecesary code
// trackButton.addEventListener("click", function(){
//   toggleVideo();
// });

function runDetection() {
  model.detect(video).then(predictions => {
      console.log("Predictions: ", predictions);
      //model.renderPredictions(predictions, canvas, context, video);
      if (isVideo) {
          requestAnimationFrame(runDetection);
          user.y += ((predictions[0].bbox[1] - (user.y + user.height/2)))*0.1;
      }
  });
}

// Load the model.
  handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  // trackButton.disabled = false
  // nextImageButton.disabled = false
});

// animation --------------------------------------------------------------------------------

let image = new Image();
image.src = "sheets/RacketSheet.png";
let sx,sy,sw,sh,x = 0,y = 0,w,h;
let counter = 0;
let framelength = 20;
let playAnimation = false;

let image2 = new Image();
image2.src = "sheets/RacketSheet2.png";
let sx2,sy2,sw2,sh2,x2 = 0,y2 = 0,w2,h2;
let counter2 = 0;
let framelength2 = 20;
let playAnimation2 = false;

// let image2 = new Image();
// image2.src = "sheet2.png";
// let sx2,sy2,sw2,sh2,x2,y2,w2,h2;
// let counter2 = 0;

// var stop2 = false;
// var frameCount2 = 0;
 var fps, fpsInterval, startTime, now, then, elapsed;
 var fps2, fpsInterval2, startTime2, now2, then2, elapsed2;

image.addEventListener('load',()=>{
  // begin hier jouw script
    fps = 60;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();

    // fps2 = 30;
    // sw2 = image2.width/18;
    // sh2 = image2.height/1;
    // fpsInterval2 = 1000 / fps2;
    // then = Date.now();
    // startTime = then;
    // animate();
});

image.addEventListener('load',()=>{
  // begin hier jouw script
    fps2 = 60;
    fpsInterval2 = 1000 / fps2;
    then2 = Date.now();
    startTime2 = then2;


    // fps2 = 30;
    // sw2 = image2.width/18;
    // sh2 = image2.height/1;
    // fpsInterval2 = 1000 / fps2;
    // then = Date.now();
    // startTime = then;
    // animate();
});

addEventListener('keydown',(evt)=>{
  switch (evt.key) {
    case "ArrowRight":
      playAnimation = true;
      break;
    case "ArrowLeft":
      playAnimation2 = true;
      break;
    default:
  }
})

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {
  sw = image.width/framelength;
  sh = image.height/1;

  sw2 = image2.width/framelength2;
  sh2 = image2.height/1;
    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    now2 = Date.now();
    elapsed2 = now2 - then2;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        context.clearRect(image,sx,sy,sw,sh,x,y,w,h);
          sx = counter%framelength*sw;
          sy = Math.floor(counter/framelength)*sh;
          x = -240;
          y = user.y;
          w = sw;
          h = sh;
          //console.log(counter);


          if(counter>framelength - 2){
            playAnimation = false;
            counter = 0;
          };

          if (playAnimation && counter<framelength - 1){
          counter++;
          }
        }
//------------------------------------------------------------------------------
        if (elapsed2 > fpsInterval2) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then2 = now2 - (elapsed2 % fpsInterval2);

            // Put your drawing code here
            context.clearRect(image2,sx2,sy2,sw2,sh2,x2,y2,w2,h2);
              sx2 = counter2%framelength2*sw2;
              sy2 = Math.floor(counter2/framelength2)*sh2;
              x2 = 555;
              y2 = com.y;
              w2 = sw2;
              h2 = sh2;
              //console.log(counter);


              if(counter2>framelength2 - 2){
                playAnimation2 = false;
                counter2 = 0;
              };

              if (playAnimation2 && counter2<framelength2 - 1){
              counter2++;
              }
            }
    }

//pong code --------------------------------------------------------------------------------

// load sounds
// let hit = new Audio();
// let wall = new Audio();
// let userScore = new Audio();
// let comScore = new Audio();
//
// hit.src = "sounds/hit.mp3";
// wall.src = "sounds/wall.mp3";
// comScore.src = "sounds/comScore.mp3";
// userScore.src = "sounds/userScore.mp3";

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// User Paddle
const user = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "TRANSPARENT"
}

// COM Paddle
const com = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "TRANSPARENT"
}

// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// listening to the mouse
//canvas.addEventListener("update", getMousePos);

//function getMousePos(evt){
//    let rect = canvas.getBoundingClientRect();

//    user.y = posenetY - rect.top - user.height/2;
//}

let target = 1;

// when COM or USER scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
    target = 1;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update function, the function that does all calculations
function update(){
  let rect = canvas.getBoundingClientRect();

  //user.y += ((posenetY.y - rect.top - user.height/2))*0.1;
  //user.y += ((posenetY - (user.y + user.height/2)))*0.1;
   //user.y = posenetY - rect.top - user.height/2;
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        com.score++;
        //comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        //userScore.play();
        resetBall();
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // computer plays for itself, and we must be able to beat it
    // simple AI
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;

    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        //wall.play();
    }

    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

    // if the ball hits a paddle
    if(collision(ball,player)){
        // play sound
        //hit.play();
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);

        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;

        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.5;

        if(target == 0)
        {
          playAnimation = true;
          target = 1;
        }
        else if(target == 1)
        {
          playAnimation2 = true;
          target = 0;
        }
    }
}

// render function, the function that does al the drawing
function render(){

    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");

    // draw the user score to the left
    drawText(user.score,canvas.width/4,canvas.height/5);

    // draw the COM score to the right
    drawText(com.score,3*canvas.width/4,canvas.height/5);

    // draw the net
    drawNet();

    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);

    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);

    context.drawImage(image,sx,sy,sw,sh,x,y,w,h);
    context.drawImage(image2,sx2,sy2,sw2,sh2,x2,y2,w2,h2);
}
function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 60;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

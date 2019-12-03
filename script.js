//Added gist, experimenting with revisions of code.
//Global variables
var canvasFov, context;

//particulary global array for all particles
var particles = [];

//config variables as constants
const amountLiquidParticles = 2; //200; //anount of liquid molecules
const amountSaltParticles = 0; //30; //amount of salt molecules
const massLiquidParticle = 0.8; //mass of liquid molecules
const massSaltParticle = 3.0; // mass of salt molecules
const velocityCoefficient = 0.01; //magic coefficient, subject to be removed

//particles[] is array for particle object
class particle {
  constructor(
    x = 0,
    y = 0,
    mass = massLiquidParticle,
    color = "brown",
    speedDirection = Math.PI / 4,
    speedValue = 1,
    velocityDirection = Math.Pi / 4,
    velocityValue = 0.01
  ) {
    // x and y position of particle
    this.x = x;
    this.y = y;
      
    //particle mass
    this.mass = mass;
    this.color = color;
    this.speedDirection = speedDirection; //speed direction
    this.speedValue = speedValue;
    this.velocityDirection = velocityDirection;
    this.velocityValue = velocityValue;
    //this.debug='lols';
  }
}

//debug stuff
//sleep () pause for debugging
function sleep(miliseconds) {
                var currentTime = new Date().getTime();
                while (currentTime + miliseconds >= new Date().getTime()) {
                }
            }
//clear and intialize debugpad with text
function padInitLine(text = "Standby") {
  pad.value = text + "\n";
}
//add line to debugpad
function padAddLine(text = "Alarm") {
  pad.value += text + "\n";
}

function init() {
  canvasFov = document.getElementById("fov");
  pad = document.getElementById("pad");
  //pad.value='s';
  context = canvasFov.getContext("2d");
  for (index = 0; index < amountLiquidParticles; index++) {
    particles.push(
      new particle(
        5, // + Math.floor(Math.random() * 980),
        5, // + Math.floor(Math.random() * 480),
        massLiquidParticle,
        "darkblue",
        Math.PI / 2, //Math.random() * Math.PI * 2,
        Math.random() + 0.8,
        Math.PI, //Math.random() * Math.PI * 2,
        Math.random() * 0.8
      )
    );
  }
  for (index = 0; index < amountSaltParticles; index++) {
    particles.push(
      new particle(
        510 + Math.floor(Math.random() * 470),
        5 + Math.floor(Math.random() * 480),
        massSaltParticle,
        "darkred",
        Math.random() * Math.PI * 2,
        Math.random() + 0.3,
        Math.random() * Math.PI * 2,
        Math.random() * 0.3
      )
    );
    //console.log(index);
  }
  //canvasBackground = canvasFov.style.backgroundColor;

  //window.alert("init done")
}
function drawMembrane() {
  context.clearRect(0, 0, 1000, 500);
  context.beginPath();
  context.fillStyle = "brown";
  context.fillRect(495, 0, 10, 500);
  context.stroke();
  context.closePath();
  //window.alert('drawMembrane done')
}
function drawLiquid() {
  context.beginPath();
  var gradient;
  gradient = context.createLinearGradient(0.0, 150.0, 300.0, 150.0);
  gradient.addColorStop(0, "rgba(0, 0, 255, 0.5)");
  gradient.addColorStop(0.5, "rgba(0,0,255,0.7)");
  gradient.addColorStop(1, "rgba(0, 0, 255, 0.5)");
  context.fillStyle = gradient;
  context.fillRect(500, 0, 500, 500);
  context.closePath();
}
function drawPartile(particle) {
  context.beginPath();
  //window.alert(particle.color)
  context.fillStyle = particle.color;
  context.arc(particle.x, particle.y, particle.mass * 3, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
  context.beginPath();
  context.moveTo(particle.x, particle.y);
  context.lineTo(
    particle.x + Math.sin(particle.speedDirection) * particle.speedValue * 100,
    particle.y + Math.cos(particle.speedDirection) * particle.speedValue * 100
  ) ;
  context.stroke();
}
function moveParticle(particle) {
  particle.x =
    particle.x + Math.sin(particle.speedDirection) * particle.speedValue;
  particle.y =
    particle.y + Math.cos(particle.speedDirection) * particle.speedValue;
  if (particle.mass == massLiquidParticle) {
    if (particle.x < 5) {
      particle.x = 990;
    }
    if (particle.x > 995) {
      particle.x = 10;
    }
    if (particle.y < 5) {
      particle.y = 490;
    }
    if (particle.y > 495) {
      particle.y = 10;
    }
  }
  if (particle.mass == massSaltParticle) {
    if (particle.x < 505) {
      particle.speedDirection = Math.PI * 2 - particle.speedDirection;
    }
    if (particle.x > 1020) {
      particle.speedDirection = Math.PI * 2 - particle.speedDirection;
    }
    if (particle.y < 5) {
      particle.y = 490;
    }
    if (particle.y > 495) {
      particle.y = 10;
    }
  }
}
function updateParticle(particle) {
  x = Math.sin(particle.speedDirection) * particle.speedValue;
  y = Math.cos(particle.speedDirection) * particle.speedValue;
  x +=
    Math.sin(particle.velocityDirection) *
    particle.velocityValue *
    velocityCoefficient;
  y +=
    Math.cos(particle.velocityDirection) *
    particle.velocityValue *
    velocityCoefficient;
  //console.log(x);
  padInitLine(x);
  padAddLine(y);
  particle.speedDirection = Math.atan(x / y) + Math.PI / 2;
  //particle.speedValue=Math.sqrt(x*x+y*y);
}

init();
function animation() {
  drawMembrane();
  drawLiquid();

  particles.forEach(drawPartile);
  particles.forEach(moveParticle);
  particles.forEach(updateParticle);
  sleep(1000);
  window.requestAnimationFrame(animation);
}
padInitLine();
animation();
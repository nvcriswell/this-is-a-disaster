var scl = 1.0;
var s_set = [];
var s_num;
var rad = 5.0;
var vids = [];
var spin_spd = 10000;

let pressed = false;

let timer = 5;

let sound;

var rand_vid;

var k;


let words = [" bad one", " calamity", " wake up call", " catastrophe", " failure", "n act of God", " tragedy", "n accident", " cataclysm", " tribulation", "n emergency", " climax", " lie"];

function preload() {
  myfont = loadFont("assets/Padauk-Bold.ttf");
  soundFormats("mp3", "ogg");
  sound = loadSound("assets/quake_sound.mp3");
}

function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight, WEBGL); 
  background(0);

  s_num = 20;

  k = 0;

  for (var i = 0; i < 5; i++) {
    vids[i] = createVideo("videos/movie" + i + ".mp4");
    vids[i].loop();
    vids[i].hide();
    vids[i].volume(0);
  }
    vids[4].volume(1);


  textAlign(CENTER, CENTER);
  fill(255);
  textFont(myfont);
  textSize(50);
  text("this is a disaster", 0, 0); //40 40

  sound.loop();
  sound.setVolume(3);

  add_boxes();

  rand_vid = int(random(0, 5));
}

function add_boxes() {
  s_num = 1;
  for (var x = 0; x < 5; x++) {
    //noprotect
    for (var j = 0; j < s_num; j++) {
      s_set.push(new Particles(vids[x]));
    }
  }
}

function draw() {

  if (pressed == false) {
    sound.setVolume(3);
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      for (var y = 0; y < 3; y++) {
        for (var i = 0; i < s_set.length; i++) {
          s_set[i].update();
          s_set[i].render();
        }
        spin_spd -= 3;
        if (spin_spd < 0) {
          //background(0);
          spin_spd = 10000;
        }
      }
    }
  }
  if (pressed == true) {
    image(vids[rand_vid], -width / 2, -height / 2, windowWidth, windowHeight);

    textAlign(CENTER, CENTER);
    fill(255);
    textFont(myfont);
    textSize(50);
    //console.log(words[k]);
    text("this is a" + words[k], 0, 0); 
    sound.setVolume(0);
  }
}



function keyPressed() {
  pressed = !pressed;
  rand_vid = int(random(0, 5));
  k = int(random(0, words.length));
  add_boxes();
}

function Particles(video) {
  var scl = random(0, 2);
  var vid = video;
  var box_sz = random(10, 130);
  var px = random(-width / 2, width / 2);
  var py = random(-height / 2, height / 2);
  var pz = 0;

  this.update = function () {
    var vx = random(-10, 10);
    var vy = random(-10, 10);
    px += vx;
    py += vy;
  };
  this.render = function () {
    noStroke();
    strokeWeight(1);
    push();
    texture(vid);
    translate(px, py, pz);
    rotateY(millis() / spin_spd);
    rotateX(millis() / spin_spd);
    rotateZ(millis() / spin_spd);
    scale(scl);
    box(box_sz);
    pop();
  };
}

function mouseClicked(){
  save('myCanvas.png');
  return false;
}



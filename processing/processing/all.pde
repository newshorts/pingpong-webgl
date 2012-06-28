PVector[] vertices = new PVector[24];
PFont font;

Cube stage;
Ball ball;
Instructions instructions = new Instructions();

// keys
// a = angled view
// b = borders
// c = curve
boolean a = false, b = true, c = false, g = true, z = true;

void setup() {
  // set window
  size(1200, 700, P3D);
  float w = width*2, h = height*2, d = 2000;
  
  // set stage and ball
  stage = new Cube(new PVector(w,h,d));
  ball = new Ball(new PVector(w,h,d));
  
  font = loadFont("HelveticaNeue-UltraLight-16.vlw");   
  textFont(font,16); 
  textMode(SCREEN);
}

void draw() {
  
  // Center in display window
  translate(width/2, height/2, -1500);
  // if the user turned on the angled view
  if(a) {
    rotateX(radians(-30));
  }
  
  background(0);
  lights();
  noFill();
  smooth();
  // if the user turned on borders
  if(b) {
    stroke(255);
  }
  
  stage.create();
  ball.create();
  
  if(z) {
    fill(255, 255, 255, 100);
    instructions.loadInstructions();
  }
  
  if(keyPressed) {
    if(key == 'a' || key == 'A') {
      a = (a) ? false : true;
    }
    
    if(key == 'b' || key == 'B') {
      b = (b) ? false : true;
    }
    
    if(key == 'c' || key == 'C') {
      c = (c) ? false : true;
    }
    
    if(key == 'g' || key == 'G') {
      g = (g) ? false : true;
    }
    
    if(key == 'z') {
      z = (z) ? false : true;
    }
  }
  
}

class Ball {
  PVector bounds, velocity;  
  float x = 20, y = 20, z = -100, r = 100;
  color col = color(255);
  
  float theta = 0.0, gravity = 0.9, damping = 1;
  
  Ball(PVector bounds) {
    this.bounds = bounds;
    velocity = new PVector(10,0,25);
  }
  
  Ball(PVector bounds, float x, float y, float z, color col, float r) {
    this.bounds = bounds;
    this.x = x;
    this.y = y;
    this.z = z;
    this.col = col;
    this.r = r;
  }
  
  void create () {
    step();
    fill(col);
    noStroke();
    translate(x, y, -z);
    sphere(r);
  }
  
  void step() {
    wallCollisions();
    
    // user has selected curve
    if(c) {
      theta += 0.03;  
      x = (sin(theta) * bounds.x/2) + velocity.x;
    } else {
      x += velocity.x;
    }
    
    y += velocity.y;
    z += velocity.z;
  }
    
  void wallCollisions() {
    
    // x
    if(x > (bounds.x/2)) {
      velocity.x *= -1;
//      velocity.x *= damping;
    }
    
    if(x < -(bounds.x/2)) {
      velocity.x *= -1;
//      velocity.x *= damping;
    }
    
    // y
    if(g) {
      velocity.y += gravity;
      if(y > bounds.y/2) {
        velocity.y *= -0.95;
        y = bounds.y/2;
      }
    } else {
      if(y > (bounds.y/2)) {
        velocity.y *= -1;
        velocity.y *= damping;
      }
      
      if(y < -(bounds.y/2)) {
        velocity.y *= -1;
        velocity.y *= damping;
      }
    }
    
    // z
    if(z > (bounds.z/2)) {
      velocity.z *= -1;
//      velocity.z *= damping;
    }
    
    if(z < -(bounds.z/2)) {
      velocity.z *= -1;
//      velocity.z *= damping;
    }
    
  }  
}

class Cube{
  PVector[] vertices = new PVector[24];
  float w, h, d;

  // Default constructor
  Cube(){ }

  // Constructor 2
  Cube(PVector bounds){
    this.w = bounds.x;
    this.h = bounds.y;
    this.d = bounds.z;

    // cube composed of 6 quads
    //front
    vertices[0] = new PVector(-w/2,-h/2,d/2);
    vertices[1] = new PVector(w/2,-h/2,d/2);
    vertices[2] = new PVector(w/2,h/2,d/2);
    vertices[3] = new PVector(-w/2,h/2,d/2);
    //left
    vertices[4] = new PVector(-w/2,-h/2,d/2);
    vertices[5] = new PVector(-w/2,-h/2,-d/2);
    vertices[6] = new PVector(-w/2,h/2,-d/2);
    vertices[7] = new PVector(-w/2,h/2,d/2);
    //right
    vertices[8] = new PVector(w/2,-h/2,d/2);
    vertices[9] = new PVector(w/2,-h/2,-d/2);
    vertices[10] = new PVector(w/2,h/2,-d/2);
    vertices[11] = new PVector(w/2,h/2,d/2);
    //back
    vertices[12] = new PVector(-w/2,-h/2,-d/2); 
    vertices[13] = new PVector(w/2,-h/2,-d/2);
    vertices[14] = new PVector(w/2,h/2,-d/2);
    vertices[15] = new PVector(-w/2,h/2,-d/2);
    //top
    vertices[16] = new PVector(-w/2,-h/2,d/2);
    vertices[17] = new PVector(-w/2,-h/2,-d/2);
    vertices[18] = new PVector(w/2,-h/2,-d/2);
    vertices[19] = new PVector(w/2,-h/2,d/2);
    //bottom
    vertices[20] = new PVector(-w/2,h/2,d/2);
    vertices[21] = new PVector(-w/2,h/2,-d/2);
    vertices[22] = new PVector(w/2,h/2,-d/2);
    vertices[23] = new PVector(w/2,h/2,d/2);
  }
  void create(){
    // Draw cube
    for (int i=0; i<6; i++){
      beginShape(QUADS);
      for (int j=0; j<4; j++){
        vertex(vertices[j+4*i].x, vertices[j+4*i].y, vertices[j+4*i].z);
      }
      endShape();
    }
  }
  void create(color[]quadBG){
    // Draw cube
    for (int i=0; i<6; i++){
      fill(quadBG[i]);
      beginShape(QUADS);
      for (int j=0; j<4; j++){
        vertex(vertices[j+4*i].x, vertices[j+4*i].y, vertices[j+4*i].z);
      }
      endShape();
    }
  }
}

class Instructions {
      
  Instructions() {
    // default constructor
  }
  
  void loadInstructions() {
    //font = loadFont("FFScala-Bold-12.vlw"); 
    
    String sa = "Press 'a' to angle the view.";
    text(sa, 15, 20);
    
    String sb = "Press 'b' to turn borders on and off.";
    text(sb, 15, 40);
    
    String sc = "Press 'c' to curve the ball.";
    text(sc, 15, 60);
    
    String sg = "Press 'g' to turn gravity on and off.";
    text(sg, 15, 80);
    
    String sz = "Press 'z' to toggle these instructions.";
    text(sz, 15, 100);
  }
}


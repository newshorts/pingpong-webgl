/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Scene = Class.extend({
    camera: {},
    scene: {},
    renderer: {},
    boxGeometry: {},
    boxMaterial: {},
    room: {},
    floorGeometry: {},
    floorMaterial: {},
    floor:  {},
    ballGeometry: {},
    ballMaterial: {},
    ball: {},
    mouseGeometry: {},
    mouseMaterial: {},
    mouse: {},
    material: {},
    mesh: {},
    imageCanvas: {},
    context: {},
    textureCanvas: {},
    materialCanvas: {},
    ground: {},
    meshCanvas: {},
    paddleBounds: 200,
    bounds: {
        x: 0,
        y: 0,
        z: 0
    },
    radius: 50,
    init: function(_bounds){
        
        this.bounds.x = _bounds.x;
        this.bounds.y = _bounds.y;
        this.bounds.z = _bounds.z;
        
        
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 1500, 4000);

        this.camera = new THREE.PerspectiveCamera( 75, this.bounds.x / this.bounds.y, 1, 10000 );
        this.camera.rotation.z = Math.PI;
//                camera.position.z = _bounds.x * 1.07;
        this.camera.position.z = 1000;
        this.scene.add( this.camera );
        
        // BOX
                
        this.boxGeometry = new THREE.CubeGeometry( this.bounds.x, this.bounds.y, this.bounds.z );
        this.boxMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: true} );
        this.room = new THREE.Mesh( this.boxGeometry, this.boxMaterial );
        this.scene.add( this.room );
        
        // FLOOR
        
        this.floorGeometry = new THREE.CubeGeometry( this.bounds.x, 10, this.bounds.z );
        this.floorMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('images/pingpongtable.jpg')});
        this.floorMaterial.map.needsUpdate = true;
        this.floor = new THREE.Mesh( this.floorGeometry, this.floorMaterial );
        this.floor.overdraw = true;
        this.scene.add( this.floor );
        this.floor.position.set(0, 235, 0);
        this.floor.rotation.x = Math.PI;

        // BALL

        this.ballGeometry = new THREE.SphereGeometry( this.radius, 32, 16 );
        this.ballMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, shading: THREE.FlatShading, overdraw: true} );
        this.ball = new THREE.Mesh( this.ballGeometry, this.ballMaterial );
        this.scene.add( this.ball );

        // MOUSE

        this.mouseGeometry = new THREE.CubeGeometry( this.paddleBounds, this.paddleBounds, 10 );
        this.mouseMaterial = new THREE.MeshBasicMaterial( {color: 0x00aaFF, wireframe: true} );
        this.mouse = new THREE.Mesh( this.mouseGeometry, this.mouseMaterial );
        this.scene.add( this.mouse );
        
        // LIGHTS
        
        var overheadLight = new THREE.DirectionalLight( 0xffffff, .5 );
        overheadLight.position.set(0,-500,0);
        this.scene.add( overheadLight );
        
        var userLight = new THREE.DirectionalLight( 0xffffff, 1 );
        userLight.position.set(0,0,this.bounds.z);
        this.scene.add( userLight );

        var tableReflection = new THREE.PointLight(0x0c599f,.7,0);
        tableReflection.position.set(0,1000,0);
        this.scene.add(tableReflection);
        
        // RENDER

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.bounds.x, this.bounds.y );
        this.renderer.setClearColor(this.scene.fog.color, 1);
        this.renderer.autoClear = false;
        
        var textureImg = new Image();
        var self = this;
        textureImg.onload = function(){
            document.body.appendChild( self.renderer.domElement );
        };
        textureImg.src = "images/pingpongtable.jpg";

        

    },
    updateBall: function(pos) {
        this.ball.position.set(pos.x, pos.y, pos.z);
        this.ball.rotation.x += 0.01;
        this.ball.rotation.y += 0.02;
    }
    
});


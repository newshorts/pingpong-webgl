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
    paddleBounds: 400,
    bounds: {
        x: 700,
        y: 460,
        z: 1200
    },
    init: function(){
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 1500, 4000);

        this.camera = new THREE.PerspectiveCamera( 75, this.bounds.x / this.bounds.y, 1, 10000 );
        this.camera.rotation.z = Math.PI;
//                camera.position.z = _bounds.x * 1.07;
        this.camera.position.z = 1000;
        this.scene.add( this.camera );
        
        // BOX
                
        this.boxGeometry = new THREE.CubeGeometry( this.bounds.x, this.bounds.y, this.bounds.z );
        this.boxMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: true } );
        this.room = new THREE.Mesh( this.boxGeometry, this.boxMaterial );
        this.scene.add( this.room );

        // BALL

        this.ballGeometry = new THREE.SphereGeometry( 50, 32, 16 );
        this.ballMaterial = new THREE.MeshBasicMaterial( {color: 0xFFaa00, wireframe: true } );
        this.ball = new THREE.Mesh( this.ballGeometry, this.ballMaterial );
        this.scene.add( this.ball );

        // MOUSE

        this.mouseGeometry = new THREE.CubeGeometry( this.paddleBounds, this.paddleBounds, 10 );
        this.mouseMaterial = new THREE.MeshBasicMaterial( {color: 0x00aaFF, wireframe: true } );
        this.mouse = new THREE.Mesh( this.mouseGeometry, this.mouseMaterial );
        this.scene.add( this.mouse );

        var dLight = new THREE.PointLight(0xFFFFFF);
        dLight.position.set(0,1000,0);
        this.scene.add(dLight);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.bounds.x, this.bounds.y );
        this.renderer.setClearColor(this.scene.fog.color, 1);
        this.renderer.autoClear = false;

        document.body.appendChild( this.renderer.domElement );

    },
    updateBall: function(pos) {
        this.ball.position.set(pos.x, pos.y, pos.z);
        this.ball.rotation.x += 0.01;
        this.ball.rotation.y += 0.02;
    }
    
});


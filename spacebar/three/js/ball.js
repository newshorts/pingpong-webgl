/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var Ball = Class.extend({
    bounds: {
        x: 0,
        y: 0,
        z: 0
    },
    velocity: {
        x: 0,
        y: 0,
        z: 0
    },
    x: 20,
    y: 20,
    z: 20,
    r: 0,
    color: '0xFFFFFF',
    theta: 0.0, 
    gravity: 0.9, 
    damping: 1,
    gravityOn: true,
    init: function(_bounds, paddleBounds, radius){
        this.bounds.x = _bounds.x;
        this.bounds.y = _bounds.y;
        this.bounds.z = _bounds.z;
        
        this.paddleBounds = paddleBounds;
        
        this.r = radius;
        
    },
    getUpdate: function() {
        this.wallCollision();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.z += this.velocity.z;

        var pos = {
            x: this.x,
            y: (this.y - this.r),
            z: this.z
        }
        
        return pos;
    },
    reset: function() {
        this.velocity.x = 0,
        this.velocity.y = 0,
        this.velocity.z = 0;
        
        this.x = 20;
        this.y = 20;
        this.z = 20;
    },
    start: function() {
        this.velocity.x = -3,
        this.velocity.y = 1,
        this.velocity.z = 15;
    },
    pause: function() {
        this.velocity.x = 0,
        this.velocity.y = 0,
        this.velocity.z = 0;
    },
    wallCollision: function() {
        
//        console.log('x pos: ' + (this.x));
        
        if((this.x + this.r) > this.bounds.x/2 || (this.x - this.r) < -(this.bounds.x/2)) {
            this.velocity.x *= -1;
        }

        if(this.gravityOn) {
            this.velocity.y += this.gravity;
            if(this.y > this.bounds.y/2) {
                this.velocity.y *= -0.95;
                this.y = this.bounds.y/2;
            }
        } else {
            if(this.y > (this.bounds.y/2) || this.y < -(this.bounds.y/2)) {
                this.velocity.y *= -1;
                this.velocity.y *= this.damping;
            }
        }

//        if((this.z - this.r) > this.bounds.z/2) {
//            
            // the paddle position is opposit the x position because we rotated the whole scene 180 degrees around the y axis
//            var paddleX = -(mouseX - 700);
//            
//            var upperX = paddleX + (scene.paddleBounds/2),
//                lowerX = paddleX - (scene.paddleBounds/2);
//                
//            console.log('mouseX: ' + -(mouseX-700) + ' x: ' + this.x);
//                
//            // just playing x - dont worry about y: (y < upperY && y > lowerY)
//            if((this.x < upperX) && (this.x > lowerX) ) {
//
//                this.velocity.z *= -1;
//                game.sendState('hit');
//                
//            } else {
//                // we lost, reset the game
//                game.reset();
//                game.sendState('miss');
//                
//            }
//
//        }

        // user side
        if((this.z - this.r) > this.bounds.z/2 + 200) {
            game.reset();
            game.sendState('miss');
        }
        
        // wall
        if((this.z - this.r) < -(this.bounds.z/2)) {

            this.velocity.z *= -1;
            
            game.sendState('hit');
            
        }

    },
    swipeBall: function() {
        var paddleX = -(mouseX - 700);
            
        var upperX = paddleX + (scene.paddleBounds/2),
            lowerX = paddleX - (scene.paddleBounds/2);
            
        if((this.x < upperX) && (this.x > lowerX) ) {

            // we're in range to hit the ball
            var maxBoundary = this.bounds.z/2 + 200;
            
            var responseTime = (maxBoundary - this.z);
            
            console.log(responseTime)
            
            this.velocity.z *= -1;
            this.velocity.x *= (1/responseTime) + 1.3;
            
        }
        
    }
    
});
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
    r: 100,
    color: '0xFFFFFF',
    theta: 0.0, 
    gravity: 0.9, 
    damping: 1,
    gravityOn: true,
    init: function(_bounds, paddleBounds){
        this.bounds.x = _bounds.x;
        this.bounds.y = _bounds.y;
        this.bounds.z = _bounds.z;
        
        this.paddleBounds = paddleBounds;
        
    },
    getUpdate: function() {
        this.wallCollision();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.z += this.velocity.z;

        var pos = {
            x: this.x,
            y: this.y,
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
        this.velocity.x = 1,
        this.velocity.y = 1,
        this.velocity.z = Math.floor(Math.random()*20 + 1);
    },
    pause: function() {
        this.velocity.x = 0,
        this.velocity.y = 0,
        this.velocity.z = 0;
    },
    wallCollision: function() {
        
        if(this.x > this.bounds.x/2 || this.x < -(this.bounds.x/2)) {
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

        if(this.z > this.bounds.z/2) {
            
            var paddleX = (-(mouseX - Math.abs(this.bounds.x)))*0.36,
                paddleY = (mouseY - this.bounds.y);
                
            var upperX = paddleX + (scene.paddleBounds/2),
                lowerX = paddleX - (scene.paddleBounds/2),
                upperY = paddleY + (scene.paddleBounds/2),
                lowerY = paddleY - (scene.paddleBounds/2);
            
            // just playing x - dont worry about y: (y < upperY && y > lowerY)
            if((this.x < upperX && this.x > lowerX)) {

                this.velocity.z *= -1;
                
                game.sendState('hit');
                
            } else {
                // we lost, reset the game
                game.reset();
                game.sendState('miss');
            }

        }

        if(this.z < -(this.bounds.z/2)) {

            this.velocity.z *= -1;
            
            game.sendState('hit');
            
        }

    }
    
});